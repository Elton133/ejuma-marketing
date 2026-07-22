"use client";

import { CUSTOMER_FEATURE_ROWS } from "@/lib/constants";
import { MicroLabel } from "./MicroLabel";
import { WorkerFeaturesGrid } from "./WorkerFeaturesGrid";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { FEATURE_ICONS } from "@/lib/feature-icons";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion/register-gsap";

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === "undefined") return;

    // Use ScrollTrigger to fade images in and out based on left-side text sections
    const sections = gsap.utils.toArray<HTMLElement>(".feature-text-section");
    const images = gsap.utils.toArray<HTMLElement>(".feature-visual");

    sections.forEach((sec, i) => {
      ScrollTrigger.create({
        trigger: sec,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.to(images, { opacity: 0, scale: 0.95, duration: 0.5, ease: "power2.out" });
          gsap.to(images[i], { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" });
        },
        onEnterBack: () => {
          gsap.to(images, { opacity: 0, scale: 0.95, duration: 0.5, ease: "power2.out" });
          gsap.to(images[i], { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger && (st.trigger as HTMLElement).classList.contains("feature-text-section")) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <>
      <section
        id="features"
        className="bg-[#fafafa] px-6 py-16 text-black md:py-24"
      >
        <div className="mx-auto max-w-[1200px]">
          <header className="mb-4 max-w-3xl md:mb-16" data-reveal-stagger>
            <MicroLabel light>For customers</MicroLabel>
            <h2 data-reveal-item className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">
              Everything you need,{" "}
              <span className="text-[#FF5F15]">right in your pocket</span>
            </h2>
            <p data-reveal-item className="mt-4 max-w-xl text-base leading-relaxed text-black/55 md:text-lg">
              From finding the right specialist to tracking their arrival —
              Beagine handles it all so you can focus on what matters.
            </p>
          </header>

          <div className="relative flex flex-col items-start gap-10 lg:flex-row lg:gap-20" ref={containerRef}>
            {/* Left side: Scrolling Text */}
            <div className="flex w-full flex-col lg:w-1/2 lg:pb-[30vh]" ref={leftRef}>
              {CUSTOMER_FEATURE_ROWS.map((feature, index) => (
                <div
                  key={feature.title}
                  className="feature-text-section flex min-h-[50vh] flex-col justify-center py-20 lg:min-h-[80vh] lg:py-0"
                >
                  <p className="text-[15px] font-medium leading-snug text-black/55">
                    {feature.eyebrow}
                  </p>
                  <h3 className="font-heading mt-4 text-[clamp(1.875rem,3.2vw,2.625rem)] leading-[1.12] text-black">
                    {feature.title}
                  </h3>
                  <p className="mt-5 text-[17px] leading-[1.55] text-black/60">
                    {feature.description}
                  </p>
                  
                  {/* Mobile visual inline */}
                  <div className="mt-10 block aspect-4/5 w-full overflow-hidden rounded-[1.75rem] sm:aspect-5/6 lg:hidden">
                    <FeatureVisual feature={feature} />
                  </div>

                  {("external" in feature.cta && feature.cta.external) || feature.cta.href.startsWith("http") ? (
                    <a
                      href={feature.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-premium mt-9 inline-flex w-fit rounded-[10px] bg-[#FF5F15] px-7 py-3.5 text-[15px] font-semibold text-black hover:bg-[#FF7335]"
                    >
                      {feature.cta.label}
                    </a>
                  ) : (
                    <Link
                      href={feature.cta.href}
                      className="btn-premium mt-9 inline-flex w-fit rounded-[10px] bg-[#FF5F15] px-7 py-3.5 text-[15px] font-semibold text-black hover:bg-[#FF7335]"
                    >
                      {feature.cta.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right side: Sticky Visuals */}
            <div className="hidden h-screen w-full lg:sticky lg:top-0 lg:flex lg:w-1/2 lg:items-center" ref={rightRef}>
              <div className="relative h-[75vh] w-full overflow-hidden rounded-[2.5rem] bg-zinc-900 shadow-2xl">
                {CUSTOMER_FEATURE_ROWS.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="feature-visual absolute inset-0 opacity-0 transform scale-95"
                    style={{ opacity: index === 0 ? 1 : 0, transform: index === 0 ? "scale(1)" : "scale(0.95)" }}
                  >
                    <FeatureVisual feature={feature} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="for-workers"
        className="bg-black px-6 py-20 text-white md:py-28"
      >
        <div className="mx-auto max-w-[1200px]">
          <MicroLabel>For specialists</MicroLabel>
          <h2 data-reveal className="mt-3 max-w-2xl text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">
            Get{" "}
            <em className="text-[#FF5F15] not-italic">verified</em>, get{" "}
            <em className="text-[#FF5F15] not-italic">discovered</em> and{" "}
            <em className="text-[#FF5F15] not-italic">earn</em>
          </h2>
          <p data-reveal className="mt-4 max-w-xl text-white/60">
          Set up your profile once, join the ecosystem and start earning. 
          Welcome to the Engineering Ecosystem
          </p>

          <WorkerFeaturesGrid />
        </div>
      </section>
    </>
  );
}

function FeatureVisual({ feature }: { feature: any }) {
  if (feature.image) {
    return (
      <div className="relative h-full w-full">
        <Image
          src={feature.image}
          alt={feature.imageAlt || ""}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 560px"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-transparent" />
      </div>
    );
  }

  const iconData = FEATURE_ICONS[feature.icon as keyof typeof FEATURE_ICONS];
  const panelClass = feature.panelClass || "from-[#FF5F15]/10 to-[#fafafa]";

  return (
    <div className={`relative flex h-full w-full items-center justify-center bg-linear-to-br ${panelClass}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,95,21,0.12),transparent_55%)]" />
      {iconData && (
        <HugeiconsIcon
          icon={iconData}
          size={120}
          color="#FF5F15"
          strokeWidth={1.25}
          className="relative z-10"
        />
      )}
      <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-[#FF5F15]/10 blur-3xl" />
    </div>
  );
}
