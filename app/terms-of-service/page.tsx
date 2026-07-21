import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import Content from "@/content/legal/terms-of-service.mdx";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Beagine",
};

export default function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="July 20, 2026">
      <Content />
    </LegalLayout>
  );
}
