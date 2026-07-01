"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";

const NAV_LINKS = [
  { href: "#impact", label: "Impact" },
  { href: "#piloni", label: "Piloni" },
  { href: "#educatie", label: "Educație" },
  { href: "#povestea", label: "Povestea" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.slice(1));

    const onScroll = () => {
      setScrolled(window.scrollY > 8);

      const current = sectionIds
        .map((id) => {
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card border-b shadow-[0_1px_0_0_rgba(250,250,247,0.06)]" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#top" onClick={() => setMobileOpen(false)} className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden sm:flex items-center gap-1 text-sm font-medium">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
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
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#analiza"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-verde-500 hover:bg-verde-400 text-ink-900 text-sm font-semibold px-4 py-2 transition-all hover:scale-[1.03]"
          >
            Analizează
            <ArrowRight className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={mobileOpen}
            className="sm:hidden inline-flex items-center justify-center h-10 w-10 rounded-full glass-card text-ink-100"
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
            className="sm:hidden glass-card border-t border-ink-800 overflow-hidden"
          >
            <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive ? "bg-verde-800/40 text-ink-50" : "text-ink-300 hover:bg-ink-800/60 hover:text-ink-50"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <a
                href="#analiza"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-verde-500 text-ink-900 text-sm font-semibold px-4 py-3"
              >
                Analizează
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
