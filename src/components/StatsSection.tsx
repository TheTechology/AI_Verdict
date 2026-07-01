"use client";

import { motion } from "framer-motion";
import { Users2, CalendarRange, Network, Layers, Timer, Gauge } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

interface Stat {
  icon: typeof Users2;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const IMPACT: Stat[] = [
  { icon: Users2, value: 13, label: "tineri autori ai platformei" },
  { icon: Network, value: 9, label: "programe naționale 2026–2035" },
  { icon: Users2, value: 3900, suffix: "+", label: "beneficiari în rețeaua Grupul Verde" },
  { icon: CalendarRange, value: 10, label: "ani de angajament asumat" },
];

const PERFORMANTA: Stat[] = [
  { icon: Layers, value: 4, label: "piloni de analiză rulați simultan" },
  { icon: Timer, value: 5, prefix: "<", suffix: "s", label: "pentru o analiză preliminară" },
  { icon: Gauge, value: 100, label: "scor granular per pilon, nu verdict binar" },
  { icon: Gauge, value: 85, suffix: "%+", label: "acord țintă cu evaluare umană" },
];

function StatRow({ title, stats, delayOffset }: { title: string; stats: Stat[]; delayOffset: number }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-verde-400 font-medium mb-6 text-center sm:text-left">
        {title}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: delayOffset + index * 0.06 }}
            className="glass-card rounded-2xl p-5 text-center sm:text-left"
          >
            <stat.icon className="h-4 w-4 text-verde-400 mb-3 mx-auto sm:mx-0" />
            <p className="font-serif text-3xl sm:text-4xl font-bold text-ink-50 tabular-nums">
              {stat.prefix}
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-xs text-ink-400 mt-1.5 leading-snug">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function StatsSection() {
  return (
    <section id="impact" className="max-w-6xl mx-auto px-4 py-16 space-y-14">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-xl mx-auto"
      >
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-50">
          Cifre, nu <span className="text-gradient">promisiuni</span>.
        </h2>
        <p className="text-sm text-ink-400 mt-3">
          Impactul rețelei care a construit platforma și performanța pe care o livrează.
        </p>
      </motion.div>

      <StatRow title="Impact · rețeaua Grupul Verde" stats={IMPACT} delayOffset={0.1} />
      <StatRow title="Performanță · platforma VERITAS AI" stats={PERFORMANTA} delayOffset={0.2} />
    </section>
  );
}
