"use client";

import { gsap } from "gsap";
import Link from "next/link";
import posthog from "posthog-js";
import { useEffect, useRef, useState } from "react";
import { HEAR_ABOUT_OPTIONS, PILOT_AREAS, TRADES } from "@/lib/constants";
import { prefersReducedMotion, registerGsap } from "@/lib/motion/register-gsap";
import { WAITLIST_PATH } from "@/lib/research-questions";
import { getSupabaseClient } from "@/lib/supabase";
import { SurveyShareBlock } from "./research/SurveyShareBlock";
import { CAST, Character } from "./story/Character";
import { BackButton, Chip, NextButton, Progress, Question, fieldClass, usePops } from "./story/Controls";
import { Celebrate, IdleCast } from "./story/CastEffects";
import { nod, wave } from "./story/motion";
import { Typewriter } from "./story/Typewriter";

type FormRole = "customer" | "worker";
type Step = "role" | "name" | "contact" | "area" | "trades" | "hear" | "done";

type WaitlistData = {
  name: string;
  phone: string;
  email: string;
  role: FormRole;
  area: string;
  trades: string[];
  hearAbout: string;
};

const emptyForm: WaitlistData = {
  name: "",
  phone: "",
  email: "",
  role: "customer",
  area: "",
  trades: [],
  hearAbout: "",
};

const ROLES = [
  { role: "customer", look: CAST.customer, title: "I need things fixed", body: "Hire plumbers, electricians and more, near you." },
  { role: "worker", look: CAST.specialist, title: "I fix things", body: "Get jobs near you as a specialist." },
] as const;

const firstName = (name: string) => name.trim().split(/\s+/)[0] ?? "";
const digits = (value: string) => value.replace(/\D/g, "").length;

/**
 * Waitlist sign-up as a short conversation: one question at a time, with the
 * customer and specialist characters. Saves the same row to Supabase
 * `submissions` as the old form did.
 */
