"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type HeroRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

// Above-the-fold reveal — plays immediately on load, not on scroll.
// Total sequence should stay under 600ms per spec §9.
export function HeroReveal({ children, delay = 0, className }: HeroRevealProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
