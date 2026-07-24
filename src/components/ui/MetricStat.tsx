import { cn } from "@/lib/cn";

type MetricStatProps = {
  value: string;
  label: string;
  className?: string;
  emphasis?: boolean;
};

export function MetricStat({
  value,
  label,
  className,
  emphasis = false,
}: MetricStatProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span
        className={cn(
          "font-mono tabular text-2xl font-medium tracking-tight",
          emphasis ? "text-accent" : "text-foreground",
        )}
      >
        {value}
      </span>
      <span className="text-xs text-muted">{label}</span>
    </div>
  );
}
