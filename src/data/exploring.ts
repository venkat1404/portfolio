import type { ExploringEntry } from "./types";

// "Currently Exploring" section (spec §5.3): 3–4 refined cards demonstrating
// curiosity, momentum, and growth. Each `why` connects the learning to the
// target Data Engineer / BI Engineer / Data Analyst roles.
export const exploring: ExploringEntry[] = [
  {
    title: "AWS Certified Data Engineer, Associate",
    status: "Preparing · exam August 2026",
    why: "The gap between SSIS-on-Azure work at Accordion and modern cloud-native pipelines (Glue, Kinesis, Redshift) is the biggest single thing to close before graduation.",
    iconKey: "cloud",
  },
  {
    title: "Multi-agent AI systems with the Anthropic API",
    status: "Building",
    why: "The Financial Complaint Resolution System was the first real one. Extending the pattern to observability and eval harnesses that let a small team ship agents to production without regressions.",
    iconKey: "sparkles",
  },
  {
    title: "Modern gradient boosting for tabular data",
    status: "Studying",
    why: "The Airbnb project confirmed LightGBM beats deep-learning tabular baselines when features are engineered well. Going deeper into monotonic constraints, quantile regression, and probability calibration for decision-support use cases.",
    iconKey: "line-chart",
  },
];
