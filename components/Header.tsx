"use client";

import { useEffect, useState } from "react";

const links = [
  ["Home", "#hero"],
  ["Our Story", "#loveline"],
  ["The Wedding", "#the-wedding"],
  ["Location", "#location"],
  ["Gallery", "#gallery"],
  ["Blog", "#blog"],
  ["RSVP", "#rsvp"],
] as const;

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        solid || open ? "bg-slate/95 shadow-lg backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#hero" className="font-serif text-xl italic text-white">Neela</a>
        <nav className="hidden md:block">
          <ul className="flex gap-8 text-[11px] uppercase tracking-[0.2em] text-white">
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="opacity-80 transition-opacity hover:opacity-100">{label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="grid size-10 place-items-center text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-px w-6 bg-white shadow-[0_7px_0_#fff,0_-7px_0_#fff]" />
        </button>
      </div>
      {open && (
        <ul className="border-t border-white/20 px-5 pb-4 text-xs uppercase tracking-[0.2em] text-white md:hidden">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)} className="block py-3">{label}</a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
