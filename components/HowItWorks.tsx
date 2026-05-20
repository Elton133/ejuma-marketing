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
            Hire with confidence in four steps
          </h2>
          <p className="mt-4 text-white/65">
            Labour price is agreed with the worker; the app deposit holds your
            booking.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {HOW_IT_WORKS.map((item) => (
            <li
              key={item.step}
              className="flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-7"
            >
              <span className="text-sm font-bold text-[#FF5F15]">
                {item.step}
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
