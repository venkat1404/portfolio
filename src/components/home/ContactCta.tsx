import { Download, Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/data/site";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export function ContactCta() {
  return (
    <Section id="contact">
      <div className="mx-auto max-w-[720px] text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
          Contact
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground [text-wrap:balance]">
          Let&apos;s talk about a data problem.
        </h2>
        <p className="mt-6 text-md leading-relaxed text-secondary">
          {site.availability} Open to hybrid and relocation.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" href={`mailto:${site.email}`}>
            <Mail aria-hidden strokeWidth={1.5} className="size-3.5" />
            Email
          </Button>
          <Button variant="secondary" href={site.linkedinUrl} external>
            <Linkedin aria-hidden strokeWidth={1.5} className="size-3.5" />
            LinkedIn
          </Button>
          <Button variant="secondary" href={site.githubUrl} external>
            <Github aria-hidden strokeWidth={1.5} className="size-3.5" />
            GitHub
          </Button>
          <Button variant="secondary" href={site.resumeUrl}>
            <Download aria-hidden strokeWidth={1.5} className="size-3.5" />
            Resume
          </Button>
        </div>
      </div>
    </Section>
  );
}
