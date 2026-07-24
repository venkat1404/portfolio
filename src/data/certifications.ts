import type { Certification } from "./types";

// Per spec §5.4: Completed and In Progress rendered as visually distinct groups.
// If Completed is empty at build time, the group is omitted entirely — never shown empty.
export const certifications: Certification[] = [
  {
    name: "AWS Certified Data Engineer — Associate (DEA-C01)",
    issuer: "Amazon Web Services",
    status: "in-progress",
    date: "2026-08",
    context:
      "Deepening cloud-native data engineering fundamentals: Glue, Redshift, Kinesis, S3, and Lambda-based ingestion patterns.",
  },
];

export const completedCertifications = certifications.filter(
  (c) => c.status === "completed",
);

export const inProgressCertifications = certifications.filter(
  (c) => c.status === "in-progress",
);
