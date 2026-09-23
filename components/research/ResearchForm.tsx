"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import posthog from "posthog-js";
import {
  getResearchQuestions,
  getResearchTitle,
  RESEARCH_PATH,
  type ResearchRole,
} from "@/lib/research-questions";
import { getSupabaseClient } from "@/lib/supabase";
import { MicroLabel } from "../MicroLabel";

const inputClass =
  "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-shadow placeholder:text-white/35 focus:border-[#FF5F15]/50 focus:ring-2 focus:ring-[#FF5F15]/30";

export function ResearchForm({ role }: { role: ResearchRole }) {
  const router = useRouter();
  const questions = getResearchQuestions(role);
  const [answers, setAnswers] = useState<
    Record<string, string | { answer: "Other"; other: string }>
  >({});
  const [otherValues, setOtherValues] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  const setAnswer = (id: string, value: string) => {
    if (value === "Other") {
      setAnswers((prev) => ({
        ...prev,
        [id]: { answer: "Other", other: otherValues[id] ?? "" },
      }));
      return;
    }
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const setOther = (id: string, value: string) => {
    setOtherValues((prev) => ({ ...prev, [id]: value }));
    setAnswers((prev) => ({
      ...prev,
      [id]: { answer: "Other", other: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionError("");

    try {
      const ageRange = answers.age_range;
      const { error } = await getSupabaseClient().from("submissions").insert({
        type: "research",
        role: role === "user" ? "customer" : "worker",
        age_range: typeof ageRange === "string" ? ageRange : null,
        waitlist: {},
        answers,
      });

      if (error) throw error;

      posthog.capture("research_survey_submitted", { role });
      router.push(`${RESEARCH_PATH}/complete?role=${role}`);
    } catch (error) {
      console.error("Supabase error:", error);
      posthog.captureException(error);
      setSubmissionError(
        "We couldn't save your answers. Check your connection and try again — your answers are still here."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-black px-6 pb-20 pt-28 text-white md:pb-28 md:pt-32">
      <div className="mx-auto max-w-2xl">
        <Link
          href={RESEARCH_PATH}
          className="text-sm text-white/50 transition-colors hover:text-white"
        >
          ← Back
        </Link>

        <MicroLabel className="mt-6">Research</MicroLabel>
        <h1 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight">
          {getResearchTitle(role)}
        </h1>
        <p className="mt-3 text-white/65">
          Your answers help us build Beagine. There are no wrong
          answers — honesty helps most.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          {questions.map((q, index) => {
            const value = answers[q.id];
            const isOther = typeof value === "object" && value.answer === "Other";

            return (
            <label key={q.id} className="block">
              <span className="text-sm font-medium leading-snug text-white/90">
                <span className="text-[#FF5F15]">{index + 1}.</span> {q.label}
              </span>
              <div className="mt-2">
                {q.type === "select" && q.options ? (
                  <>
                    <select
                      required
                      value={typeof value === "object" ? value.answer : value ?? ""}
                      onChange={(e) => setAnswer(q.id, e.target.value)}
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select…
                      </option>
                      {q.options.map((opt) => (
                        <option key={opt} value={opt} className="bg-black text-white">
                          {opt}
                        </option>
                      ))}
                      {q.allowOther && <option value="Other">Other</option>}
                    </select>
                    {isOther && (
                      <input
                        required
                        type="text"
                        value={otherValues[q.id] ?? ""}
                        onChange={(e) => setOther(q.id, e.target.value)}
                        className={`${inputClass} mt-3`}
                        placeholder="Please specify"
                      />
                    )}
                  </>
                ) : q.type === "textarea" ? (
                  <textarea
                    required
                    rows={4}
                    value={typeof value === "string" ? value : ""}
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                    className={`${inputClass} resize-y min-h-[100px]`}
                    placeholder={q.placeholder}
                  />
                ) : (
                  <input
                    required
                    type="text"
                    value={typeof value === "string" ? value : ""}
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                    className={inputClass}
                    placeholder={q.placeholder}
                  />
                )}
              </div>
            </label>
            );
          })}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FF5F15] py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting && (
              <span
                className="h-4 w-4 animate-spin rounded-full border-2 border-black/25 border-t-black"
                aria-hidden
              />
            )}
            {isSubmitting ? "Submitting…" : "Submit answers"}
          </button>

          <div className="min-h-6" aria-live="polite" aria-atomic="true">
            {submissionError ? (
              <p className="text-center text-sm text-red-300" role="alert">
                {submissionError}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
