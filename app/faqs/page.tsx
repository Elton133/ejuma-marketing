import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { FAQForm } from "@/components/FAQForm";
import { HERO_IMAGES } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Community Q&A - Beagine",
  description: "Browse frequently asked questions from the Beagine community and submit your own.",
};

// Force dynamic fetching so new answers show up immediately
export const revalidate = 0;

export default async function FAQsPage() {
  // Fetch only answered questions
  const { data: faqs, error } = await supabase
    .from("community_faqs")
    .select("*")
    .eq("status", "answered")
    .order("created_at", { ascending: false });

  // Handle case where table doesn't exist yet gracefully
  const safeFaqs = faqs || [];

  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col">
        
        {/* Hero Section */}
        <section className="relative flex min-h-[50vh] flex-col justify-end bg-black px-6 pb-20 pt-36 md:px-14 md:pb-24 md:pt-40 lg:px-24 text-left">
          {/* Cinematic Background */}
          <div className="absolute inset-0 z-0">
            <Image 
              src={HERO_IMAGES[1]} 
              alt="" 
              fill 
              className="object-cover opacity-[0.25] mix-blend-luminosity" 
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
            <div className="hero-grain absolute inset-0 pointer-events-none opacity-50" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[800px]" data-reveal-stagger>
            <p data-reveal-item className="mb-4 text-sm font-semibold tracking-wider text-[#FF5F15] uppercase">
              Community Q&A
            </p>
            <h1 data-reveal-item className="mt-4 max-w-3xl text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-white">
              You ask, we answer.
            </h1>
            <p data-reveal-item className="mt-6 text-lg leading-relaxed text-white/60 md:text-xl">
              Everything you need to know about how Beagine is revolutionizing the skilled trades industry. If you don't see your question, ask it below!
            </p>
          </div>
        </section>

        {/* FAQs List Section */}
        <section className="bg-black px-6 py-16 md:px-14 md:py-24 lg:px-24">
          <div className="mx-auto w-full max-w-[800px]">
            {safeFaqs.length > 0 ? (
              <div className="flex flex-col gap-4">
                {safeFaqs.map((faq) => (
                  <details 
                    key={faq.id} 
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors hover:border-white/20"
                  >
                    <summary className="flex cursor-pointer items-center justify-between p-6 text-lg font-medium text-white outline-none sm:text-xl">
                      <span className="pr-6">{faq.question}</span>
                      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/50 transition-colors group-hover:bg-white/20 group-hover:text-white group-open:rotate-45">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-white/70">
                      <div className="mb-4 h-px w-full bg-white/10" />
                      <p className="whitespace-pre-wrap leading-relaxed">
                        {faq.answer}
                      </p>
                      {faq.name && (
                        <p className="mt-4 text-sm font-medium text-[#FF5F15]">
                          — Asked by {faq.name}
                        </p>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-12 text-center">
                <p className="text-lg text-white/50">No questions have been answered yet.</p>
                <p className="mt-2 text-white/40">Be the first to ask a question below!</p>
              </div>
            )}
          </div>
        </section>

        {/* Form Section */}
        <section className="bg-black px-6 pb-24 md:px-14 lg:px-24">
          <div className="mx-auto w-full max-w-[800px]">
            <FAQForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
