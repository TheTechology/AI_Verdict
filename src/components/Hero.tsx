"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowDown } from "lucide-react";

const BADGES = ["4 piloni de analiză", "Transparență algoritmică", "Alfabetizare media"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-20 pb-28 sm:pt-28 sm:pb-36">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-40" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-ink-300/40 dark:bg-ink-700/30 blur-3xl animate-blob-float -z-10" />
      <div className="pointer-events-none absolute top-10 right-0 h-96 w-96 rounded-full bg-verde-300/40 dark:bg-verde-700/25 blur-3xl animate-blob-float-slow -z-10" />

      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full bg-verde-100/80 dark:bg-verde-800/40 border border-verde-300/60 dark:border-verde-700/50 px-4 py-1.5 text-xs font-medium text-verde-800 dark:text-verde-300 mb-8"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Asociația Grupul Verde · Adjud, Vrancea
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl font-bold leading-tight tracking-tight text-ink-900 dark:text-ink-50"
        >
          Nu îți spunem <span className="text-gradient">ce să crezi</span>.
          <br />
          Îți arătăm <span className="text-gradient">ce să observi</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-6 text-base sm:text-lg text-ink-600 dark:text-ink-300 max-w-2xl mx-auto"
        >
          Construit de 13 tineri din rețeaua națională Grupul Verde, VERITAS AI e dovada că
          generația crescută cu inteligența artificială poate fi cea care o pune în slujba
          adevărului — sursă, stil retoric, verificabilitate și semne de manipulare, explicate,
          nu doar scorate.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="#analiza"
            className="group inline-flex items-center gap-2 rounded-full bg-ink-700 hover:bg-ink-800 text-white font-medium px-6 py-3 shadow-glow transition-all hover:scale-[1.03]"
          >
            Analizează un text
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#piloni"
            className="inline-flex items-center gap-2 rounded-full glass-card px-6 py-3 font-medium text-ink-700 dark:text-ink-200 transition-all hover:scale-[1.03]"
          >
            Vezi cei 4 piloni
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-2"
        >
          {BADGES.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-ink-200 dark:border-ink-700 px-3 py-1 text-xs text-ink-500 dark:text-ink-400"
            >
              {badge}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6"
        >
          <a
            href="#povestea"
            className="text-sm text-verde-700 dark:text-verde-400 underline decoration-verde-400/50 hover:decoration-verde-500"
          >
            Descoperă povestea celor 13 tineri și programul național din spatele proiectului →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
