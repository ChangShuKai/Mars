"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Thermometer, Gauge, X, ZoomIn, ZoomOut, Maximize2, Radio } from "lucide-react";

// ── NASA/USGS MOLA equirectangular topographic map (2560×1280, 2:1, public domain) ──
const MAP_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/USGS-MarsMap-topo-2002.jpg/2560px-USGS-MarsMap-topo-2002.jpg";

// ── Rover / lander data ──────────────────────────────────────────────────────
interface Mission {
  id: string;
  name: string;
  nameEn: string;
  location: string;
  lat: number;   // decimal degrees, N positive
  lon: number;   // decimal degrees, E positive
  sol: number;
  status: "active" | "dormant" | "ended";
  agency: string;
  type: string;
  landed: string;
  desc: string;
  temp: { avg: number; min: number; max: number; unit: string };
  pressure: { avg: number; unit: string };
  wind: { avg: number; unit: string; dir: string };
  color: string;
  glow: string;
}

const MISSIONS: Mission[] = [
  {
    id: "perseverance",
    name: "毅力號",
    nameEn: "Perseverance",
    location: "耶澤羅隕石坑 · Jezero Crater",
    lat: 18.4446, lon: 77.4509,
    sol: 1967,
    status: "active",
    agency: "NASA / JPL-Caltech",
    type: "核動力探測車",
    landed: "2021-02-18",
    desc: "NASA 旗艦探測車，搭載 MEDA 氣象站、SuperCam 雷射岩石分析儀、PIXL X 射線光譜儀，並攜帶 Ingenuity 火星直升機。任務目標：尋找遠古微生物痕跡，採集岩心待未來取回地球分析。",
    temp: { avg: -55, min: -80, max: -20, unit: "°C" },
    pressure: { avg: 728, unit: "Pa" },
    wind: { avg: 4.5, unit: "m/s", dir: "NW" },
    color: "#e85d1a",
    glow: "rgba(232,93,26,0.5)",
  },
  {
    id: "curiosity",
    name: "好奇號",
    nameEn: "Curiosity",
    location: "蓋爾隕石坑 · Gale Crater",
    lat: -4.5895, lon: 137.4417,
    sol: 5008,
    status: "active",
    agency: "NASA / JPL-Caltech",
    type: "核動力探測車",
    landed: "2012-08-06",
    desc: "持續運行 13 年，行駛超過 31 km，目前攀登夏普山（Mt. Sharp）地層。REMS 氣象站持續回傳即時氣象資料，確認蓋爾隕石坑古代曾有液態水環境與適居條件。",
    temp: { avg: -62, min: -90, max: -15, unit: "°C" },
    pressure: { avg: 780, unit: "Pa" },
    wind: { avg: 5.0, unit: "m/s", dir: "SW" },
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.5)",
  },
  {
    id: "insight",
    name: "洞察號",
    nameEn: "InSight",
    location: "厄律西昂平原 · Elysium Planitia",
    lat: 4.5024, lon: 135.6234,
    sol: 1425,
    status: "ended",
    agency: "NASA / JPL-Caltech",
    type: "固定著陸器",
    landed: "2018-11-26",
    desc: "2022年12月21日電力耗盡，任務圓滿結束。在 1,425 個火星日內記錄超過 1,300 次火星地震，揭示火星核心半徑約 1,830 km，地殼厚度約 20 km，填補人類對類地行星內部構造的認知空白。",
    temp: { avg: -62.2, min: -91.7, max: -15.9, unit: "°C" },
    pressure: { avg: 732.7, unit: "Pa" },
    wind: { avg: 5.2, unit: "m/s", dir: "SSW" },
    color: "#6b7280",
    glow: "rgba(107,114,128,0.3)",
  },
  {
    id: "zhurong",
    name: "祝融號",
    nameEn: "Zhurong",
    location: "烏托邦平原 · Utopia Planitia",
    lat: 25.1, lon: 109.9,
    sol: 349,
    status: "dormant",
    agency: "CNSA",
    type: "太陽能探測車",
    landed: "2021-05-15",
    desc: "中國首輛成功登陸火星的探測車，探索烏托邦平原古海洋遺跡及次表面冰層分佈。2022年5月進入冬眠模式後失聯，推測沙塵覆蓋太陽能板導致斷電，地面仍持續嘗試聯繫。",
    temp: { avg: -52, min: -85, max: -10, unit: "°C" },
    pressure: { avg: 750, unit: "Pa" },
    wind: { avg: 3.8, unit: "m/s", dir: "NE" },
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.4)",
  },
];

