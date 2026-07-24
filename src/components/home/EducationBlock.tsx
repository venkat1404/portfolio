import { education } from "@/data/education";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";

function formatYear(ym: string) {
  return ym.split("-")[0];
}

export function EducationBlock() {
  return (
    <Section id="education">
      <SectionHeading eyebrow="Education" title="Where the coursework happened." />

      <div className="space-y-8">
        {education.map((edu) => (
          <article
            key={edu.institution}
            className="rounded-[var(--radius-lg)] border border-border bg-surface p-6"
          >
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-md font-semibold text-foreground">
                {edu.institution}
              </h3>
              <span className="font-mono tabular text-xs text-muted">
                {formatYear(edu.startDate)} – {formatYear(edu.endDate)}
              </span>
            </div>
            <p className="mb-4 text-sm text-secondary">
              {edu.degree} · {edu.location}
              {edu.gpa && <> · GPA {edu.gpa}</>}
            </p>

            {edu.achievements && edu.achievements.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-1.5">
                {edu.achievements.map((a) => (
                  <Chip key={a} tone="accent">
                    {a}
                  </Chip>
                ))}
              </div>
            )}

            {edu.coursework && edu.coursework.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {edu.coursework.map((c) => (
                  <Chip key={c} tone="muted">
                    {c}
                  </Chip>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
