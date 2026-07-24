import type { Project } from "./types";

// Featured order (spec-locked in Phase 0): Complaint → Rental → Healthcare on home.
// Spotify appears on /projects only as a lightweight card, no case study.
// Skydiving and IoT are excluded (see AUDIT.md §2, IoT stays as an experience bullet).
export const projects: Project[] = [
  {
    slug: "financial-complaint-resolution",
    title: "Financial Complaint Resolution System",
    summary:
      "3-agent AI pipeline on the Anthropic API that classifies, routes, and drafts regulator-cited responses to CFPB financial complaints.",
    description:
      "A production-shaped pipeline that turns raw CFPB consumer complaints into routed, drafted, and regulator-cited responses without human triage. Agent 1 (Claude Haiku) classifies product / issue / severity / compliance risk; Agent 2 (Claude Sonnet) analyzes root cause and routes to one of four internal teams; Agent 3 (Claude Sonnet) generates remediation steps and customer letters citing FCRA, GLBA, and Regulation Z. Cost-optimized model selection, strict JSON handoffs, prompt-injection safeguards, and a Streamlit dashboard for review.",
    date: "2026-04",
    filters: ["ML", "Engineering"],
    metrics: [
      { value: "49,332", label: "CFPB complaints in source dataset" },
      { value: "~500", label: "processed through 3-agent pipeline" },
      { value: "148", label: "systemic patterns surfaced" },
      { value: "4", label: "internal teams routed to" },
    ],
    tech: [
      "Anthropic API",
      "Claude Haiku",
      "Claude Sonnet",
      "Python",
      "Streamlit",
      "Plotly",
      "Pandas",
    ],
    githubUrl: "https://github.com/venkat1404/complaint-agent",
    featured: 1,
    attribution: { role: "Solo · self-directed" },
  },
  {
    slug: "short-term-rental-quality",
    title: "Predictive Modeling for Short-Term Rental Quality",
    summary:
      "100+ engineered features, nested CV over 6 classifier families, LightGBM AUC 0.8214, finishing 8th of 35 teams in the UMD Data Mining course competition.",
    description:
      "A supervised classification project predicting whether a short-term rental listing earns a perfect rating score. Feature engineering did more of the work than model selection: log-transformed skewed price columns, per-person price ratios, 15+ amenity presence flags, TF-IDF + TruncatedSVD compression of listing text, target-encoded high-cardinality categoricals, KMeans-derived listing-type labels, and interaction terms. Benchmarked 6 classifier families under a nested holdout with 5-fold inner CV; LightGBM lifted AUC from a 0.7511 baseline to 0.8214 after AUC-focused tuning and three rounds of early stopping.",
    date: "2026-03",
    filters: ["ML", "Analytics"],
    metrics: [
      { value: "AUC 0.8214", label: "8th of 35 teams" },
      { value: "100+", label: "engineered features" },
      { value: "6", label: "classifier families benchmarked" },
      { value: "+0.07 AUC", label: "over 0.7511 baseline" },
    ],
    tech: [
      "Python",
      "LightGBM",
      "Scikit-learn",
      "TF-IDF",
      "TruncatedSVD",
      "KMeans",
      "Pandas",
      "NumPy",
    ],
    githubUrl: "https://github.com/venkat1404/airbnb-rental-quality-classification",
    featured: 2,
    attribution: {
      // Team names confirmed from README; role split needs Venkat input (CONTENT_GAPS §3.2).
      role: "Team member, feature engineering & LightGBM tuning (pending)",
      teamSize: 3,
      contributors: ["Venkat Gollangi", "Anish Rao Tumla", "Rohith Kumar Tappa"],
    },
  },
  {
    slug: "healthcare-fraud-detection",
    title: "AI-Powered Healthcare Insurance Fraud Detection",
    summary:
      "Provider-level fraud scoring on Kaggle healthcare data. Logistic Regression hit ROC-AUC 0.951; wired into a 5-tier decision-automation engine and a 6-page Streamlit command center.",
    description:
      "A UMD business-school capstone (BUDT 751, Spring 2026) that builds a decision-support system for small and mid-sized insurers. Provider-level features engineered from merged inpatient, outpatient, and beneficiary claims data drive Logistic Regression (ROC-AUC 0.951), Random Forest, and XGBoost models with sklearn boosting fallback. A 5-tier decision-automation engine converts fraud probabilities into operational routing actions (auto-approve through payment hold), enforced by responsible-AI guardrails: mandatory human review above $10,000 flagged claims, no auto-denial without prior fraud history, and a 6-page Streamlit command center for batch scoring, single-case review, and business-impact calculation.",
    date: "2026-05",
    filters: ["ML", "Engineering"],
    metrics: [
      { value: "ROC-AUC 0.951", label: "provider-level Logistic Regression" },
      { value: "15+", label: "engineered provider features" },
      { value: "5-tier", label: "decision automation engine" },
      { value: "6 pages", label: "Streamlit command center" },
    ],
    tech: [
      "Python",
      "Scikit-learn",
      "XGBoost",
      "Random Forest",
      "Streamlit",
      "Pandas",
      "SHAP",
    ],
    githubUrl: "https://github.com/venkat1404/Healthcare-Fraud-Detection",
    featured: 3,
    attribution: {
      // 7-person team per README. Role and contributor names needed (CONTENT_GAPS §3.3).
      role: "Team member, role pending",
      teamSize: 7,
    },
  },
  {
    slug: "spotify-hit-song-classification",
    title: "Spotify Hit Song Classification",
    summary:
      "Random Forest classifier on 30,000 Spotify tracks (1957–2020). Precision 0.83 · recall 0.59 · 3.4× lift in top decile. Production traits beat mood features.",
    description:
      "A BUDT 704 group project asking: can you predict whether a song will be a hit from audio features alone? Four-person team benchmarked Logistic Regression (learned to call everything a non-hit under class imbalance) against a grid-searched Random Forest, which delivered 0.83 precision, 0.59 recall, and a 3.4× lift in the top 10% of predictions. The interesting finding was interpretive: the top predictors were instrumentalness, loudness, and energy (production traits), not valence, tempo, or danceability. How a song is produced matters more than how it makes you feel.",
    date: "2025-12",
    filters: ["ML", "Analytics"],
    metrics: [
      { value: "0.83", label: "precision" },
      { value: "0.59", label: "recall" },
      { value: "3.4×", label: "lift in top decile" },
      { value: "30k", label: "songs analyzed (1957–2020)" },
    ],
    tech: ["Python", "Scikit-learn", "Random Forest", "Pandas", "Matplotlib"],
    githubUrl: "https://github.com/venkat1404/spotify-hit-song-classification",
    // Not featured - lives on /projects only.
    attribution: {
      role: "Team member",
      teamSize: 4,
      contributors: ["Brenda Ngaba", "Venkat Gollangi", "Anish Rao Tumla", "Rohith Kumar Tappa"],
    },
  },
];

export const featuredProjects = projects
  .filter((p): p is Project & { featured: NonNullable<Project["featured"]> } =>
    Boolean(p.featured),
  )
  .sort((a, b) => a.featured - b.featured);
