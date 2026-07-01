"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Sparkles, ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { PillarsSection } from "@/components/PillarsSection";
import { ResearchSection } from "@/components/ResearchSection";
import { EducationSection } from "@/components/EducationSection";
import { PovesteSection } from "@/components/PovesteSection";
import { TeamSection } from "@/components/TeamSection";
import { AnalyzeForm } from "@/components/AnalyzeForm";
import { AnalyzingProgress } from "@/components/AnalyzingProgress";
import { ScoreDashboard, type AnalysisResultDTO } from "@/components/ScoreDashboard";

export default function Home() {
  const locale = useLocale();
  const tAnalyzer = useTranslations("analyzer");
  const tClosing = useTranslations("closingCta");
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
        body: JSON.stringify({ ...input, locale }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Analysis failed.");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* 1. Hook — ce e și de ce contează */}
      <Hero />

      {/* 2. Ce face, concret — cei 4 piloni + performanța aplicației */}
      <PillarsSection />

      {/* 3. Acțiune timpurie — testează chiar aici, cât ești convins de ce poate face */}
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
              {tAnalyzer("badge")}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-50">
              {tAnalyzer("heading").split("VERIDIC")[0]}
              <span className="text-gradient">VERIDIC</span>
              {tAnalyzer("heading").split("VERIDIC")[1]}
            </h2>
            <p className="text-ink-300 mt-3">{tAnalyzer("subtext")}</p>
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

      {/* 4. De ce să ai încredere în scor — fundamentarea metodologică */}
      <ResearchSection />

      {/* 5. Miza mai largă — educație, nu doar unealtă */}
      <EducationSection />

      {/* 6. Cine și de ce — povestea umană + amploarea programului național */}
      <PovesteSection />

      {/* 7. Oamenii din spate */}
      <TeamSection />

      {/* 8. Închiderea buclei — cei care au citit tot, înapoi la acțiune */}
      <section className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-sm text-ink-400">{tClosing("eyebrow")}</p>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-2 text-ink-50">
          {tClosing.rich("heading", { hl: (chunks) => <span className="text-gradient">{chunks}</span> })}
        </h2>
        <a
          href="#analiza"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-verde-500 hover:bg-verde-400 text-ink-900 font-semibold px-7 py-3.5 shadow-glow-verde transition-all hover:scale-[1.03]"
        >
          {tClosing("button")}
          <ArrowRight className="h-4 w-4" />
        </a>
      </section>
    </>
  );
}
