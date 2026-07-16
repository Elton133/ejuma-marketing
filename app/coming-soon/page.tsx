import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { MicroLabel } from "@/components/MicroLabel";
import { WAITLIST_PATH, HERO_IMAGES } from "@/lib/constants";
import { HugeiconsIcon } from "@hugeicons/react";
import { Notification03Icon } from "@hugeicons/core-free-icons";

export const metadata: Metadata = {
  title: "Coming Soon - Beagine",
  description: "We are currently building this feature. Join the waitlist to be the first to know when it launches.",
};

export default function ComingSoonPage() {
  return (
    <>
      <Nav />
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 pb-20 pt-24 text-white">
        
        {/* Premium Background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={HERO_IMAGES[0]} 
            alt="" 
            fill 
            className="object-cover opacity-[0.15] mix-blend-luminosity" 
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          <div className="hero-grain absolute inset-0 opacity-50 pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-2xl" data-reveal-stagger>
          
          <div className="glass-panel mx-auto flex flex-col items-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-10 text-center shadow-2xl md:p-16">
            {/* Glowing orb behind the content */}
            <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF5F15]/25 blur-[100px]" />
            
            <div data-reveal-item>
              <MicroLabel>In Development</MicroLabel>
            </div>

            <h1 data-reveal-item className="mt-6 text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
              We're building <br />
              <em className="text-[#FF5F15] not-italic">something special</em>
            </h1>
            
            <p data-reveal-item className="mt-6 max-w-md text-[17px] leading-relaxed text-white/60">
              This feature is currently in active development. Our engineering team is working hard to bring it to you very soon on the App Store and Google Play.
            </p>

            <div data-reveal-item className="mt-10 flex w-full flex-col items-center gap-6">
              <Link
                href={WAITLIST_PATH}
                className="btn-premium inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#FF5F15] px-8 text-[15px] font-semibold text-black hover:bg-[#FF7335] sm:w-auto"
              >
                <HugeiconsIcon icon={Notification03Icon} size={20} color="black" />
                Notify me when it's ready
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-white/50 transition-colors hover:text-white"
              >
                Return to home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
