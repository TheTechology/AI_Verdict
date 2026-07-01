import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { analyzeTextStyle, type TextAnalysisResult } from "@/lib/anthropic";
import { getSourceCredibility } from "@/lib/sourceProfile";
import { computeIciScore, categorizeIciScore } from "@/lib/scoring";
import { checkRateLimit } from "@/lib/rateLimit";

interface AnalyzeRequestBody {
  text: string;
  url?: string;
}

const MAX_TEXT_LENGTH = 20_000;

function getClientIdentifier(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: NextRequest) {
  const clientId = getClientIdentifier(request);
  const rateLimit = checkRateLimit(clientId);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Prea multe cereri. Încearcă din nou în câteva momente." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds ?? 60) } }
    );
  }

  const body = (await request.json()) as AnalyzeRequestBody;
  const text = body.text?.trim();

  if (!text) {
    return NextResponse.json({ error: "Textul de analizat este obligatoriu." }, { status: 400 });
  }

  if (text.length > MAX_TEXT_LENGTH) {
    return NextResponse.json(
      { error: `Textul e prea lung (max ${MAX_TEXT_LENGTH} caractere).` },
      { status: 413 }
    );
  }

  const url = body.url?.trim() || null;

  let styleAnalysis: TextAnalysisResult;
  let sourceCredibility: Awaited<ReturnType<typeof getSourceCredibility>>;
  try {
    [styleAnalysis, sourceCredibility] = await Promise.all([
      analyzeTextStyle(text),
      getSourceCredibility(url),
    ]);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Eroare necunoscută";
    return NextResponse.json(
      { error: `Analiza a eșuat (verifică ANTHROPIC_API_KEY): ${message}` },
      { status: 502 }
    );
  }

  // Pilonul 3 (verificare surse citate) e planificat pentru Faza 2 — nu e disponibil în MVP.
  const verifiabilityScore: number | null = null;

  const iciScore = computeIciScore({
    sourceCredibilityScore: sourceCredibility.score,
    rhetoricIntegrityScore: styleAnalysis.rhetoricIntegrityScore,
    verifiabilityScore,
    manipulationRiskScore: styleAnalysis.manipulationRiskScore,
  });
  const category = categorizeIciScore(iciScore);

  const contentItem = await prisma.contentItem.create({
    data: {
      url,
      rawText: text,
      contentType: url ? "article" : "text_snippet",
    },
  });

  const analysisResult = await prisma.analysisResult.create({
    data: {
      contentItemId: contentItem.id,
      iciScore,
      sourceCredibilityScore: sourceCredibility.score,
      rhetoricIntegrityScore: styleAnalysis.rhetoricIntegrityScore,
      verifiabilityScore,
      manipulationRiskScore: styleAnalysis.manipulationRiskScore,
      category,
      evidenceItems: {
        create: [
          ...styleAnalysis.evidenceItems.map((item) => ({
            pillar: item.pillar,
            evidenceType: item.evidenceType,
            description: item.description,
            textExcerpt: item.textExcerpt,
            confidence: item.confidence,
          })),
          {
            pillar: "credibilitate_sursa",
            evidenceType: sourceCredibility.isKnown ? "profil_cunoscut" : "profil_necunoscut",
            description: sourceCredibility.note,
            textExcerpt: null,
            confidence: sourceCredibility.isKnown ? 80 : 30,
          },
        ],
      },
    },
    include: { evidenceItems: true },
  });

  return NextResponse.json({
    id: analysisResult.id,
    iciScore,
    category,
    scores: {
      sourceCredibilityScore: sourceCredibility.score,
      rhetoricIntegrityScore: styleAnalysis.rhetoricIntegrityScore,
      verifiabilityScore,
      manipulationRiskScore: styleAnalysis.manipulationRiskScore,
    },
    summary: styleAnalysis.summary,
    evidenceItems: analysisResult.evidenceItems,
  });
}
