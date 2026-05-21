import Image from "next/image";
import Link from "next/link";
import {
  INSTALL_CUSTOMER,
  INSTALL_URL,
  INSTALL_WORKER,
} from "@/lib/constants";
import { MicroLabel } from "./MicroLabel";

const QR_IMAGE = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(INSTALL_URL)}&bgcolor=ffffff&color=000000`;

export function InstallSection() {
  return (
    <section
      id="install"
      className="bg-black px-6 py-20 text-white md:py-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <MicroLabel>Install</MicroLabel>
        <h2 className="mt-3 max-w-2xl text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">
          Get Beagine on your phone
        </h2>
        <p className="mt-4 max-w-xl text-white/60">
          No app store required — install in seconds from your browser. Works
          like an app from your home screen.
        </p>

        {/* Customer + worker cards */}
        <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6">
          <InstallCard
            title="For customers"
            description="Book faster, track jobs, and get updates when your specialist is on the way."
            href={INSTALL_CUSTOMER}
            cta="Install customer app"
          />
          <InstallCard
            title="For workers"
            description="Dashboard, job alerts, and MoMo payouts — one tap from your home screen."
            href={INSTALL_WORKER}
            cta="Install worker app"
          />
        </div>

        {/* QR + instructions */}
        <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start lg:gap-10">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="text-sm font-semibold text-white">
              Add to home screen
            </p>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-white/65">
              <li>
                <strong className="text-white">Android —</strong> Open in Chrome,
                then tap <em>Install</em> or Menu → Add to Home screen.
              </li>
              <li>
                <strong className="text-white">iPhone —</strong> Open in Safari,
                tap Share, then Add to Home Screen.
              </li>
            </ul>
            <p className="mt-5 text-xs text-white/40">
              Native iOS &amp; Android store apps may come later — today it&apos;s
              a full web app + PWA.
            </p>
          </div>

          <div className="flex flex-col items-center rounded-[2rem] border border-[#FF5F15]/25 bg-[#FF5F15]/[0.06] p-6 lg:sticky lg:top-28">
            <Image
              src={QR_IMAGE}
              alt="QR code to open install page"
              width={180}
              height={180}
              className="rounded-xl bg-white p-2"
              unoptimized
            />
            <p className="mt-4 text-center text-sm font-medium text-white">
              Scan to install
            </p>
            <Link
              href={INSTALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-sm text-[#FF5F15] hover:underline"
            >
              3juma.app/install
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
  href,
  cta,
}: {
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 md:p-8">
      <h3 className="text-xl font-bold tracking-tight">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
        {description}
      </p>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex w-fit rounded-full bg-[#FF5F15] px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
      >
        {cta}
      </Link>
    </div>
  );
}
