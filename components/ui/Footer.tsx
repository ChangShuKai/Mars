"use client";

import { Rocket, Github, ExternalLink } from "lucide-react";

const LINKS = [
  { label: "NASA API Portal", href: "https://api.nasa.gov" },
  { label: "Mars Rover Photos", href: "https://api.nasa.gov/#mars-rover-photos" },
  { label: "InSight Mission", href: "https://mars.nasa.gov/insight/" },
  { label: "Perseverance Rover", href: "https://mars.nasa.gov/mars2020/" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-mars-500/10 bg-space-950 py-12">
      <div className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-mars-500/20 border border-mars-500/50 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-mars-500/80" />
              </div>
              <span className="font-mono text-sm text-mars-400 tracking-widest uppercase">
                Mars Explorer
              </span>
            </div>
            <p className="text-[var(--text-muted)] font-display text-sm leading-relaxed max-w-xs">
              基於 NASA 公開 API 構建的火星探索平台。所有數據均來自真實科學任務。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-mono text-xs text-[var(--text-muted)] tracking-wider uppercase mb-3">
              數據來源
            </h4>
            <ul className="space-y-2">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-secondary)] hover:text-mars-400 transition-colors"
                  >
                    <ExternalLink size={10} />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech */}
          <div>
            <h4 className="font-mono text-xs text-[var(--text-muted)] tracking-wider uppercase mb-3">
              技術棧
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Next.js 15", "React 18", "Three.js", "Tailwind CSS", "Framer Motion", "Vercel"].map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] px-2 py-1 rounded border border-white/10 text-[var(--text-muted)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-mars-500/10 pt-6 flex items-center justify-between flex-wrap gap-4">
          <p className="font-mono text-[10px] text-[var(--text-muted)]">
            Image credits: NASA/JPL-Caltech/MSSS/ASU — Public Domain
          </p>
          <p className="font-mono text-[10px] text-[var(--text-muted)]">
            Not affiliated with NASA. For educational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
