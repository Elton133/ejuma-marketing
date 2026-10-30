import type { Metadata } from "next";
import { LearnBrowser } from "@/components/community/Browsers";
import { CommunityShell } from "@/components/community/CommunityShell";
import { getCommunityContent } from "@/lib/community-api";

export const metadata: Metadata = { title: "Learn | Beagine Connect", description: "Guides and resources for the Beagine community." };

const topics = ["For customers", "For specialists", "For vendors", "Safety and trust", "How Beagine works", "Business growth"] as const;

export default async function LearnPage() {
  const { items } = await getCommunityContent("article");
  return (
    <CommunityShell eyebrow="Learn" title="Knowledge that helps you move forward." description="Clear, practical guides for using Beagine, growing your work and taking part safely in the community.">
      <LearnBrowser items={items} topics={topics} />
    </CommunityShell>
  );
}
