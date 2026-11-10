"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { setLoaderReady } from "./loader";
import { isOptedOut, tryPlay } from "./music";

const MIN_MS = 2400; // long enough for a leaf to complete a fall

/** Leaf outline with a midrib, drawn to follow currentColor. */
function Leaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 48" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 2C6 12 3 26 9 37c3 5 7 8 7 8s4-3 7-8c6-11 3-25-7-35z" fill="currentColor" fillOpacity="0.18" />
      <path d="M16 6v40M16 18l-6-5M16 26l-8-6M16 34l-6-5M16 18l6-5M16 26l8-6M16 34l6-5" />
    </svg>
  );
}

const leaves = [
  { left: "50%", size: "w-10", dur: 5.2, delay: 0, sway: 46 },
  { left: "36%", size: "w-6", dur: 6.4, delay: 1.2, sway: 30 },
  { left: "63%", size: "w-7", dur: 5.8, delay: 2.1, sway: 36 },
];

/**
 * Loading screen: leaves drift down while fonts and images load, then the whole
 * screen dissolves to reveal the page. Held for at least MIN_MS so it never just flashes.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);

  const finish = () => {
    document.documentElement.style.overflow = "";
    setLoaderReady();
    setDone(true);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = "hidden";

    const loaded = new Promise<void>((res) => {
      if (document.readyState === "complete") res();
      else window.addEventListener("load", () => res(), { once: true });
    });
    const fonts = document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve();
    const minimum = new Promise<void>((res) => setTimeout(res, reduce ? 600 : MIN_MS));
    // Never trap the visitor if something stalls
    const safety = new Promise<void>((res) => setTimeout(res, 9000));

    let cancelled = false;
    Promise.race([Promise.all([loaded, fonts, minimum]), safety]).then(() => {
      if (cancelled) return;
      // Start the song as the page is revealed. If the browser blocks sound until a gesture,
      // ask for one tap on the loading screen so the music still starts by default.
      if (isOptedOut()) return finish();
      tryPlay().then((ok) => {
        if (cancelled) return;
        if (ok) finish();
        else setNeedsTap(true);
      });
    });
    return () => {
      cancelled = true;
      root.style.overflow = "";
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          id="preloader"
          role="status"
          aria-label="Loading"
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-deep text-line-deep"
          exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
        >
          {!reduce &&
            leaves.map((l, i) => (
              <motion.div
                key={i}
                className="absolute top-0"
                style={{ left: l.left }}
                initial={{ y: "-14vh", opacity: 0 }}
                animate={{
                  y: ["-14vh", "112vh"],
                  x: [0, l.sway, -l.sway, l.sway * 0.8, -l.sway * 0.5, 0],
                  rotate: [-18, 24, -28, 18, -12, 20],
                  opacity: [0, 1, 1, 1, 1, 0.9],
                }}
                transition={{ duration: l.dur, delay: l.delay, repeat: Infinity, ease: "easeInOut" }}
              >
                <Leaf className={l.size} />
              </motion.div>
            ))}

          <div className="relative text-center text-on-deep">
            <p className="font-serif text-4xl sm:text-5xl">María <span className="italic text-line-deep">&amp;</span> Malguin</p>
            {needsTap ? (
              <button
                onClick={() => {
                  tryPlay();
                  finish();
                }}
                className="btn mt-8 cursor-pointer text-on-deep! text-base"
                autoFocus
              >
                Enter
              </button>
            ) : (
              <p className="mt-3 text-[11px] uppercase tracking-[0.35em] opacity-70">Getting ready</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
