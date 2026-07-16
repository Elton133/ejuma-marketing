import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WAITLIST_PATH, COMING_SOON_PATH } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Links - Beagine",
  description: "Find Beagine on the App Store, Google Play, or join the waitlist.",
};

export default function LinksPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 py-20 text-white">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="inline-block">
          <Image
            src="/beaver.png"
            alt="Beagine Beaver Logo"
            width={80}
            height={80}
            className="mx-auto rounded-full bg-white/5 p-2"
          />
        </Link>
        <h1 className="mt-6 text-2xl font-bold tracking-tight">Beagine</h1>
        <p className="mt-2 text-sm text-white/60">
          The globally relevant engineering services platform.
        </p>

        <div className="mt-10 flex flex-col gap-4">
          <Link
            href={COMING_SOON_PATH}
            className="flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Download on the App Store
          </Link>
          <Link
            href={COMING_SOON_PATH}
            className="flex w-full items-center justify-center rounded-full border border-[#FF5F15]/50 bg-[#FF5F15]/10 px-6 py-4 text-sm font-semibold text-[#FF5F15] transition-colors hover:bg-[#FF5F15]/20"
          >
            Get it on Google Play
          </Link>
          <Link
            href={WAITLIST_PATH}
            className="flex w-full items-center justify-center rounded-full bg-[#FF5F15] px-6 py-4 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Join the waitlist
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
