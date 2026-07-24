import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import { projects } from "@/data/projects";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Chip } from "@/components/ui/Chip";
import { MetricStat } from "@/components/ui/MetricStat";
import { Button } from "@/components/ui/Button";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study`,
    description: project.description.slice(0, 155),
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const orderedFeatured = projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.featured ?? 99) - (b.featured ?? 99));
  const currentIndex = orderedFeatured.findIndex((p) => p.slug === project.slug);
  const prev =
    currentIndex > 0 ? orderedFeatured[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < orderedFeatured.length - 1
      ? orderedFeatured[currentIndex + 1]
      : null;

  const dateLabel = new Date(project.date + "-01").toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Nav />
      <main id="main">
        {/* Case study hero */}
        <section className="border-b border-border py-14 md:py-20">
          <Container>
            <Link
              href="/projects"
              className="mb-8 inline-flex items-center gap-2 text-sm text-secondary hover:text-foreground"
            >
              <ArrowLeft aria-hidden strokeWidth={1.5} className="size-3.5" />
              All projects
            </Link>

            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
              Case study · {dateLabel}
            </p>

            <h1 className="mb-6 max-w-[900px] text-4xl md:text-5xl font-semibold tracking-tight text-foreground [text-wrap:balance]">
              {project.title}
            </h1>

            <p className="mb-10 max-w-[720px] text-lg leading-relaxed text-secondary">
              {project.summary}
            </p>

            <div className="mb-8 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Chip key={t} tone="muted">
                  {t}
                </Chip>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {project.githubUrl && (
                <Button variant="secondary" href={project.githubUrl} external>
                  <Github aria-hidden strokeWidth={1.5} className="size-3.5" />
                  View source
                </Button>
              )}
              {project.liveDemoUrl && (
                <Button variant="secondary" href={project.liveDemoUrl} external>
                  View live demo
                </Button>
              )}
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
              <div>
                <dt className="text-muted">Role</dt>
                <dd className="text-foreground">{project.attribution.role}</dd>
              </div>
              {project.attribution.teamSize && (
                <div>
                  <dt className="text-muted">Team</dt>
                  <dd className="text-foreground">
                    {project.attribution.teamSize} people
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-muted">Date</dt>
                <dd className="text-foreground">{dateLabel}</dd>
              </div>
              <div>
                <dt className="text-muted">Category</dt>
                <dd className="text-foreground">{project.filters.join(" · ")}</dd>
              </div>
            </dl>
          </Container>
        </section>

        {/* Results — surfaced high because it's the highest-value skim block */}
        <section className="border-b border-border py-16 md:py-20">
          <Container>
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted">
              Results
            </p>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {project.metrics.map((m, i) => (
                <MetricStat
                  key={m.value + i}
                  value={m.value}
                  label={m.label}
                  emphasis={i === 0}
                />
              ))}
            </div>
          </Container>
        </section>

        {/* Body — placeholder until Phase 7 lands MDX case study */}
        <section className="py-16 md:py-24">
          <Container size="prose">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
              Overview
            </p>
            <p className="text-lg leading-relaxed text-secondary">
              {project.description}
            </p>

            <div className="mt-16 rounded-[var(--radius-lg)] border border-dashed border-border-strong p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                Coming in Phase 7
              </p>
              <p className="mt-2 text-sm leading-relaxed text-secondary">
                Full case study — Problem · Business context · Data sources ·
                Architecture (SVG) · Technical stack · Approach · Challenges ·
                Business impact · Lessons learned · Future improvements — lands
                as an MDX file at{" "}
                <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.9em]">
                  /content/projects/{project.slug}.mdx
                </code>
                . Outline already drafted in the repo.
              </p>
            </div>
          </Container>
        </section>

        {/* Prev / Next */}
        {(prev || next) && (
          <section className="border-t border-border py-10">
            <Container className="flex flex-wrap items-center justify-between gap-4">
              <div>
                {prev && (
                  <Link
                    href={`/projects/${prev.slug}`}
                    className="group inline-flex flex-col text-sm text-secondary hover:text-foreground"
                  >
                    <span className="inline-flex items-center gap-1 text-xs text-muted">
                      <ArrowLeft aria-hidden strokeWidth={1.5} className="size-3" />
                      Previous
                    </span>
                    <span className="mt-1 text-md text-foreground">
                      {prev.title}
                    </span>
                  </Link>
                )}
              </div>
              <div className="text-right">
                {next && (
                  <Link
                    href={`/projects/${next.slug}`}
                    className="group inline-flex flex-col items-end text-sm text-secondary hover:text-foreground"
                  >
                    <span className="inline-flex items-center gap-1 text-xs text-muted">
                      Next
                      <ArrowRight aria-hidden strokeWidth={1.5} className="size-3" />
                    </span>
                    <span className="mt-1 text-md text-foreground">
                      {next.title}
                    </span>
                  </Link>
                )}
              </div>
            </Container>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
