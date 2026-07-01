"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";

const NAV_LINKS = [
  { href: "#impact", label: "Impact" },
  { href: "#piloni", label: "Piloni" },
  { href: "#educatie", label: "Educație" },
  { href: "#povestea", label: "Povestea" },
];

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
        scrolled ? "glass-card border-b" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#top">
          <Logo />
        </a>

        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-ink-300">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-ink-50 transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#analiza"
          className="inline-flex items-center rounded-full bg-verde-500 hover:bg-verde-400 text-ink-900 text-sm font-semibold px-4 py-2 transition-colors"
        >
          Analizează
        </a>
      </div>
    </header>
  );
}
