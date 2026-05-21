import Link from "next/link";
import { RESEARCH_PATH } from "@/lib/research-questions";
import { MicroLabel } from "../MicroLabel";

export function ResearchLanding() {
  return (
    <section className="bg-black px-6 pb-20 pt-28 text-white md:pb-28 md:pt-32">
      <div className="mx-auto max-w-2xl">
        <MicroLabel>Research</MicroLabel>
        <h1 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">
          Help us solve a problem
        </h1>
        <p className="mt-4 max-w-lg text-white/65">
          We&apos;re building a better way to book skilled workers in Ghana.
          Choose your path — it takes about 5 minutes.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <ChoiceCard
            href={`${RESEARCH_PATH}/user`}
            title="I need a technician"
            description="Homeowners, landlords, and anyone who hires plumbers, electricians, and more."
            cta="Customer survey"
          />
          <ChoiceCard
            href={`${RESEARCH_PATH}/specialist`}
            title="I am a technician"
            description="Artisans and specialists who want more jobs and a professional profile."
            cta="Specialist survey"
          />
        </div>
      </div>
    </section>
  );
}

function ChoiceCard({
  href,
  title,
  description,
  cta,
}: {
  href: string;
  title: string;
  description: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 transition-colors hover:border-[#FF5F15]/40 hover:bg-white/[0.07]"
    >
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
        {description}
      </p>
      <span className="mt-6 inline-flex w-fit rounded-full bg-[#FF5F15] px-5 py-2.5 text-sm font-semibold text-black transition-opacity group-hover:opacity-90">
        {cta}
      </span>
    </Link>
  );
}
