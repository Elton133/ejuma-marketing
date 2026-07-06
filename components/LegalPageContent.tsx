import Link from "next/link";
import { MicroLabel } from "./MicroLabel";

type LegalSection = {
  heading: string;
  body: string[];
};

type LegalPageContentProps = {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalPageContent({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: LegalPageContentProps) {
  return (
    <section className="bg-black px-6 pb-20 pt-28 text-white md:pb-28 md:pt-32">
      <div className="mx-auto max-w-3xl">
        <MicroLabel>{eyebrow}</MicroLabel>
        <h1 className="mt-3 text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-tight">
          {title}
        </h1>
        <p className="mt-3 text-sm text-white/45">Last updated: {updated}</p>
        <p className="mt-6 text-base leading-relaxed text-white/70">{intro}</p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-lg font-semibold text-white">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-white/65">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-sm text-white/50">
          Questions?{" "}
          <Link
            href="mailto:support@beagine.app"
            className="text-[#FF5F15] hover:underline"
          >
            Contact support
          </Link>
        </p>
      </div>
    </section>
  );
}
