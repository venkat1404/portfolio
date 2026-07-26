import type { Metadata } from "next";
import { Download } from "lucide-react";
import { site } from "@/data/site";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Resume",
  description: `Download ${site.name}'s current resume.`,
};

export default function ResumePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Section padding="compact">
          <Container>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
              Resume
            </p>
            <h1 className="mb-6 text-4xl md:text-5xl font-semibold tracking-tight text-foreground [text-wrap:balance]">
              The one-page version.
            </h1>
            <p className="mb-10 max-w-[560px] text-md leading-relaxed text-secondary">
              Data Engineer resume covering Accordion India work, UMD MS
              Information Systems, featured projects, and skills. Also
              available inline below.
            </p>

            <Button
              variant="primary"
              href={site.resumeUrl}
              download="Venkat_Resume.pdf"
            >
              <Download aria-hidden strokeWidth={1.5} className="size-3.5" />
              Download PDF
            </Button>

            <div className="mt-16 overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
              <object
                data={site.resumeUrl}
                type="application/pdf"
                className="h-[90vh] w-full"
                aria-label={`${site.name} resume (PDF)`}
              >
                <p className="p-8 text-sm text-secondary">
                  Your browser can&apos;t preview PDFs inline.{" "}
                  <a href={site.resumeUrl} className="text-accent underline">
                    Download the resume
                  </a>{" "}
                  instead.
                </p>
              </object>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
