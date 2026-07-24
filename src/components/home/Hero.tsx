import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { hero } from "@/data/hero";
import { site } from "@/data/site";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { StatusDot } from "@/components/ui/StatusDot";

export function Hero() {
  return (
    <section className="pt-14 md:pt-24 lg:pt-32 pb-16 md:pb-20 lg:pb-24">
      <Container>
        <p className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-secondary">
          <StatusDot />
          {hero.eyebrow.text}
        </p>

        <h1 className="mb-6 max-w-[820px] text-5xl md:text-6xl font-semibold tracking-tight text-foreground [text-wrap:balance]">
          {hero.headline}
        </h1>

        <p className="mb-10 max-w-[620px] text-lg leading-relaxed text-secondary">
          {hero.subline}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" href={hero.primaryCta.href}>
            {hero.primaryCta.label}
            <ArrowDown aria-hidden strokeWidth={1.5} className="size-3.5" />
          </Button>
          <Button variant="secondary" href={hero.secondaryCta.href}>
            <Download aria-hidden strokeWidth={1.5} className="size-3.5" />
            {hero.secondaryCta.label}
          </Button>
          <div className="ml-1 flex items-center gap-1">
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex size-10 items-center justify-center rounded-full text-secondary hover:bg-surface hover:text-foreground"
            >
              <Github strokeWidth={1.5} className="size-4" />
            </a>
            <a
              href={site.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex size-10 items-center justify-center rounded-full text-secondary hover:bg-surface hover:text-foreground"
            >
              <Linkedin strokeWidth={1.5} className="size-4" />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="inline-flex size-10 items-center justify-center rounded-full text-secondary hover:bg-surface hover:text-foreground"
            >
              <Mail strokeWidth={1.5} className="size-4" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
