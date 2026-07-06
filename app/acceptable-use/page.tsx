import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { LegalPageContent } from "@/components/LegalPageContent";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Acceptable use",
  description: "Community guidelines and acceptable use policy for Beagine users and specialists.",
};

export default function AcceptableUsePage() {
  return (
    <>
      <Nav />
      <main>
        <LegalPageContent
          eyebrow="Legal"
          title="Acceptable use"
          updated="29 May 2026"
          intro="Beagine is built on trust. This policy sets out how customers and specialists are expected to behave on our platform."
          sections={[
            {
              heading: "Expected behaviour",
              body: [
                "Treat others with respect. Do not harass, threaten, or discriminate against other users or specialists.",
                "Provide honest information about skills, availability, pricing, and job requirements.",
              ],
            },
            {
              heading: "Prohibited activity",
              body: [
                "You may not use Beagine for fraud, illegal work, spam, impersonation, or attempts to bypass platform safety or payment systems.",
                "We may suspend or remove accounts that violate these rules.",
              ],
            },
            {
              heading: "Reporting issues",
              body: [
                "If you encounter unsafe, fraudulent, or inappropriate behaviour, contact us at support@beagine.app so we can investigate.",
              ],
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
