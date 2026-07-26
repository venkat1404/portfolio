"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FilterChipProps = {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
};

// Toggleable pill for filter controls. Renders as a real <button> for
// accessibility. Visual state driven entirely by `active`.
export function FilterChip({
  active,
  onClick,
  children,
  className,
}: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-9 items-center rounded-full border px-4 text-sm transition-colors duration-[var(--duration-fast)]",
        active
          ? "border-accent bg-accent text-accent-contrast"
          : "border-border text-secondary hover:border-border-strong hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}
