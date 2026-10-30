"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import posthog from "posthog-js";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ATTRACTED_OPTIONS,
  COMFORT_OPTIONS,
  HIRE_SURVEY_TABLE,
  HIRE_SURVEY_PATH,
  MISSING_OPTIONS,
  PUT_OFF_OPTIONS,
  SCENARIOS,
  SHUFFLE_ORDER,
  PROFILES_VERSION,
  type Pro,
  type Scenario,
} from "@/lib/hire-survey";
import { AGE_RANGE_OPTIONS } from "@/lib/research-questions";
import { prefersReducedMotion, registerGsap } from "@/lib/motion/register-gsap";
import { getSupabaseClient } from "@/lib/supabase";
import { SurveyShareBlock } from "../research/SurveyShareBlock";
import { Character } from "../story/Character";
import { Chip, NextButton, Progress, Question, TextBox, usePops } from "../story/Controls";
import { idleCast, nod, wave } from "../story/motion";
import { Typewriter } from "../story/Typewriter";
import { ProCard } from "./ProCard";

type Step = "intro" | "story" | "pick" | "why" | "most" | "putoff" | "missing" | "comfort" | "contact" | "done";

type ScenarioAnswer = {
  order: Pro["id"][];
  chosen?: Pro["id"];
  attracted: string[];
  most?: string;
  why: string;
  putOff: Partial<Record<Pro["id"], string[]>>;
  missing: string[];
  missingOther: string;
  comfort?: string;
  comfortWhy: string;
};

const emptyAnswer = (): ScenarioAnswer => ({
  order: ["A", "B", "C"],
  attracted: [],
  why: "",
  putOff: {},
  missing: [],
  missingOther: "",
  comfortWhy: "",
});

const firstName = (pro?: Pro) => pro?.name.split(" ")[0] ?? "them";
const toggle = (list: string[], value: string) => (list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);

function shuffled<T>(list: T[]) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const blank = (value: string) => value.trim() || null;

/** One row of public.hire_survey_responses; each situation's columns are prefixed with its key (ac_, electrician_). */
function toRow(answers: ScenarioAnswer[], ageRange: string, contact: { name: string; phone: string; email: string }) {
  const row: Record<string, unknown> = {
    profiles_version: PROFILES_VERSION,
    age_range: ageRange || null,
    name: blank(contact.name),
    phone: blank(contact.phone),
    email: blank(contact.email),
  };
  SCENARIOS.forEach((scenario, index) => {
    const answer = answers[index];
    const col = (name: string) => `${scenario.key}_${name}`;
    row[col("choice")] = answer.chosen;
    row[col("attracted")] = answer.attracted;
    row[col("most_important")] = answer.most ?? null;
    row[col("why")] = blank(answer.why);
    for (const pro of scenario.pros) {
      row[col(`put_off_${pro.id.toLowerCase()}`)] = pro.id === answer.chosen ? null : answer.putOff[pro.id] ?? [];
    }
    row[col("missing")] = answer.missing;
    row[col("missing_other")] = blank(answer.missingOther);
    row[col("app_comfort")] = answer.comfort ?? null;
    row[col("app_comfort_why")] = blank(answer.comfortWhy);
    row[col("order_shown")] = answer.order;
  });
  return row;
}

function SceneIcon({ icon }: { icon: Scenario["icon"] }) {
  return icon === "ac" ? (
    <svg viewBox="0 0 64 40" className="h-8 w-12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
      <rect data-draw x="3" y="3" width="58" height="22" rx="5" />
      <path data-draw d="M10 19h44" />
      <path data-draw d="M18 30c0 3-2 4-2 7M32 30c0 3-2 4-2 7M46 30c0 3-2 4-2 7" />
    </svg>
  ) : (
    <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
      <rect data-draw x="4" y="4" width="40" height="40" rx="9" />
      <path data-draw d="M18 18v8M30 18v8M20 34c2 2 6 2 8 0" />
    </svg>
  );
}

/* ---------- the director ---------- */

