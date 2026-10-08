"use client";

import { stegaClean } from "next-sanity";
import { useEffect, useRef } from "react";
import type { HeroSection } from "@/data/types";

// The animated Search Console-style card in the cover (where the portrait was in the reference design).
// The line draws itself and the numbers count up from 0 once the page opens.

type Card = NonNullable<HeroSection["card"]>;

// "48.2K" → 48.2 with prefix "", suffix "K", 1 decimal. Values that aren't numbers are shown as they are.
function parseValue(value: string) {
  const match = value.match(/^([^\d-]*)(-?[\d,]*\.?\d+)(.*)$/);
  if (!match) return null;
  const number = Number(match[2].replaceAll(",", ""));
  const decimals = match[2].split(".")[1]?.length ?? 0;
  return { prefix: match[1], number, suffix: match[3], decimals };
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // in the dashboard preview the text carries hidden edit markers: leave it alone so click-to-edit keeps working
    if (stegaClean(value) !== value) return;
    const parsed = parseValue(value);
    const el = ref.current;
    if (!parsed || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const start = performance.now() + 300;
    const tick = (now: number) => {
      const progress = Math.min(Math.max((now - start) / 2200, 0), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${parsed.prefix}${(parsed.number * eased).toFixed(parsed.decimals)}${parsed.suffix}`;
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <span ref={ref}>{value}</span>;
}

const tileColours = ["bg-maroon text-white", "bg-maroon-d text-white", "bg-rose text-maroon-d", "bg-paper-2 text-ink"];

export function GrowthCard({ card }: { card: Card }) {
  const stats = card.stats ?? [];
  return (
    <div className="relative rotate-0 rounded-[18px] bg-white p-4 text-ink shadow-[0_30px_60px_-25px_rgba(30,5,12,0.55)] sm:p-5 lg:rotate-[1.5deg] 2xl:p-7">
      <div className="mb-3 flex items-baseline justify-between gap-2 text-[12.5px] text-mut 2xl:text-sm">
        <b className="text-[15px] text-ink 2xl:text-lg">{card.title}</b>
        <span>{card.period}</span>
      </div>

      {stats.length > 0 && (
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className={`rounded-[10px] px-2.5 py-2 tabular-nums ${tileColours[i % 4]}`}>
              <small className="block text-[10.5px] leading-tight opacity-85 2xl:text-xs">{stat.label}</small>
              <strong className="mt-0.5 block text-[clamp(17px,1.6vw,26px)] leading-tight font-extrabold">
                {stat.value ? <CountUp value={stat.value} /> : null}
              </strong>
              <em className="text-[10.5px] font-semibold not-italic 2xl:text-xs">{stat.change}</em>
            </div>
          ))}
        </div>
      )}

      <svg viewBox="0 0 420 160" className="mt-2.5 block h-auto w-full" aria-hidden="true">
        <g stroke="#ebe8e4" strokeWidth="1">
          <line x1="0" y1="20" x2="420" y2="20" />
          <line x1="0" y1="70" x2="420" y2="70" />
          <line x1="0" y1="120" x2="420" y2="120" />
        </g>
        <path
          className="animate-fade-in opacity-0"
          d="M0,128 C40,126 60,130 90,118 S150,112 180,100 S240,88 270,70 S330,52 360,40 S400,26 420,22 L420,140 L0,140 Z"
          fill="#8a3a4b"
          fillOpacity=".1"
        />
        <path
          className="animate-draw [stroke-dasharray:1000] [stroke-dashoffset:1000]"
          d="M0,128 C40,126 60,130 90,118 S150,112 180,100 S240,88 270,70 S330,52 360,40 S400,26 420,22"
          fill="none"
          stroke="#8a3a4b"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          className="animate-draw [stroke-dasharray:1000] [stroke-dashoffset:1000] [animation-delay:0.6s]"
          d="M0,134 C60,132 100,128 150,122 S230,108 280,96 S360,80 420,70"
          fill="none"
          stroke="#c99aa4"
          strokeWidth="2"
          strokeDasharray="4 5"
        />
      </svg>

      {/* phones: under the chart · large screens: hanging off the card's left edge */}
      {card.chip && (
        <div className="relative mt-3 w-fit origin-center -rotate-[3deg] animate-pop rounded-[10px] bg-ink px-3 py-2 font-mono text-[11px] text-white opacity-0 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.5)] sm:text-xs lg:absolute lg:bottom-8 lg:-left-6 lg:mt-0">
          {card.chip}
        </div>
      )}
    </div>
  );
}
