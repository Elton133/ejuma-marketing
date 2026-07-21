import type { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LegalToc } from "@/components/LegalToc";

export function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-black pt-32 pb-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {lastUpdated && (
            <p className="mb-12 text-sm text-white/50">Last Updated: {lastUpdated}</p>
          )}

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr]">
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <LegalToc />
            </aside>
            <div id="legal-content" className="max-w-3xl text-base text-white/70">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
