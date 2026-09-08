"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wind,
  Thermometer,
  Gauge,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Radio,
  AlertTriangle,
  Layers,
  Sparkles,
  Plane,
  Compass,
  DownloadCloud,
} from "lucide-react";

// ── Mission data with Flight Sites & Probes ──────────────────────────────────
interface Mission {
  id: string;
  name: string;
  nameEn: string;
  location: string;
  lat: number;
  lon: number;
  sol: number;
  status: "active" | "dormant" | "ended";
  agency: string;
  type: string;
  category: "rover" | "helicopter" | "lander";
  landed: string;
  desc: string;
  stats?: { [key: string]: string };
  temp: { avg: number; min: number; max: number; unit: string };
  pressure: { avg: number; unit: string };
  wind: { avg: number; unit: string; dir: string };
  tau: number;
  color: string;
  glow: string;
  elevation?: number;
  distKm?: number;
  driveId?: number;
  groundTemp?: { avg: number; min: number; max: number; unit: string };
  isLiveTelemetry?: boolean;
}

const MISSIONS: Mission[] = [
  {
    id: "perseverance",
    name: "毅力號",
    nameEn: "Perseverance",
    location: "耶澤羅隕石坑 · Jezero Crater",
    lat: 18.4446,
    lon: 77.4509,
    sol: 1967,
    status: "active",
    agency: "NASA / JPL-Caltech",
    type: "核動力火星探測車 (MMRTG)",
    category: "rover",
    landed: "2021-02-18",
    desc: "NASA 旗艦級探測車，攜帶 MEDA 氣象監測儀、SuperCam 雷射光譜儀與 PIXL 礦物分析儀。目前正在古代耶澤羅古湖三角洲沉積層鑽取並封存岩心樣品，供未來火星樣本取回任務（MSR）帶回地球。",
    stats: {
      "行駛距離": "31.4 km",
      "鑽取樣品管": "25 根",
      "動力系統": "放射性同位素熱電機",
      "主要科學目標": "尋找古生物遺跡與三角洲沉積物分析",
    },
    temp: { avg: -55, min: -82, max: -18, unit: "°C" },
    pressure: { avg: 735, unit: "Pa" },
    wind: { avg: 4.8, unit: "m/s", dir: "西北 (NW)" },
    tau: 0.48,
    color: "#ff6b2b",
    glow: "rgba(255,107,43,0.6)",
  },
  {
    id: "ingenuity",
    name: "機智號直升機",
    nameEn: "Ingenuity",
    location: "耶澤羅隕石坑 · 瓦利諾高地 (Valinor Hills)",
    lat: 18.4447,
    lon: 77.4508,
    sol: 1045,
    status: "ended",
    agency: "NASA / JPL-Caltech",
    type: "同軸雙旋翼火星無人直升機",
    category: "helicopter",
    landed: "2021-04-03 (首飛 2021-04-19)",
    desc: "人類歷史上首架在另一個星球進行動力受控飛行的飛行器！原計劃僅進行 5 次技術驗證飛行，最終超額完成 72 次飛行任務，扮演毅力號的空中偵察先鋒。於第 72 次著陸時旋翼葉片受損，光榮退役，現作為靜態氣象觀測站長眠火星。",
    stats: {
      "累計飛行次數": "72 次 (原定 5 次)",
      "總空中飛行時間": "128.8 分鐘",
      "總飛行航程": "17.0 km",
      "最高飛行高度": "24.0 m",
      "最快飛行速度": "10.0 m/s",
    },
    temp: { avg: -58, min: -85, max: -20, unit: "°C" },
    pressure: { avg: 732, unit: "Pa" },
    wind: { avg: 4.2, unit: "m/s", dir: "北北西 (NNW)" },
    tau: 0.46,
    color: "#10b981",
    glow: "rgba(16,185,129,0.7)",
  },
  {
    id: "curiosity",
    name: "好奇號",
    nameEn: "Curiosity",
    location: "蓋爾隕石坑 · Gale Crater / 夏普山",
    lat: -4.5895,
    lon: 137.4417,
    sol: 5008,
    status: "active",
    agency: "NASA / JPL-Caltech",
    type: "核動力火星科學實驗室 (MSL)",
    category: "rover",
    landed: "2012-08-06",
    desc: "已在火星表面連續運行超過 13 年！成功證實蓋爾隕石坑在遠古時期曾有淡水湖泊系統，具備支持微生物生命的化學條件。配備的 REMS 氣象站持續即時回傳蓋爾隕石坑的大氣溫度、濕度、紫外線與風速數據。",
    stats: {
      "累計行駛距離": "32.8 km",
      "攀登高度": "超過 800 m (夏普山山坡)",
      "拍攝照片數": "1,140,000+ 張",
      "鑽探分析樣本": "40+ 次",
    },
    temp: { avg: -64, min: -92, max: -14, unit: "°C" },
    pressure: { avg: 785, unit: "Pa" },
    wind: { avg: 5.6, unit: "m/s", dir: "西南 (SW)" },
    tau: 0.54,
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.6)",
  },
  {
    id: "insight",
    name: "洞察號",
    nameEn: "InSight",
    location: "厄律西昂平原 · Elysium Planitia",
    lat: 4.5024,
    lon: 135.6234,
    sol: 1425,
    status: "ended",
    agency: "NASA / CNES / DLR",
    type: "地球物理固定著陸探測器",
    category: "lander",
    landed: "2018-11-26",
    desc: "專門探測火星內部深層地質構造的著陸器。其超高靈敏度地震儀 SEIS 記錄了 1,319 次火星震（含 4.7 級歷史大火星震），首次精確繪製出火星地核半徑（約 1,830 km）與地殼厚度（約 20-72 km）。2022 年底因沙塵覆蓋太陽能板電力耗盡。",
    stats: {
      "記錄火星震次數": "1,319 次",
      "隕石撞擊記錄": "多次全球衝擊波",
      "地核探測成果": "液態金屬核直徑確認",
    },
    temp: { avg: -62.2, min: -91.7, max: -15.9, unit: "°C" },
    pressure: { avg: 732.7, unit: "Pa" },
    wind: { avg: 5.2, unit: "m/s", dir: "南南西 (SSW)" },
    tau: 0.72,
    color: "#94a3b8",
    glow: "rgba(148,163,184,0.4)",
  },
  {
    id: "zhurong",
    name: "祝融號",
    nameEn: "Zhurong",
    location: "烏托邦平原 · Utopia Planitia",
    lat: 25.1,
    lon: 109.9,
    sol: 349,
    status: "dormant",
    agency: "CNSA (中國國家航天局)",
    type: "太陽能火星巡視器 (天問一號)",
    category: "rover",
    landed: "2021-05-15",
    desc: "中國首輛成功登陸地外行星的巡視器。利用次表面穿透雷達與多光譜相機，在烏托邦平原南部探測到古海洋沉積構造與地下水冰可能存在的證據。2022 年 5 月為度過火星嚴冬進入休眠，後因沙塵遮蔽太陽能板未能喚醒。",
    stats: {
      "行駛距離": "1,921 m",
      "主要成果": "烏托邦平原古沉積岩次表面層析成像",
    },
    temp: { avg: -52, min: -86, max: -10, unit: "°C" },
    pressure: { avg: 752, unit: "Pa" },
    wind: { avg: 3.8, unit: "m/s", dir: "東北 (NE)" },
    tau: 0.65,
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.5)",
  },
  {
    id: "opportunity",
    name: "機會號",
    nameEn: "Opportunity",
    location: "子午線平原 · Meridiani Planum",
    lat: -1.9462,
    lon: 354.4734,
    sol: 5111,
    status: "ended",
    agency: "NASA / JPL",
    type: "太陽能雙胞胎探測車 (MER-B)",
    category: "rover",
    landed: "2004-01-25",
    desc: "原本只規劃 90 天任務，最終堅守了近 15 年！創下地外天體行駛距離世界紀錄（45.16 km）。發現了赤鐵礦藍莓石與古水流沉積痕跡。在 2018 年遭遇覆蓋全火星的超強沙塵暴，太陽能板斷電前發回最後遙測，任務終結。",
    stats: {
      "總行駛距離": "45.16 km (地外行駛馬拉松紀錄)",
      "運作時間": "14 年 138 天 (原設計 90 天)",
      "最後通訊": "2018-06-10 (全火星大沙塵暴)",
    },
    temp: { avg: -60, min: -88, max: -12, unit: "°C" },
    pressure: { avg: 740, unit: "Pa" },
    wind: { avg: 4.5, unit: "m/s", dir: "東 (E)" },
    tau: 1.85,
    color: "#e11d48",
    glow: "rgba(225,29,72,0.4)",
  },
  {
    id: "spirit",
    name: "精神號",
    nameEn: "Spirit",
    location: "古瑟夫隕石坑 · Gusev Crater",
    lat: -14.5684,
    lon: 175.4729,
    sol: 2210,
    status: "ended",
    agency: "NASA / JPL",
    type: "太陽能雙胞胎探測車 (MER-A)",
    category: "rover",
    landed: "2004-01-04",
    desc: "在古瑟夫隕石坑運作超過 6 年。因車輪卡死在沙地中意外刨開富含二氧化矽的土壤，證實該處曾有遠古溫泉與火山熱液噴口活動。2010 年冬眠後停止通訊。",
    stats: {
      "總行駛距離": "7.73 km",
      "關鍵發現": "純矽土壤 (遠古火山熱水系統)",
    },
    temp: { avg: -56, min: -89, max: -15, unit: "°C" },
    pressure: { avg: 730, unit: "Pa" },
    wind: { avg: 4.0, unit: "m/s", dir: "西 (W)" },
    tau: 0.58,
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.4)",
  },
  {
    id: "viking1",
    name: "海盜1號",
    nameEn: "Viking 1 Lander",
    location: "克里斯平原 · Chryse Planitia",
    lat: 22.48,
    lon: 312.05,
    sol: 2245,
    status: "ended",
    agency: "NASA / Langley",
    type: "核動力著陸器 (RTG)",
    category: "lander",
    landed: "1976-07-20",
    desc: "人類歷史上第一個成功登陸火星並長時間執行科學任務的著陸器。傳回首張火星彩色全景照片，分析大氣成分與進行首批土壤生命探測實驗。",
    stats: {
      "首批彩色照片": "1976 年首度揭開紅色星球真面目",
      "運作壽命": "超過 6 年 (1976 - 1982)",
    },
    temp: { avg: -63, min: -89, max: -18, unit: "°C" },
    pressure: { avg: 760, unit: "Pa" },
    wind: { avg: 6.0, unit: "m/s", dir: "南 (S)" },
    tau: 0.5,
    color: "#cbd5e1",
    glow: "rgba(203,213,225,0.3)",
  },
];

