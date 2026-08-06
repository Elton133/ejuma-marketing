import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TradesBar } from "@/components/TradesBar";
import { TrustSection } from "@/components/TrustSection";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Beagine",
            url: "https://beagine.com",
            logo: "https://beagine.com/logo.png",
            description:
              "Find, book, and track verified engineering professionals globally. Join the waitlist or install the app.",
            sameAs: [
              "https://www.linkedin.com/company/beagine-app/",
              "https://www.instagram.com/beagine.hq?igsh=MWtjNW4zY3kzczZlMQ==",
              "https://www.tiktok.com/@beagine.hq?_r=1&_t=ZS-9820A2s6kWf",
            ],
          }),
        }}
      />
      <main className="bg-black">
        <Hero />
        <ScrollReveal className="relative z-10 bg-black">
          <HowItWorks />
        </ScrollReveal>
        <ScrollReveal className="relative z-20 bg-[#fafafa] shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
          <TradesBar />
        </ScrollReveal>
        <ScrollReveal className="relative z-30 bg-black">
          <TrustSection />
        </ScrollReveal>
        <ScrollReveal className="relative z-40 bg-black">
          <AboutSection />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
