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

        <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-tight">
          Ejuma is Ghana&apos;s marketplace for skilled trades.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-black/85 md:text-lg">
          We connect homeowners, landlords, and businesses with verified
          specialists for plumbing, electrical, building, and more — book on your
          phone, pay a small deposit, track the job, and pay labour separately.
          Workers get jobs, a professional profile, and MoMo payouts.
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
