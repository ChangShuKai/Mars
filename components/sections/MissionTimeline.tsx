"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Clock, Rocket } from "lucide-react";

const MISSIONS = [
  {
    year: 1976,
    name: "Viking 1 & 2",
    agency: "NASA",
    status: "success",
    type: "lander",
    desc: "人類首次成功在火星表面著陸，傳回第一批彩色照片，進行生命探測實驗。",
  },
  {
    year: 1997,
    name: "Mars Pathfinder & Sojourner",
    agency: "NASA",
    status: "success",
    type: "rover",
    desc: "首輛火星探測車 Sojourner，開創了氣囊著陸系統，共傳回 550 張圖像。",
  },
  {
    year: 2004,
    name: "Spirit & Opportunity",
    agency: "NASA",
    status: "success",
    type: "rover",
    desc: "雙胞胎探測車。Spirit 運行至 2011，Opportunity 持續 15 年，行驶 45.16 公里。",
  },
  {
    year: 2006,
    name: "Mars Reconnaissance Orbiter",
    agency: "NASA",
    status: "success",
    type: "orbiter",
    desc: "至今仍在運行的火星軌道衛星，提供高解析度地表影像，已傳回超過 400TB 數據。",
  },
  {
    year: 2012,
    name: "Curiosity",
    agency: "NASA",
    status: "active",
    type: "rover",
    desc: "至今仍在運行中。已行駛超過 30 km，確認蓋爾隕石坑古代曾有宜居環境。",
    highlight: true,
  },
  {
    year: 2014,
    name: "MAVEN",
    agency: "NASA",
    status: "active",
    type: "orbiter",
    desc: "研究火星大氣層如何被太陽風侵蝕，解釋了火星水源消失之謎。",
  },
  {
    year: 2016,
    name: "ExoMars TGO",
    agency: "ESA/Roscosmos",
    status: "active",
    type: "orbiter",
    desc: "歐洲-俄羅斯聯合任務，Trace Gas Orbiter 偵測到甲烷等微量氣體。",
  },
  {
    year: 2018,
    name: "InSight",
    agency: "NASA",
    status: "ended",
    type: "lander",
    desc: "首次在火星進行地震學研究，記錄超過 1,300 次火星地震。2022年12月任務結束。",
  },
  {
    year: 2021,
    name: "Perseverance & Ingenuity",
    agency: "NASA",
    status: "active",
    type: "rover",
    desc: "耶澤羅隕石坑。Ingenuity 直升機首次實現外星動力飛行，Perseverance 採集岩心樣本。",
    highlight: true,
  },
  {
    year: 2021,
    name: "天問一號",
    agency: "CNSA",
    status: "active",
    type: "rover",
    desc: "中國首次火星任務，祝融號探測車在烏托邦平原著陸，探索古海洋遺跡。",
  },
];

const STATUS_CONFIG = {
  success: { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-400/10 border-green-400/30", label: "成功完成" },
  active:  { icon: Clock,         color: "text-mars-400",  bg: "bg-mars-400/10 border-mars-400/30",  label: "運行中" },
  ended:   { icon: XCircle,       color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/30", label: "任務結束" },
  failed:  { icon: XCircle,       color: "text-red-400",   bg: "bg-red-400/10 border-red-400/30",    label: "失敗" },
};

const TYPE_LABEL: Record<string, string> = {
  rover: "🚗 探測車",
  lander: "🛬 著陸器",
  orbiter: "🛸 軌道器",
};

export default function MissionTimeline() {
  return (
    <section id="timeline" className="relative py-24 bg-space-900/50 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-mars-500/20 to-transparent" style={{ left: "calc(50% - 1px)" }} />
      </div>

      <div className="section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs text-mars-400 tracking-[0.3em] uppercase mb-3">Mission History</p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-4">
            火星任務時間軸
          </h2>
          <p className="text-[var(--text-secondary)] font-display text-lg max-w-xl mx-auto">
            人類探索火星的歷史足跡
          </p>
        </motion.div>

        <ol className="relative max-w-4xl mx-auto list-none p-0">
          {MISSIONS.map((mission, i) => {
            const cfg = STATUS_CONFIG[mission.status as keyof typeof STATUS_CONFIG];
            const Icon = cfg.icon;
            const isLeft = i % 2 === 0;

            return (
              <motion.li
                key={`${mission.year}-${mission.name}`}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`flex items-start gap-4 mb-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Card */}
                <div
                  className={`flex-1 glass-card rounded-xl p-5 border transition-all duration-300 hover:border-mars-500/30 ${
                    mission.highlight ? "border-mars-500/30 bg-mars-500/5" : "border-white/5"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-lg font-bold text-white">{mission.name}</span>
                        {mission.highlight && (
                          <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-mars-500/20 text-mars-300 border border-mars-500/30">
                            ★ 旗艦任務
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="font-mono text-xs text-[var(--text-muted)]">{mission.agency}</span>
                        <span className="font-mono text-[10px] text-[var(--text-muted)]">·</span>
                        <span className="font-mono text-[10px] text-[var(--text-muted)]">{TYPE_LABEL[mission.type]}</span>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full border text-[10px] font-mono ${cfg.bg} ${cfg.color}`}>
                      <Icon size={10} />
                      {cfg.label}
                    </div>
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm font-display leading-relaxed">
                    {mission.desc}
                  </p>
                </div>

                {/* Year + Center node */}
                <div className="flex flex-col items-center shrink-0 relative">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 ${
                    mission.status === "active"
                      ? "border-mars-500 bg-mars-500/20"
                      : "border-[var(--text-muted)] bg-space-800"
                  }`}>
                    <Rocket size={14} className={mission.status === "active" ? "text-mars-400" : "text-[var(--text-muted)]"} />
                  </div>
                  <time className="font-mono text-xs text-mars-400 mt-1 font-bold">{mission.year}</time>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
