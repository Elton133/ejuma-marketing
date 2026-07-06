"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";

export function InitialLoader() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fallback to prevent infinite loading if JS fails
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setLoading(false);
      }
    });

    tl.fromTo(
      ".char",
      { opacity: 0 },
      { opacity: 1, duration: 0.2, stagger: 0.08, ease: "power2.inOut" }
    )
    .fromTo(
      ".orange-line",
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: "power3.inOut", transformOrigin: "left center" },
      "-=0.1"
    )
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      delay: 0.5
    });
  }, { scope: containerRef });

  if (!loading) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      <div className="flex text-[clamp(2.5rem,6vw,4rem)] font-sans font-normal tracking-tight text-white">
        <span className="char">b</span>
        <span className="char">e</span>
        <span className="char">a</span>
        <span className="char">g</span>
        <div className="relative flex">
          <span className="char">i</span>
          <span className="char">n</span>
          <span className="char">e</span>
          <span className="orange-line absolute bottom-1 left-0 h-1.5 w-full rounded-full bg-[#FF5F15] lg:bottom-2 lg:h-2" style={{ transform: "scaleX(0)" }} />
        </div>
        <span className="char">.</span>
      </div>
    </div>
  );
}
