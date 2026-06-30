// ─── PROJECTS ────────────────────────────────────────────────────────────────
// Add new projects at the TOP of the array (most recent first).
//
// Fields:
//   title        → project name
//   href         → main link (live site or repo)
//   dates        → e.g. "2025"
//   active       → true to show, false to hide
//   description  → shown in the card (expandable)
//   technologies → tech stack badges
//   links        → action buttons on the card thumbnail
//   image        → thumbnail from /public (e.g. "/myproject.png")
//   video        → video url (overrides image if set)
//
// To add a project:
//   1. Drop the thumbnail image in /public
//   2. Copy an existing entry below and fill in your details
// ─────────────────────────────────────────────────────────────────────────────

import { Icons } from "@/components/icons";

export const PROJECTS = [
  {
    title: "EZReview.in",
    href: "https://ezreview.in",
    dates: "2024",
    active: true,
    description:
      "Multi-tenant SaaS where businesses get a QR code; customers scan it, answer an AI-generated survey built from that store's past reviews, and receive a ready-to-post Google review in 4 styles including Hinglish. Ships with Google OAuth, subscription billing (3 plans), admin panel, usage analytics, invoice downloads, and QR print card generation. Streamed OpenAI responses via Vercel Edge Runtime, cutting wait time from 6s to under 2s.",
    technologies: [
      "Next.js 14",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "OpenAI GPT-4o-mini",
      "Razorpay",
      "NextAuth.js",
      "Resend",
      "Vercel Edge",
    ],
    links: [
      {
        type: "Website",
        href: "https://ezreview.in",
        icon: <Icons.globe className="size-3" />,
      },
    ],
    image: "/ezreview.png",
    video: "",
  },
  {
    title: "CrediSphere",
    href: "https://github.com/AniT20EXPERT/Credisphere/tree/main",
    dates: "2025",
    active: true,
    description:
      "Unified AI-powered credit risk platform that aggregates data from multiple bureaus into a single risk score using XGBoost. Built fault-tolerant logic so the system stays functional when a bureau API goes down, and added a chatbot for PDF-based financial Q&A. Won 3rd Place at Breach 2025, Gujarat's largest fintech hackathon.",
    technologies: [
      "React",
      "Node.js",
      "Flask",
      "Supabase",
      "XGBoost",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/AniT20EXPERT/Credisphere/tree/main",
        icon: <Icons.github className="size-3" />,
      },
      {
        type: "Full Report",
        href: "https://github.com/AniT20EXPERT/Credisphere/blob/main/CrediSphere_report.pdf",
        icon: <Icons.globe className="size-3" />,
      },
    ],
    image: "/credisphear.png",
    video: "",
  },
  {
    title: "HydroGenMaps",
    href: "https://github.com/dhupthumbadiya2005/HydroGenMaps",
    dates: "2024",
    active: true,
    description:
      "Interactive GIS platform to visualize hydrogen infrastructure (plants, pipelines, storage) with region-based analysis. Implemented AI-driven site scoring across 20+ factors (cost, demand, water, regulations, climate) using XGBoost and Mistral-7B via Groq. Includes a dashboard with AI report comparison and a chatbot for querying infrastructure and environmental reports.",
    technologies: [
      "React",
      "D3.js",
      "Mapbox",
      "FastAPI",
      "PostgreSQL",
      "XGBoost",
      "Groq",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/dhupthumbadiya2005/HydroGenMaps",
        icon: <Icons.github className="size-3" />,
      },
      {
        type: "Demo",
        href: "https://www.youtube.com/watch?v=cVxb_ya0sCs",
        icon: <Icons.youtube className="size-3" />,
      },
    ],
    image: "/hydrogen-maps.png",
    video: "",
  },
  {
    title: "DevGhost",
    href: "https://github.com/dhupthumbadiya2005/devghost",
    dates: "2024",
    active: true,
    description:
      "Cross-platform CLI tool that generates AI-powered Git commit messages by analyzing staged diffs. Uses context-aware diff parsing and Gemini AI prompt engineering to produce accurate, meaningful summaries. Published on PyPI — pip install devghost — with secure API key storage for a seamless developer workflow.",
    technologies: [
      "Python",
      "Gemini AI",
      "PyPI",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/dhupthumbadiya2005/devghost",
        icon: <Icons.github className="size-3" />,
      },
      {
        type: "Article",
        href: "https://medium.com/@dhupthumbadiya2005/devghost-let-ai-write-your-git-commit-messages-intelligently-using-gemini-ai-6e6cd002e835",
        icon: <Icons.globe className="size-3" />,
      },
    ],
    image: "/devghost.png",
    video: "",
  },
  {
    title: "Subscription Tracker API",
    href: "https://github.com/dhupthumbadiya2005/subscription-tracker-api",
    dates: "2024",
    active: true,
    description:
      "Secure RESTful API for subscription management with full CRUD, JWT auth, bcrypt password hashing, and Arcjet rate limiting. Automated renewal reminder emails via Upstash workflows and Nodemailer to improve user retention.",
    technologies: [
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Arcjet",
      "Upstash",
      "Nodemailer",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/dhupthumbadiya2005/subscription-tracker-api",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/subscription-tracker-api.png",
    video: "",
  },
  {
    title: "Smart EMS — VidyutAI",
    href: "https://github.com/ChikkiPikki/VidyutAI_team_Fusion",
    dates: "2025",
    active: true,
    description:
      "Intelligent Energy Management System for optimizing generation, storage, and consumption across renewable microgrids. Ingests real-time data from 1000+ IoT sensors via MQTT into InfluxDB, runs a Reinforcement Learning agent for dynamic energy dispatch, and surfaces live dashboards via Grafana. Includes a diagnostics engine for fault detection and predictive maintenance. Selected as a Top 10 Finalist at VidhyutAI, IIT Gandhinagar.",
    technologies: [
      "Python",
      "Reinforcement Learning",
      "MQTT",
      "InfluxDB",
      "Grafana",
      "Scikit-learn",
      "Pandas",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/ChikkiPikki/VidyutAI_team_Fusion",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/vidhyut_ai.png",
    video: "",
  },
] as const;
