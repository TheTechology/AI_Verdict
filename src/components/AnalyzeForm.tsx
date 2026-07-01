"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";

interface AnalyzeFormProps {
  onSubmit: (input: { text: string; url?: string }) => void;
  loading: boolean;
}

export function AnalyzeForm({ onSubmit, loading }: AnalyzeFormProps) {
  const t = useTranslations("analyzeForm");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!text.trim()) return;
    onSubmit({ text: text.trim(), url: url.trim() || undefined });
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-6 shadow-sm space-y-5"
    >
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-ink-200 mb-1.5">
          {t("urlLabel")} <span className="text-ink-500 font-normal">{t("urlOptional")}</span>
        </label>
        <input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={t("urlPlaceholder")}
          className="w-full rounded-xl border border-ink-700 bg-ink-900/40 px-3.5 py-2.5 text-sm text-ink-50 placeholder:text-ink-500 transition-shadow focus:outline-none focus:ring-2 focus:ring-verde-400 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="text" className="block text-sm font-medium text-ink-200 mb-1.5">
          {t("textLabel")}
        </label>
        <textarea
          id="text"
          required
          rows={8}
          maxLength={20000}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("textPlaceholder")}
          className="w-full rounded-xl border border-ink-700 bg-ink-900/40 px-3.5 py-2.5 text-sm text-ink-50 placeholder:text-ink-500 transition-shadow focus:outline-none focus:ring-2 focus:ring-verde-400 focus:border-transparent"
        />
        <p className="text-xs text-ink-500 mt-1 text-right">{text.length.toLocaleString()} / 20,000</p>
      </div>

      <motion.button
        type="submit"
        disabled={loading || !text.trim()}
        whileHover={loading || !text.trim() ? {} : { scale: 1.015 }}
        whileTap={loading || !text.trim() ? {} : { scale: 0.985 }}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-verde-500 hover:bg-verde-400 disabled:bg-ink-700 disabled:opacity-60 disabled:cursor-not-allowed text-ink-900 disabled:text-ink-400 font-semibold py-3 shadow-glow-verde transition-all"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("submitLoading")}
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            {t("submitIdle")}
          </>
        )}
      </motion.button>
    </motion.form>
  );
}
