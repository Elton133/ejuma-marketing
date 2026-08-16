import Image from "next/image";
import { MicroLabel } from "./MicroLabel";
import Link from "next/link";
import { TiltCard } from "./TiltCard";

export function TrustSection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-20 text-white md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF5F15]/5 blur-[120px]" />
      <div className="relative z-10 mx-auto max-w-[1200px]">
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
          <TiltCard data-reveal-item className="glass-panel pointer-events-none relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#FF5F15]/10 blur-3xl" />
            <div className="relative h-40">
              <Image
                src="/assets/objects/verification-shield.png"
                alt="Verification and safety shield"
                fill
                loading="lazy"
                sizes="(max-width: 767px) 100vw, 33vw"
                className="object-contain object-left"
              />
            </div>
            <h3 className="mt-6 text-xl font-semibold tracking-tight">Verified Professionals</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Every specialist on Beagine goes through a strict vetting process. We verify identities, check backgrounds, and review past work so you only work with proven professionals.
            </p>
          </TiltCard>

          <TiltCard data-reveal-item className="glass-panel pointer-events-none relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[#FF5F15]/10 blur-3xl" />
            <div className="relative h-40">
              <Image
                src="/assets/characters/verified-specialist.png"
                alt="Verified Beagine engineering specialist"
                fill
                loading="lazy"
                sizes="(max-width: 767px) 100vw, 33vw"
                className="object-contain object-left"
              />
            </div>
            <h3 className="mt-6 text-xl font-semibold tracking-tight">Quality Managed</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              We monitor job progress and gather feedback after every completion. High standards are enforced to ensure reliable, high-quality execution every single time.
            </p>
          </TiltCard>

          <TiltCard data-reveal-item className="glass-panel relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#FF5F15]/10 blur-3xl" />
            <div className="pointer-events-none relative z-10">
              <div className="relative h-40">
                <Image
                  src="/assets/objects/support-bell.png"
                  alt="Support notification bell"
                  fill
                  loading="lazy"
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="object-contain object-left"
                />
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">Always Supported</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Our support team is here when you need them. From booking questions to dispute resolution, we stand by our process to keep you protected.
              </p>
            </div>
            <div className="relative z-10 mt-6">
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
