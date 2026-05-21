import { WORKER_FEATURES } from "@/lib/constants";

export function WorkerFeaturesGrid() {
  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-2">
      {WORKER_FEATURES.map((feature) => (
        <article
          key={feature.title}
          className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 md:p-8"
        >
          <h3 className="text-lg font-bold tracking-tight md:text-xl">
            {feature.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60 md:text-[15px]">
            {feature.description}
          </p>
        </article>
      ))}
    </div>
  );
}
