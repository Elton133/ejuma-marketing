import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { InteractivePhonePrototype } from "@/components/InteractivePhonePrototype";
import { MicroLabel } from "@/components/MicroLabel";
import { COMING_SOON_PATH, HERO_IMAGES, WAITLIST_PATH } from "@/lib/constants";

export type StoryFeature = { eyebrow: string; title: string; description: string; points?: readonly string[]; visualLabel: string; image?: string };
export type StoryStat = { value: string; label: string };
type Props = { eyebrow: string; title: ReactNode; intro: string; audience: string; features: readonly StoryFeature[]; stats: readonly StoryStat[]; closingTitle: string; closingBody: string; primaryLabel: string; secondaryHref?: string; secondaryLabel?: string; afterStats?: ReactNode; featureStyleHero?: boolean; hideFinalShowcase?: boolean; heroImage?: string };

export function ProductStoryPage({ eyebrow, title, intro, audience, features, closingTitle, closingBody, primaryLabel, secondaryHref = "/features", secondaryLabel = "Explore all features", afterStats, featureStyleHero = true, hideFinalShowcase = false, heroImage = HERO_IMAGES[4] }: Props) {
  return <>
    <main>
      {featureStyleHero ? <section className="relative overflow-hidden bg-black px-6 pb-20 pt-36 text-white md:pb-24 md:pt-40">
        <div className="absolute inset-0 z-0 overflow-hidden"><div className="absolute inset-x-0 top-[-20%] h-[140%]"><Image src={heroImage} alt="" fill className="object-cover" priority sizes="100vw"/></div><div className="hero-image-overlay absolute inset-0"/></div>
        <div className="relative z-10 mx-auto max-w-[1200px]"><MicroLabel>{eyebrow}</MicroLabel><h1 className="mt-4 max-w-3xl text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight">{title}</h1><p className="mt-5 max-w-xl text-lg leading-relaxed text-white/65">{intro}</p><div className="mt-8 flex flex-wrap gap-3"><Link href={COMING_SOON_PATH} className="btn-premium inline-flex h-12 items-center justify-center rounded-full bg-[#FF5F15] px-7 text-sm font-semibold text-black hover:bg-[#FF7335] md:h-[52px] md:px-8 md:text-base">{primaryLabel}</Link></div></div>
      </section> : <section className="relative min-h-[92svh] overflow-hidden bg-black px-6 pb-16 pt-32 text-white md:px-10 md:pb-20 md:pt-36 lg:px-14">
        <Image src={heroImage} alt="" fill priority className="object-cover object-center" sizes="100vw"/><div className="absolute inset-0 bg-linear-to-t from-black via-black/45 to-black/20"/><div className="relative mx-auto flex min-h-[calc(92svh-12rem)] max-w-[1440px] items-end"><div className="w-full"><div className="mb-8 flex flex-wrap gap-2"><span className="rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-medium backdrop-blur-md">Customers create demand</span><span className="rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-medium backdrop-blur-md">Specialists deliver skill</span><span className="rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-medium backdrop-blur-md">Vendors supply progress</span></div><MicroLabel>{eyebrow}</MicroLabel><h1 className="mt-4 max-w-4xl text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[.94] tracking-[-.045em]">{title}</h1><div className="mt-7 flex flex-col gap-7 md:flex-row md:items-end md:justify-between"><p className="max-w-xl text-base leading-relaxed text-white/70 md:text-lg">{intro}</p><div className="flex flex-wrap gap-3"><Link href={COMING_SOON_PATH} className="btn-premium inline-flex h-12 items-center justify-center rounded-full bg-[#FF5F15] px-7 text-sm font-semibold text-black hover:bg-[#FF7335] md:h-[52px] md:px-8 md:text-base">{primaryLabel}</Link><Link href={secondaryHref} className="btn-premium inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-black/30 px-7 text-sm font-semibold text-white backdrop-blur-md hover:bg-black/45 md:h-[52px] md:px-8 md:text-base">{secondaryLabel}</Link></div></div></div></div>
      </section>}

      {afterStats}

      {!hideFinalShowcase ? <FinalProductShowcase features={features} audience={audience} cta={primaryLabel}/> : null}

      <section className="relative isolate overflow-hidden bg-[#FF5F15] px-6 py-20 text-black md:px-10 md:py-28">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-36 h-[420px] w-[420px] rounded-full border border-black/10 md:h-[620px] md:w-[620px]"/><div aria-hidden className="pointer-events-none absolute -right-6 -top-16 h-[260px] w-[260px] rounded-full border border-black/10 md:h-[420px] md:w-[420px]"/>
        <p aria-hidden className="pointer-events-none absolute -bottom-[.16em] -left-[.03em] select-none whitespace-nowrap text-[clamp(8rem,24vw,22rem)] font-semibold leading-none tracking-[-.08em] text-black/[.055]">beagine</p>
        <div className="relative z-10 mx-auto grid max-w-[1300px] gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end lg:gap-20">
          <div><MicroLabel light>Built for real work</MicroLabel><h2 className="mt-5 max-w-4xl text-[clamp(2.75rem,6vw,5.75rem)] font-semibold leading-[.96] tracking-[-.045em]">{closingTitle}</h2><p className="mt-7 max-w-2xl text-base leading-relaxed text-black/70 md:text-lg">{closingBody}</p><div className="mt-10 flex flex-wrap gap-3"><Link href={WAITLIST_PATH} className="btn-premium inline-flex h-13 items-center rounded-full bg-black px-8 text-sm font-semibold text-white md:text-base">Join the waitlist <span aria-hidden className="ml-3">↗</span></Link><Link href={COMING_SOON_PATH} className="btn-premium inline-flex h-13 items-center rounded-full border border-black/25 bg-white/15 px-8 text-sm font-semibold text-black backdrop-blur-sm hover:bg-white/25 md:text-base">Open Beagine</Link></div></div>
          <div className="group relative overflow-hidden rounded-[2rem] border border-black/15 bg-black p-7 text-white shadow-[0_28px_70px_rgba(0,0,0,.18)] transition-transform duration-500 hover:-translate-y-1 motion-reduce:transform-none md:p-8"><div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#FF5F15]/25 blur-2xl transition-transform duration-700 group-hover:scale-125 motion-reduce:transform-none"/><div className="relative"><div className="flex items-center justify-between"><span className="text-[11px] font-semibold uppercase tracking-[.16em] text-white/45">Your next chapter</span><span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#FF7B3D]">↗</span></div><p className="mt-16 text-2xl font-semibold leading-tight tracking-tight">Join the people building a better way to get work done.</p><div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5"><span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF5F15] opacity-60 motion-reduce:animate-none"/><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FF5F15]"/></span><span className="text-sm text-white/55">{audience} · early access</span></div></div></div>
        </div>
      </section>
    </main><Footer />
  </>;
}

function FinalProductShowcase({features,audience,cta}:{features:readonly StoryFeature[];audience:string;cta:string}){const screens=features.slice(0,3).flatMap(item=>item.image?[{image:item.image,label:item.visualLabel,eyebrow:item.eyebrow,title:item.title,description:item.description}]:[]);return screens.length?<InteractivePhonePrototype screens={screens} audience={audience} cta={cta} href={COMING_SOON_PATH}/>:null}
