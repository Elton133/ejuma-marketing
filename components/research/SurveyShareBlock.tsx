"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function SurveyShareBlock({
  sharePath,
  title = "Share with others",
  description = "Know someone who should join? Send them the link or QR code.",
}: {
  sharePath: string;
  title?: string;
  description?: string;
}) {
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setShareUrl(`${window.location.origin}${sharePath}`);
  }, [sharePath]);

  const qrSrc =
    shareUrl &&
    `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(shareUrl)}&bgcolor=ffffff&color=000000`;

  const copyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* fallback ignored */
    }
  };

  return (
    <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-left md:p-8">
      <p className="text-sm font-medium text-white/80">{title}</p>
      <p className="mt-1 text-sm text-white/55">{description}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <input
          readOnly
          value={shareUrl}
          className="min-w-0 flex-1 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/90 outline-none"
          aria-label="Share link"
        />
        <button
          type="button"
          onClick={copyLink}
          className="shrink-0 rounded-full bg-[#FF5F15] px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
        >
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>

      {qrSrc && (
        <div className="mt-8 flex flex-col items-center border-t border-white/10 pt-8 sm:items-start">
          <Image
            src={qrSrc}
            alt="QR code to join waitlist"
            width={180}
            height={180}
            className="rounded-xl bg-white p-2"
            unoptimized
          />
          <p className="mt-3 text-sm text-white/55">Scan to join the waitlist</p>
        </div>
      )}
    </div>
  );
}
