import { defineField, defineType } from "sanity";
import { SearchPreview } from "../components/SearchPreview";

// "SEO" box shown on the home page, every case study and every insights post (like Yoast in WordPress).
// Leave a field empty to use the page's own title / summary.
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: false },
  components: { input: SearchPreview },
  fields: [
    defineField({
      name: "title",
      title: "Meta title",
      type: "string",
      description: "Shown as the blue link in Google. Aim for 50–60 characters.",
      validation: (rule) => rule.max(70).warning("Google usually cuts titles after about 60 characters."),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      description: "The grey text under the link in Google. Aim for 120–160 characters.",
      validation: (rule) => rule.max(170).warning("Google usually cuts descriptions after about 160 characters."),
    }),
    defineField({
      name: "image",
      title: "Share image",
      type: "image",
      description: "Shown when the page is shared on LinkedIn, WhatsApp, X… Best size 1200 × 630.",
    }),
    defineField({
      name: "noIndex",
      title: "Hide this page from Google",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