export function WaitlistSection() {
  const [step, setStep] = useState<Step>("role");
  const [form, setForm] = useState<WaitlistData>(emptyForm);
  const [otherArea, setOtherArea] = useState(false);
  const [picking, setPicking] = useState<FormRole | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  const stageRef = useRef<HTMLElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
  }, []);

  usePops(stageRef, [step]);

  const steps: Step[] = form.role === "worker" ? ["role", "name", "contact", "area", "trades", "hear"] : ["role", "name", "contact", "area", "hear"];
  const index = steps.indexOf(step);
  const go = (next: Step) => {
    setStep(next);
    stageRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  };
  const next = () => go(steps[index + 1]);
  const back = () => go(steps[Math.max(0, index - 1)]);
  const set = (patch: Partial<WaitlistData>) => setForm((current) => ({ ...current, ...patch }));
  const role = ROLES.find((item) => item.role === form.role)!;
  const first = firstName(form.name);

  const pickRole = (selected: FormRole) => {
    if (picking) return;
    set({ role: selected, trades: selected === "worker" ? form.trades : [] });
    posthog.capture("waitlist_role_selected", { role: selected === "worker" ? "specialist" : "customer" });
    const card = rolesRef.current?.querySelector(`[data-role="${selected}"]`);
    if (prefersReducedMotion() || !card) return go("name");
    setPicking(selected);
    const tl = gsap.timeline({
      onComplete: () => {
        setPicking(null);
        go("name");
      },
    });
    tl.to(card, { scale: 1.05, duration: 0.2, ease: "power2.out" }).to(card, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.45)" });
    nod(tl, card, 0.05);
    wave(tl, card, 0.05, 2);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionError("");

    try {
      const { error } = await getSupabaseClient().from("submissions").insert({
        type: "waitlist",
        role: form.role,
        age_range: null,
        waitlist: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          area: form.area.trim(),
          trades: form.role === "worker" ? form.trades : [],
          hearAbout: form.hearAbout,
        },
        answers: {},
      });

      if (error) throw error;

      posthog.capture("waitlist_joined", {
        role: form.role,
        area: form.area,
        hear_about: form.hearAbout,
        trades_count: form.role === "worker" ? form.trades.length : 0,
      });

      go("done");
    } catch (error) {
      console.error("Supabase error:", error);
      posthog.captureException(error);
      setSubmissionError("We couldn't complete your registration. Check your connection and try again. Your details are still here.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /** Each text step is a tiny form, so Enter moves on. */
  const nextIf = (event: React.FormEvent, ready: boolean) => {
    event.preventDefault();
    if (ready) next();
  };

  return (
    <section ref={stageRef} className="scroll-mt-24 bg-black px-6 pb-20 pt-28 text-white md:pb-28 md:pt-32">
      <div className="mx-auto min-h-[60svh] max-w-2xl">
        {step !== "done" ? <Progress value={index / steps.length} /> : null}

        {step !== "role" && step !== "done" ? (
          <div className="mb-8 flex items-center justify-between gap-4">
            <BackButton onClick={back} />
            <div data-pop className="mb-6 flex min-w-0 items-center gap-2 rounded-full border border-white/10 bg-white/[.04] py-1 pl-1 pr-4 text-xs text-white/55">
              <span className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-white/10">
                <Character look={role.look} className="h-full w-full" />
              </span>
              <span className="truncate">
                {[form.role === "worker" ? "Specialist" : "Customer", first, form.area].filter(Boolean).join(" · ")}
              </span>
            </div>
          </div>
        ) : null}

        {step === "role" && (
          <div>
            <Typewriter
              lines={["Early access.", "Are you hiring, or are you the one fixing?"]}
              speed={34}
              delay={300}
              className="font-semibold leading-[1.05] tracking-[-.03em]"
              lineClassName={(i) => (i === 0 ? "text-sm font-bold uppercase tracking-[.18em] text-[#FF5F15]" : "mt-3 text-[clamp(2rem,6vw,3.4rem)]")}
            />
            <div ref={rolesRef} className="mt-10 grid gap-4 sm:grid-cols-2">
              {ROLES.map((item) => (
                <button
                  key={item.role}
                  type="button"
                  data-pop
                  data-role={item.role}
                  onClick={() => pickRole(item.role)}
                  className={`group flex items-center gap-4 rounded-[1.75rem] border p-4 text-left transition-[border-color,background-color,opacity] duration-300 sm:flex-col sm:items-start sm:p-6 ${
                    picking === item.role
                      ? "border-[#FF5F15] bg-[#FF5F15]/10"
                      : picking
                        ? "border-white/5 opacity-30"
                        : "border-white/10 bg-white/[.04] hover:border-white/30"
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

        {step === "name" && (
          <form onSubmit={(event) => nextIf(event, form.name.trim().length >= 2)}>
            <Question text="Nice. What's your name?" />
            <input
              data-pop
              autoFocus
              autoComplete="name"
              aria-label="Full name"
              value={form.name}
              onChange={(event) => set({ name: event.target.value })}
              placeholder="Your full name"
              className={fieldClass}
            />
            <NextButton type="submit" disabled={form.name.trim().length < 2} />
          </form>
        )}

        {step === "contact" && (
          <form onSubmit={(event) => nextIf(event, digits(form.phone) >= 9)}>
            <Question text={`Hi ${first}! What number can we reach you on?`} hint="We'll text you when Beagine opens near you." />
            <input
              data-pop
              autoFocus
              type="tel"
              autoComplete="tel"
              aria-label="Phone"
              value={form.phone}
              onChange={(event) => set({ phone: event.target.value })}
              placeholder="e.g. 024 123 4567"
              className={fieldClass}
            />
            <input
              data-pop
              type="email"
              autoComplete="email"
              aria-label="Email (optional)"
              value={form.email}
              onChange={(event) => set({ email: event.target.value })}
              placeholder="Email (optional)"
              className={`mt-3 ${fieldClass}`}
            />
            <NextButton type="submit" disabled={digits(form.phone) < 9} />
          </form>
        )}

        {step === "area" && (
          <form onSubmit={(event) => nextIf(event, Boolean(form.area.trim()))}>
            <Question text="Where are you based?" hint="We're starting in a few areas first." />
            <div className="flex flex-wrap gap-2.5">
              {PILOT_AREAS.map((area) => {
                const active = area === "Other" ? otherArea : !otherArea && form.area === area;
                return (
                  <Chip
                    key={area}
                    active={active}
                    onClick={() => {
                      setOtherArea(area === "Other");
                      set({ area: area === "Other" ? "" : area });
                    }}
                  >
                    {area}
                  </Chip>
                );
              })}
            </div>
            {otherArea ? (
              <input
                autoFocus
                autoComplete="address-level2"
                aria-label="Your area"
                value={form.area}
                onChange={(event) => set({ area: event.target.value })}
                placeholder="Type your town or area"
                className={`mt-5 ${fieldClass}`}
              />
            ) : null}
            <NextButton type="submit" disabled={!form.area.trim()} />
          </form>
        )}

        {step === "trades" && (
          <div>
            <Question text="What kind of work do you do?" hint="Choose all that apply." />
            <div className="flex flex-wrap gap-2.5">
              {TRADES.map((trade) => (
                <Chip
                  key={trade}
                  active={form.trades.includes(trade)}
                  onClick={() => set({ trades: form.trades.includes(trade) ? form.trades.filter((item) => item !== trade) : [...form.trades, trade] })}
                >
                  {trade}
                </Chip>
              ))}
            </div>
            <NextButton onClick={next}>{form.trades.length ? "Next" : "Skip"}</NextButton>
          </div>
        )}

        {step === "hear" && (
          <div>
            <Question text="Last one. How did you hear about us?" />
            <div className="flex flex-wrap gap-2.5">
              {HEAR_ABOUT_OPTIONS.map((option) => (
                <Chip key={option} active={form.hearAbout === option} onClick={() => set({ hearAbout: option })}>
                  {option}
                </Chip>
              ))}
            </div>
            <div className="min-h-6" aria-live="polite" aria-atomic="true">
              {submissionError ? (
                <p className="mt-6 text-sm text-red-300" role="alert">
                  {submissionError}
                </p>
              ) : null}
            </div>
            <NextButton disabled={!form.hearAbout || isSubmitting} onClick={handleSubmit}>
              {isSubmitting ? "Joining…" : "Join the waitlist"}
            </NextButton>
            <p className="mt-5 text-xs text-white/45">By joining you agree to be contacted about Beagine. We don&apos;t sell your data.</p>
          </div>
        )}

        {step === "done" && (
          <div className="text-center">
            <div data-pop className="mx-auto w-fit">
              <div ref={rolesRef} className="h-36 w-36 overflow-hidden rounded-[2rem] bg-gradient-to-b from-white/10 to-white/[.02]">
                <Character look={role.look} className="h-full w-full" />
              </div>
            </div>
            <Celebrate scope={rolesRef} />
            <Typewriter
              lines={[`You're in${first ? `, ${first}` : ""}.`]}
              speed={55}
              delay={400}
              className="mt-8 text-[clamp(2.4rem,8vw,4.5rem)] font-semibold leading-none tracking-[-.04em]"
            />
            <p data-pop className="mt-5 text-white/65">
              We&apos;ll text you when Beagine opens{form.area ? ` in ${form.area}` : " in your area"}.
            </p>

            <SurveyShareBlock
              sharePath={WAITLIST_PATH}
              title="Share the waitlist"
              description="Invite friends, neighbours, or colleagues to join."
              qrLabel="Scan to join the waitlist"
            />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="inline-flex justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Back to home
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
