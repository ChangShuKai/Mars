import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mars: {
          50:  "#fff4ee",
          100: "#ffe4cc",
          200: "#ffc699",
          300: "#ff9f60",
          400: "#ff7b33",
          500: "#e85d1a",
          600: "#c44612",
          700: "#9e3410",
          800: "#7a2810",
          900: "#5c1e0e",
        },
        space: {
          950: "#050508",
          900: "#0a0a14",
          800: "#10101e",
          700: "#171728",
          600: "#1e1e35",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "Courier New", "monospace"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backgroundImage: {
        "mars-gradient":
          "radial-gradient(ellipse at 20% 50%, rgba(232, 93, 26, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(196, 70, 18, 0.1) 0%, transparent 50%)",
      },
    },
  },
  plugins: [],
};
export default config;
