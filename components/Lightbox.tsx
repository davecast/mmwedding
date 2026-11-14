"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

export type GalleryItem = {
  id: string;
  alt: string;
  width: number;
  height: number;
  /** Image URL at (about) the given pixel width. */
  src: (width: number) => string;
  /** Link that downloads the original photo. */
  download: string;
};

const noop = () => () => {};
const ease = [0.25, 1, 0.5, 1] as const;
const btn =
  "grid size-11 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition-colors duration-150 hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95";

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);

/** Full-screen photo viewer: arrows, swipe, keyboard, thumbnail rail and download. */
export function Lightbox({ items, index, onIndex, onClose }: { items: GalleryItem[]; index: number | null; onIndex: (i: number) => void; onClose: () => void }) {
  const reduce = useReducedMotion();
  const client = useSyncExternalStore(noop, () => true, () => false); // portals need the DOM
  const open = index !== null;
  const dialog = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const count = items.length;

  const go = useCallback((d: number) => onIndex((((index ?? 0) + d) % count + count) % count), [index, count, onIndex]);

  // Lock page scroll and return focus to the tile that was opened
  useEffect(() => {
    if (!open) return;
    const before = document.activeElement as HTMLElement | null;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
      before?.focus?.();
    };
  }, [open]);

  // Keyboard: arrows, Escape, and a focus trap inside the dialog
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "Tab" && dialog.current) {
        const f = [...dialog.current.querySelectorAll<HTMLElement>("button, a[href]")].filter((el) => !el.hasAttribute("disabled"));
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, onClose]);

  // Focus the dialog on open, keep the active thumbnail in view, warm up neighbours
  useEffect(() => {
    if (!open) return;
    dialog.current?.querySelector<HTMLElement>("[data-close]")?.focus();
  }, [open]);
  useEffect(() => {
    if (index === null) return;
    rail.current?.querySelector<HTMLElement>('[aria-current="true"]')?.scrollIntoView({ inline: "center", block: "nearest", behavior: reduce ? "auto" : "smooth" });
    for (const d of [-1, 1]) {
      const n = items[(((index + d) % count) + count) % count];
      if (n) new Image().src = n.src(1600);
    }
  }, [index, items, count, reduce]);

  const item = index !== null ? items[index] : null;

  if (!client) return null;
  return createPortal(
    <AnimatePresence>
      {open && item && (
        <motion.div
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label="Galería de fotos"
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 text-white"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2, ease }}
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <p className="text-sm tabular-nums text-white/80" aria-live="polite">
              {(index ?? 0) + 1} / {count}
            </p>
            <div className="flex items-center gap-2">
              <a href={item.download} download className={btn} aria-label="Descargar esta foto">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
                </svg>
              </a>
              <button data-close onClick={onClose} className={btn} aria-label="Cerrar galería">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16"
            style={{ touchAction: "pan-y" }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
            onPointerDown={(e) => (touch.current = { x: e.clientX, y: e.clientY })}
            onPointerUp={(e) => {
              const s = touch.current;
              touch.current = null;
              if (!s) return;
              const dx = e.clientX - s.x;
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - s.y) * 1.5) go(dx < 0 ? 1 : -1);
            }}
          >
            {count > 1 && (
              <button onClick={() => go(-1)} className={`${btn} absolute left-2 z-10 max-sm:hidden sm:left-4`} aria-label="Foto anterior">
                <Chevron dir="left" />
              </button>
            )}
            <motion.img
              key={item.id}
              src={item.src(1600)}
              alt={item.alt}
              draggable={false}
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease }}
              className="max-h-full max-w-full select-none object-contain"
            />
            {count > 1 && (
              <button onClick={() => go(1)} className={`${btn} absolute right-2 z-10 max-sm:hidden sm:right-4`} aria-label="Foto siguiente">
                <Chevron dir="right" />
              </button>
            )}
          </div>

          {count > 1 && (
            <div ref={rail} className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:thin]" role="group" aria-label="Todas las fotos">
              {items.map((it, n) => (
                <button
                  key={it.id}
                  onClick={() => onIndex(n)}
                  aria-label={`Ver foto ${n + 1} de ${count}`}
                  aria-current={n === index}
                  className={`relative h-14 w-14 shrink-0 cursor-pointer overflow-hidden transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-white sm:h-16 sm:w-16 ${
                    n === index ? "opacity-100 ring-2 ring-white" : "opacity-55 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- already resized by the image host */}
                  <img src={it.src(160)} alt="" loading="lazy" draggable={false} className="size-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
