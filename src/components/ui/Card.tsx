import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "article" | "section";
  interactive?: boolean;
  children: ReactNode;
};

export function Card({
  as: Tag = "div",
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-[var(--radius-lg)] border border-border bg-surface p-6",
        "transition-[transform,border-color,background] duration-[var(--duration-base)] ease-[var(--ease-out)]",
        interactive &&
          "hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-elevated focus-within:border-border-strong",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
