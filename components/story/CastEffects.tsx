"use client";

import { gsap } from "gsap";
import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "@/lib/motion/register-gsap";
import { idleCast, nod, wave } from "./motion";

/** Characters in `scope` blink and bob while it's on screen. */
export function IdleCast({ scope }: { scope: RefObject<HTMLElement | null> }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => idleCast(scope.current), scope);
    return () => ctx.revert();
  }, [scope]);
  return null;
}

/** The character in `scope` jumps and waves (end of a flow), then idles. */
export function Celebrate({ scope }: { scope: RefObject<HTMLElement | null> }) {
  useEffect(() => {
    if (prefersReducedMotion() || !scope.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });
      tl.fromTo(scope.current, { y: 0 }, { y: -18, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 3 });
      nod(tl, scope.current, 0);
      wave(tl, scope.current, 0.1, 4);
      idleCast(scope.current);
    }, scope);
    return () => ctx.revert();
  }, [scope]);
  return null;
}
