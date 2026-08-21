"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TRADES } from "@/lib/constants";
import { prefersReducedMotion, registerGsap } from "@/lib/motion/register-gsap";

export function RotatingTrade() {
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    registerGsap();
    if (!wordRef.current || prefersReducedMotion()) return;
    const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.7 });
    TRADES.slice(1).forEach((trade) => {
      timeline
        .to(wordRef.current, { text: "", duration: 0.35, ease: "none", delay: 1.25 })
        .to(wordRef.current, { text: trade, duration: Math.max(0.45, trade.length * 0.07), ease: "none" });
    });
    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <span
      ref={wordRef}
      className="inline-block border-r-[.08em] border-[#FF5F15] pr-[.06em] text-[#FF5F15]"
    >
      {TRADES[0]}
    </span>
  );
}
