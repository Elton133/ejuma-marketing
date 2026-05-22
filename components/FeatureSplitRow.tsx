import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import {
  FEATURE_ICONS,
  type FeatureIconKey,
} from "@/lib/feature-icons";

type FeatureSplitRowProps = {
  eyebrow: string;
  title: string;
  description: string;
  cta: { label: string; href: string; external?: boolean };
  icon: FeatureIconKey;
  panelClass?: string;
  image?: string;
  imageAlt?: string;
  visualPosition: "left" | "right";
};

export function FeatureSplitRow({
  eyebrow,
  title,
  description,
  cta,
  icon,
  panelClass = "from-[#FF5F15]/10 to-[#fafafa]",
  image,
  imageAlt = "",
  visualPosition,
}: FeatureSplitRowProps) {
  const external = cta.external ?? cta.href.startsWith("http");
  const iconData = FEATURE_ICONS[icon];

  const content = (
    <div className="flex w-full flex-col justify-start lg:max-w-xl">
      <p className="text-[15px] font-medium leading-snug text-black/55">
        {eyebrow}
      </p>
      <h3 className="font-heading mt-4 text-[clamp(1.875rem,3.2vw,2.625rem)] leading-[1.12] text-black">
        {title}
      </h3>
      <p className="mt-5 text-[17px] leading-[1.55] text-black/60">
        {description}
      </p>
      {external ? (
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-9 inline-flex w-fit rounded-[10px] bg-[#FF5F15] px-7 py-3.5 text-[15px] font-semibold text-black transition-opacity hover:opacity-90"
        >
          {cta.label}
        </a>
      ) : (
        <Link
          href={cta.href}
          className="mt-9 inline-flex w-fit rounded-[10px] bg-[#FF5F15] px-7 py-3.5 text-[15px] font-semibold text-black transition-opacity hover:opacity-90"
        >
          {cta.label}
        </Link>
      )}
    </div>
  );

  const visual = (
    <div
      className={`relative aspect-4/5 w-full shrink-0 overflow-hidden rounded-[1.75rem] sm:aspect-5/6 lg:aspect-auto lg:h-130 ${
        image ? "bg-zinc-900" : `flex items-center justify-center bg-linear-to-br ${panelClass}`
      }`}
      aria-hidden
    >
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-transparent" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,95,21,0.12),transparent_55%)]" />
          <HugeiconsIcon
            icon={iconData}
            size={120}
            color="#FF5F15"
            strokeWidth={1.25}
            className="relative z-10"
          />
          <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-[#FF5F15]/10 blur-3xl" />
        </>
      )}
    </div>
  );

  const rowDirection =
    visualPosition === "right" ? "lg:flex-row" : "lg:flex-row-reverse";

  return (
    <article
      className={`flex flex-col items-stretch gap-10 lg:items-start lg:gap-14 xl:gap-20 ${rowDirection}`}
    >
      <div className="w-full lg:w-1/2 lg:shrink-0">{content}</div>
      <div className="w-full lg:w-1/2 lg:shrink-0">{visual}</div>
    </article>
  );
}
