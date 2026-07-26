import type { LucideIcon } from "lucide-react";
import { Cloud, LineChart, Sparkles } from "lucide-react";
import { exploring } from "@/data/exploring";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const iconMap: Record<string, LucideIcon> = {
  cloud: Cloud,
  sparkles: Sparkles,
  "line-chart": LineChart,
};

export function CurrentlyExploring() {
  return (
    <Section id="exploring">
      <SectionHeading
        eyebrow="Currently exploring"
        title="Learning in progress."
        description="Momentum matters more than a static resume. Here's what's actively occupying my attention right now."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {exploring.map((entry, i) => {
          const Icon = iconMap[entry.iconKey] ?? Sparkles;
          return (
            <Reveal
              key={entry.title}
              as="article"
              delay={i * 0.06}
              className="flex flex-col gap-4 rounded-[var(--radius-lg)] border border-border bg-surface p-6"
            >
              <span
                aria-hidden
                className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-accent"
              >
                <Icon strokeWidth={1.5} className="size-4" />
              </span>
              <div>
                <h3 className="text-md font-medium text-foreground">
                  {entry.title}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">
                  {entry.status}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-secondary">
                {entry.why}
              </p>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