// ── Active and Historical Dust Storm Fronts ──────────────────────────────────
interface DustStormFront {
  id: string;
  name: string;
  nameEn: string;
  type: "global_origin" | "regional_front" | "corridor";
  centerLat: number;
  centerLon: number;
  vectorLat: number;
  vectorLon: number;
  radiusDeg: number;
  intensity: number;
  tau: number;
  desc: string;
  windSpeed: string;
}

const DUST_STORMS: DustStormFront[] = [
  {
    id: "hellas-vortex",
    name: "希臘盆地超級沙塵氣旋",
    nameEn: "Hellas Basin Dust Cyclone",
    type: "global_origin",
    centerLat: -42.5,
    centerLon: 70.5,
    vectorLat: 8,
    vectorLon: 25,
    radiusDeg: 28,
    intensity: 0.95,
    tau: 2.1,
    desc: "火星最深撞擊盆地（深達 7.1 km），氣壓較高，晝夜溫差觸發劇烈熱對流，是全火星大沙塵暴的核心發源地。",
    windSpeed: "18 ~ 26 m/s (大風預警)",
  },
  {
    id: "chryse-corridor",
    name: "克里斯-阿西達里亞風暴走廊",
    nameEn: "Chryse-Acidalia Storm Track",
    type: "corridor",
    centerLat: 38.0,
    centerLon: -25.0,
    vectorLat: -15,
    vectorLon: 12,
    radiusDeg: 22,
    intensity: 0.72,
    tau: 1.45,
    desc: "北半球極冠冷空氣與中緯度低壓帶交會形成的鋒面沙塵槽，沙塵雲柱向南快速推進。",
    windSpeed: "12 ~ 17 m/s",
  },
  {
    id: "argyre-storm",
    name: "阿爾及爾盆地揚沙鋒面",
    nameEn: "Argyre Basin Dust Front",
    type: "regional_front",
    centerLat: -51.0,
    centerLon: -43.0,
    vectorLat: 14,
    vectorLon: 20,
    radiusDeg: 19,
    intensity: 0.65,
    tau: 1.2,
    desc: "南半球春季強風自盆地底部捲起細微玄武岩粉塵，朝東北向赤道輸送。",
    windSpeed: "10 ~ 15 m/s",
  },
  {
    id: "arabia-sheet",
    name: "阿拉伯高地懸浮微粒帶",
    nameEn: "Arabia Terra Haze Layer",
    type: "regional_front",
    centerLat: 18.0,
    centerLon: 35.0,
    vectorLat: 5,
    vectorLon: 15,
    radiusDeg: 16,
    intensity: 0.5,
    tau: 0.85,
    desc: "高海拔地帶長期受上升氣流影響懸浮的大氣沙塵薄霧，顯著降低大氣透明度。",
    windSpeed: "6 ~ 10 m/s",
  },
];

function toPercent(lat: number, lon: number) {
  let normalizedLon = lon;
  while (normalizedLon > 180) normalizedLon -= 360;
  while (normalizedLon < -180) normalizedLon += 360;
  return {
    x: ((normalizedLon + 180) / 360) * 100,
    y: ((90 - lat) / 180) * 100,
  };
}

