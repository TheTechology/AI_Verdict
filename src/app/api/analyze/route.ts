import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { analyzeTextStyle, type TextAnalysisResult } from "@/lib/anthropic";
import { getSourceCredibility } from "@/lib/sourceProfile";
import { computeIciScore, categorizeIciScore } from "@/lib/scoring";
import { checkRateLimit } from "@/lib/rateLimit";

interface AnalyzeRequestBody {
  text: string;
  url?: string;
  locale?: string;
}

const MAX_TEXT_LENGTH = 20_000;

const ERROR_MESSAGES: Record<string, { rateLimited: string; textRequired: string; textTooLong: (max: number) => string; analysisFailed: (msg: string) => string }> = {
  en: {
    rateLimited: "Too many requests. Please try again in a moment.",
    textRequired: "The text to analyze is required.",
    textTooLong: (max) => `Text is too long (max ${max} characters).`,
    analysisFailed: (msg) => `Analysis failed (check ANTHROPIC_API_KEY): ${msg}`,
  },
  ro: {
    rateLimited: "Prea multe cereri. Încearcă din nou în câteva momente.",
    textRequired: "Textul de analizat este obligatoriu.",
    textTooLong: (max) => `Textul e prea lung (max ${max} caractere).`,
    analysisFailed: (msg) => `Analiza a eșuat (verifică ANTHROPIC_API_KEY): ${msg}`,
  },
};

function getClientIdentifier(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as AnalyzeRequestBody;
  const locale = body.locale === "ro" ? "ro" : "en";
  const m = ERROR_MESSAGES[locale];

  const clientId = getClientIdentifier(request);
  const rateLimit = checkRateLimit(clientId);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: m.rateLimited },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds ?? 60) } }
    );
  }

  const text = body.text?.trim();

  if (!text) {
    return NextResponse.json({ error: m.textRequired }, { status: 400 });
  }

  if (text.length > MAX_TEXT_LENGTH) {
    return NextResponse.json({ error: m.textTooLong(MAX_TEXT_LENGTH) }, { status: 413 });
  }

  const url = body.url?.trim() || null;

  let styleAnalysis: TextAnalysisResult;
  let sourceCredibility: Awaited<ReturnType<typeof getSourceCredibility>>;
  try {
    [styleAnalysis, sourceCredibility] = await Promise.all([
      analyzeTextStyle(text, locale),
      getSourceCredibility(url, locale),
    ]);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: m.analysisFailed(message) }, { status: 502 });
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
      language: locale,
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
            evidenceType: sourceCredibility.isKnown ? "known_profile" : "unknown_profile",
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
