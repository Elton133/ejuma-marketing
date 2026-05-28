import Image from "next/image";
import { MicroLabel } from "./MicroLabel";

export function TradesBar() {
  return (
    <section className="bg-[#fafafa] py-14 text-black md:py-20">
      <div className="mx-auto max-w-[1300px] px-6 md:px-10 lg:px-14">
        <p className="mb-5 text-center text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">Partners</p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:justify-between">
          <Image src="/black.png" alt="Trades Bar" width={100} height={100} />
        </div>

        <MicroLabel light className="mt-16 lg:mt-20">Mission</MicroLabel>
        <div className="mt-6 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
          <p className="max-w-xs text-lg text-black/70">
            Connecting people to trusted specialists, anytime they need help.
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
