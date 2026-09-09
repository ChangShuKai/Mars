"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export default function CountUp({
  end,
  duration = 2000,
  decimals = 0,
  suffix = "",
  prefix = "",
}: CountUpProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const startValue = 0;

    let frameId: number;
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(startValue + (end - startValue) * eased);
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [inView, end, duration]);

  const formatted =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString();

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {prefix}
        {formatted}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {decimals > 0 ? end.toFixed(decimals) : Math.round(end).toLocaleString()}
        {suffix}
      </span>
    </span>
  );
}
