import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Java } from "@/components/ui/svgs/java";

export const DATA = {
  name: "Dhup Thumbadiya",
  initials: "DT",
  url: "https://dhup.dev",
  location: "Gandhinagar, India",
  locationLink: "https://www.google.com/maps/place/Gandhinagar",
  description:
    "AI & Full Stack Developer. I love building AI-powered products and solving real-world problems. Always shipping something new.",
  summary:
    "I'm a pre-final year B.Tech student in Information and Communication Technology at [PDEU, Gandhinagar](/#education). Previously interned at [WotNot Solutions](https://wotnot.io), an AI automation company, where I worked on their voice agent platform — integrating multiple TTS, STT, and VAD models and building end-to-end RAG pipelines. I've shipped SaaS products, AI/ML platforms, and developer tools.",
  avatarUrl: "/me.png",
  skills: [
    { name: "TypeScript", icon: Typescript },
    { name: "Python", icon: Python },
    { name: "Java", icon: Java },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "React", icon: ReactLight },
    { name: "Node.js", icon: Nodejs },
    { name: "FastAPI", icon: undefined },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "MongoDB", icon: undefined },
    { name: "Docker", icon: Docker },
    { name: "OpenAI", icon: undefined },
    { name: "AWS", icon: undefined },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "dhupthumbadiya2005@gmail.com",
    tel: "+917861986355",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/dhupthumbadiya2005",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/dhupthumbadiya/",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/dhup_thumbadiya",
        icon: Icons.x,
        navbar: false,
      },
      Youtube: {
        name: "Youtube",
        url: "#",
        icon: Icons.youtube,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "mailto:dhupthumbadiya2005@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "WotNot Solutions Pvt. Ltd.",
      href: "https://wotnot.io",
      badges: ["Summer Internship"],
      location: "Remote",
      title: "AI Backend Engineer Intern",
      logoUrl: "/wotnot.png",
      start: "May 2026",
      end: "July 2026",
      description:
        "Engineered a real-time voice agent pipeline using Pipecat, achieving sub-700ms response latency. Integrated multi-modal STT/TTS services (Deepgram, ElevenLabs, Cartesia) with OpenAI LLMs and RAG knowledge bases. Deployed full-stack voice solutions on Oracle VM with multi-channel access via Web and Call (Twilio). Architected a specialized RAG pipeline for an e-commerce platform enabling intelligent product retrieval via natural language.",
    },
    {
      company: "PDEU IIC (INavLabs)",
      href: "https://pdpu.ac.in",
      badges: ["Intern"],
      location: "Gandhinagar, India",
      title: "Full Stack Developer Intern",
      logoUrl: "/i-nav-labs.png",
      start: "Nov 2024",
      end: "Feb 2025",
      description:
        "Built a full-stack web app using Next.js and FastAPI with 5+ REST APIs; designed database schema and implemented CRUD operations. Tested and validated APIs using Postman; collaborated with the team for backend integration and database design.",
    },
  ],
  education: [
    {
      school: "Pandit Deendayal Energy University",
      href: "https://pdpu.ac.in",
      degree: "B.Tech in Information and Communication Technology — CGPA: 9.09/10",
      logoUrl: "/pdeu.jpg",
      start: "2023",
      end: "2027",
    },
  ],
  projects: [
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
  ],
  hackathons: [
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
  ],
} as const;
