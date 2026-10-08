import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stegaClean } from "next-sanity";
import { Brush, Container } from "@/components/Container";
import { RichText } from "@/components/RichText";
import { CaseStudyCardLink } from "@/components/sections/CaseStudies";
import type { Img } from "@/data/types";
import { buildMetadata } from "@/lib/seo";
import { getCaseStudies, getCaseStudy, getSettings, getSlugs } from "@/sanity/content";

export async function generateStaticParams() {
  return getSlugs("caseStudy");
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const [settings, study] = await Promise.all([getSettings(), getCaseStudy(slug)]);
  if (!study) return {};
  return buildMetadata({ settings, seo: study.seo, title: study.title, description: study.subtitle, path: `/work/${slug}` });
}

// "**2.6K to 8.1K**" → bold maroon numbers
function Highlighted({ text }: { text: string }) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") ? (
      <strong key={i} className="text-maroon-d">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

function Shot({ image }: { image: Img }) {
  return (
    <figure className="grid gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${image.url}?w=1600&fit=max&auto=format`}
        alt={stegaClean(image.alt) ?? ""}
        width={image.width}
        height={image.height}
        loading="lazy"
        className="h-auto w-full rounded-2xl border-[1.5px] border-maroon bg-white"
      />
      {image.caption && <figcaption className="text-sm text-mut">{image.caption}</figcaption>}
    </figure>
  );
}

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-3 font-head text-[clamp(30px,2.8vw,44px)] leading-tight font-normal text-maroon">{children}</h2>
);

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const [study, all] = await Promise.all([getCaseStudy(slug), getCaseStudies()]);
  if (!study) notFound();

  const [first, second, ...rest] = study.screenshots ?? [];
  const others = all.filter((s) => stegaClean(s.slug) !== slug).slice(0, 3);
  const details = [
    ["Client", study.client],
    ["Industry", study.industry],
    ["Location", study.location],
    ["Duration", study.duration],
  ].filter(([, value]) => value);

  return (
    <article className="pt-32 sm:pt-36 2xl:pt-40">
      <Container>
        <Link href="/#work" className="mb-5 inline-block font-bold text-maroon hover:underline">
          ← All case studies
        </Link>
      </Container>

      <header className="bg-maroon px-4 py-14 text-center text-white sm:py-20 lg:py-24">
        <h1 className="mx-auto max-w-[22ch] font-head text-[clamp(36px,5vw,84px)] leading-[1.05] font-normal text-balance">{study.title}</h1>
        {study.subtitle && <p className="mt-3 text-[clamp(16px,1.6vw,24px)] text-white/90">{study.subtitle}</p>}
      </header>

      <Container className="grid gap-12 pt-8 lg:gap-16">
        {details.length > 0 && (
          <dl className="grid gap-0.5 justify-self-start text-[17px] sm:justify-self-end 2xl:text-lg">
            {details.map(([label, value]) => (
              <div key={label}>
                <dt className="inline font-bold">{label}:</dt> <dd className="inline">{value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className={`grid items-center gap-10 ${first ? "lg:grid-cols-2" : ""}`}>
          {study.overview?.length ? (
            <div>
              <Heading>Overview</Heading>
              <RichText value={study.overview} className="max-w-[68ch]" />
            </div>
          ) : null}
          {first && <Shot image={first} />}
        </div>

        <div className={`grid items-center gap-10 ${second ? "lg:grid-cols-2" : ""}`}>
          {second && <Shot image={second} />}
          {!!study.strategy?.length && (
            <div>
              <Heading>{study.strategyHeading || "Strategy & Execution"}</Heading>
              <ul className="grid max-w-[68ch] list-disc gap-2 pl-6 text-[17px] 2xl:text-lg">
                {study.strategy.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {rest.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2">
            {rest.map((image, i) => (
              <Shot key={i} image={image} />
            ))}
          </div>
        )}

        {!!study.results?.length && (
          <div>
            <Heading>{study.resultsHeading || "Results"}</Heading>
            <ul className="grid max-w-[68ch] list-disc gap-2 pl-6 text-[17px] 2xl:text-lg">
              {study.results.map((item, i) => (
                <li key={i}>
                  <Highlighted text={item} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>

      {others.length > 0 && (
        <>
          <Brush />
          <Container>
            <h2 className="mb-6 font-head text-[clamp(32px,3.5vw,56px)] leading-none font-normal text-maroon">More case studies</h2>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {others.map((s) => (
                <CaseStudyCardLink key={s.slug} study={s} />
              ))}
            </div>
          </Container>
        </>
      )}
      <div className="h-20" />
    </article>
  );
}
