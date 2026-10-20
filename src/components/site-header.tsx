"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, X } from "lucide-react";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home", external: false },
  { href: "/experience", label: "Experience", external: false },
  { href: "/projects", label: "Projects", external: false },
  { href: "/blog", label: "Blog", external: false },
  { href: DATA.contact.social.Resume.url, label: "Resume", external: true },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const themeButton = (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="p-1 text-foreground/70 hover:text-foreground"
    >
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </button>
  );

  return (
    <header
      className={cn(
        "relative border-b border-border bg-background shadow-sm",
        // Sit above the overlapping home-page photo only while the menu is open.
        open ? "z-50" : "z-30"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="whitespace-nowrap text-lg font-bold tracking-tight">
          {DATA.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          {LINKS.map(({ href, label, external }) => (
            <Link
              key={label}
              href={href}
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
              className={cn(
                "transition-colors hover:text-blue-600 dark:hover:text-blue-400",
                isActive(href) ? "text-blue-600 dark:text-blue-400" : "text-foreground/80"
              )}
            >
              {label}
            </Link>
          ))}
          {themeButton}
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          {themeButton}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="rounded-md border border-border p-1.5 text-foreground/80"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="absolute inset-x-0 top-full z-50 border-b border-border bg-background shadow-md md:hidden">
          {LINKS.map(({ href, label, external }) => (
            <Link
              key={label}
              href={href}
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
              onClick={() => setOpen(false)}
              className={cn(
                "block border-t border-border px-5 py-3 text-sm font-medium",
                isActive(href) ? "text-blue-600 dark:text-blue-400" : "text-foreground/80"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
