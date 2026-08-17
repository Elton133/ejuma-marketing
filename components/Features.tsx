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
import { SplitText } from "gsap/SplitText";
import { prefersReducedMotion, registerGsap } from "@/lib/motion/register-gsap";

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion() || typeof window === "undefined") return;

    let ctx: gsap.Context | undefined;
    let mm: gsap.MatchMedia | undefined;

    // Delay init so ScrollSmoother (created in the parent MotionProvider) exists first
    const timeout = setTimeout(() => {
      // Heading reveals — all breakpoints
      ctx = gsap.context(() => {
        const heads = gsap.utils.toArray<HTMLElement>(
          ".feature-text-section h3, #features h2, #for-workers h2"
        );
        heads.forEach((h) => {
          const split = new SplitText(h, { type: "words,chars" });
          gsap.from(split.chars, {
            scrollTrigger: { trigger: h, start: "top 85%" },
            opacity: 0,
            y: 15,
            duration: 0.5,
            stagger: 0.02,
            ease: "back.out(1.4)",
          });
        });
      });

      // Desktop only: pin the visual column (via ScrollTrigger, since CSS sticky
      // breaks inside ScrollSmoother) and crossfade images as the text scrolls
      mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const sections = gsap.utils.toArray<HTMLElement>(".feature-text-section");
        const images = gsap.utils.toArray<HTMLElement>(".feature-visual");

        if (containerRef.current && rightRef.current) {
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: rightRef.current,
            pinSpacing: false,
            // Force transform-based pinning — "fixed" (the default) is broken by
            // ScrollSmoother's transformed #smooth-content ancestor, so the visual
            // would scroll away instead of staying pinned.
            pinType: "transform",
          });
        }

        const showImage = (i: number) => {
          gsap.to(images, { opacity: 0, scale: 0.95, duration: 0.5, ease: "power2.out", overwrite: true });
          gsap.to(images[i], { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", overwrite: true });
        };

        sections.forEach((sec, i) => {
          ScrollTrigger.create({
            trigger: sec,
            start: "top center",
            end: "bottom center",
            onEnter: () => showImage(i),
            onEnterBack: () => showImage(i),
          });
        });
      });

      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timeout);
      mm?.revert();
      ctx?.revert();
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
              {CUSTOMER_FEATURE_ROWS.map((feature) => (
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

            {/* Right side: Pinned Visuals (pinned via ScrollTrigger, not CSS sticky —
                CSS sticky breaks inside ScrollSmoother's transformed content) */}
            <div className="hidden w-full lg:block lg:w-1/2">
              <div ref={rightRef} className="flex h-screen items-center">
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

function FeatureVisual({ feature }: { feature: (typeof CUSTOMER_FEATURE_ROWS)[number] }) {
  const image = "image" in feature ? feature.image : undefined;
  const imageAlt = "imageAlt" in feature ? feature.imageAlt : "";

  if (image) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-linear-to-br from-[#fff8f3] via-[#f5f3f1] to-[#ffe3d5]">
        <div className="absolute left-[12%] top-[10%] h-36 w-36 rounded-full bg-[#FF5F15]/12 blur-3xl" />
        <div className="absolute bottom-[8%] right-[8%] h-48 w-48 rounded-full bg-white/80 blur-3xl" />
        <Image
          src={image}
          alt={imageAlt || ""}
          fill
          className="relative z-10 object-contain object-center p-6 sm:p-10 lg:p-12"
          sizes="(max-width: 1024px) 100vw, 560px"
        />
        <div className="absolute inset-x-[18%] bottom-[8%] h-10 rounded-[50%] bg-black/10 blur-2xl" />
      </div>
    );
  }

  const iconData = FEATURE_ICONS[feature.icon as keyof typeof FEATURE_ICONS];
  const panelClass = ("panelClass" in feature && feature.panelClass) || "from-[#FF5F15]/10 to-[#fafafa]";

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
