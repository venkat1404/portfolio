# Decisions

Every product, content, and technical decision made for v2, with the reasoning behind it. Written for a future maintainer (probably future-you, or whoever helps you extend this): if you want to change something, this file tells you why it was set that way.

---

## Product decisions

### D-01 · Featured projects: three, in this exact order
1. Financial Complaint Resolution System (CFPB · Anthropic multi-agent)
2. Predictive Modeling for Short-Term Rental Quality (BUDT 733 · LightGBM · 8th/35)
3. AI-Powered Healthcare Insurance Fraud Detection (BUDT 751 · ROC-AUC 0.951)

**Reason:** the CFPB project is the most differentiated — multi-agent Anthropic API, real regulatory dataset, business-legible use case, and solo-attributed. The Airbnb project ships the strongest quantified anchor (leaderboard finish). Healthcare Fraud closes the set with the highest raw metric (0.951) and a full decision-automation policy layer. Together they cover three different faces of the target roles: applied AI systems, ML competition, and applied ML for decision support.

**What was rejected:**
- **Four cards including Spotify** — cutting a card increases the perceived quality of what remains. Spotify appears on `/projects` as a lightweight card without a case study.
- **Ordering by chronology** — recruiters scan left-to-right, so the strongest card must be leftmost.
- **Leading with Healthcare Fraud** — highest AUC but team of 7; leading with a heavily-team-attributed project is a weaker opener than a solo project with a comparable business anchor.

### D-02 · Excluded from v2 entirely
- **Skydiving project** (Manipal Key Project, no GitHub, no visuals, weakest match to target roles).
- **IoT Sensor Classification** kept only as a bullet under the Get9nine experience block — appearing twice (as project card + experience bullet) in v1 was redundant.

**Reason:** curation over volume. Every card on the site should be strong enough for a hiring manager to click into. Cards with no repo behind them read as filler.

### D-03 · CFPB project = solo, self-directed
Personal project. Not a class assignment, not a hackathon submission. Case study frames it as an intentional exploration of a real regulatory dataset with a multi-agent architecture.

### D-04 · Team-project attribution: honest defaults where role split is unknown
- **BUDT 733 Airbnb:** "Team of 3" with role framed as "shared feature engineering, model selection, and LightGBM tuning."
- **BUDT 751 Healthcare Fraud:** "UMD BUDT 751 team of 7 (Spring 2026)" with role framed as "contributed to feature engineering, model comparison, and responsible-AI guardrails."

**Reason:** the spec forbids fabrication and rewards trust markers. "Team of N, I contributed to X" is defensible under any interview cross-examination. When Venkat provides specifics, I swap them in without any structural change.

**Recommendation:** update the underlying resume bullet on Healthcare Fraud from solo-sounding to "contributed to a team of 7" — a hiring manager who reads both the resume and the case study side by side would otherwise catch a mismatch. Not blocking v2 launch.

### D-05 · Chords & Co. lives in Experience, not a separate Leadership section
Kept in the main Experience timeline with a `volunteer: true` flag for a subtle visual differentiation. Chose this over creating a new "Leadership & Volunteer" homepage section, which would dilute focus for one entry. The content itself (A/B testing, weekly performance tracking, engagement analytics) is legitimately data-adjacent — placing it in Experience makes the timeline read cleanly.

---

## Content decisions

### D-06 · Hero copy locked
- **H1:** *"I build data pipelines and analytics that earn their keep."*
- **Sub:** *"Data Engineer with production ETL experience across HubSpot, Google Analytics, and UKG at Accordion — accelerating downstream reporting 40% and cutting manual work 20+ hours a month."*
- **Eyebrow:** availability + location.

**Reason for "earn their keep":** original "pay their own way" felt weird; same ROI framing, cleaner idiom. Reviewed by Venkat.

### D-07 · Contact headline: *"Let's talk about a data problem."*
Active voice, invites conversation without the recruiter-speak of "Have a data problem worth solving?" and without the presumption of "Building a data team?"

### D-08 · Footer credit
*"© 2026 Venkat Gollangi. Made in College Park, MD."* + a subtle "View source" link to this portfolio's GitHub repo. Location adds warmth without apology; source link is a confidence move over v1's "Built with HTML & CSS."

### D-09 · About para 2 belief statement
Used *"feature engineering matters more than model choice"* — validated by Venkat's own Airbnb team finding in the project README. This connects the belief to a concrete piece of work in the same paragraph, which is stronger than a stated belief with no evidence.

### D-10 · Availability framing
Both full-time (Dec 2026) and summer 2026 internships. Kept broad; a specific-role-only framing narrows the recruiter pool for someone still in program.

### D-11 · Resume served at `/resume.pdf` = healthcare-fraud version
Only one PDF served. Portfolio features both Short-Term Rental and Healthcare Fraud but the resume lists only Healthcare Fraud. **Known mismatch flagged in CONTENT_GAPS.md §2.2.** Recommendation: produce a merged master resume that lists all three featured projects. Not blocking launch.

### D-12 · No dashboard screenshots — architecture SVGs are the primary visual
**Reason:** Venkat has no screenshots and running the Streamlit apps locally to capture them would need an Anthropic API key + Python dep install + operational cost (Healthcare model file is 184MB and needs a training pass first). **Trade-off:** the "actual UI" credibility bump is lost, but well-crafted architecture SVGs in the design system are often stronger for engineering-hire evaluation anyway — they show system thinking rather than surface polish. Screenshots can be added post-launch as a one-file drop.

