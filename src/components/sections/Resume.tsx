import { Container } from "@/components/Container";
import type { ResumeSection } from "@/data/types";

function Box({ heading, children }: { heading?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[18px] border-[1.5px] border-maroon bg-white/60 px-6 py-5 sm:px-7 sm:py-6">
      <h3 className="mb-4 font-head text-[clamp(26px,2.2vw,34px)] leading-tight font-normal text-maroon">{heading}</h3>
      {children}
    </div>
  );
}

function Bullets({ items }: { items?: string[] }) {
  return <ul className="grid list-disc gap-1 pl-5 2xl:text-lg">{items?.map((item, i) => <li key={i}>{item}</li>)}</ul>;
}

// The résumé grid: two columns of boxes joined by a thin line, like the printed portfolio.
export function Resume({ section }: { section: ResumeSection }) {
  return (
    <section id="resume" aria-label="Résumé">
      <Container className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_24px_minmax(0,1fr)] lg:gap-x-3">
        <div className="grid content-start gap-5">
          <Box heading={section.educationHeading}>
            <div className="grid gap-3.5 2xl:text-lg">
              {section.education?.map((item, i) => (
                <div key={i}>
                  <b className="block">{item.title}</b>
                  {item.detail}
                </div>
              ))}
            </div>
          </Box>
          <Box heading={section.expertiseHeading}>
            <Bullets items={section.expertise} />
          </Box>
          <Box heading={section.toolsHeading}>
            <div className="flex flex-wrap gap-2">
              {section.tools?.map((tool, i) => (
                <span key={i} className="rounded-full border border-maroon/40 bg-white px-3 py-1 text-sm font-semibold 2xl:text-base">
                  {tool}
                </span>
              ))}
            </div>
          </Box>
        </div>

        {/* the joining line */}
        <div aria-hidden="true" className="relative hidden lg:block">
          <span className="absolute top-0 left-1/2 size-2 -translate-x-1/2 rounded-full bg-maroon" />
          <span className="absolute top-1.5 bottom-1.5 left-1/2 w-[1.5px] -translate-x-1/2 bg-maroon" />
        </div>

        <div className="grid content-start gap-5">
          <Box heading={section.experienceHeading}>
            <div className="grid">
              {section.experience?.map((job, i) => (
                <div key={i} className="border-b border-dashed border-maroon/35 py-3.5 first:pt-0 last:border-0 last:pb-0 2xl:text-lg">
                  <b className="block">{job.role}</b>
                  <span className="block text-mut">{job.place}</span>
                  <span className="block text-mut">{job.dates}</span>
                </div>
              ))}
            </div>
          </Box>
          <Box heading={section.skillsHeading}>
            <Bullets items={section.skills} />
          </Box>
        </div>
      </Container>
    </section>
  );
}
