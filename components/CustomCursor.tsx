"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/motion/register-gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === "undefined") return;

    // Check if it's a touch device, hide cursor if so
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial position off-screen so it doesn't blink in top-left
    gsap.set(cursor, { x: -100, y: -100, xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const onMouseEnter = () => {
      gsap.to(cursor, {
        scale: 2.5,
        backgroundColor: "rgba(255, 95, 21, 0.15)",
        border: "1px solid rgba(255, 95, 21, 0.4)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "#FF5F15",
        border: "none",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    const handleInteractables = () => {
      const interactables = document.querySelectorAll(
        "a, button, input, textarea, select, [data-cursor-expand]"
      );
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
      });
    };

    handleInteractables();

    // Re-bind when DOM changes (e.g. Barba transitions)
    const observer = new MutationObserver(() => {
      handleInteractables();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      const interactables = document.querySelectorAll(
        "a, button, input, textarea, select, [data-cursor-expand]"
      );
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-4 w-4 rounded-full bg-[#FF5F15] mix-blend-difference md:block"
    />
  );
}
