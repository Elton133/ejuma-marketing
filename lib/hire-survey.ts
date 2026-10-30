/**
 * "Who would you hire?" — the Chief Research Officer's customer-choice survey.
 *
 * Two situations, three made-up specialists each. Answers are saved to their
 * own Supabase table, public.hire_survey_responses (see supabase/migrations),
 * separate from the waitlist and questionnaire.
 */

import type { Look } from "@/components/story/Character";

export const HIRE_SURVEY_PATH = "/survey";
export const HIRE_SURVEY_TABLE = "hire_survey_responses";
/** Bump whenever a profile below changes (price, rating, name), so old and new answers can be told apart. */
export const PROFILES_VERSION = "v1";

/** Shuffle card order per person so nobody picks "the first one" by habit. Order shown is saved with the answers. */
export const SHUFFLE_ORDER = true;

export type { Look };

export type Pro = {
  id: "A" | "B" | "C";
  name: string;
  title: string;
  price: number;
  years: number;
  skills: string;
  certified: boolean;
  rating: number | null;
  reviews: number;
  look: Look;
};

export type Scenario = {
  key: string;
  /** Prefix on every saved answer, e.g. "AC: who they'd hire". */
  label: string;
  trade: string;
  icon: "ac" | "socket";
  story: string[];
  pros: Pro[];
};

export const SCENARIOS: Scenario[] = [
  {
    key: "ac",
    label: "AC",
    trade: "AC technician",
    icon: "ac",
    story: [
      "Your air conditioner is running…",
      "but it's no longer cooling your room.",
      "You want someone to inspect it, find the problem and fix it.",
    ],
    pros: [
      {
        id: "A",
        name: "Daniel Mensah",
        title: "AC Technician",
        price: 150,
        years: 2,
        skills: "AC servicing and basic repairs",
        certified: false,
        rating: null,
        reviews: 0,
        look: { skin: "#8D5524", hair: "fade", beard: false, glasses: false, shirt: "#2F6FED" },
      },
      {
        id: "B",
        name: "Michael Owusu",
        title: "AC Technician",
        price: 250,
        years: 6,
        skills: "AC diagnosis, servicing and repairs",
        certified: false,
        rating: 4.5,
        reviews: 28,
        look: { skin: "#6B3E1F", hair: "short", beard: true, glasses: false, shirt: "#1F9D6B" },
      },
      {
        id: "C",
        name: "Samuel Boateng",
        title: "AC Technician",
        price: 350,
        years: 10,
        skills: "Certified HVAC technician specialising in AC repairs",
        certified: true,
        rating: 4.9,
        reviews: 65,
        look: { skin: "#4A2A14", hair: "bald", beard: true, glasses: true, shirt: "#FF5F15" },
      },
    ],
  },
  {
    key: "electrician",
    label: "Electrician",
    trade: "electrician",
    icon: "socket",
    story: [
      "Some sockets in your house have stopped working.",
      "You need an electrician to find the fault",
      "and carry out the repairs.",
    ],
    pros: [
      {
        id: "A",
        name: "Joseph Addo",
        title: "Electrician",
        price: 120,
        years: 3,
        skills: "Domestic electrical installations and minor repairs",
        certified: false,
        rating: 4.2,
        reviews: 12,
        look: { skin: "#7A4A26", hair: "cap", beard: false, glasses: false, shirt: "#E0A100" },
      },
      {
        id: "B",
        // The survey doc leaves Electrician B unnamed; placeholder until research confirms one.
        name: "Kwabena Asare",
        title: "Electrician",
        price: 200,
        years: 7,
        skills: "Certified electrician specialising in fault detection and repairs",
        certified: true,
        rating: 4.8,
        reviews: 42,
        look: { skin: "#5A3318", hair: "short", beard: false, glasses: true, shirt: "#7B5CFA" },
      },
      {
        id: "C",
        name: "Richard Ofori",
        title: "Electrician",
        price: 160,
        years: 5,
        skills: "Residential wiring, socket repairs and maintenance",
        certified: false,
        rating: null,
        reviews: 0,
        look: { skin: "#9A6033", hair: "fade", beard: true, glasses: false, shirt: "#E2445C" },
      },
    ],
  },
];

export const ATTRACTED_OPTIONS = [
  "The price",
  "Years of experience",
  "Their rating",
  "Number of reviews",
  "Certified / qualified",
  "What they specialise in",
] as const;

export const PUT_OFF_OPTIONS = [
  "Too expensive",
  "Too little experience",
  "No rating or reviews",
  "Rating not high enough",
  "Too few reviews",
  "Too much for this job",
  "Nothing — it was close",
] as const;

export const MISSING_OPTIONS = [
  "A photo of them",
  "Photos of past work",
  "ID / background checked",
  "Written reviews",
  "Cost of parts",
  "How soon they can come",
  "Where they're based",
  "Guarantee on the work",
  "Nothing, this is enough",
] as const;

export const COMFORT_OPTIONS = ["Yes", "Not sure", "No"] as const;
