"use client";

import { Suspense, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Compass, ZoomIn, Move } from "lucide-react";

// Dynamic import to avoid SSR issues with Three.js
const PanoramaCanvas = dynamic(() => import("@/components/ui/PanoramaCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-space-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-mars-500 border-t-transparent animate-spin" />
        <p className="font-mono text-xs text-mars-400 tracking-widest">載入火星全景...</p>
      </div>
    </div>
  ),
});

export default function PanoramaViewer() {
  return (
    <section id="panorama" className="relative min-h-screen bg-space-950 py-16">
      <div className="section-padding mb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-xs text-mars-400 tracking-[0.3em] uppercase mb-3">
            360° Interactive Panorama
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-4">
            耶澤羅隕石坑
          </h2>
          <p className="text-[var(--text-secondary)] font-display text-lg max-w-2xl">
            NASA 毅力號（Perseverance）著陸地點全景。使用滑鼠拖動自由探索，
            滾輪縮放。圖像版權：NASA/JPL-Caltech/ASU/MSSS
          </p>
        </motion.div>
      </div>

      {/* Panorama Viewport */}
      <div className="relative w-full" style={{ height: "70vh" }}>
        {/* HUD overlay */}
        <div className="absolute top-4 left-4 z-20 glass-card rounded-lg px-3 py-2 font-mono text-xs text-mars-400 border border-mars-500/20">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>PERSEVERANCE CAM ACTIVE</span>
          </div>
          <div className="text-[var(--text-muted)] text-[10px]">
            JEZERO CRATER · 18.4446°N, 77.4509°E
          </div>
          <div className="text-[var(--text-muted)] text-[10px]">
            Sol 46 · Feb 25, 2021
          </div>
        </div>

        {/* Controls hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
          <div className="glass-card rounded-lg px-4 py-2 flex items-center gap-4 border border-white/5">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--text-muted)]">
              <Move size={12} className="text-mars-400" />
              拖動旋轉
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--text-muted)]">
              <ZoomIn size={12} className="text-mars-400" />
              滾輪縮放
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--text-muted)]">
              <Compass size={12} className="text-mars-400" />
              360°全景
            </div>
          </div>
        </div>

        <Suspense fallback={null}>
          <PanoramaCanvas />
        </Suspense>
      </div>

      {/* NASA attribution */}
      <div className="section-padding mt-4">
        <p className="font-mono text-[10px] text-[var(--text-muted)] text-center">
          Image Credit: NASA/JPL-Caltech/ASU/MSSS — First Perseverance Color Panorama, Jezero Crater, Mars (2021)
          · Public Domain
        </p>
      </div>
    </section>
  );
}
