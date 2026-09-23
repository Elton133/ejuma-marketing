import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { ResearchLanding } from "@/components/research/ResearchLanding";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Help Beagine build a better way for customers and skilled specialists to find each other.",
};

export default function ResearchPage() {
  return (
    <>
      <main>
        <ResearchLanding />
      </main>
      <Footer />
    </>
  );
}
