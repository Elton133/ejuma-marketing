"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { HERO_IMAGES, HERO_PANELS } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion/register-gsap";

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    if (isDesktop) {
      const panels = Array.from(
        root.querySelectorAll<HTMLElement>("[data-hero-panel]"),
      );
      
      if (prefersReducedMotion()) {
        gsap.set(panels, { opacity: 1, scale: 1 });
        return;
      }
      
      gsap.to(panels, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        stagger: 0.1,
        ease: "expo.out",
        delay: 0.15,
      });

      const timers: gsap.core.Tween[] = [];
      panels.forEach((panel, i) => {
        const slides = Array.from(panel.querySelectorAll<HTMLElement>("[data-panel-slide]"));
        if (slides.length < 2) return;

        let index = 0;
        const fade = 2.0; // Slow, luxurious crossfade
        const hold = 4.0; // Hold time
        
        const advance = () => {
          const nextIndex = (index + 1) % slides.length;
          const current = slides[index];
          const next = slides[nextIndex];

          gsap
            .timeline({
              onComplete: () => {
                index = nextIndex;
                timers[i] = gsap.delayedCall(hold, advance);
              },
            })
            .set(next, { zIndex: 1 })
            .to(current, { opacity: 0, duration: fade, ease: "power2.inOut" })
            .to(next, { opacity: 1, duration: fade, ease: "power2.inOut", scale: 1.05 }, "<")
            .set(current, { zIndex: 0, scale: 1 });
        };

        // Offset the start time based on panel index to create organic timing
        timers[i] = gsap.delayedCall(hold + (i * 1.2), advance);
      });

      return () => {
        timers.forEach(t => t?.kill());
        gsap.killTweensOf("[data-panel-slide]");
      };
    }

    // Mobile: carousel with faster hold
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
    const fade = 1.2;
    const hold = 2.5;
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
    <div ref={containerRef} className="absolute inset-[-15%] h-[130%]" aria-hidden data-hero-parallax>
      {/* Desktop: 5 vertical occupation panels */}
      <div className="absolute inset-0 hidden lg:flex">
        {HERO_PANELS.map((panel, i) => {
          const panelImages = [
            panel.image,
            HERO_IMAGES[(i) % HERO_IMAGES.length],
            HERO_IMAGES[(i + 1) % HERO_IMAGES.length],
          ];

          return (
            <div
              key={panel.trade}
              data-hero-panel
              className="relative flex-1 overflow-hidden"
              style={{
                opacity: 0,
                scale: "1.06",
                borderRight:
                  i < HERO_PANELS.length - 1
                    ? "1px solid rgba(255,255,255,0.07)"
                    : undefined,
              }}
            >
              {panelImages.map((src, index) => (
                <div
                  key={src + index}
                  data-panel-slide
                  className="absolute inset-0"
                  style={{ opacity: index === 0 ? 1 : 0, zIndex: index === 0 ? 1 : 0 }}
                >
                  <Image
                    src={src}
                    alt={index === 0 ? panel.trade : ""}
                    fill
                    priority={i < 3 && index === 0}
                    className="object-cover"
                    style={{ objectPosition: index === 0 ? panel.objectPosition : "center center" }}
                    sizes="20vw"
                  />
                </div>
              ))}
            </div>
          );
        })}
        <div className="hero-image-overlay pointer-events-none absolute inset-0 z-2" />
        <div className="hero-grain pointer-events-none absolute inset-0 z-2" />
      </div>

      {/* Mobile: single image carousel */}
      <div className="absolute inset-0 lg:hidden">
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
        <div className="hero-image-overlay pointer-events-none absolute inset-0 z-2" />
        <div className="hero-grain pointer-events-none absolute inset-0 z-2" />
      </div>
    </div>
  );
}
