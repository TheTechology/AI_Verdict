"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

const STEPS = [
  "Analiza sursei",
  "Analiza stilului retoric",
  "Verificarea surselor citate",
  "Detectarea semnelor de manipulare",
  "Agregarea scorurilor",
];

const STEP_INTERVAL_MS = 900;

export function AnalyzingProgress() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setActiveStep(0);
    const interval = setInterval(() => {
      setActiveStep((step) => (step < STEPS.length - 1 ? step + 1 : step));
    }, STEP_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-2xl p-6 space-y-3">
      {STEPS.map((step, index) => {
        const isDone = index < activeStep;
        const isActive = index === activeStep;

        return (
          <div key={step} className="flex items-center gap-3 text-sm">
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
                isDone
                  ? "bg-verde-500 text-white"
                  : isActive
                    ? "bg-ink-600 text-white"
                    : "bg-ink-100 dark:bg-ink-800 text-ink-400"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDone ? (
                  <motion.span key="done" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <Check className="h-3.5 w-3.5" />
                  </motion.span>
                ) : isActive ? (
                  <motion.span key="active" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  </motion.span>
                ) : (
                  <span key="pending" className="h-1.5 w-1.5 rounded-full bg-current" />
                )}
              </AnimatePresence>
            </span>
            <span
              className={
                isDone || isActive
                  ? "text-ink-800 dark:text-ink-100 font-medium"
                  : "text-ink-400 dark:text-ink-500"
              }
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}
