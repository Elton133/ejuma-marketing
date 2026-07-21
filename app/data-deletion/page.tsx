import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Deletion Instructions",
  description: "How to delete your Beagine account and data",
};

export default function DataDeletion() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-black pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-white/70">
          <h1 className="mb-8 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Data Deletion Instructions
          </h1>
          
          <div className="space-y-8 text-base leading-relaxed">
            <section>
              <p>
                At Beagine, we value your privacy and make it easy for you to
                control your personal data. If you wish to delete your account and
                associated data, you can do so by following the instructions below.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Method 1: Deleting Your Account Within the App
              </h2>
              <p className="mb-4">
                The fastest way to delete your data is directly through the Beagine
                mobile app:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Open the Beagine app and log in to your account.</li>
                <li>Navigate to the <strong>Profile</strong> or <strong>Settings</strong> tab.</li>
                <li>Scroll down and tap on <strong>Account Settings</strong>.</li>
                <li>Tap on <strong>Delete Account</strong>.</li>
                <li>Follow the on-screen prompts to confirm your decision.</li>
              </ol>
              <p className="mt-4 text-sm text-white/50">
                Note: Once you confirm deletion, your account and all associated
                data (including profile info, past bookings, and payment methods)
                will be permanently deleted from our active databases.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Method 2: Requesting Deletion via Email
              </h2>
              <p className="mb-4">
                If you no longer have access to the app, you can request data
                deletion by contacting our support team:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  Send an email to{" "}
                  <a
                    href="mailto:support@beagine.com"
                    className="text-[#FF5F15] hover:underline"
                  >
                    support@beagine.com
                  </a>{" "}
                  from the email address associated with your Beagine account.
                </li>
                <li>Use the subject line: <strong>"Account Deletion Request"</strong>.</li>
                <li>
                  Include your full name and phone number associated with the
                  account to help us verify your identity.
                </li>
              </ol>
              <p className="mt-4">
                Our team will process your request and confirm the deletion within
                7 business days.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
