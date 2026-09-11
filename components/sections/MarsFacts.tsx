"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/ui/CountUp";

const FACTS = [
  {
    value: 6779,
    unit: "km",
    label: "赤道直徑",
    sub: "地球的 53.2%",
    icon: "🪐",
    decimals: 0,
  },
  {
    value: 227.9,
    unit: "百萬 km",
    label: "距太陽距離",
    sub: "平均",
    icon: "☀️",
    decimals: 1,
  },
  {
    value: 3.72,
    unit: "m/s²",
    label: "表面重力",
    sub: "地球的 38%",
    icon: "⬇️",
    decimals: 2,
  },
  {
    value: 24.6,
    unit: "小時",
    label: "自轉週期",
    sub: "一個火星日（Sol）",
    icon: "🔄",
    decimals: 1,
  },
  {
    value: 687,
    unit: "地球日",
    label: "公轉週期",
    sub: "一個火星年",
    icon: "📅",
    decimals: 0,
  },
  {
    value: 0.0095,
    unit: "atm",
    label: "大氣壓力",
    sub: "主要成分：CO₂ 95.3%",
    icon: "💨",
    decimals: 4,
  },
  {
    value: -87,
    unit: "°C",
    label: "最低溫度",
    sub: "兩極地區冬季",
    icon: "🥶",
    decimals: 0,
    prefix: "",
  },
  {
    value: 20,
    unit: "°C",
    label: "最高溫度",
    sub: "赤道夏季白天",
    icon: "🌡️",
    decimals: 0,
    prefix: "+",
  },
  {
    value: 2,
    unit: "顆",
    label: "天然衛星",
    sub: "火衛一（Phobos）& 火衛二（Deimos）",
    icon: "🌙",
    decimals: 0,
  },
];

export default function MarsFacts() {
  return (
    <section id="facts" className="relative py-24 bg-space-950">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-mars-500/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-mars-500/3" />
      </div>

      <div className="section-padding relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs text-mars-400 tracking-[0.3em] uppercase mb-3">
            Planetary Data
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-4">
            火星數據儀表板
          </h2>
          <p className="text-[var(--text-secondary)] font-display text-lg max-w-xl mx-auto">
            關於火星的一切數字
          </p>
        </motion.div>

        {/* Facts grid */}
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FACTS.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass-card rounded-xl p-6 border border-mars-500/10 hover:border-mars-500/30 transition-all duration-300 group flex flex-col"
            >
              <dt className="flex items-start justify-between mb-3 order-1">
                <span className="text-2xl" aria-hidden="true">{fact.icon}</span>
                <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider uppercase group-hover:text-mars-400 transition-colors">
                  {fact.label}
                </span>
              </dt>

              <dd className="flex items-baseline gap-2 mb-1 order-2">
                <span className="text-3xl font-display font-bold text-white group-hover:text-mars-300 transition-colors">
                  {fact.prefix ?? ""}
                  <CountUp
                    end={fact.value}
                    decimals={fact.decimals}
                    duration={1800}
                  />
                </span>
                <span className="font-mono text-sm text-[var(--text-muted)]">{fact.unit}</span>
              </dd>

              <dd className="font-mono text-[10px] text-[var(--text-muted)] order-3">{fact.sub}</dd>
            </motion.div>
          ))}
        </dl>

        {/* Atmospheric composition bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 glass-card rounded-xl p-6 border border-mars-500/10"
        >
          <h3 className="font-mono text-xs text-[var(--text-muted)] tracking-wider uppercase mb-4">
            🌫️ 火星大氣成分
          </h3>
          <div className="flex rounded-lg overflow-hidden h-6 mb-3">
            {[
              { pct: 95.3, color: "bg-orange-700", label: "CO₂" },
              { pct: 2.6,  color: "bg-blue-700",   label: "N₂" },
              { pct: 1.9,  color: "bg-green-700",  label: "Ar" },
              { pct: 0.2,  color: "bg-purple-700", label: "其他" },
            ].map((c) => (
              <div
                key={c.label}
                className={`${c.color} flex items-center justify-center font-mono text-[9px] text-white`}
                style={{ width: `${c.pct}%` }}
              >
                {c.pct > 5 ? `${c.label} ${c.pct}%` : ""}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "CO₂", pct: "95.3%", color: "bg-orange-700" },
              { label: "氮氣 N₂", pct: "2.6%", color: "bg-blue-700" },
              { label: "氬氣 Ar", pct: "1.9%", color: "bg-green-700" },
              { label: "其他", pct: "0.2%", color: "bg-purple-700" },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--text-muted)]">
                <div className={`w-2 h-2 rounded-sm ${c.color}`} />
                {c.label}: {c.pct}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
