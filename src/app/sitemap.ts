import type { MetadataRoute } from "next";
import { stegaClean } from "next-sanity";
import { getSettings, getSlugs } from "@/sanity/content";

// /sitemap.xml: home, insights, every case study and post. Updates when she publishes.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, studies, posts] = await Promise.all([getSettings(), getSlugs("caseStudy"), getSlugs("post")]);
  const base = stegaClean(settings.siteUrl).replace(/\/$/, "");
  return [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/insights`, priority: 0.7 },
    ...studies.map(({ slug }) => ({ url: `${base}/work/${slug}`, priority: 0.8 })),
    ...posts.map(({ slug }) => ({ url: `${base}/insights/${slug}`, priority: 0.6 })),
  ];
}
