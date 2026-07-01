"use client";

import { motion } from "framer-motion";
import { Award, Code2, Palette, Database, Users, type LucideIcon } from "lucide-react";

interface Volunteer {
  icon: LucideIcon;
  role: string;
  contribution: string;
  howJoined: string;
}

const VOLUNTEERS: Volunteer[] = [
  {
    icon: Code2,
    role: "Voluntar · Arhitectură & Backend",
    contribution: "A construit pipeline-ul de analiză și integrarea cu motorul de raționament AI.",
    howJoined: "Venit din cursurile Cisco Networking Academy ale Asociației Grupul Verde.",
  },
  {
    icon: Palette,
    role: "Voluntar · Interfață & Experiență",
    contribution: "A dat formă vizuală filosofiei aplicației — de la wireframe la interacțiune.",
    howJoined: "Ajuns în echipă prin atelierele de educație digitală ale rețelei.",
  },
  {
    icon: Database,
    role: "Voluntar · Date & Metodologie",
    contribution: "A lucrat la scorurile de credibilitate și la alinierea cu standardele de cercetare a dezinformării.",
    howJoined: "Implicat inițial în Code.org și robotică Marty, apoi în programul de literație AI.",
  },
  {
    icon: Users,
    role: "Voluntar · Comunitate & Testare",
    contribution: "A coordonat testarea pe conținut real, calibrând aplicația împotriva supra-marcării opiniilor legitime.",
    howJoined: "Venit din activismul civic al rețelei Grupul Verde, atras de miza educațională a proiectului.",
  },
];

export function TeamSection() {
  return (
    <section id="echipa" className="max-w-6xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <p className="text-xs uppercase tracking-widest text-verde-400 font-medium">
          Cine a construit aplicația
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-ink-50">
          Echipa din spatele <span className="text-gradient">VERIDIC</span>
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
          <p className="text-xs uppercase tracking-widest text-verde-400 font-medium">
            Coordonator Program Național
          </p>
          <h3 className="font-serif text-xl font-bold text-ink-50 mt-1">Marian Dumitru</h3>
          <p className="text-sm text-ink-300 mt-2.5 leading-relaxed">
            IT Coordinator și Project Manager al Asociației Grupul Verde, unde ocupă și funcția de
            Director de Programe Educaționale. Formator acreditat ANC, instructor certificat Cisco
            Networking Academy și trainer acreditat FPED pe educație AI, cu experiență extinsă în
            scriere și management de proiecte europene (Horizon Europe, programul LIFE, Erasmus+)
            și în coordonarea de consorții internaționale multi-partener.
          </p>
          <p className="text-sm text-ink-300 mt-2.5 leading-relaxed">
            A inițiat programul „IA în România" ca răspuns direct la nevoia de infrastructură
            educațională digitală identificată în rândul tinerilor din Vrancea — și a coordonat
            nucleul de 13 tineri care a transformat acea nevoie în VERIDIC, prima livrare
            concretă a programului.
          </p>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {VOLUNTEERS.map((volunteer, index) => (
          <motion.div
            key={volunteer.role}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="glass-card rounded-2xl p-5"
          >
            <volunteer.icon className="h-5 w-5 text-verde-400 mb-3" />
            <h4 className="font-semibold text-ink-50 text-sm">{volunteer.role}</h4>
            <p className="text-sm text-ink-300 mt-2 leading-relaxed">{volunteer.contribution}</p>
            <p className="text-xs text-ink-500 mt-2.5 italic">{volunteer.howJoined}</p>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-xs text-ink-500 italic mt-8">
        Numele complete ale celor 4 voluntari vor fi adăugate cu acordul lor explicit.
      </p>
    </section>
  );
}
