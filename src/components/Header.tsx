"use client";

import Link from "next/link";
import { stegaClean } from "next-sanity";
import { useEffect, useState } from "react";
import type { Settings } from "@/data/types";

// Floating maroon pill at the top. Shrinks a little once you scroll.
// Phones and tablets: the links open in a full-screen menu from the Menu button.
export function Header({ settings }: { settings: Settings }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // while the menu is open: no page scrolling behind it, Esc closes it, and it closes if the screen gets wide
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = () => wide.matches && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const close = () => setOpen(false);
  const links = settings.menu.map((item) => ({ label: item.label, href: stegaClean(item.href) }));
  const slideIn = (i: number) => ({
    style: { transitionDelay: open ? `${80 + i * 60}ms` : "0ms" },
    className: `transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
  });

  return (
    <header className="fixed inset-x-0 top-[max(12px,env(safe-area-inset-top))] z-50 flex justify-center px-3">
      {/* full-screen menu (phones and tablets) */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-0 flex flex-col bg-maroon px-6 pt-32 pb-[max(32px,env(safe-area-inset-bottom))] text-white transition-[opacity,visibility] duration-300 sm:px-12 sm:pt-40 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Menu" className="grid">
          {links.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={close}
              style={slideIn(i).style}
              className={`border-b border-white/15 py-4 font-head text-[clamp(44px,11vw,88px)] leading-none uppercase ${slideIn(i).className}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={slideIn(links.length).style} className={`mt-auto grid gap-4 pt-8 sm:flex sm:items-center sm:justify-between ${slideIn(links.length).className}`}>
          <Link href="/#contact" onClick={close} className="rounded-full bg-white px-8 py-4 text-center text-xl font-bold text-maroon">
            {settings.hireLabel}
          </Link>
          {settings.email && <span className="text-center text-lg text-white/80">{settings.email}</span>}
        </div>
      </div>

      <nav
        aria-label="Main"
        className={`relative flex w-full max-w-[min(1320px,100%)] items-center justify-between gap-4 rounded-full bg-maroon text-white ring-1 ring-white/10 transition-all duration-300 ${
          open ? "" : "shadow-[0_18px_40px_-18px_rgba(60,15,28,0.65)]"
        } ${scrolled ? "py-2.5 pr-2.5 pl-6 lg:max-w-[min(1180px,100%)]" : "py-3.5 pr-3.5 pl-7 lg:py-4 lg:pr-4 lg:pl-9"}`}
      >
        <Link href="/" onClick={close} className="font-head text-[clamp(26px,2.6vw,40px)] leading-none tracking-wide uppercase">
          {settings.name}
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((item) => (
            <Link key={item.label} href={item.href} className="rounded-full px-4 py-2.5 text-[17px] font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white xl:px-5 2xl:text-lg">
              {item.label}
            </Link>
          ))}
          <Link href="/#contact" className="ml-3 rounded-full bg-white px-7 py-3.5 text-[17px] font-bold text-maroon transition-transform hover:-translate-y-0.5 2xl:text-lg">
            {settings.hireLabel}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-12 items-center gap-2 rounded-full bg-white px-5 text-base font-bold text-maroon lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>
    </header>
  );
}
