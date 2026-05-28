import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { InstallSection } from "@/components/InstallSection";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Install the app",
  description:
    "Add Beagine to your home screen in seconds. Install the customer or worker app — no app store required.",
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
