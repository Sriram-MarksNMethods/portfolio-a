import { cacheLife } from "next/cache";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { Header } from "@/components/Header";
import { isSanityConfigured } from "@/sanity/env";
import { getSettings } from "@/sanity/content";
import { SanityLive } from "@/sanity/live";

// The year for the footer, worked out once a day.
async function Year() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings();
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Header settings={settings} />
      <main id="main">{children}</main>
      <footer className="py-6 text-center text-[13px] text-mut">
        © <Year /> {settings.name}
      </footer>

      {/* refreshes the page as soon as content is published in the dashboard */}
      {isSanityConfigured && <SanityLive includeDrafts={isDraftMode} />}
      {/* click-to-edit overlays, only inside the dashboard's "Edit website" preview */}
      {isDraftMode && <VisualEditing />}
    </>
  );
}
