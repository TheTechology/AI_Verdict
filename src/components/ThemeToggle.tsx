"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

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
      className="relative h-9 w-16 rounded-full border border-ink-300 dark:border-ink-700 bg-white/60 dark:bg-ink-800/60 px-1 flex items-center transition-colors"
      aria-label="Comută mod luminos/întunecat"
    >
      <motion.span
        animate={{ x: isDark ? 26 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="h-7 w-7 rounded-full bg-verde-600 dark:bg-verde-400 flex items-center justify-center text-white dark:text-ink-900"
      >
        {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
      </motion.span>
    </button>
  );
}
