import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/home/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies from Venkat Gollangi's data engineering, analytics, and applied ML work.",
};

// Ordered: featured projects (by rank) first, then the rest by date desc.
const orderedProjects = [
  ...projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.featured ?? 99) - (b.featured ?? 99)),
  ...projects
    .filter((p) => !p.featured)
    .sort((a, b) => (a.date < b.date ? 1 : -1)),
];

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Section padding="compact">
          <SectionHeading
            eyebrow="Projects"
            title="All the work I'd point a hiring manager at."
            description="Case studies with real metrics, honest attributions, and architecture diagrams. Filter chips land in Phase 9."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {orderedProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
