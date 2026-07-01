"use client";

import { useState } from "react";
import { CATEGORY_LABELS, type ResultCategory } from "@/lib/scoring";

export interface EvidenceItemDTO {
  pillar: string;
  evidenceType: string;
  description: string;
  textExcerpt: string | null;
  confidence: number;
}

export interface AnalysisResultDTO {
  id: string;
  iciScore: number;
  category: ResultCategory;
  scores: {
    sourceCredibilityScore: number;
    rhetoricIntegrityScore: number;
    verifiabilityScore: number | null;
    manipulationRiskScore: number;
  };
  summary: string;
  evidenceItems: EvidenceItemDTO[];
}

const CATEGORY_COLOR: Record<ResultCategory, string> = {
  solid: "bg-score-solid",
  mixed: "bg-score-mixed",
  risky: "bg-score-risky",
  severe: "bg-score-severe",
};

interface AxisConfig {
  key: string;
  label: string;
  value: number | null;
  pillarFilter: string;
  unavailableNote?: string;
}

export function ScoreDashboard({ result }: { result: AnalysisResultDTO }) {
  const [openAxis, setOpenAxis] = useState<string | null>(null);

  const axes: AxisConfig[] = [
    {
      key: "source",
      label: "Credibilitate Sursă",
      value: result.scores.sourceCredibilityScore,
      pillarFilter: "credibilitate_sursa",
    },
    {
      key: "rhetoric",
      label: "Integritate Retorică",
      value: result.scores.rhetoricIntegrityScore,
      pillarFilter: "stil_retoric",
    },
    {
      key: "verifiability",
      label: "Verificabilitate Surse",
      value: result.scores.verifiabilityScore,
      pillarFilter: "verificare_surse",
      unavailableNote: "Disponibil în Faza 2 a proiectului (verificare surse citate + reverse image search).",
    },
    {
      key: "manipulation",
      label: "Risc Manipulare",
      value: result.scores.manipulationRiskScore,
      pillarFilter: "semne_manipulare",
    },
  ];

  const categoryInfo = CATEGORY_LABELS[result.category];

  return (
    <div className="rounded-2xl border border-petrol-200 dark:border-petrol-700 bg-white dark:bg-petrol-900/40 shadow-sm overflow-hidden">
      <div className={`p-6 text-white ${CATEGORY_COLOR[result.category]}`}>
        <p className="text-sm uppercase tracking-wide opacity-80">Indice Compozit de Încredere (ICI)</p>
        <p className="font-serif text-4xl font-bold mt-1">{Math.round(result.iciScore)} / 100</p>
        <p className="mt-2 text-sm">
          {categoryInfo.emoji} {categoryInfo.label}
        </p>
      </div>

      <div className="p-4 border-b border-petrol-100 dark:border-petrol-800">
        <p className="text-sm text-petrol-700 dark:text-petrol-200">{result.summary}</p>
      </div>

      <div className="divide-y divide-petrol-100 dark:divide-petrol-800">
        {axes.map((axis) => {
          const isOpen = openAxis === axis.key;
          const isUnavailable = axis.value === null;
          const relatedEvidence = result.evidenceItems.filter(
            (item) => item.pillar === axis.pillarFilter
          );

          return (
            <div key={axis.key}>
              <button
                type="button"
                disabled={isUnavailable}
                onClick={() => setOpenAxis(isOpen ? null : axis.key)}
                className="w-full flex items-center justify-between px-6 py-3 text-left disabled:cursor-not-allowed disabled:opacity-50 hover:bg-petrol-50 dark:hover:bg-petrol-800/40 transition-colors"
              >
                <span className="font-medium text-sm text-petrol-800 dark:text-petrol-100">{axis.label}</span>
                <span className="text-sm text-petrol-600 dark:text-petrol-300">
                  {isUnavailable ? "—" : `${Math.round(axis.value!)} / 100`}
                </span>
              </button>

              {isUnavailable && (
                <p className="px-6 pb-3 text-xs text-petrol-500 dark:text-petrol-400 italic">
                  {axis.unavailableNote}
                </p>
              )}

              {isOpen && !isUnavailable && (
                <div className="px-6 pb-4 space-y-2">
                  {relatedEvidence.length === 0 && (
                    <p className="text-xs text-petrol-500 dark:text-petrol-400 italic">
                      Fără dovezi individuale raportate pentru această axă.
                    </p>
                  )}
                  {relatedEvidence.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg bg-petrol-50 dark:bg-petrol-800/50 p-3 text-xs space-y-1"
                    >
                      <p className="font-medium text-petrol-700 dark:text-petrol-200">
                        {item.evidenceType} · încredere {Math.round(item.confidence)}%
                      </p>
                      <p className="text-petrol-600 dark:text-petrol-300">{item.description}</p>
                      {item.textExcerpt && (
                        <p className="border-l-2 border-petrol-300 dark:border-petrol-600 pl-2 italic text-petrol-500 dark:text-petrol-400">
                          &ldquo;{item.textExcerpt}&rdquo;
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
