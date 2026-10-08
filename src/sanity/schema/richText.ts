import { defineArrayMember, defineType } from "sanity";

// Simple text editor: paragraphs, bold, italic, links. Used for the About text.
export const simpleText = defineType({
  name: "simpleText",
  title: "Text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [{ name: "link", type: "object", title: "Link", fields: [{ name: "href", type: "url", title: "Link" }] }],
      },
    }),
  ],
});

// Full editor for insight posts and case-study overviews: headings, lists, quotes, images.
export const richText = defineType({
  name: "richText",
  title: "Text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Small heading", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [{ name: "link", type: "object", title: "Link", fields: [{ name: "href", type: "url", title: "Link" }] }],
      },
    }),
    defineArrayMember({
      type: "image",
      fields: [
        { name: "alt", type: "string", title: "Image description", description: "What the image shows (for Google and screen readers)." },
        { name: "caption", type: "string", title: "Caption" },
      ],
    }),
  ],
});
