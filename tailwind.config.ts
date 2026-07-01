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
    },
  },
  plugins: [],
};

export default config;
