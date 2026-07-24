# Content Gaps & Open Questions

This file tracks: (1) facts I could not verify from source materials, (2) content decisions that need your input, (3) copy that needs your approval before shipping, and (4) GitHub repo README quality issues to fix before v2 launches.

I will not invent anything on this list. Each item is either a question for you or a decision I'll make and you approve.

---

## 1. Hero copy — RESOLVED

**Locked (Candidate A structure, rephrased):**
> **Eyebrow:** ● Available for full-time roles (Dec 2026) & summer 2026 internships · College Park, MD
>
> **H1:** I build data pipelines and analytics that earn their keep.
>
> **Sub:** Data Engineer with production ETL experience across HubSpot, Google Analytics, and UKG at Accordion — accelerating downstream reporting 40% and cutting manual work 20+ hours a month.

*"Pay their own way" → "earn their keep."* Same ROI framing, cleaner idiom. Committed to `src/data/hero.ts`. Location assumed College Park, MD (UMD address); revise if wrong.

---

## 2. Factual conflicts to resolve

### 2.1 CFPB dataset size — RESOLVED
- **Resolution:** Total dataset = 49,332 with-narrative complaints. Pipeline processed a **~500-record stratified 1% sample** (`complaints_sample.csv` in the repo). v1 was wrong to claim "49,332 processed."
- v2 will state it as: *"processed a stratified sample of ~500 complaints drawn from a 49,332-complaint CFPB dataset spanning credit card, mortgage, and debt-collection product lines."*
- **Approve or revise this phrasing.**

### 2.2 Resume version — RESOLVED
- Both resumes are current. v2 features projects from both: Financial Complaint (both), Short-Term Rental (Resume 2 only), Healthcare Fraud (Resume 1 only).
- **Decision:** `/resume.pdf` will serve `Venkat_Resume.pdf` (Healthcare Fraud version).
- **⚠ Known mismatch:** the portfolio will feature Short-Term Rental as project #2, but the served resume won't list it. Recruiters cross-checking will notice. **Recommendation:** produce a merged master resume that lists all three projects. Not blocking v2 launch, but worth doing before applying anywhere. Flagged in DECISIONS.md.
- **Action required from Venkat:** place the actual `Venkat_Resume.pdf` at `/public/resume.pdf` when I scaffold Next.js in Phase 5. I'll add a specific note.

### 2.3 Get9nine team attribution
- Resume says "three-member team." v1 also acknowledges this. v2 experience block will say "Collaborated with a three-member team" (already fine). No conflict.

### 2.4 Skydiving project date
- Resume lists as a Manipal "Key Project." Actual date unknown. **Not blocking** — project is excluded from v2 per our earlier decision.

---

## 3. Content I need from you

### 3.1 CFPB / complaint-agent case study — PARTIALLY RESOLVED
- **Framing:** personal project (self-directed learning / regulatory-tech exploration). Confirmed. Case study will frame it as: "picked the CFPB dataset to explore whether a small multi-agent system with strict JSON handoffs could handle a real regulatory workflow end-to-end."
- **`claude-hackathon` repo:** treating as unrelated (or a scratch repo). My call: **recommend deleting it** since it publicly links from your GitHub with an empty README, which is a small credibility drag. **Action required from Venkat:** either delete the repo, or tell me what it is so I can help write a README.
- **Streamlit deployment:** assuming not deployed. Case study will show screenshot(s) but no "Live Demo" button. If you deploy it later, adding the button is a 30-second edit.
- **Challenges + Lessons Learned:** I'll draft candidates from the code (JSON extraction reliability, model-tier cost trade-off) and mark them as "verify with Venkat" in the MDX. Phase 7 review will surface real vs invented ones for your sign-off.

### 3.2 Short-Term Rental case study (BUDT 733) — DEFERRED
- **My call in absence of team-role input:** attribute as "Team of 3 (BUDT 733) — Anish Rao Tumla, Rohith Kumar Tappa, and me" with role framing "shared feature engineering, model selection, and LightGBM tuning across the team." Safe, defensible, doesn't overclaim.
- **Top team's AUC / gap to 8th place:** unknown, will leave uncontextualized. If you know it later, easy edit.
- **Lessons Learned copy:** will use the team's own README finding — "feature engineering moved the needle far more than model choice." This is verifiable and real.
- **Post-competition improvements:** will draft from what the code shows (stacked ensemble, sentence transformers for text, SHAP for explanations). Standard senior moves — safe to include.

### 3.3 Healthcare Fraud case study (BUDT 751, Spring 2026) — DEFERRED
- **My call in absence of names + role:** attribute as "UMD BUDT 751 team of 7 (Spring 2026)" with role framing "contributed to feature engineering, model comparison, and responsible-AI guardrails." **Action optional for Venkat:** send me the 6 other names + your specific role when convenient; I'll swap them in without any structural change.
- **Resume/portfolio mismatch flag:** the resume bullets read as solo-attributed but the project is a team of 7. This is a real trust-issue risk when a recruiter cross-checks. Recommendation for later: adjust the resume bullet to say "contributed to a UMD team of 7 that built..." — same wins, cleaner attribution. Not blocking v2 launch.
- **Streamlit deployment:** assuming not deployed. Same treatment as CFPB — screenshot + link to repo, no live demo button.

