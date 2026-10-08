import { Fragment } from "react";
import type { TickerSection } from "@/data/types";

// The maroon band with words scrolling past. The list is repeated so the loop is seamless.
export function Ticker({ section }: { section: TickerSection }) {
  const items = section.items ?? [];
  if (!items.length) return null;
  const run = (copy: number) =>
    items.map((item, i) => (
      <Fragment key={`${copy}-${i}`}>
        <span>{item}</span>
        <span className="mx-6 opacity-80">✦</span>
      </Fragment>
    ));

  return (
    <div className="overflow-hidden border-t border-white/20 bg-maroon py-5 text-white" aria-label={items.join(", ")}>
      <div className="inline-flex animate-marquee items-center text-[clamp(20px,2.4vw,34px)] font-medium tracking-wide whitespace-nowrap uppercase" aria-hidden="true">
        {run(0)}
        {run(1)}
        {run(2)}
        {run(3)}
      </div>
    </div>
  );
}
