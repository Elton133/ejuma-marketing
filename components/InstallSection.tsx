import Image from "next/image";
import Link from "next/link";
import { APP_URL, COMING_SOON_PATH } from "@/lib/constants";
import { MicroLabel } from "./MicroLabel";

const QR_IMAGE = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(APP_URL)}&bgcolor=ffffff&color=000000`;

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
          Download the Beagine app for iOS or Android. Available now on the App Store and Google Play.
        </p>

        {/* Customer + worker cards */}
        <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6">
          <InstallCard
            title="For customers"
            description="Book faster, track jobs, and get updates when your specialist is on the way."
            appleHref={COMING_SOON_PATH}
            googleHref={COMING_SOON_PATH}
          />
          <InstallCard
            title="For workers"
            description="Dashboard, job alerts, and payouts — one tap from your home screen."
            appleHref={COMING_SOON_PATH}
            googleHref={COMING_SOON_PATH}
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
              Scan to download
            </p>
            <Link
              href={COMING_SOON_PATH}
              className="mt-2 text-sm text-[#FF5F15] hover:underline"
            >
              Scan to install
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function InstallCard({
  title,
  description,
  appleHref,
  googleHref,
}: {
  title: string;
  description: string;
  appleHref: string;
  googleHref: string;
}) {
  return (
    <div className="glass-panel flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 md:p-8">
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
        {description}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={appleHref}
          className="btn-premium inline-flex rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
        >
          App Store
        </Link>
        <Link
          href={googleHref}
          className="btn-premium inline-flex rounded-full bg-[#FF5F15] px-6 py-3 text-sm font-semibold text-black hover:bg-[#FF7335]"
        >
          Google Play
        </Link>
      </div>
    </div>
  );
}
