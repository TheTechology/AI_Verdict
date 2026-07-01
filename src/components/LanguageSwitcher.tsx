"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(nextLocale: string) {
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div
      role="group"
      aria-label="Language"
      className={`relative inline-flex items-center rounded-full glass-card p-1 ${className}`}
    >
      {routing.locales.map((l) => {
        const isActive = locale === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => switchTo(l)}
            aria-current={isActive ? "true" : undefined}
            className="relative h-7 w-10 rounded-full text-xs font-semibold transition-colors"
          >
            {isActive && (
              <motion.span
                layoutId="lang-active-pill"
                className="absolute inset-0 rounded-full bg-verde-500"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className={`relative z-10 ${isActive ? "text-ink-900" : "text-ink-400"}`}>
              {l.toUpperCase()}
            </span>
          </button>
        );
      })}
    </div>
  );
}
