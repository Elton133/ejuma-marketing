"use client";

import { gsap } from "gsap";
import Link from "next/link";
import posthog from "posthog-js";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, registerGsap } from "@/lib/motion/register-gsap";
import {
  getResearchQuestions,
  RESEARCH_PATH,
  WAITLIST_PATH,
  type ResearchQuestion,
  type ResearchRole,
} from "@/lib/research-questions";
import { getSupabaseClient } from "@/lib/supabase";
import { SurveyShareBlock } from "./SurveyShareBlock";
import type { ResearchAnswer } from "./ResearchQuestionsGroup";
import { CAST, Character } from "../story/Character";
import { BackButton, Chip, NextButton, Progress, Question, fieldClass, usePops } from "../story/Controls";
import { Celebrate, IdleCast } from "../story/CastEffects";
import { nod, wave } from "../story/motion";
import { Typewriter } from "../story/Typewriter";

const ROLES = [
  { role: "user", look: CAST.customer, title: "I hire skilled workers", body: "For my home or business." },
  { role: "specialist", look: CAST.specialist, title: "I'm a skilled worker", body: "I use my skills to solve problems." },
] as const;

/** A tap on an answer moves on after this long, so the choice is seen first. */
const ADVANCE_DELAY = 260;

/** "10 — Extremely likely" → "10". */
const scoreOf = (option: string) => option.split(" ")[0];

/**
 * The research questionnaire as a short conversation: who you are, then one
 * question at a time. Saves the same Supabase `submissions` row the old form
 * did (type "research"), so imports and the admin Questionnaire page are
 * unchanged.
 */
