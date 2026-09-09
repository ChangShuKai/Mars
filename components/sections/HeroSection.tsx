"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import StarField from "@/components/ui/StarField";

interface MarsData {
  distance_million_km: number;
  light_minutes: number;
  mars_sol: number;
}

export default function HeroSection() {
  const [marsData, setMarsData] = useState<MarsData | null>(null);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    fetch("/api/mars-distance")
      .then((r) => r.json())
      .then(setMarsData)
      .catch(console.error);
  }, []);

  useEffect(() => {
    setCurrentTime(new Date());
    const id = window.setInterval(() => setCurrentTime(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  // Mars Sol calculation (Curiosity reference)
  const marsSol = marsData?.mars_sol ?? "---";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <StarField />

      {/* Atmospheric glow */}
      <div className="absolute inset-0 bg-mars-gradient pointer-events-none z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-mono text-xs text-mars-400 tracking-[0.4em] uppercase mb-8 flex items-center gap-3"
        >
          <span className="inline-block w-8 h-px bg-mars-500" />
          NASA Real Data
          <span className="inline-block w-8 h-px bg-mars-500" />
        </motion.div>

        {/* MARS title with glitch */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="relative glitch-container mb-4"
        >
          <h1
            className="text-[clamp(5rem,20vw,16rem)] font-display font-bold leading-none tracking-tighter"
            style={{
              background: "linear-gradient(180deg, #ff9966 0%, #e85d1a 40%, #7a2810 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
            }}
          >
            MARS
          </h1>
          {/* Glitch layers */}
          <span
            className="glitch-layer-1 text-[clamp(5rem,20vw,16rem)] font-display font-bold leading-none tracking-tighter absolute top-0 left-0 w-full"
            aria-hidden
          >
            MARS
          </span>
          <span
            className="glitch-layer-2 text-[clamp(5rem,20vw,16rem)] font-display font-bold leading-none tracking-tighter absolute top-0 left-0 w-full"
            aria-hidden
          >
            MARS
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-display text-xl sm:text-2xl text-[var(--text-secondary)] tracking-widest uppercase mb-12"
        >
          火星探索計劃 · The Red Planet
        </motion.p>

        {/* Live Data HUD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="glass-card border border-mars-500/20 rounded-lg px-6 py-4 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3 font-mono text-xs"
        >
          <div className="flex flex-col items-center">
            <span className="text-[var(--text-muted)] tracking-wider mb-1">距地球</span>
            <span className="text-mars-400 text-sm font-bold data-pulse">
              {marsData ? `${marsData.distance_million_km.toFixed(1)} 百萬km` : "計算中..."}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[var(--text-muted)] tracking-wider mb-1">信號延遲</span>
            <span className="text-mars-400 text-sm font-bold data-pulse">
              {marsData ? `${marsData.light_minutes.toFixed(1)} 分鐘` : "---"}
            </span>
          </div>
          <div className="flex flex-col items-center col-span-2 sm:col-span-1">
            <span className="text-[var(--text-muted)] tracking-wider mb-1">當前 Sol</span>
            <span className="text-mars-400 text-sm font-bold data-pulse">Sol {marsSol}</span>
          </div>
          <div className="flex flex-col items-center col-span-2 sm:col-span-3 border-t border-mars-500/10 pt-3 mt-1">
            <span className="text-[var(--text-muted)] tracking-wider mb-1">地球時間 (UTC)</span>
            <span className="text-[var(--text-secondary)] text-sm terminal-cursor">
              {currentTime?.toUTCString().replace("GMT", "UTC") ?? "---"}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase">
          向下探索
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-mars-500" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-space-950 to-transparent z-[2]" />
    </section>
  );
}
