import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-[70vh] max-w-[720px] flex-col justify-center px-6 py-24"
    >
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-secondary">
        404
      </p>
      <h1 className="mb-4 text-4xl font-semibold tracking-tight text-foreground">
        That page took a wrong turn.
      </h1>
      <p className="mb-8 text-lg leading-relaxed text-secondary">
        The route doesn&apos;t exist — probably a typo in the URL, or a link
        pointing somewhere I&apos;ve since renamed. Try one of these instead.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button href="/" variant="primary">
          Home
        </Button>
        <Button href="/projects" variant="secondary">
          Projects
        </Button>
        <Button href="/resume" variant="secondary">
          Resume
        </Button>
      </div>
    </main>
  );
}
