import { STATS } from "@/lib/constants";

export function StatsStrip() {
  return (
    <section className="border-y border-white/10 bg-black py-10">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-6 md:grid-cols-4 md:px-10 lg:px-14">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center md:text-left">
            <p className="text-2xl font-bold tracking-tight text-[#FF5F15] md:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-white/60">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
