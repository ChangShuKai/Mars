"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Thermometer,
  Wind,
  Gauge,
  Calendar,
  Radio,
  AlertTriangle,
  Compass,
  Sun,
  Moon,
  Activity,
  MapPin,
  Sparkles,
} from "lucide-react";

type StationKey = "perseverance" | "curiosity" | "insight";

interface SolRecord {
  sol: string;
  date: string;
  min_temp?: number | null;
  max_temp?: number | null;
  min_gts?: number | null;
  max_gts?: number | null;
  pressure?: number | null;
  uv?: string;
}

interface StationData {
  station: StationKey;
  rover: string;
  name: string;
  nameEn: string;
  status: "active" | "ended";
  instrument: string;
  location: string;
  note?: string;
  latest: {
    sol: string;
    terrestrial_date: string;
    season: string;
    northern_season?: string;
    ls?: string;
    temperature: {
      average: number;
      min: number;
      max: number;
      unit: string;
    };
    ground_temperature?: {
      average: number;
      min: number;
      max: number;
      unit: string;
    };
    pressure: {
      average: number;
      min?: number;
      max?: number;
      string?: string;
      unit: string;
    };
    wind?: {
      average: number;
      min?: number;
      max?: number;
      unit: string;
      most_common_direction?: string;
      compass_degrees?: number;
    };
    uv_index?: string;
    atmo_opacity?: string;
    sunrise?: string;
    sunset?: string;
  };
  history?: SolRecord[];
}

interface WeatherResponse {
  timestamp?: string;
  stations: {
    perseverance: StationData;
    curiosity: StationData;
    insight: StationData;
  };
}

function WindRose({ direction = "N/A", degrees = 0 }: { direction?: string; degrees?: number }) {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const step = 360 / dirs.length;

  return (
    <div className="relative w-24 h-24 mx-auto my-1">
      <svg viewBox="0 0 112 112" className="w-full h-full">
        {[44, 32, 20].map((r) => (
          <circle key={r} cx={56} cy={56} r={r} fill="none" stroke="rgba(232,93,26,0.18)" strokeWidth={1} />
        ))}
        {dirs.map((d, i) => {
          const angle = (i * step * Math.PI) / 180 - Math.PI / 2;
          return (
            <line
              key={d}
              x1={56}
              y1={56}
              x2={56 + 44 * Math.cos(angle)}
              y2={56 + 44 * Math.sin(angle)}
              stroke="rgba(232,93,26,0.2)"
              strokeWidth={1}
            />
          );
        })}
        <g transform={`rotate(${degrees}, 56, 56)`}>
          <polygon points="56,14 60,56 56,52 52,56" fill="#e85d1a" opacity={0.9} />
          <polygon points="56,98 60,56 56,60 52,56" fill="rgba(232,93,26,0.3)" />
        </g>
        <circle cx={56} cy={56} r={4} fill="#e85d1a" />
      </svg>
      {["N", "E", "S", "W"].map((d, i) => {
        const angle = (i * 90 * Math.PI) / 180 - Math.PI / 2;
        const x = 56 + 50 * Math.cos(angle);
        const y = 56 + 50 * Math.sin(angle);
        return (
          <span
            key={d}
            className="absolute font-mono text-[9px] text-mars-400 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(x / 112) * 100}%`, top: `${(y / 112) * 100}%` }}
          >
            {d}
          </span>
        );
      })}
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-[10px] text-mars-300 font-bold">
        {direction}
      </span>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  min,
  max,
  unit,
  subLabel,
  color = "text-mars-400",
  rangeColor = "from-mars-700 to-mars-400",
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  min?: number | null;
  max?: number | null;
  unit: string;
  subLabel?: string;
  color?: string;
  rangeColor?: string;
}) {
  const numValue = typeof value === "number" ? value : parseFloat(value);
  const showRange = typeof min === "number" && typeof max === "number" && max > min;

  return (
    <div className="glass-card rounded-2xl p-5 border border-mars-500/15 hover:border-mars-500/35 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-mars-500/10 border border-mars-500/20 flex items-center justify-center">
              <Icon size={14} className="text-mars-400" />
            </div>
            <span className="font-mono text-[11px] text-[var(--text-muted)] tracking-wider uppercase">
              {label}
            </span>
          </div>
          {subLabel && (
            <span className="font-mono text-[10px] text-[var(--text-muted)] bg-space-800/80 px-2 py-0.5 rounded border border-white/5">
              {subLabel}
            </span>
          )}
        </div>

        <div className={`text-3xl sm:text-4xl font-display font-bold ${color} mb-2 tracking-tight`}>
          {typeof value === "number" ? value.toFixed(1) : value}
          <span className="text-sm sm:text-base font-normal ml-1.5 text-[var(--text-muted)] font-mono">
            {unit}
          </span>
        </div>
      </div>

      <div>
        {showRange && min !== null && max !== null ? (
          <div>
            <div className="flex justify-between font-mono text-[10px] text-[var(--text-muted)] mb-1.5">
              <span>最低 {min.toFixed(1)}{unit}</span>
              <span>最高 {max.toFixed(1)}{unit}</span>
            </div>
            <div className="h-1.5 bg-space-800 rounded-full overflow-hidden relative">
              <div
                className={`h-full bg-gradient-to-r ${rangeColor} rounded-full`}
                style={{
                  marginLeft: `${Math.max(0, Math.min(70, ((numValue - min) / (max - min)) * 70))}%`,
                  width: "30%",
                }}
              />
            </div>
          </div>
        ) : (
          <div className="text-[10px] font-mono text-[var(--text-muted)] border-t border-white/5 pt-2">
            火星即時遙測回傳數據
          </div>
        )}
      </div>
    </div>
  );
}

