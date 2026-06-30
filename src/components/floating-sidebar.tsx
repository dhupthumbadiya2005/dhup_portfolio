"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { DATA } from "@/data/resume";
import { ArrowUp } from "lucide-react";

export function FloatingSidebar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const socials = [
    { icon: Icons.github, href: DATA.contact.social.GitHub.url, label: "GitHub" },
    { icon: Icons.linkedin, href: DATA.contact.social.LinkedIn.url, label: "LinkedIn" },
    { icon: Icons.resume, href: DATA.contact.social.Resume.url, label: "Resume" },
    { icon: Icons.email, href: `mailto:${DATA.contact.email}`, label: "Email" },
    { icon: Icons.whatsapp, href: `https://wa.me/${DATA.contact.tel.replace(/\D/g, "")}`, label: "WhatsApp" },
  ];

  return (
    <>
      {/* Left — social links */}
      <div className="hidden xl:flex fixed left-8 bottom-1/3 flex-col items-center gap-4 z-5">
        {socials.map(({ icon: Icon, href, label }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon className="size-5" />
          </Link>
        ))}
        <div className="w-px h-16 bg-border mt-2" />
      </div>

      {/* Right — scroll to top */}
      <div className="hidden xl:flex fixed right-8 bottom-1/3 flex-col items-center gap-4 z-5">
        <div className="w-px h-16 bg-border mb-2" />
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className={`text-muted-foreground hover:text-foreground transition-all duration-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <ArrowUp className="size-5" />
        </button>
      </div>
    </>
  );
}
