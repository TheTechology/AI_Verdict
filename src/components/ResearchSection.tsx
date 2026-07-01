"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface OrgMeta {
  key: string;
  url: string;
  hasPillarTag?: boolean;
}

const ORGS: OrgMeta[] = [
  { key: "dfrlab", url: "https://dfrlab.org/" },
  { key: "bellingcat", url: "https://www.bellingcat.com/", hasPillarTag: true },
  { key: "isd", url: "https://www.isdglobal.org/" },
  { key: "globsec", url: "https://en.wikipedia.org/wiki/GLOBSEC" },
  { key: "euvsdisinfo", url: "https://euvsdisinfo.eu/", hasPillarTag: true },
  { key: "nato", url: "https://stratcomcoe.org/" },
];

export function ResearchSection() {
  const t = useTranslations("research");
  const marqueeOrgs = [...ORGS, ...ORGS];

  return (
    <section id="cercetare" className="py-20 border-y border-ink-800">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-12 px-4"
      >
        <p className="text-xs uppercase tracking-widest text-verde-400 font-medium">{t("eyebrow")}</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-ink-50">
          {t("headingPre")} <span className="text-gradient">{t("headingHighlight")}</span>
        </h2>
        <p className="text-sm text-ink-400 mt-3">{t("subtext")}</p>
      </motion.div>

      <div className="relative overflow-hidden mb-14 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
          {marqueeOrgs.map((org, index) => (
            <span
              key={`${org.key}-${index}`}
              className="glass-card rounded-full px-6 py-3 text-sm font-semibold text-ink-100 whitespace-nowrap shrink-0"
            >
              {t(`orgs.${org.key}.name`)}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ORGS.map((org, index) => (
          <motion.a
            key={org.key}
            href={org.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="glass-card rounded-2xl p-5 group hover:shadow-glow transition-shadow flex flex-col"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-ink-50">{t(`orgs.${org.key}.name`)}</h3>
              <ArrowUpRight className="h-4 w-4 text-ink-600 group-hover:text-verde-400 transition-colors shrink-0" />
            </div>
            <p className="text-xs text-ink-500 mt-1">{t(`orgs.${org.key}.location`)}</p>
            <p className="text-sm text-ink-300 mt-2.5 leading-relaxed flex-1">{t(`orgs.${org.key}.description`)}</p>
            {org.hasPillarTag && (
              <span className="inline-block mt-3 text-[11px] font-medium text-verde-400 w-fit rounded-full bg-verde-800/40 px-2.5 py-1">
                {t(`orgs.${org.key}.pillarTag`)}
              </span>
            )}
          </motion.a>
        ))}
      </div>

      <p className="text-center text-xs text-ink-500 italic mt-10 px-4">{t("disclaimer")}</p>
    </section>
  );
}
