import type { MetadataRoute } from "next";
import { stegaClean } from "next-sanity";
import { getSettings } from "@/sanity/content";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSettings();
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/api/"] },
    sitemap: `${stegaClean(settings.siteUrl).replace(/\/$/, "")}/sitemap.xml`,
  };
}
