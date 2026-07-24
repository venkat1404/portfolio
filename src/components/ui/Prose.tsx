import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// MDX case-study body wrapper. All prose typography lives here - headings,
// links, lists, code blocks - so case studies render consistently.
export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        // Layout: constrained measure for readability.
        "max-w-[720px]",

        // Paragraphs
        "[&_p]:my-6 [&_p]:text-md [&_p]:leading-relaxed [&_p]:text-secondary",

        // Headings
        "[&_h2]:mt-16 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground",
        "[&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-foreground",
        "[&_h4]:mt-8 [&_h4]:mb-2 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-foreground",

        // Lists
        "[&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-md [&_ul]:leading-relaxed [&_ul]:text-secondary",
        "[&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:text-md [&_ol]:leading-relaxed [&_ol]:text-secondary",
        "[&_li]:my-2 [&_li]:pl-1",
        "[&_li::marker]:text-muted",

        // Links
        "[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-accent/40 hover:[&_a]:decoration-accent",

        // Emphasis
        "[&_strong]:font-semibold [&_strong]:text-foreground",
        "[&_em]:italic",

        // Inline code
        "[&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:text-foreground",

        // Code blocks
        "[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-[var(--radius-md)] [&_pre]:border [&_pre]:border-border [&_pre]:bg-surface [&_pre]:p-4 [&_pre]:text-sm",
        "[&_pre_code]:bg-transparent [&_pre_code]:p-0",

        // Blockquotes
        "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-foreground",

        // Horizontal rules
        "[&_hr]:my-12 [&_hr]:border-border",

        // Figures
        "[&_figure]:my-10",
        "[&_figcaption]:mt-3 [&_figcaption]:text-sm [&_figcaption]:text-muted",

        className,
      )}
    >
      {children}
    </div>
  );
}
