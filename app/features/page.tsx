import type { Metadata } from "next";
import Link from "next/link";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { MicroLabel } from "@/components/MicroLabel";
import { Nav } from "@/components/Nav";
import { WAITLIST_PATH } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Find specialists instantly, track them live on a map, get SMS alerts, and read full profiles before you confirm. See everything Beagine can do.",
};

export default function FeaturesPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Page hero */}
        <section className="bg-black px-6 pb-20 pt-36 text-white md:pb-24 md:pt-40">
          <div className="mx-auto max-w-[1200px]">
            <MicroLabel>Platform features</MicroLabel>
            <h1
              data-hero-animate
              className="mt-4 max-w-3xl text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight"
            >
              Built to make finding help{" "}
              <em className="text-[#FF5F15] not-italic">effortless</em>
            </h1>
            <p
              data-hero-animate
              className="mt-5 max-w-xl text-lg leading-relaxed text-white/65"
            >
              From finding the right person to tracking their arrival — every
              feature is built for how people actually get things done.
            </p>
            <div data-hero-animate className="mt-8 flex flex-wrap gap-3">
              <Link
                href={WAITLIST_PATH}
                className="btn-premium inline-flex h-12 items-center justify-center rounded-full bg-[#FF5F15] px-7 text-sm font-semibold text-black hover:bg-[#FF7335] md:h-[52px] md:px-8 md:text-base"
              >
                Join the waitlist
              </Link>
            </div>
          </div>
        </section>

        {/* Feature rows + worker section */}
        <Features />
      </main>
      <Footer />
    </>
  );
}
