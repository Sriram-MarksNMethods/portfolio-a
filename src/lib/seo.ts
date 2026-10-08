import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import type { Seo, Settings } from "@/data/types";

// Builds a page's <title>, description, share image and robots tag from its SEO fields,
// falling back to Site settings → SEO.
// `label` is the small tab text on the generated share image, e.g. "Case study".
export function buildMetadata({ settings, seo, title, description, path, label }: { settings: Settings; seo?: Seo; title?: string; description?: string; path: string; label?: string }): Metadata {
  const pageTitle = stegaClean(seo?.title || title);
  const metaDescription = stegaClean(seo?.description || description || settings.siteDescription);
  // an uploaded share image wins; otherwise the generated one in the portfolio's style (src/app/og/route.tsx)
  const uploaded = seo?.image || settings.shareImage;
  const generated = pageTitle ? `/og?${new URLSearchParams({ title: pageTitle, ...(label ? { label } : {}) })}` : "/og";
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
      images: [{ url: uploaded ? `${uploaded}?w=1200&h=630&fit=crop` : generated, width: 1200, height: 630, alt: pageTitle || siteTitle }],
    },
    twitter: { card: "summary_large_image" },
  };
}
