"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe2 } from "lucide-react";

const GALERIE = [
  { src: "/poveste/coding-blocuri.jpg", alt: "Primii pași în programare — logică vizuală, într-un program de educație digitală al Asociației Grupul Verde" },
  { src: "/poveste/echipa-laptop.jpg", alt: "Doi tineri, un laptop, o problemă de rezolvat împreună" },
  { src: "/poveste/laborator-echipa.jpg", alt: "Într-un laborator de calculatoare, ideile devin cod" },
  { src: "/poveste/concentrare-individuala.jpg", alt: "Concentrare totală — momentul în care tehnologia se construiește, nu doar se consumă" },
  { src: "/poveste/portret-grup.jpg", alt: "Generația care ascultă, întreabă și construiește" },
  { src: "/poveste/mentorat.jpg", alt: "Mentorat — un principiu al programului, nu un moment izolat" },
  { src: "/poveste/minecraft-edu.jpg", alt: "Educație prin joc — instrumente digitale în slujba învățării" },
  { src: "/poveste/formator-flipchart.jpg", alt: "Formare de formatori — cunoașterea circulă, nu se blochează într-o singură generație" },
  { src: "/poveste/strategie-pestle.jpg", alt: "Planificare strategică pe termen lung — schimbarea reală se gândește în ani, nu în weekend-uri" },
];

interface Program {
  nr: string;
  titlu: string;
  tagline: string;
  stat: string;
  slug: string;
}

const PROGRAME: Program[] = [
  { nr: "01", titlu: "IA în România", tagline: "Capacitate critică în fața inteligenței artificiale — o generație care înțelege, nu doar utilizează.", stat: "500+ beneficiari", slug: "ai-cetateni" },
  { nr: "02", titlu: "Cetățenie & Drepturi", tagline: "Cunoașterea drepturilor este prima condiție a exercitării lor.", stat: "400+ beneficiari", slug: "cetate-drepturi" },
  { nr: "03", titlu: "Cod & Climatică", tagline: "Soluții la criza climatică — codificate și deployate de tinerii din Vrancea.", stat: "400+ beneficiari", slug: "cod-clima" },
  { nr: "04", titlu: "Inclusiune Digitală", tagline: "Nicio barieră tehnologică nu ar trebui să devină o barieră în carieră.", stat: "200+ elevi certificați", slug: "inclusiune-digital" },
  { nr: "05", titlu: "Incubator Tineri Inovatori", tagline: "De la idee la produs funcțional — cu mentorat, tehnologie și capital local.", stat: "200+ tineri", slug: "inovatori-locali" },
  { nr: "06", titlu: "Observator Jurisprudență Verde", tagline: "Legile de protecție a mediului există. Aplicarea lor, nu întotdeauna.", stat: "500+ beneficiari", slug: "jurisprudenta-verde" },
  { nr: "07", titlu: "Laborator Mobil", tagline: "Educația tech nu ar trebui să depindă de adresa din buletin.", stat: "1000+ copii din sate", slug: "robot-sate" },
  { nr: "08", titlu: "Rețea Intergenerațională", tagline: "Tinerii predau tehnologia. Seniorii predau perspectiva.", stat: "600+ persoane conectate", slug: "seniori-tech" },
  { nr: "09", titlu: "Senzori în Arii Protejate", tagline: "Natura Vrancei, monitorizată în timp real — cu mâinile tinerilor.", stat: "500+ tineri", slug: "senzori-natura" },
];

const PROGRAM_AI = PROGRAME[0];

