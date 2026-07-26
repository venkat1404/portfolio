import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "./ProjectCard";

export function FeaturedProjects() {
  return (
    <Section id="projects">
      <Reveal>
        <SectionHeading
          eyebrow="Selected work"
          title="Three projects, in the order I'd send them to a hiring manager."
          description="Multi-agent AI on a real regulatory dataset, a competition-graded ML pipeline, and a decision-support system for healthcare fraud triage."
        />
      </Reveal>

      <div className="flex flex-col gap-6">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.06}>
            <ProjectCard
              project={project}
              layout={i === 0 ? "horizontal" : "vertical"}
            />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <Link
          href="/projects"
          className="mt-10 inline-flex items-center gap-2 text-sm text-secondary hover:text-foreground"
        >
          All projects
          <ArrowRight aria-hidden strokeWidth={1.5} className="size-3.5" />
        </Link>
      </Reveal>
    </Section>
  );
}
