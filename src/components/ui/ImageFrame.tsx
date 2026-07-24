import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ImageFrameProps = {
  children: ReactNode;
  aspect?: "16/9" | "4/3" | "1/1" | "3/2";
  chrome?: boolean;
  className?: string;
};

// Consistent frame around project imagery. Optional browser-chrome bar for
// UI screenshots. Handles rounded corners, hairline border, and a faint
// accent glow that reads as "premium card" without being loud.
export function ImageFrame({
  children,
  aspect = "16/9",
  chrome = false,
  className,
}: ImageFrameProps) {
  const aspectClass =
    aspect === "16/9"
      ? "aspect-video"
      : aspect === "4/3"
        ? "aspect-[4/3]"
        : aspect === "3/2"
          ? "aspect-[3/2]"
          : "aspect-square";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface",
        "shadow-[var(--shadow-md)]",
        className,
      )}
    >
      {chrome && (
        <div className="flex items-center gap-1.5 border-b border-border bg-surface-elevated/60 px-3 py-2">
          <span className="size-2.5 rounded-full bg-muted/40" aria-hidden />
          <span className="size-2.5 rounded-full bg-muted/40" aria-hidden />
          <span className="size-2.5 rounded-full bg-muted/40" aria-hidden />
        </div>
      )}
      <div className={cn("relative w-full", aspectClass)}>{children}</div>
    </div>
  );
}
