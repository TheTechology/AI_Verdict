"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Sparkles } from "lucide-react";
import { Hero } from "@/components/Hero";
import { StatsSection } from "@/components/StatsSection";
import { PillarsSection } from "@/components/PillarsSection";
import { EducationSection } from "@/components/EducationSection";
import { PovesteSection } from "@/components/PovesteSection";
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
      <StatsSection />
      <PillarsSection />
      <EducationSection />
      <PovesteSection />

      <section id="analiza" className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-30" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[36rem] w-[36rem] rounded-full bg-verde-800/30 blur-3xl -z-10" />

        <div className="max-w-2xl mx-auto px-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-verde-800/40 border border-verde-700/50 px-4 py-1.5 text-xs font-medium text-verde-300 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              De la poveste, la produs
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-50">
              Testează <span className="text-gradient">VERITAS AI</span> chiar acum
            </h2>
            <p className="text-ink-300 mt-3">
              Lipește un text sau un URL. În câteva secunde, primești nu un verdict, ci o hartă a
              motivelor pentru care ar trebui — sau nu — să ai încredere în el.
            </p>
          </motion.div>

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
        </div>
      </section>
    </>
  );
}
