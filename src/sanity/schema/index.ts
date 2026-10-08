import { caseStudy, homePage, post } from "./documents";
import { richText, simpleText } from "./richText";
import { sectionTypes } from "./sections";
import { seo } from "./seo";
import { settings } from "./settings";

export const schemaTypes = [settings, homePage, caseStudy, post, seo, simpleText, richText, ...sectionTypes];

// Documents there is exactly one of (no "create new", no delete).
export const singletons = ["settings", "homePage"];
