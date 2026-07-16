import { CUSTOMER_FEATURE_ROWS } from "@/lib/constants";
import { FeatureSplitRow } from "./FeatureSplitRow";
import { MicroLabel } from "./MicroLabel";
import { WorkerFeaturesGrid } from "./WorkerFeaturesGrid";

export function Features() {
  return (
    <>
      <section
        id="features"
        className="bg-[#fafafa] px-6 py-16 text-black md:py-24"
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

          <div className="mt-16 flex flex-col gap-6 md:gap-8 pb-32">
            {CUSTOMER_FEATURE_ROWS.map((feature, index) => (
              <div
                key={feature.title}
                data-reveal
                className="sticky overflow-hidden rounded-[2.5rem] border border-black/5 bg-white p-6 shadow-xl shadow-black/5 md:p-10 lg:p-14"
                style={{ top: `calc(12vh + ${index * 2}rem)` }}
              >
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
