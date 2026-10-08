import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { readToken } from "@/sanity/env";
import { client } from "@/sanity/live";

// The dashboard's "Edit website" tab calls this to show drafts with click-to-edit.
export const { GET } = defineEnableDraftMode({ client: client.withConfig({ token: readToken }) });
