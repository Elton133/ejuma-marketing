import Link from "next/link";
import { SITE_LINK_GROUPS } from "@/lib/constants";
import { Logo } from "./Logo";

const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/beagine-app/" },
  { label: "Instagram", href: "https://www.instagram.com/beagine.hq?igsh=MWtjNW4zY3kzczZlMQ==" },
  { label: "TikTok", href: "https://www.tiktok.com/@beagine.hq?_r=1&_t=ZS-9820A2s6kWf" },
];

const APP_ENTRY_POINTS = [
  { role: "Customer", line: "Find trusted help", href: "/customers", accent: "bg-[#FF5F15] text-black" },
  { role: "Specialist", line: "Turn skill into opportunity", href: "/specialists", accent: "bg-white text-black" },
  { role: "Vendor", line: "Bring your shop online", href: "/vendors", accent: "bg-[#1c1c1e] text-white" },
] as const;

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
        <div className="mb-16 grid gap-10 border-b border-white/10 pb-16 lg:grid-cols-[minmax(0,1fr)_1.25fr] lg:items-end md:mb-20 md:pb-20">
          <div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#FF7B3D]">One ecosystem. Three ways in.</p><h2 className="mt-4 max-w-xl text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[.98] tracking-[-.04em]">Where do you fit into the work?</h2><p className="mt-5 max-w-lg text-base leading-relaxed text-white/50">Choose your side of Beagine and see the experience designed around what you need to accomplish.</p></div>
          <div className="grid gap-3 sm:grid-cols-3">{APP_ENTRY_POINTS.map((app,index)=><Link key={app.role} href={app.href} className={`group relative min-h-52 overflow-hidden rounded-[1.6rem] p-5 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5F15] motion-reduce:transform-none ${app.accent}`}><span className="text-[10px] font-semibold uppercase tracking-[.16em] opacity-45">App 0{index+1}</span><div className="absolute inset-x-5 bottom-5"><p className="text-xl font-semibold">{app.role}</p><p className="mt-1 text-xs opacity-55">{app.line}</p><span aria-hidden className="mt-5 flex h-9 w-9 items-center justify-center rounded-full border border-current/20 transition-transform duration-300 group-hover:translate-x-1">→</span></div></Link>)}</div>
        </div>
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

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">
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
