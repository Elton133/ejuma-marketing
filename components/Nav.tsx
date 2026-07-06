"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { NAV_LINKS, WAITLIST_PATH } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/motion/register-gsap";
import { MegaMenu } from "./MegaMenu";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (open && headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

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

  useGSAP(() => {
    if (!navRef.current || prefersReducedMotion()) return;

    // Entrance animation for navbar items
    gsap.fromTo(
      navRef.current.children,
      { y: -15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1,
      }
    );
  }, []);

  const showSolidNav = scrolled || open;

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        showSolidNav
          ? "bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav ref={navRef} className="mx-auto flex h-[72px] max-w-[1440px] items-center px-6 md:px-10 lg:px-14">
        {/* Logo — left */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo1.png"
            alt="Beagine"
            width={70}
            height={20}
            className="h-5 w-auto"
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </Link>

        {/* Right cluster — Bolt-style: links, CTA, menu */}
        <div className="ml-auto flex items-center gap-4 md:gap-6 lg:gap-8">
          <a
            href={NAV_LINKS[0].href}
            className="hidden text-sm font-medium text-white/80 transition-all hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] sm:inline-flex"
          >
            Contact
          </a>

          <Link
            href={WAITLIST_PATH}
            className="hidden rounded-full bg-[#FF5F15] px-5 py-2 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-[#ff7536] hover:shadow-[0_0_20px_rgba(255,95,21,0.4)] md:inline-flex"
          >
            Join waitlist
          </Link>

          <button
            type="button"
            className="group flex h-10 w-10 items-center justify-center text-white transition-opacity hover:opacity-80"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <MenuToggleIcon open={open} />
          </button>
        </div>
      </nav>

      <MegaMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

function MenuToggleIcon({ open }: { open: boolean }) {
  const hamburgerRef = useRef<SVGSVGElement>(null);
  const closeRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (open) {
      gsap.to(hamburgerRef.current, { rotation: 90, opacity: 0, scale: 0.5, duration: 0.4, ease: "power3.inOut" });
      gsap.to(closeRef.current, { rotation: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.inOut" });
    } else {
      gsap.to(hamburgerRef.current, { rotation: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.inOut" });
      gsap.to(closeRef.current, { rotation: -90, opacity: 0, scale: 0.5, duration: 0.4, ease: "power3.inOut" });
    }
  }, [open]);

  return (
    <div className="relative flex h-[22px] w-[22px] items-center justify-center">
      {/* Hamburger */}
      <svg
        ref={hamburgerRef}
        className="absolute inset-0"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        aria-hidden
      >
        <path d="M4 8h16" />
        <path d="M4 16h16" />
      </svg>
      {/* Close */}
      <svg
        ref={closeRef}
        className="absolute inset-0"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        aria-hidden
        style={{ opacity: 0, transform: "scale(0.5) rotate(-90deg)" }}
      >
        <path d="M6 6l12 12" />
        <path d="M18 6L6 18" />
      </svg>
    </div>
  );
}
