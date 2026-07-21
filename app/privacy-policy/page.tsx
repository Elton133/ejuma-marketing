import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import Content from "@/content/legal/privacy-policy.mdx";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Beagine",
};

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="July 20, 2026">
      <Content />
    </LegalLayout>
  );
}
