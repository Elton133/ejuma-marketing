import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { TeamGrid } from "@/components/TeamGrid";
import { HERO_IMAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Leadership - Beagine",
  description: "Meet the bold thinkers and builders driving Beagine's mission.",
};

export default function LeadershipPage() {
  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col">
        
        {/* 1. Hero Section (Dark) */}
        <section className="relative flex min-h-[50vh] flex-col justify-end bg-black px-6 pb-20 pt-36 md:px-14 md:pb-24 md:pt-40 lg:px-24 text-left">
          {/* Cinematic Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src={HERO_IMAGES[4]}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="hero-image-overlay absolute inset-0" />
            <div className="hero-grain absolute inset-0 pointer-events-none opacity-30" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1200px]" data-reveal-stagger>
            <div data-reveal-item className="mb-4 flex items-center space-x-2 text-sm font-medium text-[#FF5F15]">
              <Link href="/about" className="transition-colors hover:text-white uppercase tracking-wider">About Us</Link>
            </div>
            
            <h1 data-reveal-item className="mt-4 max-w-3xl text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-white">
              Meet the team
            </h1>
          </div>
        </section>

        {/* 2. Intro Statement (Light) */}
        <section className="bg-[#fafafa] px-6 py-24 text-black md:px-14 md:py-32 lg:px-24">
          <div className="mx-auto flex max-w-7xl flex-col gap-12 md:flex-row md:gap-24" data-reveal-stagger>
            <div data-reveal-item className="flex-1">
              <p className="text-2xl font-bold leading-snug md:text-3xl">
                Beagine's leadership team brings together bold thinkers, builders, and problem-solvers from around the world.
              </p>
            </div>
            <div data-reveal-item className="flex-1">
              <p className="text-lg leading-relaxed text-black/70 md:text-xl">
                With deep experience spanning technology, trades, operations, and product, they're united by one mission — to build the infrastructure that makes finding and hiring skilled specialists effortless. They lead teams worldwide in transforming how millions of people manage local engineering services and commercial projects.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Interactive Team Grid */}
        <TeamGrid />

      </main>
      <Footer />
    </>
  );
}
