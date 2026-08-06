import { MicroLabel } from "./MicroLabel";
import Link from "next/link";
import { TiltCard } from "./TiltCard";
import { HugeiconsIcon } from "@hugeicons/react";
import { ShieldUserIcon, UserStar01Icon, Notification01Icon } from "@hugeicons/core-free-icons";

export function TrustSection() {
  return (
    <section className="bg-black px-6 py-20 text-white md:py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF5F15]/5 blur-[120px] pointer-events-none" />
      <div className="mx-auto max-w-[1200px] relative z-10">
        <div className="text-center">
          <MicroLabel>Trust & Accountability</MicroLabel>
          <h2 data-split-words-up className="mt-4 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">
            More than just a marketplace
          </h2>
          <p data-reveal className="mx-auto mt-4 max-w-2xl text-lg text-white/65">
            We are an execution platform built around trust, coordination, and accountability. Your peace of mind is our priority.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3" data-reveal-stagger>
          <TiltCard data-reveal-item className="glass-panel relative rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 overflow-hidden pointer-events-none">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#FF5F15]/10 blur-3xl" />
            <HugeiconsIcon icon={ShieldUserIcon} size={42} color="#FF5F15" strokeWidth={1.3} />
            <h3 className="mt-6 text-xl font-semibold tracking-tight">Verified Professionals</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Every specialist on Beagine goes through a strict vetting process. We verify identities, check backgrounds, and review past work so you only work with proven professionals.
            </p>
          </TiltCard>
          
          <TiltCard data-reveal-item className="glass-panel relative rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 overflow-hidden pointer-events-none">
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[#FF5F15]/10 blur-3xl" />
            <HugeiconsIcon icon={UserStar01Icon} size={42} color="#FF5F15" strokeWidth={1.3} />
            <h3 className="mt-6 text-xl font-semibold tracking-tight">Quality Managed</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              We monitor job progress and gather feedback after every completion. High standards are enforced to ensure reliable, high-quality execution every single time.
            </p>
          </TiltCard>

          <TiltCard data-reveal-item className="glass-panel relative rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 overflow-hidden">
            <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-[#FF5F15]/10 blur-3xl" />
            <div className="pointer-events-none relative z-10">
              <HugeiconsIcon icon={Notification01Icon} size={42} color="#FF5F15" strokeWidth={1.3} />
              <h3 className="mt-6 text-xl font-semibold tracking-tight">Always Supported</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Our support team is here when you need them. From booking questions to dispute resolution, we stand by our process to keep you protected.
              </p>
            </div>
            <div className="mt-6 z-10 relative">
              <Link href="mailto:support@beagine.com" className="text-sm font-semibold text-[#FF5F15] hover:underline">
                Contact Support &rarr;
              </Link>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
