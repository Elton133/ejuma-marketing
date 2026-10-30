import type { ReactNode } from "react";
import { Footer } from "../Footer";
import { CommunityNav, HeroCast } from "./CommunityMotion";

export function CommunityShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen bg-black text-white">
        <section className="relative overflow-hidden border-b border-white/10 px-6 pb-12 pt-36 md:px-14 lg:px-24">
          <div className="mx-auto grid max-w-6xl items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <p data-hero-animate className="text-xs font-bold uppercase tracking-[.18em] text-[#FF5F15]">
                {eyebrow}
              </p>
              <h1 data-hero-animate className="mt-4 max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[.95] tracking-[-.04em]">
                {title}
              </h1>
              <p data-hero-animate className="mt-6 max-w-2xl text-base leading-7 text-white/60 md:text-lg">
                {description}
              </p>
            </div>
            <HeroCast />
          </div>
          <div className="mx-auto mt-10 max-w-6xl">
            <CommunityNav />
          </div>
        </section>
        <section className="px-6 py-16 md:px-14 md:py-20 lg:px-24">
          <div className="mx-auto max-w-6xl">{children}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}
