import type { ExperienceEntry } from "./types";

// Ordered newest-first. Every bullet is outcome-led (result first, mechanism second).
// Copy is adapted from the resume — same facts, tightened for scannability.
export const experience: ExperienceEntry[] = [
  {
    company: "Accordion India",
    subtitle: "Global Private Equity Consulting & Analytics Hub",
    roles: [
      {
        title: "Data Engineer",
        startDate: "2024-06",
        endDate: "2025-06",
        bullets: [
          "Accelerated downstream reporting 40% by building scalable SSIS ETL pipelines for US private equity portfolio companies, ingesting HubSpot, Google Analytics, and UKG data.",
          "Cut manual effort by 20+ hours a month by automating repetitive workflows with UiPath and Power Automate.",
          "Lifted client Net Promoter Score 20% by developing Power BI dashboards that gave stakeholders direct visibility into KPI movement.",
          "Reduced new-pipeline development time 35% by creating reusable SSIS templates and standardizing data ingestion.",
        ],
        tech: ["SSIS", "SQL", "Power BI", "UiPath", "Power Automate", "SSMS"],
      },
      {
        title: "Technical Associate Intern",
        startDate: "2024-01",
        endDate: "2024-06",
        bullets: [
          "Reduced critical-report query execution time 25% by partnering with senior engineers to optimize reporting-pipeline SQL.",
          "Improved pipeline success rate 30% by monitoring and troubleshooting recurring ETL job failures.",
          "Contributed to the design of five KPI dashboards in collaboration with business and engineering teams.",
        ],
        tech: ["SQL", "SSIS", "SSMS"],
      },
    ],
  },
  {
    company: "Get9nine Soft Private Ltd",
    roles: [
      {
        title: "Data Analyst Intern",
        startDate: "2023-06",
        endDate: "2023-08",
        bullets: [
          "Achieved 88% accuracy on a multiclass sensor classification system for automated food-quality inspection using Scikit-learn (KNN, SVM, Random Forest) on IoT sensor data from a Bosch BME688.",
          "Collaborated with a three-member team on sensor calibration, feature extraction, and classification-pipeline development.",
        ],
        tech: ["Python", "Scikit-learn", "IoT"],
      },
    ],
  },
  {
    // NOTE: Resume categorizes Chords & Co. under "Leadership and Volunteer Experience."
    // I've placed it in Experience per v1 pattern — the A/B testing + analytics work is
    // legitimately data-relevant. Flagged in CONTENT_GAPS.md §7 for approval.
    company: "Chords & Co.",
    roles: [
      {
        title: "Content Analytics Lead",
        startDate: "2022-07",
        endDate: "2023-05",
        bullets: [
          "Grew the account 40% in three months by running A/B tests on content formats and posting schedules, using Instagram Insights to isolate the variables that drove follower growth.",
          "Pushed average post reach up 60% and engagement rate 25% by building a weekly performance-tracking cadence across reach, engagement, and impressions.",
        ],
        tech: ["Instagram Insights", "A/B testing", "Analytics"],
      },
    ],
    volunteer: true,
  },
];
