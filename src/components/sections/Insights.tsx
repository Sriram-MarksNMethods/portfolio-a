import Link from "next/link";
import { stegaClean } from "next-sanity";
import { Container } from "@/components/Container";
import type { InsightsSection, PostCard } from "@/data/types";

export const formatDate = (date: string) =>
  new Date(`${stegaClean(date)}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

// One row in a post list: date · title + summary · reading time.
export function PostRow({ post }: { post: PostCard }) {
  return (
    <Link
      href={`/insights/${stegaClean(post.slug)}`}
      className="group grid gap-1 border-b border-maroon/25 py-5 sm:grid-cols-[9rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6"
    >
      <time dateTime={stegaClean(post.date)} className="font-mono text-[13px] text-mut">
        {formatDate(post.date)}
      </time>
      <span className="min-w-0">
        <span className="block text-[clamp(19px,1.6vw,24px)] font-bold transition-colors group-hover:text-maroon">{post.title}</span>
        {post.excerpt && <span className="mt-1 block max-w-[70ch] text-mut">{post.excerpt}</span>}
      </span>
      <small className="font-mono text-[13px] text-mut">{post.readMinutes} min read</small>
    </Link>
  );
}

export function Insights({ section }: { section: InsightsSection }) {
  const posts = (section.posts ?? []).slice(0, section.count ?? 3);
  if (!posts.length) return null;
  return (
    <section id="insights">
      <Container>
        <div className="mb-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-head text-[clamp(40px,5vw,80px)] leading-none font-normal text-maroon">{section.heading}</h2>
            {section.intro && <p className="mt-3 max-w-[52ch] text-mut 2xl:text-lg">{section.intro}</p>}
          </div>
          {section.linkLabel && (
            <Link href="/insights" className="rounded-full border-[1.5px] border-maroon px-5 py-2.5 font-bold text-maroon transition-colors hover:bg-maroon hover:text-white">
              {section.linkLabel} →
            </Link>
          )}
        </div>
        <div className="border-t border-maroon/25">
          {posts.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
