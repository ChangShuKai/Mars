"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mars } from "@/lib/proto/mars";
import {
  Wind,
  Thermometer,
  Gauge,
  X,
  Radio,
  Plane,
  DownloadCloud,
} from "lucide-react";

// ── Mission data with Flight Sites & Probes ──────────────────────────────────
export interface Mission {
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

import dynamic from 'next/dynamic';
const MarsGlobe = dynamic(() => import('../ui/map/MarsGlobe'), { ssr: false });

export default function MarsMapSection() {
  const [missions, setMissions] = useState<Mission[]>(MISSIONS);
  const [selected, setSelected] = useState<Mission | null>(null);
  const [isGlobe, setIsGlobe] = useState(true);
  const [hd, setHd] = useState(false);

  useEffect(() => {
    fetch('/api/rover-location', { headers: { 'Accept': 'application/x-protobuf' } })
      .then(async (res) => {
        if (res.headers.get("content-type")?.includes("application/x-protobuf")) {
          const buffer = await res.arrayBuffer();
          return mars.RoverLocationResponse.decode(new Uint8Array(buffer)) as any;
        }
        return res.json();
      })
      .then((telemetry) => {
        if (telemetry?.rovers) {
          const { perseverance: p, curiosity: c } = telemetry.rovers;
          setMissions((prev) =>
            prev.map((m) => {
              if (m.id === 'perseverance' && p) {
                return { ...m, lat: p.coordinates?.lat ?? m.lat, lon: p.coordinates?.lon ?? m.lon, sol: p.sol ?? m.sol, elevation: p.coordinates?.elevation, distKm: p.distance?.total_km, driveId: p.drive, isLiveTelemetry: true };
              }
              if (m.id === 'curiosity' && c) {
                return { ...m, lat: c.coordinates?.lat ?? m.lat, lon: c.coordinates?.lon ?? m.lon, sol: c.sol ?? m.sol, elevation: c.coordinates?.elevation, distKm: c.distance?.total_km, driveId: c.drive, isLiveTelemetry: true };
              }
              return m;
            })
          );
        }
      })
      .catch((err) => console.warn('Rover telemetry sync warning:', err));

    fetch('/api/weather', { headers: { 'Accept': 'application/x-protobuf' } })
      .then(async (res) => {
        if (res.headers.get("content-type")?.includes("application/x-protobuf")) {
          const buffer = await res.arrayBuffer();
          return mars.WeatherResponse.decode(new Uint8Array(buffer)) as any;
        }
        return res.json();
      })
      .then((wData) => {
        if (wData?.stations) {
          const { perseverance: pw, curiosity: cw } = wData.stations;
          setMissions((prev) =>
            prev.map((m) => {
              if (m.id === 'perseverance' && pw?.latest) {
                const l = pw.latest;
                return { ...m, temp: l.temperature ?? m.temp, pressure: l.pressure ?? m.pressure, wind: l.wind ?? m.wind, groundTemp: l.ground_temperature };
              }
              if (m.id === 'curiosity' && cw?.latest) {
                const l = cw.latest;
                return { ...m, temp: l.temperature ?? m.temp, pressure: l.pressure ?? m.pressure, wind: l.wind ?? m.wind, groundTemp: l.ground_temperature };
              }
              return m;
            })
          );
        }
      })
      .catch((err) => console.warn('Weather sync warning:', err));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id='map' className='relative py-20 bg-space-950 overflow-hidden select-none'>
      <div className='section-padding mb-6 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className='flex flex-wrap items-center justify-between gap-4 mb-3'>
            <div className='flex items-center gap-2'>
              <span className='w-2.5 h-2.5 rounded-full bg-mars-500 animate-ping' />
              <p className='font-mono text-xs text-mars-400 tracking-[0.25em] uppercase'>
                Interactive Mars High-Resolution Surface Radar
              </p>
            </div>
            
            <button
              onClick={() => setHd(!hd)}
              className='glass-card border border-mars-500/30 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 font-mono text-[10px] text-mars-300 hover:text-white hover:border-mars-400 transition-all shadow-lg z-20'
            >
              <DownloadCloud size={12} className='text-orange-400' />
              <span>{hd ? '8K 航圖 (現行)' : '升級 8K'}</span>
            </button>
          </div>

          <h2 className='text-3xl sm:text-5xl font-display font-bold text-gradient mb-3'>
            火星即時地表航圖 · 探測器追蹤
          </h2>
          <p className='text-[var(--text-secondary)] font-display text-base sm:text-lg max-w-3xl leading-relaxed'>
            以高解析度衛星圖為基底。精準鎖定歷史著名探測車、著陸器與機智號直升機飛行基地。使用 WebGL 即時演算 3D 星體投影，並回傳現役探測器遙測氣象數據。
          </p>
        </motion.div>
      </div>

      <div className='relative w-full' style={{ height: '78vh' }}>
         <MarsGlobe missions={missions} selected={selected} onSelect={setSelected} hd={hd} isGlobe={isGlobe} setIsGlobe={setIsGlobe} />
         
         {/* HUD Overlay Bottom-Right: Interaction Guide */}
         <div className='absolute bottom-5 right-4 z-10 glass-card rounded-full px-4 py-1.5 font-mono text-[11px] text-white border border-white/20 pointer-events-none hidden sm:block shadow-lg bg-black/50'>
           🖱️ 滑鼠拖曳移動 · 滾輪自由縮放 · 點擊探測器查看數據
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
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className='absolute top-24 right-4 z-40 w-84 sm:w-96 rounded-2xl overflow-hidden shadow-2xl max-h-[85vh] overflow-y-auto'
              style={{
                border: `1px solid ${selected.color}40`,
                background: 'rgba(10, 6, 8, 0.95)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div
                className='h-1.5 w-full'
                style={{
                  background: `linear-gradient(90deg, ${selected.color}, transparent)`,
                }}
              />

              <div
                className='p-5 pb-3 flex items-start justify-between'
                style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div>
                  <div className='flex items-center gap-2 mb-1'>
                    <span
                      className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold ${
                        STATUS[selected.status].badge
                      }`}
                    >
                      {STATUS[selected.status].label}
                    </span>
                    <span className='font-mono text-[10px] text-[var(--text-muted)]'>
                      Sol {selected.sol}
                    </span>
                  </div>

                  {selected.isLiveTelemetry && (
                    <div className='flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] mb-1.5'>
                      <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse' />
                      NASA JPL 即時遙測已同步 · Drive #{selected.driveId ?? '---'}
                    </div>
                  )}

                  <h3 className='font-display font-bold text-white text-2xl leading-snug flex items-center gap-2'>
                    {selected.name}
                    {selected.category === 'helicopter' && (
                      <Plane size={18} className='text-emerald-400' />
                    )}
                  </h3>
                  <p className='font-mono text-xs text-mars-400'>
                    {selected.nameEn} · {selected.agency}
                  </p>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className='text-[var(--text-muted)] hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors'
                >
                  <X size={18} />
                </button>
              </div>

              <div className='p-5 space-y-4 text-xs'>
                <div className='grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 font-mono text-[11px]'>
                  <div>
                    <span className='text-[var(--text-muted)] block text-[10px]'>
                      {selected.isLiveTelemetry ? '當前即時坐標' : '著陸坐標'}
                    </span>
                    <span className='text-slate-200'>
                      {Math.abs(selected.lat).toFixed(4)}°
                      {selected.lat >= 0 ? 'N' : 'S'},{' '}
                      {Math.abs(selected.lon).toFixed(4)}°
                      {selected.lon >= 0 ? 'E' : 'W'}
                    </span>
                  </div>
                  <div>
                    <span className='text-[var(--text-muted)] block text-[10px]'>
                      {selected.distKm !== undefined ? '累計行駛距離' : '著陸日期'}
                    </span>
                    <span className='text-slate-200'>
                      {selected.distKm !== undefined ? `${selected.distKm} km` : selected.landed}
                    </span>
                  </div>
                  {selected.elevation !== undefined && (
                    <div>
                      <span className='text-[var(--text-muted)] block text-[10px]'>火星大地高程</span>
                      <span className='text-slate-200'>{selected.elevation} m</span>
                    </div>
                  )}
                  <div className={selected.elevation !== undefined ? '' : 'col-span-2 pt-1 border-t border-white/5'}>
                    <span className='text-[var(--text-muted)] block text-[10px]'>探測區域</span>
                    <span className='text-orange-300'>{selected.location}</span>
                  </div>
                </div>

                <p className='text-[var(--text-secondary)] font-display leading-relaxed text-sm'>
                  {selected.desc}
                </p>

                {selected.stats && (
                  <div className='p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5'>
                    <span className='font-mono text-[10px] text-mars-400 uppercase tracking-wider block mb-1 font-bold'>
                      任務成就與航行數據
                    </span>
                    {Object.entries(selected.stats).map(([k, v]) => (
                      <div
                        key={k}
                        className='flex justify-between items-center text-[11px] font-mono'
                      >
                        <span className='text-[var(--text-muted)]'>{k}</span>
                        <span className='text-slate-200 font-semibold'>{String(v)}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className='rounded-xl p-3.5 space-y-2.5'
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(232,93,26,0.08) 0%, rgba(10,6,8,0.4) 100%)',
                    border: '1px solid rgba(232,93,26,0.2)',
                  }}
                >
                  <div className='flex items-center justify-between'>
                    <span className='font-mono text-[10px] text-orange-400 tracking-wider uppercase font-bold flex items-center gap-1.5'>
                      <Radio size={12} className='animate-pulse text-orange-400' />
                      {selected.status === 'active'
                        ? '實測氣象遙測 · LIVE WEATHER'
                        : '最終氣象記錄 · LAST TELEMETRY'}
                    </span>
                    <span className='font-mono text-[9px] text-[var(--text-muted)]'>
                      光延遲 ~16.8分
                    </span>
                  </div>

                  <div className='grid grid-cols-3 gap-2 text-center pt-1'>
                    <div className='p-2 rounded-lg bg-black/40 border border-white/5'>
                      <Thermometer size={14} className='text-blue-400 mx-auto mb-1' />
                      <div className='font-mono text-[9px] text-[var(--text-muted)]'>平均氣溫</div>
                      <div className='font-display font-bold text-base text-blue-300'>
                        {selected.temp.avg}
                        {selected.temp.unit}
                      </div>
                      <div className='font-mono text-[8px] text-[var(--text-muted)]'>
                        {selected.temp.min} ~ {selected.temp.max}
                      </div>
                    </div>

                    <div className='p-2 rounded-lg bg-black/40 border border-white/5'>
                      <Gauge size={14} className='text-emerald-400 mx-auto mb-1' />
                      <div className='font-mono text-[9px] text-[var(--text-muted)]'>大氣壓強</div>
                      <div className='font-display font-bold text-base text-emerald-300'>
                        {selected.pressure.avg} {selected.pressure.unit}
                      </div>
                    </div>

                    <div className='p-2 rounded-lg bg-black/40 border border-white/5'>
                      <Wind size={14} className='text-cyan-400 mx-auto mb-1' />
                      <div className='font-mono text-[9px] text-[var(--text-muted)]'>
                        風速 ({selected.wind.dir})
                      </div>
                      <div className='font-display font-bold text-base text-cyan-300'>
                        {selected.wind.avg} {selected.wind.unit}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </section>
  );
}