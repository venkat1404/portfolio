"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { Project, ProjectFilter } from "@/data/types";
import { FilterChip } from "@/components/ui/FilterChip";
import { ProjectCard } from "@/components/home/ProjectCard";

type ProjectsGridProps = {
  projects: Project[];
};

const FILTERS: (ProjectFilter | "All")[] = [
  "All",
  "Engineering",
  "Analytics",
  "ML",
];

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = (searchParams.get("filter") as ProjectFilter | "All") ?? "All";

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) => p.filters.includes(active));
  }, [projects, active]);

  function setFilter(next: ProjectFilter | "All") {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "All") {
      params.delete("filter");
    } else {
      params.set("filter", next);
    }
    const qs = params.toString();
    router.replace(qs ? `/projects?${qs}` : "/projects", { scroll: false });
  }

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <FilterChip
            key={f}
            active={f === active}
            onClick={() => setFilter(f)}
          >
            {f}
          </FilterChip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-md text-secondary">No projects match this filter.</p>
      ) : (
        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          aria-live="polite"
        >
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}
    </>
  );
}
