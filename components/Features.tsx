import { CUSTOMER_FEATURE_ROWS, WORKER_FEATURES } from "@/lib/constants";
import { FeatureSplitRow } from "./FeatureSplitRow";
import { MicroLabel } from "./MicroLabel";

export function Features() {
  return (
    <>
      <section
        id="features"
        className="bg-white px-6 py-16 text-black md:py-24"
      >
        <div className="mx-auto max-w-[1200px]">
          <header className="mb-4 max-w-3xl md:mb-8">
            <MicroLabel light>For customers</MicroLabel>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">
              Everything you need to hire with confidence
            </h2>
          </header>

          <div className="divide-y divide-black/[0.06]">
            {CUSTOMER_FEATURE_ROWS.map((feature) => (
              <div key={feature.title} className="py-14 md:py-20 lg:py-24">
                <FeatureSplitRow
                  icon={feature.icon}
                  eyebrow={feature.eyebrow}
                  title={feature.title}
                  description={feature.description}
                  cta={feature.cta}
                  panelClass={feature.panelClass}
                  visualPosition={feature.visualPosition}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="for-workers"
        className="bg-black px-6 py-20 text-white md:py-28"
      >
        <div className="mx-auto max-w-[1440px]">
          <MicroLabel>For workers</MicroLabel>
          <h2 className="mt-3 max-w-2xl text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight">
            Start earning with Ejuma
          </h2>
          <p className="mt-4 max-w-xl text-white/60">
            Get verified once, get discovered. Dashboard, job alerts, and MoMo
            payouts — no app store required.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {WORKER_FEATURES.map((feature) => (
              <article
                key={feature.title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7"
              >
                <h3 className="text-lg font-bold tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
