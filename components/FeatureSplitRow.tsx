import { HugeiconsIcon } from "@hugeicons/react";
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
  /** Which side the icon panel sits on desktop */
  visualPosition: "left" | "right";
};

export function FeatureSplitRow({
  eyebrow,
  title,
  description,
  cta,
  icon,
  panelClass = "from-[#FF5F15]/10 to-[#fafafa]",
  visualPosition,
}: FeatureSplitRowProps) {
  const external = cta.external ?? cta.href.startsWith("http");
  const iconData = FEATURE_ICONS[icon];

  const content = (
    <div className="flex flex-col justify-center lg:px-2 lg:py-8">
      <p className="text-[15px] font-medium leading-snug text-black/55">
        {eyebrow}
      </p>
      <h3 className="mt-4 text-[clamp(1.875rem,3.2vw,2.625rem)] font-bold leading-[1.12] tracking-tight text-black">
        {title}
      </h3>
      <p className="mt-5 max-w-[28rem] text-[17px] leading-[1.55] text-black/60">
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
      className={`relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-[1.75rem] bg-gradient-to-br sm:aspect-[5/6] lg:aspect-[4/5] lg:min-h-[440px] ${panelClass}`}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,95,21,0.12),transparent_55%)]" />
      <HugeiconsIcon
        icon={iconData}
        size={120}
        color="#FF5F15"
        strokeWidth={1.25}
        className="relative z-10 lg:!size-[140px]"
      />
      <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-[#FF5F15]/10 blur-3xl" />
    </div>
  );

  const visualCol =
    visualPosition === "left" ? "lg:col-start-1" : "lg:col-start-2";
  const contentCol =
    visualPosition === "left" ? "lg:col-start-2" : "lg:col-start-1";

  return (
    <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
      {/* Icon panel — always first on mobile */}
      <div className={`order-1 ${visualCol}`}>{visual}</div>
      {/* Text — second on mobile */}
      <div className={`order-2 ${contentCol}`}>{content}</div>
    </article>
  );
}
