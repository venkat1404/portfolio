# v1 Audit — Portfolio (index.html)

**Scope:** the entire live portfolio at https://venkatagollangi.netlify.app/ — a single 518-line `index.html` file, no other assets, no build tooling, no config.

**Verdict:** v1 reads as an unfinished template. The typography and monochromatic dark theme are the only things carrying it; content-wise it fails the recruiter-conversion test on the first pass. Two placeholder paragraphs remain in production. There are zero visuals in a *data* portfolio. There is no resume link, no case studies, no certifications, no SEO, no hierarchy among four equally-weighted projects. Every section either needs a rewrite or a rebuild. Salvage the raw facts; discard the structure.

---

## 1. Critical failures (must not survive v2)

### 1.1 Placeholder text in production
Two blocks of literal placeholder copy are live on the site:

- Line 269 — *"This is placeholder text for your personal introduction. Tell your story here — where you're from…"*
- Line 281 — *"Placeholder — add something personal here. Hobbies, interests, what you're reading or building on the side."*

These are catastrophic. Any recruiter who scrolls past the hero sees the site is unfinished and pattern-matches the entire portfolio as low-effort. This alone eliminates v1 from serious consideration.

### 1.2 No resume access anywhere
There is no "Download Resume" link, no `/resume` route, no PDF file. Contact section (line 494) offers Email, LinkedIn, GitHub — but the single most-clicked link on any portfolio for a recruiter is missing.

### 1.3 No case studies
All four projects are one-paragraph cards (lines 413–465). A hiring manager cannot evaluate:
- The problem you were solving
- What alternatives you considered
- What went wrong and how you fixed it
- The measurable business impact
- What you'd do differently

This is the single largest conversion failure. Recruiters skim; hiring managers read. v1 gives them nothing to read.

### 1.4 Zero visuals — fatal for a data portfolio
No dashboard screenshots, no architecture diagrams, no charts, no cover art. For a candidate targeting BI Engineer and Data Analyst roles, the absence of visualization work is a direct contradiction of the claimed skill set. Recruiters believe what they can see.

### 1.5 Weak hero
```
Line 253: eyebrow — "Information Systems · UMD Smith School of Business"
Line 254: h1    — "Data, systems, and the logic that connects them."
Line 255: desc  — "I build pipelines, dashboards, and intelligent systems..."
```

The eyebrow answers "who is enrolled where" — not "who is this and what role do they want." The H1 is clever (italic *logic*, serif face) but doesn't contain the words a recruiter's scan-brain is hunting for: *Data Engineer*, *Analytics*, *SQL*, *Python*, *ETL*. The subline mentions three things (pipelines, dashboards, intelligent systems) without a single proof point or quantified anchor. A recruiter making a 6-second judgment learns nothing to distinguish this candidate from any other MS student.

### 1.6 No hierarchy in projects
Four cards, equal weight, one visual layout (line 411). The strongest work — the CFPB multi-agent system and the LightGBM competition result — is not elevated. Skydiving (weakest, no GitHub, 2024) sits between them looking equivalent. A recruiter reads left-to-right, top-to-bottom, and there is no visual language telling them which project matters most.

### 1.7 Zero SEO
```html
<title>Venkat Gollangi</title>
```
That is the entire SEO story. No meta description, no Open Graph tags, no Twitter card, no structured data, no canonical URL, no sitemap, no robots.txt, no favicon. A Google search for the candidate's name pulls in… nothing to render. LinkedIn shares of the URL will show a blank preview card.

### 1.8 Single-page anchor architecture
```html
<a href="#hero">, #about, #experience, #projects, #contact
```
Everything lives at `/`. There are no shareable project URLs. A recruiter who wants to send "look at this candidate's CFPB project" can only send the entire portfolio. No deep-linking, no per-page SEO, no route-level metadata.

### 1.9 Skills without proof
Lines 287–345 present tag clouds — Python, SQL, R, DAX — with no link to the project that proves each skill. This is the standard bad pattern the spec explicitly forbids. Anyone can list "Python." Only a link to a repo proves it.

### 1.10 No certifications, no learning signal
There is no place on the site for AWS DEA-C01 (in progress), no "Currently Exploring" section, no signal that the candidate is actively growing. For entry-level and early-career data roles, momentum evidence is a proven hiring factor and v1 gives it zero surface area.

### 1.11 Footer apology
```html
Line 514: <p>Built with HTML & CSS</p>
```
This reads as either an aesthetic humblebrag or an unnecessary explanation. For a portfolio aimed at data-engineering roles, mentioning the frontend stack in the footer only invites the reader to compare it unfavorably to modern Next.js sites they see all day. Either the craft speaks for itself, or the footer should stay silent.

