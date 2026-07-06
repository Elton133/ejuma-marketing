import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { LegalPageContent } from "@/components/LegalPageContent";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Terms & conditions",
  description: "Terms and conditions for using Beagine's website, waitlist, and marketplace.",
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main>
        <LegalPageContent
          eyebrow="Legal"
          title="Terms & conditions"
          updated="29 May 2026"
          intro="By accessing Beagine's website, waitlist, or app, you agree to these terms. Please read them carefully before using our services."
          sections={[
            {
              heading: "Using Beagine",
              body: [
                "Beagine connects customers with skilled tradespeople in Ghana. You must provide accurate information and use the platform lawfully.",
                "We may update features, pricing, and availability as we grow. Early access and waitlist participation do not guarantee immediate service in your area.",
              ],
            },
            {
              heading: "Accounts & bookings",
              body: [
                "You are responsible for activity under your account and for keeping your contact details up to date.",
                "Bookings, payments, and job agreements between customers and specialists may be subject to additional in-app terms at the time of use.",
              ],
            },
            {
              heading: "Limitation of liability",
              body: [
                "Beagine facilitates connections between users and specialists. We are not responsible for the quality, timing, or outcome of work performed by independent specialists, except where required by applicable law.",
              ],
            },
            {
              heading: "Changes to these terms",
              body: [
                "We may revise these terms from time to time. Continued use of Beagine after changes are posted constitutes acceptance of the updated terms.",
              ],
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
