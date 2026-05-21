"use client";

import {
  getResearchQuestions,
  getResearchTitle,
  type ResearchRole,
} from "@/lib/research-questions";
import { useState } from "react";

const inputClass =
  "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-shadow placeholder:text-white/35 focus:border-[#FF5F15]/50 focus:ring-2 focus:ring-[#FF5F15]/30";

type Props = {
  role: ResearchRole;
  answers: Record<string, any>;
  onChange: (answers: Record<string, any>) => void;
  startIndex?: number;
};

export function ResearchQuestionsGroup({
  role,
  answers,
  onChange,
  startIndex = 1,
}: Props) {
  const questions = getResearchQuestions(role);

  const [otherValues, setOtherValues] = useState<Record<string, string>>({});

  const setAnswer = (id: string, value: string) => {
    const question = questions.find((q) => q.id === id);

    // If select with "Other"
    if (question?.type === "select" && value === "Other") {
      onChange({
        ...answers,
        [id]: {
          answer: value,
          other: otherValues[id] || "",
        },
      });
      return;
    }

    onChange({
      ...answers,
      [id]: value,
    });
  };

  const setOther = (id: string, value: string) => {
    const updated = {
      ...otherValues,
      [id]: value,
    };

    setOtherValues(updated);

    // sync into main answers if currently "Other"
    if (answers[id]?.answer === "Other") {
      onChange({
        ...answers,
        [id]: {
          answer: "Other",
          other: value,
        },
      });
    }
  };

  return (
    <fieldset className="space-y-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
      <legend className="text-sm font-bold text-white">
        {getResearchTitle(role)}
      </legend>

      {questions.map((q, index) => {
        const value = answers[q.id];

        const isOther =
          typeof value === "object" && value?.answer === "Other";

        return (
          <label key={q.id} className="block" data-question-field>
            <span className="text-sm font-medium leading-snug text-white/90">
              <span className="text-[#FF5F15]">
                {startIndex + index}.
              </span>{" "}
              {q.label}
            </span>

            <div className="mt-2">
              {/* SELECT */}
              {q.type === "select" && q.options ? (
                <>
                  <select
                    required
                    value={
                      typeof value === "object" ? value.answer : value || ""
                    }
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                    className={`${inputClass} bg-black text-white appearance-none`}

                  >
                    <option value="" disabled className="bg-black text-white">
                      Select…
                    </option>

                    {q.options.map((opt) => (
                      <option key={opt} value={opt} className="bg-black text-white">
                        {opt}
                      </option>
                    ))}

                    {q.allowOther && <option value="Other">Other</option>}
                  </select>

                  {/* OTHER INPUT */}
                  {isOther && (
                    <input
                      className={`${inputClass} mt-3 bg-black text-white`}
                      placeholder="Please specify"
                      value={otherValues[q.id] || ""}
                      onChange={(e) =>
                        setOther(q.id, e.target.value)
                      }
                    />
                  )}
                </>
              ) : q.type === "textarea" ? (
                <textarea
                  required
                  rows={4}
                  value={value ?? ""}
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                  className={`${inputClass} min-h-[100px] resize-y bg-black text-white`}
                  placeholder={q.placeholder}
                />
              ) : (
                <input
                  required
                  type="text"
                  value={value ?? ""}
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                  className={`${inputClass} bg-black text-white`}
                  placeholder={q.placeholder}
                />
              )}
            </div>
          </label>
        );
      })}
    </fieldset>
  );
}