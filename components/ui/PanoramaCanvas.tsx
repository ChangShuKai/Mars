"use client";

import { useEffect, useRef, useState } from "react";

// NASA/JPL Mars Curiosity First Color Panorama — Public Domain
const PANORAMA_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/NASA_Mars_Rover_Curiosity_-_First_Color_Panorama_-_pia15687.jpg/6000px-NASA_Mars_Rover_Curiosity_-_First_Color_Panorama_-_pia15687.jpg";

export default function PanoramaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const stateRef = useRef({
    offsetX: 0,
    fov: 0.5, // viewport width ratio (0.3 = zoomed in, 1 = full width)
    dragging: false,
    lastX: 0,
  });
  const animRef = useRef<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    const img = new Image();
    img.crossOrigin = "anonymous";
    imgRef.current = img;

    const draw = () => {
      if (!imgRef.current || !imgRef.current.complete) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }
      const s = stateRef.current;
      const iW = imgRef.current.naturalWidth;
      const iH = imgRef.current.naturalHeight;

      // Viewport width in source pixels
      const srcW = iW * s.fov;
      const srcH = (srcW / W) * H;
      // Clamp srcH to image height
      const clampedSrcH = Math.min(srcH, iH);
      const srcY = (iH - clampedSrcH) / 2;

      // Wrap offsetX
      s.offsetX = ((s.offsetX % iW) + iW) % iW;
      const srcX = s.offsetX * (1 - s.fov);

      ctx.clearRect(0, 0, W, H);

      // Draw panorama — handle wrap-around at seam
      const remaining = iW - srcX;
      if (remaining >= srcW) {
        ctx.drawImage(imgRef.current, srcX, srcY, srcW, clampedSrcH, 0, 0, W, H);
      } else {
        const ratio = remaining / srcW;
        ctx.drawImage(imgRef.current, srcX, srcY, remaining, clampedSrcH, 0, 0, W * ratio, H);
        ctx.drawImage(imgRef.current, 0, srcY, srcW - remaining, clampedSrcH, W * ratio, 0, W * (1 - ratio), H);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    img.onload = () => {
      setLoading(false);
      draw();
    };
    img.onerror = () => {
      setError(true);
      setLoading(false);
    };
    img.src = PANORAMA_URL;

    // Mouse events
    const onMouseDown = (e: MouseEvent) => {
      stateRef.current.dragging = true;
      stateRef.current.lastX = e.clientX;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!stateRef.current.dragging) return;
      const dx = e.clientX - stateRef.current.lastX;
      stateRef.current.lastX = e.clientX;
      stateRef.current.offsetX -= dx * stateRef.current.fov * 2;
    };
    const onMouseUp = () => { stateRef.current.dragging = false; };

    // Touch events
    const onTouchStart = (e: TouchEvent) => {
      stateRef.current.dragging = true;
      stateRef.current.lastX = e.touches[0].clientX;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!stateRef.current.dragging) return;
      const dx = e.touches[0].clientX - stateRef.current.lastX;
      stateRef.current.lastX = e.touches[0].clientX;
      stateRef.current.offsetX -= dx * stateRef.current.fov * 2;
    };
    const onTouchEnd = () => { stateRef.current.dragging = false; };

    // Wheel zoom
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const s = stateRef.current;
      s.fov = Math.max(0.2, Math.min(1, s.fov + e.deltaY * 0.0005));
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div className="w-full h-full relative bg-space-950">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
          <div className="w-10 h-10 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
          <p className="text-orange-400 font-mono text-xs">載入全景圖...</p>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <p className="text-[var(--text-muted)] font-mono text-sm">無法載入全景圖像</p>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ display: loading || error ? "none" : "block" }}
      />
    </div>
  );
}
