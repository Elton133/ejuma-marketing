export const BRAND = {
  orange: "#FF5F15",
  black: "#000000",
  offWhite: "#fafafa",
} as const;

export const WAITLIST_PATH = "/waitlist";
export const INSTALL_PATH = "/install";

export const APP_URL = "https://app.beagine.com";
export const INSTALL_URL = `${APP_URL}/install`;
export const INSTALL_CUSTOMER = `${APP_URL}/install?role=customer`;
export const INSTALL_WORKER = `${APP_URL}/install?role=worker`;

export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1777130555776-cd7ce5425804?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1596394723269-b2cbca4e6313?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1742900280861-32bed068938b?q=80&w=1920&auto=format&fit=crop",
] as const;

/** Five vertical strip panels shown on desktop hero — one per occupation */
export const HERO_PANELS = [
  {
    trade: "Electrician",
    image:
      "https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    objectPosition: "center top",
  },
  {
    trade: "Plumber",
    image:
      "https://images.unsplash.com/photo-1596394723269-b2cbca4e6313?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    objectPosition: "center 20%",
  },
  {
    trade: "Carpenter",
    image:
      "https://images.unsplash.com/photo-1611021061285-16c871740efa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FycGVudGVyfGVufDB8fDB8fHww",
    objectPosition: "center center",
  },
  {
    trade: "Painter",
    image:
      "https://images.unsplash.com/photo-1742900280861-32bed068938b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBhaW50ZXIlMjBhZnJpY2FufGVufDB8fDB8fHww",
    objectPosition: "center top",
  },
  {
    trade: "Mason",
    image:
      "https://images.unsplash.com/photo-1747214300307-541c83c7a5bd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    objectPosition: "center center",
  },
] as const;

export const NAV_LINKS = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Features", href: "/features" },
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
    image:
      "https://images.unsplash.com/photo-1679134015859-6281e4382065?q=80&w=1200&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1587937533522-b2294fd611f5?q=80&w=1200&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Specialist profile card with bio and ratings",
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
