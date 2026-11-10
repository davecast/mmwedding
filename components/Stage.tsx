"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { createContext, useContext, type ReactNode } from "react";

const PointerCtx = createContext<{ x: MotionValue<number>; y: MotionValue<number> } | null>(null);

/**
 * A timeline collage. Tracks the pointer across the stage (-1 … 1 on each axis,
 * smoothed by a spring) so each <Depth> child can drift toward or away from it.
 */
export function Stage({ className, children }: { className?: string; children: ReactNode }) {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 55, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 55, damping: 18, mass: 0.6 });

  return (
    <PointerCtx.Provider value={{ x, y }}>
      <div
        className={className}
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          rawX.set(((e.clientX - r.left) / r.width) * 2 - 1);
          rawY.set(((e.clientY - r.top) / r.height) * 2 - 1);
        }}
        onPointerLeave={() => {
          rawX.set(0);
          rawY.set(0);
        }}
      >
        {children}
      </div>
    </PointerCtx.Provider>
  );
}

/** Moves with the pointer. Positive depth follows it, negative moves against it. */
export function Depth({ d, className, children }: { d: number; className?: string; children: ReactNode }) {
  const ctx = useContext(PointerCtx);
  const fallback = useMotionValue(0);
  const x = useTransform(ctx?.x ?? fallback, (v) => v * d * 3.5);
  const y = useTransform(ctx?.y ?? fallback, (v) => v * d * 3.5);
  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  );
}
