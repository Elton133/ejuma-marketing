import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { InstallSection } from "@/components/InstallSection";

export const metadata: Metadata = {
  title: "Install the app",
  description:
    "Download Beagine (for customers) and Beagine Pro (for specialists) on the App Store. Android is coming soon.",
};

export default function InstallPage() {
  return (
    <>
      <main className="bg-black">
        <InstallSection className="pt-28 md:pt-32" />
      </main>
      <Footer />
    </>
  );
}
