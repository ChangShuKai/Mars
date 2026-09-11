"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight, ExternalLink, X, Search } from "lucide-react";
import Image from "next/image";

interface NasaImageItem {
  href: string;
  data: Array<{
    title: string;
    nasa_id: string;
    date_created: string;
    description: string;
    center?: string;
    keywords?: string[];
  }>;
  links?: Array<{ href: string; rel: string; render?: string }>;
}

const ROVERS = [
  { id: "perseverance", label: "毅力號", labelEn: "Perseverance", emoji: "🤖" },
  { id: "curiosity",    label: "好奇號", labelEn: "Curiosity",    emoji: "🔭" },
] as const;

const KEYWORDS = [
  { id: "", label: "全部" },
  { id: "surface", label: "表面" },
  { id: "sample", label: "樣本" },
  { id: "panorama", label: "全景" },
  { id: "rock", label: "岩石" },
  { id: "selfie", label: "自拍" },
];

const PhotoCard = React.memo(function PhotoCard({ item, onClick, priority }: { item: NasaImageItem; onClick: (item: NasaImageItem) => void; priority?: boolean }) {
  const thumb = item.links?.find((l) => l.rel === "preview")?.href?.replace("http://", "https://");
  const data = item.data[0];
  const date = data.date_created ? new Date(data.date_created).toLocaleDateString("zh-TW") : "";

  if (!thumb) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl overflow-hidden border border-white/5 hover:border-mars-500/30 transition-all duration-300 cursor-pointer group"
      onClick={() => onClick(item)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-space-800">
        <Image
          src={thumb}
          alt={data.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-space-950/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-2 right-2">
          <Camera size={10} className="text-mars-300/70" />
        </div>
      </div>
      <div className="p-3">
        <p className="font-display text-xs text-[var(--text-secondary)] line-clamp-2 mb-1 leading-tight">
          {data.title}
        </p>
        <time className="font-mono text-[9px] text-[var(--text-muted)]" dateTime={data.date_created}>{date}</time>
      </div>
    </motion.div>
  );
});

function LightBox({ item, onClose }: { item: NasaImageItem; onClose: () => void }) {
  const data = item.data[0];
  const thumb = item.links?.find((l) => l.rel === "preview")?.href?.replace("http://", "https://");

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute -top-10 right-0 text-white/60 hover:text-white">
          <X size={24} />
        </button>
        {thumb && (
          <div className="relative w-full rounded-lg bg-space-900 overflow-hidden" style={{ height: '65vh' }}>
            <Image
              src={thumb.replace("~thumb", "~medium")}
              alt={data.title}
              fill
              className="object-contain"
            />
          </div>
        )}
        <div className="mt-4 glass-card rounded-xl p-4">
          <h3 className="text-white font-display font-semibold mb-1">{data.title}</h3>
          <p className="font-mono text-[10px] text-[var(--text-muted)] mb-2">
            {data.center} · <time dateTime={data.date_created}>{data.date_created ? new Date(data.date_created).toLocaleDateString("zh-TW") : ""}</time>
          </p>
          <p className="text-[var(--text-secondary)] text-sm font-display leading-relaxed line-clamp-3">
            {data.description}
          </p>
          <div className="mt-3 flex items-center gap-4">
            <a
              href={`https://images.nasa.gov/details/${data.nasa_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-mono text-xs text-mars-400 hover:text-mars-300"
            >
              NASA 頁面 <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function RoverFeed() {
  const [rover, setRover] = useState<"perseverance" | "curiosity">("perseverance");
  const [keyword, setKeyword] = useState("");
  const [photos, setPhotos] = useState<NasaImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<NasaImageItem | null>(null);
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const params = new URLSearchParams({
        rover,
        ...(keyword ? { keyword } : {}),
        page: String(page),
      });
      const res = await fetch(`/api/rover-photos?${params}`);
      const data = await res.json();
      const items: NasaImageItem[] = data?.collection?.items ?? [];
      // Filter to only items with preview images
      setPhotos(items.filter((item) => item.links?.some((l) => l.rel === "preview")));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [rover, keyword, page]);

  useEffect(() => { load(); }, [load]);

  return (
    <section id="rovers" className="relative py-24 bg-space-900/50">
      <AnimatePresence>
        {selected && <LightBox item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      <div className="section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="font-mono text-xs text-mars-400 tracking-[0.3em] uppercase mb-3">
            NASA Image & Video Library
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-4">
            探測車圖片牆
          </h2>
          <p className="text-[var(--text-secondary)] font-display text-lg max-w-2xl">
            NASA 官方媒體庫精選 — 真實火星表面影像。點擊圖片放大查看。
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Rover toggle */}
          <div className="flex rounded-lg border border-mars-500/20 overflow-hidden" role="group" aria-label="Rover Selection">
            {ROVERS.map((r) => (
              <button
                key={r.id}
                aria-pressed={rover === r.id}
                onClick={() => { setRover(r.id); setPage(1); }}
                className={`px-4 py-2 font-mono text-xs transition-colors ${
                  rover === r.id
                    ? "bg-mars-500/20 text-mars-300"
                    : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                }`}
              >
                {r.emoji} {r.label}
              </button>
            ))}
          </div>

          {/* Keyword filter */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Keyword Filter">
            {KEYWORDS.map((k) => (
              <button
                key={k.id}
                aria-pressed={keyword === k.id}
                onClick={() => { setKeyword(k.id); setPage(1); }}
                className={`px-3 py-1 rounded font-mono text-[10px] border transition-colors ${
                  keyword === k.id
                    ? "border-mars-500/60 bg-mars-500/15 text-mars-400"
                    : "border-white/10 text-[var(--text-muted)] hover:border-mars-500/30"
                }`}
              >
                {k.label}
              </button>
            ))}
          </div>
        </div>

        {/* Photo grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-space-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 text-[var(--text-muted)] font-mono text-sm">
            <p>⚠ 無法從 NASA API 載入照片</p>
            <button onClick={load} className="mt-4 text-mars-400 hover:text-mars-300">重試</button>
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-20 text-[var(--text-muted)] font-mono text-sm">
            <Search size={24} className="mx-auto mb-3 opacity-30" />
            此條件暫無照片
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {photos.map((item, i) => (
              <PhotoCard key={`${item.data[0].nasa_id}-${i}`} item={item} onClick={setSelected} priority={i < 4} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && photos.length > 0 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-4 py-2 font-mono text-xs border border-mars-500/20 rounded text-[var(--text-secondary)] hover:border-mars-500/40 disabled:opacity-30"
            >
              <ChevronLeft size={12} /> 上一頁
            </button>
            <span className="font-mono text-xs text-[var(--text-muted)]">第 {page} 頁</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="flex items-center gap-1 px-4 py-2 font-mono text-xs border border-mars-500/20 rounded text-[var(--text-secondary)] hover:border-mars-500/40"
            >
              下一頁 <ChevronRight size={12} />
            </button>
          </div>
        )}

        <p className="text-center font-mono text-[10px] text-[var(--text-muted)] mt-4">
          資料來源：NASA Image &amp; Video Library · images-api.nasa.gov
        </p>
      </div>
    </section>
  );
}
