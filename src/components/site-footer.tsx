import Link from "next/link";
import { Icons } from "@/components/icons";
import { DATA } from "@/data/resume";

export function SiteFooter() {
  const items = [
    { href: DATA.contact.social.GitHub.url, icon: Icons.github, label: "GitHub" },
    { href: DATA.contact.social.LinkedIn.url, icon: Icons.linkedin, label: "LinkedIn" },
    { href: DATA.contact.social.X.url, icon: Icons.x, label: "X" },
    { href: `mailto:${DATA.contact.email}`, icon: Icons.email, label: "Email" },
  ];

  return (
    <footer className="mt-16 border-t border-border bg-muted/60 py-12">
      <div className="flex flex-col items-center gap-5">
        <div className="flex gap-3">
          {items.map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="flex size-11 items-center justify-center rounded-full bg-slate-500 text-white transition-colors hover:bg-slate-700 dark:bg-slate-600 dark:hover:bg-slate-500"
            >
              <Icon className="size-5" />
            </Link>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          {DATA.name} &nbsp;•&nbsp; {new Date().getFullYear()} &nbsp;•&nbsp;{" "}
          <span className="font-medium text-foreground/80">{DATA.url.replace("https://", "")}</span>
        </p>
      </div>
    </footer>
  );
}