export function ResearchConversation({ initialRole }: { initialRole?: ResearchRole }) {
  const [role, setRole] = useState<ResearchRole | null>(initialRole ?? null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, ResearchAnswer>>({});
  const [otherOpen, setOtherOpen] = useState<Record<string, boolean>>({});
  const [picking, setPicking] = useState<ResearchRole | null>(null);
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const stageRef = useRef<HTMLElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const advanceTimer = useRef<number | null>(null);

  useEffect(() => {
    registerGsap();
    return () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    };
  }, []);

  const questions = role ? getResearchQuestions(role) : [];
  const question: ResearchQuestion | undefined = questions[index];
  const step = done ? "done" : !role ? "role" : `q-${index}`;
  usePops(stageRef, [step]);

  const scrollTop = () => stageRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  const goTo = (next: number) => {
    setIndex(next);
    setSubmissionError("");
    scrollTop();
  };

  const pickRole = (selected: ResearchRole) => {
    if (picking) return;
    posthog.capture("research_role_selected", { role: selected });
    const card = rolesRef.current?.querySelector(`[data-role="${selected}"]`);
    const start = () => {
      setPicking(null);
      setRole(selected);
      setIndex(0);
      scrollTop();
    };
    if (prefersReducedMotion() || !card) return start();
    setPicking(selected);
    const tl = gsap.timeline({ onComplete: start });
    tl.to(card, { scale: 1.05, duration: 0.2, ease: "power2.out" }).to(card, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.45)" });
    nod(tl, card, 0.05);
    wave(tl, card, 0.05, 2);
  };

  const submit = async (finalAnswers: Record<string, ResearchAnswer>) => {
    if (isSubmitting || !role) return;
    setIsSubmitting(true);
    setSubmissionError("");
    try {
      const ageRange = finalAnswers.age_range;
      const { error } = await getSupabaseClient().from("submissions").insert({
        type: "research",
        role: role === "user" ? "customer" : "worker",
        age_range: typeof ageRange === "string" ? ageRange : null,
        waitlist: {},
        answers: finalAnswers,
      });
      if (error) throw error;
      posthog.capture("research_survey_submitted", { role });
      setDone(true);
      scrollTop();
    } catch (error) {
      console.error("Supabase error:", error);
      posthog.captureException(error);
      setSubmissionError("We couldn't save your answers. Check your connection and try again — your answers are still here.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLast = index === questions.length - 1;
  /** Next question, or send everything after the last one. */
  const advance = (finalAnswers = answers) => (isLast ? void submit(finalAnswers) : goTo(index + 1));

  const choose = (option: string) => {
    if (!question) return;
    if (option === "Other") {
      setOtherOpen((current) => ({ ...current, [question.id]: true }));
      setAnswers((current) => ({ ...current, [question.id]: { answer: "Other", other: "" } }));
      return;
    }
    setOtherOpen((current) => ({ ...current, [question.id]: false }));
    const next = { ...answers, [question.id]: option };
    setAnswers(next);
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => advance(next), prefersReducedMotion() ? 0 : ADVANCE_DELAY);
  };

  const value = question ? answers[question.id] : undefined;
  const textValue = typeof value === "string" ? value : "";
  const otherValue = typeof value === "object" ? value.other : "";
  const ready = !question
    ? false
    : question.type === "select"
      ? typeof value === "string" || otherValue.trim().length > 0
      : textValue.trim().length > 0;

  return (
    <section ref={stageRef} className="scroll-mt-24 bg-black px-6 pb-20 pt-28 text-white md:pb-28 md:pt-32">
      <div className="mx-auto min-h-[60svh] max-w-2xl">
        {step === "role" && (
          <div>
            <Typewriter
              lines={["Research · under 5 minutes", "Help us solve a problem. Who are you?"]}
              speed={34}
              delay={300}
              className="font-semibold leading-[1.05] tracking-[-.03em]"
              lineClassName={(i) => (i === 0 ? "text-sm font-bold uppercase tracking-[.18em] text-[#FF5F15]" : "mt-3 text-[clamp(2rem,6vw,3.4rem)]")}
            />
            <p data-pop className="mt-4 max-w-lg text-white/60">
              We&apos;re building a better way to book skilled workers. There are no wrong answers — honesty helps most.
            </p>
            <div ref={rolesRef} className="mt-10 grid gap-4 sm:grid-cols-2">
              {ROLES.map((item) => (
                <button
                  key={item.role}
                  type="button"
                  data-pop
                  data-role={item.role}
                  onClick={() => pickRole(item.role)}
                  className={`flex items-center gap-4 rounded-[1.75rem] border p-4 text-left transition-[border-color,background-color,opacity] duration-300 sm:flex-col sm:items-start sm:p-6 ${
                    picking === item.role ? "border-[#FF5F15] bg-[#FF5F15]/10" : picking ? "border-white/5 opacity-30" : "border-white/10 bg-white/[.04] hover:border-white/30"
                  }`}
                >
                  <span className="h-20 w-20 shrink-0 overflow-hidden rounded-[1.25rem] bg-gradient-to-b from-white/10 to-white/[.02] sm:h-28 sm:w-28">
                    <Character look={item.look} className="h-full w-full" />
                  </span>
                  <span>
                    <span className="block text-lg font-semibold">{item.title}</span>
                    <span className="mt-1 block text-sm text-white/55">{item.body}</span>
                  </span>
                </button>
              ))}
            </div>
            <IdleCast scope={rolesRef} />
          </div>
        )}

        {step.startsWith("q-") && role && question && (
          <div>
            <Progress value={index / questions.length} />
            <div className="mb-8 flex items-center justify-between gap-4">
              {index > 0 || !initialRole ? (
                <BackButton
                  onClick={() => {
                    if (index > 0) goTo(index - 1);
                    else {
                      setRole(null);
                      scrollTop();
                    }
                  }}
                />
              ) : (
                <Link href={RESEARCH_PATH} className="mb-6 text-sm text-white/45 hover:text-white">
                  ← Back
                </Link>
              )}
              <p className="mb-6 text-xs font-semibold tabular-nums text-white/40">
                {index + 1} of {questions.length}
              </p>
            </div>

            <Question text={question.label} hint={question.type === "textarea" ? question.placeholder : undefined} />

            {question.type === "select" && question.options ? (
              question.id === "recommend_likelihood" ? (
                <ScorePicker
                  options={question.options}
                  value={typeof value === "string" ? value : undefined}
                  onPick={choose}
                />
              ) : (
                <div className="flex flex-wrap gap-2.5">
                  {question.options.map((option) => (
                    <Chip key={option} active={value === option} onClick={() => choose(option)}>
                      {option}
                    </Chip>
                  ))}
                  {question.allowOther ? (
                    <Chip active={typeof value === "object"} onClick={() => choose("Other")}>
                      Other
                    </Chip>
                  ) : null}
                </div>
              )
            ) : null}

            {question.type === "select" && otherOpen[question.id] ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (ready) advance();
                }}
              >
                <input
                  autoFocus
                  aria-label="Please specify"
                  value={otherValue}
                  onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: { answer: "Other", other: event.target.value } }))}
                  placeholder="Please specify"
                  className={`mt-5 ${fieldClass}`}
                />
                <NextButton type="submit" disabled={!ready || isSubmitting}>
                  {isLast ? (isSubmitting ? "Sending…" : "Send my answers") : "Next"}
                </NextButton>
              </form>
            ) : null}

            {question.type !== "select" ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (ready) advance();
                }}
              >
                {question.type === "textarea" ? (
                  <textarea
                    data-pop
                    autoFocus
                    rows={4}
                    aria-label={question.label}
                    value={textValue}
                    onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}
                    placeholder="Type your answer"
                    className={`resize-none ${fieldClass}`}
                  />
                ) : (
                  <input
                    data-pop
                    autoFocus
                    aria-label={question.label}
                    value={textValue}
                    onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}
                    placeholder={question.placeholder ?? "Type your answer"}
                    className={fieldClass}
                  />
                )}
                <NextButton type="submit" disabled={!ready || isSubmitting}>
                  {isLast ? (isSubmitting ? "Sending…" : "Send my answers") : "Next"}
                </NextButton>
              </form>
            ) : null}

            {/* A chosen answer on the last question sends straight away; show progress and errors here. */}
            {isSubmitting && question.type === "select" && !otherOpen[question.id] ? <p className="mt-6 text-sm text-white/50">Sending your answers…</p> : null}
            <div className="min-h-6" aria-live="polite" aria-atomic="true">
              {submissionError ? (
                <div className="mt-6">
                  <p className="text-sm text-red-300" role="alert">
                    {submissionError}
                  </p>
                  <button type="button" onClick={() => void submit(answers)} className="mt-3 text-sm font-semibold text-[#FF5F15]">
                    Try again
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        )}

        {step === "done" && role && (
          <div className="text-center">
            <div data-pop className="mx-auto w-fit">
              <div ref={doneRef} className="h-36 w-36 overflow-hidden rounded-[2rem] bg-gradient-to-b from-white/10 to-white/[.02]">
                <Character look={role === "user" ? CAST.customer : CAST.specialist} className="h-full w-full" />
              </div>
            </div>
            <Celebrate scope={doneRef} />
            <Typewriter lines={["Thank you."]} speed={60} delay={400} className="mt-8 text-[clamp(2.4rem,8vw,4.5rem)] font-semibold leading-none tracking-[-.04em]" />
            <p data-pop className="mt-5 text-white/65">
              Your answers are in. They help us decide what to build first.
            </p>
            <SurveyShareBlock
              sharePath={RESEARCH_PATH}
              title="Share the research survey"
              description="Know someone whose experience could help us? Send them the link or QR code."
              qrLabel="Scan to take the survey"
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/" className="inline-flex justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                Back to home
              </Link>
              <Link href={WAITLIST_PATH} className="inline-flex justify-center rounded-full bg-[#FF5F15] px-6 py-3 text-sm font-semibold text-black">
                Join waitlist
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/** 0–10 as a row of number buttons, labelled at both ends. Stores the original option text. */
function ScorePicker({ options, value, onPick }: { options: readonly string[]; value?: string; onPick: (option: string) => void }) {
  const ordered = [...options].sort((a, b) => Number(scoreOf(a)) - Number(scoreOf(b)));
  return (
    <div data-pop>
      {/* Two rows on phones so each number is a comfortable tap target; one row from tablet up. */}
      <div className="grid grid-cols-6 gap-2 sm:grid-cols-11 sm:gap-1.5" role="radiogroup" aria-label="Score from 0 to 10">
        {ordered.map((option) => {
          const active = value === option;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={option}
              onClick={() => onPick(option)}
              className={`aspect-square rounded-xl border text-sm font-semibold tabular-nums transition-colors sm:text-base ${
                active ? "border-[#FF5F15] bg-[#FF5F15] text-black" : "border-white/15 bg-white/[.04] text-white/80 hover:border-white/40"
              }`}
            >
              {scoreOf(option)}
            </button>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-xs text-white/45">
        <span>Not at all likely</span>
        <span>Extremely likely</span>
      </div>
    </div>
  );
}
