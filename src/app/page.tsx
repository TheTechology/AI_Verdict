"use client";

import { useState } from "react";
import { AnalyzeForm } from "@/components/AnalyzeForm";
import { ScoreDashboard, type AnalysisResultDTO } from "@/components/ScoreDashboard";
import { ThemeToggle } from "@/components/ThemeToggle";

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
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-verde-600 dark:text-verde-400 font-medium">
            Asociația Grupul Verde · Adjud
          </p>
          <h1 className="font-serif text-3xl font-bold text-petrol-800 dark:text-petrol-100">VERITAS AI</h1>
          <p className="text-sm text-petrol-600 dark:text-petrol-300 mt-1">
            Nu îți spunem ce să crezi. Îți arătăm ce să observi.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <AnalyzeForm onSubmit={handleSubmit} loading={loading} />

      {error && (
        <div className="rounded-lg border border-score-severe/30 bg-score-severe/10 px-4 py-3 text-sm text-score-severe">
          {error}
        </div>
      )}

      {result && <ScoreDashboard result={result} />}

      <footer className="pt-8 text-xs text-petrol-500 dark:text-petrol-400 text-center space-y-1">
        <p>
          Schelet MVP — Faza 1. Proiect al Asociației Grupul Verde, aliniat cu misiunea de educație digitală și
          alfabetizare media.
        </p>
        <p>
          <a href="/confidentialitate" className="underline">
            Confidențialitate
          </a>
        </p>
      </footer>
    </main>
  );
}
