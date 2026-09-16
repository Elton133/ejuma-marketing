import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { MicroLabel } from "@/components/MicroLabel";
import { WAITLIST_PATH } from "@/lib/constants";

const description = "The Beagine Project: building a connected engineering ecosystem for customers, skilled specialists and local vendors, starting in Ghana.";

export const metadata: Metadata = {
  title: "The Beagine Project",
  description,
  alternates: { canonical: "/project" },
  openGraph: {
    title: "The Beagine Project — Making skilled work work better",
    description,
    url: "/project",
    images: [{ url: "/landing10.png" }],
  },
  twitter: { card: "summary_large_image", title: "The Beagine Project", description, images: ["/landing10.png"] },
};

const audiences = [
  { number: "01", title: "People with a job to get done.", role: "Customers", href: "/customers", body: "Homeowners, businesses and organisations need a clearer way to find the right expertise, agree on the work and understand what happens next.", goal: "Confidence from first contact to completion." },
  { number: "02", title: "People with the skill to do it.", role: "Specialists", href: "/specialists", body: "Electricians, plumbers, carpenters and other technical professionals deserve a place to show their work, reach customers and build a reputation that travels beyond word of mouth.", goal: "More visibility. Better tools. Meaningful opportunity." },
  { number: "03", title: "People who keep work moving.", role: "Vendors", href: "/vendors", body: "Local shops and suppliers are part of every successful job. We want to connect their tools and materials to the people who need them, with digital storefronts and clearer order management.", goal: "Local supply connected to real demand." },
];

const journey = [
  { title: "Define the need", body: "Describe the problem, location and timing so the work starts with useful context." },
  { title: "Find the right fit", body: "Compare relevant skills, portfolios and trust signals before agreeing on the job." },
  { title: "Coordinate the work", body: "Keep scope, communication, progress and material needs connected to one job record." },
  { title: "Close the loop", body: "Record completion, confirm the outcome and build a history that informs the next decision." },
];

const phases = [
  { label: "Listen & validate", title: "Start with the people doing the work.", body: "Use customer and specialist research, alongside early community participation, to understand how people find help, price jobs, source materials and resolve problems today.", outcome: "A focused set of problems worth solving." },
  { label: "Build & pilot", title: "Prove the core journey locally.", body: "Our proposed starting point is the Dawhenya, Tema and Prampram corridor in Ghana. A focused pilot would let us test discovery, coordination and completion with a manageable community before expanding.", outcome: "Evidence from real service journeys." },
  { label: "Learn & strengthen", title: "Make reliability repeatable.", body: "Use feedback and job outcomes to improve onboarding, trust checks, support and the connection between services and supplies. Resolve friction before adding more complexity.", outcome: "A service people can return to with confidence." },
  { label: "Expand responsibly", title: "Grow from what works.", body: "Extend to more trades and communities as service quality, local supply and operational capacity allow. The wider ambition is an engineering ecosystem that can serve people well beyond the first pilot.", outcome: "Growth supported by quality and local relevance." },
];

const measures = [
  { title: "Access to expertise", body: "Can customers find a suitable specialist and receive a useful response?" },
  { title: "Reliable delivery", body: "Are agreed jobs completed, with clear communication and fewer unresolved issues?" },
  { title: "Professional opportunity", body: "Are specialists gaining relevant enquiries, repeat work and stronger professional records?" },
  { title: "Local participation", body: "Can vendors reach relevant customers and help jobs move forward with the right supplies?" },
];

const container = "mx-auto max-w-[1320px] px-6 md:px-10 lg:px-14";
const button = "inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5F15]";

