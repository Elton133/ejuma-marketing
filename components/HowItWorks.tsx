import Image from "next/image";
import { HOW_IT_WORKS } from "@/lib/constants";
import { MicroLabel } from "./MicroLabel";

const STEP_ASSETS = [
  {
    src: "/assets/characters/customer-booking.png",
    alt: "Customer booking an engineering specialist on her phone",
  },
  {
    src: "/assets/objects/live-tracking-phone.png",
    alt: "Phone showing live specialist tracking",
  },
  {
    src: "/assets/characters/specialist-en-route.png",
    alt: "Engineering specialist travelling to a customer",
  },
  {
    src: "/assets/characters/job-complete-handoff.png",
    alt: "Customer and specialist completing a successful job",
  },
] as const;

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-black px-6 py-20 text-white md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1300px] md:px-4 lg:px-0">
        <div className="max-w-xl">
          <MicroLabel>How it works</MicroLabel>
          <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">
            Get your <em className="text-[#FF5F15] not-italic">problem</em> fixed in only four steps
          </h2>
          <p data-slide-left className="mt-4 text-white/65">Find • Book • Fix</p>
        </div>

        <ol data-stagger-cards className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((item, index) => (
            <li
              key={item.step}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 transition-colors hover:border-[#FF5F15]/35 md:p-6"
            >
              <div className="relative h-56 overflow-hidden rounded-[1.4rem] bg-white/[0.035]">
        
                <Image
                  src={STEP_ASSETS[index].src}
                  alt={STEP_ASSETS[index].alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="relative z-10 pt-6">
                <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}