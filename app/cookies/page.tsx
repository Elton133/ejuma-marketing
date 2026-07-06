import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { LegalPageContent } from "@/components/LegalPageContent";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: "How Beagine uses cookies and similar technologies on our website.",
};

export default function CookiesPage() {
  return (
    <>
      <Nav />
      <main>
        <LegalPageContent
          eyebrow="Legal"
          title="Cookie policy"
          updated="29 May 2026"
          intro="This policy explains how Beagine uses cookies and similar technologies when you visit our website."
          sections={[
            {
              heading: "What are cookies?",
              body: [
                "Cookies are small text files stored on your device. They help websites remember preferences and understand how visitors use the site.",
              ],
            },
            {
              heading: "How we use cookies",
              body: [
                "We may use essential cookies required for the site to function, and analytics cookies to understand traffic and improve performance.",
                "We do not use cookies to sell your personal information.",
              ],
            },
            {
              heading: "Managing cookies",
              body: [
                "You can control or delete cookies through your browser settings. Disabling certain cookies may affect how parts of the site work.",
              ],
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
