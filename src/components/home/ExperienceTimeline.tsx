import { experience } from "@/data/experience";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";

function formatMonthYear(ym: string): string {
  const [year, month] = ym.split("-").map((n) => parseInt(n, 10));
  const d = new Date(year, (month ?? 1) - 1, 1);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatDateRange(start: string, end: string | "Present"): string {
  const startLabel = formatMonthYear(start);
  const endLabel = end === "Present" ? "Present" : formatMonthYear(end);
  return `${startLabel} – ${endLabel}`;
}

export function ExperienceTimeline() {
  return (
    <Section id="experience">
      <SectionHeading eyebrow="Experience" title="Where the reps came from." />

      <ol className="relative space-y-12 border-l border-border pl-8">
        {experience.map((entry) => (
          <li key={entry.company} className="relative">
            <span
              aria-hidden
              className="absolute -left-[33px] top-2 inline-flex size-3 items-center justify-center rounded-full border border-border-strong bg-background"
            >
              <span className="size-1.5 rounded-full bg-accent" />
            </span>

            <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-lg font-semibold text-foreground">
                {entry.company}
              </h3>
              {entry.volunteer && (
                <Chip tone="muted" className="translate-y-[-1px]">
                  Volunteer
                </Chip>
              )}
            </div>
            {entry.subtitle && (
              <p className="mb-6 text-sm text-muted">{entry.subtitle}</p>
            )}

            <div className="space-y-8">
              {entry.roles.map((role) => (
                <div key={role.title}>
                  <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="text-md font-medium text-foreground">
                      {role.title}
                    </span>
                    <span className="font-mono tabular text-xs text-muted">
                      {formatDateRange(role.startDate, role.endDate)}
                    </span>
                  </div>

                  <ul className="mb-4 space-y-2">
                    {role.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="relative pl-4 text-sm leading-relaxed text-secondary before:absolute before:left-0 before:top-[10px] before:size-1 before:rounded-full before:bg-muted"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {role.tech && role.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {role.tech.map((t) => (
                        <Chip key={t} tone="muted">
                          {t}
                        </Chip>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
