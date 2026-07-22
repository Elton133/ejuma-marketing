"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { HERO_IMAGES } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion/register-gsap";

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    const img = imageRef.current;
    if (!root || !img || prefersReducedMotion()) return;

    // Cinematic slow zoom effect
    gsap.fromTo(
      img,
      { scale: 1.15, filter: "brightness(0.7) blur(4px)" },
      {
        scale: 1,
        filter: "brightness(1) blur(0px)",
        duration: 3.5,
        ease: "power2.out",
      }
    );

    // Continuous slow pan/breathe effect after initial reveal
    gsap.to(img, {
      scale: 1.05,
      duration: 20,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 3.5,
    });

  }, []);

  return (
    <div ref={containerRef} className="absolute inset-[-10%] h-[120%]" aria-hidden data-hero-parallax>
      <div className="absolute inset-0">
        <Image
          ref={imageRef}
          src={HERO_IMAGES[4]} // Using the primary image
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="hero-image-overlay pointer-events-none absolute inset-0 z-10" />
        <div className="hero-grain pointer-events-none absolute inset-0 z-10 opacity-40" />
      </div>
    </div>
  );
}
