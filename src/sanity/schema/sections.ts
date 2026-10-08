import { defineArrayMember, defineField, defineType } from "sanity";

// The home page is built from these sections. In the dashboard she can add, remove, drag to reorder,
// or tick "Hide this section" on any of them.

const hidden = defineField({
  name: "hidden",
  title: "Hide this section",
  type: "boolean",
  initialValue: false,
  description: "Keeps the section in the dashboard but takes it off the website.",
});

const stringList = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: "array", description, of: [defineArrayMember({ type: "string" })] });

const sectionPreview = (label: string, field = "heading") => ({
  select: { heading: field, hidden: "hidden" },
  prepare: ({ heading, hidden: isHidden }: { heading?: string; hidden?: boolean }) => ({
    title: label,
    subtitle: `${isHidden ? "Hidden · " : ""}${heading ?? ""}`,
  }),
});

export const heroSection = defineType({
  name: "heroSection",
  title: "Cover",
  type: "object",
  fields: [
    defineField({ name: "year", title: "Tab label", type: "string", description: "Small text on the folder tab, e.g. 2026" }),
    defineField({ name: "eyebrow", title: "Line above the big word", type: "string", description: "e.g. SEO & Organic Growth Specialist" }),
    defineField({ name: "bigWord1", title: "Big word, line 1", type: "string", description: "e.g. port" }),
    defineField({ name: "bigWord2", title: "Big word, line 2", type: "string", description: "e.g. folio" }),
    defineField({ name: "buttonLabel", title: "Button text", type: "string", description: "Jumps to the case studies, e.g. See case studies" }),
    defineField({
      name: "card",
      title: "Growth card",
      type: "object",
      description: "The animated Search Console-style card on the right.",
      fields: [
        defineField({ name: "title", type: "string", description: "e.g. Search performance" }),
        defineField({ name: "period", type: "string", description: "e.g. last 6 months" }),
        defineField({
          name: "stats",
          title: "Numbers",
          type: "array",
          description: "Up to 4. The value can be a number like 48.2K, 1.31M, 3.7% or 8.4; it counts up when the page opens.",
          validation: (rule) => rule.max(4),
          of: [
            defineArrayMember({
              type: "object",
              name: "stat",
              fields: [
                defineField({ name: "label", type: "string", description: "e.g. Total clicks" }),
                defineField({ name: "value", type: "string", description: "e.g. 48.2K" }),
                defineField({ name: "change", type: "string", description: "e.g. +212%" }),
              ],
              preview: { select: { title: "label", subtitle: "value" } },
            }),
          ],
        }),
        defineField({ name: "chip", title: "Black label", type: "string", description: 'e.g. position #1 · "seo specialist hyderabad"' }),
      ],
    }),
    hidden,
  ],
  preview: sectionPreview("Cover", "eyebrow"),
});

export const tickerSection = defineType({
  name: "tickerSection",
  title: "Scrolling band",
  type: "object",
  fields: [stringList("items", "Words", "Each one scrolls past with a ✦ between them."), hidden],
  preview: {
    select: { items: "items", hidden: "hidden" },
    prepare: ({ items, hidden: isHidden }: { items?: string[]; hidden?: boolean }) => ({
      title: "Scrolling band",
      subtitle: `${isHidden ? "Hidden · " : ""}${(items ?? []).join(" ✦ ")}`,
    }),
  },
});

export const aboutSection = defineType({
  name: "aboutSection",
  title: "About me",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Small heading", type: "string", description: "e.g. About me" }),
    defineField({ name: "heading", title: "Big heading", type: "string", description: "e.g. HELLO!" }),
    defineField({ name: "text", type: "simpleText" }),
    defineField({
      name: "panel",
      title: "Info card",
      type: "object",
      description: "The card next to the text, styled like Google's info panel.",
      fields: [
        defineField({ name: "title", type: "string", description: "Usually your name" }),
        defineField({ name: "subtitle", type: "string", description: "e.g. SEO specialist in Hyderabad" }),
        defineField({ name: "status", type: "string", description: "Green label, e.g. Open to work" }),
        defineField({
          name: "facts",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "fact",
              fields: [
                defineField({ name: "label", type: "string", description: "e.g. Experience" }),
                defineField({ name: "value", type: "string", description: "e.g. 6 years" }),
              ],
              preview: { select: { title: "label", subtitle: "value" } },
            }),
          ],
        }),
        stringList("tags", "Tags", "Small pills at the bottom, e.g. Local SEO"),
      ],
    }),
    hidden,
  ],
  preview: sectionPreview("About me"),
});

export const resumeSection = defineType({
  name: "resumeSection",
  title: "Résumé",
  type: "object",
  fields: [
    defineField({ name: "educationHeading", title: "Education heading", type: "string" }),
    defineField({
      name: "education",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "educationItem",
          fields: [
            defineField({ name: "title", type: "string", description: "e.g. Google Analytics Certification" }),
            defineField({ name: "detail", type: "string", description: "e.g. Google · 2024" }),
          ],
          preview: { select: { title: "title", subtitle: "detail" } },
        }),
      ],
    }),
    defineField({ name: "expertiseHeading", title: "Expertise heading", type: "string" }),
    stringList("expertise", "Expertise"),
    defineField({ name: "toolsHeading", title: "Tools heading", type: "string" }),
    stringList("tools", "Tools"),
    defineField({ name: "experienceHeading", title: "Experience heading", type: "string" }),
    defineField({
      name: "experience",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "job",
          fields: [
            defineField({ name: "role", type: "string" }),
            defineField({ name: "place", type: "string", description: "e.g. Digital agency · Hyderabad" }),
            defineField({ name: "dates", type: "string", description: "e.g. Mar 2021 – Dec 2023" }),
          ],
          preview: { select: { title: "role", subtitle: "place" } },
        }),
      ],
    }),
    defineField({ name: "skillsHeading", title: "Soft skills heading", type: "string" }),
    stringList("skills", "Soft skills"),
    hidden,
  ],
  preview: sectionPreview("Résumé", "experienceHeading"),
});

export const caseStudiesSection = defineType({
  name: "caseStudiesSection",
  title: "Case studies",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "intro", type: "text", rows: 2 }),
    defineField({
      name: "items",
      title: "Which case studies",
      type: "array",
      description: "Leave empty to show all of them, newest first.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "caseStudy" }] })],
    }),
    hidden,
  ],
  preview: sectionPreview("Case studies"),
});

export const insightsSection = defineType({
  name: "insightsSection",
  title: "Insights",
  type: "object",
  fields: [
    defineField({ name: "heading", type: "string" }),
    defineField({ name: "intro", type: "text", rows: 2 }),
    defineField({ name: "count", title: "How many posts", type: "number", initialValue: 3, validation: (rule) => rule.min(1).max(12) }),
    defineField({ name: "linkLabel", title: "Link text", type: "string", description: "Link to all posts, e.g. All posts" }),
    hidden,
  ],
  preview: sectionPreview("Insights"),
});

export const contactSection = defineType({
  name: "contactSection",
  title: "Get in Touch",
  type: "object",
  description: "The last section. Phone, email and links come from Site settings → Contact.",
  fields: [
    defineField({ name: "heading", type: "string", description: "e.g. Thank You!" }),
    defineField({ name: "text", type: "text", rows: 3 }),
    defineField({ name: "cardHeading", title: "Card heading", type: "string", description: "e.g. Get in Touch!" }),
    hidden,
  ],
  preview: sectionPreview("Get in Touch"),
});

export const sectionTypes = [heroSection, tickerSection, aboutSection, resumeSection, caseStudiesSection, insightsSection, contactSection];