### D-13 · No live-demo buttons on case studies (yet)
Neither Streamlit app is deployed. If deployed post-launch, adding a "View Live Demo" CTA is a per-project one-liner in `src/data/projects.ts` (populate `liveDemoUrl`).

### D-14 · Spotify project = /projects only, no case study
Not on resume + curation-over-volume principle. Gets a lightweight card on `/projects` for anyone browsing further; the README on GitHub already reads well and links directly.

---

## Positioning decisions

### D-15 · Target roles: Data Engineer, BI Engineer, Data Analyst / entry-level DS
Analytics Engineer is *not* in primary framing. Rationale: Venkat's production experience is SSIS-heavy (classic BI / DE) rather than dbt-and-modern-stack (Analytics Engineer). Framing as Analytics Engineer would either overclaim (dbt is on the Currently Exploring section, not the skills-with-evidence layer) or force the case studies to compensate.

### D-16 · Availability: full-time (Dec 2026) + summer 2026 internships
Chosen over "full-time only" or "internships only" — Venkat is a currently-enrolled MS student with real recent industry experience, and casting a wider net is appropriate for that profile.

### D-17 · Domain: Netlify subdomain for launch
`venkatagollangi.netlify.app` retained. **Recommendation for post-launch:** register `venkatgollangi.com` (or similar). Adds ~$12/year and marginally improves recruiter trust. Not blocking; configurable via Netlify DNS.

---

## Technical decisions

### D-18 · Next.js 14+ App Router, statically generated
Per spec §6. Every route prerendered at build time. Compatible with the existing GitHub → Netlify pipeline. Rationale: first-class SEO/metadata API, MDX support for case studies, `next/font` for zero-CLS self-hosted fonts, `next/image` for AVIF/WebP.

### D-19 · TypeScript strict, no `any`
Per spec. Enables the typed content modules in `src/data` to be the single source of truth.

### D-20 · Tailwind CSS with tokens in `tokens.css`
Design tokens as CSS custom properties, consumed by Tailwind config. Single source of truth for colors, spacing, type scale, radii, shadows, motion durations. Per spec §7.

### D-21 · Dark mode first, both themes fully designed
`class` strategy + `prefers-color-scheme` initial detection + persisted toggle. Inline script in `<head>` prevents flash-of-wrong-theme. Per spec §7.1.

### D-22 · Content: MDX for case studies, TS modules for structured content
- `src/data/*.ts` for experience, skills, education, certifications, exploring, projects, hero, about, site.
- `/content/projects/*.mdx` for case study bodies. Frontmatter validated with Zod at build time.

**Reason:** structured content wants types; long-form content wants MDX for readability and interleaved figures.

### D-23 · Icons: Lucide (1.5px stroke), no emoji as UI
Per spec §6. Single icon family across the entire site.

### D-24 · Fonts: Inter + JetBrains Mono, self-hosted via `next/font`
Inter for UI and body, JetBrains Mono for code, metrics, dates, and data-flavored accents. `font-variant-numeric: tabular-nums` on all stat displays.

**Reason:** modern grotesque with excellent screen rendering (spec §7.3), disciplined single-family display + mono system reads more premium than a decorative pairing.

### D-25 · Motion: Framer Motion, tightly scoped
Reveal-on-scroll + micro-interactions only. No parallax, no cursor followers, no typewriter effects. `prefers-reduced-motion: reduce` handled globally via `/components/motion` wrappers. Per spec §9.

### D-26 · Analytics: Netlify Analytics (server-side, zero JS)
No Google Analytics, no cookie banner, no third-party scripts. Per spec §6 and the "no third-party scripts" rule in §13.

### D-27 · No custom-domain-only features at launch
No transactional email, no Formspree, no auth. Contact = mailto link. Reduces third-party surface area.

### D-28 · No blog / writing section at launch
Explicitly deferred per spec §5.1. Adding a `/writing` route later is one new folder + reusing `Prose` and `CaseStudyLayout` primitives — designed for it, but not built for it.

### D-29 · Testing: ESLint + Prettier + typecheck in CI; Lighthouse CI on production build
Per spec §6. Performance budget from §13 enforced by CI so regressions get caught, not shipped.

---

## Netlify deployment

### D-30 · Build strategy: static prerender, `next build` + `next export` compatible with Netlify's Next runtime
`netlify.toml` will be committed in Phase 5 with explicit build command and publish directory. Won't rely on Netlify auto-detection.

### D-31 · Preserve v1 as `v1-archive` git tag before wiping main
Runs during Phase 5, before any file deletion. Fully recoverable via `git checkout v1-archive`.

---

## Explicit non-decisions (deferred to post-launch)

- **Custom domain purchase** — recommended, not blocking.
- **Live demo deployments** for CFPB / Healthcare Streamlit apps.
- **Merged master resume PDF** listing all three featured projects.
- **Photo on /about** — page renders without one; drop at `/public/photo.jpg` any time.
- **`/writing` blog route.**
- **Testimonials / LinkedIn recommendations block.**
- **Per-project OG image variations** (default OG at launch; per-project can come later).
- **SHAP explainer embed** on the Healthcare Fraud case study.

Full post-launch punch list will land in `REVIEW.md` at Phase 14.
