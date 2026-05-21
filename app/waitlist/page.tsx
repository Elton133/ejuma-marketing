import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { WaitlistSection } from "@/components/WaitlistSection";

export const metadata: Metadata = {
  title: "Join the waitlist — Ejuma",
  description:
    "Be first when Ejuma opens in your area. Join the waitlist for early access in Tema, Dawhenya, Prampram and nearby.",
};

export default function WaitlistPage() {
  return (
    <>
      <Nav />
      <main>
        <WaitlistSection />
      </main>
      <Footer />
    </>
  );
}
