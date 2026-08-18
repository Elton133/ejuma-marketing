import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { InteractivePhonePrototype } from "@/components/InteractivePhonePrototype";
import { MicroLabel } from "@/components/MicroLabel";
import { COMING_SOON_PATH, HERO_IMAGES, WAITLIST_PATH } from "@/lib/constants";

export type StoryFeature = { eyebrow: string; title: string; description: string; points?: readonly string[]; visualLabel: string; image?: string };
export type StoryStat = { value: string; label: string };
type Props = { eyebrow: string; title: ReactNode; intro: string; audience: string; features: readonly StoryFeature[]; stats: readonly StoryStat[]; closingTitle: string; closingBody: string; primaryLabel: string; secondaryHref?: string; secondaryLabel?: string; afterStats?: ReactNode; featureStyleHero?: boolean; hideFinalShowcase?: boolean };

export function ProductStoryPage({ eyebrow, title, intro, audience, features, closingTitle, closingBody, primaryLabel, secondaryHref = "/features", secondaryLabel = "Explore all features", afterStats, featureStyleHero = true, hideFinalShowcase = false }: Props) {
  return <>
    <main>
      {featureStyleHero ? <section className="relative overflow-hidden bg-black px-6 pb-20 pt-36 text-white md:pb-24 md:pt-40">
        <div className="absolute inset-0 z-0 overflow-hidden"><div className="absolute inset-x-0 top-[-20%] h-[140%]"><Image src={HERO_IMAGES[4]} alt="" fill className="object-cover" priority sizes="100vw"/></div><div className="hero-image-overlay absolute inset-0"/><div className="hero-grain pointer-events-none absolute inset-0 opacity-30"/></div>
        <div className="relative z-10 mx-auto max-w-[1200px]"><MicroLabel>{eyebrow}</MicroLabel><h1 className="mt-4 max-w-3xl text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight">{title}</h1><p className="mt-5 max-w-xl text-lg leading-relaxed text-white/65">{intro}</p><div className="mt-8 flex flex-wrap gap-3"><Link href={COMING_SOON_PATH} className="btn-premium inline-flex h-12 items-center justify-center rounded-full bg-[#FF5F15] px-7 text-sm font-semibold text-black hover:bg-[#FF7335] md:h-[52px] md:px-8 md:text-base">{primaryLabel}</Link></div></div>
      </section> : <section className="relative min-h-[78svh] overflow-hidden bg-black px-6 pb-16 pt-32 text-white md:px-10 md:pb-20 md:pt-36 lg:px-14">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_78%_34%,rgba(255,95,21,.16),transparent_30%)]"/><div aria-hidden className="hero-grain absolute inset-0"/><div className="relative mx-auto flex min-h-[calc(78svh-12rem)] max-w-[1440px] items-end"><div className="grid w-full items-end gap-12 lg:grid-cols-[minmax(0,1fr)_380px]"><div className="max-w-2xl"><MicroLabel>{eyebrow}</MicroLabel><h1 className="mt-4 text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-tight">{title}</h1><p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:mt-6 md:text-lg">{intro}</p><div className="mt-8 flex flex-wrap gap-3 md:mt-10"><Link href={COMING_SOON_PATH} className="btn-premium inline-flex h-12 items-center justify-center rounded-full bg-[#FF5F15] px-7 text-sm font-semibold text-black hover:bg-[#FF7335] md:h-[52px] md:px-8 md:text-base">{primaryLabel}</Link><Link href={secondaryHref} className="btn-premium inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/15 md:h-[52px] md:px-8 md:text-base">{secondaryLabel}</Link></div></div><div className="hidden rounded-[2rem] border border-white/10 bg-white/[.04] p-6 backdrop-blur-md lg:block"><span className="text-xs font-semibold uppercase tracking-[.16em] text-[#FF7B3D]">{audience}</span><p className="mt-4 text-xl font-semibold tracking-tight">Designed around real work.</p><p className="mt-3 text-sm leading-relaxed text-white/55">One connected experience from first action to final outcome.</p></div></div></div>
      </section>}

      {afterStats}

      {!hideFinalShowcase ? <FinalProductShowcase features={features} audience={audience} cta={primaryLabel}/> : null}

      <section className="relative overflow-hidden bg-[#FF5F15] px-6 py-20 text-center text-black md:py-28"><div className="relative z-10 mx-auto max-w-3xl"><MicroLabel light>Built for real work</MicroLabel><h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.08] tracking-tight">{closingTitle}</h2><p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-black/80 md:text-lg">{closingBody}</p><div className="mt-10 flex flex-wrap justify-center gap-3"><Link href={WAITLIST_PATH} className="inline-flex rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white">Join the waitlist</Link><Link href={COMING_SOON_PATH} className="inline-flex rounded-full border border-black/25 px-8 py-3.5 text-sm font-semibold text-black">Open Beagine</Link></div></div></section>
    </main><Footer />
  </>;
}

function FinalProductShowcase({features,audience,cta}:{features:readonly StoryFeature[];audience:string;cta:string}){const screens=features.slice(0,3).flatMap(item=>item.image?[{image:item.image,label:item.visualLabel,eyebrow:item.eyebrow,title:item.title,description:item.description}]:[]);return screens.length?<InteractivePhonePrototype screens={screens} audience={audience} cta={cta} href={COMING_SOON_PATH}/>:null}
