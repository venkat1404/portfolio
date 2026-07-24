import type { SiteMeta } from "./types";

// Source of truth for site metadata, contact info, and default SEO strings.
// Every fact here is verified against the resume PDF.
export const site: SiteMeta = {
  name: "Venkat Gollangi",
  role: "Data Engineer",
  location: "College Park, MD",
  email: "venkat14@umd.edu",
  phone: "(240) 886-9396",
  linkedinUrl: "https://www.linkedin.com/in/venkat-gollangi/",
  githubUrl: "https://github.com/venkat1404",
  resumeUrl: "/resume.pdf",
  availability:
    "Available for Fall 2026 co-op and January 2027 full-time or internship roles.",
  workAuthorization: "Authorized to work in the USA",
};

// Target role list - used in hero subline keyword optimization and SEO.
export const targetRoles = [
  "Data Engineer",
  "BI Engineer",
  "Business Intelligence Engineer",
  "Analytics Engineer",
  "Data Analyst",
  "Entry-level Data Scientist",
] as const;

// Default SEO metadata. Per-route overrides live in each route's layout/page.
export const seo = {
  titleTemplate: "%s · Venkat Gollangi",
  defaultTitle: "Venkat Gollangi · Data Engineer & Analytics Engineer",
  defaultDescription:
    "MS Information Systems at UMD Smith (GPA 3.95, Terrapin Scholar). Built production ETL pipelines at Accordion India, multi-agent AI systems on the Anthropic API, and ML models placing 8th of 35 teams on Kaggle-style leaderboards.",
  ogImageUrl: "/og/default.png",
} as const;
