import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Beagine",
};

export default function TermsOfService() {
  const lastUpdated = "July 6, 2026"; // Or use a dynamic date

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-black pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-white/70">
          <h1 className="mb-8 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mb-8 text-sm">Last Updated: {lastUpdated}</p>

          <div className="space-y-8 text-base leading-relaxed">
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                1. Acceptance of Terms
              </h2>
              <p>
                By downloading, accessing, or using the Beagine mobile application
                or website (collectively, the "Platform"), you agree to be bound
                by these Terms of Service. If you do not agree to these terms,
                you may not use the Platform.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                2. Description of Service
              </h2>
              <p>
                Beagine is a marketplace platform that connects users seeking
                skilled trades services ("Clients") with independent service
                providers ("Specialists"). Beagine does not directly provide
                these services but facilitates the connection, booking, and
                payment between Clients and Specialists.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                3. User Responsibilities
              </h2>
              <p className="mb-4">
                As a user of the Platform, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate, current, and complete information during registration.</li>
                <li>Maintain the security and confidentiality of your account credentials.</li>
                <li>Use the Platform only for lawful purposes and in compliance with all applicable laws.</li>
                <li>Treat all other users (both Clients and Specialists) with respect and professionalism.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                4. Payments and Fees
              </h2>
              <p>
                Payments for services booked through Beagine are processed via
                our third-party payment providers. Beagine may charge a service
                fee for facilitating the transaction, which will be disclosed
                prior to booking. You agree to pay all charges associated with
                your use of the Platform at the prices then in effect.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                5. Limitation of Liability
              </h2>
              <p>
                Beagine acts solely as a marketplace. We are not responsible for
                the quality, safety, or legality of the services provided by
                Specialists. Any disputes regarding the services should be
                resolved directly between the Client and the Specialist, though
                Beagine may, at its sole discretion, assist in dispute resolution.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                6. Termination
              </h2>
              <p>
                We reserve the right to suspend or terminate your account and access
                to the Platform at any time, for any reason, including but not
                limited to a violation of these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                7. Contact Us
              </h2>
              <p>
                If you have questions or comments about these Terms of Service, please
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
