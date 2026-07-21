import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import Content from "@/content/legal/terms-of-use.mdx";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for Beagine",
};

export default function TermsOfUse() {
  return (
    <LegalLayout title="Terms of Use" lastUpdated="July 20, 2026">
      <Content />
    </LegalLayout>
  );
}
