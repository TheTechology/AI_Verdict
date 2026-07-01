import { Leaf } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-800 mt-24">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-400">
        <p className="flex items-center gap-1.5">
          <Leaf className="h-3.5 w-3.5 text-verde-400" />
          Pilonul digital al{" "}
          <a
            href="https://grupulverde.ro/proiecte/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-ink-200 underline decoration-verde-400/50 hover:decoration-verde-400"
          >
            strategiei 2026–2035 a Asociației Grupul Verde
          </a>{" "}
          — 9 programe, 3.900+ beneficiari, Adjud, Vrancea
        </p>
        <div className="flex items-center gap-4">
          <a href="#top" className="hover:underline">
            Sus de tot
          </a>
          <a href="/confidentialitate" className="hover:underline">
            Confidențialitate
          </a>
        </div>
      </div>
    </footer>
  );
}
