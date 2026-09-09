"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Star, Calendar } from "lucide-react";
import Image from "next/image";
import type { ApodResponse } from "@/types/nasa";

export default function ApodSection() {
  const [apod, setApod] = useState<ApodResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch("/api/apod")
      .then((r) => r.json())
      .then((d) => { setApod(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="apod" className="relative py-24 bg-space-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-mars-700/5 rounded-full blur-3xl" />
      </div>

      <div className="section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-xs text-mars-400 tracking-[0.3em] uppercase mb-3">
            NASA Astronomy Picture of the Day
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-4">
            今日天文圖片
          </h2>
          <p className="text-[var(--text-secondary)] font-display text-lg max-w-xl mx-auto">
            NASA 每日精選宇宙影像，由天文學家撰寫說明
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 rounded-full border-2 border-mars-500 border-t-transparent animate-spin" />
          </div>
        ) : apod ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass-card rounded-2xl overflow-hidden border border-mars-500/10 hover:border-mars-500/25 transition-colors"
          >
            {/* Media */}
            <div className="relative aspect-video bg-space-900">
              {apod.media_type === "image" ? (
                <Image
                  src={apod.hdurl || apod.url}
                  alt={apod.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              ) : (
                <iframe
                  src={apod.url}
                  title={apod.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              )}
              {/* Overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-space-950 to-transparent" />
            </div>

            {/* Info */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Star size={14} className="text-mars-400" />
                    <span className="font-mono text-xs text-mars-400 tracking-wider">APOD</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">{apod.title}</h3>
                  {apod.copyright && (
                    <p className="font-mono text-xs text-[var(--text-muted)] mt-1">
                      © {apod.copyright}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Calendar size={12} className="text-[var(--text-muted)]" />
                  <span className="font-mono text-xs text-[var(--text-muted)]">{apod.date}</span>
                </div>
              </div>

              <p className={`text-[var(--text-secondary)] font-display leading-relaxed text-sm ${
                !expanded ? "line-clamp-3" : ""
              }`}>
                {apod.explanation}
              </p>

              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="font-mono text-xs text-mars-400 hover:text-mars-300 transition-colors"
                >
                  {expanded ? "收起" : "閱讀全文"}
                </button>
                <a
                  href={apod.hdurl || apod.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-mono text-xs text-[var(--text-muted)] hover:text-mars-400 transition-colors"
                >
                  高清原圖 <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-20 font-mono text-sm text-[var(--text-muted)]">
            無法載入今日天文圖片
          </div>
        )}
      </div>
    </section>
  );
}
