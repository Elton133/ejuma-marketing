"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import type { DependencyList, RefObject } from "react";
import { prefersReducedMotion } from "@/lib/motion/register-gsap";
import { Typewriter } from "./Typewriter";

/**
 * Pieces shared by the site's step-by-step flows (survey, waitlist, ask).
 * Anything marked data-pop springs in when the step changes; data-draw SVG
 * strokes draw themselves.
 */
export function usePops(scope: RefObject<HTMLElement | null>, dependencies: DependencyList, skip = false) {
  useGSAP(
    () => {
      if (skip || !scope.current) return;
      const pops = gsap.utils.toArray<HTMLElement>("[data-pop]", scope.current);
      if (prefersReducedMotion()) {
        gsap.set(pops, { clearProps: "opacity,transform" });
        return;
      }
      gsap.fromTo(
        pops,
        { opacity: 0, scale: 0.6, y: 18 },
        { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "back.out(2)", stagger: 0.045, delay: 0.25, clearProps: "opacity,transform" }
      );
      const draws = gsap.utils.toArray<SVGElement>("[data-draw]", scope.current);
      if (draws.length) gsap.from(draws, { drawSVG: "0%", duration: 0.9, ease: "power2.inOut", stagger: 0.12 });
    },
    { scope, dependencies: [...dependencies, skip] }
  );
}

export function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      data-pop
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-4 py-2.5 text-sm transition-colors duration-200 ${
        active ? "border-[#FF5F15] bg-[#FF5F15] font-semibold text-black" : "border-white/15 bg-white/[.04] text-white/80 hover:border-white/40"
      }`}
    >
      {children}
    </button>
  );
}

export function NextButton({
  disabled,
  onClick,
  type = "button",
  children = "Next",
}: {
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  children?: React.ReactNode;
}) {
  return (
    <button
      type={type}
      data-pop
      disabled={disabled}
      onClick={onClick}
      className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FF5F15] px-7 py-3.5 text-sm font-semibold text-black transition-[opacity,transform] hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
    >
      {children} <span aria-hidden>→</span>
    </button>
  );
}

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="mb-6 text-sm text-white/45 transition-colors hover:text-white">
      ← Back
    </button>
  );
}

export const fieldClass =
  "w-full rounded-2xl border border-white/15 bg-white/[.04] px-4 py-3.5 text-base text-white outline-none placeholder:text-white/30 focus:border-[#FF5F15]";

export function TextBox({ value, onChange, placeholder, rows = 2 }: { value: string; onChange: (value: string) => void; placeholder: string; rows?: number }) {
  return (
    <textarea
      data-pop
      rows={rows}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className={`mt-5 resize-none text-sm ${fieldClass}`}
    />
  );
}

export function Question({ text, hint, size = "lg" }: { text: string; hint?: string; size?: "lg" | "md" }) {
  return (
    <div className="mb-6">
      <Typewriter
        key={text}
        lines={[text]}
        speed={22}
        delay={80}
        className={`font-semibold leading-[1.1] tracking-[-.02em] ${size === "lg" ? "text-[clamp(1.6rem,4.5vw,2.6rem)]" : "text-[clamp(1.35rem,3vw,1.9rem)]"}`}
      />
      {hint ? <p data-pop className="mt-2 text-sm text-white/45">{hint}</p> : null}
    </div>
  );
}

export function Progress({ value }: { value: number }) {
  return (
    <div className="mb-8 h-[3px] w-full overflow-hidden rounded-full bg-white/10" aria-hidden>
      <div className="h-full rounded-full bg-[#FF5F15] transition-[width] duration-700 ease-out" style={{ width: `${Math.min(1, Math.max(0, value)) * 100}%` }} />
    </div>
  );
}
