"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Hero } from "@/components/Hero";
import { PillarsSection } from "@/components/PillarsSection";
import { AnalyzeForm } from "@/components/AnalyzeForm";
import { AnalyzingProgress } from "@/components/AnalyzingProgress";
import { ScoreDashboard, type AnalysisResultDTO } from "@/components/ScoreDashboard";

export default function Home() {
  const [result, setResult] = useState<AnalysisResultDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(input: { text: string; url?: string }) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Analiza a eșuat.");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare necunoscută.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Hero />
      <PillarsSection />

      <section id="analiza" className="max-w-2xl mx-auto px-4 pb-24 space-y-6">
        <div className="text-center mb-4">
          <p className="text-xs uppercase tracking-widest text-verde-600 dark:text-verde-400 font-medium">
            Testează platforma
          </p>
          <h2 className="font-serif text-3xl font-bold mt-2 text-petrol-800 dark:text-petrol-100">
            Analizează un text
          </h2>
        </div>

        <AnalyzeForm onSubmit={handleSubmit} loading={loading} />

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div key="progress" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AnalyzingProgress />
            </motion.div>
          )}

          {error && !loading && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-2 rounded-xl border border-score-severe/30 bg-score-severe/10 px-4 py-3 text-sm text-score-severe"
            >
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              {error}
            </motion.div>
          )}

          {result && !loading && <ScoreDashboard key="result" result={result} />}
        </AnimatePresence>
      </section>
    </>
  );
}
