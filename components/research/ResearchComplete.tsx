"use client";

import Link from "next/link";
import { WAITLIST_PATH } from "@/lib/research-questions";
import { SurveyShareBlock } from "./SurveyShareBlock";
import { MicroLabel } from "../MicroLabel";

export function ResearchComplete() {
  return (
    <section className="bg-black px-6 pb-20 pt-28 text-white md:pb-28 md:pt-32">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FF5F15]/20 text-2xl text-[#FF5F15]">
          ✓
        </div>

        <div className="mt-8">
          <MicroLabel>Thank you</MicroLabel>
        </div>
        <h1 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight">
          Your answers are in
        </h1>
        <p className="mx-auto mt-4 max-w-md text-white/65">
          Know someone who should take this survey? Share the link or QR code
          below.
        </p>

        <SurveyShareBlock sharePath={WAITLIST_PATH} />

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Back to home
          </Link>
          <Link
            href={WAITLIST_PATH}
            className="inline-flex justify-center rounded-full bg-[#FF5F15] px-6 py-3 text-sm font-semibold text-black"
          >
            Join waitlist
          </Link>
        </div>
      </div>
    </section>
  );
}
