import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stegaClean } from "next-sanity";
import { Container } from "@/components/Container";
import { RichText } from "@/components/RichText";
import { formatDate } from "@/components/sections/Insights";
import { buildMetadata } from "@/lib/seo";
import { getPost, getSettings, getSlugs } from "@/sanity/content";

export async function generateStaticParams() {
  return getSlugs("post");
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const [settings, post] = await Promise.all([getSettings(), getPost(slug)]);
  if (!post) return {};
  const metadata = buildMetadata({ settings, seo: post.seo ?? { image: post.cover?.url }, title: post.title, description: post.excerpt, path: `/insights/${slug}` });
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article", publishedTime: stegaClean(post.date) } };
}

export default async function PostPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getPost(slug), getSettings()]);
  if (!post) notFound();

  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: stegaClean(post.title),
    datePublished: stegaClean(post.date),
    description: stegaClean(post.excerpt),
    author: { "@type": "Person", name: stegaClean(settings.name), url: stegaClean(settings.siteUrl) },
    image: post.cover?.url,
  };

  return (
    <article className="pt-32 pb-24 sm:pt-36 2xl:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article).replace(/</g, "\\u003c") }} />
      <Container>
        <Link href="/insights" className="mb-5 inline-block font-bold text-maroon hover:underline">
          ← Insights
        </Link>
      </Container>
      <header className="bg-maroon px-4 py-14 text-center text-white sm:py-20">
        <p className="font-mono text-sm text-white/80">
          <time dateTime={stegaClean(post.date)}>{formatDate(post.date)}</time> · {post.readMinutes} min read
        </p>
        <h1 className="mx-auto mt-3 max-w-[24ch] font-head text-[clamp(36px,5vw,80px)] leading-[1.05] font-normal text-balance">{post.title}</h1>
      </header>
      <Container className="mt-10">
        <div className="mx-auto max-w-[72ch]">
          {post.cover?.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={`${post.cover.url}?w=1600&fit=max&auto=format`} alt={stegaClean(post.cover.alt) ?? ""} className="mb-8 w-full rounded-2xl border-[1.5px] border-maroon" />
          )}
          {post.excerpt && <p className="mb-6 text-xl leading-relaxed font-medium">{post.excerpt}</p>}
          <RichText value={post.body} />
        </div>
      </Container>
    </article>
  );
}
