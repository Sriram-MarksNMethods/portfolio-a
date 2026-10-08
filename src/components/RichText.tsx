import { createImageUrlBuilder } from "@sanity/image-url";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "next-sanity";
import { dataset, projectId } from "@/sanity/env";

const imageUrl = createImageUrlBuilder({ projectId: projectId || "unset", dataset });

type InlineImage = { asset?: { _ref: string }; alt?: string; caption?: string };

// Text written in the dashboard's editor (About text, case-study overviews, insight posts).
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2 className="mt-4 font-head text-[clamp(28px,3vw,40px)] leading-tight font-normal text-maroon">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-2 text-xl font-bold">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="border-y border-maroon/30 py-4 font-head text-[clamp(22px,2vw,30px)] leading-snug text-maroon">{children}</blockquote>,
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener" className="font-semibold text-maroon underline underline-offset-4">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value: InlineImage }) =>
      value.asset ? (
        <figure className="my-2 grid gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl.image(value).width(1600).fit("max").auto("format").url()}
            alt={value.alt ?? ""}
            loading="lazy"
            className="w-full rounded-2xl border-[1.5px] border-maroon bg-white"
          />
          {value.caption && <figcaption className="text-sm text-mut">{value.caption}</figcaption>}
        </figure>
      ) : null,
  },
};

export function RichText({ value, className = "" }: { value?: PortableTextBlock[]; className?: string }) {
  if (!value?.length) return null;
  return (
    <div className={`grid gap-4 text-[17px] leading-relaxed 2xl:text-lg [&_strong]:font-bold ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  );
}
