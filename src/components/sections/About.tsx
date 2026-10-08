import { stegaClean } from "next-sanity";
import { Container } from "@/components/Container";
import { RichText } from "@/components/RichText";
import type { AboutSection, Settings } from "@/data/types";

// "About me / HELLO!" with the text, and an info card styled like Google's knowledge panel
// (instead of a photo, which she doesn't want on the site).
export function About({ section, settings }: { section: AboutSection; settings: Settings }) {
  const panel = section.panel;
  const linkedIn = settings.links.find((link) => /linkedin/i.test(stegaClean(link.label)));

  return (
    <section id="about" className="pt-16 lg:pt-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-16 2xl:gap-24">
        <div className="min-w-0">
          <p className="font-head text-2xl text-maroon 2xl:text-3xl">{section.eyebrow}</p>
          <h2 className="mt-1 mb-4 font-head text-[clamp(64px,8vw,140px)] leading-[0.95] font-normal text-maroon">{section.heading}</h2>
          <RichText value={section.text} className="max-w-[62ch]" />
        </div>

        {panel && (
          <aside aria-label="Profile summary" className="overflow-hidden rounded-[22px] border-[1.5px] border-maroon bg-white shadow-[0_30px_60px_-35px_rgba(111,44,59,0.6)]">
            <div className="relative bg-maroon px-6 pt-6 pb-5 text-white sm:px-7">
              {/* faint rising line, echoing the cover card */}
              <svg viewBox="0 0 300 80" className="absolute right-0 bottom-0 h-full w-2/3 opacity-25" aria-hidden="true" preserveAspectRatio="none">
                <path d="M0,70 C50,68 80,62 120,52 S200,30 240,20 S280,10 300,6" fill="none" stroke="#fff" strokeWidth="2.5" />
              </svg>
              <h3 className="relative font-head text-[clamp(30px,3vw,44px)] leading-none font-normal">{panel.title}</h3>
              <p className="relative mt-2 text-white/85">{panel.subtitle}</p>
              {panel.status && (
                <span className="relative mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-bold text-maroon">
                  <span className="size-2 rounded-full bg-emerald-600" aria-hidden="true" />
                  {panel.status}
                </span>
              )}
            </div>

            {/* quick actions, like the buttons on a Google Business Profile */}
            <div className="grid grid-cols-3 border-b border-dashed border-maroon/35 text-center text-sm font-bold text-maroon">
              <a href={`mailto:${stegaClean(settings.email)}`} className="py-3.5 hover:bg-rose">
                Email
              </a>
              {linkedIn ? (
                <a href={stegaClean(linkedIn.url)} target="_blank" rel="noopener" className="border-x border-dashed border-maroon/35 py-3.5 hover:bg-rose">
                  {linkedIn.label}
                </a>
              ) : (
                <a href="#resume" className="border-x border-dashed border-maroon/35 py-3.5 hover:bg-rose">
                  Résumé
                </a>
              )}
              <a href="#work" className="py-3.5 hover:bg-rose">
                Case studies
              </a>
            </div>

            <dl className="grid gap-3 px-6 py-5 text-[15px] sm:px-7 2xl:text-base">
              {panel.facts?.map((fact, i) => (
                <div key={i} className="grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] gap-3">
                  <dt className="font-bold">{fact.label}</dt>
                  <dd className="text-mut">{fact.value}</dd>
                </div>
              ))}
            </dl>

            {!!panel.tags?.length && (
              <div className="flex flex-wrap gap-2 px-6 pb-6 sm:px-7">
                {panel.tags.map((tag, i) => (
                  <span key={i} className="rounded-full border border-maroon/40 bg-paper px-3 py-1 text-sm font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </aside>
        )}
      </Container>
    </section>
  );
}
