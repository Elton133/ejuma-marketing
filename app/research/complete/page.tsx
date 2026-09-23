import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { ResearchComplete } from "@/components/research/ResearchComplete";

export const metadata: Metadata = {
  title: "Research complete",
  description: "Thank you for helping us improve Beagine.",
};

export default function ResearchCompletePage() {
  return (
    <>
      <main>
        <ResearchComplete />
      </main>
      <Footer />
    </>
  );
}
