import { defineArrayMember, defineField, defineType } from "sanity";
import { sectionTypes } from "./sections";

// One "Home page" document: the list of sections, in order.
export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({
      name: "sections",
      type: "array",
      description: "Drag to reorder. Use “Add item” for a new section.",
      of: sectionTypes.map((section) => defineArrayMember({ type: section.name })),
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "content", description: "The headline result, e.g. From 2.6K to 8.1K Monthly Organic Clicks", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Page address", type: "slug", group: "content", options: { source: "title", maxLength: 80 }, validation: (rule) => rule.required() }),
    defineField({ name: "subtitle", type: "string", group: "content", description: "e.g. Technical SEO & Topic Cluster Strategy" }),
    defineField({ name: "date", title: "Date (for sorting)", type: "date", group: "content" }),
    defineField({ name: "client", type: "string", group: "content", description: "e.g. Confidential" }),
    defineField({ name: "industry", type: "string", group: "content" }),
    defineField({ name: "location", type: "string", group: "content" }),
    defineField({ name: "duration", type: "string", group: "content", description: "e.g. Jan – Jun 2026" }),
    defineField({ name: "overview", type: "richText", group: "content" }),
    defineField({
      name: "screenshots",
      type: "array",
      group: "content",
      description: "Search Console, Ahrefs, GBP insights… The first one sits under the overview, the second next to the strategy, the rest in a grid.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "What it shows" },
            { name: "caption", type: "string", title: "Caption" },
          ],
        }),
      ],
    }),
    defineField({ name: "strategyHeading", title: "Strategy heading", type: "string", group: "content", initialValue: "Strategy & Execution" }),
    defineField({ name: "strategy", type: "array", group: "content", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "resultsHeading", title: "Results heading", type: "string", group: "content", initialValue: "Results" }),
    defineField({
      name: "results",
      type: "array",
      group: "content",
      description: "Write numbers in **double stars** to highlight them, e.g. Clicks grew from **2.6K to 8.1K**",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "industry", media: "screenshots.0" } },
});

export const post = defineType({
  name: "post",
  title: "Insight",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Page address", type: "slug", group: "content", options: { source: "title", maxLength: 80 }, validation: (rule) => rule.required() }),
    defineField({ name: "date", type: "date", group: "content", initialValue: () => new Date().toISOString().slice(0, 10), validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", title: "Short summary", type: "text", rows: 3, group: "content", description: "Shown in the post list." }),
    defineField({ name: "cover", title: "Cover image", type: "image", group: "content", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "What it shows" }] }),
    defineField({ name: "body", type: "richText", group: "content" }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "date", media: "cover" } },
});
