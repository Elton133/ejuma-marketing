export const BRAND = {
  orange: "#FF5F15",
  black: "#000000",
  offWhite: "#fafafa",
} as const;

export const WAITLIST_PATH = "/waitlist";

export const APP_URL = "https://3juma.app";
export const INSTALL_URL = `${APP_URL}/install`;
export const INSTALL_CUSTOMER = `${APP_URL}/install?role=customer`;
export const INSTALL_WORKER = `${APP_URL}/install?role=worker`;

export const NAV_LINKS = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "For workers", href: "/#for-workers" },
  { label: "Install app", href: "/#install" },
] as const;

export const TRADES = [
  "Plumber",
  "Electrician",
  "Mason",
  "Carpenter",
  "Welder",
  "Painter",
  "Tiler",
  "AC Technician",
  "Roofer",
  "Auto Mechanic",
] as const;

export const PILOT_AREAS = [
  "Dawhenya",
  "Tema",
  "Prampram",
  "Other",
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose technical area",
    description: "Tell us what you need and where — Tema, Dawhenya, Prampram and nearby.",
  },
  {
    step: "02",
    title: "Pick a verified worker",
    description:
      "Compare skills, portfolio photos, rates, and distance on the map or list.",
  },
  {
    step: "03",
    title: "Work gets done",
    description:
      "The worker will come to your location and fix the problem.",
  },
  {
    step: "04",
    title: "Pay for service",
    description:
      "Pay for the service after it is done.",
  },
] as const;

/** Bolt-style alternating split rows — visual alternates left / right */
export const CUSTOMER_FEATURE_ROWS = [
  {
    icon: "verified" as const,
    eyebrow: "Hire with trust",
    title: "Find verified specialists with experience",
    description:
      "Every specialist is verified and has experience in the area you need help with. We take time to get to know every specialist",
    cta: { label: "Join the waitlist", href: WAITLIST_PATH },
    visualPosition: "right" as const,
    panelClass: "from-[#FF5F15]/15 via-orange-50 to-[#fafafa]",
  },
  {
    icon: "search" as const,
    eyebrow: "Find someone nearby",
    title: "Search by trade and location",
    description:
      "Pick your trade and area, then browse verified workers on a map or list with distance hints. Worker cards show Book only — no cold calls until the job is done.",
    cta: { label: "Open the app", href: APP_URL, external: true },
    visualPosition: "left" as const,
    panelClass: "from-sky-50 via-[#fafafa] to-[#FF5F15]/10",
  },
  {
    icon: "tracking" as const,
    eyebrow: "Know when they're on the way",
    title: "Track every step of the job",
    description:
      "Follow live status updates — accepted, en route, arrived, in progress, and completed. Attach up to four scope photos when you book so your specialist knows what to expect.",
    cta: { label: "Install the app", href: "#install" },
    visualPosition: "right" as const,
    panelClass: "from-zinc-100 via-[#fafafa] to-[#FF5F15]/15",
  },
  // {
  //   icon: "deposit" as const,
  //   eyebrow: "Book with confidence",
  //   title: "Secure your slot with a small deposit",
  //   description:
  //     "Pay a small GHS booking deposit via Paystack to hold your slot. Labour price is agreed with the worker separately — and your first booking may be free during launch.",
  //   cta: { label: "Join the waitlist", href: "#waitlist" },
  //   visualPosition: "left" as const,
  //   panelClass: "from-amber-50 via-[#fafafa] to-stone-100",
  // },
] as const;

export const WORKER_FEATURES = [
  {
    title: "Get more jobs",
    description:
      "Get discovered by customers searching your trade and service areas.",
  },
  {
    title: "Work in new areas",
    description:
      "List several trades and towns — work across the corridor on your terms.",
  },
  {
    title: "Build your profile",
    description:
      "Portfolio, certificates, bio, and rates — build trust before the first booking.",
  },
  {
    title: "Earn with Beagine",
    description:
      "Request payouts from your dashboard — usually same day, within 24 hours.",
  },
] as const;
