import { allPosts } from "content-collections";
import { formatDate, readingTime } from "@/lib/utils";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/mdx-components";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

function getSortedPosts() {
  return [...allPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._meta.path.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = allPosts.find((p) => p._meta.path.replace(/\.mdx$/, "") === slug);
  if (!post) return undefined;

  const { title, publishedAt: publishedTime, summary: description, image } = post;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${slug}`,
      ...(image && { images: [{ url: `${DATA.url}${image}` }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [`${DATA.url}${image}`] }),
    },
  };
}

function getCategoryMeta(category?: string) {
  if (category === "DSA")
    return { label: "DSA", className: "text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-950/60" };
  if (category === "Core CS")
    return { label: "Core CS", className: "text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-950/60" };
  if (category === "Engineering")
    return { label: "Engineering", className: "text-violet-700 bg-violet-50 dark:text-violet-300 dark:bg-violet-950/60" };
  return { label: "Article", className: "text-muted-foreground bg-muted" };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sortedPosts = getSortedPosts();
  const currentIndex = sortedPosts.findIndex(
    (p) => p._meta.path.replace(/\.mdx$/, "") === slug
  );
  const post = sortedPosts[currentIndex];

  if (!post) notFound();

  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;
  const getSlug = (p: (typeof sortedPosts)[0]) => p._meta.path.replace(/\.mdx$/, "");

  const rt = readingTime(post.content);
  const categoryMeta = getCategoryMeta(post.category);
  const isPlacementNote = post.category !== "Article";
  const backHref = isPlacementNote ? "/blog?tab=placement-notes" : "/blog?tab=articles";

  const jsonLdContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    description: post.summary,
    image: post.image
      ? `${DATA.url}${post.image}`
      : `${DATA.url}/blog/${slug}/opengraph-image`,
    url: `${DATA.url}/blog/${slug}`,
    author: { "@type": "Person", name: DATA.name },
  }).replace(/</g, "\\u003c");

  return (
    <section id="blog" className="max-w-3xl">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLdContent }}
      />

      {/* Back button */}
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        aria-label="Back to Blog"
      >
        <ChevronLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to blog
      </Link>

      {/* Post header */}
      <header className="mb-8">
        {/* Category badge */}
        <div className="mb-4">
          <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${categoryMeta.className}`}>
            {categoryMeta.label}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
          {post.title}
        </h1>

        {/* Summary */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          {post.summary}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span>{post.author ?? DATA.name}</span>
          <span className="text-border">·</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span className="text-border">·</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {rt}
          </span>
        </div>
      </header>

      {/* Cover image */}
      {post.image && (
        <div className="mb-8 rounded-xl overflow-hidden bg-muted aspect-video">
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={450}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Divider */}
      <div className="mb-8">
        <div
          className="h-px bg-border"
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        />
      </div>

      {/* Article content */}
      <article className="prose prose-neutral max-w-full dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-foreground/80 prose-a:text-foreground prose-a:underline-offset-4 prose-code:text-foreground/90 prose-img:rounded-lg prose-img:mx-auto prose-strong:text-foreground">
        <MDXContent code={post.mdx} components={mdxComponents} />
      </article>

      {/* Prev / Next */}
      <nav className="mt-16 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {previousPost ? (
            <Link
              href={`/blog/${getSlug(previousPost)}`}
              className="group flex-1 flex flex-col gap-1.5 p-4 rounded-xl border border-border hover:bg-muted/40 transition-colors"
            >
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ChevronLeft className="size-3" />
                Previous
              </span>
              <span className="text-sm font-medium group-hover:text-foreground transition-colors line-clamp-2">
                {previousPost.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block flex-1" />
          )}

          {nextPost ? (
            <Link
              href={`/blog/${getSlug(nextPost)}`}
              className="group flex-1 flex flex-col gap-1.5 p-4 rounded-xl border border-border hover:bg-muted/40 transition-colors text-right"
            >
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                Next
                <ChevronRight className="size-3" />
              </span>
              <span className="text-sm font-medium group-hover:text-foreground transition-colors line-clamp-2">
                {nextPost.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block flex-1" />
          )}
        </div>
      </nav>
    </section>
  );
}