### 1.12 External font dependency + no `next/font` equivalent
```html
Line 7–9: preconnect google fonts + stylesheet
```
Google Fonts is a third-party request. It adds render-blocking network cost, introduces a privacy signal, and Google itself deprecated Google Fonts CDN as a recommended approach. Should be self-hosted.

### 1.13 Dark mode via `prefers-color-scheme` only
Lines 26–36 apply a dark theme when the OS is dark — but there is no user toggle, no persistence, no light-mode design discipline (light mode is the inverse of dark, not its own composition), and no flash-of-wrong-theme prevention. v1 has no design intent about theming.

### 1.14 Accessibility gaps
- No skip-to-content link.
- Focus rings are browser default (invisible on the dark theme against `--bg`).
- Bullet character `–` as a `::before` pseudo-element (line 164) is invisible to screen readers and semantically wrong.
- Nav links have no `aria-current` treatment.
- No landmark roles beyond native elements.
- No visible focus styling for any interactive element (`.btn` has no `:focus-visible`).

### 1.15 Missing infrastructure
- No `favicon.ico` or `apple-touch-icon`.
- No `manifest.json`.
- No `robots.txt`, no `sitemap.xml`.
- No `netlify.toml` — Netlify build is entirely default.
- No `.gitignore` (empty repo — no danger yet, but no future-proofing).
- No custom 404 page.

---

## 2. Section-by-section critique

### Nav (lines 239–249)
- Mobile behavior at ≤540px collapses the entire nav into a vertical stack (line 233) — passable but not designed. No hamburger, no slide-in menu, no focus trap.
- No `Resume` link — the primary conversion CTA is absent from the primary navigation.
- Nav name uses serif face at 17px — reads more like a magazine header than a personal brand mark.

