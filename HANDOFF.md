# SEO portfolio + dashboard: handover

Portfolio for an SEO specialist, styled after a printed "folder" portfolio (maroon on textured paper),
with a WordPress-style dashboard at `/studio` where she can edit everything.

Stack: Next.js 16.4 (app router, `src/`, Cache Components), Tailwind CSS v4, TypeScript, Sanity (dashboard + content).

## Status (2026-10-08)

- Site built and working on **placeholder content** (`src/data/defaults.ts`, name "Meera Iyer", example numbers).
- Dashboard built, **not connected yet**: needs a Sanity project (steps below).
- Checked: `next build`, `eslint`, `tsc` clean; no sideways scroll at 390 / 820 / 1440 / 2560 px wide.
- Not yet checked (needs the Sanity project): logging into the dashboard, click-to-edit preview, live updates on publish.
- No contact form by design: "Hire me" jumps to the Get in Touch section (phone, email, links from Site settings).
- No photo of her anywhere by design (her choice). The About section uses a Google-style info card instead.

## What she can edit (dashboard at /studio)

- **Edit website** tab: the live site with click-to-edit. Click any text to open its field.
- **Content → Home page**: the sections (Cover, Scrolling band, About me, Résumé, Case studies, Insights, Get in Touch).
  Add, remove, drag to reorder, or tick "Hide this section". Plus the home page's SEO box.
- **Content → Case studies / Insights**: add, edit, delete. Each has its own page and SEO box (with a Google preview).
- **Content → Site settings**: name, job title, location, header menu, Hire me button text, phone, email, profile links,
  default SEO (site title, description, share image, website address).
- Drafts, Publish, and full history with restore are built into Sanity.

Publishing updates the live site within seconds (Sanity Live, no webhook needed).

## Connect the dashboard (one-time, ~15 minutes)

1. Create a free project at https://www.sanity.io/manage ("Create project"). Copy the **Project ID**.
2. In the project: **API → CORS origins → Add**:
   - `http://localhost:3000` with **Allow credentials** ticked
   - later, the real domain (e.g. `https://herdomain.com`) with **Allow credentials** ticked
3. **API → Tokens → Add token**:
   - "website-preview", permission **Viewer** → this is `SANITY_API_READ_TOKEN`
   - "seed", permission **Editor** → this is `SANITY_WRITE_TOKEN` (delete it after step 5)
4. `cp .env.example .env.local` and fill in the project ID and both tokens.
5. Fill the dashboard with the starter content: `node --env-file=.env.local scripts/seed-sanity.mts`
   (safe to re-run, it never overwrites existing documents).
6. `npm run dev` → open http://localhost:3000/studio and log in.
7. **Members → Invite** her email address so she gets her own login.

## Going live (Vercel)

1. Push the repo to GitHub and import it in Vercel.
2. Add the env vars in Vercel: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`
   (not the write token).
3. Add the live domain to Sanity CORS origins (step 2 above).
4. In the dashboard: **Site settings → SEO → Website address** = the live domain (used by the sitemap, canonical URLs and Google).
5. Submit `https://<domain>/sitemap.xml` in Google Search Console.

## Where things are

| What | Where |
|---|---|
| Brand colours, fonts, animations | `src/app/globals.css` (`@theme`) |
| Header (floating maroon pill) | `src/components/Header.tsx` |
| Home page sections | `src/components/sections/*.tsx`, rendered in order by `Sections.tsx` |
| Animated growth card in the cover | `src/components/GrowthCard.tsx` |
| Case study page / insights pages | `src/app/(site)/work/[slug]`, `src/app/(site)/insights` |
| Dashboard config (tabs, menu, click-to-edit routes) | `sanity.config.ts` |
| Dashboard fields | `src/sanity/schema/*.ts` |
| Data loading (dashboard or defaults) | `src/sanity/content.ts` |
| Placeholder content | `src/data/defaults.ts` |
| SEO: metadata, sitemap, robots, llms.txt, JSON-LD | `src/lib/seo.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, `public/llms.txt`, Person / BlogPosting JSON-LD in the pages |

## Notes for the next developer

- Next 16.4 has Cache Components on: data is cached with `'use cache'` in `src/sanity/live.ts`, and `<SanityLive />`
  refreshes it when content is published. Don't use `new Date()` etc. outside a cached function (see the footer `Year`).
- Inside the dashboard preview, text carries invisible "stega" edit markers. Wrap anything used as a URL, slug,
  date or number with `stegaClean()` (already done throughout).
- The Next dev overlay shows a React "state update on a component that hasn't mounted" warning on `/studio`. It comes
  from inside Sanity Studio and is harmless.
