// ─── PROJECTS ────────────────────────────────────────────────────────────────
// Add new projects at the TOP of the array (most recent first).
//
// Fields:
//   title        → project name
//   href         → main link (live site or repo)
//   dates        → e.g. "2025"
//   active       → true to show, false to hide
//   description  → one-line tagline shown under the title
//   status       → optional pill (award, paper, etc.)
//   highlights   → bullet points shown in the card
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
    title: "Manimation",
    href: "https://github.com/dhupthumbadiya2005/Manimation",
    dates: "2026",
    active: true,
    description:
      "Type one prompt, get a narrated 3Blue1Brown-style math video — built by a team of Claude agents.",
    status: "Journal paper in progress",
    highlights: [
      "Director agent plans an editable storyboard; Coder agent writes one Manim scene per section, so one bug never breaks the whole video.",
      "Deterministic quality control for free: AST validation, a quadratic-program layout solver for overlaps, and SymPy math verification.",
      "Fixer agent repairs failures with small code edits — repeated fixes are learned as validator rules.",
      "Single-session Deepgram narration with word-level alignment, so animations start on their cue words.",
      "Hard cost budget with per-call tracking and checkpoint resume — most videos cost under $0.15.",
    ],
    technologies: [
      "Python",
      "Claude Agents",
      "Manim",
      "FastAPI",
      "React",
      "SymPy",
      "Deepgram",
      "ffmpeg",
      "Docker",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/dhupthumbadiya2005/Manimation",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/manimation.png",
    video: "",
  },
  {
    title: "EZReview.in",
    href: "https://ezreview.in",
    dates: "2024",
    active: true,
    description:
      "Multi-tenant SaaS that turns a QR scan into a ready-to-post Google review.",
    highlights: [
      "Customers scan a store's QR code and answer an AI-generated survey built from that store's past reviews.",
      "Generates reviews in 4 styles including Hinglish; streamed OpenAI responses via Vercel Edge cut wait time from 6s to under 2s.",
      "Google OAuth, subscription billing (3 plans), admin panel, usage analytics, invoices and QR print cards.",
    ],
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
      "Unified AI credit-risk platform combining multiple credit bureaus into one score.",
    status: "3rd Place · Breach 2025",
    highlights: [
      "Aggregates data from multiple bureaus into a single risk score using XGBoost.",
      "Fault-tolerant design keeps the system working when a bureau API goes down.",
      "Chatbot for PDF-based financial Q&A.",
    ],
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
      "Interactive GIS platform for planning hydrogen infrastructure.",
    highlights: [
      "Visualizes plants, pipelines and storage with region-based analysis.",
      "AI-driven site scoring across 20+ factors (cost, demand, water, regulations, climate) using XGBoost and Mistral-7B via Groq.",
      "Dashboard with AI report comparison and a chatbot for querying infrastructure reports.",
    ],
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
      "CLI that writes meaningful Git commit messages from your staged diff using Gemini.",
    highlights: [
      "Context-aware diff parsing plus prompt engineering for accurate commit summaries.",
      "Cross-platform, with secure API key storage.",
      "Published on PyPI — pip install devghost.",
    ],
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
      "Secure REST API for managing subscriptions with automated renewal reminders.",
    highlights: [
      "Full CRUD with JWT auth, bcrypt password hashing and Arcjet rate limiting.",
      "Automated renewal reminder emails via Upstash workflows and Nodemailer.",
    ],
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
      "Intelligent energy management system for renewable microgrids.",
    status: "Top 10 Finalist · IIT Gandhinagar",
    highlights: [
      "Ingests real-time data from 1000+ IoT sensors via MQTT into InfluxDB.",
      "Reinforcement Learning agent for dynamic energy dispatch, with live Grafana dashboards.",
      "Diagnostics engine for fault detection and predictive maintenance.",
    ],
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
