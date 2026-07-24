import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  padding?: "default" | "hero" | "compact";
};

// Wraps homepage sections with consistent vertical rhythm.
// Spec §7.4: 96–160px desktop, 64–96px mobile.
export function Section({
  id,
  children,
  className,
  containerClassName,
  padding = "default",
}: SectionProps) {
  const py =
    padding === "hero"
      ? "py-24 md:py-32 lg:py-40"
      : padding === "compact"
        ? "py-16 md:py-20"
        : "py-16 md:py-24 lg:py-32";

  return (
    <section id={id} className={cn(py, className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
