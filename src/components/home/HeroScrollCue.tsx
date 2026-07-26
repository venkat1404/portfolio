"use client";

import Link from "next/link";
import { ArrowDown, Cat, Wrench } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

// Small scroll affordance at the bottom of the hero. Composes Lucide's Cat +
// Wrench so it reads as a small engineer-cat mascot without turning into a
// full illustration. Fades in after the hero CTAs (delay ~2.7s to match the
// end of the hero sequence). Reduced-motion users get it instantly.
export function HeroScrollCue() {
  const shouldReduce = useReducedMotion();

  const content = (
    <Link
      href="#projects"
      className="group inline-flex flex-col items-center gap-3 text-muted transition-colors hover:text-secondary"
      aria-label="Scroll to featured projects"
    >
      <span className="flex items-center gap-2.5">
        {/* Cat with a tiny wrench in the paw. Absolute-positioned wrench so
            it reads as an accessory, not a second glyph. */}
        <span className="relative inline-flex text-secondary">
          <Cat strokeWidth={1.5} aria-hidden className="size-6" />
          <Wrench
            strokeWidth={1.5}
            aria-hidden
            className="absolute -bottom-0.5 -right-1.5 size-3 rotate-[35deg] text-accent"
          />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest">
          Curiosity killed the cat. Scroll anyway.
        </span>
      </span>
      <ArrowDown
        strokeWidth={1.5}
        aria-hidden
        className="size-3.5 transition-transform group-hover:translate-y-0.5"
      />
    </Link>
  );

  if (shouldReduce) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 7.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {content}
    </motion.div>
  );
}
