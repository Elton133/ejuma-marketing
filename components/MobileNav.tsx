"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import {
  COMING_SOON_PATH,
  SITE_LINK_GROUPS,
  WAITLIST_PATH,
} from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion/register-gsap";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

const QUICK_ACTIONS = [
  {
    eyebrow: "For customers",
    title: "Find a specialist",
    description: "Browse verified professionals for the job you need.",
    href: "/customers",
  },
  {
    eyebrow: "For specialists",
    title: "Join Beagine",
    description: "Build your profile, get discovered and start earning.",
    href: "/specialists",
  },
  {
    eyebrow: "For vendors",
    title: "Bring your shop online",
    description: "Manage products, orders, sales and payouts.",
    href: "/vendors",
  },
  {
    eyebrow: "Need help?",
    title: "Contact support",
    description: "Get help with bookings, accounts and platform questions.",
    href: "/community/support",
  },
] as const;

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/beagine-app/" },
  { label: "Instagram", href: "https://www.instagram.com/beagine.hq?igsh=MWtjNW4zY3kzczZlMQ==" },
  { label: "TikTok", href: "https://www.tiktok.com/@beagine.hq?_r=1&_t=ZS-9820A2s6kWf" },
] as const;

export function MobileNav({ open, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeGroup, setActiveGroup] = useState(0);
  const group = SITE_LINK_GROUPS[activeGroup];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useGSAP(
    () => {
      if (!open || !panelRef.current) return;

      gsap.fromTo(
        panelRef.current,
        { yPercent: -100 },
        { yPercent: 0, duration: 0.65, ease: "power4.out" },
      );
    },
    { dependencies: [open] },
  );

  useGSAP(
    () => {
      if (!open || !contentRef.current || prefersReducedMotion()) return;

      gsap.fromTo(
        contentRef.current.querySelectorAll("[data-menu-link]"),
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.32,
          stagger: 0.025,
          ease: "power3.out",
        },
      );
    },
    { dependencies: [open, activeGroup] },
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-40 h-[100dvh] w-screen bg-black"
      role="dialog"
      aria-modal
      aria-label="Site menu"
    >
      <div
        ref={panelRef}
        className="mobile-menu-scroll beagine-scrollbar flex h-[100dvh] flex-col overflow-y-auto bg-black px-4 pb-5 pt-20 text-white sm:px-6 sm:pt-24 md:px-10 md:pb-8 md:pt-28 lg:px-14"
      >
        <div className="mx-auto flex w-full max-w-[1320px] flex-1 flex-col">
          <div className="grid gap-3 sm:gap-4 lg:flex-1 lg:grid-cols-[minmax(0,1fr)_320px]">
            <section className="bg-black px-1 py-4 sm:min-h-[430px] sm:rounded-[1.5rem] sm:border sm:border-white/8 sm:bg-[#111214] sm:p-6 md:p-8 lg:p-9">
              <div
                className="grid grid-cols-2 gap-2 sm:flex sm:overflow-x-auto sm:pb-2"
                role="tablist"
                aria-label="Menu sections"
              >
                {SITE_LINK_GROUPS.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    role="tab"
                    aria-selected={activeGroup === index}
                    aria-controls={`menu-panel-${index}`}
                    onClick={() => setActiveGroup(index)}
                    className={`shrink-0 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors sm:px-4 sm:text-sm md:px-5 ${
                      activeGroup === index
                        ? "bg-white text-black shadow-sm"
                        : "text-white/55 hover:bg-white/[0.07] hover:text-white"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              <div
                ref={contentRef}
                id={`menu-panel-${activeGroup}`}
                role="tabpanel"
                className="mt-6 sm:mt-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/35">
                  Explore {group.title}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-1 sm:mt-5 sm:gap-x-10 sm:gap-y-1 lg:grid-cols-3">
                  {group.links.map((link) => {
                    const external = link.href.startsWith("mailto:") || link.href.startsWith("http");
                    const className = "rounded-xl px-2.5 py-2.5 text-[13px] font-medium leading-snug text-white/70 transition-colors hover:bg-white/[0.07] hover:text-white sm:px-3 sm:py-3 sm:text-[15px]";

                    return external ? (
                      <a
                        key={`${group.title}-${link.label}`}
                        href={link.href}
                        data-menu-link
                        onClick={onClose}
                        className={className}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={`${group.title}-${link.label}`}
                        href={link.href}
                        data-menu-link
                        onClick={onClose}
                        className={className}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>

            <aside className="rounded-[1.25rem] border border-white/8 bg-[#111214] p-3 sm:rounded-[1.5rem] sm:p-4 md:p-5">
              <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/35">
                Quick actions
              </p>
              <div className="mt-1 grid grid-cols-2 gap-1 lg:grid-cols-1">
                {QUICK_ACTIONS.map((action, index) => {
                  const external = action.href.startsWith("mailto:") || action.href.startsWith("http");
                  const content = (
                    <>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF5F15]/15 text-xs font-semibold text-[#FF7B3D]">
                        0{index + 1}
                      </span>
                      <span>
                        <span className="hidden text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35 sm:block">
                          {action.eyebrow}
                        </span>
                        <span className="mt-1 block text-sm font-semibold text-white/85">
                          {action.title}
                        </span>
                        <span className="mt-1 hidden text-xs leading-relaxed text-white/40 sm:block">
                          {action.description}
                        </span>
                      </span>
                    </>
                  );
                  const className = "flex items-center gap-2 rounded-xl p-2 transition-colors hover:bg-white/[0.07] sm:items-start sm:gap-3 sm:rounded-2xl sm:p-3";

                  return external ? (
                    <a key={action.title} href={action.href} onClick={onClose} className={className}>
                      {content}
                    </a>
                  ) : (
                    <Link key={action.title} href={action.href} onClick={onClose} className={className}>
                      {content}
                    </Link>
                  );
                })}
              </div>
            </aside>
          </div>

          <div className="mt-4 flex flex-col gap-4 px-1 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:px-2">
            <div className="hidden flex-wrap gap-x-5 gap-y-2 sm:flex">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-white/40 transition-colors hover:text-[#FF7B3D]"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3">
              <Link
                href={WAITLIST_PATH}
                onClick={onClose}
                className="rounded-full border border-white/15 bg-white px-4 py-2.5 text-center text-sm font-semibold text-black sm:px-5"
              >
                Join waitlist
              </Link>
              <Link
                href={COMING_SOON_PATH}
                onClick={onClose}
                className="rounded-full bg-[#FF5F15] px-4 py-2.5 text-center text-sm font-semibold text-black sm:px-5"
              >
                Open app
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
