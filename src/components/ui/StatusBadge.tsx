import type { ReactNode } from "react";
import { Check, CircleDashed } from "lucide-react";
import { cn } from "@/lib/cn";

type StatusBadgeProps = {
  status: "in-progress" | "completed";
  className?: string;
  children?: ReactNode;
};

// Spec §11: status conveyed by text + icon, never color alone.
// Ensures screen readers get the meaning and colorblind users too.
export function StatusBadge({ status, className, children }: StatusBadgeProps) {
  const isProgress = status === "in-progress";
  const Icon = isProgress ? CircleDashed : Check;
  const label = children ?? (isProgress ? "In progress" : "Completed");

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs",
        isProgress
          ? "border-warning/30 bg-warning-soft text-warning"
          : "border-success/30 bg-success-soft text-success",
        className,
      )}
    >
      <Icon aria-hidden strokeWidth={2} className="size-3" />
      <span>{label}</span>
    </span>
  );
}
