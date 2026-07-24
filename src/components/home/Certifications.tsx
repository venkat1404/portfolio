import {
  completedCertifications,
  inProgressCertifications,
} from "@/data/certifications";
import type { Certification } from "@/data/types";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/cn";

function formatDate(ym?: string) {
  if (!ym) return null;
  const [y, m] = ym.split("-").map((n) => parseInt(n, 10));
  return new Date(y, (m ?? 1) - 1, 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function CertCard({ cert }: { cert: Certification }) {
  const inProgress = cert.status === "in-progress";
  const dateLabel = formatDate(cert.date);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-[var(--radius-lg)] border p-6",
        inProgress
          ? "border-dashed border-border-strong bg-transparent"
          : "border-border bg-surface",
      )}
    >
      <div className="flex items-center gap-2">
        <StatusBadge status={cert.status} />
        {dateLabel && (
          <span className="font-mono tabular text-xs text-muted">
            {inProgress ? `Exam ${dateLabel}` : dateLabel}
          </span>
        )}
      </div>
      <h3 className="text-md font-medium text-foreground">{cert.name}</h3>
      <p className="text-sm text-muted">{cert.issuer}</p>
      {cert.context && (
        <p className="text-sm leading-relaxed text-secondary">{cert.context}</p>
      )}
    </div>
  );
}

export function Certifications() {
  const showCompleted = completedCertifications.length > 0;

  return (
    <Section id="certifications">
      <SectionHeading eyebrow="Certifications" title="What's on the shelf, what's on the way." />

      {inProgressCertifications.length > 0 && (
        <div className="mb-10">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
            In progress
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {inProgressCertifications.map((c) => (
              <CertCard key={c.name} cert={c} />
            ))}
          </div>
        </div>
      )}

      {showCompleted && (
        <div>
          <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
            Completed
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {completedCertifications.map((c) => (
              <CertCard key={c.name} cert={c} />
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
