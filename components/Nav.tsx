"use client";

import Link from "next/link";
import { useState } from "react";
import { APP_URL, NAV_LINKS, WAITLIST_PATH } from "@/lib/constants";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-4 md:px-10 lg:px-14">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="font-heading text-lg font-bold tracking-tight text-white md:text-xl">
            Beagine
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/75 transition-colors hover:text-white"
          >
            Open app
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={WAITLIST_PATH}
            className="hidden rounded-full bg-[#FF5F15] px-5 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Join waitlist
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-white lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-black px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-1 text-sm text-white/85"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 text-sm text-white/85"
            >
              Open app
            </Link>
            <Link
              href={WAITLIST_PATH}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-[#FF5F15] text-sm font-semibold text-black"
              onClick={() => setOpen(false)}
            >
              Join waitlist
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
