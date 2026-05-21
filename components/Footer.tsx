import Link from "next/link";
import { APP_URL, INSTALL_WORKER, WAITLIST_PATH } from "@/lib/constants";

const PRODUCT_LINKS = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "Install app", href: "/#install" },
  { label: "Join waitlist", href: WAITLIST_PATH },
  { label: "Open app", href: APP_URL, external: true },
];

const WORKER_LINKS = [
  { label: "Join as a worker", href: WAITLIST_PATH },
  { label: "Worker install", href: INSTALL_WORKER, external: true },
];

const COMPANY_LINKS = [
  { label: "About Beagine", href: "/#about" },
  { label: "Contact support", href: "mailto:support@beagine.app" },
];

const LEGAL_LINKS = [
  { label: "Privacy policy", href: "#" },
  { label: "Terms of service", href: "#" },
];

const SOCIAL = [
  { label: "Facebook", href: "https://facebook.com/beagineghana" },
  { label: "X / Twitter", href: "https://twitter.com/beagineghana" },
  { label: "Instagram", href: "https://instagram.com/beagineghana" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-16 text-white md:py-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="font-heading text-xl font-bold tracking-tight">Beagine</p>
            <p className="mt-3 max-w-xs text-sm text-white/55">
              Marketplace for skilled trades — find, book, and
              track verified workers on your phone.
            </p>
          </div>

          <FooterColumn title="Product" links={PRODUCT_LINKS} />
          <FooterColumn title="For workers" links={WORKER_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">
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
