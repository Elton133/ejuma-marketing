import Link from "next/link";
import Image from "next/image";
import { COMING_SOON_PATH, INSTALL_PATH } from "@/lib/constants";
import { WAITLIST_PATH } from "@/lib/constants";
import { Logo } from "./Logo";

const PRODUCT_LINKS = [
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Install app", href: INSTALL_PATH },
  { label: "Join waitlist", href: WAITLIST_PATH },
  { label: "Open app", href: COMING_SOON_PATH },
];

const WORKER_LINKS = [
  { label: "Join as a specialist", href: WAITLIST_PATH },
  { label: "Install as specialist", href: COMING_SOON_PATH },
];

const COMPANY_LINKS = [
  { label: "Community Connect", href: "/faqs" },
  { label: "About Beagine", href: "/about" },
  { label: "Contact support", href: "mailto:support@beagine.com" },
];

const LEGAL_LINKS = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms of service", href: "/terms-of-service" },
  { label: "Terms of use", href: "/terms-of-use" },
  { label: "Data deletion", href: "/data-deletion" },
];

const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/beagine-app/" },
  { label: "Instagram", href: "https://www.instagram.com/beagine.hq?igsh=MWtjNW4zY3kzczZlMQ==" },
  { label: "TikTok", href: "https://www.tiktok.com/@beagine.hq?_r=1&_t=ZS-9820A2s6kWf" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-16 text-white md:py-20">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center font-semibold leading-none text-white/[0.04]"
        style={{ fontSize: "clamp(5rem, 18vw, 16rem)" }}
      >
        BEAGINE
      </span>
      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo size="lg" withBeaver={false} />
            <p className="mt-3 max-w-xs text-sm text-white/55">
              The platform for skilled trades — find, book, and
              track a verified specialist, right from your phone.
            </p>
          </div>

          <FooterColumn title="Product" links={PRODUCT_LINKS} />
          <FooterColumn title="For specialists" links={WORKER_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6  pt-8">
          <p className="text-sm text-white/45">
            © {new Date().getFullYear()} Beagine
          </p>
          <div className="flex flex-wrap gap-4">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-white/45 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            {SOCIAL.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/45 hover:text-[#FF5F15]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
        {title}
      </p>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/65 hover:text-white"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-white/65 hover:text-white"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
