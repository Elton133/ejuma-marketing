import { AboutSection } from "@/components/AboutSection";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { InstallSection } from "@/components/InstallSection";
import { Nav } from "@/components/Nav";
import { ServicesSection } from "@/components/ServicesSection";
import { StatsStrip } from "@/components/StatsStrip";
import { TradesBar } from "@/components/TradesBar";
import { WaitlistSection } from "@/components/WaitlistSection";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="bg-black">
        <Hero />
        <StatsStrip />
        <HowItWorks />
        <Features />
        <ServicesSection />
        <TradesBar />
        <AboutSection />
        <InstallSection />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  );
}
