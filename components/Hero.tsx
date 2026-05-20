import Link from "next/link";
import { APP_URL } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative min-h-svh w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0" aria-hidden>
        <div className="hero-gradient absolute inset-0" />
        <div className="hero-vignette absolute inset-0" />
        <div className="hero-grain absolute inset-0" />
      </div>

      <div className="relative z-10 flex min-h-svh flex-col justify-end pt-24">
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-16 md:px-10 md:pb-20 lg:px-14 lg:pb-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
            <div className="max-w-2xl">
              <h1 className="text-[clamp(2.5rem,6vw,4.75rem)] font-bold leading-[1.02] tracking-tight">
                The hands-on{" "}
                <em className="text-[#FF5F15] not-italic">workforce</em>, on
                your phone.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:mt-6 md:text-lg">
                Book plumbers, electricians, masons, and more in Tema,
                Dawhenya, Prampram and nearby — vetted profiles, secure
                booking, live job tracking.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
                <Link
                  href="#waitlist"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#FF5F15] px-7 text-sm font-semibold text-black transition-opacity hover:opacity-90 md:h-[52px] md:px-8 md:text-base"
                >
                  Join the waitlist
                </Link>
                <Link
                  href="#install"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 md:h-[52px] md:px-8 md:text-base"
                >
                  Install the app
                </Link>
              </div>

              <p className="mt-6 text-sm text-white/50">
                Labour price is agreed with your worker ·{" "}
                <Link
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF5F15] hover:underline"
                >
                  Open 3juma.app →
                </Link>
              </p>
            </div>

            <div className="hidden justify-end lg:flex">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div className="relative w-[280px] rounded-[2.5rem] border border-white/15 bg-zinc-900 p-3 shadow-2xl shadow-[#FF5F15]/10">
      <div className="overflow-hidden rounded-[2rem] bg-[#0a0a0a]">
        <div className="border-b border-white/10 px-4 py-3">
          <p className="text-xs font-semibold text-white">Find a specialist</p>
          <p className="text-[10px] text-white/50">Tema · Plumber</p>
        </div>
        <div className="space-y-2 p-3">
          {["Kofi A.", "Ama M.", "Kwesi T."].map((name, i) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-3"
            >
              <div>
                <p className="text-xs font-medium text-white">{name}</p>
                <p className="text-[10px] text-white/45">
                  {i === 0 ? "1.2 km · Verified" : "2.4 km · Verified"}
                </p>
              </div>
              <span className="rounded-full bg-[#FF5F15] px-3 py-1 text-[10px] font-bold text-black">
                Book
              </span>
            </div>
          ))}
        </div>
        <div className="h-24 bg-gradient-to-t from-[#FF5F15]/20 to-transparent" />
      </div>
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#FF5F15]/25 blur-3xl" />
    </div>
  );
}
