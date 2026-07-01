"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-16" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="h-9 w-16 rounded-full border border-petrol-300 dark:border-petrol-700 bg-white/60 dark:bg-petrol-800/60 px-1 flex items-center transition-colors"
      aria-label="Comută mod luminos/întunecat"
    >
      <span
        className={`h-7 w-7 rounded-full bg-petrol-600 dark:bg-verde-400 transition-transform ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
}
