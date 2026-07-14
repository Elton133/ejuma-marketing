import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { InstallSection } from "@/components/InstallSection";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Install the app",
  description:
    "Download the Beagine app for iOS and Android. Available for both customers and specialists on the App Store and Google Play.",
};

export default function InstallPage() {
  return (
    <>
      <Nav />
      <main className="bg-black">
        <InstallSection className="pt-28 md:pt-32" />
      </main>
      <Footer />
    </>
  );
}