export function HireSurvey() {
  const [step, setStep] = useState<Step>("intro");
  const [introDone, setIntroDone] = useState(false);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [answers, setAnswers] = useState<ScenarioAnswer[]>(() => SCENARIOS.map(emptyAnswer));
  const [ageRange, setAgeRange] = useState("");
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [wipe, setWipe] = useState<string | null>(null);
  const [picking, setPicking] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);

  const scenario = SCENARIOS[scenarioIndex];
  const answer = answers[scenarioIndex];
  const pros = useMemo(() => answer.order.map((id) => scenario.pros.find((pro) => pro.id === id)!), [answer.order, scenario]);
  const chosen = scenario.pros.find((pro) => pro.id === answer.chosen);
  const others = pros.filter((pro) => pro.id !== answer.chosen);
  const reduced = typeof window !== "undefined" && prefersReducedMotion();

  useEffect(() => {
    registerGsap();
  }, []);

  const update = (patch: Partial<ScenarioAnswer>) =>
    setAnswers((current) => current.map((item, index) => (index === scenarioIndex ? { ...item, ...patch } : item)));

  const go = (next: Step) => {
    setStep(next);
    stageRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  // The cast has its own entrance below; the scene header is already on screen.
  usePops(stageRef, [step, scenarioIndex, introDone], step === "pick");

  /* The cast enters: cards spring up, numbers count, stars fill, everyone waves, then blinks forever. */
  useGSAP(
    () => {
      if (step !== "pick" || !cardsRef.current) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-pro-card]", cardsRef.current);
      if (reduced) return;

      const tl = gsap.timeline();
      tl.fromTo(
        cards,
        { opacity: 0, y: 90, scale: 0.5, rotate: (i) => (i - 1) * 9 },
        { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.9, ease: "elastic.out(1, 0.62)", stagger: 0.16 }
      );
      cards.forEach((card, i) => {
        const at = 0.25 + i * 0.16;
        card.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
          const to = Number(el.dataset.count);
          const counter = { value: 0 };
          tl.to(counter, { value: to, duration: 1, ease: "power3.out", onUpdate: () => void (el.textContent = String(Math.round(counter.value))) }, at);
        });
        const stars = card.querySelector("[data-stars]");
        if (stars) tl.from(stars, { width: "0%", duration: 1.1, ease: "power2.out" }, at + 0.15);
        wave(tl, card, at + 0.35, 2);
      });
      idleCast(cardsRef.current);
    },
    { scope: cardsRef, dependencies: [step, scenarioIndex] }
  );

  const pick = (pro: Pro) => {
    if (picking) return;
    update({ chosen: pro.id, attracted: [], most: undefined, putOff: {} });
    posthog.capture("hire_survey_picked", { scenario: scenario.key, pro: pro.id, price: pro.price });
    if (reduced) {
      go("why");
      return;
    }
    setPicking(true);
    const card = cardsRef.current?.querySelector<HTMLElement>(`[data-pro-id="${pro.id}"] [data-pro-card]`);
    const tl = gsap.timeline({
      onComplete: () => {
        setPicking(false);
        go("why");
      },
    });
    if (card) tl.to(card, { scale: 1.06, duration: 0.25, ease: "power2.out" }).to(card, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    nod(tl, card, 0.1);
    wave(tl, card, 0.1);
    tl.to({}, { duration: 0.35 });
  };

  const finishScenario = () => {
    posthog.capture("hire_survey_scenario_answered", { scenario: scenario.key, pro: answer.chosen, comfort: answer.comfort });
    if (scenarioIndex === SCENARIOS.length - 1) {
      go("contact");
      return;
    }
    const nextIndex = scenarioIndex + 1;
    if (reduced) {
      setScenarioIndex(nextIndex);
      go("story");
      return;
    }
    setWipe(`Situation ${nextIndex + 1}`);
  };

  /* Orange wipe between situations, like a cut in an edit. */
  useGSAP(
    () => {
      if (!wipe || !wipeRef.current) return;
      const panel = wipeRef.current;
      const words = panel.querySelectorAll("[data-wipe-word]");
      gsap
        .timeline({ onComplete: () => setWipe(null) })
        .fromTo(panel, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.6, ease: "power4.inOut" })
        .from(words, { yPercent: 110, duration: 0.5, ease: "power3.out", stagger: 0.08 }, "-=0.15")
        .add(() => {
          setScenarioIndex((index) => index + 1);
          setStep("story");
          stageRef.current?.scrollIntoView({ block: "start" });
        })
        .to(panel, { clipPath: "inset(0 0 0 100%)", duration: 0.6, ease: "power4.inOut", delay: 0.55 });
    },
    { dependencies: [wipe] }
  );

  const submit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const { error: insertError } = await getSupabaseClient()
        .from(HIRE_SURVEY_TABLE)
        .insert(toRow(answers, ageRange, contact));
      if (insertError) throw insertError;
      posthog.capture("hire_survey_submitted", { picks: answers.map((item) => item.chosen).join(","), left_contact: Boolean(contact.phone || contact.email) });
      go("done");
    } catch (caught) {
      console.error("Supabase error:", caught);
      posthog.captureException(caught);
      setError("We couldn't send your answers. Check your connection and try again — nothing you picked has been lost.");
    } finally {
      setSubmitting(false);
    }
  };

  const showCards = step === "pick";
  const progress = step === "intro" ? 0 : step === "contact" || step === "done" ? 1 : (scenarioIndex + 0.5) / SCENARIOS.length;

  return (
    <section ref={stageRef} className="relative mx-auto min-h-[100svh] max-w-5xl scroll-mt-24 px-4 pb-24 pt-28 sm:px-6 md:pt-32">
      <Progress value={progress} />

      {step === "intro" && (
        <div className="flex min-h-[55svh] flex-col justify-center">
          <Typewriter
            lines={["Quick one.", "Who would you hire?"]}
            speed={60}
            delay={400}
            onDone={() => setIntroDone(true)}
            className="font-semibold leading-[.95] tracking-[-.04em]"
            lineClassName={(i) => (i === 0 ? "text-[clamp(1.4rem,4vw,2.2rem)] text-white/50" : "mt-3 text-[clamp(2.8rem,10vw,6.5rem)]")}
          />
          {introDone && (
            <div>
              <p data-pop className="mt-8 max-w-xl text-base leading-7 text-white/60 md:text-lg">
                We&apos;ll show you two everyday problems and three specialists for each. Pick who you&apos;d hire and tell us why. About 3 minutes. No sign-up.
              </p>
              <div data-pop className="mt-8 flex -space-x-4">
                {[...SCENARIOS[0].pros, ...SCENARIOS[1].pros].map((pro) => (
                  <div key={pro.name} className="h-14 w-14 overflow-hidden rounded-full border-2 border-black bg-white/10">
                    <Character look={pro.look} className="h-full w-full" />
                  </div>
                ))}
              </div>
              <NextButton
                onClick={() => {
                  posthog.capture("hire_survey_started");
                  // Shuffled on tap, not on render, so the server and browser draw the same page.
                  if (SHUFFLE_ORDER) setAnswers((current) => current.map((item) => ({ ...item, order: shuffled(item.order) })));
                  go("story");
                }}
              >
                Let&apos;s go
              </NextButton>
            </div>
          )}
        </div>
      )}

      {(step === "story" || step === "pick") && (
        <div>
          <div data-pop className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 px-4 py-2 text-[#FF5F15]">
            <SceneIcon icon={scenario.icon} />
            <span className="text-xs font-bold uppercase tracking-[.18em]">
              Situation {scenarioIndex + 1} of {SCENARIOS.length}
            </span>
          </div>
          <Typewriter
            key={scenario.key}
            lines={[...scenario.story, `Three ${scenario.trade}s are free. Who would you choose?`]}
            speed={26}
            delay={500}
            instant={step === "pick"}
            onDone={() => setStep((current) => (current === "story" ? "pick" : current))}
            className="max-w-3xl text-[clamp(1.5rem,4.2vw,2.1rem)] font-semibold leading-[1.15] tracking-[-.02em]"
            lineClassName={(i) => (i === scenario.story.length ? "mt-3 text-[#FF5F15]" : "text-white")}
          />
          {showCards && (
            <>
              <div ref={cardsRef} className="mt-8 grid gap-3 md:grid-cols-3 md:gap-5">
                {pros.map((pro) => (
                  <div key={pro.id} data-pro-id={pro.id}>
                    <ProCard pro={pro} state={answer.chosen === pro.id ? "chosen" : answer.chosen && picking ? "dimmed" : "idle"} onPick={() => pick(pro)} />
                  </div>
                ))}
              </div>
              <p className="mt-5 animate-pulse text-center text-sm text-white/40">Tap the one you&apos;d hire</p>
            </>
          )}
        </div>
      )}

      {chosen && ["why", "most", "putoff", "missing", "comfort"].includes(step) && (
        <div data-pop className="mb-10 flex items-center gap-3 rounded-full border border-white/10 bg-white/[.04] p-1.5 pr-4">
          <div className="h-11 w-11 overflow-hidden rounded-full bg-white/10">
            <Character look={chosen.look} className="h-full w-full" />
          </div>
          <p className="min-w-0 flex-1 truncate text-sm">
            <span className="text-white/45">{scenario.label}: you picked </span>
            <span className="font-semibold">{chosen.name}</span>
            <span className="text-white/45"> · GH₵{chosen.price}</span>
          </p>
          <button type="button" onClick={() => go("pick")} className="shrink-0 text-xs font-semibold text-[#FF5F15] hover:underline">
            Change
          </button>
        </div>
      )}

      {step === "why" && chosen && (
        <div>
          <Question text={`What made you pick ${firstName(chosen)}?`} hint="Choose all that apply." />
          <div className="flex flex-wrap gap-2.5">
            {ATTRACTED_OPTIONS.map((option) => (
              <Chip key={option} active={answer.attracted.includes(option)} onClick={() => update({ attracted: toggle(answer.attracted, option) })}>
                {option}
              </Chip>
            ))}
          </div>
          <TextBox value={answer.why} onChange={(why) => update({ why })} placeholder="Anything else? In your own words (optional)" />
          <NextButton
            disabled={!answer.attracted.length && !answer.why.trim()}
            onClick={() => {
              if (answer.attracted.length > 1) return go("most");
              update({ most: answer.attracted[0] });
              go("putoff");
            }}
          />
        </div>
      )}

      {step === "most" && chosen && (
        <div>
          <Question text="And which one mattered most?" hint="Just one." />
          <div className="grid gap-2.5 sm:grid-cols-2">
            {answer.attracted.map((option) => (
              <button
                key={option}
                type="button"
                data-pop
                onClick={() => {
                  update({ most: option });
                  go("putoff");
                }}
                className={`rounded-2xl border px-5 py-4 text-left text-base font-semibold transition-colors ${
                  answer.most === option ? "border-[#FF5F15] bg-[#FF5F15]/15" : "border-white/15 bg-white/[.04] hover:border-white/40"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "putoff" && chosen && (
        <div>
          <Question text="What made you pass on the other two?" />
          <div className="space-y-5">
            {others.map((pro) => (
              <div key={pro.id} data-pop className="rounded-[1.5rem] border border-white/10 bg-white/[.03] p-4 md:p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-white/10">
                    <Character look={pro.look} className="h-full w-full" />
                  </div>
                  <p className="text-sm">
                    <span className="font-semibold">{pro.name}</span>
                    <span className="block text-xs text-white/45">
                      GH₵{pro.price} · {pro.years} yrs · {pro.rating ? `★ ${pro.rating} (${pro.reviews})` : "no reviews"}
                    </span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PUT_OFF_OPTIONS.map((option) => {
                    const current = answer.putOff[pro.id] ?? [];
                    return (
                      <Chip key={option} active={current.includes(option)} onClick={() => update({ putOff: { ...answer.putOff, [pro.id]: toggle(current, option) } })}>
                        {option}
                      </Chip>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <NextButton disabled={others.some((pro) => !answer.putOff[pro.id]?.length)} onClick={() => go("missing")} />
        </div>
      )}

      {step === "missing" && (
        <div>
          <Question text="Is anything missing from these profiles that you'd want to know?" hint="Choose all that apply." />
          <div className="flex flex-wrap gap-2.5">
            {MISSING_OPTIONS.map((option) => (
              <Chip key={option} active={answer.missing.includes(option)} onClick={() => update({ missing: toggle(answer.missing, option) })}>
                {option}
              </Chip>
            ))}
          </div>
          <TextBox value={answer.missingOther} onChange={(missingOther) => update({ missingOther })} placeholder="Something else? (optional)" />
          <NextButton disabled={!answer.missing.length && !answer.missingOther.trim()} onClick={() => go("comfort")} />
        </div>
      )}

      {step === "comfort" && chosen && (
        <div>
          <Question text={`Would you feel comfortable booking ${firstName(chosen)} through an app?`} />
          <div className="grid grid-cols-3 gap-2.5 sm:max-w-lg">
            {COMFORT_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                data-pop
                aria-pressed={answer.comfort === option}
                onClick={() => update({ comfort: option })}
                className={`flex flex-col items-center gap-2 rounded-2xl border px-3 py-5 text-sm font-semibold transition-colors ${
                  answer.comfort === option ? "border-[#FF5F15] bg-[#FF5F15]/15" : "border-white/15 bg-white/[.04] hover:border-white/40"
                }`}
              >
                <span className="text-3xl" aria-hidden>
                  {option === "Yes" ? "👍" : option === "No" ? "👎" : "🤔"}
                </span>
                {option}
              </button>
            ))}
          </div>
          {answer.comfort ? (
            <>
              <TextBox
                value={answer.comfortWhy}
                onChange={(comfortWhy) => update({ comfortWhy })}
                placeholder={answer.comfort === "Yes" ? "What would make it feel safe? (optional)" : "What would make you comfortable? (optional)"}
              />
              <NextButton onClick={finishScenario}>{scenarioIndex === SCENARIOS.length - 1 ? "Almost done" : "Next situation"}</NextButton>
            </>
          ) : null}
        </div>
      )}

      {step === "contact" && (
        <div className="max-w-2xl">
          <Question text="Last bit. All of this is optional." hint="Leave your number or email if you'd like to hear when Beagine launches. We won't share it." />
          <p data-pop className="mb-3 text-sm font-semibold text-white/70">
            Your age range
          </p>
          <div className="flex flex-wrap gap-2">
            {AGE_RANGE_OPTIONS.map((option) => (
              <Chip key={option} active={ageRange === option} onClick={() => setAgeRange(ageRange === option ? "" : option)}>
                {option}
              </Chip>
            ))}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {(
              [
                ["name", "Your name", "text", "name"],
                ["phone", "Phone number", "tel", "tel"],
                ["email", "Email", "email", "email"],
              ] as const
            ).map(([field, label, type, autoComplete]) => (
              <input
                key={field}
                data-pop
                type={type}
                autoComplete={autoComplete}
                placeholder={label}
                aria-label={label}
                value={contact[field]}
                onChange={(event) => setContact((current) => ({ ...current, [field]: event.target.value }))}
                className={`rounded-2xl border border-white/15 bg-white/[.04] px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#FF5F15] ${field === "name" ? "sm:col-span-2" : ""}`}
              />
            ))}
          </div>
          {error ? (
            <p role="alert" className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          ) : null}
          <NextButton disabled={submitting} onClick={submit}>
            {submitting ? "Sending…" : "Send my answers"}
          </NextButton>
        </div>
      )}

      {step === "done" && (
        <div className="flex flex-col items-center pt-6 text-center">
          <div className="flex -space-x-3">
            {[...SCENARIOS[0].pros, ...SCENARIOS[1].pros].map((pro) => (
              <div key={pro.name} data-pop className="h-16 w-16 overflow-hidden rounded-full border-2 border-black bg-white/10 md:h-20 md:w-20">
                <Character look={pro.look} className="h-full w-full" />
              </div>
            ))}
          </div>
          <Typewriter lines={["Thank you."]} speed={70} delay={500} className="mt-10 text-[clamp(2.8rem,9vw,5.5rem)] font-semibold leading-none tracking-[-.04em]" />
          <p data-pop className="mt-5 max-w-md text-base leading-7 text-white/60">
            Your answers help us decide what specialist profiles on Beagine should show, so hiring someone feels safe.
          </p>
          <div className="w-full max-w-xl">
            <SurveyShareBlock sharePath={HIRE_SURVEY_PATH} title="Know someone who'd answer this?" description="Send them the link. It takes about 3 minutes." />
          </div>
        </div>
      )}

      {wipe && typeof document !== "undefined"
        ? createPortal(
            <div ref={wipeRef} className="fixed inset-0 z-[9000] flex items-center justify-center bg-[#FF5F15] text-black" style={{ clipPath: "inset(0 100% 0 0)" }} aria-hidden>
              <p className="overflow-hidden font-heading text-[clamp(3.5rem,14vw,10rem)] uppercase leading-none">
                {wipe.split(" ").map((word) => (
                  <span key={word} data-wipe-word className="mr-[.25em] inline-block">
                    {word}
                  </span>
                ))}
              </p>
            </div>,
            document.body
          )
        : null}
    </section>
  );
}
