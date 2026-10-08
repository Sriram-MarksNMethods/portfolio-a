import { stegaClean } from "next-sanity";
import { Container } from "@/components/Container";
import type { ContactSection, Settings } from "@/data/types";

function Row({ icon, label, value, href }: { icon: string; label: string; value: string; href?: string }) {
  const inner = (
    <>
      <span aria-hidden="true" className="grid size-12 flex-none place-items-center rounded-xl bg-maroon text-lg font-bold text-white">
        {icon}
      </span>
      <span className="min-w-0">
        <small className="block text-[13px] text-mut">{label}</small>
        <b className="block text-[clamp(17px,1.5vw,22px)] [overflow-wrap:anywhere]">{value}</b>
      </span>
    </>
  );
  const className = "flex items-center gap-4 border-t border-dashed border-maroon/35 pt-4";
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" className={`${className} transition-colors hover:text-maroon`}>
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  );
}

// The last section ("Hire me" jumps here): Thank You! and the Get in Touch card.
export function Contact({ section, settings }: { section: ContactSection; settings: Settings }) {
  return (
    <section id="contact" className="mt-20 bg-maroon py-16 text-white sm:py-20 lg:mt-28 lg:py-28">
      <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <h2 className="font-head text-[clamp(64px,9vw,160px)] leading-[0.95] font-normal">{section.heading}</h2>
          {section.text && <p className="mt-5 max-w-[38ch] text-[clamp(17px,1.4vw,22px)] text-white/90">{section.text}</p>}
        </div>

        <div className="grid gap-4 rounded-[22px] bg-paper p-6 text-ink shadow-[0_30px_60px_-30px_rgba(30,5,12,0.6)] sm:p-9">
          <h3 className="font-head text-[clamp(30px,3vw,44px)] leading-none font-normal text-maroon">{section.cardHeading}</h3>
          {settings.phone && <Row icon="✆" label="Phone / WhatsApp" value={settings.phone} href={`tel:${stegaClean(settings.phone).replace(/[^\d+]/g, "")}`} />}
          {settings.email && <Row icon="✉" label="Email" value={settings.email} href={`mailto:${stegaClean(settings.email)}`} />}
          {settings.links.map((link, i) => (
            <Row key={i} icon={stegaClean(link.label).slice(0, 2).toLowerCase() === "li" ? "in" : "↗"} label={link.label} value={stegaClean(link.url).replace(/^https?:\/\/(www\.)?/, "")} href={stegaClean(link.url)} />
          ))}
        </div>
      </Container>
    </section>
  );
}
