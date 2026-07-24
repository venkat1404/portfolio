import { skills } from "@/data/skills";
import type { SkillCategory } from "@/data/types";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";

const categoryOrder: SkillCategory[] = [
  "Data Engineering & Pipelines",
  "Analytics & BI",
  "Programming & Databases",
  "ML & AI",
  "Cloud & Infrastructure",
  "Automation",
];

export function SkillsGrid() {
  const grouped = categoryOrder.map((category) => ({
    category,
    items: skills.filter((s) => s.category === category),
  }));

  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="Grouped by what they get used for."
        description="Every skill listed here has a project or a job behind it — no floating claims."
      />

      <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
        {grouped.map(({ category, items }) => (
          <div key={category}>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
              {category}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {items.map((skill) => {
                const evidence = skill.usedIn?.[0] ?? skill.usedAt?.[0];
                return (
                  <Chip
                    key={skill.name}
                    tone="neutral"
                    title={evidence ? `Used in: ${evidence}` : undefined}
                  >
                    {skill.name}
                  </Chip>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
