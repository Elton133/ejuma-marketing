"use client";

import Image from "next/image";
import Link from "next/link";
import { APP_STORE_CUSTOMER_URL, APP_STORE_PRO_URL, WAITLIST_PATH } from "@/lib/constants";
import { MicroLabel } from "./MicroLabel";
import posthog from "posthog-js";

const QR_IMAGE = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(APP_STORE_CUSTOMER_URL)}&bgcolor=ffffff&color=000000`;

export function InstallSection({ className = "" }: { className?: string }) {
  return (
    <section
      id="install"
      className={`bg-black px-6 py-20 text-white md:py-28 ${className}`.trim()}
    >
      <div className="mx-auto max-w-[1200px]">
        <MicroLabel>Install</MicroLabel>
        <h2 className="mt-3 max-w-2xl text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">
          Get Beagine on your phone
        </h2>
        <p className="mt-4 max-w-xl text-white/60">
          Live now on iPhone. Android is on its way: join the list and we’ll tell you the day it’s out.
        </p>

        {/* Customer + worker cards */}
        <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6">
          <InstallCard
            title="Beagine"
            audience="For customers"
            description="Book a verified specialist, track them on the way, and pay safely in the app."
            appleHref={APP_STORE_CUSTOMER_URL}
          />
          <InstallCard
            title="Beagine Pro"
            audience="For specialists"
            description="Get job requests near you, set your own prices, and get paid straight to MoMo."
            appleHref={APP_STORE_PRO_URL}
          />
        </div>

        {/* QR + instructions */}
        <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start lg:gap-10">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="text-sm font-semibold text-white">
              Why download the native app?
            </p>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-white/65">
              <li>
                <strong className="text-white">Push Notifications —</strong> Get instant alerts for job updates, messages, and payments.
              </li>
              <li>
                <strong className="text-white">Better Performance —</strong> Experience faster loading times and smoother interactions.
              </li>
              <li>
                <strong className="text-white">Native Features —</strong> Enjoy a seamless experience built specifically for your device.
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center rounded-[2rem] border border-[#FF5F15]/25 bg-[#FF5F15]/[0.06] p-6 lg:sticky lg:top-28">
            <Image
              src={QR_IMAGE}
              alt="QR code to open download page"
              width={180}
              height={180}
              className="rounded-xl bg-white p-2"
              unoptimized
            />
            <p className="mt-4 text-center text-sm font-medium text-white">
              Scan with your iPhone camera
            </p>
            <a
              href={APP_STORE_CUSTOMER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-sm text-[#FF5F15] hover:underline"
            >
              Or open the App Store
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function InstallCard({
  title,
  audience,
  description,
  appleHref,
}: {
  title: string;
  audience: string;
  description: string;
  appleHref: string;
}) {
  return (
    <div className="glass-panel flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#FF5F15]">{audience}</p>
      <h3 className="mt-1 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
        {description}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={appleHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-premium inline-flex rounded-full bg-[#FF5F15] px-6 py-3 text-sm font-semibold text-black hover:bg-[#FF7335]"
          onClick={() => posthog.capture("app_install_clicked", { store: "app_store", audience })}
        >
          Download on the App Store
        </a>
        <Link
          href={WAITLIST_PATH}
          className="btn-premium inline-flex rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          onClick={() => posthog.capture("android_notify_clicked", { audience })}
        >
          Android: notify me
        </Link>
      </div>
    </div>
  );
}
