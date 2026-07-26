import type { ReactNode } from "react";

type ArchitectureFigureProps = {
  children: ReactNode;
  caption?: string;
};

// Wraps an SVG architecture diagram with a consistent frame + caption.
// The SVG itself uses `currentColor` and CSS custom properties so it adapts
// to light/dark theme without duplication.
export function ArchitectureFigure({
  children,
  caption,
}: ArchitectureFigureProps) {
  return (
    <figure className="my-12 not-prose">
      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface p-6 md:p-10">
        {children}
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
