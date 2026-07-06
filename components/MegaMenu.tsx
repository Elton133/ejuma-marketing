"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import {
  APP_URL,
  INSTALL_PATH,
  INSTALL_WORKER,
  TRADES,
  WAITLIST_PATH,
} from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion/register-gsap";
import { LEGAL_LINKS } from "@/lib/legal-links";

type MegaMenuProps = {
  open: boolean;
  onClose: () => void;
};

type TabId = "product" | "workers" | "company";

const TABS: { id: TabId; label: string }[] = [
  { id: "product", label: "Product" },
  { id: "workers", label: "For workers" },
  { id: "company", label: "Company" },
];

const TAB_COLUMNS: Record<
  TabId,
  { title: string; links: { label: string; href: string; external?: boolean }[] }[]
> = {
  product: [
    {
      title: "Get started",
      links: [
        { label: "How it works", href: "/#how-it-works" },
        { label: "Features", href: "/#features" },
        { label: "Install app", href: INSTALL_PATH },
        { label: "Open app", href: APP_URL, external: true },
      ],
    },
    {
      title: "Trades",
      links: TRADES.slice(0, 5).map((trade) => ({
        label: trade,
        href: "/#how-it-works",
      })),
    },
    {
      title: "More trades",
      links: TRADES.slice(5).map((trade) => ({
        label: trade,
        href: "/#how-it-works",
      })),
    },
  ],
  workers: [
    {
      title: "Join & earn",
      links: [
        { label: "Join the waitlist", href: WAITLIST_PATH },
        { label: "Install worker app", href: INSTALL_WORKER, external: true },
        { label: "How it works", href: "/#how-it-works" },
      ],
    },
    {
      title: "Trades we cover",
      links: TRADES.slice(0, 6).map((trade) => ({
        label: trade,
        href: WAITLIST_PATH,
      })),
    },
    {
      title: "Support",
      links: [
        { label: "Contact support", href: "mailto:support@beagine.app" },
        { label: "Install app", href: INSTALL_PATH },
      ],
    },
  ],
  company: [
    {
      title: "About",
      links: [
        { label: "About Beagine", href: "/#about" },
        { label: "Join the waitlist", href: WAITLIST_PATH },
        { label: "Install app", href: INSTALL_PATH },
      ],
    },
    {
      title: "Legal",
      links: LEGAL_LINKS.map((link) => ({
        label: link.label,
        href: link.href,
      })),
    },
    {
      title: "Connect",
      links: [
        { label: "Contact support", href: "mailto:support@beagine.app" },
        { label: "Facebook", href: "https://facebook.com/beagineghana", external: true },
        { label: "Instagram", href: "https://instagram.com/beagineghana", external: true },
        { label: "X / Twitter", href: "https://twitter.com/beagineghana", external: true },
      ],
    },
  ],
};

const SIDEBAR_CARDS = [
  {
    title: "Join the waitlist",
    subtitle: "Get notified when we launch in your area",
    href: WAITLIST_PATH,
  },
  {
    title: "Become a specialist",
    subtitle: "Earn on your terms with Beagine",
    href: WAITLIST_PATH,
  },
  {
    title: "Install the app",
    subtitle: "Add Beagine to your home screen",
    href: INSTALL_PATH,
  },
];

export function MegaMenu({ open, onClose }: MegaMenuProps) {
  const [activeTab, setActiveTab] = useState<TabId>("product");
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) setActiveTab("product");
  }, [open]);

  useGSAP(
    () => {
      const panel = panelRef.current;
      const overlay = overlayRef.current;
      if (!panel || !overlay) return;

      if (prefersReducedMotion()) {
        gsap.set(panel, { opacity: open ? 1 : 0, y: 0, pointerEvents: open ? "auto" : "none" });
        gsap.set(overlay, { opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" });
        return;
      }

      if (!open) {
        gsap.to(panel, {
          y: -20,
          opacity: 0,
          scaleY: 0.95,
          duration: 0.4,
          ease: "power3.in",
          onComplete: () => {
            gsap.set(panel, { pointerEvents: "none" });
          }
        });
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.4,
          ease: "power3.in",
          onComplete: () => {
            gsap.set(overlay, { pointerEvents: "none" });
          }
        });
        return;
      }

      gsap.set([panel, overlay], { pointerEvents: "auto" });
      gsap.to(overlay, { opacity: 1, duration: 0.4, ease: "power3.out" });
      gsap.fromTo(
        panel,
        { y: -30, opacity: 0, scaleY: 0.95, transformOrigin: "top center" },
        { y: 0, opacity: 1, scaleY: 1, duration: 0.6, ease: "power4.out" }
      );
    },
    { dependencies: [open] }
  );

  useGSAP(
    () => {
      const content = contentRef.current;
      if (!content || !open) return;

      const links = content.querySelectorAll("[data-menu-link]");

      if (prefersReducedMotion()) {
        gsap.set(links, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        links,
        { opacity: 0, y: 15, x: -5 },
        { opacity: 1, y: 0, x: 0, duration: 0.5, stagger: 0.03, ease: "power3.out" }
      );
    },
    { dependencies: [open, activeTab] }
  );

  const columns = TAB_COLUMNS[activeTab];

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 top-[72px] z-40 bg-black/50 opacity-0 pointer-events-none"
        aria-hidden
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className="fixed inset-x-0 top-[72px] z-50 mx-auto w-full lg:px-8 lg:max-w-[1440px] opacity-0 pointer-events-none"
        role="dialog"
        aria-modal
        aria-label="Navigation menu"
      >
        <div className="overflow-hidden bg-black lg:rounded-b-2xl">
          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto px-4 py-4 md:px-8 lg:px-10">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex max-h-[calc(100vh-140px)] flex-col lg:max-h-[520px] lg:flex-row">
            {/* Link columns */}
            <div
              ref={contentRef}
              className="flex-1 overflow-y-auto px-4 pb-8 md:px-8 lg:px-10 lg:pb-10"
            >
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
                {columns.map((column) => (
                  <div key={column.title} className="flex flex-col">
                    <h3 className="mb-4 text-sm font-semibold text-white/90">
                      {column.title}
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          {link.external ? (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={onClose}
                              data-menu-link
                              className="text-[15px] font-medium text-white/55 transition-colors hover:text-[#FF5F15]"
                            >
                              {link.label}
                            </a>
                          ) : (
                            <Link
                              href={link.href}
                              onClick={onClose}
                              data-menu-link
                              className="text-[15px] font-medium text-white/55 transition-colors hover:text-[#FF5F15]"
                            >
                              {link.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar cards */}
            <div className="w-full shrink-0 overflow-y-auto px-4 pb-8 md:px-8 lg:w-[380px] lg:px-10 lg:pb-10 xl:w-[420px]">
              <div className="flex flex-col gap-2">
                {SIDEBAR_CARDS.map((card) => (
                  <Link
                    key={card.title}
                    href={card.href}
                    onClick={onClose}
                    data-menu-link
                    className="group flex items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-white/[0.06]"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-white group-hover:text-[#FF5F15]">
                        {card.title}
                      </h4>
                      <p className="mt-0.5 text-xs text-white/45">
                        {card.subtitle}
                      </p>
                    </div>
                    <span className="text-white/25 transition-colors group-hover:text-[#FF5F15]">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
