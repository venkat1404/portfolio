# Case Study Outline — AI-Powered Healthcare Insurance Fraud Detection

**Slug:** `healthcare-fraud-detection`
**Homepage rank:** 3
**Target length:** 1,100–1,300 words
**GitHub:** https://github.com/venkat1404/Healthcare-Fraud-Detection
**Attribution:** Team of 7 — UMD BUDT 751, Spring 2026 (contributors + role split pending — CONTENT_GAPS.md §3.3)
**Date:** May 2026

## Story spine

**The business setting:** small and mid-sized health insurers, Medicaid administrators, and third-party claims processors currently identify suspicious claims through manual review and static rules. That misses fraud, generates false positives, slows investigations, and increases loss ratios.

**What we built:** a decision-support system — not a replacement — that scores providers and claims for fraud risk, wires the scores into a 5-tier operational routing policy, and ships a 6-page Streamlit command center so investigators can actually use it. Responsible-AI guardrails (human-review floors, no-history no-auto-denial, calibrated confidence thresholds) are enforced in the routing layer, not left to policy documents.

## Section-by-section beats

### TL;DR card
- **Problem:** healthcare fraud triage is currently manual + static rules — misses fraud, floods investigators with false positives.
- **Solution:** provider-level risk scoring (LogReg, RF, XGBoost) + a 5-tier decision automation engine + Streamlit command center.
- **Result:** ROC-AUC 0.951 on the primary model; structured a fraud review workflow from unstructured triage into 3 risk-tiered claim queues.

### Overview (~120 words)
Frame the healthcare fraud problem in real numbers: US healthcare fraud is estimated in the tens of billions annually. Small insurers can't hire enough investigators. The role of AI here is triage prioritization — decide which cases a human looks at first.

### Problem (~120 words)
Two failures we designed against:
1. **Rule-based systems miss novel patterns.** Static rules encode fraud we've seen; fraudsters iterate.
2. **Black-box ML denials burn trust.** Insurers can't legally auto-deny claims without human review. Any system that ignores this fails deployment.

### Business context (~110 words)
Concrete stakeholders: a fraud investigator, a payments-team analyst, a compliance lead. Each cares about a different metric. The Streamlit dashboard has different pages for each. This is what "designed for the user" means for a data product.

### Data sources (~110 words)
- **Primary:** Kaggle *Healthcare Provider Fraud Detection Analysis* — merged from beneficiary demographics, inpatient claims, outpatient claims, and provider-level fraud labels.
- **Secondary:** synthetic claim-level dataset for the Streamlit demo panels, where entering realistic PHI would be inappropriate.
- Provider-level target: `PotentialFraud` (binary, from provider labels).

### Feature engineering (~150 words)
15+ provider-level features engineered by aggregating claims:
- Total claims count
- Inpatient / outpatient claim counts
- Average and total reimbursed claim amount
- Average and total deductible amount
- Unique beneficiaries per provider
- Unique physicians per provider
- Average claim duration
- Average chronic-condition count per beneficiary
- Average patient age
- % of claims with admitted diagnosis code
- Unique diagnosis and procedure codes

### Architecture (with SVG diagram)

```
[Beneficiary + Inpatient + Outpatient + Provider Labels]
                    │
                    ▼
    [Merge on BeneID and Provider — provider-level view]
                    │
                    ▼
    [Feature Engineering — 15+ provider-level features]
                    │
                    ▼
    ┌──────────────────────────────────────────────────┐
    │  Model bake-off                                  │
    │  LogReg · Random Forest · XGBoost (sklearn fbk)  │
    └──────────────────────────────────────────────────┘
                    │
                    ▼  Best: LogReg, ROC-AUC 0.951
    ┌──────────────────────────────────────────────────┐
    │  5-Tier Decision Automation Engine               │
    │  0.00–0.30  → Auto Approve (Low)                 │
    │  0.30–0.70  → Human Review (Medium)              │
    │  0.70–1.00  → Investigate Before Payment (High)  │
    │  + guardrails:                                   │
    │    • claims ≥ $10k → mandatory human review     │
    │    • confidence < 80% → mandatory human review  │
    │    • no prior fraud → no auto-denial            │
    └──────────────────────────────────────────────────┘
                    │
                    ▼
    [Streamlit Command Center — 6 pages]
      · Batch scoring
      · Threshold configuration
      · Single-case investigator review
      · Business impact calculator
      · Responsible-AI reference
      · Model comparison
```

