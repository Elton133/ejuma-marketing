import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { LegalPageContent } from "@/components/LegalPageContent";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Beagine collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main>
        <LegalPageContent
          eyebrow="Legal"
          title="Privacy policy"
          updated="29 May 2026"
          intro="Beagine respects your privacy. This policy explains what information we collect, why we collect it, and how we keep it safe when you use our website, waitlist, and app."
          sections={[
            {
              heading: "Information we collect",
              body: [
                "We may collect your name, phone number, email address, location area, and responses you provide when joining the waitlist or completing our research questionnaire.",
                "We also collect basic usage data such as pages visited and device type to improve our service.",
              ],
            },
            {
              heading: "How we use your information",
              body: [
                "We use your information to operate Beagine, notify you about launch updates, improve our product, and respond to support requests.",
                "We do not sell your personal data to third parties.",
              ],
            },
            {
              heading: "Data retention & security",
              body: [
                "We retain your information only as long as needed for the purposes described in this policy or as required by law.",
                "We use reasonable technical and organisational measures to protect your data, though no system is completely secure.",
              ],
            },
            {
              heading: "Your rights",
              body: [
                "You may request access to, correction of, or deletion of your personal data by contacting us at support@beagine.app.",
              ],
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
