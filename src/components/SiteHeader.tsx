"use client";

import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-card border-b shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-serif font-bold text-ink-800 dark:text-ink-100">
          <ShieldCheck className="h-6 w-6 text-verde-600 dark:text-verde-400" />
          VERITAS AI
        </a>

        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-ink-600 dark:text-ink-300">
          <a href="#piloni" className="hover:text-ink-800 dark:hover:text-ink-100 transition-colors">
            Piloni de analiză
          </a>
          <a href="#analiza" className="hover:text-ink-800 dark:hover:text-ink-100 transition-colors">
            Analizează
          </a>
          <a href="/confidentialitate" className="hover:text-ink-800 dark:hover:text-ink-100 transition-colors">
            Confidențialitate
          </a>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
