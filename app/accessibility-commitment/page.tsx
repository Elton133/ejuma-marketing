import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import Content from "@/content/legal/accessibility-commitment.mdx";

export const metadata: Metadata = {
  title: "Accessibility Commitment Policy",
  description: "Beagine's commitment to digital accessibility and equal service access.",
};

export default function AccessibilityCommitmentPage() {
  return (
    <LegalLayout
      title="Accessibility Commitment Policy"
      sourceDocumentHref="/policies/accessibility-commitment.pdf"
    >
      <Content />
    </LegalLayout>
  );
}