### 3.4 About page — RESOLVED (drafted with my calls)
- **Para 1:** Background — Manipal CSE → Accordion (private equity data) → UMD Smith MS. Trajectory framing.
- **Para 2 (belief):** Using **"feature engineering matters more than model choice"** — validated by your own Airbnb project team finding. This is a real, defensible belief and it lets me connect to concrete work in the same paragraph.
- **Para 3:** Current chapter at UMD, targeting DE / BI / DA roles post-Dec 2026.
- **Para 4 (outside work):** FC Barcelona (culer), football (watches + plays), weightlifting, movies, music. Kept restrained — no specific player/director name-drops. Real without being over-shared. Full copy landed in `src/data/about.ts`.

### 3.5 Photo for /about — DEFERRED
- Not provided. Site works without it. `/about` will render fine and you can drop a photo at `/public/photo.jpg` later — the component will pick it up automatically.

---

## 4. GitHub repo README fixes (blocking before v2 launch)

Recruiters will click through from case study → GitHub. If the README is empty or thin, the case study's credibility collapses. Priority order:

### 4.1 `claude-hackathon` — ACTION REQUIRED FROM VENKAT
- README is empty (just the word "demo").
- CFPB project confirmed personal → `claude-hackathon` is orphaned.
- **Recommended action:** delete the repo on GitHub. It publicly links from your profile with no content, which is a small credibility drag on the repo listing hiring managers see.
- If you don't want to delete it, tell me what it actually is and I'll help write a README.

### 4.2 `complaint-agent` — MINOR
- README is decent but doesn't state: sample size (500 vs 49,332), model cost split rationale (Haiku for classification saves ~90% vs Sonnet), prompt injection safeguard note.
- **Action:** I can draft an improved README to include with the case study PR later.

### 4.3 `Healthcare-Fraud-Detection` — MINOR
- Good README + `final_project_summary.md`. Missing: contributor names, your role.
- **Action:** you add team credits before I link to it, or I add them once you tell me.

### 4.4 `airbnb-rental-quality-classification` — MINOR
- Good writing. Missing: link to my case study (once live), which team member did what.
- **Action:** I'll draft an improved README to add contributor roles.

### 4.5 `spotify-hit-song-classification` — FINE
- README is well-written. Good to link.

### 4.6 `portfolio` — will be replaced
- v2 replaces it entirely.

---

## 5. Verification I couldn't complete

- **LinkedIn** (`linkedin.com/in/venkat-gollangi`) requires auth — I couldn't cross-verify against resume. **Please spot-check** that LinkedIn matches: employment dates, job titles, GPA, project list. If any differ, tell me which is truth and I'll align v2 accordingly.
- **Netlify custom domain / DNS** — not needed for v2 launch (staying on `venkatagollangi.netlify.app`), but noted for future.

---

## 6. Contact copy — approve or revise

### Availability line — DECIDED (my call)
- Locked to: *"Open to full-time Data Engineer, BI Engineer, and Data Analyst roles starting December 2026 — and summer 2026 internships. Based in College Park, MD, open to relocation and hybrid."*
- If remote-only or on-site-only, tell me and I'll adjust.

### Contact section headline — DECIDED (my call)
- Locked to: **"Let's talk about a data problem."** — active, inviting, avoids recruiter-y phrasing.

### Footer credit — DECIDED (my call)
- Locked to: **© 2026 Venkat Gollangi. Made in College Park, MD.** + a subtle "View source" link to this portfolio's GitHub repo. Location adds warmth without apology; source link signals confidence.

---

## 7. TODOs I'll handle without needing input

These are captured so they don't get lost, not to ask you about:

- [ ] Cross-check all skills.ts entries against resume — make sure LightGBM, XGBoost, Pandas, NumPy, Scikit-learn, Docker, Dify are surfaced (v1 missed them).
- [ ] Ensure `Get9nine Soft Private Ltd` is spelled consistently across resume/site.
- [ ] Verify Accordion's full sub-branding — Resume 2 says "Accordion India - Global Private Equity Consulting & Analytics Hub"; Resume 1 says just "Accordion India". I'll use the fuller version on the site as the company block header.
- [x] Chords & Co. — **DECIDED:** kept in the Experience timeline with the `volunteer: true` flag (visually differentiated, no separate "Leadership & Volunteer" section). Reason: A/B testing + analytics work is legitimately data-adjacent; adding a separate section dilutes homepage focus for one entry.
- [ ] Draft alt text for every image (dashboards, diagrams, photos).
- [ ] Draft OG images for home + each case study.

---

## Summary — what's still open

Everything else is either decided (locked in this file + `src/data`) or deferred with a safe default that's easy to swap later. The genuinely open items — none blocking further phases — are:

1. **Place `Venkat_Resume.pdf` at `/public/resume.pdf`** — Phase 5 task, needs you to drop the actual PDF file at that path before build.
2. **Delete `claude-hackathon` repo on GitHub** — small credibility drag while it exists with an empty README. Or tell me what it is.
3. **Send team names + your role for BUDT 751 Healthcare Fraud** (7-person team) when convenient — I'll swap them into the case study.
4. **LinkedIn spot-check** — I couldn't verify LinkedIn matches resume. Please skim your profile and tell me if anything differs (dates, titles, projects).
5. **Optional: photo** at `/public/photo.jpg` — /about renders fine without one.
6. **Optional: merged master resume** listing all 3 featured projects — reduces the portfolio/resume mismatch for recruiters who cross-check.

None of these block Phases 3 → 6 (docs, IA, scaffold, wireframe). Item #1 blocks Phase 5 build verification. Item #3 is desirable but not blocking before Phase 7.
