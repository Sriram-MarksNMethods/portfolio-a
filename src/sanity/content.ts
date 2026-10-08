import { defineQuery } from "next-sanity";
import { defaultCaseStudies, defaultHome, defaultPosts, defaultSettings } from "@/data/defaults";
import type { CaseStudy, HomePage, Post, PostCard, Section, Settings } from "@/data/types";
import { isSanityConfigured } from "./env";
import { cachedSanity, getFetchOptions } from "./live";

// Every page gets its content from these functions: from the dashboard when Sanity is connected,
// otherwise from src/data/defaults.ts. Fields left empty in the dashboard fall back to the defaults.

const IMG = `{ "url": asset->url, alt, caption, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }`;
const SEO = `seo{ title, description, "image": image.asset->url, noIndex }`;
const CASE_CARD = `"slug": slug.current, title, subtitle, industry, location, duration`;
const POST_CARD = `"slug": slug.current, title, date, excerpt, "cover": cover${IMG}, "words": length(string::split(pt::text(body), " "))`;

const SETTINGS_QUERY = defineQuery(`*[_id == "settings"][0]{ ..., "shareImage": shareImage.asset->url }`);

const HOME_QUERY = defineQuery(`*[_id == "homePage"][0]{
  "sections": sections[hidden != true]{
    ...,
    _type == "caseStudiesSection" => {
      "items": select(
        count(items) > 0 => items[]->{ ${CASE_CARD} },
        *[_type == "caseStudy" && defined(slug.current)] | order(date desc){ ${CASE_CARD} }
      )
    },
    _type == "insightsSection" => {
      "posts": *[_type == "post" && defined(slug.current)] | order(date desc)[0...12]{ ${POST_CARD} }
    }
  },
  ${SEO}
}`);

const CASE_STUDY_QUERY = defineQuery(`*[_type == "caseStudy" && slug.current == $slug][0]{
  ${CASE_CARD}, client, date, overview, "screenshots": screenshots[]${IMG},
  strategyHeading, strategy, resultsHeading, results, ${SEO}
}`);
const CASE_STUDY_LIST_QUERY = defineQuery(`*[_type == "caseStudy" && defined(slug.current)] | order(date desc){ ${CASE_CARD} }`);

const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{ ${POST_CARD}, body, ${SEO} }`);
const POST_LIST_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)] | order(date desc){ ${POST_CARD} }`);

async function load<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  const options = await getFetchOptions();
  const { data } = await cachedSanity({ query, params, ...options });
  return (data as T) ?? null;
}

// Keep the default for any field the dashboard left empty.
function withDefaults<T extends object>(defaults: T, data: Partial<T> | null): T {
  if (!data) return defaults;
  const result = { ...defaults };
  for (const [field, value] of Object.entries(data)) {
    const empty = value === null || value === undefined || value === "" || (Array.isArray(value) && value.length === 0);
    if (!empty && field in defaults) (result as Record<string, unknown>)[field] = value;
  }
  return result;
}

const readMinutes = (words?: number) => Math.max(1, Math.round((words ?? 0) / 200));
type RawPostCard = PostCard & { words?: number };
const toPostCard = ({ words, ...post }: RawPostCard): PostCard => ({ ...post, readMinutes: readMinutes(words) });

export async function getSettings(): Promise<Settings> {
  if (!isSanityConfigured) return defaultSettings;
  return withDefaults(defaultSettings, await load<Partial<Settings>>(SETTINGS_QUERY));
}

// The default home page, with its case-study and insights lists filled from the defaults too.
const fallbackHome: HomePage = {
  ...defaultHome,
  sections: defaultHome.sections.map((section): Section => {
    if (section._type === "caseStudiesSection") return { ...section, items: defaultCaseStudies };
    if (section._type === "insightsSection") return { ...section, posts: defaultPosts.map((post) => toPostCard({ ...post, words: 900 })) };
    return section;
  }),
};

export async function getHome(): Promise<HomePage> {
  if (!isSanityConfigured) return fallbackHome;
  const data = await load<HomePage>(HOME_QUERY);
  if (!data?.sections?.length) return fallbackHome;
  return {
    seo: data.seo,
    sections: data.sections.map((section) =>
      section._type === "insightsSection" ? { ...section, posts: (section.posts as RawPostCard[] | undefined)?.map(toPostCard) } : section,
    ),
  };
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  if (!isSanityConfigured) return defaultCaseStudies.find((study) => study.slug === slug) ?? null;
  return load<CaseStudy>(CASE_STUDY_QUERY, { slug });
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (!isSanityConfigured) return defaultCaseStudies;
  return (await load<CaseStudy[]>(CASE_STUDY_LIST_QUERY)) ?? [];
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!isSanityConfigured) {
    const post = defaultPosts.find((p) => p.slug === slug);
    return post ? { ...post, readMinutes: 4 } : null;
  }
  const post = await load<Post & { words?: number }>(POST_QUERY, { slug });
  return post ? { ...post, readMinutes: readMinutes(post.words) } : null;
}

export async function getPosts(): Promise<PostCard[]> {
  if (!isSanityConfigured) return defaultPosts.map((post) => toPostCard({ ...post, words: 900 }));
  return ((await load<RawPostCard[]>(POST_LIST_QUERY)) ?? []).map(toPostCard);
}

// For generateStaticParams (build time, published content only, no draft cookies).
export async function getSlugs(type: "caseStudy" | "post"): Promise<{ slug: string }[]> {
  if (!isSanityConfigured) return (type === "caseStudy" ? defaultCaseStudies : defaultPosts).map(({ slug }) => ({ slug }));
  const { data } = await cachedSanity({
    query: `*[_type == $type && defined(slug.current)]{ "slug": slug.current }`,
    params: { type },
    perspective: "published",
    stega: false,
  });
  return (data as { slug: string }[]) ?? [];
}
