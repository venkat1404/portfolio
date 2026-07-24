// Hero copy. Locked after Venkat approval (Phase 2 review).
// Structure per spec §8: eyebrow → H1 → subline → CTA row.
// Ban list is honored (no "passionate," "results-driven," etc.).
export const hero = {
  eyebrow: {
    statusDot: true, // renders a small green dot to signal availability
    text: "Available for Fall 2026 co-op · Jan 2027 full-time & internship · College Park, MD",
  },
  headline: "I build data pipelines and analytics that earn their keep.",
  subline:
    "Data Engineer with production ETL experience across HubSpot, Google Analytics, and UKG at Accordion, accelerating downstream reporting 40% and cutting manual work 20+ hours a month.",
  primaryCta: {
    label: "View projects",
    href: "#projects",
  },
  secondaryCta: {
    label: "Download resume",
    href: "/resume.pdf",
    download: true,
  },
} as const;
