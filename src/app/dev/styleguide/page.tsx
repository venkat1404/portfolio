// Throwaway route to verify primitives in both themes. Excluded from
// sitemap + robots. Deleted before Phase 14 (final review).
import type { Metadata } from "next";
import { Github, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { MetricStat } from "@/components/ui/MetricStat";
import { Prose } from "@/components/ui/Prose";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StatusDot } from "@/components/ui/StatusDot";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Styleguide (dev)",
  robots: { index: false, follow: false },
};

export default function StyleguidePage() {
  return (
    <main id="main">
      <Section padding="compact">
        <div className="mb-16 flex items-center justify-between">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">
              dev · not indexed
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground">
              Design system styleguide
            </h1>
            <p className="mt-3 max-w-[560px] text-md text-secondary">
              A live rendering of every primitive in both themes. Use the toggle
              to verify light and dark discipline. This route is deleted before
              launch.
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* ─── Typography ─── */}
        <SectionHeading eyebrow="01" title="Typography" />
        <div className="mb-16 space-y-4 border border-border rounded-[var(--radius-lg)] p-6 bg-surface">
          <p className="text-6xl font-semibold tracking-tight text-foreground">
            Display 6xl
          </p>
          <p className="text-5xl font-semibold tracking-tight text-foreground">
            Display 5xl
          </p>
          <p className="text-4xl font-semibold tracking-tight text-foreground">
            Heading 4xl
          </p>
          <p className="text-3xl font-semibold tracking-tight text-foreground">
            Heading 3xl
          </p>
          <p className="text-2xl font-semibold text-foreground">Heading 2xl</p>
          <p className="text-xl font-medium text-foreground">Heading xl</p>
          <p className="text-lg text-foreground">Body large · 18px</p>
          <p className="text-md text-secondary">
            Body md · 17px, secondary color. Used for paragraphs where warmth
            matters more than density.
          </p>
          <p className="text-body text-secondary">
            Body base · 16px, secondary color.
          </p>
          <p className="text-sm text-muted">Small text · 13px, muted.</p>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Mono uppercase micro
          </p>
          <p className="font-mono tabular text-2xl text-foreground">
            0123456789 · $49,332 · AUC 0.8214
          </p>
        </div>

        {/* ─── Buttons ─── */}
        <SectionHeading eyebrow="02" title="Buttons" />
        <div className="mb-16 flex flex-wrap gap-3 border border-border rounded-[var(--radius-lg)] p-6 bg-surface">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" size="sm">
            Primary small
          </Button>
          <Button
            variant="secondary"
            href="https://github.com/venkat1404"
            external
          >
            External link
          </Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </div>

        {/* ─── Chips ─── */}
        <SectionHeading eyebrow="03" title="Chips & badges" />
        <div className="mb-16 flex flex-wrap gap-2 border border-border rounded-[var(--radius-lg)] p-6 bg-surface">
          <Chip>Python</Chip>
          <Chip>SQL</Chip>
          <Chip mono>Apr 2026</Chip>
          <Chip tone="accent">Featured</Chip>
          <Chip tone="muted">Volunteer</Chip>
          <StatusBadge status="in-progress" />
          <StatusBadge status="completed" />
        </div>

        {/* ─── Metric stats ─── */}
        <SectionHeading eyebrow="04" title="Metric stats" />
        <div className="mb-16 grid grid-cols-2 gap-6 border border-border rounded-[var(--radius-lg)] p-6 bg-surface md:grid-cols-4">
          <MetricStat value="49,332" label="CFPB complaints" />
          <MetricStat value="AUC 0.8214" label="8th of 35 teams" emphasis />
          <MetricStat value="0.951" label="ROC-AUC (LogReg)" />
          <MetricStat value="40%" label="reporting acceleration" />
        </div>

        {/* ─── Status dot ─── */}
        <SectionHeading eyebrow="05" title="Availability dot" />
        <div className="mb-16 flex items-center gap-3 border border-border rounded-[var(--radius-lg)] p-6 bg-surface">
          <StatusDot />
          <span className="font-mono text-xs uppercase tracking-widest text-secondary">
            Available for full-time roles (Dec 2026)
          </span>
        </div>

        {/* ─── Card ─── */}
        <SectionHeading eyebrow="06" title="Cards" />
        <div className="mb-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">
              Static
            </p>
            <p className="text-md text-foreground">A resting card.</p>
          </Card>
          <Card interactive>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">
              Interactive
            </p>
            <p className="text-md text-foreground">Hovers +translate.</p>
          </Card>
          <Card className="bg-surface-elevated">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">
              Elevated
            </p>
            <p className="text-md text-foreground">Higher surface tier.</p>
          </Card>
        </div>

        {/* ─── ImageFrame ─── */}
        <SectionHeading eyebrow="07" title="Image frame (with chrome)" />
        <div className="mb-16">
          <ImageFrame aspect="16/9" chrome>
            <div className="flex size-full items-center justify-center bg-surface text-sm text-muted">
              Screenshot / diagram placeholder
            </div>
          </ImageFrame>
        </div>

        {/* ─── Icons ─── */}
        <SectionHeading eyebrow="08" title="Icons (1.5px stroke)" />
        <div className="mb-16 flex items-center gap-4 border border-border rounded-[var(--radius-lg)] p-6 bg-surface">
          <Icon icon={Github} className="size-5 text-secondary" />
          <Icon icon={Mail} className="size-5 text-secondary" />
          <Icon icon={Sparkles} className="size-5 text-accent" />
        </div>

        {/* ─── Prose ─── */}
        <SectionHeading eyebrow="09" title="Prose (MDX body)" />
        <div className="border border-border rounded-[var(--radius-lg)] p-8 bg-surface">
          <Prose>
            <h2>A representative section heading</h2>
            <p>
              Regular paragraph copy. Case studies live inside this component,
              so all typography (links, lists, inline{" "}
              <code>code</code>, headings) reads consistently.
            </p>
            <h3>Sub-heading</h3>
            <p>
              With a{" "}
              <a href="#">demonstration link</a> to verify the accent underline
              treatment.
            </p>
            <ul>
              <li>First list item.</li>
              <li>Second list item, slightly longer to check line wrapping.</li>
              <li>Third and final.</li>
            </ul>
            <blockquote>
              A blockquote. Used sparingly for pull-quotes or notable findings.
            </blockquote>
          </Prose>
        </div>
      </Section>
    </main>
  );
}
