import { TRADES } from "@/lib/constants";
import Image from "next/image";

export function TradesBar() {
  return (
    <section className="bg-[#fafafa] py-14 text-black md:py-20">
      <div className="mx-auto max-w-[1300px] px-6 md:px-10 lg:px-14">
        <p className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-center">Partners</p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:justify-between">
          <Image src="/black.png" alt="Trades Bar" width={100} height={100} />
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16 lg:mt-20">
          <p className="max-w-xs text-lg text-black/70">
            Bringing you skilled specialists — verified, bookable, and
            trackable.
          </p>
          <h2 className="font-heading text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.1]">
            Access plumbers, electricians, masons, and more - <em className="text-[#FF5F15] not-italic">all in one place </em>
            with flexible booking for how, where, and when you need work done.
          </h2>
        </div>
      </div>
    </section>
  );
}
