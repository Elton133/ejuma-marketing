"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { pageTransition } from "@/lib/motion/barba-transitions";
import { prefersReducedMotion, registerGsap } from "@/lib/motion/register-gsap";
import Lenis from "lenis";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstRoute = useRef(true);

  useEffect(() => {
    registerGsap();

    let destroyed = false;

    import("@barba/core").then(({ default: barba }) => {
      if (destroyed) return;

      barba.init({
        prevent: ({ el }) => {
          const href = el?.getAttribute?.("href") ?? "";
          if (!href || href.startsWith("#")) return true;
          if (el?.getAttribute?.("target") === "_blank") return true;
          if (
            href.startsWith("http") &&
            !href.includes(window.location.host)
          ) {
            return true;
          }
          return true;
        },
        transitions: [pageTransition],
      });
    });

    return () => {
      destroyed = true;
      import("@barba/core").then(({ default: barba }) => barba.destroy());
    };
  }, []);

  // Lenis Smooth Scroll
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

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
      gsap.set("[data-hero-animate]", { y: 36, opacity: 0, filter: "blur(8px)" });
      gsap.to("[data-hero-animate]", {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.15,
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.set(el, { y: 44, opacity: 0, filter: "blur(8px)" });
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((container) => {
        const children = container.querySelectorAll("[data-reveal-item]");
        if (!children.length) return;
        gsap.set(children, { y: 44, opacity: 0, filter: "blur(8px)" });
        gsap.to(children, {
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
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

    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [pathname]);

  const namespace = pathname === "/" ? "home" : pathname.slice(1);

  return (
    <div data-barba="wrapper" className="flex min-h-full flex-1 flex-col">
      <div
        ref={containerRef}
        data-barba="container"
        data-barba-namespace={namespace}
        className="flex flex-1 flex-col"
      >
        {children}
      </div>
    </div>
  );
}
