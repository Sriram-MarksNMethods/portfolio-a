import { Brush } from "@/components/Container";
import type { Section, Settings } from "@/data/types";
import { About } from "./About";
import { CaseStudies } from "./CaseStudies";
import { Contact } from "./Contact";
import { Hero } from "./Hero";
import { Insights } from "./Insights";
import { Resume } from "./Resume";
import { Ticker } from "./Ticker";

// Renders the home page's sections in the order she set in the dashboard.
// Paper sections that follow each other get a brush stroke between them.
const paperSections = ["aboutSection", "resumeSection", "caseStudiesSection", "insightsSection"];

export function Sections({ sections, settings }: { sections: Section[]; settings: Settings }) {
  return sections.map((section, i) => {
    const previous = sections[i - 1];
    const brush = previous && paperSections.includes(previous._type) && paperSections.includes(section._type) ? <Brush /> : null;

    switch (section._type) {
      case "heroSection":
        return <Hero key={section._key} section={section} settings={settings} />;
      case "tickerSection":
        return <Ticker key={section._key} section={section} />;
      case "aboutSection":
        return (
          <div key={section._key}>
            {brush}
            <About section={section} settings={settings} />
          </div>
        );
      case "resumeSection":
        return (
          <div key={section._key}>
            {brush}
            <Resume section={section} />
          </div>
        );
      case "caseStudiesSection":
        return (
          <div key={section._key}>
            {brush}
            <CaseStudies section={section} />
          </div>
        );
      case "insightsSection":
        return (
          <div key={section._key}>
            {brush}
            <Insights section={section} />
          </div>
        );
      case "contactSection":
        return <Contact key={section._key} section={section} settings={settings} />;
      default:
        return null;
    }
  });
}
