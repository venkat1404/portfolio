# Case Study Outline — Financial Complaint Resolution System

**Slug:** `financial-complaint-resolution`
**Homepage rank:** 1 (flagship)
**Target length:** 1,200–1,400 words
**GitHub:** https://github.com/venkat1404/complaint-agent
**Attribution:** Solo · self-directed personal project
**Framing:** "Picked a real regulatory dataset to explore whether a small multi-agent system with strict JSON handoffs could handle a real workflow end-to-end. Wasn't a class assignment or hackathon — wanted to see how far the pattern would scale on my own."
**Date:** Apr 2026

## Story spine

**Business question that would be worth paying to answer:**
> When you receive thousands of consumer financial complaints, how do you route each one to the right team, catch systemic issues before they become regulatory findings, and reply to the customer with a legally defensible letter — without hiring a room full of analysts?

**The technical answer:** a small three-agent pipeline where a cheap model handles classification, a stronger model does routing and root-cause work, and a third generates regulator-cited response letters. Cost-optimized, JSON-strict, prompt-injection-hardened.

## Section-by-section beats

### TL;DR card (top, 3 lines)
- **Problem:** manually triaging CFPB-style consumer complaints doesn't scale.
- **Solution:** three specialized Claude agents (Haiku → Sonnet → Sonnet), each producing strict JSON handoffs.
- **Result:** ~500-complaint sample processed end-to-end with zero manual triage, 148 systemic patterns surfaced, every case routed to one of four teams with a regulator-cited draft response.

### Overview (~120 words)
Frame the CFPB complaint database as a real regulatory dataset — 49,332 with-narrative complaints across credit card, mortgage, and debt collection products. Frame the CFPB as the actual agency U.S. banks report to. Establish the problem in one sentence: banks buy triage systems for this exact workflow.

### Problem (~150 words)
Real complaint queues have three simultaneous jobs: (1) classify severity and compliance risk, (2) route to the right team fast, (3) draft a response that a lawyer wouldn't rewrite. Manual triage does all three badly at scale. Rule-based classifiers do (1) OK but fall over on (2) and (3). Single-LLM-call systems can do all three at once but tend to hallucinate compliance citations and don't cleanly separate concerns for audit.

### Business context (~100 words)
Why a hiring manager should care: this is not a toy chatbot. It's a compliance-adjacent workflow that resembles what BI/data engineering teams build for insurers, banks, and fintech operations. The dataset is public, the regulators are real (FCRA, GLBA, Regulation Z), and the routing logic mirrors real ticketing systems.

### Data sources (~90 words)
- CFPB Consumer Complaint Database (public).
- Filtered to complaints with narratives.
- Stratified 1% sample: ~500 records across three product categories.
- Note: full pipeline could scale to the full 49,332 — the sample was a cost decision, not an architectural one.

### Architecture (with SVG diagram)

```
[CSV: 49,332 CFPB complaints]
        │
        ▼
[Preprocess: stratified 1% sample → ~500 rows, cleaned narratives]
        │
        ▼
┌──────────────────────────────────────────────────────────┐
│  Agent 1 · Classifier (Claude Haiku)                     │
│  → product · issue · severity 1–5 · compliance risk      │
└──────────────────────────────────────────────────────────┘
        │  JSON
        ▼
┌──────────────────────────────────────────────────────────┐
│  Agent 2 · Root Cause + Router (Claude Sonnet)           │
│  → root cause · fraud/billing/servicing/operations team  │
└──────────────────────────────────────────────────────────┘
        │  JSON
        ▼
┌──────────────────────────────────────────────────────────┐
│  Agent 3 · Resolution Planner (Claude Sonnet)            │
│  → remediation steps · FCRA/GLBA/Reg Z-cited letter      │
└──────────────────────────────────────────────────────────┘
        │
        ▼
[Streamlit dashboard: batch view · single-case review · patterns]
```

Build this as a proper SVG matching the design system in Phase 7.

