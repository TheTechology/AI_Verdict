"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowDown, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-noise opacity-30" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_10%,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-verde-700/30 blur-3xl animate-blob-float -z-10" />
      <div className="pointer-events-none absolute top-0 right-0 h-[28rem] w-[28rem] rounded-full bg-verde-800/40 blur-3xl animate-blob-float-slow -z-10" />

      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full bg-verde-800/40 border border-verde-700/50 px-4 py-1.5 text-xs font-medium text-verde-300 mb-8"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Programul Național „IA în România" · Asociația Grupul Verde
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl font-bold leading-[1.05] tracking-tight text-ink-50"
        >
          Nu îți spunem <span className="text-gradient">ce să crezi</span>.
          <br />
          Îți arătăm <span className="text-gradient">ce să observi</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-6 text-base sm:text-lg text-ink-300 max-w-2xl mx-auto leading-relaxed"
        >
          O aplicație web care analizează sursa, tonul și logica unui text — și te lasă pe tine
          să tragi concluzia. Construită de 13 tineri din rețeaua națională a Asociației Grupul Verde.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="#analiza"
            className="group inline-flex items-center gap-2 rounded-full bg-verde-500 hover:bg-verde-400 text-ink-900 font-semibold px-7 py-3.5 shadow-glow-verde transition-all hover:scale-[1.03]"
          >
            Testează aplicația
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#povestea"
            className="inline-flex items-center gap-2 rounded-full glass-card px-7 py-3.5 font-medium text-ink-100 transition-all hover:scale-[1.03]"
          >
            Povestea celor 13 tineri
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