export function PovesteSection() {
  return (
    <section id="povestea" className="max-w-6xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <p className="text-xs uppercase tracking-widest text-verde-400 font-medium">
          Povestea din spatele aplicației
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-ink-50">
          13 tineri. O misiune <span className="text-gradient">națională</span>.
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10 items-start mb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-ink-300 leading-relaxed"
        >
          <p>
            VERIDIC nu a început ca un exercițiu tehnic. A început cu o întrebare pe care un
            nucleu de <strong className="text-ink-50">13 tineri</strong> din rețeaua Asociației
            Grupul Verde și-a pus-o direct: dacă generația noastră a crescut cu inteligența
            artificială în buzunar, de ce să fim doar consumatori ai ei — și nu ceilalți, cei care
            o construiesc pentru ceva ce contează?
          </p>
          <p>
            Răspunsul e aplicația web pe care o vezi aici. Nu e un proiect izolat de weekend, ci prima
            livrare concretă a programului{" "}
            <a
              href="https://grupulverde.ro/proiecte/ai-cetateni/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-verde-400 underline decoration-verde-500/50 hover:decoration-verde-400 inline-flex items-center gap-0.5"
            >
              {PROGRAM_AI.titlu}
              <ArrowUpRight className="h-3 w-3" />
            </a>{" "}
            — unul dintre cele 9 programe naționale 2026–2035 ale Grupului Verde, construit exact
            pentru o generație care riscă să folosească AI fără să o înțeleagă critic.
          </p>
          <p>
            Emoția din spatele codului e simplă: România se numără printre statele UE cele mai
            expuse dezinformării, iar cea mai bună apărare nu e cenzura — e o generație care știe
            <em> ce să observe</em>. Cei 13 nu au construit un „detector de minciuni", ci un
            instrument de gândire critică, exact filosofia pe care și-a asumat-o din prima zi.
          </p>
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
              <h3 className="font-semibold text-ink-50 text-sm">Dimensiunea europeană</h3>
              <p className="text-sm text-ink-300 mt-1 leading-relaxed">
                Aplicația se aliniază direct cu <strong>Digital Services Act</strong> — primul cadru
                legal european care tratează dezinformarea sistemică drept risc pentru spațiul public
                — și cu rețeaua <strong>EDMO</strong> (European Digital Media Observatory). Aceeași
                logică pe care Asociația Grupul Verde o aplică deja programelor sale — construiește local,
                documentează transparent, fă-l replicabil — e gândită de la început pentru finanțare
                și parteneriate europene: Erasmus+, Digital Europe Programme, Horizon Europe.
              </p>
            </div>
          </div>

          <div className="border-t border-ink-800 pt-4">
            <h3 className="font-semibold text-ink-50 text-sm mb-2">Traiectoria</h3>
            <ul className="space-y-2 text-sm text-ink-300">
              <li className="flex gap-2">
                <span className="font-mono text-xs text-verde-400 shrink-0 pt-0.5">2026</span>
                <span>13 tineri lansează VERIDIC — Faza 1, MVP funcțional, prima dovadă a programului.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-xs text-verde-400 shrink-0 pt-0.5">2026–28</span>
                <span>Verificare surse citate, fact-checkeri parteneri (IFCN/EDMO), API public.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-xs text-verde-400 shrink-0 pt-0.5">2035</span>
                <span>
                  Țintă asumată de programul-pilon: rețea de{" "}
                  <a
                    href="https://grupulverde.ro/proiecte/ai-cetateni/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-verde-500/50 hover:decoration-verde-400"
                  >
                    1.000+ tineri
                  </a>{" "}
                  cu competențe de literație AI, curriculum integrat în școli, reglementări locale
                  influențate de advocacy-ul propriu.
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
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>
      <p className="text-center text-xs text-ink-500 italic -mt-12 mb-16">
        Imagini din activitățile și rețeaua Asociației Grupul Verde — ilustrative pentru spiritul programului.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-10"
      >
        <p className="text-xs uppercase tracking-widest text-verde-400 font-medium">
          Zece ani, nu un trimestru
        </p>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-2 text-ink-50">
          Cele 9 programe naționale 2026–2035
        </h3>
        <p className="text-sm text-ink-300 mt-3">
          VERIDIC e pilonul digital al unei strategii mai largi a{" "}
          <a href="https://grupulverde.ro/" target="_blank" rel="noreferrer" className="underline decoration-verde-500/50 hover:decoration-verde-400">
            Asociației Grupul Verde
          </a>{" "}
          — nu proiecte punctuale, ci angajamente pe termen lung, cu ținte 2035 măsurabile.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROGRAME.map((program, index) => (
          <motion.a
            key={program.slug}
            href={`https://grupulverde.ro/proiecte/${program.slug}/`}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            className="glass-card rounded-2xl p-5 group hover:shadow-glow transition-shadow flex flex-col"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-mono text-xs text-verde-400">{program.nr}</span>
              <ArrowUpRight className="h-4 w-4 text-ink-600 group-hover:text-verde-400 transition-colors" />
            </div>
            <h4 className="font-semibold text-ink-50 mt-2">{program.titlu}</h4>
            <p className="text-sm text-ink-300 mt-1.5 leading-relaxed flex-1">{program.tagline}</p>
            <p className="text-xs font-medium text-verde-400 mt-3">{program.stat}</p>
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
          Vezi toate cele 9 programe pe grupulverde.ro
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
