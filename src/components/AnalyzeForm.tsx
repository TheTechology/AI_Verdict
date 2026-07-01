"use client";

import { FormEvent, useState } from "react";

interface AnalyzeFormProps {
  onSubmit: (input: { text: string; url?: string }) => void;
  loading: boolean;
}

export function AnalyzeForm({ onSubmit, loading }: AnalyzeFormProps) {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!text.trim()) return;
    onSubmit({ text: text.trim(), url: url.trim() || undefined });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-petrol-200 dark:border-petrol-700 bg-white dark:bg-petrol-900/40 p-6 shadow-sm space-y-4"
    >
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-petrol-700 dark:text-petrol-200 mb-1">
          URL sursă (opțional)
        </label>
        <input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://exemplu.ro/articol"
          className="w-full rounded-lg border border-petrol-200 dark:border-petrol-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-petrol-400"
        />
      </div>

      <div>
        <label htmlFor="text" className="block text-sm font-medium text-petrol-700 dark:text-petrol-200 mb-1">
          Text de analizat
        </label>
        <textarea
          id="text"
          required
          rows={8}
          maxLength={20000}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Lipește aici articolul, postarea sau fragmentul de text pe care vrei să îl analizezi..."
          className="w-full rounded-lg border border-petrol-200 dark:border-petrol-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-petrol-400"
        />
        <p className="text-xs text-petrol-400 mt-1 text-right">{text.length} / 20000</p>
      </div>

      <button
        type="submit"
        disabled={loading || !text.trim()}
        className="w-full rounded-lg bg-petrol-600 hover:bg-petrol-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 transition-colors"
      >
        {loading ? "Se analizează..." : "Analizează"}
      </button>
    </form>
  );
}
