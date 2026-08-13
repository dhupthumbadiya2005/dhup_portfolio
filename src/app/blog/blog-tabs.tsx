"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface BlogTabsProps {
  articleCount: number;
  notesCount: number;
}

export function BlogTabs({ articleCount, notesCount }: BlogTabsProps) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "articles";

  return (
    <div className="flex gap-1 p-1 bg-muted/60 rounded-xl w-fit mb-10">
      <Link
        href="/blog?tab=articles"
        className={cn(
          "px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          activeTab === "articles"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Articles
        <span className={cn(
          "ml-2 text-xs px-1.5 py-0.5 rounded-md",
          activeTab === "articles"
            ? "bg-muted text-muted-foreground"
            : "bg-muted/60 text-muted-foreground"
        )}>
          {articleCount}
        </span>
      </Link>
      <Link
        href="/blog?tab=placement-notes"
        className={cn(
          "px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          activeTab === "placement-notes"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Placement Notes
        <span className={cn(
          "ml-2 text-xs px-1.5 py-0.5 rounded-md",
          activeTab === "placement-notes"
            ? "bg-muted text-muted-foreground"
            : "bg-muted/60 text-muted-foreground"
        )}>
          {notesCount}
        </span>
      </Link>
    </div>
  );
}
