import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  size?: "default" | "prose";
};

export function Container({
  as: Tag = "div",
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-6 md:px-8",
        size === "default"
          ? "max-w-[var(--container-max)]"
          : "max-w-[var(--prose-max)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
