import Link from "next/link";
import { MicroLabel } from "./MicroLabel";

export function CommunitySection() {
  return (
    <section className="bg-black px-6 py-20 text-white md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="glass-panel flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-16 text-center md:px-16">
          <MicroLabel>Community Connect</MicroLabel>
          <h2 className="max-w-2xl text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">
            Got a question? The community has answers.
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-white/65">
            Browse real questions from people using Beagine, or ask your own and we&apos;ll answer it publicly.
          </p>
          <Link
            href="/faqs"
            className="btn-premium mt-2 inline-flex h-12 items-center justify-center rounded-full bg-[#FF5F15] px-8 text-sm font-semibold text-black hover:bg-[#FF7335] md:h-[52px] md:px-9 md:text-base"
          >
            Visit Community Connect
          </Link>
        </div>
      </div>
    </section>
  );
}
