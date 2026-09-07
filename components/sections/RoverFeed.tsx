"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import type { RoverPhoto } from "@/types/nasa";

const ROVERS = [
  { id: "perseverance", label: "毅力號", labelEn: "Perseverance", year: 2021 },
  { id: "curiosity", label: "好奇號", labelEn: "Curiosity", year: 2012 },
] as const;

const PERSEVERANCE_CAMERAS = [
  { id: "", label: "全部" },
  { id: "NAVCAM_LEFT", label: "導航左" },
  { id: "NAVCAM_RIGHT", label: "導航右" },
  { id: "MCZ_LEFT", label: "主相機左" },
  { id: "MCZ_RIGHT", label: "主相機右" },
  { id: "FRONT_HAZCAM_LEFT_A", label: "前避障左" },
  { id: "SHERLOC_WATSON", label: "Watson" },
];

const CURIOSITY_CAMERAS = [
  { id: "", label: "全部" },
  { id: "NAVCAM", label: "導航" },
  { id: "MAST", label: "主桅桿" },
  { id: "FHAZ", label: "前避障" },
  { id: "RHAZ", label: "後避障" },
  { id: "MAHLI", label: "手持鏡頭" },
];

function PhotoCard({ photo, onClick }: { photo: RoverPhoto; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl overflow-hidden border border-white/5 hover:border-mars-500/30 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.img_src}
          alt={`Sol ${photo.sol} - ${photo.camera.full_name}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-space-950/80 via-transparent to-transparent" />
        <div className="absolute bottom-2 left-2 font-mono text-[9px] text-mars-300">
          Sol {photo.sol}
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-1.5 mb-1">
          <Camera size={10} className="text-mars-500" />
          <span className="font-mono text-[10px] text-[var(--text-muted)]">
            {photo.camera.full_name}
          </span>
        </div>
        <p className="font-mono text-[10px] text-[var(--text-secondary)]">{photo.earth_date}</p>
      </div>
    </motion.div>
  );
}

function LightBox({ photo, onClose }: { photo: RoverPhoto; onClose: () => void }) {
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
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/60 hover:text-white"
        >
          <X size={24} />
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.img_src}
          alt={`Sol ${photo.sol}`}
          className="w-full rounded-lg max-h-[80vh] object-contain"
        />
        <div className="mt-3 flex items-center justify-between">
          <div className="font-mono text-xs text-[var(--text-secondary)]">
            <span className="text-mars-400">{photo.rover.name}</span> ·{" "}
            {photo.camera.full_name} · Sol {photo.sol} · {photo.earth_date}
          </div>
          <a
            href={photo.img_src}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-mono text-xs text-mars-400 hover:text-mars-300"
          >
            原始 <ExternalLink size={10} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function RoverFeed() {
  const [rover, setRover] = useState<"perseverance" | "curiosity">("perseverance");
  const [camera, setCamera] = useState("");
  const [photos, setPhotos] = useState<RoverPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<RoverPhoto | null>(null);
  const [page, setPage] = useState(1);

  const cameras = rover === "perseverance" ? PERSEVERANCE_CAMERAS : CURIOSITY_CAMERAS;

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const params = new URLSearchParams({
        rover,
        latest: page === 1 ? "true" : "false",
        ...(camera ? { camera } : {}),
        page: String(page),
      });
      const res = await fetch(`/api/rover-photos?${params}`);
      const data = await res.json();
      const list: RoverPhoto[] = data.latest_photos ?? data.photos ?? [];
      setPhotos(list.slice(0, 24));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [rover, camera, page]);

  useEffect(() => { load(); }, [load]);

  return (
    <section id="rovers" className="relative py-24 bg-space-900/50">
      <AnimatePresence>
        {selected && (
          <LightBox photo={selected} onClose={() => setSelected(null)} />
        )}
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
            NASA Mars Rover Photos API
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-4">
            探測車圖片牆
          </h2>
          <p className="text-[var(--text-secondary)] font-display text-lg max-w-2xl">
            直接來自 NASA 的最新火星表面照片。點擊圖片放大查看。
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Rover toggle */}
          <div className="flex rounded-lg border border-mars-500/20 overflow-hidden">
            {ROVERS.map((r) => (
              <button
                key={r.id}
                onClick={() => { setRover(r.id); setCamera(""); setPage(1); }}
                className={`px-4 py-2 font-mono text-xs transition-colors ${
                  rover === r.id
                    ? "bg-mars-500/20 text-mars-300 border-r border-mars-500/20"
                    : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                }`}
              >
                {r.label}
                <span className="ml-1 text-[var(--text-muted)]">({r.year})</span>
              </button>
            ))}
          </div>

          {/* Camera filter */}
          <div className="flex flex-wrap gap-2">
            {cameras.map((c) => (
              <button
                key={c.id}
                onClick={() => { setCamera(c.id); setPage(1); }}
                className={`px-3 py-1 rounded font-mono text-[10px] border transition-colors ${
                  camera === c.id
                    ? "border-mars-500/60 bg-mars-500/15 text-mars-400"
                    : "border-white/10 text-[var(--text-muted)] hover:border-mars-500/30"
                }`}
              >
                {c.label}
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
            此相機暫無照片
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {photos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} onClick={() => setSelected(photo)} />
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
            <span className="font-mono text-xs text-[var(--text-muted)]">Page {page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="flex items-center gap-1 px-4 py-2 font-mono text-xs border border-mars-500/20 rounded text-[var(--text-secondary)] hover:border-mars-500/40"
            >
              下一頁 <ChevronRight size={12} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
