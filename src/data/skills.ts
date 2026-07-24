import type { Skill } from "./types";

// Grouped by capability (spec §5.2 point 5). Each skill links to the project
// or experience that proves it. Skills without evidence do not appear here —
// this is a proof layer, not a claim layer.
//
// Categories (spec-mandated 6):
//   Data Engineering & Pipelines / Analytics & BI / Programming & Databases
//   / Cloud & Infrastructure / ML & AI / Automation
export const skills: Skill[] = [
  // Data Engineering & Pipelines
  { name: "SSIS", category: "Data Engineering & Pipelines", usedAt: ["Accordion India"] },
  { name: "Azure Data Factory", category: "Data Engineering & Pipelines", usedAt: ["UMD coursework: BUDT737"] },
  { name: "Snowflake", category: "Data Engineering & Pipelines", usedAt: ["UMD coursework: BUDT737"] },
  { name: "Kafka", category: "Data Engineering & Pipelines", usedAt: ["UMD coursework: BUDT737"] },
  { name: "SSMS", category: "Data Engineering & Pipelines", usedAt: ["Accordion India"] },

  // Analytics & BI
  { name: "Power BI", category: "Analytics & BI", usedAt: ["Accordion India"] },
  { name: "DAX", category: "Analytics & BI", usedAt: ["Accordion India"] },
  { name: "Tableau", category: "Analytics & BI", usedAt: ["UMD coursework"] },
  { name: "Excel", category: "Analytics & BI", usedAt: ["Accordion India"] },

  // Programming & Databases
  { name: "Python", category: "Programming & Databases", usedIn: ["financial-complaint-resolution", "short-term-rental-quality", "healthcare-fraud-detection", "spotify-hit-song-classification"] },
  { name: "SQL", category: "Programming & Databases", usedAt: ["Accordion India"] },
  { name: "R", category: "Programming & Databases", usedAt: ["UMD coursework: BUDT733"] },
  { name: "Pandas", category: "Programming & Databases", usedIn: ["short-term-rental-quality", "healthcare-fraud-detection", "spotify-hit-song-classification"] },
  { name: "NumPy", category: "Programming & Databases", usedIn: ["short-term-rental-quality", "healthcare-fraud-detection"] },
  { name: "MongoDB", category: "Programming & Databases", usedAt: ["UMD coursework"] },
  { name: "Neo4j", category: "Programming & Databases", usedAt: ["UMD coursework"] },
  { name: "Git", category: "Programming & Databases", usedAt: ["All projects"] },

  // Cloud & Infrastructure
  { name: "Microsoft Azure", category: "Cloud & Infrastructure", usedAt: ["Accordion India", "UMD coursework: BUDT737"] },
  { name: "AWS", category: "Cloud & Infrastructure", usedAt: ["UMD coursework: BUDT737", "AWS DEA-C01 prep"] },
  { name: "Docker", category: "Cloud & Infrastructure", usedAt: ["UMD coursework: BUDT758O"] },

  // ML & AI
  { name: "Scikit-learn", category: "ML & AI", usedIn: ["short-term-rental-quality", "healthcare-fraud-detection", "spotify-hit-song-classification"] },
  { name: "LightGBM", category: "ML & AI", usedIn: ["short-term-rental-quality"] },
  { name: "XGBoost", category: "ML & AI", usedIn: ["healthcare-fraud-detection"] },
  { name: "Anthropic API", category: "ML & AI", usedIn: ["financial-complaint-resolution"] },
  { name: "OpenAI API", category: "ML & AI", usedAt: ["UMD coursework: BUDT758O"] },
  { name: "RAG", category: "ML & AI", usedAt: ["UMD coursework: BUDT758O"] },
  { name: "Prompt Engineering", category: "ML & AI", usedIn: ["financial-complaint-resolution"] },

  // Automation
  { name: "UiPath", category: "Automation", usedAt: ["Accordion India"] },
  { name: "Power Automate", category: "Automation", usedAt: ["Accordion India"] },
  { name: "Dify", category: "Automation", usedAt: ["UMD coursework: BUDT758O"] },
];
