"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { pageTransition } from "@/lib/motion/barba-transitions";
import { prefersReducedMotion, registerGsap } from "@/lib/motion/register-gsap";

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
      gsap.set("[data-hero-animate]", { y: 36, opacity: 0 });
      gsap.to("[data-hero-animate]", {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.12,
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          y: 44,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
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
