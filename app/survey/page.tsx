import type { Metadata } from "next";
import { HireSurvey } from "@/components/hire-survey/HireSurvey";

// Shared by link with research participants; kept out of search results.
export const metadata: Metadata = {
  title: "Who would you hire?",
  description: "Two everyday problems, three specialists each. Pick who you'd hire and tell us why. About 3 minutes.",
  openGraph: {
    title: "Who would you hire? — Beagine",
    description: "Two everyday problems, three specialists each. Pick who you'd hire. About 3 minutes.",
  },
  robots: { index: false, follow: false },
};

export default function SurveyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <HireSurvey />
    </main>
  );
}
