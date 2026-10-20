import Markdown from "react-markdown";
import { cn } from "@/lib/utils";

/** Markdown with the site's blue-link body style. */
export function ProseMarkdown({ children, className }: { children: string; className?: string }) {
  return (
    <div
      className={cn(
        "prose max-w-none text-justify hyphens-auto text-foreground/90 dark:prose-invert prose-p:leading-relaxed prose-a:font-normal prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-blue-400 prose-strong:text-foreground",
        className
      )}
    >
      <Markdown
        components={{
          a: ({ href, children }) =>
            href?.startsWith("http") ? (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ) : (
              <a href={href}>{children}</a>
            ),
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}