const STATUS = {
  active: {
    label: "在軌運行中",
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    border: "border-emerald-400/50",
    badge: "bg-emerald-500/20 text-emerald-300",
  },
  dormant: {
    label: "冬眠失聯",
    dot: "bg-amber-400",
    text: "text-amber-400",
    border: "border-amber-400/50",
    badge: "bg-amber-500/20 text-amber-300",
  },
  ended: {
    label: "圓滿退役 / 終結",
    dot: "bg-slate-400",
    text: "text-slate-400",
    border: "border-slate-500/40",
    badge: "bg-slate-700/50 text-slate-300",
  },
};

interface LoadState {
  phase: "idle" | "downloading" | "decoding" | "done" | "error";
  progress: number;
  loadedMB: number;
  totalMB: number;
  speedMBps: number;
  cached: boolean;
  hdQuality: boolean;
}

export default function MarsMapSection() {
  const vpRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const tf = useRef({ x: 0, y: 0, s: 1 });
  const drag = useRef({ on: false, sx: 0, sy: 0, ox: 0, oy: 0 });
  const animFrameRef = useRef<number>(0);

  const [imgSrc, setImgSrc] = useState("");
  const [load, setLoad] = useState<LoadState>({
    phase: "idle",
    progress: 0,
    loadedMB: 0,
    totalMB: 0,
    speedMBps: 0,
    cached: false,
    hdQuality: false,
  });

  const [missions, setMissions] = useState<Mission[]>(MISSIONS);
  const [selected, setSelected] = useState<Mission | null>(null);
  const [selectedStorm, setSelectedStorm] = useState<DustStormFront | null>(null);
  const [coordLabel, setCoordLabel] = useState("18.44°N  77.45°E");
  const [scaleLabel, setScaleLabel] = useState("×1.0");

  // ── Fetch dynamic rover telemetry and weather ──────────────────────────
  useEffect(() => {
    // 1. Fetch live telemetry for Perseverance (M20) and Curiosity (MSL)
    fetch("/api/rover-location")
      .then((res) => res.json())
      .then((telemetry) => {
        if (telemetry?.rovers) {
          const { perseverance: p, curiosity: c } = telemetry.rovers;
          setMissions((prev) =>
            prev.map((m) => {
              if (m.id === "perseverance" && p) {
                return {
                  ...m,
                  lat: p.coordinates?.lat ?? m.lat,
                  lon: p.coordinates?.lon ?? m.lon,
                  sol: p.sol ?? m.sol,
                  elevation: p.coordinates?.elevation,
                  distKm: p.distance?.total_km,
                  driveId: p.drive,
                  isLiveTelemetry: true,
                };
              }
              if (m.id === "curiosity" && c) {
                return {
                  ...m,
                  lat: c.coordinates?.lat ?? m.lat,
                  lon: c.coordinates?.lon ?? m.lon,
                  sol: c.sol ?? m.sol,
                  elevation: c.coordinates?.elevation,
                  distKm: c.distance?.total_km,
                  driveId: c.drive,
                  isLiveTelemetry: true,
                };
              }
              return m;
            })
          );
        }
      })
      .catch((err) => console.warn("Rover telemetry sync warning:", err));

    // 2. Fetch live weather to update popup meteorological readings
    fetch("/api/weather")
      .then((res) => res.json())
      .then((wData) => {
        if (wData?.stations) {
          const { perseverance: pw, curiosity: cw } = wData.stations;
          setMissions((prev) =>
            prev.map((m) => {
              if (m.id === "perseverance" && pw?.latest) {
                const l = pw.latest;
                return {
                  ...m,
                  temp: l.temperature ?? m.temp,
                  pressure: l.pressure ?? m.pressure,
                  wind: l.wind ?? m.wind,
                  groundTemp: l.ground_temperature,
                };
              }
              if (m.id === "curiosity" && cw?.latest) {
                const l = cw.latest;
                return {
                  ...m,
                  temp: l.temperature ?? m.temp,
                  pressure: l.pressure ?? m.pressure,
                  wind: l.wind ?? m.wind,
                  groundTemp: l.ground_temperature,
                };
              }
              return m;
            })
          );
        }
      })
      .catch((err) => console.warn("Weather sync warning:", err));
  }, []);

  // Layer toggles
  const [showStorms, setShowStorms] = useState(true);
  const [showWindVectors, setShowWindVectors] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [stormPhase, setStormPhase] = useState(0);

  // ── Smart Cache & Progressive Map Downloader ──────────────────────────────
  const loadMapImage = useCallback(async (useHd: boolean) => {
    setLoad((s) => ({
      ...s,
      phase: "downloading",
      progress: 0,
      loadedMB: 0,
      totalMB: 0,
      hdQuality: useHd,
    }));

    const targetUrl = useHd ? "/api/mars-map?hd=true" : "/api/mars-map";
    const cacheKey = useHd ? "mars-map-8k-v1" : "mars-map-2k-v1";

    try {
      // 1. Check Browser Cache API
      if (typeof window !== "undefined" && "caches" in window) {
        const cache = await caches.open("mars-explorer-cache");
        const match = await cache.match(cacheKey);
        if (match) {
          const blob = await match.blob();
          const objUrl = URL.createObjectURL(blob);
          setImgSrc(objUrl);
          setLoad((s) => ({
            ...s,
            phase: "done",
            progress: 100,
            cached: true,
            totalMB: blob.size / 1024 / 1024,
            loadedMB: blob.size / 1024 / 1024,
          }));
          return;
        }
      }

      // 2. Stream download from /api/mars-map with real progress
      const startTime = performance.now();
      const res = await fetch(targetUrl);
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const cl = res.headers.get("content-length");
      const total = cl ? parseInt(cl, 10) : useHd ? 8396951 : 750547;
      const totalMB = total / 1024 / 1024;
      setLoad((s) => ({ ...s, totalMB }));

      const reader = res.body.getReader();
      const chunks: Uint8Array[] = [];
      let received = 0;
      let lastSpeedCalc = startTime;
      let bytesSinceLastCalc = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          chunks.push(value);
          received += value.length;
          bytesSinceLastCalc += value.length;

          const now = performance.now();
          let currentSpeed = 0;
          if (now - lastSpeedCalc > 250) {
            currentSpeed =
              bytesSinceLastCalc / 1024 / 1024 / ((now - lastSpeedCalc) / 1000);
            lastSpeedCalc = now;
            bytesSinceLastCalc = 0;
          }

          const pct = Math.min(99, Math.round((received / total) * 100));
          setLoad((s) => ({
            ...s,
            progress: pct,
            loadedMB: received / 1024 / 1024,
            speedMBps: currentSpeed || s.speedMBps,
          }));
        }
      }

      setLoad((s) => ({ ...s, phase: "decoding", progress: 100 }));

      const blob = new Blob(chunks as BlobPart[], { type: "image/jpeg" });

      if (typeof window !== "undefined" && "caches" in window) {
        try {
          const cache = await caches.open("mars-explorer-cache");
          await cache.put(cacheKey, new Response(blob));
        } catch {
          // ignore cache quota exceptions
        }
      }

      const url = URL.createObjectURL(blob);
      setImgSrc(url);

      await new Promise((r) => setTimeout(r, 200));
      setLoad((s) => ({ ...s, phase: "done", cached: false }));
    } catch (err) {
      console.error("Map fetch failed:", err);
      setImgSrc(useHd ? "/mars-map-hd.jpg" : "/mars-map.jpg");
      setLoad((s) => ({ ...s, phase: "done", progress: 100 }));
    }
  }, []);

  useEffect(() => {
    loadMapImage(false);
  }, [loadMapImage]);

  // ── Dust Storm Animation Loop ─────────────────────────────────────────────
  useEffect(() => {
    let t = 0;
    const interval = setInterval(() => {
      t = (t + 1) % 360;
      setStormPhase(t);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // ── Pan / Zoom Helpers ────────────────────────────────────────────────────
  const getMinScale = () => {
    const vp = vpRef.current;
    if (!vp) return 1;
    return Math.max(1, vp.offsetHeight / (vp.offsetWidth / 2) + 0.02);
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
    const vpW = vp.offsetWidth,
      vpH = vp.offsetHeight;
    const mW = vpW * s,
      mH = (vpW / 2) * s;
    tf.current.s = Math.max(getMinScale(), s);
    tf.current.x = Math.max(Math.min(0, vpW - mW), Math.min(0, tf.current.x));
    tf.current.y = Math.max(Math.min(0, vpH - mH), Math.min(0, tf.current.y));
  }, []);

  const initView = useCallback(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const vpW = vp.offsetWidth,
      vpH = vp.offsetHeight;
    const mH = vpW / 2;
    const s = Math.max(getMinScale() + 0.4, vpH / mH);
    tf.current = {
      s,
      x: vpW / 2 - 0.7917 * vpW * s,
      y: vpH / 2 - 0.4556 * mH * s,
    };
    clampTf();
    applyTf();
    setScaleLabel(`×${tf.current.s.toFixed(1)}`);
  }, [applyTf, clampTf]);

  // ── Drag & Zoom Wiring ────────────────────────────────────────────────────
  useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;

    initView();

    const onDown = (e: MouseEvent) => {
      drag.current = {
        on: true,
        sx: e.clientX,
        sy: e.clientY,
        ox: tf.current.x,
        oy: tf.current.y,
      };
      vp.style.cursor = "grabbing";
    };

    const onMove = (e: MouseEvent) => {
      const rect = vp.getBoundingClientRect();
      const relX =
        (e.clientX - rect.left - tf.current.x) / (rect.width * tf.current.s);
      const relY =
        (e.clientY - rect.top - tf.current.y) /
        ((rect.width / 2) * tf.current.s);
      const lon = Math.max(-180, Math.min(180, relX * 360 - 180));
      const lat = Math.max(-90, Math.min(90, 90 - relY * 180));
      setCoordLabel(
        `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? "N" : "S"}  ${Math.abs(lon).toFixed(2)}°${lon >= 0 ? "E" : "W"}`
      );

      if (!drag.current.on) return;
      tf.current.x = drag.current.ox + (e.clientX - drag.current.sx);
      tf.current.y = drag.current.oy + (e.clientY - drag.current.sy);
      clampTf();
      applyTf();
    };

    const onUp = () => {
      drag.current.on = false;
      vp.style.cursor = "grab";
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = vp.getBoundingClientRect();
      const mx = e.clientX - rect.left,
        my = e.clientY - rect.top;
      const f = e.deltaY < 0 ? 1.2 : 1 / 1.2;
      const newS = Math.max(getMinScale(), Math.min(14, tf.current.s * f));
      const sd = newS / tf.current.s;
      tf.current.x = mx - sd * (mx - tf.current.x);
      tf.current.y = my - sd * (my - tf.current.y);
      tf.current.s = newS;
      clampTf();
      applyTf();
      setScaleLabel(`×${newS.toFixed(1)}`);
    };

    let lastDist = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        drag.current = {
          on: true,
          sx: e.touches[0].clientX,
          sy: e.touches[0].clientY,
          ox: tf.current.x,
          oy: tf.current.y,
        };
      } else if (e.touches.length === 2) {
        drag.current.on = false;
        lastDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && drag.current.on) {
        tf.current.x = drag.current.ox + (e.touches[0].clientX - drag.current.sx);
        tf.current.y = drag.current.oy + (e.touches[0].clientY - drag.current.sy);
        clampTf();
        applyTf();
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        if (lastDist > 0) {
          const rect = vp.getBoundingClientRect();
          const mx = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
          const my = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;
          const newS = Math.max(
            getMinScale(),
            Math.min(14, tf.current.s * (dist / lastDist))
          );
          const sd = newS / tf.current.s;
          tf.current.x = mx - sd * (mx - tf.current.x);
          tf.current.y = my - sd * (my - tf.current.y);
          tf.current.s = newS;
          clampTf();
          applyTf();
          setScaleLabel(`×${newS.toFixed(1)}`);
        }
        lastDist = dist;
      }
    };

    const onTouchEnd = () => {
      drag.current.on = false;
      lastDist = 0;
    };

    const onResize = () => {
      clampTf();
      applyTf();
    };

    vp.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    vp.addEventListener("wheel", onWheel, { passive: false });
    vp.addEventListener("touchstart", onTouchStart, { passive: true });
    vp.addEventListener("touchmove", onTouchMove, { passive: true });
    vp.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", onResize);

    return () => {
      vp.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      vp.removeEventListener("wheel", onWheel);
      vp.removeEventListener("touchstart", onTouchStart);
      vp.removeEventListener("touchmove", onTouchMove);
      vp.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
    };
  }, [applyTf, clampTf, initView]);

  const doZoom = (f: number) => {
    const vp = vpRef.current;
    if (!vp) return;
    const cx = vp.offsetWidth / 2,
      cy = vp.offsetHeight / 2;
    const newS = Math.max(getMinScale(), Math.min(14, tf.current.s * f));
    const sd = newS / tf.current.s;
    tf.current.x = cx - sd * (cx - tf.current.x);
    tf.current.y = cy - sd * (cy - tf.current.y);
    tf.current.s = newS;
    clampTf();
    applyTf();
    setScaleLabel(`×${newS.toFixed(1)}`);
  };

  const flyTo = (targetLat: number, targetLon: number, targetZoom = 4.5) => {
    const vp = vpRef.current;
    if (!vp) return;
    const vpW = vp.offsetWidth,
      vpH = vp.offsetHeight;
    const pos = toPercent(targetLat, targetLon);
    const targetS = Math.max(getMinScale(), targetZoom);
    const targetX = vpW / 2 - (pos.x / 100) * vpW * targetS;
    const targetY = vpH / 2 - (pos.y / 100) * (vpW / 2) * targetS;
    const { x: sx, y: sy, s: ss } = tf.current;
    const t0 = performance.now();
    const ease = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const step = (now: number) => {
      const raw = Math.min((now - t0) / 750, 1),
        t = ease(raw);
      tf.current = {
        x: sx + (targetX - sx) * t,
        y: sy + (targetY - sy) * t,
        s: ss + (targetS - ss) * t,
      };
      clampTf();
      applyTf();
      setScaleLabel(`×${tf.current.s.toFixed(1)}`);
      if (raw < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      }
    };
    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(step);
  };

  const mapDone = load.phase === "done";

  return (
    <section id="map" className="relative py-20 bg-space-950 overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-mars-800/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px]" />
      </div>

      {/* ── Section Header ─────────────────────────────────────────────────── */}
      <div className="section-padding mb-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-mars-500 animate-ping" />
              <p className="font-mono text-xs text-mars-400 tracking-[0.25em] uppercase">
                Interactive Mars High-Resolution Surface Radar
              </p>
            </div>

            {/* Cache Status Badge */}
            {mapDone && (
              <div className="flex items-center gap-2 font-mono text-[11px] px-3 py-1 rounded-full bg-space-900/80 border border-mars-500/20 text-[var(--text-secondary)]">
                <span className="text-emerald-400">⚡</span>
                <span>{load.cached ? "瀏覽器快取極速載入" : "已儲存至離線快取"}</span>
                <span className="text-mars-400">({load.hdQuality ? "8K 超高畫質" : "2K 標準"})</span>
              </div>
            )}
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-gradient mb-3">
            火星即時地表航圖 · 探測器與沙塵暴追蹤
          </h2>
          <p className="text-[var(--text-secondary)] font-display text-base sm:text-lg max-w-3xl leading-relaxed">
            以 2:1 等距圓柱圓球投影高解析度衛星圖為基底。精準鎖定歷史著名探測車、著陸器與
            <span className="text-emerald-400 font-semibold"> 機智號直升機飛行基地</span>。
            即時演算火星 Hadley 環流與動態沙塵暴路徑，並回傳現役探測器遙測氣象數據。
          </p>

          {/* Quick Jump Buttons */}
          <div className="flex flex-wrap items-center gap-2 mt-5">
            <span className="text-xs font-mono text-[var(--text-muted)] mr-1">快速定位：</span>

            {missions.map((m) => {
              const cfg = STATUS[m.status];
              const isSelected = selected?.id === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    flyTo(m.lat, m.lon, m.category === "helicopter" ? 6.5 : 5.0);
                    setSelected(m);
                    setSelectedStorm(null);
                  }}
                  disabled={!mapDone}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-mono text-xs transition-all ${
                    isSelected
                      ? "ring-2 ring-mars-400 bg-mars-500/20 text-white"
                      : "hover:scale-105"
                  } ${mapDone ? "cursor-pointer" : "opacity-40 cursor-wait"} ${cfg.border}`}
                  style={{ background: `${m.color}15` }}
                >
                  {m.category === "helicopter" ? (
                    <Plane size={12} className="text-emerald-400 animate-pulse" />
                  ) : (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${cfg.dot} flex-shrink-0 ${
                        m.status === "active" ? "animate-pulse" : ""
                      }`}
                    />
                  )}
                  <span style={{ color: m.color }}>{m.name}</span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    ({m.nameEn})
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ── Main Map Canvas Container ───────────────────────────────────────── */}
      <div className="relative w-full" style={{ height: "78vh" }}>
        {/* HUD Overlay Top-Left: Status & Coordinates */}
        {mapDone && (
          <div className="absolute top-4 left-4 z-30 flex flex-col gap-2 pointer-events-none">
            <div className="glass-card rounded-xl px-4 py-2.5 font-mono text-xs border border-mars-500/25 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span className="text-mars-400 font-bold tracking-wider">
                  MARS TELEMETRY HUD
                </span>
                <span className="text-[10px] text-[var(--text-muted)] ml-auto">
                  {scaleLabel}
                </span>
              </div>
              <div className="text-white text-xs font-semibold tracking-wide">
                {coordLabel}
              </div>
              <div className="text-[var(--text-muted)] text-[10px] mt-1 flex items-center gap-2">
                <span>投影: Equirectangular 2:1</span>
                <span>•</span>
                <span>基準 Sol: 5008</span>
              </div>
            </div>

            {/* Layer Control Bar */}
            <div className="glass-card rounded-xl px-3 py-2 border border-white/10 flex items-center gap-2 pointer-events-auto text-[11px] font-mono shadow-lg">
              <button
                onClick={() => setShowStorms(!showStorms)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                  showStorms
                    ? "bg-orange-500/30 text-orange-300 border border-orange-500/50"
                    : "text-[var(--text-muted)] hover:text-white"
                }`}
              >
                <AlertTriangle size={12} />
                <span>沙塵暴動態</span>
              </button>

              <button
                onClick={() => setShowWindVectors(!showWindVectors)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                  showWindVectors
                    ? "bg-cyan-500/30 text-cyan-300 border border-cyan-500/50"
                    : "text-[var(--text-muted)] hover:text-white"
                }`}
              >
                <Wind size={12} />
                <span>大氣環流風向</span>
              </button>

              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                  showGrid
                    ? "bg-white/20 text-white border border-white/30"
                    : "text-[var(--text-muted)] hover:text-white"
                }`}
              >
                <Compass size={12} />
                <span>經緯網格</span>
              </button>
            </div>
          </div>
        )}

        {/* HUD Overlay Top-Right: Map Tools & Resolution Switch */}
        {mapDone && (
          <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
            {/* Zoom Controls */}
            <div className="glass-card border border-mars-500/20 rounded-xl p-1 flex flex-col gap-1 shadow-lg">
              <button
                title="放大 (或使用滾輪向前)"
                onClick={() => doZoom(1.4)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-mars-400 hover:text-white hover:bg-mars-500/20 transition-all"
              >
                <ZoomIn size={15} />
              </button>
              <button
                title="縮小 (或使用滾輪向後)"
                onClick={() => doZoom(1 / 1.4)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-mars-400 hover:text-white hover:bg-mars-500/20 transition-all"
              >
                <ZoomOut size={15} />
              </button>
              <button
                title="重置全景視角"
                onClick={initView}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-mars-400 hover:text-white hover:bg-mars-500/20 transition-all border-t border-white/5"
              >
                <Maximize2 size={13} />
              </button>
            </div>

            {/* Quality Upgrade Toggle (2K vs 8K) */}
            <button
              onClick={() => loadMapImage(!load.hdQuality)}
              className="glass-card border border-mars-500/30 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 font-mono text-[10px] text-mars-300 hover:text-white hover:border-mars-400 transition-all shadow-lg"
              title="切換超高解析度衛星航圖"
            >
              <DownloadCloud size={12} className="text-orange-400" />
              <span>{load.hdQuality ? "8K 航圖 (現行)" : "升級 8K"}</span>
            </button>
          </div>
        )}

        {/* HUD Overlay Bottom-Left: Legend & Storm Status */}
        {mapDone && (
          <div className="absolute bottom-5 left-4 z-30 flex flex-col gap-2 pointer-events-none">
            <div className="glass-card rounded-xl px-4 py-3 border border-white/10 text-[11px] shadow-xl backdrop-blur-md max-w-xs">
              <div className="font-mono text-[10px] text-mars-400 font-bold mb-2 uppercase tracking-wider flex items-center gap-1.5">
                <Layers size={11} />
                <span>圖層圖例與標記說明</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-400/30 animate-pulse" />
                  <span className="text-[var(--text-secondary)]">運行中探測器 (核動力 / MEDA)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Plane size={11} className="text-emerald-400" />
                  <span className="text-[var(--text-secondary)]">機智號火星直升機 (飛行地)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="text-[var(--text-secondary)]">休眠中探測器 (祝融號)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <span className="text-[var(--text-secondary)]">圓滿結束任務 (洞察號/機會號)</span>
                </div>
                {showStorms && (
                  <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                    <span className="w-3 h-2 rounded bg-orange-500/50 border border-orange-400/60" />
                    <span className="text-orange-300 font-mono text-[10px]">
                      動態沙塵暴氣旋區 (Tau &gt; 1.5)
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* HUD Overlay Bottom-Right: Interaction Guide */}
        {mapDone && (
          <div className="absolute bottom-5 right-4 z-30 glass-card rounded-full px-4 py-1.5 font-mono text-[11px] text-[var(--text-secondary)] border border-white/10 pointer-events-none hidden sm:block shadow-lg">
            🖱️ 滑鼠拖曳移動 · 滾輪自由縮放 · 點擊探測器或沙塵暴查看實測數據
          </div>
        )}

        {/* ── Viewport Container ────────────────────────────────────────────── */}
        <div
          ref={vpRef}
          className="w-full h-full overflow-hidden select-none"
          style={{ cursor: mapDone ? "grab" : "default", background: "#060303" }}
        >
          {/* ── Authentic Download Progress Overlay ───────────────────────── */}
          <AnimatePresence>
            {!mapDone && (
              <motion.div
                key="loader"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-40 bg-[#090403] px-6"
              >
                {/* Rotating Planet HUD */}
                <div className="relative w-28 h-28">
                  <div className="absolute inset-0 rounded-full border border-mars-500/20" />
                  <div
                    className="absolute inset-0 rounded-full border-2 border-transparent border-t-mars-500 border-r-orange-400/60 animate-spin"
                    style={{ animationDuration: "1.2s" }}
                  />
                  <div
                    className="absolute inset-2 rounded-full border border-dashed border-mars-400/30 animate-spin"
                    style={{ animationDuration: "8s", animationDirection: "reverse" }}
                  />

                  {/* Inner Mars Orb */}
                  <div
                    className="absolute inset-4 rounded-full flex flex-col items-center justify-center shadow-inner"
                    style={{
                      background:
                        "radial-gradient(circle at 35% 35%, #9e3410 0%, #4a1508 70%, #1a0603 100%)",
                    }}
                  >
                    <span className="font-mono font-bold text-white text-xl tabular-nums">
                      {load.progress}%
                    </span>
                    <span className="font-mono text-[9px] text-orange-300/80 uppercase tracking-widest">
                      {load.phase === "decoding" ? "DECODE" : "STREAM"}
                    </span>
                  </div>
                </div>

                {/* Progress Bar & Real Data */}
                <div className="w-full max-w-sm space-y-2.5">
                  <div className="flex justify-between items-center font-mono text-xs text-[var(--text-secondary)]">
                    <span className="flex items-center gap-1.5 text-mars-300">
                      <Sparkles size={12} className="text-orange-400" />
                      {load.phase === "decoding"
                        ? "正在解碼火星高解析度衛星航圖..."
                        : load.hdQuality
                        ? "串流下載 8K 衛星地貌數據..."
                        : "串流下載 2K 衛星地質航圖..."}
                    </span>
                    <span className="tabular-nums font-bold text-white">
                      {load.loadedMB.toFixed(2)} / {load.totalMB.toFixed(2)} MB
                    </span>
                  </div>

                  {/* The Gradient Progress Track */}
                  <div className="w-full h-2.5 bg-space-900 rounded-full overflow-hidden border border-mars-500/30 p-0.5">
                    <div
                      className="h-full rounded-full relative transition-all duration-300 ease-out"
                      style={{
                        width: `${load.progress}%`,
                        background:
                          "linear-gradient(90deg, #c44612 0%, #e85d1a 50%, #ff9f60 100%)",
                        boxShadow: "0 0 12px rgba(232,93,26,0.8)",
                      }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                  </div>

                  {/* Real Throughput & Cache Benefit Note */}
                  <div className="flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)] pt-1">
                    <span>
                      {load.speedMBps > 0
                        ? `傳輸速度: ${load.speedMBps.toFixed(1)} MB/s`
                        : "連接本地靜態緩存..."}
                    </span>
                    <span className="text-orange-400/80">
                      ⚡ 儲存後下次離線秒開
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Transformed Inner Mars Surface Map ────────────────────────── */}
          <div
            ref={innerRef}
            className="absolute top-0 left-0"
            style={{
              width: "100%",
              aspectRatio: "2 / 1",
              transformOrigin: "top left",
              willChange: "transform",
            }}
          >
            {/* Base Satellite Map Image */}
            {imgSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imgSrc}
                alt="Mars Equirectangular HD Surface Map"
                className="absolute inset-0 w-full h-full"
                style={{
                  objectFit: "fill",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
                draggable={false}
              />
            )}

            {/* Atmosphere & Edge Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(6,3,3,0.6) 100%)",
              }}
            />

            {/* ── Martian Coordinate Grid Overlay ─────────────────────────── */}
            {showGrid && (
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
                viewBox="0 0 360 180"
                preserveAspectRatio="none"
              >
                {[-60, -30, 0, 30, 60].map((lat) => (
                  <line
                    key={`lat-${lat}`}
                    x1="0"
                    y1={90 - lat}
                    x2="360"
                    y2={90 - lat}
                    stroke="#e85d1a"
                    strokeWidth={lat === 0 ? "0.6" : "0.25"}
                    strokeDasharray={lat === 0 ? "none" : "2,2"}
                  />
                ))}
                {[-120, -60, 0, 60, 120].map((lon) => (
                  <line
                    key={`lon-${lon}`}
                    x1={lon + 180}
                    y1="0"
                    x2={lon + 180}
                    y2="180"
                    stroke="#e85d1a"
                    strokeWidth={lon === 0 ? "0.6" : "0.25"}
                    strokeDasharray={lon === 0 ? "none" : "2,2"}
                  />
                ))}
              </svg>
            )}

            {/* ── Dynamic Dust Storm Fronts Simulation Layer ───────────────── */}
            {showStorms &&
              DUST_STORMS.map((storm) => {
                const center = toPercent(storm.centerLat, storm.centerLon);
                const rad = (stormPhase * Math.PI) / 180;
                const shiftX = Math.sin(rad) * 1.5;
                const shiftY = Math.cos(rad) * 0.8;
                const isSelected = selectedStorm?.id === storm.id;

                return (
                  <div
                    key={storm.id}
                    className="absolute"
                    style={{
                      left: `${center.x + shiftX}%`,
                      top: `${center.y + shiftY}%`,
                      transform: "translate(-50%, -50%)",
                      width: `${storm.radiusDeg * 1.2}%`,
                      height: `${storm.radiusDeg * 0.7}%`,
                      zIndex: isSelected ? 22 : 12,
                    }}
                  >
                    {/* Swirling Dust Storm Cloud Animation */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "radial-gradient(ellipse at 45% 45%, rgba(217, 107, 30, 0.45) 0%, rgba(180, 80, 20, 0.28) 45%, rgba(130, 50, 10, 0.1) 75%, transparent 100%)",
                        filter: "blur(12px)",
                        animation: `dustDrift 10s ease-in-out infinite alternate`,
                        transform: `rotate(${stormPhase * 0.4}deg)`,
                      }}
                    />

                    {/* Second counter-rotating dust vortex layer */}
                    <div
                      className="absolute inset-2 rounded-full opacity-60"
                      style={{
                        background:
                          "radial-gradient(ellipse at 55% 50%, rgba(245, 158, 11, 0.35) 0%, rgba(194, 65, 12, 0.15) 50%, transparent 100%)",
                        filter: "blur(8px)",
                        transform: `rotate(-${stormPhase * 0.6}deg)`,
                      }}
                    />

                    {/* Interactive Storm Center Beacon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStorm(isSelected ? null : storm);
                        setSelected(null);
                        flyTo(storm.centerLat, storm.centerLon, 4.0);
                      }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group"
                    >
                      <div className="w-5 h-5 rounded-full border border-orange-400/60 bg-orange-600/40 flex items-center justify-center backdrop-blur-sm group-hover:scale-125 transition-transform shadow-lg">
                        <AlertTriangle size={11} className="text-orange-300" />
                      </div>
                      <span className="absolute top-full mt-1 whitespace-nowrap font-mono text-[9px] text-orange-200 bg-space-950/80 px-1.5 py-0.5 rounded border border-orange-500/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {storm.name} (Tau: {storm.tau})
                      </span>
                    </button>
                  </div>
                );
              })}

            {/* ── Global Wind Vector Flow Simulation ───────────────────────── */}
            {showWindVectors && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                {[
                  { x: 75, y: 70, deg: 45, label: "Hadley 升流" },
                  { x: 80, y: 65, deg: 40, label: "" },
                  { x: 38, y: 35, deg: 135, label: "北半球冷鋒" },
                  { x: 42, y: 40, deg: 140, label: "" },
                  { x: 45, y: 45, deg: 145, label: "" },
                  { x: 25, y: 68, deg: 30, label: "阿爾及爾偏南風" },
                  { x: 60, y: 42, deg: 90, label: "赤道東風帶" },
                ].map((w, idx) => (
                  <div
                    key={`wind-${idx}`}
                    className="absolute flex items-center gap-1 font-mono text-[8px] text-cyan-300"
                    style={{
                      left: `${w.x}%`,
                      top: `${w.y}%`,
                      transform: `rotate(${w.deg}deg)`,
                      animation: "pulse 3s ease-in-out infinite",
                    }}
                  >
                    <Wind size={14} className="text-cyan-400" />
                    {w.label && (
                      <span className="bg-space-950/70 px-1 rounded text-[7px] text-cyan-200">
                        {w.label}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ── Mission Markers (Rovers, Helicopters, Landers) ────────── */}
            {missions.map((m) => {
              const pos = toPercent(m.lat, m.lon);
              const isSel = selected?.id === m.id;
              const isHeli = m.category === "helicopter";
              const isActive = m.status === "active";

              return (
                <div
                  key={m.id}
                  className="absolute"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: isSel ? 35 : 25,
                  }}
                >
                  {/* Active Sonar Ping Beacon */}
                  {isActive && (
                    <>
                      <div
                        className="absolute rounded-full pointer-events-none"
                        style={{
                          width: 34,
                          height: 34,
                          top: "50%",
                          left: "50%",
                          background: m.glow,
                          animation: "markerPulse1 2.4s ease-out infinite",
                        }}
                      />
                      <div
                        className="absolute rounded-full pointer-events-none"
                        style={{
                          width: 52,
                          height: 52,
                          top: "50%",
                          left: "50%",
                          background: m.glow,
                          animation: "markerPulse2 2.4s ease-out 0.5s infinite",
                        }}
                      />
                    </>
                  )}

                  {/* Marker Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(isSel ? null : m);
                      setSelectedStorm(null);
                      flyTo(m.lat, m.lon, isHeli ? 6.5 : 5.0);
                    }}
                    className="relative flex flex-col items-center group cursor-pointer"
                  >
                    {isHeli ? (
                      <div
                        className="w-6 h-6 rounded-full border-2 border-emerald-300 bg-emerald-700/80 flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform"
                        style={{
                          boxShadow: `0 0 12px ${m.glow}`,
                          transform: isSel ? "scale(1.35)" : undefined,
                        }}
                      >
                        <Plane size={13} className="text-white animate-bounce" />
                      </div>
                    ) : (
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white transition-all group-hover:scale-[1.7] shadow-xl"
                        style={{
                          backgroundColor: m.color,
                          opacity: m.status === "ended" ? 0.65 : 1,
                          boxShadow: isActive
                            ? `0 0 12px ${m.color}, 0 0 24px ${m.glow}`
                            : "none",
                          transform: isSel ? "scale(1.75)" : undefined,
                        }}
                      />
                    )}

                    {/* Permanent or Hover Title Tag */}
                    <div
                      className={`absolute bottom-full mb-1 px-2 py-0.5 rounded font-mono text-[10px] whitespace-nowrap transition-all shadow-md ${
                        isSel
                          ? "opacity-100 bg-space-950 text-white border border-mars-400"
                          : "opacity-0 group-hover:opacity-100 bg-space-900/90 text-slate-200 border border-white/20"
                      }`}
                    >
                      <span className="font-bold">{m.name}</span>
                      <span className="text-[9px] text-[var(--text-muted)] ml-1">
                        {m.nameEn}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mission Detail Telemetry Modal (Slide-in) ────────────────────── */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-4 right-4 z-40 w-84 sm:w-96 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
              style={{
                border: `1px solid ${selected.color}40`,
                background: "rgba(10, 6, 8, 0.95)",
                backdropFilter: "blur(20px)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="h-1.5 w-full"
                style={{
                  background: `linear-gradient(90deg, ${selected.color}, transparent)`,
                }}
              />

              <div
                className="p-5 pb-3 flex items-start justify-between"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold ${
                        STATUS[selected.status].badge
                      }`}
                    >
                      {STATUS[selected.status].label}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--text-muted)]">
                      Sol {selected.sol}
                    </span>
                  </div>

                  {selected.isLiveTelemetry && (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] mb-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      NASA JPL 即時遙測已同步 · Drive #{selected.driveId ?? "---"}
                    </div>
                  )}

                  <h3 className="font-display font-bold text-white text-2xl leading-snug flex items-center gap-2">
                    {selected.name}
                    {selected.category === "helicopter" && (
                      <Plane size={18} className="text-emerald-400" />
                    )}
                  </h3>
                  <p className="font-mono text-xs text-mars-400">
                    {selected.nameEn} · {selected.agency}
                  </p>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="text-[var(--text-muted)] hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-5 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 font-mono text-[11px]">
                  <div>
                    <span className="text-[var(--text-muted)] block text-[10px]">
                      {selected.isLiveTelemetry ? "當前即時坐標" : "著陸坐標"}
                    </span>
                    <span className="text-slate-200">
                      {Math.abs(selected.lat).toFixed(4)}°
                      {selected.lat >= 0 ? "N" : "S"},{" "}
                      {Math.abs(selected.lon).toFixed(4)}°
                      {selected.lon >= 0 ? "E" : "W"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] block text-[10px]">
                      {selected.distKm !== undefined ? "累計行駛距離" : "著陸日期"}
                    </span>
                    <span className="text-slate-200">
                      {selected.distKm !== undefined ? `${selected.distKm} km` : selected.landed}
                    </span>
                  </div>
                  {selected.elevation !== undefined && (
                    <div>
                      <span className="text-[var(--text-muted)] block text-[10px]">火星大地高程</span>
                      <span className="text-slate-200">{selected.elevation} m</span>
                    </div>
                  )}
                  <div className={selected.elevation !== undefined ? "" : "col-span-2 pt-1 border-t border-white/5"}>
                    <span className="text-[var(--text-muted)] block text-[10px]">探測區域</span>
                    <span className="text-orange-300">{selected.location}</span>
                  </div>
                </div>

                <p className="text-[var(--text-secondary)] font-display leading-relaxed text-sm">
                  {selected.desc}
                </p>

                {selected.stats && (
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <span className="font-mono text-[10px] text-mars-400 uppercase tracking-wider block mb-1 font-bold">
                      任務成就與航行數據
                    </span>
                    {Object.entries(selected.stats).map(([k, v]) => (
                      <div
                        key={k}
                        className="flex justify-between items-center text-[11px] font-mono"
                      >
                        <span className="text-[var(--text-muted)]">{k}</span>
                        <span className="text-slate-200 font-semibold">{v}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className="rounded-xl p-3.5 space-y-2.5"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(232,93,26,0.08) 0%, rgba(10,6,8,0.4) 100%)",
                    border: "1px solid rgba(232,93,26,0.2)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-orange-400 tracking-wider uppercase font-bold flex items-center gap-1.5">
                      <Radio size={12} className="animate-pulse text-orange-400" />
                      {selected.status === "active"
                        ? "實測氣象遙測 · LIVE WEATHER"
                        : "最終氣象記錄 · LAST TELEMETRY"}
                    </span>
                    <span className="font-mono text-[9px] text-[var(--text-muted)]">
                      光延遲 ~16.8分
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center pt-1">
                    <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                      <Thermometer size={14} className="text-blue-400 mx-auto mb-1" />
                      <div className="font-mono text-[9px] text-[var(--text-muted)]">平均氣溫</div>
                      <div className="font-display font-bold text-base text-blue-300">
                        {selected.temp.avg}
                        {selected.temp.unit}
                      </div>
                      <div className="font-mono text-[8px] text-[var(--text-muted)]">
                        {selected.temp.min} ~ {selected.temp.max}
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                      <Gauge size={14} className="text-emerald-400 mx-auto mb-1" />
                      <div className="font-mono text-[9px] text-[var(--text-muted)]">大氣壓強</div>
                      <div className="font-display font-bold text-base text-emerald-300">
                        {selected.pressure.avg}
                      </div>
                      <div className="font-mono text-[8px] text-[var(--text-muted)]">
                        {selected.pressure.unit} (CO2)
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                      <Wind size={14} className="text-cyan-400 mx-auto mb-1" />
                      <div className="font-mono text-[9px] text-[var(--text-muted)]">風速風向</div>
                      <div className="font-display font-bold text-base text-cyan-300">
                        {selected.wind.avg} <span className="text-[10px]">m/s</span>
                      </div>
                      <div className="font-mono text-[8px] text-[var(--text-muted)]">
                        {selected.wind.dir}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between font-mono text-[10px]">
                    <span className="text-[var(--text-muted)]">
                      大氣沙塵光學厚度 (Tau $\tau$):
                    </span>
                    <span
                      className={`font-bold ${
                        selected.tau > 1.2
                          ? "text-red-400"
                          : selected.tau > 0.6
                          ? "text-amber-400"
                          : "text-emerald-400"
                      }`}
                    >
                      {selected.tau}{" "}
                      {selected.tau > 1.2
                        ? "(沙塵暴警戒)"
                        : selected.tau > 0.6
                        ? "(輕度揚沙)"
                        : "(晴朗透光)"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Dust Storm Front Detail Modal ─────────────────────────────── */}
          {selectedStorm && (
            <motion.div
              key={selectedStorm.id}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-4 right-4 z-40 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl p-5"
              style={{
                border: "1px solid rgba(249, 115, 22, 0.4)",
                background: "rgba(18, 8, 4, 0.95)",
                backdropFilter: "blur(20px)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-1.5 text-orange-400 font-mono text-[10px] uppercase tracking-wider mb-1">
                    <AlertTriangle size={12} />
                    <span>火星極端大氣沙塵氣旋預警</span>
                  </div>
                  <h3 className="font-display font-bold text-white text-xl">
                    {selectedStorm.name}
                  </h3>
                  <p className="font-mono text-xs text-orange-300/80">
                    {selectedStorm.nameEn}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedStorm(null)}
                  className="text-[var(--text-muted)] hover:text-white p-1 rounded-lg"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <p className="text-slate-200 font-display text-sm leading-relaxed">
                  {selectedStorm.desc}
                </p>

                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-orange-950/40 border border-orange-500/20">
                  <div>
                    <span className="text-[var(--text-muted)] text-[10px] block">
                      沙塵不透明度 (Tau)
                    </span>
                    <span className="text-orange-300 font-bold text-base">
                      {selectedStorm.tau}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] text-[10px] block">
                      前鋒風速估計
                    </span>
                    <span className="text-white font-bold text-sm">
                      {selectedStorm.windSpeed}
                    </span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-orange-500/10">
                    <span className="text-[var(--text-muted)] text-[10px] block">
                      氣候影響分析
                    </span>
                    <span className="text-slate-300 text-[11px]">
                      遮蔽地表太陽輻射達 85% 以上，可能嚴重影響太陽能設備供電。
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Attribution Footer ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 mt-6 flex flex-wrap items-center justify-between text-[11px] font-mono text-[var(--text-muted)] gap-2">
        <span>
          航圖基底：NASA / USGS MOLA Mars Topographic &amp; Viking MDIM2.1 Global Mosaic
        </span>
        <span>
          探測器與氣象實測源：NASA/JPL-Caltech MEDA (Perseverance) · REMS (Curiosity) · CNSA
        </span>
      </div>
    </section>
  );
}