// ── Dust storm hotspots (historically active basins) ─────────────────────────
const DUST_ZONES = [
  { id: "hellas",    lat: -42,  lon: 70,  size: 12, delay: "0s",  dur: "9s"  },
  { id: "argyre",    lat: -50,  lon: -44, size: 9,  delay: "2s",  dur: "11s" },
  { id: "acidalia",  lat: 49,   lon: -21, size: 10, delay: "4s",  dur: "8s"  },
  { id: "arabia",    lat: 15,   lon: 40,  size: 7,  delay: "1.5s",dur: "13s" },
];

// Equirectangular projection: lon/lat → percentage position on 2:1 map
function toPercent(lat: number, lon: number) {
  return { x: ((lon + 180) / 360) * 100, y: ((90 - lat) / 180) * 100 };
}

const STATUS = {
  active:  { label: "運行中",  dot: "bg-green-400",  text: "text-green-400",  border: "border-green-400/50" },
  dormant: { label: "休眠中",  dot: "bg-yellow-400", text: "text-yellow-400", border: "border-yellow-400/50" },
  ended:   { label: "任務結束", dot: "bg-gray-500",   text: "text-gray-400",   border: "border-gray-500/40"  },
};

// ── Component ────────────────────────────────────────────────────────────────
export default function MarsMapSection() {
  const vpRef    = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Transform state lives in refs so drag/zoom handlers never need re-renders
  const tf   = useRef({ x: 0, y: 0, s: 1 });
  const drag = useRef({ on: false, sx: 0, sy: 0, ox: 0, oy: 0 });

  const [mapLoaded,    setMapLoaded]    = useState(false);
  const [selected,     setSelected]     = useState<Mission | null>(null);
  const [coordLabel,   setCoordLabel]   = useState("18.4°N  97.2°E");
  const [scaleLabel,   setScaleLabel]   = useState("×1.0");

  // ── helpers ────────────────────────────────────────────────────────────────
  const getMinScale = () => {
    const vp = vpRef.current;
    if (!vp) return 1;
    // map natural height at scale=1 is vpWidth/2; ensure it fills the viewport
    return Math.max(1, (vp.offsetHeight / (vp.offsetWidth / 2)) + 0.02);
  };

  const applyTf = useCallback(() => {
    if (!innerRef.current) return;
    const { x, y, s } = tf.current;
    innerRef.current.style.transform = `translate(${x}px,${y}px) scale(${s})`;
  }, []);

  const clampTf = useCallback(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const { s } = tf.current;
    const vpW = vp.offsetWidth, vpH = vp.offsetHeight;
    const mW = vpW * s, mH = (vpW / 2) * s;
    tf.current.s = Math.max(getMinScale(), s);
    tf.current.x = Math.max(Math.min(0, vpW  - mW), Math.min(0, tf.current.x));
    tf.current.y = Math.max(Math.min(0, vpH  - mH), Math.min(0, tf.current.y));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Centre view on the "rover belt" (lon ~105°E, lat ~8°N)
  const initView = useCallback(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const vpW = vp.offsetWidth, vpH = vp.offsetHeight;
    const mH = vpW / 2;
    const s = Math.max(getMinScale() + 0.3, vpH / mH);
    const cx = 0.7917;   // (105+180)/360
    const cy = 0.4556;   // (90-8)/180
    tf.current = {
      s,
      x: vpW / 2 - cx * vpW * s,
      y: vpH / 2 - cy * mH  * s,
    };
    clampTf();
    applyTf();
    setScaleLabel(`×${tf.current.s.toFixed(1)}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyTf, clampTf]);

  // ── Event listeners ────────────────────────────────────────────────────────
  useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;

    initView();

    // ─ mouse ─
    const onDown = (e: MouseEvent) => {
      drag.current = { on: true, sx: e.clientX, sy: e.clientY, ox: tf.current.x, oy: tf.current.y };
      vp.style.cursor = "grabbing";
    };
    const onMove = (e: MouseEvent) => {
      const rect = vp.getBoundingClientRect();
      // live coordinate readout
      const relX = (e.clientX - rect.left - tf.current.x) / (rect.width  * tf.current.s);
      const relY = (e.clientY - rect.top  - tf.current.y) / ((rect.width / 2) * tf.current.s);
      const lon = Math.max(-180, Math.min(180, relX * 360 - 180));
      const lat = Math.max( -90, Math.min( 90, 90 - relY * 180));
      setCoordLabel(
        `${Math.abs(lat).toFixed(1)}°${lat >= 0 ? "N" : "S"}  ${Math.abs(lon).toFixed(1)}°${lon >= 0 ? "E" : "W"}`
      );
      if (!drag.current.on) return;
      tf.current.x = drag.current.ox + (e.clientX - drag.current.sx);
      tf.current.y = drag.current.oy + (e.clientY - drag.current.sy);
      clampTf(); applyTf();
    };
    const onUp = () => { drag.current.on = false; vp.style.cursor = "grab"; };

    // ─ wheel zoom ─
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = vp.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      const f = e.deltaY < 0 ? 1.18 : 1 / 1.18;
      const newS = Math.max(getMinScale(), Math.min(10, tf.current.s * f));
      const sd = newS / tf.current.s;
      tf.current.x = mx - sd * (mx - tf.current.x);
      tf.current.y = my - sd * (my - tf.current.y);
      tf.current.s = newS;
      clampTf(); applyTf();
      setScaleLabel(`×${newS.toFixed(1)}`);
    };

    // ─ touch ─
    let lastDist = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        drag.current = { on: true, sx: e.touches[0].clientX, sy: e.touches[0].clientY, ox: tf.current.x, oy: tf.current.y };
      } else if (e.touches.length === 2) {
        drag.current.on = false;
        lastDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && drag.current.on) {
        tf.current.x = drag.current.ox + (e.touches[0].clientX - drag.current.sx);
        tf.current.y = drag.current.oy + (e.touches[0].clientY - drag.current.sy);
        clampTf(); applyTf();
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        if (lastDist > 0) {
          const rect = vp.getBoundingClientRect();
          const mx = ((e.touches[0].clientX + e.touches[1].clientX) / 2) - rect.left;
          const my = ((e.touches[0].clientY + e.touches[1].clientY) / 2) - rect.top;
          const f = dist / lastDist;
          const newS = Math.max(getMinScale(), Math.min(10, tf.current.s * f));
          const sd = newS / tf.current.s;
          tf.current.x = mx - sd * (mx - tf.current.x);
          tf.current.y = my - sd * (my - tf.current.y);
          tf.current.s = newS;
          clampTf(); applyTf();
          setScaleLabel(`×${newS.toFixed(1)}`);
        }
        lastDist = dist;
      }
    };
    const onTouchEnd = () => { drag.current.on = false; lastDist = 0; };

    vp.addEventListener("mousedown",  onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
    vp.addEventListener("wheel",      onWheel,      { passive: false });
    vp.addEventListener("touchstart", onTouchStart, { passive: true  });
    vp.addEventListener("touchmove",  onTouchMove,  { passive: true  });
    vp.addEventListener("touchend",   onTouchEnd);

    const onResize = () => { clampTf(); applyTf(); };
    window.addEventListener("resize", onResize);

    return () => {
      vp.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
      vp.removeEventListener("wheel",      onWheel);
      vp.removeEventListener("touchstart", onTouchStart);
      vp.removeEventListener("touchmove",  onTouchMove);
      vp.removeEventListener("touchend",   onTouchEnd);
      window.removeEventListener("resize", onResize);
    };
  }, [applyTf, clampTf, initView]);

  // ── zoom button helper ─────────────────────────────────────────────────────
  const doZoom = (f: number) => {
    const vp = vpRef.current;
    if (!vp) return;
    const cx = vp.offsetWidth / 2, cy = vp.offsetHeight / 2;
    const newS = Math.max(getMinScale(), Math.min(10, tf.current.s * f));
    const sd = newS / tf.current.s;
    tf.current.x = cx - sd * (cx - tf.current.x);
    tf.current.y = cy - sd * (cy - tf.current.y);
    tf.current.s = newS;
    clampTf(); applyTf();
    setScaleLabel(`×${newS.toFixed(1)}`);
  };

  // ── Fly-to: animate transform toward a specific lat/lon ──────────────────
  const flyTo = (mission: Mission) => {
    const vp = vpRef.current;
    if (!vp) return;
    const vpW = vp.offsetWidth, vpH = vp.offsetHeight;
    const pos = toPercent(mission.lat, mission.lon);
    const targetS = Math.max(getMinScale(), 3.5);
    const mNatW = vpW, mNatH = vpW / 2;
    const targetX = vpW / 2 - (pos.x / 100) * mNatW * targetS;
    const targetY = vpH / 2 - (pos.y / 100) * mNatH * targetS;

    const startX = tf.current.x, startY = tf.current.y, startS = tf.current.s;
    const startTime = performance.now();
    const DURATION = 700;

    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const step = (now: number) => {
      const raw = Math.min((now - startTime) / DURATION, 1);
      const t = ease(raw);
      tf.current.x = startX + (targetX - startX) * t;
      tf.current.y = startY + (targetY - startY) * t;
      tf.current.s = startS + (targetS - startS) * t;
      clampTf(); applyTf();
      setScaleLabel(`×${tf.current.s.toFixed(1)}`);
      if (raw < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <section id="map" className="relative py-24 bg-space-950 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mars-800/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-mars-600/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="section-padding mb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-xs text-mars-400 tracking-[0.3em] uppercase mb-3">
            Interactive Surface Map · 互動式火星地圖
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-4">
            探測器即時定位
          </h2>
          <p className="text-[var(--text-secondary)] font-display text-lg max-w-2xl">
            USGS MOLA 地形高程圖底圖，標記所有著陸任務坐標。
            拖曳平移・滾輪縮放・點擊標記查看氣象資料・橘色霧狀區域為歷史沙塵暴頻發帶。
          </p>

          {/* Quick-jump rover buttons */}
          <div className="flex flex-wrap gap-2 mt-5">
            {MISSIONS.map(m => {
              const cfg = STATUS[m.status];
              return (
                <button
                  key={m.id}
                  onClick={() => { flyTo(m); setSelected(m); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-mono text-xs transition-all hover:scale-105 ${cfg.border}`}
                  style={{ background: `${m.color}12` }}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} flex-shrink-0 ${m.status === "active" ? "animate-pulse" : ""}`} />
                  <span style={{ color: m.color }}>{m.nameEn}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ── Map area ──────────────────────────────────────────────────────── */}
      <div className="relative" style={{ height: "72vh" }}>

        {/* HUD top-left: coordinates + scale */}
        <div className="absolute top-4 left-4 z-30 glass-card rounded-lg px-3 py-2 font-mono text-xs border border-mars-500/20 pointer-events-none">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
            <span className="text-mars-400 tracking-widest">LIVE TRACK</span>
          </div>
          <div className="text-[var(--text-muted)] text-[10px]">{coordLabel}</div>
          <div className="text-[var(--text-muted)] text-[10px] mt-0.5">{scaleLabel}</div>
        </div>

        {/* Zoom buttons top-right */}
        <div className="absolute top-4 right-4 z-30 flex flex-col gap-1.5">
          {([
            { icon: ZoomIn,   f: 1.5,     title: "放大" },
            { icon: ZoomOut,  f: 1 / 1.5, title: "縮小" },
            { icon: Maximize2, f: 0,       title: "重置視角" },
          ] as const).map(({ icon: Icon, f, title }) => (
            <button
              key={title}
              title={title}
              onClick={() => f === 0 ? initView() : doZoom(f)}
              className="glass-card border border-mars-500/20 rounded w-8 h-8 flex items-center justify-center text-mars-400 hover:text-white hover:border-mars-500/50 transition-colors"
            >
              <Icon size={14} />
            </button>
          ))}
        </div>

        {/* Legend bottom-left */}
        <div className="absolute bottom-14 left-4 z-30 glass-card rounded-lg px-3 py-2 text-[10px] border border-mars-500/15 pointer-events-none">
          {MISSIONS.map(m => {
            const cfg = STATUS[m.status];
            return (
              <div key={m.id} className="flex items-center gap-2 mb-1.5 last:mb-0">
                <span className={`w-2 h-2 rounded-full ${cfg.dot} flex-shrink-0`} />
                <span className="font-display text-[var(--text-secondary)]">{m.name}</span>
                <span className={`font-mono ${cfg.text}`}>{cfg.label}</span>
              </div>
            );
          })}
          <div className="border-t border-white/5 mt-1.5 pt-1.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: "rgba(220,100,30,0.5)" }} />
            <span className="font-mono text-orange-400/70">沙塵暴頻發區</span>
          </div>
        </div>

        {/* Controls hint bottom-center */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 glass-card rounded-full px-4 py-1.5 font-mono text-[10px] text-[var(--text-muted)] border border-white/5 pointer-events-none whitespace-nowrap">
          拖曳移動 · 滾輪縮放 · 點擊標記查看資料
        </div>

        {/* ── Viewport (overflow hidden) ─────────────────────────────────── */}
        <div
          ref={vpRef}
          className="w-full h-full overflow-hidden select-none"
          style={{ cursor: "grab", background: "#0d0604" }}
        >
          {/* Loading overlay */}
          {!mapLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20 bg-[#0d0604]">
              <div className="w-12 h-12 rounded-full border-2 border-mars-500 border-t-transparent animate-spin" />
              <p className="font-mono text-xs text-mars-400 tracking-widest">載入火星地圖中...</p>
            </div>
          )}

          {/* ── Transformed inner container ─────────────────────────────── */}
          <div
            ref={innerRef}
            className="absolute top-0 left-0"
            style={{ width: "100%", aspectRatio: "2 / 1", transformOrigin: "top left", willChange: "transform" }}
          >
            {/* Base map */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={MAP_URL}
              alt="Mars MOLA Topographic Map"
              className="absolute inset-0 w-full h-full"
              style={{ objectFit: "fill", pointerEvents: "none", userSelect: "none" }}
              draggable={false}
              onLoad={() => setMapLoaded(true)}
            />

            {/* Edge vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(5,5,8,0.75) 100%)" }}
            />

            {/* ── Dust storm zones (animated glow blobs) ─────────────── */}
            {DUST_ZONES.map(zone => {
              const pos = toPercent(zone.lat, zone.lon);
              return (
                <div
                  key={zone.id}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${pos.x}%`,
                    top:  `${pos.y}%`,
                    width:  `${zone.size}%`,
                    height: `${zone.size / 2}%`,
                    background: "radial-gradient(ellipse, rgba(200,100,30,0.30) 0%, rgba(160,70,20,0.10) 55%, transparent 100%)",
                    filter: "blur(8px)",
                    animation: `dustDrift ${zone.dur} ease-in-out ${zone.delay} infinite`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              );
            })}

            {/* ── Mission markers ─────────────────────────────────────── */}
            {MISSIONS.map(m => {
              const pos = toPercent(m.lat, m.lon);
              const isActive = m.status === "active";
              const isSel    = selected?.id === m.id;
              return (
                <div
                  key={m.id}
                  className="absolute"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%,-50%)", zIndex: isSel ? 20 : 10 }}
                >
                  {/* Pulse rings — active only */}
                  {isActive && (
                    <>
                      <div className="absolute rounded-full pointer-events-none"
                        style={{ width: 32, height: 32, top: "50%", left: "50%",
                          background: m.glow,
                          animation: "markerPulse1 2.2s ease-out infinite",
                        }} />
                      <div className="absolute rounded-full pointer-events-none"
                        style={{ width: 48, height: 48, top: "50%", left: "50%",
                          background: m.glow,
                          animation: "markerPulse2 2.2s ease-out 0.4s infinite",
                        }} />
                    </>
                  )}

                  {/* Clickable dot */}
                  <button
                    className="relative flex flex-col items-center gap-0.5 group z-10"
                    onClick={e => { e.stopPropagation(); setSelected(isSel ? null : m); }}
                  >
                    <div
                      className="w-3.5 h-3.5 rounded-full border-2 border-white/80 transition-all group-hover:scale-[1.8] shadow-lg"
                      style={{
                        backgroundColor: m.color,
                        opacity: m.status === "ended" ? 0.55 : 1,
                        boxShadow: isActive ? `0 0 10px ${m.color}, 0 0 20px ${m.glow}` : "none",
                        transform: isSel ? "scale(1.8)" : undefined,
                      }}
                    />
                    {/* Tooltip on hover */}
                    <div
                      className="absolute bottom-full mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap px-1.5 py-0.5 rounded font-mono text-[9px]"
                      style={{ background: "rgba(5,5,8,0.85)", color: m.color, border: `1px solid ${m.color}50` }}
                    >
                      {m.nameEn}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>{/* /inner */}
        </div>{/* /viewport */}

        {/* ── Info panel ──────────────────────────────────────────────────── */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 32, scale: 0.97 }}
              animate={{ opacity: 1, x: 0,  scale: 1 }}
              exit={{   opacity: 0, x: 32,  scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-4 right-4 z-40 w-80 rounded-2xl overflow-hidden shadow-2xl"
              style={{ border: `1px solid ${selected.color}30`, background: "rgba(10,10,20,0.93)", backdropFilter: "blur(16px)" }}
              onClick={e => e.stopPropagation()}
            >
              {/* Coloured top-bar */}
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${selected.color}, transparent)` }} />

              {/* Header */}
              <div className="px-4 pt-3 pb-2 flex items-start justify-between" style={{ borderBottom: `1px solid ${selected.color}20` }}>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <Radio size={10} className={STATUS[selected.status].text} />
                    <span className={`font-mono text-[10px] tracking-wider ${STATUS[selected.status].text}`}>
                      {STATUS[selected.status].label}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-white text-xl leading-tight">
                    {selected.name}
                    <span className="text-[var(--text-muted)] text-sm font-normal ml-2">{selected.nameEn}</span>
                  </h3>
                  <p className="font-mono text-[10px] text-[var(--text-muted)] mt-0.5">{selected.agency}</p>
                </div>
                <button onClick={() => setSelected(null)}
                  className="text-[var(--text-muted)] hover:text-white p-1 -mr-1 -mt-0.5 transition-colors flex-shrink-0">
                  <X size={15} />
                </button>
              </div>

              {/* Body */}
              <div className="px-4 py-3 space-y-3 text-xs">
                {/* Meta chips */}
                <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] text-[var(--text-muted)]">
                  <span>📍 {selected.location}</span>
                  <span>🛬 {selected.landed}</span>
                  <span>⏱ Sol {selected.sol.toLocaleString()}</span>
                  <span>🔧 {selected.type}</span>
                  <span>
                    {Math.abs(selected.lat).toFixed(4)}°{selected.lat >= 0 ? "N" : "S"}&nbsp;
                    {Math.abs(selected.lon).toFixed(4)}°{selected.lon >= 0 ? "E" : "W"}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[var(--text-secondary)] font-display leading-relaxed text-[11px]">
                  {selected.desc}
                </p>

                {/* Weather cards */}
                <div className="rounded-xl p-3 space-y-1" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="font-mono text-[9px] text-[var(--text-muted)] tracking-wider uppercase mb-2">
                    {selected.status === "ended" ? "最終記錄 · Last Transmission" : "最新回傳氣象 · Latest Weather"}
                  </p>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <Thermometer size={12} className="text-blue-400 mx-auto mb-1" />
                      <div className="font-mono text-[9px] text-[var(--text-muted)]">氣溫</div>
                      <div className="font-display font-bold text-sm text-blue-400">{selected.temp.avg}{selected.temp.unit}</div>
                      <div className="font-mono text-[9px] text-[var(--text-muted)]">{selected.temp.min}∼{selected.temp.max}</div>
                    </div>
                    <div>
                      <Gauge size={12} className="text-green-400 mx-auto mb-1" />
                      <div className="font-mono text-[9px] text-[var(--text-muted)]">氣壓</div>
                      <div className="font-display font-bold text-sm text-green-400">{selected.pressure.avg}</div>
                      <div className="font-mono text-[9px] text-[var(--text-muted)]">{selected.pressure.unit}</div>
                    </div>
                    <div>
                      <Wind size={12} className="text-cyan-400 mx-auto mb-1" />
                      <div className="font-mono text-[9px] text-[var(--text-muted)]">風速</div>
                      <div className="font-display font-bold text-sm text-cyan-400">{selected.wind.avg}</div>
                      <div className="font-mono text-[9px] text-[var(--text-muted)]">{selected.wind.dir} {selected.wind.unit}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>{/* /map area */}

      {/* Attribution */}
      <p className="font-mono text-[10px] text-[var(--text-muted)] text-center mt-4 px-4">
        底圖：USGS Astrogeology Science Center — MOLA Mars Topographic Map · Public Domain
        &nbsp;·&nbsp; 探測器位置：NASA/JPL-Caltech · CNSA
      </p>
    </section>
  );
}
