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
        <div className="mx-auto max-w-300">
          <header className="mb-4 max-w-3xl md:mb-10" data-reveal-stagger>
            <MicroLabel light>For customers</MicroLabel>
            <h2 data-reveal-item className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">
              Everything you need,{" "}
              <span className="text-[#FF5F15]">right in your pocket</span>
            </h2>
            <p data-reveal-item className="mt-4 max-w-xl text-base leading-relaxed text-black/55 md:text-lg">
              From finding the right specialist to tracking their arrival —
              Beagine handles it all so you can focus on what matters.
            </p>
          </header>

          <div className="divide-y divide-black/6">
            {CUSTOMER_FEATURE_ROWS.map((feature) => (
              <div key={feature.title} className="py-12 md:py-16 lg:py-20">
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
        <div className="mx-auto max-w-325">
          <MicroLabel>For specialists</MicroLabel>
          <h2 data-reveal className="mt-3 max-w-2xl text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">
            Get{" "}
            <em className="text-[#FF5F15] not-italic">verified</em>, get{" "}
            <em className="text-[#FF5F15] not-italic">discovered</em> and{" "}
            <em className="text-[#FF5F15] not-italic">earn</em>
          </h2>
          <p data-reveal className="mt-4 max-w-xl text-white/60">
          Set up your profile once, join the ecosystem and start earning. 
          Welcome to the Engineering Ecosystem
          </p>

          <WorkerFeaturesGrid />
        </div>
      </section>
    </>
  );
}
