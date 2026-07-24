import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/types";
import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/cn";

type ProjectCardProps = {
  project: Project;
  layout?: "vertical" | "horizontal";
};

export function ProjectCard({ project, layout = "vertical" }: ProjectCardProps) {
  const dateLabel = new Date(project.date + "-01").toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface",
        "transition-[transform,border-color,background] duration-[var(--duration-base)] ease-[var(--ease-out)]",
        "hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-elevated",
        layout === "horizontal" && "md:grid md:grid-cols-2",
      )}
    >
      {/* Cover / visual placeholder — Phase 7 replaces with real architecture SVG */}
      <div
        aria-hidden
        className={cn(
          "relative flex items-center justify-center border-b border-border bg-background",
          layout === "horizontal"
            ? "aspect-video md:aspect-auto md:border-b-0 md:border-r"
            : "aspect-video",
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--accent-soft)_0%,transparent_60%)]" />
        <span className="relative font-mono text-[11px] uppercase tracking-widest text-muted">
          Architecture diagram · Phase 7
        </span>
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-mono tabular text-muted">{dateLabel}</span>
          <span className="text-muted">·</span>
          <span className="text-muted">{project.attribution.role}</span>
        </div>

        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          <Link
            href={`/projects/${project.slug}`}
            className="before:absolute before:inset-0 before:content-['']"
          >
            {project.title}
          </Link>
        </h3>

        <p className="text-md leading-relaxed text-secondary">
          {project.summary}
        </p>

        {project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.metrics.slice(0, 3).map((m) => (
              <Chip key={m.value} mono tone="accent">
                {m.value} · {m.label}
              </Chip>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <Chip key={t} tone="muted">
              {t}
            </Chip>
          ))}
        </div>

        <div className="mt-2 inline-flex items-center gap-1.5 text-sm text-accent">
          Read case study
          <ArrowUpRight
            aria-hidden
            strokeWidth={1.5}
            className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </article>
  );
}
