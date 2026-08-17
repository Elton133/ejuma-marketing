import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { LegalToc } from "@/components/LegalToc";

export function LegalLayout({
  title,
  lastUpdated,
  sourceDocumentHref,
  children,
}: {
  title: string;
  lastUpdated?: string;
  sourceDocumentHref?: string;
  children: ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen bg-black pt-32 pb-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <div className="mb-12 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/50">
            {lastUpdated && <p>Last Updated: {lastUpdated}</p>}
            {sourceDocumentHref && (
              <a
                href={sourceDocumentHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-4 py-2 font-medium text-white/75 transition-colors hover:border-[#FF5F15]/60 hover:text-[#FF5F15]"
              >
                View source PDF ↗
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr]">
            <aside className="lg:self-start">
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
