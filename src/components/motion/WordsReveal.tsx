"use client";

import { motion, useReducedMotion } from "motion/react";

type WordsRevealProps = {
  children: string;
  /** Seconds before the first word starts animating. */
  delayStart?: number;
  /** Seconds between each word's start. */
  stagger?: number;
  /** Duration of each word's fade-in. */
  duration?: number;
  className?: string;
};

// Splits a string on whitespace and animates each word in with a stagger.
// Meant for hero-scale display type where each word can carry weight.
// SSR-safe: motion inlines the initial style so there's no flash of visible
// content before the animation starts. Reduced-motion renders the string
// as-is with no animation.
export function WordsReveal({
  children,
  delayStart = 0,
  stagger = 0.12,
  duration = 0.5,
  className,
}: WordsRevealProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <span className={className}>{children}</span>;
  }

  const words = children.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration,
            delay: delayStart + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}
