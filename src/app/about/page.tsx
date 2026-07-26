import type { Metadata } from "next";
import { about } from "@/data/about";
import { site } from "@/data/site";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Data Engineer with production ETL experience at Accordion India, currently at UMD Smith (MS Information Systems, GPA 3.95, Terrapin Scholar).",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Section padding="compact">
          <Container size="prose">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
              About
            </p>
            <h1 className="mb-10 text-4xl md:text-5xl font-semibold tracking-tight text-foreground [text-wrap:balance]">
              A short version.
            </h1>

            <div className="space-y-6">
              {about.paragraphs.map((p) => (
                <p
                  key={p.key}
                  className="text-md leading-relaxed text-secondary"
                >
                  {p.body}
                </p>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-3">
              <Button variant="primary" href={`mailto:${site.email}`}>
                Get in touch
              </Button>
              <Button
                variant="secondary"
                href={site.resumeUrl}
                download="Venkat_Resume.pdf"
              >
                Download resume
              </Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
