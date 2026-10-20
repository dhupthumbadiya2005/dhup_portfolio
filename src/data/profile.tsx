// ─── PROFILE ────────────────────────────────────────────────────────────────
// Edit this file to update personal info, skills, work experience,
// education, contact details, and navbar links.
// ─────────────────────────────────────────────────────────────────────────────

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

export const PROFILE = {
  name: "Dhup Thumbadiya",
  initials: "DT",
  url: "https://dhup.dev",
  location: "Gandhinagar, India",
  locationLink: "https://www.google.com/maps/place/Gandhinagar",
  description:
    "Backend & AI Engineer. I build AI agents, LLM-powered products and scalable backends — and ship them to production.",
  // Home page intro — markdown, paragraphs separated by a blank line.
  headline: "Backend AI Engineer Intern at PipelineAI",
  summary: `I am a Backend AI Engineer Intern at [PipelineAI](https://addpipeline.ai), where I build AI agents, LLM integrations, GTM engineering workflows and the scalable backends that power them.

Before PipelineAI, I interned at [WotNot Solutions](https://wotnot.io), building real-time voice agents with sub-700ms latency — integrating STT, TTS and VAD models with LLMs — and end-to-end RAG pipelines.

I'm a final-year B.Tech student in Information and Communication Technology at [Pandit Deendayal Energy University](https://pdpu.ac.in), graduating in 2027. Lately I've been building [Manimation](https://github.com/dhupthumbadiya2005/Manimation), a multi-agent system that turns a single prompt into a narrated 3Blue1Brown-style math video, and I'm currently writing a journal paper on it.

Take a look at my [projects](/projects), [experience](/experience) and [blog](/blog), or reach me via [email](mailto:dhupthumbadiya2005@gmail.com) or [call me](tel:+917861986355).`,
  avatarUrl: "/me.png",

  // ── Skills ───────────────────────────────────────────────────────────────
  // Grouped by area. Add { name, icon } — icon is optional (an SVG component).
  skillGroups: [
    {
      label: "AI / LLM",
      skills: [
        { name: "OpenAI", icon: undefined },
        { name: "Claude", icon: undefined },
        { name: "Gemini", icon: undefined },
        { name: "Groq", icon: undefined },
        { name: "AI Agents", icon: undefined },
        { name: "RAG", icon: undefined },
        { name: "Prompt Engineering", icon: undefined },
        { name: "Pipecat", icon: undefined },
        { name: "Deepgram / ElevenLabs", icon: undefined },
      ],
    },
    {
      label: "Backend",
      skills: [
        { name: "Python", icon: Python },
        { name: "FastAPI", icon: undefined },
        { name: "Node.js", icon: Nodejs },
        { name: "Express", icon: undefined },
        { name: "REST APIs", icon: undefined },
        { name: "Java", icon: Java },
      ],
    },
    {
      label: "Data",
      skills: [
        { name: "PostgreSQL", icon: Postgresql },
        { name: "MongoDB", icon: undefined },
        { name: "Prisma", icon: undefined },
        { name: "Supabase", icon: undefined },
        { name: "InfluxDB", icon: undefined },
      ],
    },
    {
      label: "Cloud & Tools",
      skills: [
        { name: "Docker", icon: Docker },
        { name: "AWS", icon: undefined },
        { name: "Oracle Cloud", icon: undefined },
        { name: "Vercel", icon: undefined },
        { name: "Twilio", icon: undefined },
        { name: "Git", icon: undefined },
      ],
    },
    {
      label: "Frontend",
      skills: [
        { name: "TypeScript", icon: Typescript },
        { name: "Next.js", icon: NextjsIconDark },
        { name: "React", icon: ReactLight },
      ],
    },
  ],

  // ── Navbar ────────────────────────────────────────────────────────────────
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],

  // ── Contact ───────────────────────────────────────────────────────────────
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
      WhatsApp: {
        name: "WhatsApp",
        url: "https://wa.me/917861986355",
        icon: Icons.whatsapp,
        navbar: true,
      },
      Resume: {
        name: "Resume",
        url: "https://drive.google.com/file/d/13DMUB13I3hLiT2Dkid2P4TH6g1X7vGSy/view?usp=sharing",
        icon: Icons.resume,
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

  // ── Work Experience ───────────────────────────────────────────────────────
  // Add new jobs at the top (most recent first).
  // logoUrl: place the company logo in /public and reference it here.
  work: [
    {
      company: "PipelineAI",
      href: "https://addpipeline.ai",
      badges: ["Intern"],
      location: "Remote",
      title: "Backend AI Engineer Intern",
      logoUrl: "/pipelineai.png",
      start: "Sep 2026",
      end: undefined,
      description: [
        "Building scalable backend services and APIs that power the core PipelineAI product.",
        "Designing and shipping AI agents and LLM integrations — tool calling, prompt pipelines and evaluation for production workflows.",
        "Working on GTM engineering — integrations and automation that connect AI workflows to go-to-market systems.",
        "Working end-to-end on product building, from backend architecture to integrations and deployment.",
      ],
    },
    {
      company: "WotNot Solutions Pvt. Ltd.",
      href: "https://wotnot.io",
      badges: ["Summer Internship"],
      location: "Ahmedabad, India",
      title: "AI Backend Engineer Intern",
      logoUrl: "/wotnot.png",
      start: "May 2026",
      end: "July 2026",
      description: [
        "Engineered a real-time voice agent pipeline using Pipecat, achieving sub-700ms response latency.",
        "Integrated multi-modal STT/TTS services (Deepgram, ElevenLabs, Cartesia) with OpenAI LLMs and RAG knowledge bases.",
        "Deployed full-stack voice solutions on Oracle VM with multi-channel access via Web and Call (Twilio).",
        "Architected a specialized RAG pipeline for an e-commerce platform enabling intelligent product retrieval via natural language.",
      ],
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
      description: [
        "Built a full-stack web app using Next.js and FastAPI with 5+ REST APIs; designed database schema and implemented CRUD operations.",
        "Tested and validated APIs using Postman; collaborated with the team for backend integration and database design.",
      ],
    },
  ],

  // ── Education ─────────────────────────────────────────────────────────────
  // Add new entries at the top (most recent first).
  // logoUrl: place the institution logo in /public and reference it here.
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
} as const;
