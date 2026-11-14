"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  ["Inicio", "#hero"],
  ["Nuestra historia", "#loveline"],
  ["La boda", "#the-wedding"],
  ["Ubicación", "#location"],
  ["Galería", "#gallery"],
  ["Asistencia", "#rsvp"],
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
        solid || open ? "bg-deep/95 shadow-lg backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-center px-5 max-md:justify-end">
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] text-on-deep">
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="opacity-80 transition-opacity hover:opacity-100">{label}</a>
              </li>
            ))}
            <li className="flex"><ThemeToggle /></li>
          </ul>
        </nav>
        <button
          className="grid size-10 place-items-center text-on-deep md:hidden"
          aria-label="Abrir o cerrar el menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-px w-6 bg-on-deep shadow-[0_7px_0_var(--on-deep),0_-7px_0_var(--on-deep)]" />
        </button>
      </div>
      {open && (
        <ul className="border-t border-on-deep/20 px-5 pb-4 text-xs uppercase tracking-[0.2em] text-on-deep md:hidden">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)} className="block py-3">{label}</a>
            </li>
          ))}
          <li><ThemeToggle withLabel /></li>
        </ul>
      )}
    </header>
  );
}
