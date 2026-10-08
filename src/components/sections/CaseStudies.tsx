import Link from "next/link";
import { stegaClean } from "next-sanity";
import { Container } from "@/components/Container";
import type { CaseStudiesSection, CaseStudyCard } from "@/data/types";

export function CaseStudyCardLink({ study }: { study: CaseStudyCard }) {
  return (
    <Link
      href={`/work/${stegaClean(study.slug)}`}
      className="group grid grid-rows-[auto_1fr] overflow-hidden rounded-[18px] border-[1.5px] border-maroon bg-white transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-22px_rgba(111,44,59,0.55)]"
    >
      <div className="grid min-h-40 content-end gap-1.5 bg-maroon px-5 py-6 text-white 2xl:min-h-48 2xl:px-7">
        <b className="font-head text-[clamp(24px,2.2vw,34px)] leading-[1.08] font-normal">{study.title}</b>
        <small className="text-[13.5px] opacity-85 2xl:text-base">{study.subtitle}</small>
      </div>
      <div className="grid gap-1 px-5 pt-4 pb-5 text-sm 2xl:px-7 2xl:text-base">
        {study.industry && (
          <span>
            <b>Industry:</b> {study.industry}
          </span>
        )}
        {study.location && (
          <span>
            <b>Location:</b> {study.location}
          </span>
        )}
        {study.duration && (
          <span>
            <b>Duration:</b> {study.duration}
          </span>
        )}
        <span className="mt-2 font-bold text-maroon">
          Read case study <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}

export function CaseStudies({ section }: { section: CaseStudiesSection }) {
  const items = section.items ?? [];
  if (!items.length) return null;
  return (
    <section id="work">
      <Container>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-head text-[clamp(40px,5vw,80px)] leading-none font-normal text-maroon">{section.heading}</h2>
          {section.intro && <p className="max-w-[42ch] text-mut 2xl:text-lg">{section.intro}</p>}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((study) => (
            <CaseStudyCardLink key={study.slug} study={study} />
          ))}
        </div>
      </Container>
    </section>
  );
}
