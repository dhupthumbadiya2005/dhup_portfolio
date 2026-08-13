import { allPosts } from "content-collections";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { formatDate, readingTime } from "@/lib/utils";
import { BlogTabs } from "./blog-tabs";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles and placement notes by Dhup Thumbadiya.",
  openGraph: {
    title: "Blog",
    description: "Articles and placement notes by Dhup Thumbadiya.",
  },
};

const BLUR_FADE_DELAY = 0.04;

const CATEGORY_META: Record<string, { color: string; dot: string; description: string }> = {
  DSA: {
    color: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
    description: "Data Structures & Algorithms patterns in Python",
  },
  "Core CS": {
    color: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
    description: "OS, DBMS, SQL, OOP, and Networks",
  },
  Engineering: {
    color: "text-violet-600 dark:text-violet-400",
    dot: "bg-violet-500",
    description: "System Design, Cloud & DevOps, RAG",
  },
};

function getCategoryBadgeClass(category: string) {
  if (category === "DSA") return "text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-950/60";
  if (category === "Core CS") return "text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-950/60";
  if (category === "Engineering") return "text-violet-700 bg-violet-50 dark:text-violet-300 dark:bg-violet-950/60";
  return "text-muted-foreground bg-muted";
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab: tabParam } = await searchParams;
  const activeTab = tabParam === "placement-notes" ? "placement-notes" : "articles";

  const sorted = [...allPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const articles = sorted.filter((p) => p.category === "Article");
  const placementNotes = sorted.filter((p) => p.category !== "Article");

  const noteGroups: Record<string, typeof placementNotes> = {
    DSA: placementNotes.filter((p) => p.category === "DSA"),
    "Core CS": placementNotes.filter((p) => p.category === "Core CS"),
    Engineering: placementNotes.filter((p) => p.category === "Engineering"),
  };

  return (
    <section id="blog" className="max-w-3xl">
      {/* Header */}
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Blog</h1>
          <p className="text-muted-foreground">
            Writing about software, systems, and my CS interview prep journey.
          </p>
        </div>
      </BlurFade>

      {/* Tabs */}
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <Suspense>
          <BlogTabs articleCount={articles.length} notesCount={placementNotes.length} />
        </Suspense>
      </BlurFade>

      {/* Articles Tab */}
      {activeTab === "articles" && (
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="flex flex-col divide-y divide-border">
            {articles.length === 0 ? (
              <p className="text-muted-foreground py-12 text-center">No articles yet.</p>
            ) : (
              articles.map((post) => {
                const slug = post._meta.path.replace(/\.mdx$/, "");
                const rt = readingTime(post.content);
                return (
                  <Link
                    key={slug}
                    href={`/blog/${slug}`}
                    className="group flex gap-6 py-8 first:pt-0 last:pb-0 hover:opacity-80 transition-opacity"
                  >
                    {/* Text */}
                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          Article
                        </span>
                        <span className="text-muted-foreground/40">·</span>
                        <span className="text-xs text-muted-foreground">{rt}</span>
                      </div>
                      <h2 className="text-xl font-bold tracking-tight leading-snug group-hover:text-foreground/80 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {post.summary}
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        {formatDate(post.publishedAt)}
                      </p>
                    </div>
                    {/* Thumbnail */}
                    {post.image && (
                      <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </Link>
                );
              })
            )}
          </div>
        </BlurFade>
      )}

      {/* Placement Notes Tab */}
      {activeTab === "placement-notes" && (
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="flex flex-col gap-10">
            {Object.entries(noteGroups).map(([groupName, posts]) => {
              if (posts.length === 0) return null;
              const meta = CATEGORY_META[groupName];
              return (
                <div key={groupName}>
                  {/* Group header */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${meta.dot}`} />
                    <h2 className={`text-sm font-semibold uppercase tracking-wider ${meta.color}`}>
                      {groupName}
                    </h2>
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs text-muted-foreground shrink-0">
                      {posts.length} {posts.length === 1 ? "note" : "notes"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-5 ml-5">{meta.description}</p>

                  {/* Notes list */}
                  <div className="flex flex-col">
                    {posts.map((post) => {
                      const slug = post._meta.path.replace(/\.mdx$/, "");
                      const rt = readingTime(post.content);
                      return (
                        <Link
                          key={slug}
                          href={`/blog/${slug}`}
                          className="group flex items-center justify-between gap-4 py-3.5 border-b border-border/60 last:border-0 hover:bg-muted/30 -mx-3 px-3 rounded-lg transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <ArrowRight className="size-3.5 shrink-0 text-muted-foreground/50 group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                            <span className="text-sm font-medium text-foreground/90 group-hover:text-foreground truncate transition-colors">
                              {post.title}
                            </span>
                          </div>
                          <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                            {rt}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </BlurFade>
      )}
    </section>
  );
}
