import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Beagine",
};

export default function PrivacyPolicy() {
  const lastUpdated = "July 6, 2026"; // Or use a dynamic date

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-black pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-white/70">
          <h1 className="mb-8 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mb-8 text-sm">Last Updated: {lastUpdated}</p>

          <div className="space-y-8 text-base leading-relaxed">
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                1. Introduction
              </h2>
              <p>
                Welcome to Beagine. We respect your privacy and are committed to
                protecting your personal data. This Privacy Policy explains how
                we collect, use, disclose, and safeguard your information when
                you visit our website (beagine.com) and use our mobile
                application (the "App"). Please read this privacy policy
                carefully. If you do not agree with the terms of this privacy
                policy, please do not access the site or the App.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                2. Data We Collect
              </h2>
              <p className="mb-4">
                We may collect information about you in a variety of ways. The
                information we may collect via the App includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-white/90">Contact Information:</strong>{" "}
                  Your name, email address, and phone number when you register
                  for an account or contact us.
                </li>
                <li>
                  <strong className="text-white/90">Location Data:</strong> We
                  request access to track your precise and coarse location-based
                  information from your mobile device while you use the App, to
                  provide location-based services like finding nearby specialists
                  or jobs.
                </li>
                <li>
                  <strong className="text-white/90">Photos and Media:</strong> We
                  may request access to your device's camera and photo gallery to
                  allow you to upload profile pictures, or photos of jobs and
                  tasks that need to be completed.
                </li>
                <li>
                  <strong className="text-white/90">Audio (Microphone):</strong>{" "}
                  We may request access to your device's microphone to allow
                  audio features or voice notes related to jobs.
                </li>
                <li>
                  <strong className="text-white/90">Payment Information:</strong>{" "}
                  Financial information such as data related to your payment
                  method (e.g., valid credit card number, card brand, expiration
                  date) that we may collect when you purchase, order, return,
                  exchange, or request information about our services from the App.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                3. How We Use Your Data
              </h2>
              <p className="mb-4">
                Having accurate information about you permits us to provide you
                with a smooth, efficient, and customized experience. Specifically,
                we may use information collected about you via the App to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Create and manage your account.</li>
                <li>Process your transactions and send you related information.</li>
                <li>
                  Connect you with relevant service providers or clients based on
                  your location and needs.
                </li>
                <li>Provide customer support and respond to your inquiries.</li>
                <li>
                  Improve our services, troubleshoot issues, and enhance the overall
                  user experience.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                4. Data Sharing and Disclosure
              </h2>
              <p>
                We may share your information with third parties that perform
                services for us or on our behalf, including payment processing,
                data analysis, email delivery, hosting services, customer service,
                and marketing assistance. If you are a client booking a service,
                we will share necessary information (like your name, location, and
                job details) with the specialist you book.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                5. Data Deletion
              </h2>
              <p>
                You have the right to request the deletion of your personal data.
                You can delete your account and associated data directly within
                the Beagine mobile app via the Account Settings. Alternatively,
                you can contact us at{" "}
                <a
                  href="mailto:support@beagine.app"
                  className="text-[#FF5F15] hover:underline"
                >
                  support@beagine.app
                </a>{" "}
                to request account deletion. For more detailed instructions, please
                visit our <a href="/data-deletion" className="text-[#FF5F15] hover:underline">Data Deletion page</a>.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                6. Contact Us
              </h2>
              <p>
                If you have questions or comments about this Privacy Policy, please
                contact us at:
              </p>
              <p className="mt-2">
                Email:{" "}
                <a
                  href="mailto:support@beagine.app"
                  className="text-[#FF5F15] hover:underline"
                >
                  support@beagine.app
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
