"use client";

import { useEffect, useId, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, registerGsap } from "@/lib/motion/register-gsap";
import { LOGO_GLYPHS, LOGO_VIEWBOX } from "@/lib/logo-paths";

// viewBox = "minX minY width height"
const [VB_X, VB_Y, VB_W, VB_H] = LOGO_VIEWBOX.split(" ").map(Number);

export function Loader() {
  const [hidden, setHidden] = useState(false);
  const clipId = useId().replace(/:/g, "");
  const overlayRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<SVGRectElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    registerGsap();
    document.body.style.overflow = "hidden";

    const wipe = wipeRef.current;
    const underline = underlineRef.current;

    const finish = () => {
      document.body.style.overflow = "";
      setHidden(true);
      setTimeout(() => ScrollTrigger.refresh(), 100);
    };

    if (prefersReducedMotion()) {
      if (wipe) gsap.set(wipe, { attr: { width: VB_W } });
      if (underline) gsap.set(underline, { drawSVG: "100%" });
      const raf = requestAnimationFrame(finish);
      return () => cancelAnimationFrame(raf);
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          delay: 0.45,
          onComplete: finish,
        });
      },
    });

    // Start with the word fully hidden and the underline undrawn
    tl.set(wipe, { attr: { width: 0 } });
    if (underline) tl.set(underline, { drawSVG: "0%" }, 0);

    // 1. "Write" the solid, filled wordmark left → right (fill reveal, no outline)
    tl.to(wipe, {
      attr: { width: VB_W },
      duration: 1.6,
      ease: "power1.inOut",
    });

    // 2. Sweep the brand underline once the word lands
    if (underline) {
      tl.to(
        underline,
        {
          drawSVG: "100%",
          duration: 0.7,
          ease: "power2.inOut",
        },
        "-=0.3",
      );
    }

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={overlayRef}
      role="presentation"
      className="fixed inset-0 z-10000 flex items-center justify-center bg-black"
    >
      <div className="flex w-[70vw] max-w-[1100px] flex-col items-center">
        <svg
          viewBox={LOGO_VIEWBOX}
          className="w-full overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Left → right reveal window that grows to "write" the fill */}
            <clipPath id={clipId}>
              <rect ref={wipeRef} x={VB_X} y={VB_Y} width={0} height={VB_H} />
            </clipPath>
          </defs>

          {/* Solid filled wordmark, revealed through the wipe */}
          <g fill="#ffffff" clipPath={`url(#${clipId})`}>
            {LOGO_GLYPHS.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>

          {/* Brand underline swoosh */}
          <path
            ref={underlineRef}
            d="M 0 16 Q 138 4 276 16"
            fill="none"
            stroke="#FF5F15"
            strokeWidth={6}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}
