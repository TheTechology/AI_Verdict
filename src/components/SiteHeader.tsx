"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const NAV_KEYS = ["piloni", "cercetare", "educatie", "povestea", "echipa"] as const;

export function SiteHeader() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);

      const current = NAV_KEYS.map((id) => {
        const el = document.getElementById(id);
        return { id, top: el ? el.getBoundingClientRect().top : Infinity };
      })
        .filter((section) => section.top <= 120)
        .sort((a, b) => b.top - a.top)[0];

      setActiveSection(current?.id ?? null);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 bg-ink-900 border-b border-ink-800 transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)]" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <a href="#top" onClick={() => setMobileOpen(false)} className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {NAV_KEYS.map((key) => {
            const isActive = activeSection === key;
            return (
              <a
                key={key}
                href={`#${key}`}
                className={`relative px-3.5 py-2 rounded-full transition-colors ${
                  isActive ? "text-ink-50" : "text-ink-400 hover:text-ink-100"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-verde-800/40 border border-verde-700/40"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{t(key)}</span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher className="shrink-0" />

          <a
            href="#analiza"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-verde-500 hover:bg-verde-400 text-ink-900 text-sm font-semibold px-4 py-2 transition-all hover:scale-[1.03] shrink-0"
          >
            {t("cta")}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? t("menuClose") : t("menuOpen")}
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full glass-card text-ink-100 shrink-0"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden bg-ink-900 border-t border-ink-800 overflow-hidden"
          >
            <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_KEYS.map((key) => {
                const isActive = activeSection === key;
                return (
                  <a
                    key={key}
                    href={`#${key}`}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive ? "bg-verde-800/40 text-ink-50" : "text-ink-300 hover:bg-ink-800/60 hover:text-ink-50"
                    }`}
                  >
                    {t(key)}
                  </a>
                );
              })}
              <a
                href="#analiza"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-verde-500 text-ink-900 text-sm font-semibold px-4 py-3"
              >
                {t("cta")}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