export default function InsightStation() {
  const [activeStation, setActiveStation] = useState<StationKey>("perseverance");
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSolIndex, setSelectedSolIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/weather")
      .then((r) => r.json())
      .then((d) => {
        if (d?.stations) {
          setWeatherData(d);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const currentStationData: StationData | undefined = weatherData?.stations?.[activeStation];
  const historyList = currentStationData?.history || [];
  const selectedSol =
    selectedSolIndex !== null && historyList[selectedSolIndex]
      ? historyList[selectedSolIndex]
      : null;

  return (
    <section id="insight" className="relative py-24 bg-space-950 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/4 w-[32rem] h-[32rem] bg-mars-500/5 rounded-full blur-3xl" />
        <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-mars-700/5 rounded-full blur-3xl" />
      </div>

      <div className="section-padding relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-mars-400 animate-pulse" />
            <p className="font-mono text-xs text-mars-400 tracking-[0.3em] uppercase">
              NASA Mars Surface Meteorological Network · 火星氣象觀測網
            </p>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-4">
            火星即時氣象台
          </h2>
          <p className="text-[var(--text-secondary)] font-display text-base sm:text-lg max-w-3xl leading-relaxed">
            即時同步 NASA 毅力號（MEDA）與好奇號（REMS）現地氣象儀回傳數據，
            監控火星大氣氣溫、地表溫度、氣壓波動與日照週期，並整合洞察號歷史觀測檔案。
          </p>
        </motion.div>

        {/* Station Switcher Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {([
            {
              key: "perseverance",
              label: "毅力號 · Perseverance",
              instrument: "MEDA 氣象儀",
              location: "傑澤羅隕石坑",
              status: "active",
              color: "text-orange-400",
              border: "border-orange-500/40",
            },
            {
              key: "curiosity",
              label: "好奇號 · Curiosity",
              instrument: "REMS 氣象儀",
              location: "蓋爾隕石坑 · 夏普山",
              status: "active",
              color: "text-blue-400",
              border: "border-blue-500/40",
            },
            {
              key: "insight",
              label: "洞察號 · InSight",
              instrument: "TWINS 探測套件",
              location: "厄律西昂平原",
              status: "ended",
              color: "text-slate-400",
              border: "border-slate-500/40",
            },
          ] as const).map((st) => {
            const isActive = activeStation === st.key;
            return (
              <button
                key={st.key}
                onClick={() => {
                  setActiveStation(st.key);
                  setSelectedSolIndex(null);
                }}
                className={`flex items-center gap-3 px-5 py-3 rounded-2xl border font-mono transition-all text-left ${
                  isActive
                    ? "bg-mars-500/20 border-mars-400 text-white shadow-lg shadow-mars-500/10 scale-[1.02]"
                    : "glass-card border-white/10 hover:border-white/20 text-[var(--text-muted)] hover:text-white"
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                    st.status === "active" ? "bg-emerald-400 animate-pulse" : "bg-gray-500"
                  }`}
                />
                <div>
                  <div className="text-sm font-bold font-display flex items-center gap-1.5">
                    {st.label}
                  </div>
                  <div className="text-[10px] text-[var(--text-muted)] mt-0.5">
                    {st.instrument} · {st.location}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Station Telemetry Header Banner */}
        {!loading && currentStationData && (
          <motion.div
            key={activeStation}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-2xl p-5 border border-mars-500/20 mb-8 flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-mars-500" />
                <span className="font-mono text-xs sm:text-sm text-[var(--text-secondary)]">
                  火星日:{" "}
                  <span className="text-mars-400 font-bold">
                    Sol {selectedSol ? selectedSol.sol : currentStationData.latest.sol}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Radio size={15} className="text-mars-500" />
                <span className="font-mono text-xs sm:text-sm text-[var(--text-secondary)]">
                  地球對應日期:{" "}
                  <span className="text-mars-400 font-bold">
                    {selectedSol ? selectedSol.date : currentStationData.latest.terrestrial_date}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-mars-500" />
                <span className="font-mono text-xs sm:text-sm text-slate-300">
                  {currentStationData.location}
                </span>
              </div>
              <div className="font-mono text-xs px-2.5 py-1 rounded-full border border-mars-500/30 text-mars-300 bg-mars-500/10">
                🪐 火星季節: {currentStationData.latest.season}
                {currentStationData.latest.ls && ` · Ls ${currentStationData.latest.ls}`}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {currentStationData.status === "active" ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs text-emerald-400">
                  <Activity size={12} className="animate-pulse" />
                  即時衛星遙測連線中 · LIVE
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 font-mono text-xs text-amber-400">
                  <AlertTriangle size={12} />
                  最終觀測紀錄 · 2022-12-21
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-mars-500 border-t-transparent animate-spin" />
            <p className="font-mono text-xs text-mars-400 tracking-wider">連線 NASA JPL 氣象資料庫中...</p>
          </div>
        ) : currentStationData ? (
          <div className="space-y-8">
            {/* 4 Main Meteorological Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Atmospheric Temperature */}
              <MetricCard
                icon={Thermometer}
                label="大氣氣溫"
                value={
                  selectedSol?.min_temp !== undefined && selectedSol?.max_temp !== undefined && selectedSol.min_temp !== null && selectedSol.max_temp !== null
                    ? ((selectedSol.min_temp + selectedSol.max_temp) / 2).toFixed(1)
                    : currentStationData.latest.temperature.average
                }
                min={selectedSol?.min_temp ?? currentStationData.latest.temperature.min}
                max={selectedSol?.max_temp ?? currentStationData.latest.temperature.max}
                unit="°C"
                subLabel="大氣層感測"
                color="text-blue-400"
                rangeColor="from-blue-700 to-blue-400"
              />

              {/* Card 2: Ground Surface Temperature (GTS) */}
              <MetricCard
                icon={Sparkles}
                label="地表溫度 (GTS)"
                value={
                  selectedSol?.min_gts !== undefined && selectedSol?.max_gts !== undefined && selectedSol.min_gts !== null && selectedSol.max_gts !== null
                    ? ((selectedSol.min_gts + selectedSol.max_gts) / 2).toFixed(1)
                    : currentStationData.latest.ground_temperature
                    ? currentStationData.latest.ground_temperature.average
                    : currentStationData.latest.temperature.min + 12
                }
                min={
                  selectedSol?.min_gts ??
                  currentStationData.latest.ground_temperature?.min ??
                  currentStationData.latest.temperature.min - 5
                }
                max={
                  selectedSol?.max_gts ??
                  currentStationData.latest.ground_temperature?.max ??
                  currentStationData.latest.temperature.max + 15
                }
                unit="°C"
                subLabel="紅外地表感測儀"
                color="text-amber-400"
                rangeColor="from-amber-700 to-amber-400"
              />

              {/* Card 3: Atmospheric Pressure */}
              <MetricCard
                icon={Gauge}
                label="大氣壓強"
                value={selectedSol?.pressure ?? currentStationData.latest.pressure.average}
                min={currentStationData.latest.pressure.min ?? 720}
                max={currentStationData.latest.pressure.max ?? 790}
                unit="Pa"
                subLabel={currentStationData.latest.pressure.string || "CO2 大氣"}
                color="text-emerald-400"
                rangeColor="from-emerald-700 to-emerald-400"
              />

              {/* Card 4: UV Index or Wind Rose */}
              {activeStation === "insight" ? (
                <div className="glass-card rounded-2xl p-5 border border-mars-500/15 flex flex-col justify-between items-center">
                  <div className="w-full flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-mars-500/10 border border-mars-500/20 flex items-center justify-center">
                        <Compass size={14} className="text-mars-400" />
                      </div>
                      <span className="font-mono text-[11px] text-[var(--text-muted)] tracking-wider uppercase">
                        主要風向
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-cyan-400">
                      {currentStationData.latest.wind?.average ?? 5.2} m/s
                    </span>
                  </div>
                  <WindRose
                    direction={currentStationData.latest.wind?.most_common_direction || "SSW"}
                    degrees={currentStationData.latest.wind?.compass_degrees || 202.5}
                  />
                  <div className="font-mono text-[10px] text-[var(--text-muted)] mt-1">
                    方位角: {currentStationData.latest.wind?.compass_degrees}°
                  </div>
                </div>
              ) : (
                <div className="glass-card rounded-2xl p-5 border border-mars-500/15 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-mars-500/10 border border-mars-500/20 flex items-center justify-center">
                          <Sun size={14} className="text-orange-400" />
                        </div>
                        <span className="font-mono text-[11px] text-[var(--text-muted)] tracking-wider uppercase">
                          日照與風速
                        </span>
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400">
                        {currentStationData.latest.uv_index || "Moderate 紫外線"}
                      </span>
                    </div>

                    <div className="space-y-3 pt-1">
                      <div className="flex justify-between items-center font-mono text-xs">
                        <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                          <Wind size={12} className="text-cyan-400" /> 平均風速
                        </span>
                        <span className="text-cyan-300 font-bold">
                          {currentStationData.latest.wind?.average ?? 4.8} m/s
                          <span className="text-[10px] text-[var(--text-muted)] ml-1">
                            ({currentStationData.latest.wind?.most_common_direction ?? "NW"})
                          </span>
                        </span>
                      </div>

                      <div className="flex justify-between items-center font-mono text-xs">
                        <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                          <Sun size={12} className="text-amber-400" /> 日出時間
                        </span>
                        <span className="text-slate-200">
                          {currentStationData.latest.sunrise || "06:18"}
                        </span>
                      </div>

                      <div className="flex justify-between items-center font-mono text-xs">
                        <span className="text-[var(--text-muted)] flex items-center gap-1.5">
                          <Moon size={12} className="text-indigo-400" /> 日落時間
                        </span>
                        <span className="text-slate-200">
                          {currentStationData.latest.sunset || "17:14"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-2 flex justify-between font-mono text-[10px] text-[var(--text-muted)]">
                    <span>天候不透明度</span>
                    <span className="text-emerald-400 font-bold">
                      {currentStationData.latest.atmo_opacity || "Sunny 晴朗"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Historical Sol Trend Selector */}
            {historyList.length > 0 && (
              <div className="glass-card rounded-2xl p-6 border border-mars-500/15">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <h4 className="font-display font-bold text-lg text-white">
                      近期火星日（Sol）氣候歷史走勢
                    </h4>
                    <p className="font-mono text-xs text-[var(--text-muted)] mt-0.5">
                      點選各 Sol 切換查看該火星日之晝夜極端溫差與氣壓
                    </p>
                  </div>
                  {selectedSolIndex !== null && (
                    <button
                      onClick={() => setSelectedSolIndex(null)}
                      className="font-mono text-xs text-mars-400 hover:text-white px-3 py-1 rounded-full border border-mars-500/30 hover:border-mars-500/60 transition-all"
                    >
                      ↺ 恢復為最新 Sol
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                  {historyList.map((item, idx) => {
                    const isSelected =
                      selectedSolIndex === idx || (selectedSolIndex === null && idx === historyList.length - 1);
                    return (
                      <button
                        key={item.sol}
                        onClick={() => setSelectedSolIndex(idx)}
                        className={`p-3 rounded-xl border text-left font-mono transition-all ${
                          isSelected
                            ? "bg-mars-500/20 border-mars-400 text-white shadow-md shadow-mars-500/20 ring-1 ring-mars-400"
                            : "bg-space-900/60 border-white/5 hover:border-white/20 text-[var(--text-muted)] hover:text-white"
                        }`}
                      >
                        <div className="text-xs font-bold text-mars-400 mb-1">
                          Sol {item.sol}
                        </div>
                        <div className="text-[10px] text-[var(--text-muted)] mb-2 truncate">
                          {item.date}
                        </div>
                        <div className="text-xs font-bold text-slate-200">
                          {item.max_temp !== null && item.max_temp !== undefined
                            ? `${item.max_temp}°C`
                            : "--"}
                        </div>
                        <div className="text-[10px] text-[var(--text-muted)]">
                          {item.min_temp !== null && item.min_temp !== undefined
                            ? `${item.min_temp}°C`
                            : "--"}
                        </div>
                        {item.pressure && (
                          <div className="mt-1 pt-1 border-t border-white/5 text-[9px] text-emerald-400">
                            {item.pressure} Pa
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 text-[var(--text-muted)] font-mono text-sm">
            數據載入失敗，請確認網路連線
          </div>
        )}
      </div>
    </section>
  );
}
