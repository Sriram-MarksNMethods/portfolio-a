"use client";

// The dashboard (Sanity Studio), served by this site at /studio.
import { defineConfig } from "sanity";
import { defineDocuments, defineLocations, presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "@/sanity/env";
import { schemaTypes, singletons } from "@/sanity/schema";

export default defineConfig({
  basePath: "/studio",
  title: "Portfolio dashboard",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter((template) => !singletons.includes(template.schemaType)),
  },
  document: {
    // the two one-off documents can't be duplicated or deleted
    actions: (actions, context) =>
      singletons.includes(context.schemaType) ? actions.filter(({ action }) => action !== "duplicate" && action !== "delete") : actions,
  },
  plugins: [
    // "Edit website": the live site, click any text to edit it
    presentationTool({
      title: "Edit website",
      previewUrl: { previewMode: { enable: "/api/draft-mode/enable" } },
      resolve: {
        mainDocuments: defineDocuments([
          { route: "/", filter: `_type == "homePage"` },
          { route: "/work/:slug", filter: `_type == "caseStudy" && slug.current == $slug` },
          { route: "/insights/:slug", filter: `_type == "post" && slug.current == $slug` },
        ]),
        locations: {
          settings: defineLocations({ message: "Used on every page", tone: "positive", locations: [{ title: "Home", href: "/" }] }),
          caseStudy: defineLocations({
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => ({ locations: [{ title: doc?.title || "Case study", href: `/work/${doc?.slug}` }] }),
          }),
          post: defineLocations({
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => ({ locations: [{ title: doc?.title || "Post", href: `/insights/${doc?.slug}` }, { title: "Insights", href: "/insights" }] }),
          }),
        },
      },
    }),
    // "Content": everything as lists and forms
    structureTool({
      title: "Content",
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem().title("Home page").id("homePage").child(S.document().schemaType("homePage").documentId("homePage")),
            S.documentTypeListItem("caseStudy").title("Case studies"),
            S.documentTypeListItem("post").title("Insights"),
            S.divider(),
            S.listItem().title("Site settings").id("settings").child(S.document().schemaType("settings").documentId("settings")),
          ]),
    }),
  ],
});
