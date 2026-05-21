"use client";

import { useState } from "react";
import { PILOT_AREAS, TRADES } from "@/lib/constants";
import { MicroLabel } from "./MicroLabel";

type Role = "customer" | "worker" | "both";
type WaitlistStep = "form" | "questionnaire" | "done";

type WaitlistData = {
  name: string;
  phone: string;
  email: string;
  role: Role;
  area: string;
  trades: string[];
  hearAbout: string;
};

const emptyForm: WaitlistData = {
  name: "",
  phone: "",
  email: "",
  role: "customer",
  area: PILOT_AREAS[0],
  trades: [],
  hearAbout: "",
};

export function WaitlistSection() {
  const [step, setStep] = useState<WaitlistStep>("form");
  const [form, setForm] = useState<WaitlistData>(emptyForm);
  const [qRole, setQRole] = useState<Role>("customer");

  const [customerAnswers, setCustomerAnswers] = useState({
    frequency: "",
    struggle: "",
    lastJob: "",
    deposit: "",
    contact: "WhatsApp",
  });

  const [workerAnswers, setWorkerAnswers] = useState({
    experience: "",
    trades: [] as string[],
    areas: "",
    smartphone: "",
    ghanaCard: "",
    jobsToday: "",
    monthlyJobs: "",
  });

  const showTrades = form.role === "worker" || form.role === "both";

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQRole(form.role);
    setStep("questionnaire");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuestionnaireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("done");
  };

  const toggleTrade = (trade: string) => {
    setForm((prev) => ({
      ...prev,
      trades: prev.trades.includes(trade)
        ? prev.trades.filter((t) => t !== trade)
        : [...prev.trades, trade],
    }));
  };

  return (
    <section className="bg-[#fafafa] px-6 pb-20 pt-28 text-black md:pb-28 md:pt-32">
      <div className="mx-auto max-w-2xl">
        {step === "form" && (
          <>
            <MicroLabel light>Waitlist</MicroLabel>
            <h2 className="mt-3 text-[clamp(2rem,4vw,2.75rem)] font-bold tracking-tight">
              Join the waitlist
            </h2>
            <p className="mt-3 text-black/65">
              Be first when we open your area. We&apos;ll text or call you.
            </p>

            <form onSubmit={handleWaitlistSubmit} className="mt-10 space-y-5">
              <Field label="Full name" required>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                  placeholder="Your name"
                />
              </Field>

              <Field label="Phone (Ghana)" required>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                  placeholder="024 000 0000 or +233..."
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

              <Field label="I am a…" required>
                <div className="flex flex-wrap gap-2">
                  {(["customer", "worker", "both"] as Role[]).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setForm({ ...form, role })}
                      className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
                        form.role === role
                          ? "bg-black text-white"
                          : "bg-white text-black ring-1 ring-black/10"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="City / area" required>
                <select
                  required
                  value={form.area}
                  onChange={(e) => setForm({ ...form, area: e.target.value })}
                  className={inputClass}
                >
                  {PILOT_AREAS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
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
                            : "bg-white ring-1 ring-black/10"
                        }`}
                      >
                        {trade}
                      </button>
                    ))}
                  </div>
                </Field>
              )}

              <Field label="How did you hear about us?">
                <input
                  value={form.hearAbout}
                  onChange={(e) =>
                    setForm({ ...form, hearAbout: e.target.value })
                  }
                  className={inputClass}
                  placeholder="WhatsApp, friend, Facebook…"
                />
              </Field>

              <button
                type="submit"
                className="w-full rounded-full bg-[#FF5F15] py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
              >
                Join waitlist
              </button>

              <p className="text-center text-xs text-black/50">
                By joining you agree to be contacted about Ejuma. We don&apos;t
                sell your number.
              </p>
            </form>
          </>
        )}

        {step === "questionnaire" && (
          <div id="questionnaire">
            <MicroLabel light>Step 2</MicroLabel>
            <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight">
              Tell us a bit more (2 min)
            </h2>
            <p className="mt-3 text-black/65">
              You&apos;re on the list. One more step — helps us launch in the
              right areas with the right specialists.
            </p>

            <form onSubmit={handleQuestionnaireSubmit} className="mt-10 space-y-5">
              {(qRole === "customer" || qRole === "both") && (
                <CustomerQuestionnaire
                  answers={customerAnswers}
                  onChange={setCustomerAnswers}
                />
              )}

              {(qRole === "worker" || qRole === "both") && (
                <WorkerQuestionnaire
                  answers={workerAnswers}
                  onChange={setWorkerAnswers}
                />
              )}

              <button
                type="submit"
                className="w-full rounded-full bg-[#FF5F15] py-3.5 text-sm font-semibold text-black"
              >
                Submit
              </button>
            </form>
          </div>
        )}

        {step === "done" && (
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FF5F15]/20 text-2xl">
              ✓
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight">
              Thanks — you&apos;re fully registered.
            </h2>
            <p className="mt-4 text-black/65">
              We&apos;ll be in touch when Ejuma opens in your area.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="/#install"
                className="inline-flex justify-center rounded-full bg-[#FF5F15] px-6 py-3 text-sm font-semibold text-black"
              >
                Install the app
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent("Join me on Ejuma — Ghana's marketplace for skilled trades. https://3juma.app")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center rounded-full border border-black/15 px-6 py-3 text-sm font-semibold"
              >
                Share with a friend
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function CustomerQuestionnaire({
  answers,
  onChange,
}: {
  answers: {
    frequency: string;
    struggle: string;
    lastJob: string;
    deposit: string;
    contact: string;
  };
  onChange: (v: typeof answers) => void;
}) {
  return (
    <fieldset className="space-y-4 rounded-[2rem] bg-white p-6 ring-1 ring-black/5">
      <legend className="text-sm font-bold">For customers</legend>

      <SelectField
        label="How often do you need a tradesperson?"
        value={answers.frequency}
        onChange={(frequency) => onChange({ ...answers, frequency })}
        options={[
          "Rarely",
          "Few times a year",
          "Monthly",
          "Business / ongoing",
        ]}
      />

      <SelectField
        label="What do you usually struggle with?"
        value={answers.struggle}
        onChange={(struggle) => onChange({ ...answers, struggle })}
        options={[
          "Finding someone",
          "Price",
          "Quality",
          "Showing up",
          "Trust",
        ]}
      />

      <Field label="What's the last job you needed?">
        <input
          value={answers.lastJob}
          onChange={(e) => onChange({ ...answers, lastJob: e.target.value })}
          className={inputClass}
        />
      </Field>

      <SelectField
        label="Would you pay a small booking deposit?"
        value={answers.deposit}
        onChange={(deposit) => onChange({ ...answers, deposit })}
        options={["Yes", "Maybe", "No"]}
      />

      <SelectField
        label="Preferred contact"
        value={answers.contact}
        onChange={(contact) => onChange({ ...answers, contact })}
        options={["WhatsApp", "Phone call", "SMS"]}
      />
    </fieldset>
  );
}

function WorkerQuestionnaire({
  answers,
  onChange,
}: {
  answers: {
    experience: string;
    trades: string[];
    areas: string;
    smartphone: string;
    ghanaCard: string;
    jobsToday: string;
    monthlyJobs: string;
  };
  onChange: (v: typeof answers) => void;
}) {
  return (
    <fieldset className="space-y-4 rounded-[2rem] bg-white p-6 ring-1 ring-black/5">
      <legend className="text-sm font-bold">For workers</legend>

      <Field label="Years of experience">
        <input
          value={answers.experience}
          onChange={(e) =>
            onChange({ ...answers, experience: e.target.value })
          }
          className={inputClass}
          placeholder="e.g. 5"
        />
      </Field>

      <Field label="Areas you can work">
        <input
          value={answers.areas}
          onChange={(e) => onChange({ ...answers, areas: e.target.value })}
          className={inputClass}
          placeholder="Tema, Dawhenya, Prampram…"
        />
      </Field>

      <SelectField
        label="Smartphone for mobile data jobs?"
        value={answers.smartphone}
        onChange={(smartphone) => onChange({ ...answers, smartphone })}
        options={["Yes", "No"]}
      />

      <SelectField
        label="Ghana Card ready to verify?"
        value={answers.ghanaCard}
        onChange={(ghanaCard) => onChange({ ...answers, ghanaCard })}
        options={["Yes", "Not yet"]}
      />

      <SelectField
        label="How do you get jobs today?"
        value={answers.jobsToday}
        onChange={(jobsToday) => onChange({ ...answers, jobsToday })}
        options={["Word of mouth", "Social media", "Other apps", "Other"]}
      />

      <SelectField
        label="Expected monthly jobs from Ejuma"
        value={answers.monthlyJobs}
        onChange={(monthlyJobs) => onChange({ ...answers, monthlyJobs })}
        options={["1–5", "5–20", "20+"]}
      />
    </fieldset>
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
      <span className="text-sm font-medium text-black/80">
        {label}
        {required && <span className="text-[#FF5F15]"> *</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <Field label={label}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
        required
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </Field>
  );
}

const inputClass =
  "w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-[#FF5F15]/40";
