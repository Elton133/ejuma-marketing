import { HOW_IT_WORKS } from "@/lib/constants";
import { MicroLabel } from "./MicroLabel";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-black px-6 py-20 text-white md:py-28"
    >
      <div className="mx-auto max-w-[1440px] md:px-4 lg:px-0">
        <div className="max-w-xl">
          <MicroLabel>How it works</MicroLabel>
          <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">
            Get your  <em className="text-[#FF5F15] not-italic">problem</em> fixed in only four steps
          </h2>
          <p className="mt-4 text-white/65">
            Find • Book • Fix
          </p>
        </div>

        <ol className="mt-14 grid gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-14 lg:grid-cols-4 lg:gap-x-8">
          {HOW_IT_WORKS.map((item) => (
            <li key={item.step} className="relative min-h-[11rem]">
              <span
                className="step-ghost pointer-events-none absolute -left-1 top-0 select-none font-bold leading-none tracking-tighter"
                aria-hidden
              >
                {item.step}
              </span>

              <div className="relative z-10 pt-14">
                <h3 className="text-xl font-bold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
