import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import type { Seo, Settings } from "@/data/types";

// Builds a page's <title>, description, share image and robots tag from its SEO fields,
// falling back to Site settings → SEO.
export function buildMetadata({ settings, seo, title, description, path }: { settings: Settings; seo?: Seo; title?: string; description?: string; path: string }): Metadata {
  const pageTitle = stegaClean(seo?.title || title);
  const metaDescription = stegaClean(seo?.description || description || settings.siteDescription);
  const image = seo?.image || settings.shareImage;
  const siteTitle = stegaClean(settings.siteTitle);

  return {
    metadataBase: new URL(stegaClean(settings.siteUrl)),
    title: pageTitle ? `${pageTitle} | ${stegaClean(settings.name)}` : siteTitle,
    description: metaDescription,
    alternates: { canonical: path },
    robots: seo?.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: pageTitle || siteTitle,
      description: metaDescription,
      url: path,
      siteName: siteTitle,
      type: "website",
      images: image ? [{ url: `${image}?w=1200&h=630&fit=crop`, width: 1200, height: 630 }] : undefined,
    },
    twitter: { card: image ? "summary_large_image" : "summary" },
  };
}
