import type { PortableTextBlock } from "next-sanity";
import type { CaseStudy, HomePage, Post, Settings } from "./types";

// PLACEHOLDER content. The site shows it until the dashboard is connected, and scripts/seed-sanity.mts
// copies it into the dashboard once so she starts from a filled-in site instead of a blank one.
// "Meera Iyer" and every number below are examples, not real data.

// A paragraph for the text editor. Wrap words in **double stars** to make them bold.
let keyCount = 0;
const key = () => `k${(keyCount++).toString(36)}`;
function paragraph(text: string, style = "normal"): PortableTextBlock {
  const children = text.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((part) => ({
    _type: "span",
    _key: key(),
    text: part.replace(/^\*\*|\*\*$/g, ""),
    marks: part.startsWith("**") ? ["strong"] : [],
  }));
  return { _type: "block", _key: key(), style, markDefs: [], children };
}

export const defaultSettings: Settings = {
  name: "Meera Iyer",
  role: "SEO & Organic Growth Specialist",
  location: "Hyderabad · works remote",
  menu: [
    { label: "About", href: "/#about" },
    { label: "Résumé", href: "/#resume" },
    { label: "Work", href: "/#work" },
    { label: "Insights", href: "/insights" },
  ],
  hireLabel: "Hire me",
  email: "hello@meeraiyer.com",
  phone: "+91 00000 00000",
  links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/meeraiyer" }],
  siteTitle: "Meera Iyer · SEO Specialist",
  siteDescription: "SEO specialist helping businesses get found on Google: technical SEO, local SEO, Google Business Profile and content strategy.",
  // until she sets Site settings → Website address: the live Vercel address, or localhost when running locally
  siteUrl: process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000",
};

export const defaultCaseStudies: CaseStudy[] = [
  {
    slug: "saas-organic-clicks",
    title: "From 2.6K to 8.1K Monthly Organic Clicks",
    subtitle: "Technical SEO & Topic Cluster Strategy",
    client: "Confidential",
    industry: "B2B SaaS",
    location: "India",
    duration: "Jan – Jun 2026",
    date: "2026-06-30",
    overview: [
      paragraph(
        "The site had good content but Google was indexing less than half of it. The goal was to fix crawling and indexing first, then build topic clusters around the product's main use cases.",
      ),
    ],
    strategyHeading: "Strategy & Execution",
    strategy: [
      "Fixed canonical and redirect problems across 1,200 URLs",
      "Rebuilt internal linking around 5 core topics",
      "Briefed and published 40 cluster articles",
      "Improved titles and meta descriptions on top pages",
    ],
    resultsHeading: "Results",
    results: [
      "Monthly organic clicks grew from **2.6K to 8.1K**",
      "Average position improved from **19.2 to 8.4**",
      "Indexed pages went from **1,900 to 4,300**",
      "Demo requests from organic search **doubled**",
    ],
  },
  {
    slug: "clinic-map-pack",
    title: "Map Pack Rankings for 9 Clinic Branches",
    subtitle: "Local SEO & Google Business Profile",
    client: "Confidential",
    industry: "Healthcare",
    location: "Hyderabad",
    duration: "4 months",
    date: "2026-04-30",
    overview: [
      paragraph("A clinic chain with nine branches showed up in the map pack for only a handful of searches. Each branch needed its own strong local presence."),
    ],
    strategyHeading: "Strategy & Execution",
    strategy: [
      "Cleaned up and completed all 9 Google Business Profiles",
      "Built a location page for every branch",
      "Fixed name, address and phone details across 60 directories",
      "Set up a simple review request routine for each branch",
    ],
    resultsHeading: "Results",
    results: ["Map-pack keywords grew from **4 to 37**", "Calls from search went from **210 to 640** a month", "Direction requests up **2.4×**"],
  },
  {
    slug: "ecommerce-indexing",
    title: "11,900 Pages Indexed After a Crawl Clean-up",
    subtitle: "Technical SEO & Site Architecture",
    client: "Confidential",
    industry: "D2C ecommerce",
    location: "UK",
    duration: "3 months",
    date: "2026-02-28",
    overview: [paragraph("Filter and sort pages were creating thousands of near-duplicate URLs, so Google was wasting its time and skipping real product pages.")],
    strategyHeading: "Strategy & Execution",
    strategy: ["Blocked crawl traps from filter and sort parameters", "Rebuilt the category structure and breadcrumbs", "Added product structured data", "Split the sitemap by section and kept it clean"],
    resultsHeading: "Results",
    results: ["Indexed pages went from **3,400 to 11,900**", "Crawl errors dropped from **1,284 to 83**", "Organic revenue up **58%**"],
  },
];

