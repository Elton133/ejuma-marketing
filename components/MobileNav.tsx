"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import {
  SITE_LINK_GROUPS,
  WAITLIST_PATH,
} from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion/register-gsap";

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

      const links = panelRef.current.querySelectorAll("[data-menu-link]");
      const footer = panelRef.current.querySelector("[data-mobile-footer]");

      gsap.fromTo(
        panelRef.current,
        { yPercent: -100 },
        {
          yPercent: 0,
          duration: 0.65,
          ease: "power4.out",
        },
      );

      if (prefersReducedMotion()) {
        gsap.set([links, footer], { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        links,
        { opacity: 0, y: -12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.035,
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
    <div className="fixed inset-0 z-40 h-[100dvh] w-screen" role="dialog" aria-modal aria-label="Site menu">
      <div
        className="absolute inset-0 h-[100dvh] w-screen bg-black/70 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className="absolute inset-x-0 top-0 flex max-h-[100dvh] min-h-[70vh] flex-col overflow-y-auto rounded-b-[2rem] border-b border-white/10 bg-black px-6 pb-8 pt-24 shadow-2xl md:px-10 md:pb-10 md:pt-28 lg:min-h-0 lg:px-14 lg:pb-12"
      >
        <nav className="mx-auto mt-5 grid w-full max-w-[1440px] flex-1 gap-10 overflow-y-auto sm:grid-cols-2 lg:mt-0 lg:grid-cols-4 lg:gap-12">
          {SITE_LINK_GROUPS.map((group, groupIndex) => (
            <div key={group.title}>
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                <span className="text-[#FF5F15]">0{groupIndex + 1}</span>
                {group.title}
              </p>
              <ul className="mt-5 space-y-1">
                {group.links.map((link) => {
                  const linkClass = "group flex items-center justify-between border-b border-white/8 py-3 text-lg font-medium text-white/75 transition-colors hover:text-white lg:text-xl";
                  const external = link.href.startsWith("mailto:") || link.href.startsWith("http");

                  return (
                    <li key={`${group.title}-${link.label}`}>
                      {external ? (
                        <a href={link.href} data-menu-link onClick={onClose} className={linkClass}>
                          {link.label}
                          <ArrowIcon />
                        </a>
                      ) : (
                        <Link href={link.href} data-menu-link onClick={onClose} className={linkClass}>
                          {link.label}
                          <ArrowIcon />
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div
          data-mobile-footer
          className="mx-auto mt-8 flex w-full max-w-[1440px] shrink-0 justify-end gap-3 border-t border-white/10 pt-6"
        >
          <Link
            href={WAITLIST_PATH}
            onClick={onClose}
            className="flex h-12 w-full items-center justify-center rounded-full bg-[#FF5F15] px-6 text-sm font-semibold text-black transition-opacity hover:opacity-90 sm:w-auto"
          >
            Join waitlist
          </Link>
        </div>
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