### Technical stack — *why* each choice (~180 words)
- **Claude Haiku for Agent 1:** classification is high-volume, low-complexity. Haiku costs ~1/10 of Sonnet at similar quality for structured extraction. This is the cost-optimization move senior engineers care about.
- **Claude Sonnet for Agents 2 & 3:** root-cause reasoning and letter drafting need stronger judgment. Sonnet is the right tier — not Opus, not Haiku.
- **Strict JSON contract between agents:** every handoff validated against a schema. If Agent 1 returns bad JSON, downstream agents never see it. This is what makes the pipeline debuggable.
- **Regex-based JSON extraction:** because models sometimes wrap JSON in prose, extraction has to be forgiving.
- **Prompt injection safeguards:** every agent's system prompt tells it to ignore instructions embedded in complaint narratives. Complaints are user input, and user input in an LLM context is untrusted.
- **0.5s rate-limiting:** avoids hitting API limits during batch runs.
- **Streamlit + Plotly frontend:** ships a reviewable interface without spinning up a full webapp.

### Approach (~150 words)
Walkthrough of a single complaint being processed end-to-end. Show the raw input, the Agent 1 JSON, the Agent 2 JSON, the Agent 3 letter. This makes the abstract architecture concrete.

### Challenges (~120 words)
**TODO — need Venkat's input.** Candidate challenges to develop:
- Getting reliable JSON out of Claude Haiku (temperature, prompt structure, retry logic).
- Rate limiting when running the batch.
- Prompt injection: at least one CFPB complaint narrative contains something that could be read as an instruction. Show how the guardrail caught it.
- Deciding between Haiku and Sonnet for Agent 1 — the honest trade-off analysis.

Pick 1–2 that actually happened.

### Results (large metric grid)
- **~500 complaints** processed end-to-end (from a 49,332 dataset).
- **148 systemic patterns** surfaced by Agent 2's cross-batch analysis.
- **Zero manual triage** — every case routed to one of 4 internal teams.
- **~10-day** average estimated resolution time in generated letters.
- **Cost per complaint:** ~$0.0X in Anthropic API calls (calculate from actual token counts).

### Business impact (~120 words)
Translate technical wins to money and time. A 10-analyst complaint desk running 8 hours a day costs ~$X/year fully loaded. This pipeline reduces that to a review-and-approve workflow. That's the pitch a hiring manager reads.

### Lessons learned (~100 words)
**TODO — need Venkat's honest reflection.** Options:
- Model-tier choice is a first-class engineering decision, not an afterthought.
- Strict JSON is the only thing that makes multi-agent pipelines maintainable.
- The letter agent is the trust bottleneck — one hallucinated regulation citation collapses credibility.

### Future improvements (~90 words)
- Add explicit eval harness (Deep Eval, Braintrust) so agent-swap regressions are visible.
- Structured logging + observability (Langfuse / OpenTelemetry).
- Human-in-the-loop review UI where reviewers can accept, edit, or reject Agent 3's letter and that feedback becomes training data.
- Scale to full 49,332 dataset with parallel batch processing.

### Prev / Next navigation
- Next: Short-Term Rental Quality

## Visual assets needed (Phase 2b + Phase 7)

1. **Hero visual:** Streamlit dashboard screenshot showing the batch-view or a single complaint's resolved output. — Phase 2b (clone + run locally).
2. **Architecture SVG:** the three-agent flow, matching the design system. — Phase 7.
3. **Single-complaint walkthrough:** either 3 stacked JSON blocks (Agent 1 → 2 → 3) or a 3-panel screenshot. — Phase 7.
4. **Optional:** cost comparison chart (Haiku vs Sonnet on Agent 1) if Venkat has that data.

## Content gaps blocking Phase 7 for this project
- Business framing origin (hackathon? class? side project?) — CONTENT_GAPS.md §3.1
- One honest challenge that actually happened — CONTENT_GAPS.md §3.1
- One honest reflection for Lessons Learned — CONTENT_GAPS.md §3.1
- Whether Streamlit app is deployed anywhere — CONTENT_GAPS.md §3.1
