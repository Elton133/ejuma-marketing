"use client";

import {
  getResearchQuestions,
  getResearchTitle,
  type ResearchRole,
} from "@/lib/research-questions";

const inputClass =
  "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-shadow placeholder:text-white/35 focus:border-[#FF5F15]/50 focus:ring-2 focus:ring-[#FF5F15]/30";

export function ResearchQuestionsGroup({
  role,
  answers,
  onChange,
  startIndex = 1,
}: {
  role: ResearchRole;
  answers: Record<string, string>;
  onChange: (answers: Record<string, string>) => void;
  startIndex?: number;
}) {
  const questions = getResearchQuestions(role);

  const setAnswer = (id: string, value: string) => {
    onChange({ ...answers, [id]: value });
  };

  return (
    <fieldset className="space-y-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
      <legend className="text-sm font-bold text-white">
        {getResearchTitle(role)}
      </legend>

      {questions.map((q, index) => (
        <label key={q.id} className="block" data-question-field>
          <span className="text-sm font-medium leading-snug text-white/90">
            <span className="text-[#FF5F15]">{startIndex + index}.</span>{" "}
            {q.label}
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
                className={`${inputClass} min-h-[100px] resize-y`}
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
    </fieldset>
  );
}
