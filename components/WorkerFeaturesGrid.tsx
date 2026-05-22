import {
  Briefcase01Icon,
  Compass01Icon,
  UserStar01Icon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { WAITLIST_PATH } from "@/lib/constants";

export function WorkerFeaturesGrid() {
  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

      {/* ── Wide: Get more jobs ─────────────────────────────── */}
      <article className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 sm:col-span-2 md:p-10 lg:col-span-2">
        <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[#FF5F15]/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(255,95,21,0.10),transparent_55%)]" />
        <div className="relative">
          <HugeiconsIcon
            icon={Briefcase01Icon}
            size={46}
            color="#FF5F15"
            strokeWidth={1.3}
          />
          <h3 className="mt-5 text-xl font-semibold tracking-tight md:text-2xl">
            Get more jobs
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/60 md:text-[15px]">
            Get discovered by customers searching your trade and service areas.
            The more complete your profile, the higher you show up.
          </p>
        </div>
        <span className="pointer-events-none absolute -bottom-4 right-8 select-none text-[8rem] font-black leading-none tracking-tighter text-white/[0.04]">
          01
        </span>
      </article>

      {/* ── Build your profile ──────────────────────────────── */}
      <article className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-9">
        <HugeiconsIcon
          icon={UserStar01Icon}
          size={42}
          color="#FF5F15"
          strokeWidth={1.3}
        />
        <h3 className="mt-5 text-xl font-semibold tracking-tight">
          Build your profile
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/60 md:text-[15px]">
          Portfolio photos, certificates, bio, and rates — build trust before
          the first booking.
        </p>
        <span className="pointer-events-none absolute -bottom-4 right-6 select-none text-[8rem] font-black leading-none tracking-tighter text-white/[0.04]">
          02
        </span>
      </article>

      {/* ── Work in new areas ───────────────────────────────── */}
      <article className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-9">
        <HugeiconsIcon
          icon={Compass01Icon}
          size={42}
          color="#FF5F15"
          strokeWidth={1.3}
        />
        <h3 className="mt-5 text-xl font-semibold tracking-tight">
          Work in new areas
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/60 md:text-[15px]">
          List several trades and towns — work across the corridor on your own
          terms.
        </p>
        <span className="pointer-events-none absolute -bottom-4 right-6 select-none text-[8rem] font-black leading-none tracking-tighter text-white/[0.04]">
          03
        </span>
      </article>

      {/* ── Wide: Earn with Beagine ─────────────────────────── */}
      <article className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 sm:col-span-2 md:p-10 lg:col-span-2">
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-[#FF5F15]/15 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,rgba(255,95,21,0.10),transparent_55%)]" />
        <div className="relative">
          <HugeiconsIcon
            icon={Wallet01Icon}
            size={46}
            color="#FF5F15"
            strokeWidth={1.3}
          />
          <h3 className="mt-5 text-xl font-semibold tracking-tight md:text-2xl">
            Earn with Beagine
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/60 md:text-[15px]">
            Request payouts from your dashboard — usually same day, within 24
            hours. No hidden cuts, no delays.
          </p>
        </div>
        <span className="pointer-events-none absolute -bottom-4 right-8 select-none text-[8rem] font-black leading-none tracking-tighter text-white/[0.04]">
          04
        </span>
      </article>

      {/* ── CTA card ────────────────────────────────────────── */}
      <article className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-[#FF5F15] p-8 md:p-9">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/50">
            Ready to earn?
          </p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-black md:text-2xl">
            Join as a<br />worker today
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-black/60">
            Get verified once, start taking jobs.
          </p>
        </div>
        <Link
          href={WAITLIST_PATH}
          className="mt-8 inline-flex w-fit rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-80"
        >
          Sign up
        </Link>
        <Image
          src="/beaver.png"
          alt=""
          aria-hidden
          width={160}
          height={160}
          className="pointer-events-none absolute -bottom-4 -right-4 select-none opacity-[0.14]"
        />
      </article>

    </div>
  );
}
