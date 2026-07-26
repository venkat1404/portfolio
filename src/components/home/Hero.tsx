import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { hero } from "@/data/hero";
import { site } from "@/data/site";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { StatusDot } from "@/components/ui/StatusDot";
import { HeroReveal } from "@/components/motion/HeroReveal";
import { WordsReveal } from "@/components/motion/WordsReveal";
import { Typewriter } from "@/components/motion/Typewriter";
import { HeroScrollCue } from "./HeroScrollCue";

// Timing plan. Headline still runs on the same 3s cadence; the subline now
// types out (~4.2s at 22ms/char × 189 chars), so CTAs land ~6.7s after page
// load. Scroll cue delay in HeroScrollCue.tsx is aligned to appear right
// after CTAs.
//
//   eyebrow      0.00s → visible at 0.50s
//   Data.        0.35s → visible at 1.20s
//   Clarity.     0.80s → visible at 1.65s
//   Decisions.   1.25s → visible at 2.10s
//   subline      2.10s → typewriter starts, finishes ~6.30s
//   CTA row      6.35s → visible at 6.85s
//   scroll cue   set inside HeroScrollCue (7.0s)
const T_EYEBROW = 0;
const T_HEADLINE_START = 0.35;
const T_HEADLINE_STAGGER = 0.45;
const T_SUBLINE_START_MS = 2100;
const TYPEWRITER_SPEED_MS = 22;
const T_CTAS =
  T_SUBLINE_START_MS / 1000 + (hero.subline.length * TYPEWRITER_SPEED_MS) / 1000 + 0.1;

export function Hero() {
  return (
    // 85svh minus nav gives a "designed peek" of the next section (~15% of
    // viewport height). svh instead of vh accounts for mobile browser chrome.
    <section className="relative flex min-h-[calc(85svh-64px)] flex-col justify-center py-16 md:py-20">
      <Container>
        <HeroReveal delay={T_EYEBROW}>
          <p className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-secondary">
            <StatusDot />
            {hero.eyebrow.text}
          </p>
        </HeroReveal>

        <h1 className="mb-6 text-[clamp(2.75rem,6.5vw,5rem)] font-semibold tracking-tight text-foreground leading-[1.05]">
          <WordsReveal
            delayStart={T_HEADLINE_START}
            stagger={T_HEADLINE_STAGGER}
            duration={0.75}
          >
            {hero.headline}
          </WordsReveal>
        </h1>

        {/* Subline: ghost-space pattern so layout doesn't shift as text types.
            Ghost paragraph reserves the final rendered height (invisible),
            typing paragraph is absolute-positioned on top of it, and a
            visually-hidden span carries the full string for screen readers. */}
        <div className="relative mb-10 max-w-[620px]">
          <p
            aria-hidden
            className="invisible text-lg leading-relaxed text-secondary"
          >
            {hero.subline}
          </p>
          <p
            aria-hidden
            className="absolute inset-0 text-lg leading-relaxed text-secondary"
          >
            <Typewriter
              text={hero.subline}
              speed={TYPEWRITER_SPEED_MS}
              startDelay={T_SUBLINE_START_MS}
            />
          </p>
          <span className="sr-only">{hero.subline}</span>
        </div>

        <HeroReveal delay={T_CTAS}>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <ArrowDown aria-hidden strokeWidth={1.5} className="size-3.5" />
            </Button>
            <Button
              variant="secondary"
              href={hero.secondaryCta.href}
              download="Venkat_Resume.pdf"
            >
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
        </HeroReveal>
      </Container>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center md:bottom-10">
        <div className="pointer-events-auto">
          <HeroScrollCue />
        </div>
      </div>
    </section>
  );
}
