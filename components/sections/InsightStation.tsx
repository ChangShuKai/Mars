"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Thermometer, Wind, Gauge, Calendar, Radio, AlertTriangle, Compass } from "lucide-react";

interface InsightData {
  source: "live" | "archive";
  note?: string;
  sol: string;
  earth_date: string;
  season: string;
  northern_season: string;
  temperature: { average: number; min: number; max: number; unit: string };
  pressure: { average: number; min: number; max: number; unit: string };
  wind: {
    average: number;
    min: number;
    max: number;
    unit: string;
    most_common_direction: string;
    compass_degrees: number;
  };
}

function WindRose({ direction, degrees }: { direction: string; degrees: number }) {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const step = 360 / dirs.length;

  return (
    <div className="relative w-28 h-28 mx-auto">
      <svg viewBox="0 0 112 112" className="w-full h-full">
        {/* Rings */}
        {[44, 32, 20].map((r) => (
          <circle key={r} cx={56} cy={56} r={r} fill="none" stroke="rgba(232,93,26,0.15)" strokeWidth={1} />
        ))}
        {/* Spokes */}
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
        {/* Arrow */}
        <g transform={`rotate(${degrees}, 56, 56)`}>
          <polygon points="56,14 60,56 56,52 52,56" fill="#e85d1a" opacity={0.9} />
          <polygon points="56,98 60,56 56,60 52,56" fill="rgba(232,93,26,0.3)" />
        </g>
        {/* Center */}
        <circle cx={56} cy={56} r={4} fill="#e85d1a" />
      </svg>
      {/* Dir labels */}
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

function DataCard({
  icon: Icon,
  label,
  value,
  min,
  max,
  unit,
  color = "text-mars-400",
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  color?: string;
}) {
  return (
    <div className="glass-card rounded-xl p-5 border border-mars-500/10 hover:border-mars-500/30 transition-colors">
      <div className="flex items-center gap-2 mb-3">
        <Icon size={14} className="text-mars-500" />
        <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider uppercase">
          {label}
        </span>
      </div>
      <div className={`text-3xl font-display font-bold ${color} mb-2`}>
        {value.toFixed(1)}
        <span className="text-sm font-normal ml-1 text-[var(--text-muted)]">{unit}</span>
      </div>
      <div className="flex justify-between font-mono text-[10px] text-[var(--text-muted)]">
        <span>↓ {min.toFixed(1)}</span>
        <span>↑ {max.toFixed(1)}</span>
      </div>
      {/* Range bar */}
      <div className="mt-2 h-1 bg-space-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-mars-700 to-mars-400 rounded-full"
          style={{
            marginLeft: `${((value - min) / (max - min)) * 70}%`,
            width: "30%",
          }}
        />
      </div>
    </div>
  );
}

export default function InsightStation() {
  const [data, setData] = useState<InsightData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/insight")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="insight" className="relative py-24 bg-space-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-mars-500/5 rounded-full blur-3xl" />
        <div className="absolute left-0 bottom-1/4 w-64 h-64 bg-mars-700/5 rounded-full blur-3xl" />
      </div>

      <div className="section-padding relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-mono text-xs text-mars-400 tracking-[0.3em] uppercase mb-3">
            InSight Lander · 洞察號
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-4">
            最終傳輸數據
          </h2>

          {/* Mission ended badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 font-mono text-xs text-amber-400 mb-4">
            <AlertTriangle size={11} />
            FINAL TRANSMISSION — 任務結束於 2022年12月21日
          </div>

          <p className="text-[var(--text-secondary)] font-display text-lg max-w-2xl">
            洞察號（InSight）在火星表面運行 1,425 Sol，記錄了珍貴的火星天氣與地震數據。
            以下為任務結束前最後記錄的氣象數據。
          </p>
        </motion.div>

        {/* Sol info */}
        {!loading && data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-8 flex-wrap"
          >
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-mars-500" />
              <span className="font-mono text-sm text-[var(--text-secondary)]">
                Sol <span className="text-mars-400">{data.sol}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Radio size={14} className="text-mars-500" />
              <span className="font-mono text-sm text-[var(--text-secondary)]">
                Earth Date: <span className="text-mars-400">{data.earth_date}</span>
              </span>
            </div>
            <div className="font-mono text-xs px-2 py-1 rounded border border-mars-500/20 text-mars-400">
              🌒 {data.northern_season}
            </div>
          </motion.div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 rounded-full border-2 border-mars-500 border-t-transparent animate-spin" />
          </div>
        ) : data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <DataCard
                icon={Thermometer}
                label="大氣溫度"
                value={data.temperature.average}
                min={data.temperature.min}
                max={data.temperature.max}
                unit={data.temperature.unit}
                color="text-blue-400"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <DataCard
                icon={Gauge}
                label="大氣壓力"
                value={data.pressure.average}
                min={data.pressure.min}
                max={data.pressure.max}
                unit={data.pressure.unit}
                color="text-green-400"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <DataCard
                icon={Wind}
                label="風速"
                value={data.wind.average}
                min={data.wind.min}
                max={data.wind.max}
                unit={data.wind.unit}
                color="text-cyan-400"
              />
            </motion.div>

            {/* Wind rose */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-xl p-5 border border-mars-500/10 flex flex-col items-center"
            >
              <div className="flex items-center gap-2 mb-3 self-start">
                <Compass size={14} className="text-mars-500" />
                <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider uppercase">
                  主要風向
                </span>
              </div>
              <WindRose
                direction={data.wind.most_common_direction}
                degrees={data.wind.compass_degrees}
              />
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-20 text-[var(--text-muted)] font-mono text-sm">
            數據載入失敗
          </div>
        )}
      </div>
    </section>
  );
}
