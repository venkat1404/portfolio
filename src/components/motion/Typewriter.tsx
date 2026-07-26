"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

type TypewriterProps = {
  text: string;
  /** Milliseconds per character. Lower = faster typing. */
  speed?: number;
  /** Milliseconds before typing starts after mount. */
  startDelay?: number;
  /** Show a blinking cursor while typing. Cursor disappears when done. */
  cursor?: boolean;
  className?: string;
};

// One-shot typewriter effect. Does not loop. Reduced-motion users get the
// full text instantly with no animation.
export function Typewriter({
  text,
  speed = 22,
  startDelay = 0,
  cursor = true,
  className,
}: TypewriterProps) {
  const shouldReduce = useReducedMotion();
  const [displayed, setDisplayed] = useState<string>(shouldReduce ? text : "");
  const [done, setDone] = useState<boolean>(!!shouldReduce);

  useEffect(() => {
    if (shouldReduce) return;

    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const startTimer = window.setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          if (interval) clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(startTimer);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay, shouldReduce]);

  return (
    <span className={className}>
      {displayed}
      {cursor && !done && (
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-current"
        />
      )}
    </span>
  );
}
