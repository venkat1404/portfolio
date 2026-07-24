import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "accent" | "success" | "warning" | "muted";

type ChipProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone;
  mono?: boolean;
  children: ReactNode;
};

const tones: Record<Tone, string> = {
  neutral:
    "bg-surface border-border text-secondary",
  accent:
    "bg-accent-soft border-transparent text-accent",
  success:
    "bg-success-soft border-transparent text-success",
  warning:
    "bg-warning-soft border-transparent text-warning",
  muted:
    "bg-transparent border-border text-muted",
};

export function Chip({
  tone = "neutral",
  mono = false,
  className,
  children,
  ...rest
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs",
        tones[tone],
        mono && "font-mono tabular",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
