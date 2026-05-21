"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion/register-gsap";

export function AnimatedStep({
  stepKey,
  children,
  className = "",
}: {
  stepKey: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    },
    { dependencies: [stepKey] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
