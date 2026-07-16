"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import {
  COMING_SOON_PATH,
  INSTALL_PATH,
  NAV_LINKS,
  WAITLIST_PATH,
} from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion/register-gsap";

const MOBILE_LINKS = [
  ...NAV_LINKS,
  { label: "Open app", href: COMING_SOON_PATH },
];

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useGSAP(
    () => {
      if (!open || !panelRef.current) return;

      const links = panelRef.current.querySelectorAll("[data-mobile-link]");
      const footer = panelRef.current.querySelector("[data-mobile-footer]");

      if (prefersReducedMotion()) {
        gsap.set([links, footer], { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        links,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.12,
        }
      );

      if (footer) {
        gsap.fromTo(
          footer,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", delay: 0.45 }
        );
      }
    },
    { dependencies: [open] }
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal>
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className="absolute inset-0 flex flex-col bg-black px-6 pb-10 pt-[4.5rem] shadow-2xl"
      >
        <div className="flex items-center justify-between pb-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">
            Menu
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/15"
            aria-label="Close menu"
          >
            <CloseIcon />
            Close
          </button>
        </div>

        <nav className="mt-6 flex flex-1 flex-col gap-1 overflow-y-auto">
          {MOBILE_LINKS.map((link, index) => {
            const num = String(index + 1).padStart(2, "0");

            if ("external" in link && link.external) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-mobile-link
                  onClick={onClose}
                  className="group flex items-baseline gap-4 py-4 transition-colors"
                >
                  <span className="text-xs font-medium tabular-nums text-[#FF5F15]/70">
                    {num}
                  </span>
                  <span className="text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-[#FF5F15]">
                    {link.label}
                  </span>
                </a>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                data-mobile-link
                onClick={onClose}
                className="group flex items-baseline gap-4 py-4 transition-colors"
              >
                <span className="text-xs font-medium tabular-nums text-[#FF5F15]/70">
                  {num}
                </span>
                <span className="text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-[#FF5F15]">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div
          data-mobile-footer
          className="mt-auto flex shrink-0 gap-3 pt-8"
        >
          <Link
            href={WAITLIST_PATH}
            onClick={onClose}
            className="flex h-12 flex-1 items-center justify-center rounded-full bg-[#FF5F15] px-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Join waitlist
          </Link>
        </div>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
