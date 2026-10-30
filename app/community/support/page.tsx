import type { Metadata } from "next";
import Link from "next/link";
import { CommunityShell } from "@/components/community/CommunityShell";

export const metadata: Metadata = { title: "Support | Beagine Connect", description: "Private help from the Beagine support team." };

const SUPPORT_EMAIL = "support@beagine.com";

const OPTIONS = [
  { title: "Account and verification", body: "Help signing in, updating your details or completing verification.", icon: "🪪" },
  { title: "Bookings and services", body: "Questions about an active, upcoming or completed booking.", icon: "🗓️" },
  { title: "Payments and payouts", body: "Private support for charges, refunds, earnings and payouts.", icon: "💳" },
  { title: "Safety and urgent concerns", body: "Report conduct, safety issues or something that needs immediate review.", icon: "🛡️", urgent: true },
] as const;

/** Each card opens an email to support with the subject already filled in, so it reaches the right person. */
const mailto = (subject: string) => `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`[${subject}] `)}`;

export default function CommunitySupportPage() {
  return (
    <CommunityShell
      eyebrow="Support"
      title="Private help when you need it."
      description="General questions belong in Ask Beagine. Account, booking, payment and safety issues are handled privately by our support team."
    >
      <p data-reveal className="mb-6 text-sm text-white/50">
        Pick what it&apos;s about. Your email opens with the subject filled in.
      </p>
      <div data-reveal-stagger className="grid gap-4 md:grid-cols-2">
        {OPTIONS.map((item) => (
          <a
            key={item.title}
            href={mailto(item.title)}
            data-reveal-item
            className={`group flex flex-col rounded-[1.75rem] border p-7 transition hover:-translate-y-1 ${
              "urgent" in item ? "border-red-400/30 bg-red-500/[.06] hover:border-red-400/60" : "border-white/10 bg-white/[.04] hover:border-[#FF5F15]/50"
            }`}
          >
            <span className="text-2xl transition-transform duration-300 group-hover:scale-125" aria-hidden>
              {item.icon}
            </span>
            <h2 className="mt-6 text-xl font-semibold">{item.title}</h2>
            <p className="mt-3 leading-7 text-white/55">{item.body}</p>
            <span className={`mt-auto pt-6 text-sm font-semibold ${"urgent" in item ? "text-red-300" : "text-white/70 group-hover:text-[#FF5F15]"}`}>Email support →</span>
          </a>
        ))}
      </div>
      <div data-reveal className="mt-10 flex flex-wrap items-center gap-4 rounded-[1.75rem] border border-white/10 bg-white/[.03] p-6">
        <p className="flex-1 text-white/60">
          Not private? Someone may already have asked it.
        </p>
        <Link href="/community/ask" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#FF5F15]/60">
          Browse public answers
        </Link>
        <a href={`mailto:${SUPPORT_EMAIL}`} className="rounded-full bg-[#FF5F15] px-6 py-3 text-sm font-semibold text-black">
          {SUPPORT_EMAIL}
        </a>
      </div>
    </CommunityShell>
  );
}
