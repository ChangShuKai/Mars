"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import StarField from "@/components/ui/StarField";
import { ChevronLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-space-950 text-white selection:bg-mars-500/30 selection:text-white">
      <StarField />
      
      {/* Atmospheric glow */}
      <div className="absolute inset-0 bg-mars-gradient pointer-events-none z-[1]" />

      <div className="relative z-10 text-center px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glitch-container mb-4"
        >
          <h1
            className="text-[clamp(5rem,15vw,10rem)] font-display font-bold leading-none tracking-tighter"
            style={{
              background: "linear-gradient(180deg, #ff9966 0%, #e85d1a 40%, #7a2810 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </h1>
          <span className="glitch-layer-1 text-[clamp(5rem,15vw,10rem)] font-display font-bold leading-none tracking-tighter absolute top-0 left-0 w-full" aria-hidden>
            404
          </span>
          <span className="glitch-layer-2 text-[clamp(5rem,15vw,10rem)] font-display font-bold leading-none tracking-tighter absolute top-0 left-0 w-full" aria-hidden>
            404
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-mono text-mars-400 tracking-widest uppercase mb-8"
        >
          Signal Lost · 通訊中斷
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[var(--text-secondary)] font-display text-lg mb-10 max-w-md"
        >
          探測器無法在這個座標找到任何資料。請確認您的導航參數是否正確。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mars-500/10 text-mars-300 border border-mars-500/30 hover:bg-mars-500/20 hover:text-white hover:border-mars-500/50 transition-all font-mono text-sm shadow-[0_0_20px_rgba(232,93,26,0.15)]"
          >
            <ChevronLeft size={16} />
            返回任務指揮中心
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
