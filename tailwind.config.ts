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
        "glitch-1": "glitch1 2s infinite",
        "glitch-2": "glitch2 2s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "orbit": "orbit 8s linear infinite",
        "scanline": "scanline 6s linear infinite",
        "flicker": "flicker 0.15s infinite",
      },
      keyframes: {
        glitch1: {
          "0%, 95%, 100%": { clipPath: "inset(0 0 100% 0)", transform: "none" },
          "5%":  { clipPath: "inset(10% 0 80% 0)", transform: "translate(-3px, 0)" },
          "10%": { clipPath: "inset(50% 0 30% 0)", transform: "translate(3px, 0)" },
          "15%": { clipPath: "inset(80% 0 5%  0)", transform: "translate(-1px, 0)" },
        },
        glitch2: {
          "0%, 90%, 100%": { clipPath: "inset(0 0 100% 0)", transform: "none" },
          "92%": { clipPath: "inset(20% 0 60% 0)", transform: "translate(4px, 0)" },
          "96%": { clipPath: "inset(70% 0 10% 0)", transform: "translate(-4px, 0)" },
        },
        orbit: {
          from: { transform: "rotate(0deg) translateX(30px) rotate(0deg)" },
          to:   { transform: "rotate(360deg) translateX(30px) rotate(-360deg)" },
        },
        scanline: {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
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
