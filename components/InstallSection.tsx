import Image from "next/image";
import Link from "next/link";
import {
  INSTALL_CUSTOMER,
  INSTALL_URL,
  INSTALL_WORKER,
} from "@/lib/constants";
import { MicroLabel } from "./MicroLabel";

const QR_IMAGE = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(INSTALL_URL)}&bgcolor=ffffff&color=000000`;

export function InstallSection() {
  return (
    <section
      id="install"
      className="bg-black px-6 py-20 text-white md:py-28"
    >
      <div className="mx-auto max-w-[1440px]">
        <MicroLabel>Install</MicroLabel>
        <h2 className="mt-3 max-w-2xl text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">
          Get Ejuma on your phone
        </h2>
        <p className="mt-4 max-w-xl text-white/60">
          No app store required — install in seconds from your browser. Works
          like an app from your home screen.
        </p>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_auto_1fr_1fr] lg:items-start lg:gap-8">
          <InstallCard
            title="For customers"
            description="Book faster, track jobs, get updates."
            href={INSTALL_CUSTOMER}
            cta="Install customer app"
          />

          <div className="flex flex-col items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 p-6 lg:row-span-2">
            <Image
              src={QR_IMAGE}
              alt="QR code to open install page"
              width={200}
              height={200}
              className="rounded-xl bg-white p-2"
              unoptimized
            />
            <p className="mt-4 text-center text-sm text-white/60">
              Scan to open install page
            </p>
            <Link
              href={INSTALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-sm font-medium text-[#FF5F15] hover:underline"
            >
              3juma.app/install
            </Link>
          </div>

          <InstallCard
            title="For workers"
            description="Dashboard, job alerts, payouts — one tap from home screen."
            href={INSTALL_WORKER}
            cta="Install worker app"
          />
        </div>

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <p className="text-sm font-semibold text-white">Add to home screen</p>
          <ul className="mt-4 grid gap-4 text-sm text-white/65 md:grid-cols-2">
            <li>
              <strong className="text-white">Android:</strong> Open in Chrome →
              tap <em>Install</em> or menu → Add to Home screen
            </li>
            <li>
              <strong className="text-white">iPhone:</strong> Open in Safari →
              Share → Add to Home Screen
            </li>
          </ul>
          <p className="mt-4 text-xs text-white/40">
            Native iOS &amp; Android apps may come later — today it&apos;s a
            full-featured web app + PWA.
          </p>
        </div>
      </div>
    </section>
  );
}

function InstallCard({
  title,
  description,
  href,
  cta,
}: {
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 lg:col-span-1">
      <h3 className="text-xl font-bold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-white/60">{description}</p>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex rounded-full bg-[#FF5F15] px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
      >
        {cta}
      </Link>
    </div>
  );
}
