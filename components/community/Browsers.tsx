"use client";

import { useMemo, useRef, useState } from "react";
import type { CommunityContent, CommunityQuestion } from "@/lib/community-api";
import { FAQForm } from "../FAQForm";
import { fieldClass } from "../story/Controls";

const ALL = "All";

/** Topics worth offering as filters: the page's list in its order, then any others the items use. */
function topicsIn(items: { topic?: string }[], preferred: readonly string[]) {
  const used = new Map<string, number>();
  for (const item of items) if (item.topic) used.set(item.topic, (used.get(item.topic) ?? 0) + 1);
  const ordered = [...preferred.filter((topic) => used.has(topic)), ...[...used.keys()].filter((topic) => !preferred.includes(topic))];
  return { ordered, used };
}

function TopicChips({ items, preferred, value, onChange }: { items: { topic?: string }[]; preferred: readonly string[]; value: string; onChange: (topic: string) => void }) {
  const { ordered, used } = topicsIn(items, preferred);
  if (ordered.length < 2) return null;
  return (
    <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
      {[ALL, ...ordered].map((topic) => (
        <button
          key={topic}
          type="button"
          aria-pressed={value === topic}
          onClick={() => onChange(topic)}
          className={`rounded-full border px-4 py-2 text-sm transition-colors ${
            value === topic ? "border-[#FF5F15] bg-[#FF5F15] font-semibold text-black" : "border-white/10 bg-white/5 text-white/65 hover:border-white/30"
          }`}
        >
          {topic}
          <span className={`ml-1.5 text-xs ${value === topic ? "text-black/60" : "text-white/35"}`}>{topic === ALL ? items.length : used.get(topic)}</span>
        </button>
      ))}
    </div>
  );
}

