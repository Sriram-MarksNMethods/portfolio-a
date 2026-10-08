import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import { Sections } from "@/components/sections/Sections";
import { buildMetadata } from "@/lib/seo";
import { getHome, getSettings } from "@/sanity/content";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, home] = await Promise.all([getSettings(), getHome()]);
  return buildMetadata({ settings, seo: home.seo, path: "/" });
}

export default async function HomePage() {
  const [settings, home] = await Promise.all([getSettings(), getHome()]);

  // tells Google who she is (structured data)
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: stegaClean(settings.name),
    jobTitle: stegaClean(settings.role),
    url: stegaClean(settings.siteUrl),
    email: settings.email ? `mailto:${stegaClean(settings.email)}` : undefined,
    sameAs: settings.links.map((link) => stegaClean(link.url)),
    knowsAbout: ["Search engine optimization", "Technical SEO", "Local SEO", "Google Business Profile", "Content strategy"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
      <Sections sections={home.sections} settings={settings} />
    </>
  );
}
