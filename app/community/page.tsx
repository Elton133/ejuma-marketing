import type { Metadata } from "next";
import Link from "next/link";
import { CommunityShell } from "@/components/community/CommunityShell";
import { getCommunityContent, getCommunityQuestions } from "@/lib/community-api";

export const metadata: Metadata = { title: "Beagine Connect", description: "Updates, answers, learning and support for the Beagine community." };

const DOORS = [
  { href: "/community/updates", label: "Updates", body: "Announcements, launches, opportunities and safety notices.", icon: "📣" },
  { href: "/community/ask", label: "Ask Beagine", body: "Search answers from the team, or ask something new.", icon: "💬" },
  { href: "/community/learn", label: "Learn", body: "Practical guides for customers, specialists and vendors.", icon: "📘" },
  { href: "/community/support", label: "Support", body: "Private help with your account, bookings, payments or safety.", icon: "🛟" },
] as const;

const dateLabel = (value?: string) => (value ? new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "");

export default async function CommunityPage() {
  const [updates, articles, { questions }] = await Promise.all([getCommunityContent("update", 3), getCommunityContent("article", 3), getCommunityQuestions()]);
  const latestUpdates = [...updates.items].sort((a, b) => Number(b.pinned) - Number(a.pinned)).slice(0, 3);
  const latestAnswers = questions.slice(0, 3);
  const counts: Record<string, number> = { "/community/updates": updates.items.length, "/community/ask": questions.length, "/community/learn": articles.items.length };

  return (
    <CommunityShell
      eyebrow="Beagine Connect"
      title="Built with the community, for the community."
      description="One place to stay informed, get trustworthy answers, learn how Beagine works and reach the right support team."
    >
      {/* Ask first: it's what most people come for. */}
      <form action="/community/ask" data-reveal className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#FF5F15]/15 via-white/[.03] to-transparent p-6 md:p-10">
        <label htmlFor="community-search" className="text-2xl font-semibold tracking-tight md:text-3xl">
          What do you want to know?
        </label>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            id="community-search"
            name="q"
            type="search"
            placeholder="e.g. How do payments work?"
            className="min-w-0 flex-1 rounded-full border border-white/15 bg-black/40 px-5 py-3.5 text-base text-white outline-none placeholder:text-white/35 focus:border-[#FF5F15]"
          />
          <button type="submit" className="rounded-full bg-[#FF5F15] px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-[#FF7335]">
            Search answers
          </button>
        </div>
        <p className="mt-3 text-sm text-white/45">No answer yet? You can ask the team right there.</p>
      </form>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <section data-reveal>
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-semibold">Latest from Beagine</h2>
            <Link href="/community/updates" className="text-sm text-white/50 hover:text-[#FF5F15]">
              All updates →
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            {latestUpdates.map((item) => (
              <Link
                key={item._id}
                href="/community/updates"
                className={`block rounded-2xl border p-5 transition hover:border-[#FF5F15]/50 ${item.pinned ? "border-[#FF5F15]/40 bg-[#FF5F15]/[.06]" : "border-white/10 bg-white/[.04]"}`}
              >
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#FF5F15]">
                  {item.pinned ? "Pinned · " : ""}
                  {item.topic} <span className="font-normal text-white/35">{dateLabel(item.publishedAt)}</span>
                </p>
                <p className="mt-2 font-semibold">{item.title}</p>
                <p className="mt-1 line-clamp-2 text-sm leading-6 text-white/50">{item.excerpt || item.body}</p>
              </Link>
            ))}
            {!latestUpdates.length ? <Empty text="No updates yet. Announcements and launches will show up here." /> : null}
          </div>
        </section>

        <section data-reveal>
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-semibold">Recently answered</h2>
            <Link href="/community/ask" className="text-sm text-white/50 hover:text-[#FF5F15]">
              All answers →
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            {latestAnswers.map((item) => (
              <Link
                key={item._id}
                href={`/community/ask?q=${encodeURIComponent(item.question.slice(0, 60))}`}
                className="block rounded-2xl border border-white/10 bg-white/[.04] p-5 transition hover:border-[#FF5F15]/50"
              >
                <p className="font-semibold">{item.question}</p>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/50">{item.answer}</p>
                <p className="mt-3 text-xs text-[#FF5F15]">Answered by {item.answeredByName || "Beagine Team"}</p>
              </Link>
            ))}
            {!latestAnswers.length ? <Empty text="No answers yet. Ask the first question and the team will answer it here." href="/community/ask" cta="Ask a question" /> : null}
          </div>
        </section>
      </div>

      <div data-reveal-stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DOORS.map((door) => (
          <Link
            key={door.href}
            href={door.href}
            data-reveal-item
            className="group flex flex-col rounded-[1.75rem] border border-white/10 bg-white/[.04] p-6 transition hover:-translate-y-1 hover:border-[#FF5F15]/50"
          >
            <span className="flex items-center justify-between">
              <span className="text-2xl transition-transform duration-300 group-hover:scale-125" aria-hidden>
                {door.icon}
              </span>
              {counts[door.href] ? <span className="text-xs text-white/35">{counts[door.href]}</span> : null}
            </span>
            <h2 className="mt-8 text-lg font-semibold">{door.label}</h2>
            <p className="mt-2 text-sm leading-6 text-white/55">{door.body}</p>
            <span className="mt-auto pt-6 text-sm font-semibold text-white/70 group-hover:text-[#FF5F15]">Open →</span>
          </Link>
        ))}
      </div>
    </CommunityShell>
  );
}

function Empty({ text, href, cta }: { text: string; href?: string; cta?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 p-6 text-sm text-white/45">
      {text}
      {href && cta ? (
        <Link href={href} className="ml-2 font-semibold text-[#FF5F15]">
          {cta} →
        </Link>
      ) : null}
    </div>
  );
}
