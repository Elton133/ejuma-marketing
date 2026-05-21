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

export const USER_RESEARCH_QUESTIONS: ResearchQuestion[] = [
  {
    id: "last_need",
    label: "When did you last need a technician?",
    type: "select",
    options: [
      "Within the last 7 days",
      "1–4 weeks ago",
      "1–3 months ago",
      "More than 3 months ago",
      "Can’t remember",
    ],
  },

  {
    id: "issue_type",
    label: "What type of problem was it?",
    type: "select",
    options: [
      "Plumbing",
      "Electrical",
      "Appliance repair",
      "Car / mechanic issue",
      "Construction / carpentry",
      "Other",
    ],
    allowOther: true,
  },

  {
    id: "how_found",
    label: "How did you find the technician?",
    type: "select",
    options: [
      "Word of mouth (friends/family)",
      "WhatsApp groups",
      "Facebook / Instagram",
      "Walked around nearby",
      "Already known person",
      "Online platform",
    ],
    allowOther: true,
  },

  {
    id: "time_to_solve",
    label: "How long did it take to fix the issue?",
    type: "select",
    options: [
      "Same day",
      "1–2 days",
      "3–5 days",
      "More than a week",
      "Still not solved",
    ],
  },

  {
    id: "frustration",
    label: "What was the biggest challenge?",
    type: "select",
    options: [
      "Finding a trusted technician",
      "High or unclear pricing",
      "Long waiting time",
      "Poor quality work",
      "No challenges (smooth experience)",
    ],
    allowOther: true,
  },

  {
    id: "bad_experience",
    label: "Have you had a bad experience before?",
    type: "select",
    options: [
      "Yes — poor quality work",
      "Yes — overcharged",
      "Yes — no-show / delay",
      "Yes — other issue",
      "No",
    ],
  },

  {
    id: "would_use_app",
    label: "Would you use a platform to find trusted technicians?",
    type: "select",
    options: [
      "Yes, definitely",
      "Maybe, depends on trust",
      "Not sure",
      "No",
    ],
  },

  {
    id: "trust_factor",
    label: "What would make you trust the platform?",
    type: "select",
    options: [
      "Verified technicians",
      "Customer reviews",
      "Fixed transparent pricing",
      "Fast response time",
      "Payment protection",
      "All of the above",
    ],
  },

  {
    id: "pricing_preference",
    label: "How should pricing work?",
    type: "select",
    options: [
      "Fixed prices only",
      "Negotiation allowed",
      "Depends on job type",
    ],
  },

  {
    id: "paid_priority",
    label: "Would you pay extra for faster verified service?",
    type: "select",
    options: ["Yes", "Maybe", "No"],
  },

  {
    id: "avoid_reason",
    label: "What would stop you from using such an app?",
    type: "select",
    options: [
      "Don’t trust online platforms",
      "Prefer personal contacts",
      "Too expensive",
      "Slow service",
      "No need for such an app",
    ],
    allowOther: true,
  },
];

export const SPECIALIST_RESEARCH_QUESTIONS: ResearchQuestion[] = [
  {
    id: "find_customers",
    label: "How do you currently get jobs?",
    type: "select",
    options: [
      "Word of mouth",
      "WhatsApp referrals",
      "Facebook / Instagram",
      "Walk-in / local customers",
      "I struggle to find jobs",
    ],
  },

  {
    id: "job_consistency",
    label: "How consistent is your work?",
    type: "select",
    options: [
      "Very consistent (daily jobs)",
      "Moderate (few jobs weekly)",
      "Low (occasional jobs)",
      "Very inconsistent",
    ],
  },

  {
    id: "hardest_part",
    label: "Biggest challenge in your work?",
    type: "select",
    options: [
      "Finding customers",
      "Low payment",
      "Customers not paying",
      "Irregular jobs",
      "Transport/logistics",
    ],
    allowOther: true,
  },

  {
    id: "platform_use",
    label: "Have you used platforms/social media for clients?",
    type: "select",
    options: [
      "Yes — successfully",
      "Yes — but not effective",
      "Tried but stopped",
      "No",
    ],
  },

  {
    id: "would_join",
    label: "Would you join an app that sends you jobs?",
    type: "select",
    options: ["Yes", "Maybe", "No"],
  },

  {
    id: "trust_requirements",
    label: "What would make you trust the platform?",
    type: "select",
    options: [
      "Guaranteed payments",
      "Verified customers",
      "Fair commission",
      "Steady job flow",
      "Platform support",
      "All of the above",
    ],
  },

  {
    id: "pricing_model",
    label: "Preferred pricing model?",
    type: "select",
    options: [
      "I set my own prices",
      "Platform sets prices",
      "Both depending on job",
    ],
  },

  {
    id: "commission_fair",
    label: "What commission range feels fair?",
    type: "select",
    options: [
      "0–5%",
      "5–10%",
      "10–15%",
      "15%+",
    ],
  },

  {
    id: "tools_help",
    label: "What would help you work better?",
    type: "select",
    options: [
      "More job opportunities",
      "Faster payments",
      "Customer verification",
      "Training/support",
      "Navigation / maps",
      "All of the above",
    ],
  },

  {
    id: "leave_reason",
    label: "What would make you leave the platform?",
    type: "select",
    options: [
      "No jobs",
      "Delayed payments",
      "High commission",
      "Bad customers",
      "Poor support",
    ],
    allowOther: true,
  },
];

export function getResearchQuestions(role: ResearchRole) {
  return role === "user" ? USER_RESEARCH_QUESTIONS : SPECIALIST_RESEARCH_QUESTIONS;
}

export function getResearchTitle(role: ResearchRole) {
  return role === "user" ? "Customer research" : "Specialist research";
}
