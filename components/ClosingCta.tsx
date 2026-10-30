"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import Link from "next/link";
import { useRef } from "react";
import { WAITLIST_PATH } from "@/lib/constants";
import { prefersReducedMotion, registerGsap } from "@/lib/motion/register-gsap";
import { MicroLabel } from "./MicroLabel";
import { CAST, Character, type Look } from "./story/Character";
import { idleCast, wave } from "./story/motion";

const WORDMARK = "beagine";

/** Whose story this page tells, so the right person shows up in the card. */
function castFor(audience: string): Look[] {
  const a = audience.toLowerCase();
  if (a.includes("customer")) return [CAST.customer];
  if (a.includes("specialist")) return [CAST.specialist];
  if (a.includes("vendor")) return [CAST.vendor];
  return [CAST.customer, CAST.specialist, CAST.vendor];
}

/**
 * The orange "Built for real work" closing panel, in motion:
 * - the beagine wordmark rises in letter by letter, then drifts as you scroll;
 * - the rings breathe; the heading reveals line by line;
 * - the black card tilts toward the pointer, its glow follows it, and the
 *   page's person (or all three) pops up and waves.
 * Everything holds still for reduced motion.
 */
export function ClosingCta({ closingTitle, closingBody, audience }: { closingTitle: string; closingBody: string; audience: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const people = castFor(audience);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(sectionRef);
      const trigger = { trigger: sectionRef.current, start: "top 70%" };

      // Wordmark: letters rise in, then each drifts at its own pace while scrolling.
      const letters = q("[data-letter]");
      gsap.from(letters, { yPercent: 110, duration: 1, ease: "power4.out", stagger: 0.06, scrollTrigger: trigger });
      letters.forEach((letter, i) => {
        gsap.to(letter, {
          y: (i % 2 ? -1 : 1) * (10 + i * 4),
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });

      // Rings breathe.
      gsap.to(q("[data-ring]"), { scale: 1.06, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.8, transformOrigin: "50% 50%" });

      // Heading: line by line from behind a mask (re-split after web fonts settle).
      const heading = q("[data-heading]")[0];
      if (heading) {
        SplitText.create(heading, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, { yPercent: 105, duration: 0.9, ease: "power4.out", stagger: 0.08, scrollTrigger: trigger }),
        });
      }
      gsap.from(q("[data-fade]"), { y: 18, autoAlpha: 0, duration: 0.7, ease: "power3.out", stagger: 0.1, delay: 0.25, scrollTrigger: trigger });

      // Card people pop up and wave once the card is on screen.
      const card = cardRef.current;
      if (card) {
        const faces = gsap.utils.toArray<HTMLElement>("[data-face]", card);
        const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 80%" } });
        tl.fromTo(faces, { y: 40, scale: 0.7, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: 0.8, ease: "elastic.out(1, 0.6)", stagger: 0.12 });
        faces.forEach((face, i) => wave(tl, face, 0.45 + i * 0.2, 2));
        idleCast(card);
      }
    },
    { scope: sectionRef }
  );

  // Tilt toward the pointer; the glow follows it. Pointer-only (no tilt on touch).
  useGSAP(
    () => {
      const card = cardRef.current;
      const glow = glowRef.current;
      if (!card || !glow || prefersReducedMotion() || !window.matchMedia("(hover: hover)").matches) return;
      gsap.set(card, { transformPerspective: 900 });
      const rotateX = gsap.quickTo(card, "rotateX", { duration: 0.5, ease: "power3.out" });
      const rotateY = gsap.quickTo(card, "rotateY", { duration: 0.5, ease: "power3.out" });
      const glowX = gsap.quickTo(glow, "x", { duration: 0.6, ease: "power3.out" });
      const glowY = gsap.quickTo(glow, "y", { duration: 0.6, ease: "power3.out" });
      const move = (event: PointerEvent) => {
        const box = card.getBoundingClientRect();
        const px = (event.clientX - box.left) / box.width - 0.5;
        const py = (event.clientY - box.top) / box.height - 0.5;
        rotateY(px * 10);
        rotateX(-py * 10);
        glowX(px * box.width * 0.8);
        glowY(py * box.height * 0.8);
      };
      const leave = () => {
        rotateX(0);
        rotateY(0);
        glowX(0);
        glowY(0);
      };
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      return () => {
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", leave);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-[#FF5F15] px-6 py-20 text-black md:px-10 md:py-28">
      <div data-ring aria-hidden className="pointer-events-none absolute -right-20 -top-36 h-[420px] w-[420px] rounded-full border border-black/10 md:h-[620px] md:w-[620px]" />
      <div data-ring aria-hidden className="pointer-events-none absolute -right-6 -top-16 h-[260px] w-[260px] rounded-full border border-black/10 md:h-[420px] md:w-[420px]" />
      <p
        aria-hidden
        className="pointer-events-none absolute -bottom-[.16em] -left-[.03em] flex select-none overflow-hidden whitespace-nowrap text-[clamp(8rem,24vw,22rem)] font-semibold leading-none tracking-[-.08em] text-black/[.055]"
      >
        {WORDMARK.split("").map((letter, i) => (
          <span key={i} data-letter className="inline-block will-change-transform">
            {letter}
          </span>
        ))}
      </p>
      <div className="relative z-10 mx-auto grid max-w-[1300px] gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end lg:gap-20">
        <div>
          <div data-fade>
            <MicroLabel light>Built for real work</MicroLabel>
          </div>
          <h2 data-heading className="mt-5 max-w-4xl text-[clamp(2.75rem,6vw,5.75rem)] font-semibold leading-[.96] tracking-[-.045em]">
            {closingTitle}
          </h2>
          <p data-fade className="mt-7 max-w-2xl text-base leading-relaxed text-black/70 md:text-lg">
            {closingBody}
          </p>
          <div data-fade className="mt-10 flex flex-wrap gap-3">
            <Link href={WAITLIST_PATH} className="btn-premium inline-flex h-13 items-center rounded-full bg-black px-8 text-sm font-semibold text-white md:text-base">
              Join the waitlist <span aria-hidden className="ml-3">↗</span>
            </Link>
          </div>
        </div>
        <Link
          href={WAITLIST_PATH}
          aria-label="Join the waitlist: join the people building a better way to get work done"
          className="block rounded-[2rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          <div ref={cardRef} className="relative overflow-hidden rounded-[2rem] border border-black/15 bg-black p-7 text-white shadow-[0_28px_70px_rgba(0,0,0,.18)] will-change-transform md:p-8">
            <div ref={glowRef} aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -ml-20 -mt-20 h-40 w-40 rounded-full bg-[#FF5F15]/30 blur-2xl" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[.16em] text-white/45">Your next chapter</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#FF7B3D]">↗</span>
              </div>
              <div className="mt-8 flex -space-x-3" aria-hidden>
                {people.map((look, i) => (
                  <span key={i} data-face className="block h-16 w-16 overflow-hidden rounded-full border-[3px] border-black bg-[#1c1c1e]">
                    <Character look={look} className="h-full w-full" />
                  </span>
                ))}
              </div>
              <p className="mt-6 text-2xl font-semibold leading-tight tracking-tight">Join the people building a better way to get work done.</p>
              <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF5F15] opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FF5F15]" />
                </span>
                <span className="text-sm text-white/55">{audience} · early access</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
