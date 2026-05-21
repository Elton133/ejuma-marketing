export const RESEARCH_PATH = "/research";
export const WAITLIST_PATH = "/waitlist";

export type ResearchRole = "user" | "specialist";

export type ResearchQuestion = {
  id: string;
  label: string;
  type: "text" | "textarea" | "select";
  options?: readonly string[];
  placeholder?: string;
};

export const USER_RESEARCH_QUESTIONS: ResearchQuestion[] = [
  {
    id: "last_need",
    label: "When did you last need a technician, and what was the issue?",
    type: "textarea",
    placeholder: "e.g. Last month — leaking pipe under the kitchen sink",
  },
  {
    id: "how_found",
    label: "How did you find the person who fixed it?",
    type: "textarea",
    placeholder: "Word of mouth, social media, walked around…",
  },
  {
    id: "frustrating",
    label: "What was the most frustrating part of the process?",
    type: "textarea",
  },
  {
    id: "time_to_solve",
    label: "How long did it take to get the problem solved?",
    type: "select",
    options: [
      "Same day",
      "1–2 days",
      "3–7 days",
      "More than a week",
      "Still not fully solved",
    ],
  },
  {
    id: "bad_experience",
    label: "Have you ever had a bad experience with a technician? What happened?",
    type: "textarea",
    placeholder: "Share what went wrong, or write “No” if not applicable",
  },
  {
    id: "would_use_app",
    label:
      "If we offer a solution, a platform to get technicians would you use it? Why or why not?",
    type: "textarea",
  },
  {
    id: "trust",
    label: "What would make you trust a technician on an app?",
    type: "textarea",
  },
  {
    id: "pricing_preference",
    label: "Do you prefer fixed pricing or negotiating prices?",
    type: "select",
    options: ["Fixed pricing", "Negotiating prices", "Either is fine", "Not sure"],
  },
  {
    id: "small_fee",
    label: "Would you pay a small fee for faster, verified service?",
    type: "select",
    options: ["Yes", "Maybe", "No"],
  },
  {
    id: "download_avoid",
    label: "What would make you download or completely avoid this app?",
    type: "textarea",
  },
];

export const SPECIALIST_RESEARCH_QUESTIONS: ResearchQuestion[] = [
  {
    id: "find_customers",
    label: "How do you currently find customers or jobs?",
    type: "textarea",
  },
  {
    id: "hardest_part",
    label: "What is the hardest part about getting consistent work?",
    type: "textarea",
  },
  {
    id: "platform_before",
    label:
      "Have you ever used a platform or social media to get clients? How was it?",
    type: "textarea",
  },
  {
    id: "would_join",
    label: "Would you join an app that sends you customers? Why or why not?",
    type: "textarea",
  },
  {
    id: "concerns",
    label: "What concerns would you have about joining such a platform?",
    type: "textarea",
  },
  {
    id: "trust_stay",
    label: "What would make you trust and stay on the platform?",
    type: "textarea",
  },
  {
    id: "pricing",
    label: "Do you prefer setting your own prices or fixed pricing?",
    type: "select",
    options: [
      "Set my own prices",
      "Fixed pricing",
      "Either is fine",
      "Not sure",
    ],
  },
  {
    id: "fair_fee",
    label: "What commission or fee would you consider fair? Give a range.",
    type: "text",
    placeholder: "e.g. 5–10% per job",
  },
  {
    id: "tools_support",
    label: "What tools or support would help you do your job better?",
    type: "textarea",
  },
  {
    id: "would_leave",
    label: "What would make you stop using the platform completely?",
    type: "textarea",
  },
];

export function getResearchQuestions(role: ResearchRole) {
  return role === "user" ? USER_RESEARCH_QUESTIONS : SPECIALIST_RESEARCH_QUESTIONS;
}

export function getResearchTitle(role: ResearchRole) {
  return role === "user" ? "Customer research" : "Specialist research";
}
