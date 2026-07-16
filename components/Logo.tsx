"use client";

import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  className?: string;
  withBeaver?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
};

export function Logo({
  className = "",
  size = "md",
}: LogoProps) {
  // Map sizes
  const sizes = {
    sm: { beaver: 28, text: "text-lg" },
    md: { beaver: 32, text: "text-xl" },
    lg: { beaver: 40, text: "text-2xl" },
    xl: { beaver: 56, text: "text-[2.5rem]" },
  };

  const currentSize = sizes[size];

  return (
    <Link href="/" className={`group flex items-center gap-2 ${className}`}>
      <span className={`${currentSize.text} font-normal tracking-tight text-white`}>
        beag<span className="relative inline-block text-white">
          ine
          <svg
            className="absolute left-[8%] top-[75%] h-[12px] w-[92%] overflow-visible text-[#FF5F15]"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 0 10 Q 25 10 50 10 T 100 10"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="logo-underline-path"
            />
          </svg>
        </span>
      </span>
    </Link>
  );
}