/** Opens and closes by animating height, without measuring. */
function Reveal({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (q.length < 2) return <>{text}</>;
  const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <mark key={i} className="rounded bg-[#FF5F15]/30 px-0.5 text-white">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

const dateLabel = (value?: string) => (value ? new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "");

/* ---------- Ask Beagine ---------- */

export function AskBrowser({ questions, topics, initialSearch = "" }: { questions: CommunityQuestion[]; topics: readonly string[]; initialSearch?: string }) {
  const [search, setSearch] = useState(initialSearch);
  const [topic, setTopic] = useState(ALL);
  const [open, setOpen] = useState<string | null>(null);
  const [draft, setDraft] = useState({ key: 0, question: "", topic: "" });
  const chatRef = useRef<HTMLDivElement>(null);

  const q = search.trim().toLowerCase();
  const shown = questions.filter(
    (item) => (topic === ALL || item.topic === topic) && (!q || `${item.question} ${item.answer}`.toLowerCase().includes(q))
  );

  const askThis = () => {
    setDraft((current) => ({ key: current.key + 1, question: search.trim(), topic: topic === ALL ? "" : topic }));
    chatRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="space-y-8">
      {questions.length ? (
        <div className="space-y-4">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35" aria-hidden>
              ⌕
            </span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search answers, e.g. payments, verification…"
              aria-label="Search answers"
              className={`pl-10 ${fieldClass}`}
            />
          </div>
          <TopicChips items={questions} preferred={topics} value={topic} onChange={setTopic} />
        </div>
      ) : null}

      <div className="space-y-3">
        {shown.map((item) => {
          const isOpen = open === item._id || (q.length >= 2 && shown.length <= 3);
          return (
            <article key={item._id} className={`rounded-2xl border transition-colors ${isOpen ? "border-[#FF5F15]/40 bg-white/[.06]" : "border-white/10 bg-white/[.04]"}`}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(open === item._id ? null : item._id)}
                className="flex w-full items-start justify-between gap-4 p-5 text-left md:p-6"
              >
                <span>
                  {item.topic ? <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-[#FF5F15]">{item.topic}</span> : null}
                  <span className="text-lg font-semibold">
                    <Highlight text={item.question} query={search} />
                  </span>
                </span>
                <span className={`mt-1 shrink-0 text-xl text-white/40 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} aria-hidden>
                  +
                </span>
              </button>
              <Reveal open={isOpen}>
                <div className="border-t border-white/10 px-5 py-5 md:px-6">
                  <p className="whitespace-pre-wrap leading-7 text-white/65">
                    <Highlight text={item.answer} query={search} />
                  </p>
                  <p className="mt-4 text-xs text-[#FF5F15]">
                    Answered by {item.answeredByName || "Beagine Team"}
                    {item.answeredAt ? <span className="text-white/35"> · {dateLabel(item.answeredAt)}</span> : null}
                  </p>
                </div>
              </Reveal>
            </article>
          );
        })}

        {!shown.length ? (
          <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center">
            <p className="text-white/55">
              {questions.length ? (q ? <>No answers about &ldquo;{search.trim()}&rdquo; yet.</> : "No answers in this topic yet.") : "No published answers yet. Be the first to ask."}
            </p>
            {q ? (
              <button type="button" onClick={askThis} className="mt-4 rounded-full bg-[#FF5F15] px-6 py-3 text-sm font-semibold text-black">
                Ask the team this →
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      <div ref={chatRef} className="scroll-mt-28 pt-6">
        <FAQForm key={draft.key} topics={topics} initialQuestion={draft.question} initialTopic={draft.topic} />
      </div>
    </div>
  );
}

/* ---------- Updates ---------- */

export function UpdatesBrowser({ items, topics }: { items: CommunityContent[]; topics: readonly string[] }) {
  const [topic, setTopic] = useState(ALL);
  const [open, setOpen] = useState<string | null>(null);
  const sorted = useMemo(() => [...items].sort((a, b) => Number(b.pinned) - Number(a.pinned)), [items]);
  const shown = sorted.filter((item) => topic === ALL || item.topic === topic);

  if (!items.length) {
    return <div className="rounded-3xl border border-dashed border-white/15 p-10 text-center text-white/45">No community updates yet. Check back soon.</div>;
  }

  return (
    <div className="space-y-6">
      <TopicChips items={items} preferred={topics} value={topic} onChange={setTopic} />
      <div data-reveal-stagger className="relative space-y-4 border-l border-white/10 pl-6 md:pl-10">
        {shown.map((item) => {
          const long = item.body.length > 320;
          const isOpen = open === item._id;
          return (
            <article
              key={item._id}
              data-reveal-item
              className={`relative rounded-[1.75rem] border p-6 md:p-8 ${item.pinned ? "border-[#FF5F15]/50 bg-[#FF5F15]/[.07]" : "border-white/10 bg-white/[.04]"}`}
            >
              <span className={`absolute -left-[31px] top-9 h-3 w-3 rounded-full md:-left-[47px] ${item.pinned ? "bg-[#FF5F15]" : "bg-white/30"}`} aria-hidden />
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-white/40">
                <span className="text-[#FF5F15]">{item.topic}</span>
                {item.pinned ? <span className="rounded-full bg-[#FF5F15] px-2 py-0.5 font-bold text-black">Pinned</span> : null}
                <span>{dateLabel(item.publishedAt)}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold">{item.title}</h2>
              <p className={`mt-4 whitespace-pre-wrap leading-7 text-white/60 ${long && !isOpen ? "line-clamp-4" : ""}`}>{item.body}</p>
              {long ? (
                <button type="button" onClick={() => setOpen(isOpen ? null : item._id)} className="mt-4 text-sm font-semibold text-[#FF5F15]">
                  {isOpen ? "Show less" : "Read more"}
                </button>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Learn ---------- */

export function LearnBrowser({ items, topics }: { items: CommunityContent[]; topics: readonly string[] }) {
  const [topic, setTopic] = useState(ALL);
  const [open, setOpen] = useState<string | null>(null);
  const shown = items.filter((item) => topic === ALL || item.topic === topic);

  if (!items.length) {
    return <div className="rounded-3xl border border-dashed border-white/15 p-10 text-center text-white/45">Guides are on the way. Have something you&apos;d like explained? Ask the team.</div>;
  }

  return (
    <div className="space-y-6">
      <TopicChips items={items} preferred={topics} value={topic} onChange={setTopic} />
      <div data-reveal-stagger className="grid gap-4 md:grid-cols-2">
        {shown.map((item) => {
          const isOpen = open === item._id;
          return (
            <article
              key={item._id}
              data-reveal-item
              className={`flex flex-col rounded-[1.75rem] border p-7 transition-colors ${isOpen ? "border-[#FF5F15]/40 bg-white/[.06] md:col-span-2" : "border-white/10 bg-white/[.04]"}`}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF5F15]">{item.topic}</span>
              <h2 className="mt-4 text-2xl font-semibold">{item.title}</h2>
              {item.excerpt ? <p className="mt-3 leading-7 text-white/55">{item.excerpt}</p> : null}
              <Reveal open={isOpen || !item.excerpt}>
                <p className={`mt-4 whitespace-pre-wrap leading-7 text-white/65 ${item.excerpt ? "border-t border-white/10 pt-4" : ""} ${!isOpen && !item.excerpt ? "line-clamp-3" : ""}`}>
                  {item.body}
                </p>
              </Reveal>
              <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : item._id)} className="mt-6 self-start text-sm font-semibold text-white hover:text-[#FF5F15]">
                {isOpen ? "Close guide" : "Read guide →"}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