export const defaultPosts: Post[] = [
  {
    slug: "ai-overviews-click-through",
    title: "What AI Overviews did to our click-through rates",
    date: "2026-09-12",
    excerpt: "Impressions went up, clicks went down. Here is what changed across six client sites, and what helped.",
    body: [
      paragraph("Placeholder post. Replace it from the dashboard: Content → Insights."),
      paragraph("What changed", "h2"),
      paragraph("Write the post here. Use **bold** for key numbers, headings to break it up, and images for screenshots."),
    ],
  },
  {
    slug: "migration-checklist",
    title: "A site migration checklist I actually use",
    date: "2026-08-28",
    excerpt: "Redirect maps, staging checks and the first two weeks after launch, step by step.",
    body: [paragraph("Placeholder post. Replace it from the dashboard: Content → Insights.")],
  },
];

export const defaultHome: HomePage = {
  sections: [
    {
      _type: "heroSection",
      _key: "hero",
      year: "2026",
      eyebrow: "SEO & Organic Growth Specialist",
      bigWord1: "port",
      bigWord2: "folio",
      buttonLabel: "See case studies",
      card: {
        title: "Search performance",
        period: "last 6 months",
        stats: [
          { label: "Total clicks", value: "48.2K", change: "+212%" },
          { label: "Impressions", value: "1.31M", change: "+164%" },
          { label: "Avg CTR", value: "3.7%", change: "+0.6 pts" },
          { label: "Avg position", value: "8.4", change: "from 19.2" },
        ],
        chip: 'position #1 · "seo specialist hyderabad"',
      },
    },
    { _type: "tickerSection", _key: "ticker", items: ["Technical SEO", "Local SEO", "Google Business Profile", "Content Strategy"] },
    {
      _type: "aboutSection",
      _key: "about",
      eyebrow: "About me",
      heading: "HELLO!",
      text: [
        paragraph("I'm **Meera Iyer**, an **SEO specialist** with **6 years** of experience in organic growth. I work across **technical SEO, local SEO, Google Business Profile** and content strategy."),
        paragraph("I help businesses **show up when customers search**, turn that visibility into **calls, leads and sales**, and report on it in plain numbers."),
      ],
      panel: {
        title: "Meera Iyer",
        subtitle: "SEO specialist in Hyderabad, India",
        status: "Open to work",
        facts: [
          { label: "Experience", value: "6 years" },
          { label: "Focus", value: "Technical & local SEO" },
          { label: "Works with", value: "SaaS, D2C, local businesses" },
          { label: "Languages", value: "English, Hindi, Telugu" },
          { label: "Replies", value: "Within 24 hours" },
        ],
        tags: ["Technical SEO", "Local SEO", "GBP", "Content"],
      },
    },
    {
      _type: "resumeSection",
      _key: "resume",
      educationHeading: "Education & Certification",
      education: [
        { title: "B.Com, Marketing", detail: "Osmania University · 2019" },
        { title: "Google Analytics Certification", detail: "Google · 2024" },
        { title: "Technical SEO Course", detail: "Placeholder Academy · 2025" },
      ],
      expertiseHeading: "Core Expertise",
      expertise: ["Technical & on-page SEO", "Local SEO & Google Maps", "Google Business Profile", "Keyword research & content briefs", "Citations & link building"],
      toolsHeading: "Tools & Platforms",
      tools: ["Search Console", "GA4", "Ahrefs", "Semrush", "Screaming Frog", "WordPress", "Looker Studio"],
      experienceHeading: "Work Experience",
      experience: [
        { role: "Senior SEO Specialist", place: "B2B SaaS company · Remote", dates: "Jan 2024 – Present" },
        { role: "SEO Executive", place: "Digital agency · Hyderabad", dates: "Mar 2021 – Dec 2023" },
        { role: "Content & SEO Associate", place: "D2C brand · Bengaluru", dates: "Jun 2020 – Feb 2021" },
        { role: "Freelance SEO Consultant", place: "Local businesses · India & UK", dates: "2020 – Present" },
      ],
      skillsHeading: "Soft Skills",
      skills: ["Clear reporting for non-technical clients", "Prioritising by impact", "Attention to detail", "Working with writers and developers"],
    },
    { _type: "caseStudiesSection", _key: "work", heading: "Case Studies", intro: "Real projects, real numbers. Each one opens as a full page." },
    { _type: "insightsSection", _key: "insights", heading: "Insights", intro: "Notes from the work: what changed in search and what I'd do about it.", count: 3, linkLabel: "All posts" },
    {
      _type: "contactSection",
      _key: "contact",
      heading: "Thank You!",
      text: "Have a site that should be getting more traffic, or a role I'd fit? Reach out on any of these and I'll reply within a day.",
      cardHeading: "Get in Touch!",
    },
  ],
};
