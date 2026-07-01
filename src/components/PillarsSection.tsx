"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ScanSearch, MessageSquareWarning, Link2, AlertTriangle, Layers, Timer, Gauge, type LucideIcon } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

interface Pillar {
  key: string;
  icon: LucideIcon;
  accent: string;
  hasStatus?: boolean;
}

const PILLARS: Pillar[] = [
  { key: "source", icon: ScanSearch, accent: "text-verde-300 bg-verde-800/40" },
  { key: "rhetoric", icon: MessageSquareWarning, accent: "text-verde-300 bg-verde-800/40" },
  { key: "verification", icon: Link2, accent: "text-ink-200 bg-ink-800", hasStatus: true },
  { key: "manipulation", icon: AlertTriangle, accent: "text-score-risky bg-score-risky/15" },
];

interface PerfStat {
  key: string;
  icon: LucideIcon;
  value: number;
  prefix?: string;
  suffix?: string;
}

const PERFORMANTA: PerfStat[] = [
  { key: "pillars", icon: Layers, value: 4 },
  { key: "speed", icon: Timer, value: 5, prefix: "<", suffix: "s" },
  { key: "score", icon: Gauge, value: 100 },
  { key: "accuracy", icon: Gauge, value: 85, suffix: "%+" },
];

export function PillarsSection() {
  const t = useTranslations("pillars");

  return (
    <section id="piloni" className="max-w-6xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-xl mx-auto mb-12"
      >
        <p className="text-xs uppercase tracking-widest text-verde-400 font-medium">{t("eyebrow")}</p>
        <h2 className="font-serif text-3xl font-bold mt-2 text-ink-50">{t("heading")}</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-5 mb-10">
        {PILLARS.map((pillar, index) => (
          <motion.div
            key={pillar.key}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:shadow-glow transition-shadow"
          >
            <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${pillar.accent} mb-4`}>
              <pillar.icon className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-ink-50">{t(`items.${pillar.key}.title`)}</h3>
            <p className="text-sm text-ink-300 mt-1.5 leading-relaxed">{t(`items.${pillar.key}.description`)}</p>
            {pillar.hasStatus && (
              <span className="inline-block mt-3 text-[11px] font-medium text-ink-500 italic">
                {t(`items.${pillar.key}.status`)}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-verde-400 font-medium mb-4 text-center">
          {t("perfEyebrow")}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {PERFORMANTA.map((stat, index) => (
            <motion.div
              key={stat.key}
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
              <p className="text-xs text-ink-400 mt-1.5 leading-snug">{t(`perf.${stat.key}`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
