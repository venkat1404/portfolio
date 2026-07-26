import type { ReactNode } from "react";

type TldrCardProps = {
  problem: ReactNode;
  solution: ReactNode;
  result: ReactNode;
};

// Sits near the top of a case study. Three short lines a skimmer can absorb
// in ~10 seconds. Not styled through Prose because it wants its own layout.
export function TldrCard({ problem, solution, result }: TldrCardProps) {
  return (
    <aside
      aria-label="TL;DR"
      className="my-10 grid grid-cols-1 gap-4 rounded-[var(--radius-lg)] border border-border bg-surface p-6 md:grid-cols-3 md:gap-6"
    >
      <div>
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">
          Problem
        </p>
        <p className="text-sm leading-relaxed text-foreground">{problem}</p>
      </div>
      <div>
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">
          Solution
        </p>
        <p className="text-sm leading-relaxed text-foreground">{solution}</p>
      </div>
      <div>
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">
          Result
        </p>
        <p className="text-sm leading-relaxed text-foreground">{result}</p>
      </div>
    </aside>
  );
}
