import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export { metadata, viewport } from "next-sanity/studio";

// The dashboard, at /studio.
export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="mx-auto grid max-w-[62ch] gap-4 px-5 py-16">
        <h1 className="font-head text-5xl text-maroon uppercase">Dashboard not connected yet</h1>
        <p>
          Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> to <code>.env.local</code> (see <code>HANDOFF.md</code>), then restart the
          site. Until then the site shows the content from <code>src/data/defaults.ts</code>.
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
