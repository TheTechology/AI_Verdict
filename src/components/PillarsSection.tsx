"use client";

import { motion } from "framer-motion";
import { ScanSearch, MessageSquareWarning, Link2, AlertTriangle, type LucideIcon } from "lucide-react";

interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
  status?: string;
}

const PILLARS: Pillar[] = [
  {
    icon: ScanSearch,
    title: "Analiza Sursei",
    description: "Cine publică — reputație istorică, transparență redacțională, semnale de bot vs. cont uman.",
    accent: "text-petrol-600 dark:text-petrol-300 bg-petrol-100 dark:bg-petrol-800/60",
  },
  {
    icon: MessageSquareWarning,
    title: "Stil Retoric",
    description: "Ton emoțional excesiv, sofisme, limbaj absolutist, discrepanță titlu-conținut.",
    accent: "text-verde-600 dark:text-verde-300 bg-verde-100 dark:bg-verde-800/40",
  },
  {
    icon: Link2,
    title: "Verificarea Surselor",
    description: "Sursele citate există și spun ce pretinde articolul? Circularitate, citare selectivă.",
    accent: "text-petrol-600 dark:text-petrol-300 bg-petrol-100 dark:bg-petrol-800/60",
    status: "Disponibil în Faza 2",
  },
  {
    icon: AlertTriangle,
    title: "Semne de Manipulare",
    description: "Astroturfing, coordonare inautentică, manipulare statistică, fabricare de expertiză.",
    accent: "text-score-risky bg-orange-100 dark:bg-orange-950/40",
  },
];

export function PillarsSection() {
  return (
    <section id="piloni" className="max-w-6xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-xl mx-auto mb-12"
      >
        <p className="text-xs uppercase tracking-widest text-verde-600 dark:text-verde-400 font-medium">
          Arhitectura funcțională
        </p>
        <h2 className="font-serif text-3xl font-bold mt-2 text-petrol-800 dark:text-petrol-100">
          Cei 4 piloni de analiză
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-5">
        {PILLARS.map((pillar, index) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:shadow-glow transition-shadow"
          >
            <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${pillar.accent} mb-4`}>
              <pillar.icon className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-petrol-800 dark:text-petrol-100">{pillar.title}</h3>
            <p className="text-sm text-petrol-600 dark:text-petrol-300 mt-1.5 leading-relaxed">
              {pillar.description}
            </p>
            {pillar.status && (
              <span className="inline-block mt-3 text-[11px] font-medium text-petrol-400 dark:text-petrol-500 italic">
                {pillar.status}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