### Hero (lines 251–261)
- Container max-width 780px (line 48) is *very* narrow. Every section reads like a magazine column. For a portfolio meant to showcase dashboards and diagrams, this constrains what can ever be shown.
- Missing: availability status, target role identity, quantified anchor, resume CTA, secondary proof (GitHub/LinkedIn icons).
- Two CTAs, both underselling — "View projects →" (fine) and "Get in touch" (weak; recruiters don't "get in touch," they book).

### About (lines 263–285)
- Two placeholder paragraphs (see §1.1).
- Grid is 1fr 1fr on desktop, collapses to 1fr on mobile — fine structurally.
- The "What I do" and "Currently" blocks are actually decent starter copy — but they're stapled to garbage placeholder text, and the whole section reads as unfinished as a result.

### Skills (lines 287–345)
- Grouping by capability (Languages / Data Engineering / BI / Cloud / Automation & AI / Project Mgmt) is directionally correct and matches the v2 spec.
- "Automation & AI" bundles UiPath, Power Automate, OpenAI API, RAG, Prompt Engineering in one group — this is a category error. RPA (UiPath / Power Automate) is not the same skill family as GenAI (OpenAI / RAG). Recruiters searching for GenAI candidates skim past a group titled "Automation."
- **Skills have no evidence attached** — no link to the project that proves each one.
- Missing entries the resume includes: LightGBM, xGBoost, Pandas, NumPy, Scikit-learn, Snowflake is there but SSMS is not, MongoDB and Neo4j are lumped in Data Engineering (unusual choice), Docker missing, Dify missing.

### Experience (lines 348–406)
- **Accordion India is correctly modeled as one company with two role blocks** (lines 353–378) — this is what the v2 spec asks for. Preserve this structural choice.
- **Bullets are outcome-led** — "accelerating downstream reporting by 40%", "cutting manual effort by over 20 hours a month". This is the right pattern; the copy itself is largely reusable.
- No tech chips per role — for a scannable timeline this is missing.
- Nothing visually distinguishes the Data Engineer promotion from the Technical Associate Intern role — the promotion itself is a signal that should be surfaced.
- Chords & Co. bullets read as marketing metrics ("account growth 40%") without connecting to *data* skills — for a data portfolio, either reframe to emphasize analytics and A/B testing (already partially there) or move to a compact secondary treatment.

### Projects (lines 408–469)
- 4 equal-weight cards (see §1.6).
- Cards have: title, date, one-paragraph description, 3–4 tech tags. Missing: visual, metric chips, GitHub link, live-demo link, "Read case study" link.
- The CFPB card (line 413) is the strongest and largest of the four in metric weight but visually identical to the others.
- Skydiving card (line 441) has no GitHub, no visual, no metrics — just three vague tags (ETL, Visualization, Reporting). This is exactly the kind of card that reads as filler.
- IoT card (line 454) is redundant with the Get9nine experience block (line 380) — same project told twice at 88% accuracy.

### Education (lines 471–492)
- Two entries, clean layout, dates and GPAs shown.
- Terrapin Scholar mentioned inline (line 481) — good but understated. This is a trust marker that could sit as a chip.
- Coursework line (line 481) is a comma-separated string — a chip-set treatment would be more scannable.

### Contact (lines 494–509)
- "Let's work together." is generic. The v2 spec asks for a headline written fresh — something with data-problem energy.
- Availability line ("Open to full-time roles, internships, and interesting problems") — the "interesting problems" phrase reads as filler.
- Three link CTAs (Email, LinkedIn, GitHub). Resume link missing.

### Footer (lines 511–516)
- See §1.11.
- No favicon means the browser tab shows a generic globe icon.

---

## 3. Cross-cutting technical observations

- **Container 780px** is smaller than every reference site the v2 spec cites (Linear ~1200, Stripe ~1120, Vercel ~1200). Content-first design still allows generous imagery breakouts; v1 will never accommodate a wide dashboard screenshot.
- **No motion at all** — not even a fade-in reveal. The site feels static in a way that reads as "unfinished" more than "restrained."
- **CSS-only theming without a toggle** means Venkat cannot choose to present either theme; the site's face changes based on the reader's OS setting.
- **All text is in one file** — content and structure are coupled, so any content change requires editing HTML. Zero content scalability.
- **No image optimization pipeline** — matters when images arrive in v2.
- **No favicon set, no OG image** — sharing the URL anywhere shows a blank card.
- **Not deployed with a `netlify.toml`** — Netlify infers a build from the static HTML. When v2 becomes Next.js, this config will need explicit setup.

---

## 4. What's worth salvaging

Content, not structure. Specifically:

1. **All resume-derived facts and metrics** — every number in v1's Experience and Projects sections is verified against the resume. The 40% / 20% / 25% / 30% / 35% / 88% / 49,332 / 0.8214 anchors are all reusable. (Cross-check the CFPB dataset size against the two resume versions — Resume shows 493 processed / 49,332 total in the same paragraph; v1 line 418 says 49,332 processed. **This is a factual conflict to resolve in Phase 2.**)
2. **The Accordion "one company, two roles" grouping** — matches the v2 spec directly.
3. **Skills-by-capability grouping** — the *idea* is right; the specific categories need adjustment (split Automation & AI; surface LightGBM/xGBoost/Pandas explicitly; move MongoDB/Neo4j to "Databases" once we have that group).
4. **Contact link inventory** — email, LinkedIn, GitHub all correct.
5. **Contact address `venkat14@umd.edu`** and phone `(240) 886-9396` — verified against resume.
6. **The dark-first color instinct** — v1 correctly senses that data portfolios read better in a serious dark surface. v2 will build a real design system on this instinct.

That is the entire salvage list. Nothing else transfers.

---

## 5. Factual conflicts flagged (to resolve in Phase 2)

1. **CFPB dataset size — 493 processed or 49,332 processed?** Resume says "493 CFPB complaints" in bullet 1 and "49,332 complaints" as the dataset total in bullet 3. v1 line 418 collapses this to "49,332 CFPB complaints" with "zero manual triage" — misleading if actual processing volume was 493. Resolve by reading the `complaint-agent` repo code.
2. **Get9nine team size** — resume says "three-member team"; v1 says the same. No conflict, but v1 mentions the collaboration only in the experience block and duplicates the project claim in the Projects section without acknowledging team composition. To be honest: single attribution.
3. **Resume version discrepancy** — the two resume PDFs feature different projects (Healthcare Fraud vs Short-Term Rental). Product decision (locked in Phase 0): feature both.
4. **Skydiving project date** — v1 shows "2024" but resume lists it as a Manipal "Key Project" — the BTech program ran Oct 2020 – Jul 2024. Actual project completion date unclear. Not blocking (Skydiving is excluded from v2).

---

## 6. Verdict

v1 is a stub, not a portfolio. Rebuild from zero. The only thing v1 provides v2 is a source of verified facts and the confidence that dark-first was the right direction. Every layout choice, every route decision, every piece of copy, every visual, and every piece of infrastructure will be replaced.

Proceed to Phase 2.
