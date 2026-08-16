"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { prefersReducedMotion, registerGsap } from "@/lib/motion/register-gsap";

type TocItem = { id: string; text: string };

export function LegalToc({ contentId = "legal-content" }: { contentId?: string }) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = document.getElementById(contentId);
    if (!container) return;

    const headings = Array.from(container.querySelectorAll<HTMLHeadingElement>("h2[id]"));

    const observer = new IntersectionObserver(
      (entries) => {
        setItems((prev) =>
          prev.length ? prev : headings.map((h) => ({ id: h.id, text: h.textContent ?? "" })),
        );
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-100px 0px -70% 0px" },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [contentId]);

  // Pin the TOC while the content column scrolls (desktop only). CSS `sticky`
  // breaks inside ScrollSmoother's transformed content, so we pin via
  // ScrollTrigger with pinType "transform".
  useEffect(() => {
    if (items.length === 0 || prefersReducedMotion()) return;
    registerGsap();

    const nav = navRef.current;
    const content = document.getElementById(contentId);
    if (!nav || !content) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const st = ScrollTrigger.create({
        trigger: content,
        start: "top top+=128",
        end: "bottom bottom",
        pin: nav,
        pinSpacing: false,
        pinType: "transform",
        invalidateOnRefresh: true,
      });
      return () => st.kill();
    });

    // Recalculate once the TOC has rendered / smoother is ready
    const refresh = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      clearTimeout(refresh);
      mm.revert();
    };
  }, [items, contentId]);

  // Keep the active item visible inside the (internally scrolling) TOC list as
  // the reader moves through a long document.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !activeId) return;
    const list = nav.querySelector("ul");
    const link = nav.querySelector<HTMLElement>(`a[data-id="${activeId}"]`);
    if (!list || !link) return;
    const listRect = list.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    if (linkRect.top < listRect.top || linkRect.bottom > listRect.bottom) {
      const delta =
        linkRect.top - listRect.top - listRect.height / 2 + linkRect.height / 2;
      list.scrollTo({ top: list.scrollTop + delta, behavior: "smooth" });
    }
  }, [activeId]);

  // Anchor jumps must go through ScrollSmoother, otherwise the native jump
  // desyncs from the smoother's transform and breaks the pinned sidebar.
  const handleJump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const smoother = ScrollSmoother.get();
    // Heading IDs can start with a digit — a valid HTML id but an invalid CSS
    // selector — so resolve via getElementById, not a "#id" query.
    const target = document.getElementById(id);
    if (!smoother || !target) return; // no smoother (reduced motion) → native anchor is fine
    e.preventDefault();
    // Compute the absolute scroll offset ourselves (the element-based scrollTo
    // with a position string misfires for far-down targets), then scroll there.
    const y = target.getBoundingClientRect().top + smoother.scrollTop() - 100;
    smoother.scrollTo(y, true);
  };

  if (items.length === 0) return null;

  return (
    <nav ref={navRef} aria-label="Table of contents" className="hidden lg:block">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
        On this page
      </p>
      {/* List caps to the viewport and scrolls internally so long TOCs stay
          reachable while the nav is pinned. */}
      <ul className="max-h-[calc(100vh-13rem)] space-y-3 overflow-y-auto border-l border-white/10 pl-4 pr-2 [scrollbar-width:thin]">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              data-id={item.id}
              onClick={(e) => handleJump(e, item.id)}
              className={`block text-sm leading-snug transition-colors ${
                activeId === item.id ? "text-[#FF5F15]" : "text-white/50 hover:text-white/80"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
