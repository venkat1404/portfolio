import type { MDXComponents } from "mdx/types";

// Global MDX component overrides. Our case-study MDX bodies render inside a
// <Prose> wrapper that already styles h1..p..code, so we mostly leave the
// default HTML mapping alone. Custom components (TldrCard, ResultsGrid,
// ArchitectureFigure, etc.) are imported per-file inside the MDX itself.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
