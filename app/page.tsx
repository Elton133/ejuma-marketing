import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Nav } from "@/components/Nav";
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
      <Nav />
      <main className="bg-black">
        <Hero />
        <ScrollReveal>
          <HowItWorks />
        </ScrollReveal>
        <ScrollReveal>
          <TradesBar />
        </ScrollReveal>
        <ScrollReveal>
          <TrustSection />
        </ScrollReveal>
        <ScrollReveal>
          <AboutSection />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
