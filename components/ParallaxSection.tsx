"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, type ReactNode } from "react";

/**
 * Section with a photo that drifts slower than the page.
 * A spring smooths the scroll input; reduced-motion users get a still image.
 */
export function ParallaxSection({
  id,
  src,
  overlay = "bg-deep/65",
  flip = false,
  position = "center",
  className = "",
  children,
}: {
  id?: string;
  src: string;
  overlay?: string;
  /** Mirror the photo horizontally. */
  flip?: boolean;
  /** CSS object-position for the photo, e.g. "top". */
  position?: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const y = useTransform(smooth, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} id={id} className={`relative isolate overflow-hidden bg-deep ${className}`}>
      <motion.div aria-hidden className="absolute inset-x-0 -inset-y-[15%] -z-10" style={reduce ? undefined : { y }}>
        <Image src={src} alt="" fill sizes="100vw" className={`object-cover ${flip ? "-scale-x-100" : ""}`} style={{ objectPosition: position }} />
      </motion.div>
      <div aria-hidden className={`absolute inset-0 -z-10 ${overlay}`} />
      {children}
    </section>
  );
}
