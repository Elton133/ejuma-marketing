"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { APP_ICONS } from "@/lib/app-icons";
import { prefersReducedMotion, registerGsap } from "@/lib/motion/register-gsap";
import { CAST, Character } from "./story/Character";
import { idleCast, nod, wave } from "./story/motion";
import { Typewriter } from "./story/Typewriter";

const APPS = [
  { role: "customer", label: "Customer", line: "Find trusted help", href: "/customers", look: CAST.customer },
  { role: "specialist", label: "Specialist", line: "Turn skill into opportunity", href: "/specialists", look: CAST.specialist },
  { role: "vendor", label: "Vendor", line: "Bring your shop online", href: "/vendors", look: CAST.vendor },
] as const;

/** How long each app stays in the spotlight while nobody is pointing at one. */
const CYCLE_MS = 3200;

/**
 * "Where do you fit?": the three apps take turns in the spotlight. The active
 * one lifts, its person pops out of the icon and waves, and its line types
 * out. Hovering or focusing an app picks it (and pauses the turn-taking);
 * clicking goes to that app's page.
 */
export function EcosystemPicker() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Take turns only while on screen and nobody is choosing.
  useEffect(() => {
    if (paused || !inView || prefersReducedMotion()) return;
    const id = window.setInterval(() => setActive((current) => (current + 1) % APPS.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [paused, inView]);

  useGSAP(
    () => {
      registerGsap();
      const trigger = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 85%",
        end: "bottom 15%",
        onToggle: (self) => setInView(self.isActive),
      });
      if (!prefersReducedMotion()) idleCast(rootRef.current);
      return () => trigger.kill();
    },
    { scope: rootRef }
  );

  // The active app's person pops out and waves; the others tuck away.
  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      const reduced = prefersReducedMotion();
      q("[data-app]").forEach((card, i) => {
        const on = i === active;
        gsap.to(card, { y: on ? -8 : 0, scale: on ? 1 : 0.96, opacity: on ? 1 : 0.55, duration: reduced ? 0 : 0.45, ease: "power3.out" });
        const person = card.querySelector("[data-person]");
        if (!person) return;
        if (on) {
          const tl = gsap.timeline();
          tl.fromTo(person, { scale: 0.6, y: 18, autoAlpha: 0 }, { scale: 1, y: 0, autoAlpha: 1, duration: reduced ? 0 : 0.6, ease: "back.out(2.2)" });
          if (!reduced) {
            nod(tl, person, 0.2);
            wave(tl, person, 0.2, 2);
          }
        } else {
          gsap.to(person, { scale: 0.6, y: 18, autoAlpha: 0, duration: reduced ? 0 : 0.25, ease: "power2.in" });
        }
      });
    },
    { scope: rootRef, dependencies: [active] }
  );

  return (
    <div
      ref={rootRef}
      className="grid grid-cols-3 gap-3"
      onMouseLeave={() => setPaused(false)}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      {APPS.map((app, i) => (
        <Link
          key={app.role}
          href={app.href}
          data-app
          onMouseEnter={() => {
            setPaused(true);
            setActive(i);
          }}
          onFocus={() => {
            setPaused(true);
            setActive(i);
          }}
          aria-label={`${app.label} app: ${app.line}`}
          className="group relative min-w-0 rounded-[1.6rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5F15]"
        >
          <div className="relative">
            <Image
              src={APP_ICONS[app.role]}
              alt=""
              width={256}
              height={256}
              sizes="(min-width: 1024px) 240px, 30vw"
              className={`aspect-square w-full rounded-[1.6rem] object-contain ring-1 transition-[box-shadow] duration-500 ${
                i === active ? "ring-[#FF5F15]/60 shadow-[0_24px_60px_-20px_rgba(255,95,21,.45)]" : "ring-white/10"
              }`}
            />
            {/* Their person, popping out of the app's corner. */}
            <span
              data-person
              aria-hidden
              className="invisible absolute -right-3 -top-5 block h-[42%] w-[42%] overflow-hidden rounded-full border-[3px] border-black bg-[#1c1c1e] sm:-right-4 sm:-top-6"
            >
              <Character look={app.look} className="h-full w-full" />
            </span>
          </div>
          <p className="mt-4 text-sm font-semibold sm:text-xl">
            {app.label}
            <span aria-hidden className="ml-2 inline-block transition-transform group-hover:translate-x-1">
              ↗
            </span>
          </p>
          <div className="mt-1 min-h-[2.5em] text-xs text-white/55">
            {i === active ? <Typewriter key={`${app.role}-${active}`} lines={[app.line]} speed={28} delay={150} /> : <p>{app.line}</p>}
          </div>
        </Link>
      ))}
    </div>
  );
}
