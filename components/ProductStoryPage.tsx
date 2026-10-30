import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ClosingCta } from "@/components/ClosingCta";
import { Footer } from "@/components/Footer";
import { InteractivePhonePrototype } from "@/components/InteractivePhonePrototype";
import { MicroLabel } from "@/components/MicroLabel";
import { HERO_IMAGES, WAITLIST_PATH } from "@/lib/constants";

export type StoryFeature = { eyebrow: string; title: string; description: string; points?: readonly string[]; visualLabel: string; image?: string };
export type StoryStat = { value: string; label: string };
type Props = { eyebrow: string; title: ReactNode; intro: string; audience: string; features: readonly StoryFeature[]; stats: readonly StoryStat[]; closingTitle: string; closingBody: string; primaryLabel: string; secondaryHref?: string; secondaryLabel?: string; afterStats?: ReactNode; featureStyleHero?: boolean; hideFinalShowcase?: boolean; heroImage?: string };

export function ProductStoryPage({ eyebrow, title, intro, audience, features, closingTitle, closingBody, primaryLabel, secondaryHref = "/features", secondaryLabel = "Explore all features", afterStats, featureStyleHero = true, hideFinalShowcase = false, heroImage = HERO_IMAGES[4] }: Props) {
  return <>
    <main>
      {featureStyleHero ? <section className="relative overflow-hidden bg-black px-6 pb-20 pt-36 text-white md:pb-24 md:pt-40">
        <div className="absolute inset-0 z-0 overflow-hidden"><div className="absolute inset-x-0 top-[-20%] h-[140%]"><Image src={heroImage} alt="" fill className="object-cover" priority sizes="100vw"/></div><div className="hero-image-overlay absolute inset-0"/></div>
        <div className="relative z-10 mx-auto max-w-[1200px]"><MicroLabel>{eyebrow}</MicroLabel><h1 className="mt-4 max-w-3xl text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight">{title}</h1><p className="mt-5 max-w-xl text-lg leading-relaxed text-white/65">{intro}</p><div className="mt-8 flex flex-wrap gap-3"><Link href={WAITLIST_PATH} className="btn-premium inline-flex h-12 items-center justify-center rounded-full bg-[#FF5F15] px-7 text-sm font-semibold text-black hover:bg-[#FF7335] md:h-[52px] md:px-8 md:text-base">{primaryLabel}</Link></div></div>
      </section> : <section className="relative min-h-[92svh] overflow-hidden bg-black px-6 pb-16 pt-32 text-white md:px-10 md:pb-20 md:pt-36 lg:px-14">
        <Image src={heroImage} alt="" fill priority className="object-cover object-center" sizes="100vw"/><div className="absolute inset-0 bg-linear-to-t from-black via-black/45 to-black/20"/><div className="relative mx-auto flex min-h-[calc(92svh-12rem)] max-w-[1440px] items-end"><div className="w-full"><div className="mb-8 flex flex-wrap gap-2"><span className="rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-medium backdrop-blur-md">Customers create demand</span><span className="rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-medium backdrop-blur-md">Specialists deliver skill</span><span className="rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-medium backdrop-blur-md">Vendors supply progress</span></div><MicroLabel>{eyebrow}</MicroLabel><h1 className="mt-4 max-w-4xl text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[.94] tracking-[-.045em]">{title}</h1><div className="mt-7 flex flex-col gap-7 md:flex-row md:items-end md:justify-between"><p className="max-w-xl text-base leading-relaxed text-white/70 md:text-lg">{intro}</p><div className="flex flex-wrap gap-3"><Link href={WAITLIST_PATH} className="btn-premium inline-flex h-12 items-center justify-center rounded-full bg-[#FF5F15] px-7 text-sm font-semibold text-black hover:bg-[#FF7335] md:h-[52px] md:px-8 md:text-base">{primaryLabel}</Link><Link href={secondaryHref} className="btn-premium inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-black/30 px-7 text-sm font-semibold text-white backdrop-blur-md hover:bg-black/45 md:h-[52px] md:px-8 md:text-base">{secondaryLabel}</Link></div></div></div></div>
      </section>}

      {afterStats}

      {!hideFinalShowcase ? <FinalProductShowcase features={features} audience={audience} cta={primaryLabel}/> : null}

      <ClosingCta closingTitle={closingTitle} closingBody={closingBody} audience={audience} />
    </main><Footer />
  </>;
}

function FinalProductShowcase({features,audience,cta}:{features:readonly StoryFeature[];audience:string;cta:string}){const screens=features.slice(0,3).flatMap(item=>item.image?[{image:item.image,label:item.visualLabel,eyebrow:item.eyebrow,title:item.title,description:item.description}]:[]);return screens.length?<InteractivePhonePrototype screens={screens} audience={audience} cta={cta} href={WAITLIST_PATH}/>:null}
