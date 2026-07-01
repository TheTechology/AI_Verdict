import { Leaf } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-100 dark:border-ink-800 mt-24">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-500 dark:text-ink-400">
        <p className="flex items-center gap-1.5">
          <Leaf className="h-3.5 w-3.5 text-verde-500" />
          Un proiect al <span className="font-medium text-ink-700 dark:text-ink-200">Asociației Grupul Verde</span>, Adjud — schelet MVP, Faza 1
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
