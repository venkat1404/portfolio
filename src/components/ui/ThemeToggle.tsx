"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import {
  applyTheme,
  getStoredTheme,
  setStoredTheme,
  type Theme,
} from "@/lib/theme";
import { cn } from "@/lib/cn";

// Two-icon inline toggle. Rendered under a client boundary.
// The `themeScript` in layout.tsx has already set the initial class before
// this ever mounts, so we sync from that DOM state rather than storage.
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredTheme();
    const initial: Theme = stored
      ? stored
      : document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    setTheme(initial);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setStoredTheme(next);
    applyTheme(next);
  }

  const nextLabel = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${nextLabel} theme`}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full border border-border text-secondary",
        "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]",
        "hover:border-border-strong hover:text-foreground",
        className,
      )}
    >
      {mounted ? (
        theme === "dark" ? (
          <Sun aria-hidden strokeWidth={1.5} className="size-4" />
        ) : (
          <Moon aria-hidden strokeWidth={1.5} className="size-4" />
        )
      ) : (
        <span aria-hidden className="size-4" />
      )}
    </button>
  );
}
