"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import {
  HEAR_ABOUT_OPTIONS,
  PILOT_AREAS,
  TRADES,
} from "@/lib/constants";
import { prefersReducedMotion, registerGsap } from "@/lib/motion/register-gsap";
import { INSTALL_PATH } from "@/lib/constants";
import { WAITLIST_PATH } from "@/lib/research-questions";
import { ResearchQuestionsGroup } from "./research/ResearchQuestionsGroup";
import { SurveyShareBlock } from "./research/SurveyShareBlock";
import { AnimatedStep } from "./waitlist/AnimatedStep";
import {
  RoleChoiceCards,
  type SurveyPath,
} from "./waitlist/RoleChoiceCards";
import { MicroLabel } from "./MicroLabel";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type FormRole = "customer" | "worker";
type WaitlistStep = "choose" | "questionnaire" | "form" | "done";

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

function pathToFormRole(path: SurveyPath): FormRole {
  return path === "customer" ? "customer" : "worker";
}

function pathLabel(path: SurveyPath) {
  return path === "customer" ? "Customer" : "Specialist";
}

export function WaitlistSection() {
  const [step, setStep] = useState<WaitlistStep>("choose");
  const [path, setPath] = useState<SurveyPath | null>(null);
  const [cardsExiting, setCardsExiting] = useState(false);
  const [form, setForm] = useState<WaitlistData>(emptyForm);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [specialistAnswers, setSpecialistAnswers] = useState<
    Record<string, string>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  const questionnaireRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
  }, []);

  const showTrades = form.role === "worker";

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const selectPath = (selected: SurveyPath) => {
    const role = pathToFormRole(selected);

    const go = () => {
      setPath(selected);
      setForm((prev) => ({ ...prev, role }));
      setStep("questionnaire");
      setCardsExiting(false);
      scrollTop();
    };

    if (prefersReducedMotion()) {
      go();
      return;
    }

    setCardsExiting(true);
    gsap.delayedCall(0.38, go);
  };

  const backToChoose = () => {
    setStep("choose");
    setPath(null);
    setCardsExiting(false);
    scrollTop();
  };

  const handleQuestionnaireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("form");
    scrollTop();
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionError("");

    const answers =
      path === "customer" ? userAnswers : specialistAnswers;

    try {
      const { error } = await supabase.from("submissions").insert({
        type: "waitlist",
        role: form.role,
        age_range: answers.age_range,
        waitlist: {
          name: form.name,
          phone: form.phone,
          email: form.email,
          area: form.area,
          trades: form.trades,
          hearAbout: form.hearAbout,
        },
        answers,
      });

      if (error) throw error;

      setStep("done");
      scrollTop();
    } catch (error) {
      console.error("Supabase error:", error);
      setSubmissionError(
        "We couldn't complete your registration. Check your connection and try again. Your answers are still here."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useGSAP(
    () => {
      if (step !== "questionnaire" || !questionnaireRef.current) return;

      const fields = questionnaireRef.current.querySelectorAll(
        "[data-question-field]"
      );
      if (!fields.length) return;

      if (prefersReducedMotion()) {
        gsap.set(fields, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        fields,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.04,
          ease: "power2.out",
          delay: 0.15,
        }
      );
    },
    { dependencies: [step, path] }
  );

  const toggleTrade = (trade: string) => {
    setForm((prev) => ({
      ...prev,
      trades: prev.trades.includes(trade)
        ? prev.trades.filter((t) => t !== trade)
        : [...prev.trades, trade],
    }));
  };

  return (
    <section className="bg-black px-6 pb-20 pt-28 text-white md:pb-28 md:pt-32">
      <div className="mx-auto max-w-2xl">
        {step !== "done" && (
          <WaitlistProgress
            current={step === "choose" ? 1 : step === "questionnaire" ? 2 : 3}
          />
        )}

        {step === "choose" && (
          <AnimatedStep stepKey="choose">
            <MicroLabel>Research</MicroLabel>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">
              Help us solve a problem
            </h2>
            <p className="mt-4 max-w-lg text-white/65">
              Pick the path that fits you — we&apos;ll show the right questions.
              About 5 minutes.
            </p>
            <RoleChoiceCards onSelect={selectPath} exiting={cardsExiting} />
          </AnimatedStep>
        )}

        {step === "questionnaire" && path && (
          <AnimatedStep stepKey={`questionnaire-${path}`}>
            <div id="questionnaire" ref={questionnaireRef}>
              <button
                type="button"
                onClick={backToChoose}
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                ← Back
              </button>

              <div className="mt-6">
                <MicroLabel>{pathLabel(path)} survey</MicroLabel>
              </div>
              <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight">
                Help us solve a problem
              </h2>
              <p className="mt-3 text-white/65">
                Answer honestly so we can build Beagine for how people actually
                hire and work.
              </p>

              <form
                onSubmit={handleQuestionnaireSubmit}
                className="mt-10 space-y-8"
              >
                <div data-question-field>
                  {path === "customer" ? (
                    <ResearchQuestionsGroup
                      role="user"
                      answers={userAnswers}
                      onChange={setUserAnswers}
                      startIndex={1}
                    />
                  ) : (
                    <ResearchQuestionsGroup
                      role="specialist"
                      answers={specialistAnswers}
                      onChange={setSpecialistAnswers}
                      startIndex={1}
                    />
                  )}
                </div>

                <button
                  type="submit"
                  data-question-field
                  className="btn-premium w-full rounded-full bg-[#FF5F15] py-3.5 text-sm font-semibold text-black hover:bg-[#FF7335]"
                >
                  Continue to contact details
                </button>
              </form>
            </div>
          </AnimatedStep>
        )}

        {step === "form" && (
          <AnimatedStep stepKey="form">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                setStep("questionnaire");
                scrollTop();
              }}
              className="text-sm text-white/50 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Back to answers
            </button>
            <MicroLabel className="mt-6">Final step</MicroLabel>
            <h2 className="mt-3 text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-tight">
              Join the waitlist
            </h2>
            <p className="mt-3 text-white/65">
              Your research answers are ready. Add your contact details to complete your registration.
            </p>

            <form
              onSubmit={handleWaitlistSubmit}
              className="mt-10 space-y-5"
              aria-busy={isSubmitting}
            >
              <Field label="Full name" required>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                  placeholder="Your name"
                />
              </Field>

              <Field label="Phone" required>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                  placeholder="e.g. +1 555 123 4567"
                />
              </Field>

              <Field label="Email">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                  placeholder="Optional"
                />
              </Field>

              <Field label="City / area" required>
                <input
                  required
                  type="text"
                  value={form.area}
                  onChange={(e) => setForm({ ...form, area: e.target.value })}
                  className={inputClass}
                  placeholder="e.g. Tema, Dawhenya, Accra"
                  list="waitlist-areas"
                  autoComplete="address-level2"
                />
                <datalist id="waitlist-areas">
                  {PILOT_AREAS.map((area) => (
                    <option key={area} value={area} />
                  ))}
                </datalist>
              </Field>

              {showTrades && (
                <Field label="Trade interest">
                  <div className="flex flex-wrap gap-2">
                    {TRADES.map((trade) => (
                      <button
                        key={trade}
                        type="button"
                        onClick={() => toggleTrade(trade)}
                        className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                          form.trades.includes(trade)
                            ? "bg-[#FF5F15] text-black"
                            : "bg-white/10 text-white ring-1 ring-white/15"
                        }`}
                      >
                        {trade}
                      </button>
                    ))}
                  </div>
                </Field>
              )}

              <SelectField
                label="How did you hear about us?"
                required
                value={form.hearAbout}
                onChange={(hearAbout) => setForm({ ...form, hearAbout })}
                options={[...HEAR_ABOUT_OPTIONS]}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-premium flex w-full items-center justify-center gap-2 rounded-full bg-[#FF5F15] py-3.5 text-sm font-semibold text-black hover:bg-[#FF7335] disabled:cursor-wait disabled:opacity-70"
              >
                {isSubmitting && (
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-black/25 border-t-black"
                    aria-hidden
                  />
                )}
                {isSubmitting ? "Joining waitlist…" : "Join waitlist"}
              </button>

              <div className="min-h-6" aria-live="polite" aria-atomic="true">
                {isSubmitting ? (
                  <p className="text-center text-sm text-white/65">
                    Saving your answers and contact details…
                  </p>
                ) : submissionError ? (
                  <p className="text-center text-sm text-red-300" role="alert">
                    {submissionError}
                  </p>
                ) : null}
              </div>

              <p className="text-center text-xs text-white/50">
                By joining you agree to be contacted about Beagine. We don&apos;t
                sell your data.
              </p>
            </form>
          </AnimatedStep>
        )}

        {step === "done" && (
          <AnimatedStep stepKey="done">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FF5F15]/20 text-2xl text-[#FF5F15]">
                ✓
              </div>
              <div className="mt-6">
                <MicroLabel>All done</MicroLabel>
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Thanks — you&apos;re fully registered.
              </h2>
              <p className="mt-4 text-white/65">
                We&apos;ll be in touch when Beagine opens in your area.
              </p>

              <SurveyShareBlock
                sharePath={WAITLIST_PATH}
                title="Share the waitlist"
                description="Invite friends, neighbours, or colleagues to join and take the survey."
              />

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href={INSTALL_PATH}
                  className="inline-flex justify-center rounded-full bg-[#FF5F15] px-6 py-3 text-sm font-semibold text-black"
                >
                  Install the app
                </Link>
                <Link
                  href="/"
                  className="inline-flex justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Back to home
                </Link>
              </div>
            </div>
          </AnimatedStep>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-white/85">
        {label}
        {required && <span className="text-[#FF5F15]"> *</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function SelectField({
  label,
  required,
  value,
  onChange,
  options,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <Field label={label} required={required}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
        required={required}
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-black text-white">
            {opt}
          </option>
        ))}
      </select>
    </Field>
  );
}

const inputClass =
  "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-shadow placeholder:text-white/35 focus:border-[#FF5F15]/50 focus:ring-2 focus:ring-[#FF5F15]/30";

function WaitlistProgress({ current }: { current: 1 | 2 | 3 }) {
  const labels = ["Choose", "Questions", "Join"];

  return (
    <div className="mb-10" aria-label={`Step ${current} of 3`}>
      <div className="flex items-center gap-2" aria-hidden>
        {labels.map((label, index) => {
          const stepNumber = (index + 1) as 1 | 2 | 3;
          const reached = stepNumber <= current;

          return (
            <div key={label} className="flex min-w-0 flex-1 items-center gap-2">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  reached ? "bg-[#FF5F15] text-black" : "bg-white/10 text-white/45"
                }`}
              >
                {stepNumber}
              </span>
              <span className={`truncate text-xs ${reached ? "text-white" : "text-white/40"}`}>
                {label}
              </span>
              {stepNumber < 3 && (
                <span className={`h-px min-w-2 flex-1 ${stepNumber < current ? "bg-[#FF5F15]" : "bg-white/15"}`} />
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-white/45">
        Step {current} of 3
      </p>
    </div>
  );
}
