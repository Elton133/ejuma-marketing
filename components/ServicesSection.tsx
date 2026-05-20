"use client";

import { useRef } from "react";
import { TRADES } from "@/lib/constants";
import { MicroLabel } from "./MicroLabel";

const TRADE_DETAILS: Record<string, { tag: string; blurb: string }> = {
  Plumber: { tag: "1–50", blurb: "Leaks, installs, and pipe work." },
  Electrician: { tag: "1–30", blurb: "Wiring, faults, and fittings." },
  Mason: { tag: "1–20", blurb: "Walls, foundations, and blocks." },
  Carpenter: { tag: "1–25", blurb: "Frames, doors, and custom wood." },
  Welder: { tag: "1–15", blurb: "Gates, frames, and metal fixes." },
  Painter: { tag: "1–40", blurb: "Interior and exterior finishes." },
  Tiler: { tag: "1–20", blurb: "Floors, walls, and bathrooms." },
  "AC Technician": { tag: "1–15", blurb: "Install, service, and repair." },
  Roofer: { tag: "1–10", blurb: "Sheets, leaks, and replacements." },
  "Auto Mechanic": { tag: "1–20", blurb: "Diagnostics and repairs." },
};

export function ServicesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="bg-[#fafafa] px-6 py-20 text-black md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <MicroLabel light>Trades & services</MicroLabel>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">
              A specialist for every job
            </h2>
            <p className="mt-2 text-black/60">
              From hot taps to full rewires — pick your trade and book verified
              workers nearby.
            </p>
          </div>
          <div className="flex gap-2">
            <CarouselButton label="Previous" onClick={() => scroll(-1)}>
              ←
            </CarouselButton>
            <CarouselButton label="Next" onClick={() => scroll(1)}>
              →
            </CarouselButton>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="mt-10 flex gap-4 overflow-x-auto pb-4 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="grid min-w-[280px] shrink-0 grid-cols-2 gap-3 self-stretch">
            {TRADES.slice(0, 4).map((trade) => (
              <TradeTile key={trade} trade={trade} compact />
            ))}
          </div>

          {TRADES.map((trade) => (
            <article
              key={`card-${trade}`}
              className="relative min-w-[260px] shrink-0 overflow-hidden rounded-[2rem] bg-zinc-900 text-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF5F15]/40 via-zinc-800 to-black" />
              <div className="relative flex h-full min-h-[320px] flex-col justify-end p-6">
                <p className="text-sm text-white/75">
                  {TRADE_DETAILS[trade]?.blurb ?? "Verified specialists near you."}
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight">
                  {trade}
                </h3>
                <span className="mt-4 inline-flex w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                  Book on platform
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TradeTile({
  trade,
  compact,
}: {
  trade: string;
  compact?: boolean;
}) {
  const detail = TRADE_DETAILS[trade];
  return (
    <div
      className={`flex flex-col justify-between rounded-[1.5rem] bg-[#f0f0f0] p-4 ${compact ? "min-h-[120px]" : "min-h-[140px]"}`}
    >
      <div className="flex items-start justify-between gap-2">
        <TradeIcon trade={trade} />
        {detail?.tag && (
          <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-black/70">
            {detail.tag}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm font-bold tracking-tight">{trade}</p>
    </div>
  );
}

function TradeIcon({ trade }: { trade: string }) {
  const initial = trade.charAt(0);
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-sm font-bold text-[#FF5F15]">
      {initial}
    </span>
  );
}

function CarouselButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white text-lg transition-colors hover:border-[#FF5F15] hover:text-[#FF5F15]"
    >
      {children}
    </button>
  );
}
