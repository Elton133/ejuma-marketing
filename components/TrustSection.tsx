import { MicroLabel } from "./MicroLabel";
import Link from "next/link";

export function TrustSection() {
  return (
    <section className="bg-black px-6 py-20 text-white md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center">
          <MicroLabel>Trust & Accountability</MicroLabel>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">
            More than just a marketplace
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/65">
            We are an execution platform built around trust, coordination, and accountability. Your peace of mind is our priority.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3" data-reveal-stagger>
          <div data-reveal-item className="glass-panel rounded-3xl border border-white/10 bg-white/[0.02] p-8">
            <h3 className="text-xl font-semibold tracking-tight">Verified Professionals</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Every specialist on Beagine goes through a strict vetting process. We verify identities, check backgrounds, and review past work so you only work with proven professionals.
            </p>
          </div>
          
          <div data-reveal-item className="glass-panel rounded-3xl border border-white/10 bg-white/[0.02] p-8">
            <h3 className="text-xl font-semibold tracking-tight">Quality Managed</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              We monitor job progress and gather feedback after every completion. High standards are enforced to ensure reliable, high-quality execution every single time.
            </p>
          </div>

          <div data-reveal-item className="glass-panel rounded-3xl border border-white/10 bg-white/[0.02] p-8">
            <h3 className="text-xl font-semibold tracking-tight">Always Supported</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Our support team is here when you need them. From booking questions to dispute resolution, we stand by our process to keep you protected.
            </p>
            <div className="mt-6">
              <Link href="mailto:support@beagine.com" className="text-sm font-semibold text-[#FF5F15] hover:underline">
                Contact Support &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
