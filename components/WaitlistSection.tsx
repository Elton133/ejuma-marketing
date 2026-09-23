"use client";

import Link from "next/link";
import { useState } from "react";
import posthog from "posthog-js";
import {
  HEAR_ABOUT_OPTIONS,
  INSTALL_PATH,
  PILOT_AREAS,
  TRADES,
} from "@/lib/constants";
import { WAITLIST_PATH } from "@/lib/research-questions";
import { getSupabaseClient } from "@/lib/supabase";
import { MicroLabel } from "./MicroLabel";
import { SurveyShareBlock } from "./research/SurveyShareBlock";
import { AnimatedStep } from "./waitlist/AnimatedStep";

type FormRole = "customer" | "worker";

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

export function WaitlistSection() {
  const [form, setForm] = useState<WaitlistData>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const showTrades = form.role === "worker";

  const toggleTrade = (trade: string) => {
    setForm((prev) => ({
      ...prev,
      trades: prev.trades.includes(trade)
        ? prev.trades.filter((item) => item !== trade)
        : [...prev.trades, trade],
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionError("");

    try {
      const { error } = await getSupabaseClient().from("submissions").insert({
        type: "waitlist",
        role: form.role,
        age_range: null,
        waitlist: {
          name: form.name,
          phone: form.phone,
          email: form.email,
          area: form.area,
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

      setIsComplete(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Supabase error:", error);
      posthog.captureException(error);
      setSubmissionError(
        "We couldn't complete your registration. Check your connection and try again. Your details are still here."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-black px-6 pb-20 pt-28 text-white md:pb-28 md:pt-32">
      <div className="mx-auto max-w-2xl">
        {!isComplete ? (
          <AnimatedStep stepKey="waitlist-form">
            <MicroLabel>Early access</MicroLabel>
            <h1 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">
              Join the waitlist
            </h1>
            <p className="mt-4 max-w-lg text-white/65">
              Be among the first to use Beagine when we open in your area.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-5"
              aria-busy={isSubmitting}
            >
              <SelectField
                label="I want to join as a"
                required
                value={form.role}
                onChange={(role) =>
                  setForm({
                    ...form,
                    role: role as FormRole,
                    trades: role === "worker" ? form.trades : [],
                  })
                }
                options={[
                  { value: "customer", label: "Customer" },
                  { value: "worker", label: "Specialist" },
                ]}
              />

              <Field label="Full name" required>
                <input
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className={inputClass}
                  placeholder="Your name"
                />
              </Field>

              <Field label="Phone" required>
                <input
                  required
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  className={inputClass}
                  placeholder="e.g. +233 20 123 4567"
                />
              </Field>

              <Field label="Email">
                <input
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  className={inputClass}
                  placeholder="Optional"
                />
              </Field>

              <Field label="City / area" required>
                <input
                  required
                  type="text"
                  value={form.area}
                  onChange={(event) => setForm({ ...form, area: event.target.value })}
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
                options={HEAR_ABOUT_OPTIONS.map((option) => ({
                  value: option,
                  label: option,
                }))}
                placeholder="Select…"
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
                {submissionError ? (
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
        ) : (
          <AnimatedStep stepKey="waitlist-complete">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FF5F15]/20 text-2xl text-[#FF5F15]">
                ✓
              </div>
              <div className="mt-6">
                <MicroLabel>All done</MicroLabel>
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                You&apos;re on the waitlist.
              </h2>
              <p className="mt-4 text-white/65">
                We&apos;ll be in touch when Beagine opens in your area.
              </p>

              <SurveyShareBlock
                sharePath={WAITLIST_PATH}
                title="Share the waitlist"
                description="Invite friends, neighbours, or colleagues to join."
                qrLabel="Scan to join the waitlist"
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
  placeholder,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <Field label={label} required={required}>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
        required={required}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-black text-white">
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

const inputClass =
  "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-shadow placeholder:text-white/35 focus:border-[#FF5F15]/50 focus:ring-2 focus:ring-[#FF5F15]/30";
