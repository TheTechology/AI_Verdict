"use client";

import { motion } from "framer-motion";
import { GraduationCap, Trophy, School, BookOpen, type LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: GraduationCap,
    title: "Cursuri cu certificare",
    description: "Alfabetizare media interactivă, cu certificat la finalizare — dovadă reală de competență civică.",
  },
  {
    icon: Trophy,
    title: "Provocări gamificate",
    description: "Quiz-uri și provocări de recunoaștere a dezinformării, cu leaderboard — învățarea devine joc de echipă.",
  },
  {
    icon: School,
    title: "Portal pentru profesori",
    description: "Integrabil cu platformele școlare, pentru profesorii care predau gândire critică zi de zi.",
  },
  {
    icon: BookOpen,
    title: "Bibliotecă de cazuri reale",
    description: "Cazuri anonimizate și adnotate pedagogic — teorie transformată în exemple concrete.",
  },
];

export function EducationSection() {
  return (
    <section id="educatie" className="relative max-w-6xl mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-widest text-verde-400 font-medium">Educație, nu doar verdict</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-ink-50">
            România nu duce lipsă doar de <span className="text-gradient">fact-checking</span>.
          </h2>
          <p className="text-ink-300 mt-4 leading-relaxed">
            Duce lipsă de infrastructură educațională digitală — cetățeni formați să recunoască
            singuri mecanismele dezinformării. De aceea fiecare analiză din VERIDIC e și o
            lecție: nu doar „ce", ci <em>de ce</em> anume un fragment de text ridică semne de
            întrebare, cu resurse de aprofundare la un click distanță.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass-card rounded-2xl p-5"
            >
              <feature.icon className="h-5 w-5 text-verde-400 mb-3" />
              <h3 className="font-semibold text-ink-50 text-sm">{feature.title}</h3>
              <p className="text-xs text-ink-400 mt-1.5 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
