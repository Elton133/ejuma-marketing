"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import {
  APP_URL,
  INSTALL_PATH,
  NAV_LINKS,
  WAITLIST_PATH,
} from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion/register-gsap";

const MOBILE_LINKS = [
  ...NAV_LINKS,
  { label: "Open app", href: APP_URL, external: true as const },
];

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

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
        ref={backdropRef}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        aria-hidden
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-white/10 bg-black/95 px-8 pb-10 pt-24 shadow-2xl backdrop-blur-xl"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
          Menu
        </p>

        <nav className="mt-10 flex flex-1 flex-col gap-1">
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
                  className="group flex items-baseline gap-4 border-b border-white/[0.06] py-5 transition-colors hover:border-[#FF5F15]/30"
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
                className="group flex items-baseline gap-4 border-b border-white/[0.06] py-5 transition-colors hover:border-[#FF5F15]/30"
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

        <div data-mobile-footer className="mt-auto space-y-3 border-t border-white/10 pt-8">
          <Link
            href={INSTALL_PATH}
            onClick={onClose}
            className="flex h-12 w-full items-center justify-center rounded-full border border-white/20 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Get the app on your phone
          </Link>
          <Link
            href={WAITLIST_PATH}
            onClick={onClose}
            className="flex h-12 w-full items-center justify-center rounded-full bg-[#FF5F15] text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Join the waitlist
          </Link>
        </div>
      </div>
    </div>
  );
}
