import type { MetricChip } from "@/data/types";
import { MetricStat } from "@/components/ui/MetricStat";

type ResultsGridProps = {
  metrics: MetricChip[];
};

// Big tabular-numeral stat grid. Rendered inside case-study MDX.
// Wrapped in `not-prose` so Prose typography doesn't leak in.
export function ResultsGrid({ metrics }: ResultsGridProps) {
  return (
    <div className="my-10 grid grid-cols-2 gap-6 not-prose md:grid-cols-4">
      {metrics.map((m, i) => (
        <MetricStat
          key={m.value + i}
          value={m.value}
          label={m.label}
          emphasis={i === 0}
        />
      ))}
    </div>
  );
}
