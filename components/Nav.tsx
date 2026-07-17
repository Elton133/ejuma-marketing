"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { APP_URL, COMING_SOON_PATH, NAV_LINKS, WAITLIST_PATH } from "@/lib/constants";
import { MobileNav } from "./MobileNav";
import { Logo } from "./Logo";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const showSolidNav = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <nav className="mx-auto flex max-w-[1440px] items-center px-6 py-4 md:px-10 lg:px-14">
        <div className="flex shrink-0 items-center mix-blend-difference text-white" onClick={() => setOpen(false)}>
          <Logo size="md" />
        </div>

        <div className="ml-auto flex items-center gap-5 md:gap-8">
          <div className="hidden items-center gap-6 lg:flex mix-blend-difference text-white">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={COMING_SOON_PATH}
              className="text-sm font-medium transition-opacity hover:opacity-70"
            >
              Open app
            </Link>
          </div>

          <Link
            href={WAITLIST_PATH}
            className="hidden rounded-full bg-[#FF5F15] px-5 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Join waitlist
          </Link>

          <button
            type="button"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-transparent text-white mix-blend-difference transition-opacity hover:opacity-70 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <MenuToggleIcon open={open} />
          </button>
        </div>
      </nav>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

function MenuToggleIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden
      className="transition-transform duration-300"
    >
      {open ? (
        <>
          <path d="M6 6l12 12" className="origin-center" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M5 8h14" />
          <path d="M5 16h14" />
        </>
      )}
    </svg>
  );
}
