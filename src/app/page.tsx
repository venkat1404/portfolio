// Phase 5 placeholder. Real home page assembles in Phase 6.
// This just proves the design system loads correctly.
import { Button } from "@/components/ui/Button";
import { hero } from "@/data/hero";

export default function HomePage() {
  return (
    <main id="main" className="mx-auto max-w-[1180px] px-6 py-24">
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-secondary">
        v2 · scaffolding
      </p>
      <h1 className="mb-6 max-w-[720px] text-5xl font-semibold tracking-tight text-foreground">
        {hero.headline}
      </h1>
      <p className="mb-8 max-w-[560px] text-lg leading-relaxed text-secondary">
        {hero.subline}
      </p>
      <div className="flex flex-wrap gap-3">
        <Button href="/dev/styleguide" variant="primary">
          View styleguide
        </Button>
        <Button
          href="https://github.com/venkat1404"
          variant="secondary"
          external
        >
          GitHub
        </Button>
      </div>
    </main>
  );
}
