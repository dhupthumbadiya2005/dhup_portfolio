/* eslint-disable @next/next/no-img-element */
import Markdown from "react-markdown";
import { DATA } from "@/data/resume";
import { UPDATES } from "@/data/updates";
import { PageTitle } from "@/components/page-title";
import { ProseMarkdown } from "@/components/prose-markdown";

export default function Page() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col">
      <img
        src={DATA.avatarUrl}
        alt={DATA.name}
        className="relative z-40 mx-auto size-24 rounded-full sm:-mt-20 sm:size-20 border-2 border-background object-cover shadow-md"
      />

      <div className="mt-6 sm:mt-8">
        <PageTitle title={`Hi, I'm ${DATA.name.split(" ")[0]}`} subtitle={DATA.headline} />
      </div>

      <ProseMarkdown className="mt-10">{DATA.summary}</ProseMarkdown>

      <hr className="my-8 border-foreground/40" />

      <h2 className="font-bold">Updates:</h2>
      <div className="mt-6 max-h-96 overflow-y-auto rounded-lg border border-border bg-muted/40 px-5">
        {UPDATES.map((update, i) => (
          <p
            key={i}
            className="border-b border-border py-4 text-justify hyphens-auto text-sm leading-relaxed text-foreground/90 last:border-0 [&_a]:text-blue-600 [&_a:hover]:underline dark:[&_a]:text-blue-400 [&_strong]:font-semibold [&_strong]:text-foreground"
          >
            <span className="font-semibold text-blue-600 dark:text-blue-400">{update.date}:</span>{" "}
            <Markdown components={{ p: ({ children }) => <>{children}</> }}>{update.text}</Markdown>
          </p>
        ))}
      </div>
    </main>
  );
}
