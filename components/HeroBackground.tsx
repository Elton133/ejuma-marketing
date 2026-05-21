"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { HERO_IMAGES } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion/register-gsap";

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const slides = Array.from(
      root.querySelectorAll<HTMLElement>("[data-hero-slide]"),
    );
    if (slides.length < 2) return;

    if (prefersReducedMotion()) {
      gsap.set(slides, { opacity: 0, zIndex: 0 });
      gsap.set(slides[0], { opacity: 1, zIndex: 1 });
      return;
    }

    gsap.set(slides, { opacity: 0, zIndex: 0 });
    gsap.set(slides[0], { opacity: 1, zIndex: 1 });

    let index = 0;
    const fade = 1.4;
    const hold = 4.5;
    let timer: gsap.core.Tween | null = null;

    const advance = () => {
      const nextIndex = (index + 1) % slides.length;
      const current = slides[index];
      const next = slides[nextIndex];

      gsap
        .timeline({
          onComplete: () => {
            index = nextIndex;
            timer = gsap.delayedCall(hold, advance);
          },
        })
        .set(next, { zIndex: 1 })
        .to(current, { opacity: 0, duration: fade, ease: "power2.inOut" })
        .to(next, { opacity: 1, duration: fade, ease: "power2.inOut" }, "<")
        .set(current, { zIndex: 0 });
    };

    timer = gsap.delayedCall(hold, advance);

    return () => {
      timer?.kill();
      gsap.killTweensOf(slides);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden>
      {HERO_IMAGES.map((src, index) => (
        <div
          key={src}
          data-hero-slide
          className="absolute inset-0"
          style={{ opacity: index === 0 ? 1 : 0, zIndex: index === 0 ? 1 : 0 }}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={index < 2}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}
      <div className="hero-image-overlay pointer-events-none absolute inset-0 z-[2]" />
      <div className="hero-grain pointer-events-none absolute inset-0 z-[2]" />
    </div>
  );
}
