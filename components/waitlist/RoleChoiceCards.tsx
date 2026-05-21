"use client";

import { useGSAP } from "@gsap/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home09Icon,
  Wrench01Icon,
} from "@hugeicons/core-free-icons";
import { gsap } from "gsap";
import { useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion/register-gsap";

export type SurveyPath = "customer" | "specialist";

const PATHS: {
  id: SurveyPath;
  title: string;
  description: string;
  icon: typeof Home09Icon;
}[] = [
  {
    id: "customer",
    title: "Customer",
    description:
      "I hire plumbers, electricians, and other skilled workers for my home or business.",
    icon: Home09Icon,
  },
  {
    id: "specialist",
    title: "I'm a specialist",
    description:
      "I'm an artisan or technician looking for more jobs and a professional profile.",
    icon: Wrench01Icon,
  },
];

export function RoleChoiceCards({
  onSelect,
  exiting,
}: {
  onSelect: (path: SurveyPath) => void;
  exiting?: boolean;
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll("[data-role-card]");
      if (!cards?.length) return;

      if (prefersReducedMotion()) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        cards,
        { opacity: 0, y: 32, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
        }
      );
    },
    { scope: gridRef }
  );

  useGSAP(
    () => {
      if (!exiting) return;
      const cards = gridRef.current?.querySelectorAll("[data-role-card]");
      if (!cards?.length) return;

      gsap.to(cards, {
        opacity: 0,
        y: -20,
        scale: 0.94,
        duration: 0.35,
        stagger: 0.06,
        ease: "power2.in",
      });
    },
    { dependencies: [exiting], scope: gridRef }
  );

  return (
    <div ref={gridRef} className="mt-12 grid gap-4 sm:grid-cols-2">
      {PATHS.map((path) => (
        <button
          key={path.id}
          type="button"
          data-role-card
          disabled={exiting}
          onClick={() => onSelect(path.id)}
          onMouseEnter={(e) => {
            if (prefersReducedMotion() || exiting) return;
            gsap.to(e.currentTarget, {
              y: -6,
              scale: 1.02,
              duration: 0.25,
              ease: "power2.out",
            });
          }}
          onMouseLeave={(e) => {
            if (prefersReducedMotion() || exiting) return;
            gsap.to(e.currentTarget, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          }}
          className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 text-left transition-colors hover:border-[#FF5F15]/50 disabled:pointer-events-none"
        >
          <span
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#FF5F15]/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-0"
            aria-hidden
          />
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF5F15]/15 text-[#FF5F15]">
            <HugeiconsIcon icon={path.icon} size={26} strokeWidth={1.5} />
          </span>
          <span className="mt-5 text-xl font-semibold tracking-tight text-white">
            {path.title}
          </span>
          <span className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
            {path.description}
          </span>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#FF5F15]">
            Start survey
            <span
              className="transition-transform group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
