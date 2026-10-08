"use client";

import Link from "next/link";
import { stegaClean } from "next-sanity";
import { useEffect, useState } from "react";
import type { Settings } from "@/data/types";

// Floating maroon pill at the top. Shrinks a little once you scroll; on phones the links open from a menu button.
export function Header({ settings }: { settings: Settings }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-[max(12px,env(safe-area-inset-top))] z-50 flex justify-center px-3">
      <nav
        aria-label="Main"
        className={`relative flex w-full max-w-[min(1320px,100%)] items-center justify-between gap-4 rounded-full bg-maroon text-white shadow-[0_18px_40px_-18px_rgba(60,15,28,0.65)] ring-1 ring-white/10 transition-all duration-300 ${
          scrolled ? "py-2.5 pr-2.5 pl-6 lg:max-w-[min(1180px,100%)]" : "py-3.5 pr-3.5 pl-7 lg:py-4 lg:pr-4 lg:pl-9"
        }`}
      >
        <Link href="/" onClick={close} className="font-head text-[clamp(26px,2.6vw,40px)] leading-none tracking-wide uppercase">
          {settings.name}
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {settings.menu.map((item) => (
            <Link key={item.label} href={stegaClean(item.href)} className="rounded-full px-4 py-2.5 text-[17px] font-semibold text-white/85 xl:px-5 2xl:text-lg transition-colors hover:bg-white/10 hover:text-white">
              {item.label}
            </Link>
          ))}
          <Link href="/#contact" className="ml-3 rounded-full bg-white px-7 py-3.5 text-[17px] font-bold text-maroon 2xl:text-lg transition-transform hover:-translate-y-0.5">
            {settings.hireLabel}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-12 items-center gap-2 rounded-full bg-white px-5 text-base font-bold text-maroon md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>

        {open && (
          <div id="mobile-menu" className="absolute inset-x-0 top-[calc(100%+10px)] grid gap-1 rounded-3xl bg-maroon p-3 shadow-[0_24px_50px_-20px_rgba(60,15,28,0.7)] md:hidden">
            {settings.menu.map((item) => (
              <Link key={item.label} href={stegaClean(item.href)} onClick={close} className="rounded-2xl px-4 py-3 text-lg font-semibold hover:bg-white/10">
                {item.label}
              </Link>
            ))}
            <Link href="/#contact" onClick={close} className="mt-1 rounded-2xl bg-white px-4 py-3 text-center text-lg font-bold text-maroon">
              {settings.hireLabel}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
