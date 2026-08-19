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
      <div className="relative min-h-[430px] md:min-h-[560px]" aria-label="Customers, specialists and vendors connected through Beagine">
        <div aria-hidden className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"/><div aria-hidden className="absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#FF5F15]/35"/>
        <div className="absolute left-1/2 top-1/2 z-10 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF5F15] text-4xl font-semibold text-black shadow-[0_0_80px_rgba(255,95,21,.25)] md:h-36 md:w-36 md:text-5xl">b.</div>
        {products.map((item,index)=>{const positions=["left-[3%] top-[10%]","right-[1%] top-[26%]","bottom-[5%] left-[12%]"];return <button key={item.id} type="button" onClick={()=>setActive(item.id)} className={`absolute ${positions[index]} z-20 w-40 rounded-[1.5rem] border p-5 text-left transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5F15] md:w-48 md:p-6 ${active===item.id?"border-[#FF5F15]/60 bg-[#FF5F15] text-black shadow-[0_20px_50px_rgba(255,95,21,.18)]":"border-white/10 bg-white/[.055] text-white backdrop-blur-md hover:border-white/25 hover:bg-white/[.08]"}`} aria-pressed={active===item.id}><span className="text-[10px] font-semibold uppercase tracking-[.16em] opacity-55">0{index+1}</span><span className="mt-8 block text-xl font-semibold">{item.tab}</span><span className="mt-1 block text-xs opacity-55">Enter the ecosystem ↗</span></button>})}
      </div>
      <div>
        <div className="flex border-b border-white/15" role="tablist" aria-label="Choose a Beagine app">{products.map(item=><button key={item.id} type="button" role="tab" aria-selected={active===item.id} onClick={()=>setActive(item.id)} className={`relative px-4 py-4 text-sm transition first:pl-0 md:text-base ${active===item.id?"font-semibold text-white":"text-white/50 hover:text-white/75"}`}>{item.tab}{active===item.id?<span className="absolute inset-x-0 bottom-[-1px] h-0.5 bg-[#FF5F15]"/>:null}</button>)}</div>
        <div className="pt-10" aria-live="polite"><h2 className="max-w-xl text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.08] tracking-tight">{product.title}</h2><p className="mt-6 max-w-lg text-base leading-relaxed text-white/60 md:text-lg">{product.body}</p><Link href={product.href} className="mt-9 inline-flex rounded-full bg-[#FF5F15] px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-[#ff7335] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF5F15]">{product.cta}</Link></div>
      </div>
    </div>
  </section>
}
