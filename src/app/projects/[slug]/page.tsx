import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import { projects } from "@/data/projects";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { Prose } from "@/components/ui/Prose";

type Params = { slug: string };

// Slugs that have an MDX case study body. Others fall back to a placeholder.
const CASE_STUDIES = new Set([
  "financial-complaint-resolution",
  "short-term-rental-quality",
  "healthcare-fraud-detection",
]);

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
    title: `${project.title} · Case Study`,
    description: project.description.slice(0, 155),
  };
}

async function loadCaseStudy(slug: string) {
  if (!CASE_STUDIES.has(slug)) return null;
  const mod = await import(`@/../content/projects/${slug}.mdx`);
  return mod.default as React.ComponentType;
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const CaseStudyBody = await loadCaseStudy(project.slug);

  const orderedFeatured = projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.featured ?? 99) - (b.featured ?? 99));
  const currentIndex = orderedFeatured.findIndex((p) => p.slug === project.slug);
  const prev = currentIndex > 0 ? orderedFeatured[currentIndex - 1] : null;
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

        {/* Case study body */}
        <section className="py-16 md:py-24">
          <Container size="prose">
            {CaseStudyBody ? (
              <Prose>
                <CaseStudyBody />
              </Prose>
            ) : (
              <>
                <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
                  Overview
                </p>
                <p className="text-lg leading-relaxed text-secondary">
                  {project.description}
                </p>

                <div className="mt-16 rounded-[var(--radius-lg)] border border-dashed border-border-strong p-6">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">
                    No case study yet
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-secondary">
                    This project is listed on{" "}
                    <Link href="/projects" className="text-accent underline">
                      /projects
                    </Link>{" "}
                    with the source repo linked. A full case study lives on the
                    three featured projects; the README on GitHub covers this
                    one directly.
                  </p>
                </div>
              </>
            )}
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
