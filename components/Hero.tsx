"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { useLoaderReady } from "./loader";
import { Mask } from "./Mask";

const WEDDING = new Date("2027-09-24T15:00:00").getTime();

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  if (now === null) return null;
  const diff = Math.max(0, WEDDING - now);
  return [
    ["Days", Math.floor(diff / 864e5)],
    ["Hours", Math.floor(diff / 36e5) % 24],
    ["Minutes", Math.floor(diff / 6e4) % 60],
    ["Seconds", Math.floor(diff / 1e3) % 60],
  ] as const;
}

const ease = [0.25, 1, 0.5, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const countdown = useCountdown();
  const ready = useLoaderReady();
  const a = (x: number, y: number, delay: number) => ({
    initial: reduce ? false : { opacity: 0, x, y },
    animate: ready || reduce ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section id="hero" className="edge-bottom relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-deep text-center text-on-deep">
      <video
        className="absolute inset-0 size-full object-cover"
        poster="/images/hero-img2.jpg"
        autoPlay muted loop playsInline
      >
        <source src="/images/landscape.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-deep/55" />
      <div className="relative px-5 pb-24 pt-28">
        <motion.div {...a(0, -16, 0.6)} className="mb-6 flex justify-center">
          <Mask src="/images/separatostop.svg" w={126} h={17} className="w-40 text-on-deep sm:w-52" />
        </motion.div>
        <h1 className="flex flex-wrap items-baseline justify-center gap-x-[0.25em] text-[clamp(2.75rem,8.5vw,6.5rem)]">
          <motion.span {...a(40, 0, 0.3)}>María</motion.span>
          <motion.small {...a(0, -20, 0.3)} className="font-serif text-[0.5em] italic text-on-deep">&amp;</motion.small>
          <motion.span {...a(-40, 0, 0.3)}>Malguin</motion.span>
        </h1>
        <motion.div {...a(0, 16, 0.6)} className="mt-6 flex justify-center">
          <Mask src="/images/separatostop.svg" w={126} h={17} className="w-40 -scale-y-100 text-on-deep sm:w-52" />
        </motion.div>
        <motion.p {...a(0, -12, 0.75)} className="mt-6 text-sm uppercase tracking-[0.3em]">Are getting married in</motion.p>
        <motion.div {...a(0, 16, 0.8)} className="mt-8 flex justify-center gap-5 sm:gap-10" aria-live="off">
          {(countdown ?? [["Days", 0], ["Hours", 0], ["Minutes", 0], ["Seconds", 0]] as const).map(([label, value]) => (
            <div key={label} className="min-w-14">
              <div className="font-serif text-4xl tabular-nums sm:text-5xl">{String(value).padStart(2, "0")}</div>
              <div className="text-[10px] uppercase tracking-[0.25em] opacity-80">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
