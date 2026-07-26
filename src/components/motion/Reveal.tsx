"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  className?: string;
};

// Reveal-on-scroll wrapper. Fade + subtle rise, triggered once at ~20% viewport
// entry. Reduced-motion users get content instantly with no animation.
export function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
}: RevealProps) {
  const shouldReduce = useReducedMotion();
  const MotionTag = motion[as];

  if (shouldReduce) {
    const Tag = as as keyof React.JSX.IntrinsicElements;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
