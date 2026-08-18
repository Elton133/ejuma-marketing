import Link from "next/link";
import { SITE_LINK_GROUPS } from "@/lib/constants";
import { Logo } from "./Logo";

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
        data-lag="0.3"
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center font-semibold leading-none text-white/[0.04]"
        style={{ fontSize: "clamp(5rem, 18vw, 16rem)" }}
      >
        BEAGINE
      </span>
      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo size="lg" withBeaver={false} />
            <p className="mt-3 max-w-xs text-sm text-white/55">
              The engineering ecosystem connecting customers, skilled
              specialists and local vendors around real work.
            </p>
          </div>

          {SITE_LINK_GROUPS.map((group) => (
            <FooterColumn key={group.title} title={group.title} links={group.links} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6  pt-8">
          <p className="text-sm text-white/45">
            © {new Date().getFullYear()} Beagine
          </p>
          <div className="flex flex-wrap gap-4">
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
  links: ReadonlyArray<{ label: string; href: string; external?: boolean }>;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
        {title}
      </p>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            {link.external || link.href.startsWith("mailto:") || link.href.startsWith("http") ? (
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
