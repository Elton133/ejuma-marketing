import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import Content from "@/content/legal/accessibility-inclusion.mdx";

export const metadata: Metadata = {
  title: "Accessibility, Inclusion and Non-Discrimination Policy",
  description: "Beagine's equal access, inclusion and non-discrimination framework.",
};

export default function AccessibilityInclusionPage() {
  return (
    <LegalLayout
      title="Accessibility, Inclusion and Non-Discrimination Policy"
      sourceDocumentHref="/policies/accessibility-inclusion.pdf"
    >
      <Content />
    </LegalLayout>
  );
}
