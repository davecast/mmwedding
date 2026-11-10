"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Mask } from "./Mask";

const quotes = [
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius ante libero, a sollicitudin elit malesuada et. Nulla facilisi. Pellentesque magna diam, mattis a gravida eget, lobortis ut velit. Nam interdum hendrerit nisl et malesuada. Nulla facilisis velit neque, sed ultrices nibh facilisis non.",
    name: "John Doe",
    role: "Best Man",
  },
  {
    text: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.",
    name: "Emily Garcia",
    role: "Maid of Honour",
  },
  {
    text: "Aenean aliquam augue turpis, in tempor elit condimentum sit amet. Phasellus a sapien tincidunt nunc dapibus mollis. Etiam ultricies bibendum sodales. Nulla libero tortor, auctor at elit ut, pharetra placerat libero.",
    name: "Rachel Harris",
    role: "Bridesmaid",
  },
];

const leaf = "pointer-events-none absolute hidden w-[22rem] max-w-none select-none opacity-25 text-on-band md:block";

/** Quote slider on a warm sand band, shown between the bridesmaids and groomsmen. */
export function Testimonials() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % quotes.length), 7000);
    return () => clearInterval(id);
  }, [reduce, paused]);

  const q = quotes[i];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Words from the wedding party"
      className="relative overflow-hidden bg-band px-5 py-20 text-center text-on-band"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Mask src="/images/detailsleaf.svg" w={857} h={585} className={`${leaf} -left-24 top-0`} />
      <Mask src="/images/detailsleaf.svg" w={857} h={585} className={`${leaf} -right-24 top-0 -scale-x-100`} />

      <div className="relative mx-auto grid max-w-5xl grid-cols-[auto_1fr_auto] items-start gap-4 md:gap-8">
        <span aria-hidden className="font-serif text-8xl font-black leading-[0.8] text-on-band/35 md:text-[9rem]">“</span>

        <div className="min-h-[19rem] md:min-h-[16rem]" aria-live={paused ? "polite" : "off"}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            >
              <p className="mx-auto max-w-3xl pt-3 text-[15px] leading-relaxed md:text-base">{q.text}</p>
              <h3 className="mt-12 text-4xl">{q.name}</h3>
              <div aria-hidden className="mx-auto my-3 h-px w-16 bg-on-band/40" />
              <p className="text-sm italic text-on-band/90">{q.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <span aria-hidden className="font-serif text-8xl font-black leading-[0.8] text-on-band/35 md:text-[9rem]">”</span>
      </div>

      <div className="relative mt-4 flex justify-center gap-2">
        {quotes.map((_, n) => (
          <button
            key={n}
            onClick={() => setI(n)}
            aria-label={`Show quote ${n + 1} of ${quotes.length}`}
            aria-current={n === i}
            className="group grid h-6 w-9 cursor-pointer place-items-center"
          >
            <span className={`h-[3px] rounded-full transition-all duration-300 ${n === i ? "w-6 bg-on-band" : "w-5 bg-on-band/45 group-hover:bg-on-band/80"}`} />
          </button>
        ))}
      </div>
    </section>
  );
}
