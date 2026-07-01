import { prisma } from "@/lib/prisma";

const NEUTRAL_SCORE = 50;

export function extractDomain(url: string | null): string | null {
  if (!url) return null;
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

interface SourceLookupResult {
  score: number;
  note: string;
  isKnown: boolean;
}

const MESSAGES: Record<string, { noUrl: string; noNotes: string; unknownSource: string }> = {
  en: {
    noUrl: "No URL — the analysis relied solely on the text, without a source profile.",
    noNotes: "Existing source profile, no additional notes.",
    unknownSource: "Unknown source — no history in the app. Default neutral score.",
  },
  ro: {
    noUrl: "Fără URL — analiza s-a bazat exclusiv pe text, fără profil de sursă.",
    noNotes: "Profil de sursă existent, fără note suplimentare.",
    unknownSource: "Sursă necunoscută — fără istoric în aplicație. Scor neutru implicit.",
  },
};

// Pilonul 1 simplificat pentru MVP: doar lookup într-un tabel de profiluri
// cunoscute (populat prin seed sau feedback loop). WHOIS, rețele de amplificare
// și verificare încrucișată cu NewsGuard/MBFC/EDMO rămân pentru Faza 2 (secțiunea 12).
// Notă: notele stocate în DB rămân în limba în care au fost create prima dată,
// indiferent de locale-ul cererilor ulterioare — limitare acceptată pentru MVP.
export async function getSourceCredibility(
  url: string | null,
  locale: string = "en"
): Promise<SourceLookupResult> {
  const m = MESSAGES[locale] ?? MESSAGES.en;
  const domain = extractDomain(url);

  if (!domain) {
    return { score: NEUTRAL_SCORE, note: m.noUrl, isKnown: false };
  }

  const existing = await prisma.sourceProfile.findUnique({ where: { domain } });

  if (existing) {
    return {
      score: existing.historicalCredibilityScore,
      note: existing.note ?? m.noNotes,
      isKnown: true,
    };
  }

  await prisma.sourceProfile.create({
    data: {
      domain,
      entityType: "unknown",
      historicalCredibilityScore: NEUTRAL_SCORE,
      note: m.unknownSource,
    },
  });

  return { score: NEUTRAL_SCORE, note: m.unknownSource, isKnown: false };
}
