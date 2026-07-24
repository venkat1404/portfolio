import Link from "next/link";
import { site } from "@/data/site";
import { Container } from "./Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <p className="text-sm text-muted">
          © {year} {site.name}. Made in College Park, MD.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted">
          <Link
            href={`${site.githubUrl}/portfolio`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            View source
          </Link>
          <span aria-hidden>·</span>
          <a
            href={`mailto:${site.email}`}
            className="hover:text-foreground"
          >
            {site.email}
          </a>
        </div>
      </Container>
    </footer>
  );
}
