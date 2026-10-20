/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { PageTitle } from "@/components/page-title";

export const metadata: Metadata = {
  title: "Experience",
  description: "Work experience, education, skills and achievements.",
};

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-6 border-b border-foreground/30 pb-2 text-xl font-bold">{children}</h2>;
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-justify hyphens-auto text-[15px] leading-relaxed text-foreground/85">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function ExperiencePage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-14">
      <PageTitle title="Experience" />

      <section>
        <Heading>Work</Heading>
        <div className="flex flex-col gap-10">
          {DATA.work.map((work) => (
            <div key={work.company}>
              <div className="flex gap-4">
                <img
                  src={work.logoUrl}
                  alt=""
                  className="mt-1 size-11 shrink-0 rounded-full border border-border bg-background object-contain p-1"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col justify-between gap-x-4 sm:flex-row sm:items-baseline">
                    <Link
                      href={work.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {work.company}
                    </Link>
                    <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
                      {work.start} – {work.end ?? "Present"}
                    </span>
                  </div>
                  <div className="text-[15px] italic text-muted-foreground">
                    {work.title} · {work.location}
                  </div>
                </div>
              </div>
              {/* Full width on phones, aligned under the text on larger screens */}
              <div className="sm:pl-15">
                <Bullets items={work.description} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Heading>Education</Heading>
        {DATA.education.map((education) => (
          <div key={education.school} className="flex gap-4">
            <img
              src={education.logoUrl}
              alt=""
              className="mt-1 size-11 shrink-0 rounded-full border border-border bg-background object-contain p-1"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-col justify-between gap-x-4 sm:flex-row sm:items-baseline">
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-600 hover:underline dark:text-blue-400"
                >
                  {education.school}
                </Link>
                <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
                  {education.start} – {education.end}
                </span>
              </div>
              <div className="text-[15px] italic text-muted-foreground">{education.degree}</div>
            </div>
          </div>
        ))}
      </section>

      <section>
        <Heading>Skills</Heading>
        <dl className="flex flex-col gap-3 text-[15px]">
          {DATA.skillGroups.map((group) => (
            <div key={group.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
              <dt className="w-32 shrink-0 font-semibold">{group.label}</dt>
              <dd className="text-foreground/85">
                {group.skills.map((s) => s.name).join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <Heading>Hackathons &amp; Achievements</Heading>
        <ul className="flex flex-col gap-4">
          {DATA.hackathons.map((hackathon) => (
            <li key={hackathon.title}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-semibold">
                  {hackathon.title}
                  {"win" in hackathon && hackathon.win && (
                    <span className="font-normal text-blue-600 dark:text-blue-400"> — {hackathon.win}</span>
                  )}
                </span>
                <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
                  {hackathon.dates}
                </span>
              </div>
              {hackathon.description && (
                <p className="mt-1 text-justify hyphens-auto text-[15px] leading-relaxed text-foreground/85">
                  {hackathon.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
