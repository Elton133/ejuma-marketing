export const BRAND = {
  orange: "#FF5F15",
  black: "#000000",
  offWhite: "#fafafa",
} as const;

export const WAITLIST_PATH = "/waitlist";
export const INSTALL_PATH = "/install";
export const COMING_SOON_PATH = "/coming-soon";

export const APP_URL = "https://app.beagine.com";
export const INSTALL_URL = `${APP_URL}/install`;
export const INSTALL_CUSTOMER = `${APP_URL}/install?role=customer`;
export const INSTALL_WORKER = `${APP_URL}/install?role=worker`;

export const HERO_IMAGES = [
  "/landing1.png",
  "/landing2.png",
  "/landing3.png",
  "/landing4.png",
  "/landing5.png",
  "/landing6.png",
  "/landing7.png",
  "/landing8.png",
  "/landing9.png",
] as const;

/** Five vertical strip panels shown on desktop hero — one per occupation */
export const HERO_PANELS = [
  {
    trade: "Electrician",
    image: "/landing7.png",
    objectPosition: "center top",
  },
  {
    trade: "Plumber",
    image: "/landing8.png",
    objectPosition: "center 20%",
  },
  {
    trade: "Carpenter",
    image: "/landing9.png",
    objectPosition: "center center",
  },
  {
    trade: "Painter",
    image: "/landing1.png",
    objectPosition: "center top",
  },
  {
    trade: "Mason",
    image: "/landing2.png",
    objectPosition: "center center",
  },
] as const;

export const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
] as const;

export const COMPANY_LINKS = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Careers", href: WAITLIST_PATH },
      { label: "Blog", href: WAITLIST_PATH },
    ],
  },
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

export const HEAR_ABOUT_OPTIONS = [
  "WhatsApp",
  "Friend or family",
  "Facebook",
  "Instagram",
  "Twitter / X",
  "Google search",
  "Flyer or poster",
  "Other",
] as const;

export const PILOT_AREAS = [
  "Dawhenya",
  "Tema",
  "Prampram",
  "Other",
] as const;

export const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Tell us what you need",
    description: "Pick your trade — plumbing, electrical, tiling, and more — then drop a pin for your location.",
  },
  {
    step: "2",
    title: "Pick your specialist",
    description:
      "Compare profiles, portfolio photos, ratings, and distance before you confirm.",
  },
  {
    step: "3",
    title: "They come to you",
    description:
      "Your specialist arrives at the agreed time and handles everything — start to finish.",
  },
  {
    step: "4",
    title: "Pay after the job",
    description:
      "Confirm the work is done, then pay. No upfront fees, no surprises.",
  },
] as const;

/** Alternating split rows — five core customer features */
export const CUSTOMER_FEATURE_ROWS = [
  {
    icon: "findSpecialist" as const,
    eyebrow: "Find in seconds",
    title: "Find a specialist around you instantly",
    description:
      "Search by trade and location — browse verified workers near you on a map or list. See ratings, distance, and availability before you ever tap Book.",
    cta: { label: "Join the waitlist", href: WAITLIST_PATH },
    visualPosition: "right" as const,
    image: "/landing3.png",
    imageAlt: "Specialist worker ready for a job",
  },
  {
    icon: "mapTrack" as const,
    eyebrow: "Live tracking",
    title: "Map view to track your specialist",
    description:
      "See exactly where your specialist is in real time. Follow status from accepted → en route → arrived → in progress → completed — so you're never left wondering.",
    cta: { label: "Open the app", href: APP_URL, external: true },
    visualPosition: "left" as const,
    image: "/landing4.png",
    imageAlt: "Live map tracking a specialist en route",
  },
  {
    icon: "notification" as const,
    eyebrow: "Stay in the loop",
    title: "SMS and email alerts for fast updates",
    description:
      "Get instant SMS and email notifications the moment your booking is confirmed, when your specialist is on the way, and when the job is done.",
    cta: { label: "Join the waitlist", href: WAITLIST_PATH },
    visualPosition: "right" as const,
    panelClass: "from-violet-50 via-[#fafafa] to-[#FF5F15]/8",
  },
  {
    icon: "easyUI" as const,
    eyebrow: "Effortless booking",
    title: "Easy to use interface",
    description:
      "No tech expertise needed. Book a specialist in under two minutes — choose your trade, pick a worker, set a time, and you're done.",
    cta: { label: "Open the app", href: APP_URL, external: true },
    visualPosition: "left" as const,
    panelClass: "from-[#FF5F15]/8 via-amber-50/30 to-[#fafafa]",
  },
  {
    icon: "bio" as const,
    eyebrow: "Know before you book",
    title: "Full specialist profile before you commit",
    description:
      "Every specialist has a full profile — bio, portfolio photos, verified trades, experience level, and customer ratings. Make an informed choice before you confirm.",
    cta: { label: "Join the waitlist", href: WAITLIST_PATH },
    visualPosition: "right" as const,
    panelClass: "from-[#FF5F15]/8 via-amber-50/30 to-[#fafafa]",
  },
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
