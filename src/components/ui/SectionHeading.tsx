import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  as?: "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-10", className)}>
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
          {eyebrow}
        </p>
      )}
      <Tag className="max-w-[720px] text-3xl font-semibold tracking-tight text-foreground">
        {title}
      </Tag>
      {description && (
        <p className="mt-3 max-w-[640px] text-md leading-relaxed text-secondary">
          {description}
        </p>
      )}
    </div>
  );
}
