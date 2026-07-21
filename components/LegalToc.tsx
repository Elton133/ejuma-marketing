"use client";

import { useEffect, useState } from "react";

type TocItem = { id: string; text: string };

export function LegalToc({ contentId = "legal-content" }: { contentId?: string }) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

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

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="hidden lg:block">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
        On this page
      </p>
      <ul className="space-y-3 border-l border-white/10 pl-4">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
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
