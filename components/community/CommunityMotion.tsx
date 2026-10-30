"use client";

import { gsap } from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion/register-gsap";
import { CAST, Character } from "../story/Character";
import { idleCast, wave } from "../story/motion";

const LINKS = [
  { href: "/community", label: "Connect" },
  { href: "/community/updates", label: "Updates" },
  { href: "/community/ask", label: "Ask Beagine" },
  { href: "/community/learn", label: "Learn" },
  { href: "/community/support", label: "Support" },
] as const;

/** Section tabs; the page you're on is filled in. */
export function CommunityNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Community" className="flex gap-2 overflow-x-auto pb-2">
      {LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
              active ? "border-[#FF5F15] bg-[#FF5F15] font-semibold text-black" : "border-white/15 text-white/70 hover:border-[#FF5F15]/60 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

/** The customer, the specialist and the team pop up beside the title, wave, then idle. */
export function HeroCast() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const faces = gsap.utils.toArray<HTMLElement>("[data-face]");
      const tl = gsap.timeline({ delay: 0.5 });
      tl.fromTo(faces, { y: 60, scale: 0.4, autoAlpha: 0, rotate: (i) => (i - 1) * 14 }, { y: 0, scale: 1, autoAlpha: 1, rotate: 0, duration: 0.9, ease: "elastic.out(1, 0.6)", stagger: 0.14 });
      faces.forEach((face, i) => wave(tl, face, 0.5 + i * 0.25, 2));
      idleCast(ref.current);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="hidden items-end lg:flex" aria-hidden="true">
      {[CAST.customer, CAST.support, CAST.specialist].map((look, i) => (
        <div
          key={i}
          data-face
          className={`overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/[.02] ${i === 1 ? "z-10 -mx-4 h-40 w-40" : "h-28 w-28"}`}
        >
          <Character look={look} className="h-full w-full" />
        </div>
      ))}
    </div>
  );
}
