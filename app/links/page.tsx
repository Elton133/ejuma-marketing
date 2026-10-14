import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { APP_STORE_CUSTOMER_URL, APP_STORE_PRO_URL, WAITLIST_PATH } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Links - Beagine",
  description: "Get Beagine and Beagine Pro on the App Store. On Android? Get notified when it’s out.",
};

export default function LinksPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 py-20 text-white">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center">
          <Logo size="xl" />
        </div>
        <p className="mt-2 text-sm text-white/60">
          The globally relevant engineering services platform.
        </p>

        <div className="mt-10 flex flex-col gap-4">
          <a
            href={APP_STORE_CUSTOMER_URL}
            className="flex w-full items-center justify-center rounded-full bg-[#FF5F15] px-6 py-4 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Book a specialist: get Beagine
          </a>
          <a
            href={APP_STORE_PRO_URL}
            className="flex w-full items-center justify-center rounded-full border border-[#FF5F15]/50 bg-[#FF5F15]/10 px-6 py-4 text-sm font-semibold text-[#FF5F15] transition-colors hover:bg-[#FF5F15]/20"
          >
            I&apos;m a specialist: get Beagine Pro
          </a>
          <Link
            href={WAITLIST_PATH}
            className="flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            On Android? Get notified
          </Link>
          <Link
            href="/"
            className="flex w-full items-center justify-center rounded-full border border-white/20 bg-black px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/5"
          >
            Visit Website
          </Link>
        </div>
      </div>
    </main>
  );
}
