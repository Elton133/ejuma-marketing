import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Nav } from "@/components/Nav";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TradesBar } from "@/components/TradesBar";

export default function Home() {
  return (
    <>
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
          <AboutSection />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
