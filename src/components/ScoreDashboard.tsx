"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { type ResultCategory } from "@/lib/scoring";
import { AnimatedCounter } from "@/components/AnimatedCounter";

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

const CATEGORY_GRADIENT: Record<ResultCategory, string> = {
  solid: "from-score-solid to-ink-900",
  mixed: "from-score-mixed to-ink-900",
  risky: "from-score-risky to-ink-900",
  severe: "from-score-severe to-ink-900",
};

const CATEGORY_BAR: Record<ResultCategory, string> = {
  solid: "bg-score-solid",
  mixed: "bg-score-mixed",
  risky: "bg-score-risky",
  severe: "bg-score-severe",
};

interface AxisConfig {
  key: string;
  value: number | null;
  pillarFilter: string;
}

export function ScoreDashboard({ result }: { result: AnalysisResultDTO }) {
  const t = useTranslations("scoreDashboard");
  const [openAxis, setOpenAxis] = useState<string | null>(null);

  const axes: AxisConfig[] = [
    { key: "source", value: result.scores.sourceCredibilityScore, pillarFilter: "credibilitate_sursa" },
    { key: "rhetoric", value: result.scores.rhetoricIntegrityScore, pillarFilter: "stil_retoric" },
    { key: "verifiability", value: result.scores.verifiabilityScore, pillarFilter: "verificare_surse" },
    { key: "manipulation", value: result.scores.manipulationRiskScore, pillarFilter: "semne_manipulare" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-card rounded-2xl shadow-glow overflow-hidden"
    >
      <div className={`p-6 text-white bg-gradient-to-br ${CATEGORY_GRADIENT[result.category]}`}>
        <p className="text-sm uppercase tracking-wide opacity-80">{t("iciLabel")}</p>
        <p className="font-serif text-5xl font-bold mt-1 tabular-nums">
          <AnimatedCounter value={Math.round(result.iciScore)} /> / 100
        </p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-2 text-sm">
          {t(`categories.${result.category}.emoji`)} {t(`categories.${result.category}.label`)}
        </motion.p>
      </div>

      <div className="p-4 border-b border-ink-800">
        <p className="text-sm text-ink-200">{result.summary}</p>
      </div>

      <div className="divide-y divide-ink-800">
        {axes.map((axis, index) => {
          const isOpen = openAxis === axis.key;
          const isUnavailable = axis.value === null;
          const relatedEvidence = result.evidenceItems.filter((item) => item.pillar === axis.pillarFilter);

          return (
            <div key={axis.key}>
              <button
                type="button"
                disabled={isUnavailable}
                onClick={() => setOpenAxis(isOpen ? null : axis.key)}
                className="w-full flex items-center gap-4 px-6 py-4 text-left disabled:cursor-not-allowed disabled:opacity-50 hover:bg-ink-800/40 transition-colors"
              >
                <span className="font-medium text-sm text-ink-100 w-40 shrink-0">{t(`axes.${axis.key}`)}</span>

                <span className="flex-1 h-2 rounded-full bg-ink-800 overflow-hidden">
                  {!isUnavailable && (
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: `${axis.value}%` }}
                      transition={{ duration: 0.9, delay: 0.15 + index * 0.08, ease: "easeOut" }}
                      className={`block h-full rounded-full ${CATEGORY_BAR[result.category]}`}
                    />
                  )}
                </span>

                <span className="text-sm text-ink-300 w-16 text-right tabular-nums">
                  {isUnavailable ? "—" : `${Math.round(axis.value!)}/100`}
                </span>

                {!isUnavailable && (
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className="h-4 w-4 text-ink-500" />
                  </motion.span>
                )}
              </button>

              {isUnavailable && (
                <p className="px-6 pb-3 text-xs text-ink-400 italic">{t("axes.verifiabilityUnavailable")}</p>
              )}

              <AnimatePresence initial={false}>
                {isOpen && !isUnavailable && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 space-y-2">
                      {relatedEvidence.length === 0 && (
                        <p className="text-xs text-ink-400 italic">{t("noEvidence")}</p>
                      )}
                      {relatedEvidence.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: idx * 0.05 }}
                          className="rounded-lg bg-ink-800/50 p-3 text-xs space-y-1"
                        >
                          <p className="font-medium text-ink-200">
                            {item.evidenceType} · {t("confidenceLabel")} {Math.round(item.confidence)}%
                          </p>
                          <p className="text-ink-300">{item.description}</p>
                          {item.textExcerpt && (
                            <p className="border-l-2 border-ink-600 pl-2 italic text-ink-400">
                              &ldquo;{item.textExcerpt}&rdquo;
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
