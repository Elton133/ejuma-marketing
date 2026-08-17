import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import Content from "@/content/legal/dispute-resolution.mdx";

export const metadata: Metadata = {
  title: "Dispute Resolution, Complaints and Grievance Management Policy",
  description: "Beagine's framework for complaints, disputes and grievance resolution.",
};

export default function DisputeResolutionPage() {
  return (
    <LegalLayout
      title="Dispute Resolution, Complaints and Grievance Management Policy"
      sourceDocumentHref="/policies/dispute-resolution.pdf"
    >
      <Content />
    </LegalLayout>
  );
}
