import { draftMode } from "next/headers";
import { createClient } from "next-sanity";
import { defineLive, type LivePerspective } from "next-sanity/live";
import { apiVersion, dataset, projectId, readToken } from "./env";

export const client = createClient({
  projectId: projectId || "unset",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  // in the dashboard preview, text carries hidden markers so "click to edit" knows which field it came from
  stega: { studioUrl: "/studio" },
});

// Sanity Live: pages stay cached, and refresh by themselves the moment she publishes (no webhook needed).
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: readToken || false,
  browserToken: readToken || false,
  strict: true,
});

type FetchOptions = { query: string; params?: Record<string, unknown>; perspective: LivePerspective; stega: boolean };

// The site's one shared cache boundary for Sanity data.
export async function cachedSanity(options: FetchOptions) {
  "use cache";
  return sanityFetch(options);
}

// Normal visitors get published content; the dashboard's "Edit website" preview gets drafts + click-to-edit.
export async function getFetchOptions(): Promise<Pick<FetchOptions, "perspective" | "stega">> {
  const { isEnabled } = await draftMode();
  return isEnabled ? { perspective: "drafts", stega: true } : { perspective: "published", stega: false };
}
