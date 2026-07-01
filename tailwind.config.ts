import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        petrol: {
          50: "#eef6f6",
          100: "#d3e9e9",
          200: "#a8d3d3",
          300: "#78b7b8",
          400: "#4b969a",
          500: "#2f7a7f",
          600: "#215f65",
          700: "#1a4a50",
          800: "#153a3f",
          900: "#0f2b2f",
        },
        verde: {
          50: "#eef5ee",
          100: "#d5e7d4",
          200: "#aecfab",
          300: "#82b47e",
          400: "#5f9a5a",
          500: "#457f42",
          600: "#356433",
          700: "#2a4f29",
          800: "#213e21",
          900: "#182e18",
        },
        score: {
          solid: "#3f8f5f",
          mixed: "#c99a2e",
          risky: "#cc7a30",
          severe: "#b8433a",
        },
      },
      keyframes: {
        "blob-float": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(3%, -4%) scale(1.08)" },
          "66%": { transform: "translate(-3%, 3%) scale(0.95)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        "blob-float": "blob-float 16s ease-in-out infinite",
        "blob-float-slow": "blob-float 24s ease-in-out infinite reverse",
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        shimmer: "shimmer 2.5s linear infinite",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(47, 122, 127, 0.45)",
        "glow-verde": "0 0 40px -8px rgba(95, 154, 90, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
