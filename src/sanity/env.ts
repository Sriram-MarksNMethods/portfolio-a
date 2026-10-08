// Sanity connection settings, from .env.local (see .env.example).
// Until a project id is set, the site shows the content in src/data/defaults.ts and /studio shows setup steps.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2026-09-01";
export const isSanityConfigured = projectId !== "";

// Server-only. A "Viewer" token, used to show drafts in the dashboard's live preview.
export const readToken = process.env.SANITY_API_READ_TOKEN ?? "";
