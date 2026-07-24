import { cn } from "@/lib/cn";

type StatusDotProps = {
  tone?: "success" | "accent" | "muted";
  pulse?: boolean;
  className?: string;
};

// Small colored dot — used in the hero eyebrow to signal availability.
// `pulse` adds a gentle animation that respects reduced-motion via globals.
export function StatusDot({
  tone = "success",
  pulse = true,
  className,
}: StatusDotProps) {
  const bg =
    tone === "success"
      ? "bg-success"
      : tone === "accent"
        ? "bg-accent"
        : "bg-muted";

  return (
    <span
      aria-hidden
      className={cn("relative inline-flex size-2 items-center justify-center", className)}
    >
      {pulse && (
        <span
          className={cn(
            "absolute inline-flex size-full animate-ping rounded-full opacity-60",
            bg,
          )}
        />
      )}
      <span className={cn("relative inline-flex size-full rounded-full", bg)} />
    </span>
  );
}
