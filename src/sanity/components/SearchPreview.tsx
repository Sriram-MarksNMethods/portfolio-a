"use client";

import { type ObjectInputProps, useFormValue } from "sanity";

type SeoValue = { title?: string; description?: string };

const cut = (text: string, max: number) => (text.length > max ? `${text.slice(0, max)}…` : text);

// The normal SEO fields, plus a live preview of how the page looks in Google search results.
export function SearchPreview(props: ObjectInputProps<SeoValue>) {
  const pageTitle = useFormValue(["title"]) as string | undefined;
  const slug = useFormValue(["slug", "current"]) as string | undefined;
  const docType = useFormValue(["_type"]) as string | undefined;

  const title = props.value?.title || pageTitle || "Page title";
  const description = props.value?.description || "Add a meta description to control the text Google shows here.";
  const path = docType === "caseStudy" ? ` › work › ${slug ?? ""}` : docType === "post" ? ` › insights › ${slug ?? ""}` : "";
  const host = typeof window === "undefined" ? "" : window.location.host;

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div style={{ border: "1px solid rgba(128,128,128,.35)", borderRadius: 8, padding: 16, fontFamily: "arial, sans-serif", display: "grid", gap: 4 }}>
        <span style={{ fontSize: 11, opacity: 0.6, textTransform: "uppercase", letterSpacing: ".06em" }}>Google preview</span>
        <span style={{ fontSize: 13, opacity: 0.75 }}>{host + path}</span>
        <span style={{ fontSize: 19, color: "#4b6bfb", lineHeight: 1.3 }}>{cut(title, 60)}</span>
        <span style={{ fontSize: 13.5, opacity: 0.8, lineHeight: 1.5 }}>{cut(description, 160)}</span>
      </div>
      {props.renderDefault(props)}
    </div>
  );
}
