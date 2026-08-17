import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import Content from "@/content/legal/community-standards.mdx";

export const metadata: Metadata = {
  title: "Community Standards and Code of Conduct",
  description: "Safety, respect and conduct standards for the Beagine community.",
};

export default function CommunityStandardsPage() {
  return (
    <LegalLayout
      title="Community Standards and Code of Conduct"
      sourceDocumentHref="/policies/community-standards.pdf"
    >
      <Content />
    </LegalLayout>
  );
}
