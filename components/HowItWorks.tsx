"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { HOW_IT_WORKS } from "@/lib/constants";
import { prefersReducedMotion, registerGsap } from "@/lib/motion/register-gsap";
import { MicroLabel } from "./MicroLabel";
import { CAST, Character, type Look } from "./story/Character";
import { idleCast } from "./story/motion";

const PROS: { name: string; look: Look; rating: number; price: number; km: string }[] = [
  { name: "Efua M.", look: { skin: "#7A4A26", hair: "puff", beard: false, glasses: false, shirt: "#1F9D6B" }, rating: 4.6, price: 180, km: "2.4 km" },
  { name: "Kwame A.", look: CAST.specialist, rating: 4.9, price: 220, km: "1.1 km" },
  { name: "Yaw B.", look: { skin: "#8D5524", hair: "fade", beard: false, glasses: true, shirt: "#7B5CFA" }, rating: 4.4, price: 150, km: "3.0 km" },
];
const CHOSEN = 1;
const chosen = PROS[CHOSEN];
const chosenFirst = chosen.name.split(" ")[0];
const TRADES = ["Plumber", "Electrician", "Tiler", "AC Technician"];
const SEARCH = "My kitchen sink is leaking";
/** The little map is a fixed 260×190 box so the route and the moving marker share one coordinate space. */
const MAP = { w: 260, h: 190 };
const ROUTE = [
  { x: 28, y: 166 },
  { x: 28, y: 108 },
  { x: 128, y: 108 },
  { x: 128, y: 46 },
  { x: 222, y: 46 },
];
const HOME = ROUTE[ROUTE.length - 1];
const CONFETTI = ["#FF5F15", "#FFFFFF", "#FFB800", "#1F9D6B", "#2F6FED"];

/**
 * "How it works" as a short self-playing film on a phone: a problem is typed,
 * specialists pop up, one is picked, drives over, and is paid and rated.
 * Plays while on screen and loops; the steps beside it jump to that scene.
 */
