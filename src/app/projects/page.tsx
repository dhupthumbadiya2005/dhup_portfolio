/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { PageTitle } from "@/components/page-title";

export const metadata: Metadata = {
  title: "Projects",
  description: "AI systems, SaaS products and developer tools.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col">
      <PageTitle
        title="Projects"
        subtitle="AI systems, SaaS products and developer tools I've built."
      />

      <div className="mt-12 flex flex-col divide-y divide-border">
        {DATA.projects.map((project) => (
          <article key={project.title} className="flex flex-col gap-5 py-8 first:pt-0 sm:flex-row">
            {project.image && (
              <Link href={project.href} target="_blank" rel="noopener noreferrer" className="shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="aspect-video w-full rounded-lg border border-border object-cover sm:w-52"
                />
              </Link>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-4">
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-600 hover:underline dark:text-blue-400"
                >
                  {project.title}
                </Link>
                <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
                  {project.dates}
                </span>
              </div>
              <p className="mt-1 text-[15px] text-foreground/90">{project.description}</p>
              {"status" in project && project.status && (
                <p className="mt-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400">
                  {project.status}
                </p>
              )}
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground/80">
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground/80">Tech:</span>{" "}
                {project.technologies.join(", ")}
              </p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {project.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {link.icon}
                    {link.type}
                  </Link>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