### Technical choices — *why* (~180 words)
- **Provider-level modeling over claim-level:** individual claims are noisy; provider aggregates catch the systemic patterns fraudsters emit across many claims. This is a real modeling decision, not laziness.
- **Model bake-off (LogReg + RF + XGBoost with sklearn fallback):** XGBoost isn't always installable; graceful degradation matters for a deployable system.
- **Threshold policy in code, not policy:** three business thresholds (0.30 / 0.50 / 0.70) are configurable in the Streamlit UI. Compliance leads can tune without redeploying.
- **Human-review floors:** claims ≥ $10k, confidence < 80%, and providers with no prior fraud history all bypass any auto-denial path. These aren't suggestions in a doc — they're enforced.
- **Streamlit for the delivery layer:** insurance-team analysts aren't going to install Jupyter. Streamlit gets them a real interface for the cost of not building a frontend.

### Evaluation (~130 words)
Class imbalance is severe in fraud detection, so accuracy alone is misleading. Report: accuracy, precision, recall, F1, ROC-AUC, confusion matrix, top-flagged precision at operational thresholds.
- **Primary provider model (Logistic Regression): ROC-AUC 0.951.**
- Random Forest and XGBoost also compared for robustness.

### Results (metric grid)
- **ROC-AUC 0.951** (primary provider-level LogReg).
- **6-page Streamlit command center** ships as the delivery layer.
- **5-tier decision automation engine** structures the human workflow.
- **Fraud triage** compressed from unstructured manual work into 3 risk-tiered queues.

### Responsible AI (~120 words)
This section is non-negotiable for a healthcare case study — it's the difference between "I trained a model" and "I built a system a hospital could deploy." Cover:
- **False positive cost:** denied legit claims delay care and damage trust.
- **False negative cost:** paid fraudulent claims raise premiums.
- **The guardrails:** $10k floor, 80% confidence floor, no-history no-auto-denial.
- **Explainability:** SHAP roadmap for per-provider explanations (currently future work).
- **Limitations acknowledged:** Kaggle labels reflect potential fraud, not final legal determinations; synthetic secondary dataset doesn't capture operational complexity; deployment needs monitoring, drift detection, audit logging.

### Lessons learned (~110 words)
- **The delivery layer is half the project.** A dashboard that a claims analyst can actually use is worth more than a marginally better AUC.
- **TODO:** what did the team learn that most fraud-detection projects don't? Venkat input needed.

### Future improvements
- SHAP-based local explanations for investigators.
- Provider–physician–beneficiary network features.
- Probability calibration + threshold optimization against investigation cost.
- Analyst feedback loop → retraining pipeline.

### Prev / Next navigation
- Prev: Short-Term Rental Quality
- Next (loop): Financial Complaint Resolution

## Visual assets needed (Phase 2b + Phase 7)

1. **Hero visual:** Streamlit command center screenshot — batch scoring page or single-case review. **Phase 2b — clone + run locally.**
2. **Architecture SVG:** the pipeline shown above. — Phase 7.
3. **ROC curve / threshold sweep chart** — from the notebooks. — Phase 7 or 2b.

## Content gaps blocking Phase 7 for this project
- Contributor names (7 people) — CONTENT_GAPS.md §3.3
- Venkat's specific role in the team — CONTENT_GAPS.md §3.3
- Whether Streamlit app is deployed anywhere — CONTENT_GAPS.md §3.3
- One honest team-level lesson learned — CONTENT_GAPS.md §3.3
