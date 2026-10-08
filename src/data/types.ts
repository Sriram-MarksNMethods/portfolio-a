import type { PortableTextBlock } from "next-sanity";

// The shape of the content the pages render. It is the same whether it comes from the dashboard
// (src/sanity/queries.ts) or from the defaults (src/data/defaults.ts).

export type Img = { url: string; alt?: string; caption?: string; width?: number; height?: number };
export type Seo = { title?: string; description?: string; image?: string; noIndex?: boolean };

export type Settings = {
  name: string;
  role: string;
  location: string;
  menu: { label: string; href: string }[];
  hireLabel: string;
  email: string;
  phone: string;
  links: { label: string; url: string }[];
  siteTitle: string;
  siteDescription: string;
  shareImage?: string;
  siteUrl: string;
};

type Base = { _key: string; hidden?: boolean };

export type HeroSection = Base & {
  _type: "heroSection";
  year?: string;
  eyebrow?: string;
  bigWord1?: string;
  bigWord2?: string;
  buttonLabel?: string;
  card?: { title?: string; period?: string; stats?: { label?: string; value?: string; change?: string }[]; chip?: string };
};
export type TickerSection = Base & { _type: "tickerSection"; items?: string[] };
export type AboutSection = Base & {
  _type: "aboutSection";
  eyebrow?: string;
  heading?: string;
  text?: PortableTextBlock[];
  panel?: { title?: string; subtitle?: string; status?: string; facts?: { label?: string; value?: string }[]; tags?: string[] };
};
export type ResumeSection = Base & {
  _type: "resumeSection";
  educationHeading?: string;
  education?: { title?: string; detail?: string }[];
  expertiseHeading?: string;
  expertise?: string[];
  toolsHeading?: string;
  tools?: string[];
  experienceHeading?: string;
  experience?: { role?: string; place?: string; dates?: string }[];
  skillsHeading?: string;
  skills?: string[];
};
export type CaseStudiesSection = Base & { _type: "caseStudiesSection"; heading?: string; intro?: string; items?: CaseStudyCard[] };
export type InsightsSection = Base & { _type: "insightsSection"; heading?: string; intro?: string; count?: number; linkLabel?: string; posts?: PostCard[] };
export type ContactSection = Base & { _type: "contactSection"; heading?: string; text?: string; cardHeading?: string };

export type Section = HeroSection | TickerSection | AboutSection | ResumeSection | CaseStudiesSection | InsightsSection | ContactSection;

export type HomePage = { sections: Section[]; seo?: Seo };

export type CaseStudyCard = { slug: string; title: string; subtitle?: string; industry?: string; location?: string; duration?: string };
export type CaseStudy = CaseStudyCard & {
  client?: string;
  date?: string;
  overview?: PortableTextBlock[];
  screenshots?: Img[];
  strategyHeading?: string;
  strategy?: string[];
  resultsHeading?: string;
  results?: string[];
  seo?: Seo;
};

export type PostCard = { slug: string; title: string; date: string; excerpt?: string; cover?: Img; readMinutes?: number };
export type Post = PostCard & { body?: PortableTextBlock[]; seo?: Seo };
