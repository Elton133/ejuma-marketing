"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  getResearchQuestions,
  getResearchTitle,
  RESEARCH_PATH,
  type ResearchRole,
} from "@/lib/research-questions";
import { MicroLabel } from "../MicroLabel";

const inputClass =
  "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-shadow placeholder:text-white/35 focus:border-[#FF5F15]/50 focus:ring-2 focus:ring-[#FF5F15]/30";

export function ResearchForm({ role }: { role: ResearchRole }) {
  const router = useRouter();
  const questions = getResearchQuestions(role);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const setAnswer = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send to API / database when backend is ready
    console.info("Research submission", { role, answers });
    router.push(`${RESEARCH_PATH}/complete?role=${role}`);
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
          Your answers help us build Beagine for Ghana. There are no wrong
          answers — honesty helps most.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          {questions.map((q, index) => (
            <label key={q.id} className="block">
              <span className="text-sm font-medium leading-snug text-white/90">
                <span className="text-[#FF5F15]">{index + 1}.</span> {q.label}
              </span>
              <div className="mt-2">
                {q.type === "select" && q.options ? (
                  <select
                    required
                    value={answers[q.id] ?? ""}
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
                  </select>
                ) : q.type === "textarea" ? (
                  <textarea
                    required
                    rows={4}
                    value={answers[q.id] ?? ""}
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                    className={`${inputClass} resize-y min-h-[100px]`}
                    placeholder={q.placeholder}
                  />
                ) : (
                  <input
                    required
                    type="text"
                    value={answers[q.id] ?? ""}
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                    className={inputClass}
                    placeholder={q.placeholder}
                  />
                )}
              </div>
            </label>
          ))}

          <button
            type="submit"
            className="w-full rounded-full bg-[#FF5F15] py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Submit answers
          </button>
        </form>
      </div>
    </section>
  );
}
