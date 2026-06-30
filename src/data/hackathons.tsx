// ─── HACKATHONS ───────────────────────────────────────────────────────────────
// Add new hackathons at the TOP of the array (most recent first).
//
// Fields:
//   title       → hackathon name
//   dates       → e.g. "June 2026" or "2025"
//   location    → venue or "Online"
//   description → what you built / achieved
//   image       → logo/banner from /public (leave "" if none)
//   win         → optional award label, e.g. "3rd Place Winner"
//   links       → optional action buttons
//
// To add a hackathon:
//   Copy an existing entry below, fill in your details, and paste at the top.
// ─────────────────────────────────────────────────────────────────────────────

import { Icons } from "@/components/icons";

export const HACKATHONS = [
  {
    title: "Coral AI Agent Hackathon",
    dates: "June 2026",
    location: "Online (Solo)",
    description:
      "Engineered an AI-driven DevOps automation agent as a solo participant.",
    image: "",
    links: [
      {
        title: "GitHub",
        icon: <Icons.github className="h-4 w-4" />,
        href: "https://github.com/dhupthumbadiya2005",
      },
    ],
  },
  {
    title: "Breach 2025 — Fintech Hackathon",
    dates: "2025",
    location: "Gujarat, India",
    description:
      "Secured 3rd Place at Gujarat's largest fintech hackathon with CrediSphere, an AI-powered multi-bureau credit risk platform.",
    image: "",
    win: "3rd Place Winner",
    links: [],
  },
  {
    title: "VidhyutAI — IIT Gandhinagar",
    dates: "2025",
    location: "IIT Gandhinagar, India",
    description:
      "Selected as a Top 10 Finalist team out of hundreds of submissions.",
    image: "",
    win: "Top 10 Finalist",
    links: [],
  },
  {
    title: "Hackout'2025 — DAIICT",
    dates: "2025",
    location: "DAIICT, Gandhinagar, India",
    description:
      "Qualified for the final round of Hackout'2025 hosted at DA-IICT.",
    image: "",
    links: [],
  },
  {
    title: "Smart India Hackathon (SIH)",
    dates: "2024",
    location: "PDEU, Gandhinagar, India",
    description:
      "Ranked among the top 25 university teams at the internal Smart India Hackathon round at PDEU.",
    image: "",
    links: [],
  },
] as const;
