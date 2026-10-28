import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { WaitlistSection } from "@/components/WaitlistSection";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description:
    "Be first when Beagine opens in your area. Join the waitlist for early access in Tema, Dawhenya, Prampram and nearby.",
};

export default function WaitlistPage() {
  return (
    <>
      <main>
        <WaitlistSection />
      </main>
      <Footer />
    </>
  );
}
