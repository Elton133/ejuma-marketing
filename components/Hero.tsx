import Link from "next/link";
import { APP_URL, WAITLIST_PATH } from "@/lib/constants";
import { HeroBackground } from "./HeroBackground";

export function Hero() {
  return (
    <section className="relative min-h-svh w-full overflow-hidden bg-black text-white">
      <HeroBackground />

      <div className="relative z-10 flex min-h-svh flex-col justify-end pt-24">
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-16 md:px-10 md:pb-20 lg:px-14 lg:pb-24">
          <div className="max-w-2xl">
            <h1
              data-hero-animate
              className="text-[clamp(2.5rem,6vw,4.75rem)] font-black leading-[1.02] tracking-tight"
            >
              Your {" "}
              <em className="text-[#FF5F15] not-italic">specialist </em>
              on your phone.
            </h1>

            <p
              data-hero-animate
              className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:mt-6 md:text-lg"
            >
              Search, book, and track a verified specialist — all from your phone.
            </p>

            <div
              data-hero-animate
              className="mt-8 flex flex-wrap gap-3 md:mt-10"
            >
              <Link
                href={WAITLIST_PATH}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#FF5F15] px-7 text-sm font-semibold text-black transition-opacity hover:opacity-90 md:h-[52px] md:px-8 md:text-base"
              >
                Join the waitlist
              </Link>
              <Link
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15 md:h-[52px] md:px-8 md:text-base"
              >
                Open app
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
