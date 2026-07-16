import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { TeamGrid } from "@/components/TeamGrid";

export const metadata: Metadata = {
  title: "Leadership - Beagine",
  description: "Meet the bold thinkers and builders driving Beagine's mission.",
};

export default function LeadershipPage() {
  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col bg-black pt-16">
        
        {/* 1. Hero Section (Dark) */}
        <section className="relative bg-[#0a0f0d] px-6 py-24 md:px-14 lg:px-24 xl:py-32">
          {/* Subtle Grain & Gradient */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1a221f,transparent_70%)] opacity-40" />
            <div className="hero-grain absolute inset-0 pointer-events-none opacity-30" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl" data-reveal-stagger>
            <div data-reveal-item className="mb-6 flex items-center space-x-2 text-sm font-medium text-white/60">
              <Link href="/about" className="transition-colors hover:text-white">About Beagine</Link>
              <span>›</span>
              <span className="text-white">Leadership</span>
            </div>
            
            <h1 data-reveal-item className="text-[clamp(3.5rem,8vw,5.5rem)] font-bold leading-none tracking-tight text-white">
              Meet our leaders
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
