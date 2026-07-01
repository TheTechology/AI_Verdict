"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { GraduationCap, Trophy, School, BookOpen, type LucideIcon } from "lucide-react";

interface Feature {
  key: string;
  icon: LucideIcon;
}

const FEATURES: Feature[] = [
  { key: "courses", icon: GraduationCap },
  { key: "gamification", icon: Trophy },
  { key: "teacherPortal", icon: School },
  { key: "caseLibrary", icon: BookOpen },
];

export function EducationSection() {
  const t = useTranslations("education");

  return (
    <section id="educatie" className="relative max-w-6xl mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-widest text-verde-400 font-medium">{t("eyebrow")}</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-ink-50">
            {t.rich("heading", { hl: (chunks) => <span className="text-gradient">{chunks}</span> })}
          </h2>
          <p className="text-ink-300 mt-4 leading-relaxed">
            {t.rich("paragraph", { em: (chunks) => <em>{chunks}</em> })}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass-card rounded-2xl p-5"
            >
              <feature.icon className="h-5 w-5 text-verde-400 mb-3" />
              <h3 className="font-semibold text-ink-50 text-sm">{t(`features.${feature.key}.title`)}</h3>
              <p className="text-xs text-ink-400 mt-1.5 leading-relaxed">
                {t(`features.${feature.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
