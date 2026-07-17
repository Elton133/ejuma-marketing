import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { HERO_IMAGES, WAITLIST_PATH } from "@/lib/constants";
import { MicroLabel } from "@/components/MicroLabel";

export const metadata: Metadata = {
  title: "About Us - Beagine",
  description: "Beagine is a globally relevant engineering services platform connecting skilled tradespeople with customers instantly.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      {/* Ensure main starts under nav, nav is fixed */}
      <main className="flex min-h-screen flex-col bg-black">

        {/* ── Hero Section ────────────────────────────────────── */}
        <section className="relative flex min-h-[70vh] flex-col justify-center overflow-hidden px-6 pt-24 pb-20 text-left">
          {/* Cinematic Background */}
          <div className="absolute inset-0 z-0">
            <Image 
              src={HERO_IMAGES[4]} 
              alt="" 
              fill 
              className="object-cover opacity-[0.25] mix-blend-luminosity" 
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
            <div className="hero-grain absolute inset-0 opacity-50 pointer-events-none" />
          </div>

          <div className="relative z-10 w-full mx-auto max-w-[1440px] md:px-10 lg:px-14" data-reveal-stagger>
          <MicroLabel>About Us</MicroLabel>
            <h1 data-reveal-item className="mt-6 text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-none tracking-tight text-white">
              About <span className="text-[#FF5F15]">Beagine</span>
            </h1>
            <p data-reveal-item className="mt-8 max-w-3xl text-lg leading-relaxed text-white/65">
              Beagine is a globally relevant engineering services platform connecting skilled tradespeople, merchants, and customers with fast, reliable service across local towns and major cities.
            </p>
          </div>
        </section>

        {/* 2. Fast Facts (Light/White) */}
        <section id="about" className="bg-[#fafafa] px-6 py-24 text-black md:px-14 md:py-32 lg:px-24">
          <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:gap-24" data-reveal-stagger>
            <div data-reveal-item className="flex-1">
              <p className="text-xl font-medium leading-relaxed md:text-2xl">
                Beagine empowers <strong className="font-bold">thousands of verified specialists</strong>, with local hubs forming rapidly across our pilot areas to serve demand.
              </p>
            </div>
            <div data-reveal-item className="flex-1">
              <p className="text-lg leading-relaxed text-black/70">
                The Beagine platform connects customers to convenient, reliable engineering services while supporting flexible, high-earning opportunities for skilled tradespeople, merchants, and engineers.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Massive Cinematic Image (Dark) */}
        <section className="relative h-[50vh] min-h-[400px] w-full bg-black md:h-[70vh]">
          {/* Brush Effect Divider */}
          <div 
            className="absolute left-0 top-0 z-20 h-[100px] w-full"
            style={{
              background: "url('/brush-down.png') no-repeat center top",
              backgroundSize: "contain",
            }}
          />
          <Image
            src={HERO_IMAGES[0]} 
            alt="Beagine specialists"
            fill
            className="object-cover object-[center_35%] opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent" />
        </section>

        {/* 4. Our Mission (Dark) */}
        <section id="mission" className="bg-[#000000] px-6 py-24 text-white md:px-14 md:py-32 lg:px-24">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3 md:gap-16" data-reveal-stagger>
            <div data-reveal-item className="flex flex-col">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Our mission</h2>
              <p className="mt-6 text-xl font-medium leading-snug md:text-2xl">
                We're building infrastructure for reliable trades, not endless searching — <span className="text-white/60">with verified skills, faster arrivals, and complete peace of mind.</span>
              </p>
               <div data-hero-animate className="mt-8 flex flex-wrap gap-3">
              <Link
                href={WAITLIST_PATH}
                className="btn-premium inline-flex h-12 items-center justify-center rounded-full bg-[#FF5F15] px-7 text-sm font-semibold text-black hover:bg-[#FF7335] md:h-[52px] md:px-8 md:text-base"
              >
                Join our mission
              </Link>
            </div>
            </div>
            
            <div data-reveal-item className="flex flex-col">
              <p className="text-lg leading-relaxed text-white/70">
                Beagine's mission is to help people find skilled workers in ways that make hiring work better for everyone. That means reducing the friction of finding a plumber, electrician, or mason, and offering a shared platform that is efficient, accessible, and highly sustainable.
              </p>
            </div>

            <div data-reveal-item className="flex flex-col">
              <p className="text-lg leading-relaxed text-white/70">
                Every Beagine booking helps lower stress, build local trust, and give people back their time, money, and peace of mind when dealing with home and commercial projects.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Get to Know Beagine (Light/White) */}
        <section id="leadership" className="w-full bg-[#fafafa] py-16 text-black md:py-20">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14">
            <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">Get to know Beagine</h2>
            
            <div className="flex flex-wrap justify-center gap-6 lg:justify-start" data-reveal-stagger>
              
              {/* Card 1 */}
              <div data-reveal-item className="group relative flex h-[480px] w-full max-w-[350px] flex-col justify-end overflow-hidden rounded-2xl bg-zinc-900 p-6 text-white md:h-[500px]">
                <Image src={HERO_IMAGES[3]} alt="Leadership" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="relative z-10 flex flex-col items-start">
                  <h3 className="mb-4 text-2xl font-bold tracking-tight">Leadership</h3>
                  <div data-hero-animate className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/leadership"
                className="btn-premium inline-flex h-12 items-center justify-center rounded-full bg-[#FF5F15] px-7 text-sm font-semibold text-black hover:bg-[#FF7335] md:h-[52px] md:px-8 md:text-base"
              >
                Join the waitlist
              </Link>
            </div>
                </div>
              </div>

              {/* Card 2 */}
              {/* <div data-reveal-item className="group relative flex h-[480px] w-full max-w-[350px] flex-col justify-end overflow-hidden rounded-2xl bg-zinc-900 p-6 text-white md:h-[500px]">
                <Image src={HERO_IMAGES[1]} alt="Careers" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="relative z-10 flex flex-col items-start">
                  <h3 className="mb-4 text-2xl font-bold tracking-tight">Careers</h3>
                  <Link href={WAITLIST_PATH} className="inline-block rounded-md bg-[#e3f8eb] px-4 py-2 text-[15px] font-semibold text-[#0a2516] transition-colors hover:bg-white">
                    Life at Beagine
                  </Link>
                </div>
              </div> */}

              {/* Card 3 */}
              <div data-reveal-item className="group relative flex h-[480px] w-full max-w-[350px] flex-col justify-end overflow-hidden rounded-2xl bg-zinc-900 p-6 text-white md:h-[500px]">
                <Image src={HERO_IMAGES[2]} alt="Trust & Safety" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="relative z-10 flex flex-col items-start">
                  <h3 className="mb-4 text-2xl font-bold tracking-tight">Safety</h3>
                  <div data-hero-animate className="mt-8 flex flex-wrap gap-3">
              <Link
                href={WAITLIST_PATH}
                className="btn-premium inline-flex h-12 items-center justify-center rounded-full bg-[#FF5F15] px-7 text-sm font-semibold text-black hover:bg-[#FF7335] md:h-[52px] md:px-8 md:text-base"
              >
                Safety at Beagine
              </Link>
            </div>
                </div>
              </div>

              {/* Card 4 */}
              <div data-reveal-item id="community" className="group relative flex h-[480px] w-full max-w-[350px] flex-col justify-end overflow-hidden rounded-2xl bg-zinc-900 p-6 text-white md:h-[500px]">
                <Image src={HERO_IMAGES[5]} alt="Community" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="relative z-10 flex flex-col items-start">
                  <h3 className="mb-4 text-2xl font-bold tracking-tight">Community</h3>
                  <div data-hero-animate className="mt-8 flex flex-wrap gap-3">
              <Link
                href={WAITLIST_PATH}
                className="btn-premium inline-flex h-12 items-center justify-center rounded-full bg-[#FF5F15] px-7 text-sm font-semibold text-black hover:bg-[#FF7335] md:h-[52px] md:px-8 md:text-base"
              >
                Community
              </Link>
            </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
