import Link from "next/link";
import { Container } from "@/components/Container";
import { GrowthCard } from "@/components/GrowthCard";
import type { HeroSection, Settings } from "@/data/types";

// The maroon folder cover: tab with the year, role line, giant two-line word, and the growth card.
export function Hero({ section, settings }: { section: HeroSection; settings: Settings }) {
  return (
    <section aria-label="Cover" className="pt-32 sm:pt-36 2xl:pt-44">
      <Container>
        <div className="relative mt-14 grid items-center gap-10 rounded-tr-[34px] bg-maroon px-5 pt-9 pb-10 text-white sm:px-10 sm:pt-12 lg:grid-cols-[1.15fr_1fr] lg:gap-8 lg:px-14 lg:pb-14 2xl:px-20 2xl:pb-20">
          {/* folder tab */}
          <div
            aria-hidden="true"
            className="absolute -top-[54px] left-0 h-14 w-[min(340px,55%)] rounded-t-[30px] bg-maroon [clip-path:polygon(0_0,82%_0,100%_100%,0_100%)]"
          />
          <span className="absolute -top-10 left-6 text-[26px] font-bold tracking-wider sm:left-9">{section.year}</span>

          <div className="min-w-0">
            <p className="mb-2 ml-1 text-[clamp(17px,1.8vw,28px)] font-bold">{section.eyebrow}</p>
            <h1 className="m-0 text-[clamp(96px,26vw,150px)] lg:text-[clamp(120px,13vw,250px)] leading-[0.8] font-bold tracking-[-0.06em]" aria-label={`${section.bigWord1 ?? ""}${section.bigWord2 ?? ""}`}>
              <span className="block bg-[linear-gradient(90deg,#fff_0%,#ead6db_45%,#b77d8b_100%)] bg-clip-text text-transparent">{section.bigWord1}</span>
              <span className="block bg-[linear-gradient(90deg,#b77d8b_0%,#ead6db_55%,#fff_100%)] bg-clip-text pl-[0.42em] text-transparent">{section.bigWord2}</span>
            </h1>
            <div className="mt-6 ml-1 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px] 2xl:text-lg">
              <strong className="text-lg 2xl:text-xl">{settings.name}</strong>
              <span>{settings.location}</span>
              {section.buttonLabel && (
                <Link href="#work" className="rounded-full bg-white px-5 py-2.5 font-bold text-maroon transition-transform hover:-translate-y-0.5">
                  {section.buttonLabel}
                </Link>
              )}
            </div>
          </div>

          {section.card && <GrowthCard card={section.card} />}
        </div>
      </Container>
    </section>
  );
}
