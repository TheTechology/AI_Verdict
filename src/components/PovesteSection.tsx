"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe2, Users2, Network, CalendarRange, type LucideIcon } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

interface ImpactStat {
  key: string;
  icon: LucideIcon;
  value: number;
  suffix?: string;
}

const IMPACT: ImpactStat[] = [
  { key: "youth", icon: Users2, value: 13 },
  { key: "programs", icon: Network, value: 9 },
  { key: "beneficiaries", icon: Users2, value: 3900, suffix: "+" },
  { key: "years", icon: CalendarRange, value: 10 },
];

const GALERIE = [
  { src: "/poveste/coding-blocuri.jpg", alt: "First steps in programming — visual logic, in a digital education program of Asociația Grupul Verde" },
  { src: "/poveste/echipa-laptop.jpg", alt: "Two young people, one laptop, a problem to solve together" },
  { src: "/poveste/laborator-echipa.jpg", alt: "In a computer lab, ideas become code" },
  { src: "/poveste/concentrare-individuala.jpg", alt: "Total focus — the moment technology is built, not just consumed" },
  { src: "/poveste/portret-grup.jpg", alt: "The generation that listens, asks, and builds" },
  { src: "/poveste/mentorat.jpg", alt: "Mentorship — a principle of the program, not an isolated moment" },
  { src: "/poveste/minecraft-edu.jpg", alt: "Learning through play — digital tools in service of education" },
  { src: "/poveste/formator-flipchart.jpg", alt: "Training the trainers — knowledge circulates, not locked in a single generation" },
  { src: "/poveste/strategie-pestle.jpg", alt: "Long-term strategic planning — real change is thought in years, not weekends" },
];

const PROGRAM_KEYS = [
  "ai",
  "rights",
  "climate",
  "inclusion",
  "incubator",
  "jurisprudence",
  "mobile",
  "intergenerational",
  "sensors",
] as const;

const PROGRAM_SLUGS: Record<(typeof PROGRAM_KEYS)[number], string> = {
  ai: "ai-cetateni",
  rights: "cetate-drepturi",
  climate: "cod-clima",
  inclusion: "inclusiune-digital",
  incubator: "inovatori-locali",
  jurisprudence: "jurisprudenta-verde",
  mobile: "robot-sate",
  intergenerational: "seniori-tech",
  sensors: "senzori-natura",
};

export function PovesteSection() {
  const t = useTranslations("story");

  return (
    <section id="povestea" className="max-w-6xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <p className="text-xs uppercase tracking-widest text-verde-400 font-medium">{t("eyebrow")}</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-ink-50">
          {t.rich("heading", { hl: (chunks) => <span className="text-gradient">{chunks}</span> })}
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
        {IMPACT.map((stat, index) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="glass-card rounded-2xl p-5 text-center sm:text-left"
          >
            <stat.icon className="h-4 w-4 text-verde-400 mb-3 mx-auto sm:mx-0" />
            <p className="font-serif text-3xl sm:text-4xl font-bold text-ink-50 tabular-nums">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-xs text-ink-400 mt-1.5 leading-snug">{t(`impact.${stat.key}`)}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-start mb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-ink-300 leading-relaxed"
        >
          <p>{t.rich("paragraph1", { strong: (chunks) => <strong className="text-ink-50">{chunks}</strong> })}</p>
          <p>
            {t("paragraph2Pre")}{" "}
            <a
              href="https://grupulverde.ro/proiecte/ai-cetateni/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-verde-400 underline decoration-verde-500/50 hover:decoration-verde-400 inline-flex items-center gap-0.5"
            >
              {t("paragraph2LinkText")}
              <ArrowUpRight className="h-3 w-3" />
            </a>{" "}
            {t("paragraph2Post")}
          </p>
          <p>{t.rich("paragraph3", { em: (chunks) => <em>{chunks}</em> })}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-2xl p-6 space-y-5"
        >
          <div className="flex items-start gap-3">
            <Globe2 className="h-5 w-5 text-verde-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-ink-50 text-sm">{t("sidebar.europeanTitle")}</h3>
              <p className="text-sm text-ink-300 mt-1 leading-relaxed">
                {t.rich("sidebar.europeanText", { strong: (chunks) => <strong>{chunks}</strong> })}
              </p>
            </div>
          </div>

          <div className="border-t border-ink-800 pt-4">
            <h3 className="font-semibold text-ink-50 text-sm mb-2">{t("sidebar.trajectoryTitle")}</h3>
            <ul className="space-y-2 text-sm text-ink-300">
              <li className="flex gap-2">
                <span className="font-mono text-xs text-verde-400 shrink-0 pt-0.5">2026</span>
                <span>{t("sidebar.trajectory2026")}</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-xs text-verde-400 shrink-0 pt-0.5">2026–28</span>
                <span>{t("sidebar.trajectory2026_28")}</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-xs text-verde-400 shrink-0 pt-0.5">2035</span>
                <span>
                  {t("sidebar.trajectory2035Pre")}{" "}
                  <a
                    href="https://grupulverde.ro/proiecte/ai-cetateni/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-verde-500/50 hover:decoration-verde-400"
                  >
                    {t("sidebar.trajectory2035LinkText")}
                  </a>{" "}
                  {t("sidebar.trajectory2035Post")}
                </span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-16">
        {GALERIE.map((img, index) => (
          <motion.div
            key={img.src}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="relative aspect-[4/5] rounded-xl overflow-hidden glass-card"
          >
            <Image src={img.src} alt={img.alt} fill sizes="(max-width: 640px) 50vw, 33vw" className="object-cover" />
          </motion.div>
        ))}
      </div>
      <p className="text-center text-xs text-ink-500 italic -mt-12 mb-16">{t("galleryCaption")}</p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-10"
      >
        <p className="text-xs uppercase tracking-widest text-verde-400 font-medium">{t("programsEyebrow")}</p>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-2 text-ink-50">{t("programsHeading")}</h3>
        <p className="text-sm text-ink-300 mt-3">
          {t("programsSubtextPre")}{" "}
          <a
            href="https://grupulverde.ro/"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-verde-500/50 hover:decoration-verde-400"
          >
            {t("programsSubtextLinkText")}
          </a>{" "}
          {t("programsSubtextPost")}
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROGRAM_KEYS.map((key, index) => (
          <motion.a
            key={key}
            href={`https://grupulverde.ro/proiecte/${PROGRAM_SLUGS[key]}/`}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            className="glass-card rounded-2xl p-5 group hover:shadow-glow transition-shadow flex flex-col"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-mono text-xs text-verde-400">{String(index + 1).padStart(2, "0")}</span>
              <ArrowUpRight className="h-4 w-4 text-ink-600 group-hover:text-verde-400 transition-colors" />
            </div>
            <h4 className="font-semibold text-ink-50 mt-2">{t(`programs.${key}.title`)}</h4>
            <p className="text-sm text-ink-300 mt-1.5 leading-relaxed flex-1">{t(`programs.${key}.tagline`)}</p>
            <p className="text-xs font-medium text-verde-400 mt-3">{t(`programs.${key}.stat`)}</p>
          </motion.a>
        ))}
      </div>

      <div className="text-center mt-10">
        <a
          href="https://grupulverde.ro/proiecte/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-verde-500 hover:bg-verde-400 text-ink-900 font-semibold px-6 py-3 shadow-glow-verde transition-all hover:scale-[1.03]"
        >
          {t("exploreAll")}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
