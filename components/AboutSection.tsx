import Link from "next/link";
import { MicroLabel } from "./MicroLabel";

export function AboutSection() {
  return (
    <section
      id="about"
      className="bg-[#FF5F15] px-6 py-20 text-center text-black md:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <MicroLabel light>About us</MicroLabel>

        <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.08] tracking-tight">
          Learn about us
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-black/85 md:text-lg">
        We connect everyday people with specialists who get the job done - book services from your phone and track job progress in real time.
        We want you to focus on your daily activities while our specialists take care of your problems.
        </p>

        <Link
          href="#how-it-works"
          className="mt-10 inline-flex rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          How it works
        </Link>
      </div>
    </section>
  );
}
