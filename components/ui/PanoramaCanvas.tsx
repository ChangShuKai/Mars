"use client";

import { useEffect, useRef, useState } from "react";

// NASA/JPL Mars Curiosity First Color Panorama — Public Domain (via Wikimedia)
const PANORAMA_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/NASA_Mars_Rover_Curiosity_-_First_Color_Panorama_-_pia15687.jpg/6000px-NASA_Mars_Rover_Curiosity_-_First_Color_Panorama_-_pia15687.jpg";

export default function PanoramaCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const state = useRef({
    x: 0,
    dragging: false,
    startX: 0,
    startOffsetX: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    const getMinX = () => -(img.offsetWidth - container.offsetWidth);

    const clamp = (val: number) => Math.max(getMinX(), Math.min(0, val));

    const applyX = (x: number) => {
      state.current.x = clamp(x);
      img.style.transform = `translateX(${state.current.x}px)`;
    };

    // Mouse
    const onMouseDown = (e: MouseEvent) => {
      state.current.dragging = true;
      state.current.startX = e.clientX;
      state.current.startOffsetX = state.current.x;
      container.style.cursor = "grabbing";
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!state.current.dragging) return;
      applyX(state.current.startOffsetX + (e.clientX - state.current.startX));
    };
    const onMouseUp = () => {
      state.current.dragging = false;
      container.style.cursor = "grab";
    };

    // Touch
    const onTouchStart = (e: TouchEvent) => {
      state.current.dragging = true;
      state.current.startX = e.touches[0].clientX;
      state.current.startOffsetX = state.current.x;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!state.current.dragging) return;
      applyX(state.current.startOffsetX + (e.touches[0].clientX - state.current.startX));
    };
    const onTouchEnd = () => { state.current.dragging = false; };

    // Centering after load
    img.onload = () => {
      setLoaded(true);
      // Start centered on the most visually interesting part
      applyX(-(img.offsetWidth / 2 - container.offsetWidth / 2));
    };
    img.onerror = () => setError(true);

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onTouchEnd);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-space-950 select-none"
      style={{ cursor: "grab" }}
    >
      {/* Loading */}
      {!loaded && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
          <div className="w-10 h-10 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
          <p className="text-orange-400 font-mono text-xs tracking-widest">載入全景圖...</p>
        </div>
      )}
      {/* Error */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <p className="text-[var(--text-muted)] font-mono text-sm">無法載入全景圖像</p>
        </div>
      )}
      {/* Panorama image — CSS drag, no canvas, no CORS */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={PANORAMA_URL}
        alt="Mars Curiosity First Colour Panorama"
        className="absolute top-0 left-0 h-full w-auto max-w-none"
        style={{
          display: loaded ? "block" : "none",
          willChange: "transform",
          userSelect: "none",
          pointerEvents: "none",
        }}
        draggable={false}
      />
    </div>
  );
}
