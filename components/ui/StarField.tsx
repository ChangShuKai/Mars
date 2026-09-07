"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const STAR_COUNT = 800;
    const stars: Star[] = [];
    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init stars at random positions in 3D space
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * W - W / 2,
        y: Math.random() * H - H / 2,
        z: Math.random() * W,
        px: 0,
        py: 0,
      });
    }

    let speed = 1;

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 8, 0.3)";
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = "white";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";

      for (const star of stars) {
        star.px = star.x / (star.z / W) + W / 2;
        star.py = star.y / (star.z / W) + H / 2;

        const size = (1 - star.z / W) * 3;
        const opacity = (1 - star.z / W) * 0.9;

        // Streak trail
        const trailX = star.x / ((star.z + speed) / W) + W / 2;
        const trailY = star.y / ((star.z + speed) / W) + H / 2;

        ctx.globalAlpha = opacity * 0.3;
        ctx.lineWidth = size * 0.5;
        ctx.beginPath();
        ctx.moveTo(trailX, trailY);
        ctx.lineTo(star.px, star.py);
        ctx.stroke();

        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(star.px, star.py, size, 0, Math.PI * 2);
        ctx.fill();

        // Add color tint to some stars
        if (Math.random() < 0.002) {
          ctx.globalAlpha = opacity * 0.5;
          ctx.fillStyle = "#ff9966";
          ctx.beginPath();
          ctx.arc(star.px, star.py, size * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "white";
        }

        // Move star
        star.z -= speed;
        if (
          star.z <= 0 ||
          star.px < 0 || star.px > W ||
          star.py < 0 || star.py > H
        ) {
          star.x = Math.random() * W - W / 2;
          star.y = Math.random() * H - H / 2;
          star.z = W;
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    // Slow warp speed
    const slowDown = setTimeout(() => { speed = 1; }, 3000);
    speed = 4; // Initial warp
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
      clearTimeout(slowDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "#050508" }}
    />
  );
}
