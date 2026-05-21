import { AboutSection } from "@/components/AboutSection";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { InstallSection } from "@/components/InstallSection";
import { Nav } from "@/components/Nav";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ServicesSection } from "@/components/ServicesSection";
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
          <Features />
        </ScrollReveal>
        <ScrollReveal>
          <TradesBar />
        </ScrollReveal>
        <ScrollReveal>
          <AboutSection />
        </ScrollReveal>
        <ScrollReveal>
          <InstallSection />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
