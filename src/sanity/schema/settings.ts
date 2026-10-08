import { defineArrayMember, defineField, defineType } from "sanity";

// One "Site settings" document: her details, the header menu, contact info and the default SEO.
export const settings = defineType({
  name: "settings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "about", title: "About you", default: true },
    { name: "menu", title: "Header menu" },
    { name: "contact", title: "Contact" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "name", title: "Your name", type: "string", group: "about", validation: (rule) => rule.required() }),
    defineField({ name: "role", title: "Job title", type: "string", group: "about", description: "e.g. SEO & Organic Growth Specialist" }),
    defineField({ name: "location", title: "Location", type: "string", group: "about", description: "e.g. Hyderabad · works remote" }),

    defineField({
      name: "menu",
      title: "Menu links",
      type: "array",
      group: "menu",
      description: "Use #about, #resume, #work or #contact to jump to a section of the home page, or a page like /insights.",
      of: [
        defineArrayMember({
          type: "object",
          name: "menuLink",
          fields: [
            defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "href", title: "Link", type: "string", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({ name: "hireLabel", title: "Button text", type: "string", group: "menu", description: "The highlighted button. It jumps to the Get in Touch section." }),

    defineField({ name: "email", title: "Email", type: "string", group: "contact" }),
    defineField({ name: "phone", title: "Phone / WhatsApp", type: "string", group: "contact" }),
    defineField({
      name: "links",
      title: "Profile links",
      type: "array",
      group: "contact",
      description: "LinkedIn, Behance, X… shown in the Get in Touch box.",
      of: [
        defineArrayMember({
          type: "object",
          name: "profileLink",
          fields: [
            defineField({ name: "label", title: "Name", type: "string", description: "e.g. LinkedIn", validation: (rule) => rule.required() }),
            defineField({ name: "url", title: "Link", type: "url", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        }),
      ],
    }),

    defineField({ name: "siteTitle", title: "Website title", type: "string", group: "seo", description: "Added after each page title in Google, e.g. “Case study | Meera Iyer”." }),
    defineField({ name: "siteDescription", title: "Default description", type: "text", rows: 3, group: "seo", description: "Used when a page has no meta description of its own." }),
    defineField({ name: "shareImage", title: "Default share image", type: "image", group: "seo", description: "1200 × 630. Used when a page has no share image of its own." }),
    defineField({ name: "siteUrl", title: "Website address", type: "url", group: "seo", description: "e.g. https://meeraiyer.com — used for the sitemap and Google." }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
