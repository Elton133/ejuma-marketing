export type Look = {
  skin: string;
  hair: "short" | "fade" | "bald" | "cap" | "puff";
  beard: boolean;
  glasses: boolean;
  shirt: string;
  headset?: boolean;
};

/**
 * Flat illustrated bust used across the site's animated stories. Drawn rather
 * than photographed so looks don't sway anyone. Parts carry data-* hooks so
 * GSAP can blink, nod and wave them (see ./motion).
 */
export function Character({ look, className }: { look: Look; className?: string }) {
  const hair = "#1A1110";
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g data-char-body>
        <path d="M14 120c2-24 20-36 46-36s44 12 46 36Z" fill={look.shirt} />
        <path d="M48 86l12 14 12-14" fill="none" stroke="rgba(0,0,0,.25)" strokeWidth="3" strokeLinejoin="round" />
        <rect x="51" y="70" width="18" height="18" rx="6" fill={look.skin} />
      </g>
      <g data-char-head style={{ transformOrigin: "60px 80px", transformBox: "view-box" }}>
        {look.hair === "puff" && <circle cx="60" cy="18" r="13" fill={hair} />}
        <ellipse cx="33" cy="54" rx="5" ry="7" fill={look.skin} />
        <ellipse cx="87" cy="54" rx="5" ry="7" fill={look.skin} />
        <ellipse cx="60" cy="50" rx="26" ry="29" fill={look.skin} />
        {look.hair === "short" && <path d="M34 46c0-20 12-28 26-28s26 8 26 28c-6-9-15-12-26-12s-20 3-26 12Z" fill={hair} />}
        {look.hair === "fade" && <path d="M35 42c2-16 12-23 25-23s23 7 25 23c-7-6-15-8-25-8s-18 2-25 8Z" fill={hair} opacity=".9" />}
        {look.hair === "puff" && <path d="M33 48c0-19 12-28 27-28s27 9 27 28c-4-10-14-15-27-15s-23 5-27 15Z" fill={hair} />}
        {look.hair === "bald" && <path d="M44 30c5-4 10-5 16-5" stroke="rgba(255,255,255,.18)" strokeWidth="3" strokeLinecap="round" fill="none" />}
        {look.hair === "cap" && (
          <>
            <path d="M33 42c0-17 12-25 27-25s27 8 27 25Z" fill={look.shirt} />
            <path d="M60 40h34c3 0 3 5 0 5H60Z" fill={look.shirt} />
            <path d="M33 42h54" stroke="rgba(0,0,0,.25)" strokeWidth="2" />
          </>
        )}
        <g data-char-eyes style={{ transformOrigin: "60px 52px", transformBox: "view-box" }}>
          <ellipse cx="50" cy="52" rx="3" ry="3.6" fill="#120B08" />
          <ellipse cx="70" cy="52" rx="3" ry="3.6" fill="#120B08" />
        </g>
        {look.glasses && (
          <g fill="none" stroke="#120B08" strokeWidth="2.2">
            <circle cx="50" cy="52" r="7.5" />
            <circle cx="70" cy="52" r="7.5" />
            <path d="M57.5 52h5" />
          </g>
        )}
        {look.beard ? (
          <path d="M38 58c2 16 10 22 22 22s20-6 22-22c-4 6-10 7-22 7s-18-1-22-7Z" fill={hair} opacity=".92" />
        ) : null}
        <path d="M52 66c4 4 12 4 16 0" fill="none" stroke={look.beard ? "#F4E9E1" : "#120B08"} strokeWidth="2.4" strokeLinecap="round" />
        {look.headset && (
          <g fill="none" stroke="#2A2A2A" strokeWidth="4" strokeLinecap="round">
            <path d="M31 52c0-22 13-33 29-33s29 11 29 33" />
            <rect x="26" y="46" width="9" height="16" rx="4" fill="#2A2A2A" />
            <path d="M31 62c2 9 9 13 17 13" strokeWidth="2.5" />
          </g>
        )}
      </g>
      <g data-char-hand style={{ transformOrigin: "100px 112px", transformBox: "view-box" }} opacity="0">
        <path d="M98 114l6-26" stroke={look.shirt} strokeWidth="10" strokeLinecap="round" />
        <circle cx="105" cy="84" r="7" fill={look.skin} />
      </g>
    </svg>
  );
}

/** Recurring cast so the same faces show up across the site. */
export const CAST = {
  customer: { skin: "#7A4A26", hair: "puff", beard: false, glasses: false, shirt: "#2F6FED" },
  specialist: { skin: "#5A3318", hair: "cap", beard: true, glasses: false, shirt: "#FF5F15" },
  support: { skin: "#8D5524", hair: "short", beard: false, glasses: true, shirt: "#1F9D6B", headset: true },
  vendor: { skin: "#6B3E1F", hair: "fade", beard: false, glasses: true, shirt: "#E0A100" },
} satisfies Record<string, Look>;