export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      registerGsap();
      const q = gsap.utils.selector(sectionRef);
      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.4 });
      tlRef.current = tl;

      const scene = (i: number) => q(`[data-scene="${i}"]`);
      const enter = (i: number) =>
        tl.addLabel(`s${i}`).fromTo(scene(i), { autoAlpha: 0, scale: 0.94, y: 20 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: "power3.out" });
      const leave = (i: number, hold: number) =>
        tl.addLabel(`h${i}`, `+=${hold * 0.6}`).to(scene(i), { autoAlpha: 0, scale: 1.04, y: -14, duration: 0.45, ease: "power2.in" }, `+=${hold * 0.4}`);

      /* 1 · Tell us what you need */
      enter(0)
        .fromTo(q("[data-search]"), { text: "" }, { text: SEARCH, duration: SEARCH.length * 0.045, ease: "none" })
        .fromTo(q("[data-trade]"), { autoAlpha: 0, scale: 0.5 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2.2)", stagger: 0.07 }, "-=0.3")
        .fromTo(
          q('[data-trade="Plumber"]'),
          { backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.8)" },
          { backgroundColor: "#FF5F15", color: "#000000", duration: 0.25 },
          "+=0.2"
        )
        .fromTo(q('[data-trade="Plumber"]'), { scale: 1 }, { scale: 1.12, duration: 0.15, yoyo: true, repeat: 1 }, "<")
        .fromTo(q("[data-pin]"), { y: -70, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: "bounce.out" }, "+=0.15")
        .fromTo(q("[data-ripple]"), { scale: 0.2, autoAlpha: 0.8 }, { scale: 2.4, autoAlpha: 0, duration: 0.9, ease: "power2.out" }, "-=0.15");
      leave(0, 1.4);

      /* 2 · Pick your specialist */
      enter(1)
        .fromTo(q("[data-pro]"), { autoAlpha: 0, x: 60 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: "back.out(1.6)", stagger: 0.14 })
        .fromTo(
          q("[data-pro-stars]"),
          { width: "0%" },
          { width: (_: number, el: HTMLElement) => el.dataset.width ?? "0%", duration: 0.8, ease: "power2.out", stagger: 0.1 },
          "-=0.4"
        )
        .fromTo(q(`[data-pro]:not([data-pro="${CHOSEN}"])`), { autoAlpha: 1 }, { autoAlpha: 0.3, duration: 0.3 }, "+=0.5")
        .fromTo(
          q(`[data-pro="${CHOSEN}"]`),
          { borderColor: "rgba(255,255,255,0.1)", scale: 1 },
          { borderColor: "#FF5F15", scale: 1.04, duration: 0.3, ease: "back.out(3)" },
          "<"
        )
        .fromTo(q("[data-pro-check]"), { scale: 0 }, { scale: 1, duration: 0.35, ease: "back.out(3)" }, "<0.1")
        .fromTo(q("[data-book]"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" })
        .fromTo(q("[data-book]"), { scale: 1 }, { scale: 0.92, duration: 0.12, yoyo: true, repeat: 1 }, "+=0.35");
      leave(1, 0.9);

      /* 3 · They come to you */
      const eta = { min: 12 };
      const etaText = q("[data-eta]")[0];
      const showEta = () => {
        if (etaText) etaText.textContent = eta.min > 0 ? `Arriving in ${Math.ceil(eta.min)} min` : "Arrived";
      };
      enter(2)
        .fromTo(q("[data-route]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.9, ease: "power2.inOut" })
        .fromTo(q("[data-car]"), { x: ROUTE[0].x, y: ROUTE[0].y }, { keyframes: ROUTE.slice(1).map((point) => ({ ...point, duration: 0.55 })), ease: "none" }, "+=0.1")
        .fromTo(eta, { min: 12 }, { min: 0, duration: 2.2, ease: "none", onUpdate: showEta }, "<")
        .fromTo(q("[data-arrived]"), { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.4, ease: "back.out(3)" });
      leave(2, 1.1);

      /* 4 · Pay after the job */
      const total = { value: 0 };
      const totalText = q("[data-total]")[0];
      enter(3)
        .fromTo(q("[data-stamp]"), { scale: 2.4, rotate: -25, autoAlpha: 0 }, { scale: 1, rotate: -8, autoAlpha: 1, duration: 0.45, ease: "back.out(2)" })
        .fromTo(
          total,
          { value: 0 },
          {
            value: chosen.price,
            duration: 0.8,
            ease: "power3.out",
            onUpdate: () => {
              if (totalText) totalText.textContent = String(Math.round(total.value));
            },
          },
          "<0.2"
        )
        .fromTo(q("[data-pay]"), { scale: 1 }, { scale: 0.9, duration: 0.12, yoyo: true, repeat: 1 }, "+=0.3")
        .fromTo(q("[data-paid]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 })
        .fromTo(
          q("[data-confetti]"),
          { x: 0, y: 0, rotate: 0, autoAlpha: 1 },
          {
            x: () => gsap.utils.random(-130, 130),
            y: () => gsap.utils.random(-170, -40),
            rotate: () => gsap.utils.random(-260, 260),
            autoAlpha: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "<"
        )
        .fromTo(q("[data-star]"), { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: "back.out(3)", stagger: 0.12 }, "-=0.6");
      leave(3, 2);

      /* Story bars and the step list follow the film. */
      const bars = q("[data-bar]");
      const starts = HOW_IT_WORKS.map((_, i) => tl.labels[`s${i}`]);
      const ends = [...starts.slice(1), tl.duration()];
      const follow = () => {
        const time = tl.time();
        let current = 0;
        starts.forEach((start, i) => {
          if (time >= start) current = i;
        });
        bars.forEach((bar, i) => {
          const progress = i < current ? 1 : i > current ? 0 : (time - starts[i]) / (ends[i] - starts[i]);
          bar.style.transform = `scaleX(${Math.min(1, progress)})`;
        });
        if (current !== activeRef.current) {
          activeRef.current = current;
          setActive(current);
        }
      };
      tl.eventCallback("onUpdate", follow);

      if (prefersReducedMotion()) {
        // No film: show each scene's finished frame; the steps switch between them.
        tl.seek("h0");
        follow();
        return;
      }
      idleCast(q("[data-cast]")[0]);
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 25%",
        onToggle: (self) => {
          if (self.isActive) tl.play();
          else tl.pause();
        },
      });
    },
    { scope: sectionRef }
  );

  const jump = (i: number) => {
    const tl = tlRef.current;
    if (!tl) return;
    if (prefersReducedMotion()) {
      tl.seek(`h${i}`);
      activeRef.current = i;
      setActive(i);
    } else {
      tl.play(`s${i}`);
    }
  };

  return (
    <section ref={sectionRef} id="how-it-works" className="bg-black px-6 py-20 text-white md:px-10 md:py-28">
      <div className="mx-auto max-w-[1300px] md:px-4 lg:px-0">
        <div className="max-w-xl">
          <MicroLabel>How it works</MicroLabel>
          <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">
            Get your <em className="font-accent text-[#FF5F15] not-italic">problem</em> fixed in only four steps
          </h2>
          <p data-slide-left className="mt-4 text-white/65">Find • Book • Fix</p>
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
          <ol className="order-2 space-y-3 lg:order-1">
            {HOW_IT_WORKS.map((item, i) => (
              <li key={item.step}>
                <button
                  type="button"
                  onClick={() => jump(i)}
                  aria-current={active === i ? "step" : undefined}
                  className={`w-full rounded-[1.5rem] border p-5 text-left transition-[border-color,background-color,opacity] duration-300 md:p-6 ${
                    active === i ? "border-[#FF5F15]/40 bg-white/[.05]" : "border-white/10 opacity-50 hover:opacity-80"
                  }`}
                >
                  <span className="flex items-baseline gap-4">
                    <span className={`font-heading text-2xl ${active === i ? "text-[#FF5F15]" : "text-white/40"}`}>0{item.step}</span>
                    <span>
                      <span className="block text-lg font-semibold tracking-tight md:text-xl">{item.title}</span>
                      <span className={`mt-2 text-sm leading-relaxed text-white/60 ${active === i ? "block" : "hidden md:block"}`}>{item.description}</span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ol>

          {/* The phone. Decorative: the steps list carries the same story as text. */}
          <div className="order-1 mx-auto w-full max-w-[320px] lg:order-2" aria-hidden="true">
            <div className="relative h-[530px] overflow-hidden rounded-[2.75rem] border border-white/15 bg-gradient-to-b from-[#141414] to-[#070707] p-4 shadow-[0_40px_120px_-40px_rgba(255,95,21,.45)]">
              <div className="mx-auto mb-3 h-1.5 w-20 rounded-full bg-white/10" />
              <div className="mb-4 flex gap-1.5">
                {HOW_IT_WORKS.map((item) => (
                  <span key={item.step} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/15">
                    <span data-bar style={{ transform: "scaleX(0)" }} className="block h-full origin-left rounded-full bg-[#FF5F15]" />
                  </span>
                ))}
              </div>

              <div data-cast className="relative h-[calc(100%-2.5rem)]">
                {/* 1 · Tell us what you need */}
                <div data-scene="0" className="invisible absolute inset-0 flex flex-col gap-4">
                  <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[.06] px-3 py-3 text-sm">
                    <span className="text-white/40">⌕</span>
                    <span data-search className="min-h-5">
                      {SEARCH}
                    </span>
                    <span className="h-4 w-[2px] animate-pulse bg-[#FF5F15]" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {TRADES.map((trade) => (
                      <span key={trade} data-trade={trade} className="rounded-xl bg-white/[.06] px-3 py-2.5 text-center text-xs font-semibold text-white/80">
                        {trade}
                      </span>
                    ))}
                  </div>
                  <MiniMap>
                    <div className="absolute left-[118px] top-[96px] -translate-x-1/2 -translate-y-full">
                      <span data-ripple className="absolute left-1/2 top-full -ml-4 -mt-4 h-8 w-8 rounded-full border-2 border-[#FF5F15]" />
                      <span data-pin className="block h-12 w-12 overflow-hidden rounded-full border-2 border-[#FF5F15] bg-[#141414]">
                        <Character look={CAST.customer} className="h-full w-full" />
                      </span>
                      <span className="mx-auto block h-3 w-[2px] bg-[#FF5F15]" />
                    </div>
                  </MiniMap>
                </div>

                {/* 2 · Pick your specialist */}
                <div data-scene="1" className="invisible absolute inset-0 flex flex-col gap-2.5">
                  <p className="text-xs font-semibold uppercase tracking-[.16em] text-white/45">3 plumbers near you</p>
                  {PROS.map((pro, i) => (
                    <div key={pro.name} data-pro={i} className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.05] p-2.5">
                      <span className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white/10">
                        <Character look={pro.look} className="h-full w-full" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">{pro.name}</span>
                        <span className="relative mt-0.5 inline-block text-xs leading-none tracking-[1px] text-white/15">
                          ★★★★★
                          <span
                            data-pro-stars
                            data-width={`${(pro.rating / 5) * 100}%`}
                            style={{ width: `${(pro.rating / 5) * 100}%` }}
                            className="absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap text-[#FF5F15]"
                          >
                            ★★★★★
                          </span>
                        </span>
                        <span className="mt-1 block text-[11px] text-white/45">
                          {pro.rating} · {pro.km}
                        </span>
                      </span>
                      <span className="font-heading text-xl">GH₵{pro.price}</span>
                      {i === CHOSEN ? (
                        <span data-pro-check className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#FF5F15] text-xs font-bold text-black">
                          ✓
                        </span>
                      ) : null}
                    </div>
                  ))}
                  <span data-book className="mt-auto rounded-full bg-[#FF5F15] py-3.5 text-center text-sm font-semibold text-black">
                    Book {chosenFirst}
                  </span>
                </div>

                {/* 3 · They come to you */}
                <div data-scene="2" className="invisible absolute inset-0 flex flex-col gap-4">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.05] p-2.5">
                    <span className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white/10">
                      <Character look={chosen.look} className="h-full w-full" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{chosenFirst} is on the way</span>
                      <span data-eta className="text-xs text-[#FF5F15]">
                        Arrived
                      </span>
                    </span>
                  </div>
                  <MiniMap>
                    <svg viewBox={`0 0 ${MAP.w} ${MAP.h}`} className="absolute inset-0 h-full w-full" fill="none">
                      <polyline
                        data-route
                        points={ROUTE.map((p) => `${p.x},${p.y}`).join(" ")}
                        stroke="#FF5F15"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx={HOME.x} cy={HOME.y} r="13" fill="#141414" stroke="#fff" strokeWidth="2" />
                      <path d={`M${HOME.x - 6} ${HOME.y + 5}v-6l6-5 6 5v6Z`} fill="#fff" />
                    </svg>
                    <span
                      data-car
                      style={{ transform: `translate(${HOME.x}px, ${HOME.y}px)` }}
                      className="absolute -left-5 -top-5 block h-10 w-10 overflow-hidden rounded-full border-2 border-[#FF5F15] bg-[#141414]"
                    >
                      <Character look={chosen.look} className="h-full w-full" />
                    </span>
                  </MiniMap>
                  <span data-arrived className="mx-auto rounded-full bg-[#1F9D6B] px-4 py-2 text-xs font-semibold text-white">
                    ✓ {chosenFirst} has arrived
                  </span>
                </div>

                {/* 4 · Pay after the job */}
                <div data-scene="3" className="invisible absolute inset-0 flex flex-col items-center gap-4 pt-4 text-center">
                  <div className="relative">
                    <span className="block h-24 w-24 overflow-hidden rounded-[1.5rem] bg-white/10">
                      <Character look={chosen.look} className="h-full w-full" />
                    </span>
                    <span data-stamp className="absolute -right-12 -top-3 rotate-[-8deg] rounded-lg border-2 border-[#1F9D6B] bg-black/60 px-2 py-1 text-xs font-black uppercase tracking-wider text-[#1F9D6B]">
                      Job done
                    </span>
                  </div>
                  <p className="text-sm text-white/55">Leaking sink fixed</p>
                  <p className="font-heading text-5xl">
                    GH₵<span data-total>{chosen.price}</span>
                  </p>
                  <div className="relative w-full">
                    <span data-pay className="block rounded-full bg-[#FF5F15] py-3.5 text-sm font-semibold text-black">
                      Pay now
                    </span>
                    <span data-paid className="absolute inset-0 flex items-center justify-center rounded-full bg-[#1F9D6B] text-sm font-semibold text-white">
                      ✓ Paid
                    </span>
                    {Array.from({ length: 18 }, (_, i) => (
                      <span
                        key={i}
                        data-confetti
                        className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-1.5 rounded-sm opacity-0"
                        style={{ backgroundColor: CONFETTI[i % CONFETTI.length] }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 text-2xl tracking-[4px] text-[#FF5F15]">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} data-star className="inline-block">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-white/40">You rated {chosenFirst} 5 stars</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniMap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1110]" style={{ width: MAP.w, height: MAP.h }}>
      <svg viewBox={`0 0 ${MAP.w} ${MAP.h}`} className="absolute inset-0 h-full w-full" aria-hidden>
        <g stroke="rgba(255,255,255,.06)" strokeWidth="1">
          {Array.from({ length: 9 }, (_, i) => (
            <path key={`v${i}`} d={`M${i * 32} 0v${MAP.h}`} />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <path key={`h${i}`} d={`M0 ${i * 32}h${MAP.w}`} />
          ))}
        </g>
        <g stroke="rgba(255,255,255,.12)" strokeWidth="10" strokeLinecap="round" fill="none">
          <path d={`M28 ${MAP.h}V108h${MAP.w}`} />
          <path d={`M128 108V46h${MAP.w}`} />
          <path d="M0 46h128" />
        </g>
      </svg>
      {children}
    </div>
  );
}
