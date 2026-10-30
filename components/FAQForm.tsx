"use client";

import { gsap } from "gsap";
import posthog from "posthog-js";
import { useEffect, useRef, useState } from "react";
import { COMMUNITY_API_URL } from "@/lib/community-api";
import { prefersReducedMotion, registerGsap } from "@/lib/motion/register-gsap";
import { CAST, Character } from "./story/Character";
import { Chip, NextButton, fieldClass, usePops } from "./story/Controls";
import { idleCast, nod, wave } from "./story/motion";
import { Typewriter } from "./story/Typewriter";

type Step = "topic" | "question" | "who" | "sent";

const OTHER_TOPIC = "Something else";
const MIN_QUESTION = 10;
const MAX_QUESTION = 2000;
const emptyForm = { topic: "", question: "", name: "", email: "" };

/**
 * "Ask the team" as a chat with a Beagine team member: they type each
 * question, the visitor answers, and the question is sent to the community
 * board for the team to answer.
 */
export function FAQForm({
  topics = [],
  initialQuestion = "",
  initialTopic = "",
}: {
  topics?: readonly string[];
  /** Starts the chat at "ask away" with this already typed (e.g. from a search with no answer). */
  initialQuestion?: string;
  initialTopic?: string;
}) {
  const [step, setStep] = useState<Step>(initialQuestion ? "question" : "topic");
  const [form, setForm] = useState({ ...emptyForm, question: initialQuestion, topic: initialTopic || (initialQuestion ? OTHER_TOPIC : "") });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const agentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => idleCast(agentRef.current), agentRef);
    return () => ctx.revert();
  }, []);

  usePops(rootRef, [step]);

  const set = (patch: Partial<typeof emptyForm>) => setForm((current) => ({ ...current, ...patch }));
  const first = form.name.trim().split(/\s+/)[0] ?? "";
  const questionLength = form.question.trim().length;
  const emailOk = /^\S+@\S+\.\S+$/.test(form.email.trim());
  const canSend = !loading && form.name.trim().length >= 2 && emailOk;

  const celebrate = () => {
    if (prefersReducedMotion() || !agentRef.current) return;
    const tl = gsap.timeline();
    nod(tl, agentRef.current, 0);
    wave(tl, agentRef.current, 0, 2);
  };

  const send = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSend) return;
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch(`${COMMUNITY_API_URL}/community/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          question: form.question.trim(),
          ...(form.topic && form.topic !== OTHER_TOPIC ? { topic: form.topic } : {}),
        }),
      });
      if (!response.ok) throw new Error("Question submission failed");

      posthog.capture("faq_question_submitted", { topic: form.topic || null });
      setStep("sent");
      celebrate();
    } catch (error: unknown) {
      console.error("Error submitting question:", error);
      posthog.captureException(error);
      setErrorMsg("That didn't send. Check your connection and try again. Your question is still here.");
    } finally {
      setLoading(false);
    }
  };

  const prompts: { step: Step; team: string; you?: string }[] = [
    { step: "topic", team: "Hi! What's your question about?", you: form.topic },
    { step: "question", team: "Go ahead, ask away.", you: form.question.trim() },
    { step: "who", team: "Thanks. Who should we say asked?", you: form.name.trim() },
    { step: "sent", team: `Got it${first ? `, ${first}` : ""}! We'll post the answer on this page so everyone can see it.` },
  ];
  const current = prompts.findIndex((prompt) => prompt.step === step);

  return (
    <div ref={rootRef} className="overflow-hidden rounded-3xl border border-white/10 bg-[#0a0f0d]">
      <header className="flex items-center gap-3 border-b border-white/10 px-5 py-4 sm:px-8">
        <div ref={agentRef} className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white/10">
          <Character look={CAST.support} className="h-full w-full" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Ask the team</h3>
          <p className="text-xs text-white/50">We answer here, so everyone can see.</p>
        </div>
      </header>

      <div className="space-y-4 px-5 py-6 sm:px-8 sm:py-8" aria-live="polite">
        {prompts.slice(0, current + 1).map((prompt, index) => (
          <div key={prompt.step} className="space-y-4">
            <TeamBubble text={prompt.team} live={index === current} />
            {index < current && prompt.you ? <YouBubble text={prompt.you} /> : null}
          </div>
        ))}

        {step === "topic" && (
          <div className="flex flex-wrap gap-2 pt-2">
            {[...topics, OTHER_TOPIC].map((topic) => (
              <Chip
                key={topic}
                active={form.topic === topic}
                onClick={() => {
                  set({ topic });
                  setStep("question");
                }}
              >
                {topic}
              </Chip>
            ))}
          </div>
        )}

        {step === "question" && (
          <form
            className="pt-2"
            onSubmit={(event) => {
              event.preventDefault();
              if (questionLength >= MIN_QUESTION) setStep("who");
            }}
          >
            <textarea
              data-pop
              autoFocus
              rows={4}
              maxLength={MAX_QUESTION}
              aria-label="Your question"
              value={form.question}
              onChange={(event) => set({ question: event.target.value })}
              placeholder="How exactly do I verify my trade skills?"
              className={`resize-none ${fieldClass}`}
            />
            <div className="mt-2 flex justify-between text-xs text-white/40">
              <button type="button" onClick={() => setStep("topic")} className="hover:text-white">
                ← Change topic
              </button>
              <span>{questionLength < MIN_QUESTION ? `${MIN_QUESTION - questionLength} more characters` : `${form.question.length}/${MAX_QUESTION}`}</span>
            </div>
            <NextButton type="submit" disabled={questionLength < MIN_QUESTION} />
          </form>
        )}

        {step === "who" && (
          <form className="pt-2" onSubmit={send}>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                data-pop
                autoFocus
                autoComplete="name"
                aria-label="Name"
                value={form.name}
                onChange={(event) => set({ name: event.target.value })}
                placeholder="Your name"
                className={fieldClass}
              />
              <input
                data-pop
                type="email"
                autoComplete="email"
                aria-label="Email (private)"
                value={form.email}
                onChange={(event) => set({ email: event.target.value })}
                placeholder="Email (private)"
                className={fieldClass}
              />
            </div>
            <p className="mt-2 text-xs text-white/40">Your email stays private.</p>
            {errorMsg ? (
              <p role="alert" className="mt-4 text-sm text-red-300">
                {errorMsg}
              </p>
            ) : null}
            <div className="flex flex-wrap items-center gap-5">
              <NextButton type="submit" disabled={!canSend}>
                {loading ? "Sending…" : "Send question"}
              </NextButton>
              <button type="button" onClick={() => setStep("question")} className="mt-8 text-sm text-white/45 hover:text-white">
                ← Edit question
              </button>
            </div>
          </form>
        )}

        {step === "sent" && (
          <button
            type="button"
            data-pop
            onClick={() => {
              setForm(emptyForm);
              setStep("topic");
            }}
            className="pt-2 text-sm font-semibold text-[#FF5F15] hover:text-[#FF7335]"
          >
            Ask another question
          </button>
        )}
      </div>
    </div>
  );
}

function YouBubble({ text }: { text: string }) {
  return <p className="ml-auto w-fit max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-[#FF5F15] px-4 py-2.5 text-sm text-black">{text}</p>;
}

/** The team's message: typing dots, then the words type out. Earlier messages just sit there. */
function TeamBubble({ text, live }: { text: string; live: boolean }) {
  const [typing, setTyping] = useState(live);
  const dotsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!live) return;
    if (prefersReducedMotion()) {
      const id = requestAnimationFrame(() => setTyping(false));
      return () => cancelAnimationFrame(id);
    }
    const tween = gsap.to(dotsRef.current?.children ?? [], { y: -4, duration: 0.3, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.12 });
    const id = setTimeout(() => setTyping(false), 750);
    return () => {
      clearTimeout(id);
      tween.kill();
    };
  }, [live]);

  return (
    <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-white/[.07] px-4 py-2.5 text-sm text-white/85">
      {live && typing ? (
        <span ref={dotsRef} className="flex h-5 items-center gap-1" aria-label="Typing">
          <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
        </span>
      ) : live ? (
        <Typewriter lines={[text]} speed={18} delay={0} />
      ) : (
        <p>{text}</p>
      )}
    </div>
  );
}
