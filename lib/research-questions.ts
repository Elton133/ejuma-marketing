export const RESEARCH_PATH = "/research";
export const WAITLIST_PATH = "/waitlist";

export type ResearchRole = "user" | "specialist";

export type ResearchQuestion = {
  id: string;
  label: string;
  type: "text" | "textarea" | "select";
  options?: readonly string[];
  allowOther?: boolean;
  placeholder?: string;
};

export const AGE_RANGE_OPTIONS = [
  "Under 18",
  "18-24",
  "25-34",
  "35-44",
  "45-54",
  "55-64",
  "65+",
] as const;

const AGE_RANGE_QUESTION: ResearchQuestion = {
  id: "age_range",
  label: "What is your age range?",
  type: "select",
  options: AGE_RANGE_OPTIONS,
};

export const USER_RESEARCH_QUESTIONS: ResearchQuestion[] = [
  AGE_RANGE_QUESTION,
  {
    id: "hired_professional",
    label: "Have you ever hired an engineering or technical professional?",
    type: "select",
    options: ["Yes", "No"],
  },
  {
    id: "service_required",
    label: "What type of service did you require?",
    type: "select",
    options: [
      "Plumbing",
      "Electrical",
      "Construction / masonry",
      "Carpentry",
      "Welding / fabrication",
      "Appliance repair",
      "Automotive / mechanical",
      "Air conditioning / refrigeration",
    ],
    allowOther: true,
  },
  {
    id: "service_frequency",
    label: "How often do you require these services?",
    type: "select",
    options: [
      "More than once a month",
      "Every 1–3 months",
      "Every 4–6 months",
      "Once or twice a year",
      "Less than once a year",
      "Only in emergencies",
    ],
  },
  {
    id: "how_find_technicians",
    label: "How do you currently find technicians?",
    type: "select",
    options: [
      "Friends or family referrals",
      "WhatsApp groups",
      "Facebook / Instagram",
      "Google or online search",
      "A technician I already know",
      "Nearby shops or local area",
      "An online service platform",
    ],
    allowOther: true,
  },
  {
    id: "ease_finding_qualified",
    label: "How easy is it to find qualified technicians?",
    type: "select",
    options: ["Very easy", "Easy", "Neither easy nor difficult", "Difficult", "Very difficult"],
  },
  {
    id: "hiring_challenges",
    label: "What challenges do you face when hiring technicians?",
    type: "textarea",
    placeholder: "Tell us about trust, pricing, availability, quality, communication, or anything else.",
  },
  {
    id: "service_dissatisfaction",
    label: "Have you ever been dissatisfied with a technician's service?",
    type: "select",
    options: ["Yes", "No", "Not sure"],
  },
  {
    id: "would_use_verified_platform",
    label: "Would you use a platform that connects you with verified technicians?",
    type: "select",
    options: ["Yes, definitely", "Probably", "Not sure", "Probably not", "No"],
  },
  {
    id: "recommend_likelihood",
    label: "How likely are you to recommend such a platform to others?",
    type: "select",
    options: [
      "10 — Extremely likely",
      "9",
      "8",
      "7",
      "6",
      "5 — Neutral",
      "4",
      "3",
      "2",
      "1",
      "0 — Not at all likely",
    ],
  },
  {
    id: "platform_barriers",
    label: "What would prevent you from using such a platform?",
    type: "textarea",
    placeholder: "Tell us about any concerns, costs, trust issues, or other barriers.",
  },
];

export const SPECIALIST_RESEARCH_QUESTIONS: ResearchQuestion[] = [
  AGE_RANGE_QUESTION,
  {
    id: "engineering_services",
    label: "What engineering services do you provide?",
    type: "textarea",
    placeholder: "List your main trades, specialties, or technical services.",
  },
  {
    id: "practice_duration",
    label: "How long have you been practicing?",
    type: "select",
    options: ["Less than 1 year", "1–2 years", "3–5 years", "6–10 years", "More than 10 years"],
  },
  {
    id: "how_find_clients",
    label: "How do you currently find clients?",
    type: "select",
    options: [
      "Word of mouth / referrals",
      "WhatsApp",
      "Facebook / Instagram",
      "Google or online listings",
      "Walk-in / local customers",
      "Contractors or companies",
      "Online service platforms",
    ],
    allowOther: true,
  },
  {
    id: "monthly_clients",
    label: "Approximately how many clients do you get each month?",
    type: "select",
    options: ["0–2", "3–5", "6–10", "11–20", "More than 20", "It varies significantly"],
  },
  {
    id: "client_acquisition_challenge",
    label: "What is your biggest challenge in getting clients?",
    type: "textarea",
    placeholder: "Describe the main obstacle affecting your ability to find work.",
  },
  {
    id: "would_register",
    label: "Would you register on an online platform that connects you with customers?",
    type: "select",
    options: ["Yes, definitely", "Probably", "Not sure", "Probably not", "No"],
  },
  {
    id: "joining_benefits",
    label: "What benefits would encourage you to join?",
    type: "textarea",
    placeholder: "For example: more clients, secure payments, visibility, training, or business tools.",
  },
  {
    id: "joining_concerns",
    label: "What concerns would stop you from joining?",
    type: "textarea",
    placeholder: "Tell us about commissions, trust, payments, verification, or other concerns.",
  },
  {
    id: "helpful_platform_features",
    label: "What platform features would help your business?",
    type: "textarea",
    placeholder: "Describe the tools or features that would be most valuable to you.",
  },
];

export function getResearchQuestions(role: ResearchRole) {
  return role === "user" ? USER_RESEARCH_QUESTIONS : SPECIALIST_RESEARCH_QUESTIONS;
}

export function getResearchTitle(role: ResearchRole) {
  return role === "user" ? "Customer market research" : "Engineer market research";
}
