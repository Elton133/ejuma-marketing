import type { Metadata } from "next";
import { AskBrowser } from "@/components/community/Browsers";
import { CommunityShell } from "@/components/community/CommunityShell";
import { getCommunityQuestions } from "@/lib/community-api";

export const metadata: Metadata = { title: "Ask Beagine", description: "Official answers to questions from the Beagine community." };

const topics = ["Getting started", "Bookings", "Specialists", "Verification", "Payments", "Marketplace", "Safety", "Accounts"] as const;

export default async function AskPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const [{ questions }, { q }] = await Promise.all([getCommunityQuestions(), searchParams]);
  return (
    <CommunityShell eyebrow="Ask Beagine" title="You ask. Beagine answers." description="Search trusted answers from the team, or ask a question that could help the whole community.">
      <div className="mx-auto max-w-4xl">
        <AskBrowser questions={questions} topics={topics} initialSearch={typeof q === "string" ? q : ""} />
      </div>
    </CommunityShell>
  );
}
