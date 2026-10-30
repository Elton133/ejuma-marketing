import type { Pro } from "@/lib/hire-survey";
import { Character } from "../story/Character";

/** One specialist as a pop-up card. GSAP finds the data-* hooks to count up the numbers and fill the stars. */
export function ProCard({
  pro,
  state,
  onPick,
}: {
  pro: Pro;
  state: "idle" | "chosen" | "dimmed";
  onPick?: () => void;
}) {
  return (
    <button
      type="button"
      data-pro-card
      onClick={onPick}
      disabled={!onPick}
      aria-pressed={state === "chosen"}
      aria-label={`Hire ${pro.name}, GH₵${pro.price}, ${pro.years} years' experience, ${pro.rating ? `rated ${pro.rating} from ${pro.reviews} reviews` : "no reviews yet"}`}
      className={`group relative flex w-full items-center gap-4 rounded-[1.75rem] border p-4 text-left transition-[border-color,background-color,opacity,filter,transform] duration-500 md:flex-col md:items-stretch md:p-5 ${
        state === "chosen"
          ? "border-[#FF5F15] bg-[#FF5F15]/10 shadow-[0_0_60px_-12px_rgba(255,95,21,.55)]"
          : state === "dimmed"
            ? "scale-[.94] border-white/5 bg-white/[.02] opacity-30 grayscale"
            : "border-white/10 bg-white/[.04] enabled:hover:-translate-y-1 enabled:hover:border-white/30"
      }`}
    >
      <div className="relative shrink-0">
        <div className="h-24 w-24 overflow-hidden rounded-[1.4rem] bg-gradient-to-b from-white/10 to-white/[.02] md:mx-auto md:h-28 md:w-28">
          <Character look={pro.look} className="h-full w-full" />
        </div>
        {pro.certified ? (
          <span data-pop className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#FF5F15] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
            Certified
          </span>
        ) : null}
      </div>

      <div className="min-w-0 flex-1 md:mt-3 md:text-center">
        <p className="text-base font-semibold leading-tight md:text-lg">{pro.name}</p>
        <p className="text-xs text-white/45">{pro.title}</p>

        <p className="mt-2 font-heading text-3xl leading-none md:text-4xl">
          GH₵<span data-count={pro.price}>{pro.price}</span>
          <span className="ml-1.5 font-sans text-[11px] font-normal tracking-normal text-white/40">labour</span>
        </p>

        <p className="mt-2 text-sm text-white/80">
          <span data-count={pro.years}>{pro.years}</span>
          {" years' experience"}
        </p>
        <p className="mt-0.5 text-xs leading-5 text-white/50">{pro.skills}</p>

        <div className="mt-2 flex items-center gap-2 text-xs md:justify-center">
          {pro.rating ? (
            <>
              <span className="relative inline-block text-sm leading-none tracking-[2px] text-white/15">
                ★★★★★
                <span data-stars style={{ width: `${(pro.rating / 5) * 100}%` }} className="absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap text-[#FF5F15]">
                  ★★★★★
                </span>
              </span>
              <span className="font-semibold">{pro.rating}</span>
              <span className="text-white/45">
                · <span data-count={pro.reviews}>{pro.reviews}</span> reviews
              </span>
            </>
          ) : (
            <span className="rounded-full border border-dashed border-white/20 px-2.5 py-0.5 text-white/45">No reviews yet</span>
          )}
        </div>
      </div>

      {state === "chosen" ? (
        <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#FF5F15] text-sm font-bold text-black">✓</span>
      ) : null}
    </button>
  );
}
