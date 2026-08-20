"use client";

import { useEffect, useState } from "react";
import { TRADES } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion/register-gsap";

export function RotatingTrade() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const interval = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((current) => (current + 1) % TRADES.length);
        setVisible(true);
      }, 280);
    }, 2400);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <span
      aria-live="polite"
      className={`inline-block min-w-[9ch] text-[#FF5F15] transition-all duration-300 motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
      }`}
    >
      {TRADES[index]}
    </span>
  );
}
