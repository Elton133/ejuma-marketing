import { CUSTOMER_FEATURE_ROWS } from "@/lib/constants";
import { FeatureSplitRow } from "./FeatureSplitRow";
import { MicroLabel } from "./MicroLabel";
import { WorkerFeaturesGrid } from "./WorkerFeaturesGrid";

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
            <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">
              Get your work done with confidence
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
                  visualPosition={feature.visualPosition}
                  panelClass={
                    "panelClass" in feature ? feature.panelClass : undefined
                  }
                  image={"image" in feature ? feature.image : undefined}
                  imageAlt={
                    "imageAlt" in feature ? feature.imageAlt : undefined
                  }
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
        <div className="mx-auto max-w-[1300px]">
          <MicroLabel>For workers</MicroLabel>
          <h2 className="mt-3 max-w-2xl text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">
            Get <em className="text-[#FF5F15] not-italic">verified</em>, get {" "}<em className="text-[#FF5F15] not-italic">discovered </em> and <em className="text-[#FF5F15] not-italic">earn </em>
          </h2>
          <p className="mt-4 max-w-xl text-white/60">
            Get verified once, get discovered. Dashboard, job alerts, and MoMo
            payouts - no app store required.
          </p>

          <WorkerFeaturesGrid />
        </div>
      </section>
    </>
  );
}