export default function ProjectPage() {
  return (
    <>
      <main className="bg-black text-white">
        <section className="relative isolate overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44">
          <div className="absolute inset-0 -z-10">
            <Image src="/landing10.png" alt="" fill priority sizes="100vw" className="object-cover object-center opacity-30" />
            <div className="absolute inset-0 bg-linear-to-r from-black via-black/75 to-black/20" />
            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/30" />
          </div>
          <div className={container}>
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <MicroLabel>The Beagine Project</MicroLabel>
              <span className="rounded-full border border-[#FF5F15]/40 bg-black/40 px-3 py-1.5 text-xs text-[#FF9A6C]">Our vision & proposed direction</span>
            </div>
            <h1 className="max-w-4xl text-[clamp(3rem,7.5vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.045em]">Making skilled work <span className="text-[#FF5F15]">work better.</span></h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">We are building Beagine to connect the people who need technical work, the specialists who deliver it, and the local businesses that supply it.</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">One shared ambition: make everyday engineering services easier to access, easier to coordinate and more accountable, from the first request to the finished job.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={WAITLIST_PATH} className={`${button} bg-[#FF5F15] text-black hover:bg-[#FF7335]`}>Be part of the project <span aria-hidden className="ml-3">↗</span></Link>
              <a href="#vision" className={`${button} border border-white/25 hover:bg-white/10`}>Explore the vision <span aria-hidden className="ml-3">↓</span></a>
            </div>
            <dl className="mt-20 grid gap-6 border-t border-white/20 pt-7 sm:grid-cols-3">
              {[ ["Starting point", "Ghana · Local pilot ambition"], ["Built around", "Customers, specialists & vendors"], ["Long-term purpose", "Stronger access to skilled work"] ].map(([label, value]) => (
                <div key={label}><dt className="text-xs uppercase tracking-widest text-white/50">{label}</dt><dd className="mt-2 text-sm font-medium">{value}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        <section id="vision" className="scroll-mt-24 bg-[#fafafa] py-20 text-black md:py-28">
          <div className={`${container} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
            <div><MicroLabel light>01 / Why this project matters</MicroLabel><h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">The skill exists.<br />The connection needs work.</h2></div>
            <div className="space-y-6 text-lg leading-relaxed text-black/70">
              <p>A leaking pipe, an electrical fault or a renovation can begin with the same question: who can I trust to do this properly? Finding a name is only the beginning. Customers still need to explain the job, agree on expectations, arrange materials and follow through when something changes.</p>
              <p>On the other side, a capable specialist may depend on personal referrals to find work, while a local supplier has limited visibility beyond their shop. The people, skills and materials are there, but the journey between them can be fragmented.</p>
              <p className="font-medium text-black">Our project is to bring that journey together: a shared place where demand becomes organised work, skill earns visible credibility, and local supply supports delivery.</p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className={container}>
            <MicroLabel>02 / What we are building</MicroLabel>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">Three sides of work.<br /><span className="text-white/50">One connected ecosystem.</span></h2>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {audiences.map((item) => (
                <article key={item.role} className="flex flex-col rounded-3xl border border-white/15 bg-[#111111] p-7 md:p-8">
                  <div className="flex items-center justify-between text-xs uppercase tracking-widest"><span className="text-[#FF8B54]">{item.role}</span><span className="text-white/40">{item.number}</span></div>
                  <h3 className="mt-8 text-2xl font-semibold leading-tight">{item.title}</h3>
                  <p className="mt-5 flex-1 text-sm leading-7 text-white/65">{item.body}</p>
                  <p className="mt-8 border-t border-white/10 pt-5 text-sm font-medium">{item.goal}</p>
                  <Link href={item.href} className="mt-6 text-sm text-[#FF8B54] underline-offset-4 hover:underline">Explore the {item.role.toLowerCase()} vision <span aria-hidden>↗</span></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#101010] py-20 md:py-28">
          <div className={container}>
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
              <div><MicroLabel>03 / The experience we want to create</MicroLabel><h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">From “I need help”<br />to “the job is done.”</h2></div>
              <p className="text-lg leading-relaxed text-white/65 lg:pt-9">Imagine a customer arranging an electrical repair. The ambition is for the request, specialist selection, agreed scope, material needs and completion record to stay connected. Each person should know what is expected and what happens next.</p>
            </div>
            <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {journey.map((item, index) => (
                <li key={item.title} className="border-t border-white/20 pt-6"><span className="text-sm font-medium text-[#FF8B54]">0{index + 1}</span><h3 className="mt-5 text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-white/60">{item.body}</p></li>
              ))}
            </ol>
            <p className="mt-10 max-w-3xl text-sm leading-relaxed text-white/50">This is the intended service journey. Features, availability and operational processes will be shaped by research and pilot learning.</p>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className={`${container} grid gap-12 lg:grid-cols-2 lg:gap-20`}>
            <div><MicroLabel>04 / What makes it worth building</MicroLabel><h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">Trust has to live<br />in the details.</h2><p className="mt-6 max-w-lg text-lg leading-relaxed text-white/65">A successful match is only one part of a successful job. We want to design the surrounding experience with equal care.</p><Link href="/safety" className="mt-7 inline-block text-sm text-[#FF8B54] underline underline-offset-4">Explore our trust & safety direction</Link></div>
            <div className="space-y-8">
              {[
                ["Credibility before commitment", "Profiles, portfolios and appropriate verification should help people understand who they are working with and whether their experience fits the job."],
                ["Clarity while work happens", "Agreed scope, progress updates and a record of changes should reduce guesswork for both the customer and the specialist."],
                ["Accountability after completion", "Completion evidence, feedback and a clear route for raising concerns should make outcomes easier to understand and problems easier to address."],
                ["Respect for the people involved", "Privacy, consent and practical safety processes need to be considered alongside convenience. Good tools should give people more control over their work and information."],
              ].map(([title, body]) => <div key={title} className="border-b border-white/10 pb-8"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-white/65">{body}</p></div>)}
            </div>
          </div>
        </section>

        <section className="bg-[#fafafa] py-20 text-black md:py-28">
          <div className={container}>
            <MicroLabel light>05 / Proposed path forward</MicroLabel>
            <div className="mt-5 grid gap-6 lg:grid-cols-2"><h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Start locally.<br />Learn deeply. Build outward.</h2><p className="max-w-xl text-lg leading-relaxed text-black/65">The roadmap is a direction for the project, with progress guided by evidence and readiness. We want the first community to shape the service before we bring it to the next.</p></div>
            <ol className="mt-12 divide-y divide-black/15 border-y border-black/15">
              {phases.map((phase, index) => <li key={phase.label} className="grid gap-5 py-9 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr_240px] lg:gap-10"><p className="text-sm font-semibold"><span className="mr-4 text-black/40">0{index + 1}</span>{phase.label}</p><div><h3 className="text-xl font-semibold">{phase.title}</h3><p className="mt-3 max-w-2xl text-sm leading-7 text-black/65">{phase.body}</p></div><p className="text-sm leading-relaxed text-black/60 md:col-start-2 lg:col-start-auto"><span className="mb-2 block text-xs uppercase tracking-widest text-black/45">What we want to learn or achieve</span>{phase.outcome}</p></li>)}
            </ol>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className={container}>
            <MicroLabel>06 / The impact we are working toward</MicroLabel>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">Real progress should show up<br />in people’s working lives.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">Our ambition is to make technical expertise more accessible, strengthen independent livelihoods and give local commerce a greater role in the digital economy. These are the questions we would use to assess progress.</p>
            <div className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2">{measures.map((item) => <div key={item.title} className="border-t border-white/20 pt-6"><h3 className="text-xl font-semibold">{item.title}</h3><p className="mt-3 max-w-lg text-base leading-relaxed text-white/60">{item.body}</p></div>)}</div>
          </div>
        </section>

        <section className="bg-[#FF5F15] py-20 text-black md:py-28">
          <div className={`${container} grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20`}>
            <div><MicroLabel light>Help shape what comes next</MicroLabel><h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">A project built around people needs people in the room.</h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-black/75">Whether you need skilled help, work in a trade, supply materials or see a way to contribute, your experience can help us build something useful.</p></div>
            <div className="flex flex-col justify-center gap-6">
              <div><h3 className="text-xl font-semibold">Follow the project</h3><p className="mt-2 text-sm leading-relaxed text-black/75">Join as a customer, specialist or vendor to register your interest.</p><Link href={WAITLIST_PATH} className={`${button} mt-4 bg-black text-white hover:bg-black/80`}>Join the waitlist <span aria-hidden className="ml-3">↗</span></Link></div>
              <div className="border-t border-black/20 pt-6"><h3 className="text-xl font-semibold">Bring your perspective</h3><p className="mt-2 text-sm leading-relaxed text-black/75">Take part in our customer or specialist research and help us understand what matters on the ground.</p><Link href="/research" className="mt-4 inline-block font-semibold underline underline-offset-4">Contribute to the research <span aria-hidden>↗</span></Link></div>
              <Link href="/community/support" className="text-sm font-medium underline underline-offset-4">Have an idea for collaboration? Get in touch <span aria-hidden>↗</span></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
