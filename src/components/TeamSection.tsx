"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Award, Code2, Palette, Database, Users, type LucideIcon } from "lucide-react";

interface Volunteer {
  key: string;
  icon: LucideIcon;
}

const VOLUNTEERS: Volunteer[] = [
  { key: "backend", icon: Code2 },
  { key: "design", icon: Palette },
  { key: "data", icon: Database },
  { key: "community", icon: Users },
];

export function TeamSection() {
  const t = useTranslations("team");

  return (
    <section id="echipa" className="max-w-6xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <p className="text-xs uppercase tracking-widest text-verde-400 font-medium">{t("eyebrow")}</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-ink-50">
          {t("heading").split("VERIDIC")[0]}
          <span className="text-gradient">VERIDIC</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-2xl p-6 sm:p-8 mb-6 flex flex-col sm:flex-row gap-6 items-start"
      >
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-verde-800/40 text-verde-300 shrink-0">
          <Award className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-verde-400 font-medium">{t("coordinatorLabel")}</p>
          <h3 className="font-serif text-xl font-bold text-ink-50 mt-1">Marian Dumitru</h3>
          <p className="text-sm text-ink-300 mt-2.5 leading-relaxed">{t("coordinatorBio1")}</p>
          <p className="text-sm text-ink-300 mt-2.5 leading-relaxed">{t("coordinatorBio2")}</p>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {VOLUNTEERS.map((volunteer, index) => (
          <motion.div
            key={volunteer.key}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="glass-card rounded-2xl p-5"
          >
            <volunteer.icon className="h-5 w-5 text-verde-400 mb-3" />
            <h4 className="font-semibold text-ink-50 text-sm">{t(`volunteers.${volunteer.key}.role`)}</h4>
            <p className="text-sm text-ink-300 mt-2 leading-relaxed">
              {t(`volunteers.${volunteer.key}.contribution`)}
            </p>
            <p className="text-xs text-ink-500 mt-2.5 italic">{t(`volunteers.${volunteer.key}.howJoined`)}</p>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-xs text-ink-500 italic mt-8">{t("footnote")}</p>
    </section>
  );
}
