"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ResearchOrg {
  name: string;
  location: string;
  description: string;
  pillarTag?: string;
  url: string;
}

const ORGS: ResearchOrg[] = [
  {
    name: "DFRLab",
    location: "Digital Forensic Research Lab · Atlantic Council, SUA",
    description: "Referință globală în analiza campaniilor de dezinformare coordonată și open-source intelligence (OSINT).",
    url: "https://dfrlab.org/",
  },
  {
    name: "Bellingcat",
    location: "Rețea globală de investigații open-source",
    description: "Metodologii de verificare a imaginilor și video — aplicabile direct Pilonului 3 (verificarea surselor).",
    pillarTag: "Pilonul 3",
    url: "https://www.bellingcat.com/",
  },
  {
    name: "ISD",
    location: "Institute for Strategic Dialogue · Marea Britanie",
    description: "Cercetare privind extremismul, dezinformarea și manipularea pe rețelele sociale.",
    url: "https://www.isdglobal.org/",
  },
  {
    name: "GLOBSEC",
    location: "Think tank · Bratislava, Slovacia",
    description: "Rapoarte anuale despre vulnerabilitatea la dezinformare în Europa Centrală — relevant direct pentru România.",
    url: "https://en.wikipedia.org/wiki/GLOBSEC",
  },
  {
    name: "EUvsDisinfo",
    location: "Serviciul European de Acțiune Externă (EEAS)",
    description: "Baza de date UE cu cazuri documentate de dezinformare — sursă directă de date pentru Pilonul 4 (manipulare).",
    pillarTag: "Pilonul 4",
    url: "https://euvsdisinfo.eu/",
  },
  {
    name: "NATO StratCom COE",
    location: "Centrul de Excelență NATO · Riga, Letonia",
    description: "Cercetare pe comunicare strategică și război informațional.",
    url: "https://stratcomcoe.org/",
  },
];

const MARQUEE_ITEMS = [...ORGS, ...ORGS];

export function ResearchSection() {
  return (
    <section id="cercetare" className="py-20 border-y border-ink-800">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-12 px-4"
      >
        <p className="text-xs uppercase tracking-widest text-verde-400 font-medium">
          Nu suntem singuri în această misiune
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-ink-50">
          Ancorat în <span className="text-gradient">cercetare globală</span>
        </h2>
        <p className="text-sm text-ink-400 mt-3">
          Metodologia VERIDIC se construiește pe standardele stabilite de organizațiile de
          referință în cercetarea dezinformării la nivel european și global.
        </p>
      </motion.div>

      <div className="relative overflow-hidden mb-14 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
          {MARQUEE_ITEMS.map((org, index) => (
            <span
              key={`${org.name}-${index}`}
              className="glass-card rounded-full px-6 py-3 text-sm font-semibold text-ink-100 whitespace-nowrap shrink-0"
            >
              {org.name}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ORGS.map((org, index) => (
          <motion.a
            key={org.name}
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
              <h3 className="font-semibold text-ink-50">{org.name}</h3>
              <ArrowUpRight className="h-4 w-4 text-ink-600 group-hover:text-verde-400 transition-colors shrink-0" />
            </div>
            <p className="text-xs text-ink-500 mt-1">{org.location}</p>
            <p className="text-sm text-ink-300 mt-2.5 leading-relaxed flex-1">{org.description}</p>
            {org.pillarTag && (
              <span className="inline-block mt-3 text-[11px] font-medium text-verde-400 w-fit rounded-full bg-verde-800/40 px-2.5 py-1">
                {org.pillarTag}
              </span>
            )}
          </motion.a>
        ))}
      </div>

      <p className="text-center text-xs text-ink-500 italic mt-10 px-4">
        Organizații de referință pentru metodologia aplicației — nu implică o afiliere sau
        parteneriat oficial.
      </p>
    </section>
  );
}
