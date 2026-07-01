"use client";

import { motion } from "framer-motion";
import { ScanSearch, MessageSquareWarning, Link2, AlertTriangle, Layers, Timer, Gauge, type LucideIcon } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

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
    accent: "text-verde-300 bg-verde-800/40",
  },
  {
    icon: MessageSquareWarning,
    title: "Stil Retoric",
    description: "Ton emoțional excesiv, sofisme, limbaj absolutist, discrepanță titlu-conținut.",
    accent: "text-verde-300 bg-verde-800/40",
  },
  {
    icon: Link2,
    title: "Verificarea Surselor",
    description: "Sursele citate există și spun ce pretinde articolul? Circularitate, citare selectivă.",
    accent: "text-ink-200 bg-ink-800",
    status: "Disponibil în Faza 2",
  },
  {
    icon: AlertTriangle,
    title: "Semne de Manipulare",
    description: "Astroturfing, coordonare inautentică, manipulare statistică, fabricare de expertiză.",
    accent: "text-score-risky bg-score-risky/15",
  },
];

interface PerfStat {
  icon: LucideIcon;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const PERFORMANTA: PerfStat[] = [
  { icon: Layers, value: 4, label: "piloni rulați simultan" },
  { icon: Timer, value: 5, prefix: "<", suffix: "s", label: "pentru o analiză preliminară" },
  { icon: Gauge, value: 100, label: "scor granular, nu verdict binar" },
  { icon: Gauge, value: 85, suffix: "%+", label: "acord țintă cu evaluare umană" },
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
        <p className="text-xs uppercase tracking-widest text-verde-400 font-medium">
          Cum funcționează
        </p>
        <h2 className="font-serif text-3xl font-bold mt-2 text-ink-50">
          Cei 4 piloni de analiză
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-5 mb-10">
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
            <h3 className="font-semibold text-ink-50">{pillar.title}</h3>
            <p className="text-sm text-ink-300 mt-1.5 leading-relaxed">{pillar.description}</p>
            {pillar.status && (
              <span className="inline-block mt-3 text-[11px] font-medium text-ink-500 italic">
                {pillar.status}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-verde-400 font-medium mb-4 text-center">
          Performanța aplicației
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {PERFORMANTA.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="glass-card rounded-2xl p-5 text-center sm:text-left"
            >
              <stat.icon className="h-4 w-4 text-verde-400 mb-3 mx-auto sm:mx-0" />
              <p className="font-serif text-3xl font-bold text-ink-50 tabular-nums">
                {stat.prefix}
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs text-ink-400 mt-1.5 leading-snug">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
