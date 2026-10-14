import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { WaitlistSection } from "@/components/WaitlistSection";

export const metadata: Metadata = {
  title: "Get notified",
  description:
    "Beagine is live on iPhone. On Android, or outside our areas? Leave your details and we’ll tell you as soon as it’s ready for you.",
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
