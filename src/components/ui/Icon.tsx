import type { LucideIcon, LucideProps } from "lucide-react";
import { cn } from "@/lib/cn";

type IconProps = LucideProps & {
  icon: LucideIcon;
};

// Wrapper around Lucide that enforces the 1.5px stroke house style per spec §6.
// Also defaults aria-hidden — pass an `aria-label` explicitly when decorative
// is not the intent.
export function Icon({
  icon: LucideComp,
  className,
  strokeWidth = 1.5,
  ...rest
}: IconProps) {
  return (
    <LucideComp
      aria-hidden={rest["aria-label"] === undefined ? true : undefined}
      strokeWidth={strokeWidth}
      className={cn("size-4", className)}
      {...rest}
    />
  );
}
