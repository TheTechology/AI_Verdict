import type { Config } from "tailwindcss";

// Paletă derivată din identitatea vizuală grupulverde.ro (verde "wise-green" +
// negru-aproape + off-white, fără accente albastre) — vezi și nota din README.
// Site permanent pe temă întunecată — nu există variantă luminoasă.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          50: "#fafaf7",
          100: "#e8ebe6",
          200: "#d3d7d0",
          300: "#b0b5ac",
          400: "#868685",
          500: "#6b6d68",
          600: "#454745",
          700: "#2b2d29",
          800: "#181915",
          900: "#0e0f0c",
        },
        verde: {
          50: "#e2f6d5",
          100: "#cdffad",
          200: "#b3ef8c",
          300: "#9fe870",
          400: "#7ccf4e",
          500: "#4f9e34",
          600: "#2d6b1e",
          700: "#054d28",
          800: "#163300",
          900: "#0a1f0a",
        },
        score: {
          solid: "#054d28",
          mixed: "#8a6a12",
          risky: "#a8571a",
          severe: "#b7282e",
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
        glow: "0 0 40px -8px rgba(90, 158, 52, 0.45)",
        "glow-verde": "0 0 40px -8px rgba(159, 232, 112, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
