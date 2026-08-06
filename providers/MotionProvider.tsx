"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { prefersReducedMotion, registerGsap } from "@/lib/motion/register-gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstRoute = useRef(true);

  useEffect(() => {
    registerGsap();
  }, []);

  // ScrollSmoother Smooth Scroll
  useEffect(() => {
    if (prefersReducedMotion() || pathname === "/") return;
    
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      smoothTouch: 0.1, // gentle smoothing on touch devices (fixes jumpy mobile)
      effects: true, // enables data-speed (parallax) and data-lag on elements
      normalizeScroll: true,
    });

    return () => {
      smoother.kill();
    };
  }, [pathname]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion()) return;

    if (isFirstRoute.current) {
      isFirstRoute.current = false;
      return;
    }

    gsap.fromTo(
      container,
      { autoAlpha: 0, y: 14 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
        clearProps: "transform",
      },
    );
  }, [pathname]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-split-text-hero]").forEach((el) => {
        if (pathname === "/") {
          gsap.fromTo(
            el,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              delay: 0.1,
              clearProps: "transform,opacity",
            },
          );
          return;
        }

        const split = new SplitText(el, { type: "words,chars" });
        gsap.from(split.chars, {
          y: 36,
          opacity: 0,
          filter: "blur(8px)",
          duration: 1.1,
          stagger: 0.03,
          ease: "power3.out",
          delay: 0.15,
        });
      });

      const revealFilter = pathname === "/" ? "none" : "blur(8px)";
      gsap.set("[data-hero-animate]", { y: 36, opacity: 0, filter: revealFilter });
      gsap.to("[data-hero-animate]", {
        y: 0,
        opacity: 1,
        filter: "none",
        duration: 1.1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.5, // Slightly delayed so text starts first
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.set(el, { y: 44, opacity: 0, filter: revealFilter });
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          filter: "none",
          duration: 0.85,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((container) => {
        const children = container.querySelectorAll("[data-reveal-item]");
        if (!children.length) return;
        gsap.set(children, { y: 44, opacity: 0, filter: revealFilter });
        gsap.to(children, {
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          filter: "none",
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-slide-right]").forEach((el) => {
        const targetOpacity = (gsap.getProperty(el, "opacity") as number) || 1;
        gsap.set(el, { x: 60, opacity: 0 });
        gsap.to(el, {
          x: 0,
          opacity: targetOpacity,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-typewriter]").forEach((el) => {
        const text = el.textContent || "";
        gsap.set(el, { text: "" });
        gsap.to(el, {
          text: text,
          duration: text.length * 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-slide-left]").forEach((el) => {
        const targetOpacity = (gsap.getProperty(el, "opacity") as number) || 1;
        gsap.set(el, { x: -60, opacity: 0 });
        gsap.to(el, {
          x: 0,
          opacity: targetOpacity,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });

      // Card grid: children pop up + scale in with a springy stagger
      gsap.utils.toArray<HTMLElement>("[data-stagger-cards]").forEach((container) => {
        const cards = Array.from(container.children) as HTMLElement[];
        if (!cards.length) return;
        gsap.from(cards, {
          y: 50,
          opacity: 0,
          scale: 0.94,
          filter: "blur(6px)",
          duration: 0.8,
          stagger: 0.12,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-image-expand]").forEach((el) => {
        const img = el.querySelector("img");
        if (!img) return;

        gsap.set(el, { clipPath: "inset(15% 15% 15% 15% round 32px)" });
        gsap.set(img, { scale: 1.25 });

        gsap.to(el, {
          clipPath: "inset(0% 0% 0% 0% round 24px)",
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
        
        gsap.to(img, {
          scale: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-hero-parallax]").forEach((el) => {
        gsap.to(el, {
          y: "30%",
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Stacked Sections Pinning
      gsap.utils.toArray<HTMLElement>("[data-stacked-section]").forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          pin: true,
          pinSpacing: false,
        });
      });

    }, containerRef);

    // Line-by-line reveal: each line rises up from behind a mask, staggered.
    // autoSplit + onSplit re-splits correctly on font load / resize.
    const splits: SplitText[] = [];
    gsap.utils.toArray<HTMLElement>("[data-split-lines]").forEach((el) => {
      const split = new SplitText(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        linesClass: "split-line",
        onSplit: (self: SplitText) =>
          gsap.from(self.lines, {
            yPercent: 115,
            duration: 0.9,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }),
      });
      splits.push(split);
    });

    // Word-cascade reveal: words fade + rise + de-blur individually (a different
    // split style from the line-mask rise used elsewhere).
    gsap.utils.toArray<HTMLElement>("[data-split-words]").forEach((el) => {
      const split = new SplitText(el, {
        type: "words",
        wordsClass: "split-word",
        autoSplit: true,
        onSplit: (self: SplitText) =>
          gsap.from(self.words, {
            y: 28,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.7,
            stagger: 0.035,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }),
      });
      splits.push(split);
    });

    // Word rise-from-mask: each word slides up from behind a clip, staggered
    // (crisp, punchy reveal — distinct from the softer word cascade above).
    gsap.utils.toArray<HTMLElement>("[data-split-words-up]").forEach((el) => {
      const split = new SplitText(el, {
        type: "words",
        mask: "words",
        autoSplit: true,
        wordsClass: "split-word",
        onSplit: (self: SplitText) =>
          gsap.from(self.words, {
            yPercent: 120,
            duration: 0.7,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }),
      });
      splits.push(split);
    });

    return () => {
      ctx.revert();
      splits.forEach((s) => s.revert());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [pathname]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="flex min-h-screen flex-1 flex-col">
          <div
            ref={containerRef}
            className="flex flex-1 flex-col"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
