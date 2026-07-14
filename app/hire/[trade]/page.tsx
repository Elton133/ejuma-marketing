import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TRADES } from "@/lib/constants";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WaitlistSection } from "@/components/WaitlistSection";
import { TrustSection } from "@/components/TrustSection";
import { MicroLabel } from "@/components/MicroLabel";
import Link from "next/link";
import { WAITLIST_PATH, INSTALL_PATH } from "@/lib/constants";
import { ScrollReveal } from "@/components/ScrollReveal";

export function generateStaticParams() {
  return TRADES.map((trade) => ({
    trade: trade.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ trade: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const trade = resolvedParams.trade.replace(/-/g, " ");
  const formattedTrade = trade.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const isValid = TRADES.some((t) => t.toLowerCase() === trade.toLowerCase());
  
  if (!isValid) return {};

  return {
    title: `Hire a Professional ${formattedTrade} - Beagine`,
    description: `Need a reliable ${formattedTrade}? Find, book, and manage verified ${formattedTrade}s instantly on Beagine. Download the app today.`,
  };
}

export default async function TradeLandingPage({
  params,
}: {
  params: Promise<{ trade: string }>;
}) {
  const resolvedParams = await params;
  const tradeParam = resolvedParams.trade.replace(/-/g, " ");
  const originalTrade = TRADES.find((t) => t.toLowerCase() === tradeParam.toLowerCase());

  if (!originalTrade) {
    notFound();
  }

  return (
    <>
      <Nav />
      <main className="bg-black">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 pt-32 pb-20 text-white md:pt-40 md:pb-28">
          <div className="mx-auto max-w-[1200px] text-center">
            <MicroLabel>Hire a Pro</MicroLabel>
            <h1 className="mt-6 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.95] tracking-tight">
              The best <span className="text-[#FF5F15]">{originalTrade}</span> for your project.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[clamp(1.125rem,2vw,1.25rem)] leading-relaxed text-white/65">
              Skip the hassle of asking around. Find, book, and track a verified {originalTrade} directly from your phone.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={WAITLIST_PATH}
                className="flex h-14 items-center justify-center rounded-full bg-[#FF5F15] px-8 text-base font-semibold text-black transition-opacity hover:opacity-90"
              >
                Join the waitlist
              </Link>
              <Link
                href={INSTALL_PATH}
                className="flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                Download App
              </Link>
            </div>
          </div>
        </section>

        <ScrollReveal>
          <TrustSection />
        </ScrollReveal>

        <ScrollReveal>
          <WaitlistSection />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
