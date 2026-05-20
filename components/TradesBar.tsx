import { TRADES } from "@/lib/constants";

export function TradesBar() {
  return (
    <section className="bg-[#fafafa] py-14 text-black md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:justify-between">
          {TRADES.map((trade) => (
            <span
              key={trade}
              className="text-sm font-semibold tracking-tight text-black/80 md:text-base"
            >
              {trade}
            </span>
          ))}
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16 lg:mt-20">
          <p className="max-w-xs text-lg text-black/70">
            Bringing you Ghana&apos;s skilled trades — verified, bookable, and
            trackable.
          </p>
          <h2 className="text-[clamp(1.75rem,4vw,3.25rem)] font-bold leading-[1.1] tracking-tight">
            Access plumbers, electricians, masons, and more — all in one place,
            with flexible booking for how, where, and when you need work done.
          </h2>
        </div>
      </div>
    </section>
  );
}
