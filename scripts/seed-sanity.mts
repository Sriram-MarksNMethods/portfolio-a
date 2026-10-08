// Copies the starter content (src/data/defaults.ts) into the dashboard, so she starts from a filled-in site.
// Safe to re-run: it only creates documents that don't exist yet and never overwrites her edits.
//
//   node --env-file=.env.local scripts/seed-sanity.mts
//   node scripts/seed-sanity.mts --dry-run      (prints what it would create, sends nothing)
//
// Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN (an "Editor" token) in .env.local.
import { createClient } from "@sanity/client";
import { defaultCaseStudies, defaultHome, defaultPosts, defaultSettings } from "../src/data/defaults.ts";

let n = 0;
const key = () => `seed${(n++).toString(36)}`;
// list items in the dashboard need a _key (and a _type for objects)
const items = <T extends object>(list: T[] | undefined, type: string) => (list ?? []).map((item) => ({ _key: key(), _type: type, ...item }));

const sections = defaultHome.sections.map((section) => {
  switch (section._type) {
    case "heroSection":
      return { ...section, card: { ...section.card, stats: items(section.card?.stats, "stat") } };
    case "aboutSection":
      return { ...section, panel: { ...section.panel, facts: items(section.panel?.facts, "fact") } };
    case "resumeSection":
      return { ...section, education: items(section.education, "educationItem"), experience: items(section.experience, "job") };
    default:
      return section;
  }
});

// images can't be seeded from a URL here; she uploads the share image in the dashboard
const settings = { ...defaultSettings };
delete settings.shareImage;

const docs = [
  { _id: "settings", _type: "settings", ...settings, menu: items(settings.menu, "menuLink"), links: items(settings.links, "profileLink") },
  { _id: "homePage", _type: "homePage", sections },
  ...defaultCaseStudies.map(({ slug, ...study }) => ({ _id: `caseStudy-${slug}`, _type: "caseStudy", ...study, slug: { _type: "slug", current: slug } })),
  ...defaultPosts.map(({ slug, ...post }) => ({ _id: `post-${slug}`, _type: "post", ...post, slug: { _type: "slug", current: slug } })),
];

if (process.argv.includes("--dry-run")) {
  console.log(JSON.stringify(docs, null, 2));
  process.exit(0);
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN in .env.local first.");
  process.exit(1);
}
const client = createClient({ projectId, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production", apiVersion: "2026-09-01", token, useCdn: false });

const tx = client.transaction();
for (const doc of docs) tx.createIfNotExists(doc);
await tx.commit();
console.log(`Done: ${docs.length} documents (existing ones were left as they are).`);
