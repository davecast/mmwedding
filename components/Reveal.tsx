"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "fade";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 36, y: 0 },
  right: { x: -36, y: 0 },
  fade: { x: 0, y: 0 },
};

/**
 * Scroll-triggered entrance. `from` is where the element comes from.
 * Ease-out, under 700ms, plays once, skipped for reduced-motion users.
 */
export function Reveal({
  children,
  from = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  from?: Direction;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const { x, y } = offsets[from];
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.65, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
}
