export type ResultCategory = "solid" | "mixed" | "risky" | "severe";

export interface PillarScores {
  sourceCredibilityScore: number;
  rhetoricIntegrityScore: number;
  verifiabilityScore: number | null;
  manipulationRiskScore: number;
}

// Ponderi implicite per pilon (secțiunea 6) — configurabile pentru că importanța
// fiecărui pilon diferă în funcție de tipul de conținut analizat.
export const DEFAULT_PILLAR_WEIGHTS = {
  sourceCredibilityScore: 1,
  rhetoricIntegrityScore: 1,
  verifiabilityScore: 1,
  manipulationRiskScore: 1,
};

export function computeIciScore(
  scores: PillarScores,
  weights: typeof DEFAULT_PILLAR_WEIGHTS = DEFAULT_PILLAR_WEIGHTS
): number {
  // Riscul de manipulare e o axă "inversă": scor mare = risc mare = încredere mică,
  // deci contribuie la ICI ca (100 - risc).
  const axes: Array<{ value: number | null; weight: number }> = [
    { value: scores.sourceCredibilityScore, weight: weights.sourceCredibilityScore },
    { value: scores.rhetoricIntegrityScore, weight: weights.rhetoricIntegrityScore },
    { value: scores.verifiabilityScore, weight: weights.verifiabilityScore },
    { value: 100 - scores.manipulationRiskScore, weight: weights.manipulationRiskScore },
  ];

  const available = axes.filter((axis) => axis.value !== null) as Array<{
    value: number;
    weight: number;
  }>;

  const totalWeight = available.reduce((sum, axis) => sum + axis.weight, 0);
  const weightedSum = available.reduce((sum, axis) => sum + axis.value * axis.weight, 0);

  return totalWeight === 0 ? 0 : Math.round((weightedSum / totalWeight) * 100) / 100;
}

export function categorizeIciScore(iciScore: number): ResultCategory {
  if (iciScore >= 80) return "solid";
  if (iciScore >= 50) return "mixed";
  if (iciScore >= 25) return "risky";
  return "severe";
}
