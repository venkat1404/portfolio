// Shared types for all content data modules.
// These are pure data types — no framework dependencies — so they can be
// consumed by both server components (App Router) and MDX frontmatter validators.

export type ProjectSlug =
  | "financial-complaint-resolution"
  | "short-term-rental-quality"
  | "healthcare-fraud-detection"
  | "spotify-hit-song-classification";

export type SkillCategory =
  | "Data Engineering & Pipelines"
  | "Analytics & BI"
  | "Programming & Databases"
  | "Cloud & Infrastructure"
  | "ML & AI"
  | "Automation";

export type Skill = {
  name: string;
  category: SkillCategory;
  usedIn?: ProjectSlug[];
  /** For skills whose evidence lives in experience rather than a project. */
  usedAt?: string[];
};

export type ExperienceRole = {
  title: string;
  startDate: string; // YYYY-MM
  endDate: string | "Present"; // YYYY-MM or "Present"
  bullets: string[];
  tech?: string[];
};

export type ExperienceEntry = {
  company: string;
  location?: string;
  subtitle?: string; // e.g. "Global Private Equity Consulting & Analytics Hub"
  roles: ExperienceRole[]; // supports promotions within one company
  /** True if this is a leadership/volunteer position vs. paid work. */
  volunteer?: boolean;
};

export type Education = {
  institution: string;
  location: string;
  degree: string;
  gpa?: string;
  startDate: string; // YYYY-MM
  endDate: string; // YYYY-MM
  achievements?: string[];
  coursework?: string[];
};

export type CertificationStatus = "in-progress" | "completed";

export type Certification = {
  name: string;
  issuer: string;
  status: CertificationStatus;
  /** For completed: date earned (YYYY-MM). For in-progress: target date (YYYY-MM). */
  date?: string;
  credentialId?: string;
  credentialUrl?: string;
  /** One-line context — why it matters. Required for in-progress items. */
  context?: string;
};

export type ExploringEntry = {
  title: string;
  status: string; // e.g. "In progress · exam Aug 2026" or "Building"
  why: string; // one sentence connecting to target roles
  iconKey: string; // maps to a Lucide icon in the component
};

export type ProjectFilter = "Engineering" | "Analytics" | "ML";

export type MetricChip = {
  value: string; // e.g. "AUC 0.8214"
  label: string; // e.g. "8th of 35 teams"
};

export type Project = {
  slug: ProjectSlug;
  title: string;
  /** One-line outcome-led description for the card. */
  summary: string;
  /** Longer description for the case study hero and OG metadata. */
  description: string;
  date: string; // YYYY-MM
  filters: ProjectFilter[];
  metrics: MetricChip[];
  tech: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  /** Position in the featured list on the home page. Absent = not featured. */
  featured?: 1 | 2 | 3 | 4;
  /** Team size and role — required for team projects, "Solo" for solo. */
  attribution: {
    role: "Solo" | string;
    teamSize?: number;
    contributors?: string[];
  };
};

export type SiteMeta = {
  name: string;
  role: string;
  location: string;
  email: string;
  phone?: string;
  linkedinUrl: string;
  githubUrl: string;
  resumeUrl: string;
  availability: string;
  workAuthorization: string;
};
