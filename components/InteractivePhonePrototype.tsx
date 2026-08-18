"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type PrototypeScreen = { image: string; label: string; eyebrow: string; title: string; description: string };
type Props = { screens: readonly PrototypeScreen[]; audience: string; cta: string; href: string };

export function InteractivePhonePrototype({ screens, audience, cta, href }: Props) {
  const [active, setActive] = useState(0);
  const screen = screens[active];
  const isLast = active === screens.length - 1;
  if (!screen) return null;
  const advance = () => setActive((current) => isLast ? 0 : current + 1);

  return <section className="relative overflow-hidden bg-[#101111] px-6 py-20 text-white md:px-10 md:py-28"><div className="mx-auto grid max-w-[1300px] items-center gap-14 lg:grid-cols-[1.08fr_.92fr] lg:gap-20">
    <div className="flex min-h-[560px] flex-col items-center justify-center md:min-h-[650px]">
      <div className="relative w-full max-w-[330px] rounded-[3.25rem] border-[8px] border-[#292a2c] bg-black p-2 shadow-[0_38px_90px_rgba(0,0,0,.65)]"><div className="pointer-events-none absolute left-1/2 top-3 z-30 h-6 w-24 -translate-x-1/2 rounded-full bg-black"/><div className="relative aspect-[9/19.4] overflow-hidden rounded-[2.55rem] bg-[#111]"><Image src={screen.image} alt={`${screen.label} screen`} fill priority={active===0} unoptimized={process.env.NODE_ENV === "development"} className="object-cover object-top" sizes="330px"/><button type="button" onClick={advance} className="group absolute inset-x-[7%] bottom-[7%] z-20 flex h-[18%] items-end justify-center rounded-2xl border border-white/0 pb-3 transition hover:border-white/55 hover:bg-black/10 focus-visible:border-white focus-visible:bg-black/15 focus-visible:outline-none" aria-label={`${isLast?"Restart demo":"Continue to"} ${isLast?screens[0].label:screens[active+1].label}`}><span className="rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.12em] text-white opacity-0 shadow-lg backdrop-blur-md transition group-hover:opacity-100 group-focus-visible:opacity-100 md:opacity-100">{isLast?"Tap to restart":"Tap to continue"}</span></button></div></div>
      <div className="mt-7 flex items-center gap-4"><button type="button" onClick={()=>setActive(current=>Math.max(0,current-1))} disabled={active===0} className="text-sm text-white/60 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-25">Back</button><div className="flex gap-2" aria-label={`Step ${active+1} of ${screens.length}`}>{screens.map((item,index)=><button key={item.image} type="button" onClick={()=>setActive(index)} aria-label={`Show ${item.label}`} aria-current={index===active?"step":undefined} className={`h-2 rounded-full transition-all ${index===active?"w-8 bg-[#FF5F15]":"w-2 bg-white/25 hover:bg-white/45"}`}/>)}</div><button type="button" onClick={advance} className="text-sm font-medium text-white transition hover:text-[#FF7B3D]">{isLast?"Restart":"Next"}</button></div>
    </div>
    <div aria-live="polite"><div className="flex gap-6 border-b border-white/15"><span className="border-b-2 border-[#FF5F15] pb-4 text-sm font-semibold text-white md:text-base">{audience}</span><span className="pb-4 text-sm text-white/40 md:text-base">{screen.eyebrow}</span></div><h2 className="mt-10 max-w-xl text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.08] tracking-tight">{screen.title}</h2><p className="mt-6 max-w-lg text-base leading-relaxed text-white/60 md:text-lg">{screen.description}</p><Link href={href} className="mt-9 inline-flex rounded-full bg-[#FF5F15] px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-[#FF7335] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5F15]">{cta}</Link></div>
  </div></section>;
}
