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
    "AI & Full Stack Developer. I love building AI-powered products and solving real-world problems. Always shipping something new.",
  summary:
    "I'm a pre-final year B.Tech student in Information and Communication Technology at [PDEU, Gandhinagar](/#education). Previously interned at [WotNot Solutions](https://wotnot.io), an AI automation company, where I worked on their voice agent platform — integrating multiple TTS, STT, and VAD models and building end-to-end RAG pipelines. I've shipped SaaS products, AI/ML platforms, and developer tools.",
  avatarUrl: "/me.png",

  // ── Skills ───────────────────────────────────────────────────────────────
  // Add { name: "SkillName", icon: SvgComponent } for skills with icons.
  // Add { name: "SkillName", icon: undefined } for text-only badges.
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
