import type { Metadata } from "next";
import { UpdatesBrowser } from "@/components/community/Browsers";
import { CommunityShell } from "@/components/community/CommunityShell";
import { getCommunityContent } from "@/lib/community-api";

export const metadata: Metadata = { title: "Community Updates | Beagine Connect", description: "Official news and notices from Beagine." };

const topics = ["Announcements", "Customers", "Specialists", "Vendors", "Events", "Safety", "Product updates", "Opportunities"] as const;

export default async function UpdatesPage() {
  const { items } = await getCommunityContent("update");
  return (
    <CommunityShell eyebrow="Community Updates" title="The Beagine noticeboard." description="Official announcements, service launches, events, opportunities and important community notices.">
      <div className="mx-auto max-w-4xl">
        <UpdatesBrowser items={items} topics={topics} />
      </div>
    </CommunityShell>
  );
}
