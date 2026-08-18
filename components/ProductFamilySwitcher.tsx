"use client";

import { useState } from "react";
import Link from "next/link";

const products = [
  { id: "customer", tab: "Customer", title: "Get trusted help, without the guesswork.", body: "Discover specialists, book with confidence and stay informed from request to completion.", href: "/customers", cta: "Meet the customer app" },
  { id: "specialist", tab: "Specialist", title: "Turn practical skill into visible opportunity.", body: "Find relevant work, operate professionally and build a reputation backed by completed jobs.", href: "/specialists", cta: "Meet the specialist app" },
  { id: "vendor", tab: "Vendor", title: "Put your shop closer to real demand.", body: "Digitise your catalogue and serve the customers and professionals already doing the work.", href: "/vendors", cta: "Meet the vendor app" },
] as const;

export function ProductFamilySwitcher(){
  const [active,setActive]=useState<(typeof products)[number]["id"]>("customer");
  const product=products.find(item=>item.id===active) ?? products[0];
  return <section className="overflow-hidden bg-[#101111] px-6 py-20 text-white md:px-10 md:py-28">
    <div className="mx-auto grid max-w-[1300px] items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
      <div className="relative min-h-[430px] md:min-h-[560px]" aria-label="The three Beagine apps">
        <div className="absolute -left-[8%] top-[4%] h-[108%] w-[74%] rotate-[-7deg] rounded-[4rem] border-[9px] border-[#272729] bg-black shadow-[0_35px_100px_rgba(0,0,0,.65)]">
          <div className="grid h-full content-start grid-cols-2 gap-5 rounded-[3.35rem] bg-linear-to-b from-[#141416] to-black p-8 pt-20 md:p-12 md:pt-28">
            {products.map(item=><button key={item.id} type="button" onClick={()=>setActive(item.id)} className={`aspect-square rounded-[1.6rem] p-4 text-left transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5F15] ${active===item.id?"bg-[#FF5F15] text-black shadow-[0_20px_45px_rgba(255,95,21,.28)]":"bg-[#1f2022] text-white/55 hover:bg-[#28292b]"}`} aria-pressed={active===item.id}><span className="block text-2xl font-semibold tracking-tight md:text-3xl">b.</span><span className="mt-8 block text-xs font-medium md:text-sm">{item.tab}</span></button>)}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-40 w-full bg-linear-to-t from-[#101111] to-transparent"/>
      </div>
      <div>
        <div className="flex border-b border-white/15" role="tablist" aria-label="Choose a Beagine app">{products.map(item=><button key={item.id} type="button" role="tab" aria-selected={active===item.id} onClick={()=>setActive(item.id)} className={`relative px-4 py-4 text-sm transition first:pl-0 md:text-base ${active===item.id?"font-semibold text-white":"text-white/50 hover:text-white/75"}`}>{item.tab}{active===item.id?<span className="absolute inset-x-0 bottom-[-1px] h-0.5 bg-[#FF5F15]"/>:null}</button>)}</div>
        <div className="pt-10" aria-live="polite"><h2 className="max-w-xl text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.08] tracking-tight">{product.title}</h2><p className="mt-6 max-w-lg text-base leading-relaxed text-white/60 md:text-lg">{product.body}</p><Link href={product.href} className="mt-9 inline-flex rounded-full bg-[#FF5F15] px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-[#ff7335] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5F15]">{product.cta}</Link></div>
      </div>
    </div>
  </section>
}
