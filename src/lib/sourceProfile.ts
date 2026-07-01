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

// Pilonul 1 simplificat pentru MVP: doar lookup într-un tabel de profiluri
// cunoscute (populat prin seed sau feedback loop). WHOIS, rețele de amplificare
// și verificare încrucișată cu NewsGuard/MBFC/EDMO rămân pentru Faza 2 (secțiunea 12).
export async function getSourceCredibility(url: string | null): Promise<SourceLookupResult> {
  const domain = extractDomain(url);

  if (!domain) {
    return {
      score: NEUTRAL_SCORE,
      note: "Fără URL — analiza s-a bazat exclusiv pe text, fără profil de sursă.",
      isKnown: false,
    };
  }

  const existing = await prisma.sourceProfile.findUnique({ where: { domain } });

  if (existing) {
    return {
      score: existing.historicalCredibilityScore,
      note: existing.note ?? "Profil de sursă existent, fără note suplimentare.",
      isKnown: true,
    };
  }

  await prisma.sourceProfile.create({
    data: {
      domain,
      entityType: "unknown",
      historicalCredibilityScore: NEUTRAL_SCORE,
      note: "Sursă necunoscută — fără istoric în aplicație. Scor neutru implicit.",
    },
  });

  return {
    score: NEUTRAL_SCORE,
    note: "Sursă necunoscută — fără istoric în aplicație. Scor neutru implicit.",
    isKnown: false,
  };
}
