"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "地圖", href: "#map" },
  { label: "全景", href: "#panorama" },
  { label: "氣象站", href: "#insight" },
  { label: "探測車", href: "#rovers" },
  { label: "數據", href: "#facts" },
  { label: "任務", href: "#timeline" },
  { label: "APOD", href: "#apod" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    
    // Intersection Observer for sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" } // trigger when near top
    );
    
    NAV_ITEMS.forEach((item) => {
      const id = item.href.replace("#", "");
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-space-900/90 backdrop-blur-md border-b border-mars-500/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-mars-500/20 border border-mars-500/50 flex items-center justify-center group-hover:bg-mars-500/30 transition-colors">
              <div className="w-4 h-4 rounded-full bg-mars-500/80" />
            </div>
            <span className="font-mono text-sm text-mars-400 tracking-widest uppercase">
              Mars Explorer
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`font-mono text-xs tracking-wider uppercase transition-colors ${
                    isActive
                      ? "text-mars-400 font-bold border-b border-mars-400"
                      : "text-[var(--text-secondary)] hover:text-mars-300"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href="https://api.nasa.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs px-3 py-1.5 border border-mars-500/40 text-mars-400 rounded hover:bg-mars-500/10 transition-colors"
            >
              NASA API
            </a>
          </div>

          <button
            className="md:hidden text-[var(--text-secondary)] hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 bg-space-900/95 backdrop-blur-md border-b border-mars-500/20 py-8"
          >
            <div className="flex flex-col gap-6 font-mono text-center">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={`text-2xl tracking-widest uppercase transition-colors ${
                      isActive ? "text-mars-400 font-bold" : "text-white hover:text-mars-400"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
