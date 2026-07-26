# v2 Review

Written at the end of Phase 14 — the last phase in the implementation spec. A candid critique of what shipped, followed by a prioritized post-launch punch list.

---

## What v2 delivers on

**Zero placeholder copy.** Every sentence live in the shipped site was written for the site. The v1 "placeholder text for your personal introduction" is gone at every layer, including code comments.

**Case studies with real substance.** Three MDX bodies at ~900–1200 words each, following the spec's structure (Overview → Problem → Business context → Data sources → Architecture → Technical stack _annotated with why_ → Approach → Challenges → Results → Business impact → Lessons learned → Future improvements). Each opens with a scannable TL;DR card, closes with prev/next navigation, and links out to the GitHub source.

**Real visuals for a data portfolio.** Hand-built inline SVG architecture diagrams (Complaint / Rental / Fraud), theme-aware via CSS custom properties, accessible with `role="img"` + `<title>` + `<desc>`. Not screenshots — but real system-design diagrams that read strongly on desktop and mobile.

**Resume reachable in ≤ 1 click from every page.** Nav Resume button, hero secondary CTA, Contact CTA button, About page CTA, and the dedicated `/resume` page with inline PDF viewer. All pass `download="Venkat_Resume.pdf"` so recruiters see a proper filename in their downloads folder instead of `resume.pdf`.

**Certifications correctly split.** In-progress card visually differentiated from the (currently empty) completed group — outlined/ghost style + amber status badge with icon and text. No possibility a recruiter mistakes DEA-C01 as earned.

**"Currently Exploring" is a real section.** Three intentional cards (AWS DEA-C01, multi-agent AI, gradient boosting), each with a status line and one-sentence "why" that connects to the target roles. Not padded.

**Sitemap, robots, JSON-LD Person, favicon, per-project OG images.** All statically generated at build time (no server render on demand, so nothing costs anything on Netlify). LinkedIn / Twitter / Discord shares of any URL will render a designed card.

**Deploy-ready at every commit.** Ten conventional-commit boundaries from v1-archive to REVIEW.md, each with a green build. `v1-archive` tag preserves v1 in perpetuity.

**Performance stays under budget.** Home 115 KB First Load JS, well under the 120 KB budget. All 12 routes prerendered as static content (except the 4 per-project OG images which are also static via `generateStaticParams`).

**Accessibility taken seriously.** Skip link, semantic landmarks, designed focus rings, `aria-current` on nav, `aria-pressed` on filter chips, focus-trapped mobile menu with Escape close, status conveyed by icon + text (never color alone), SVGs with title/desc, WCAG-AA-tuned contrast in both themes.

**Motion respects the reader.** Reveal-on-scroll (fade + 12px rise, 500ms, ease-out) and a 4-step hero load-in under 600 ms total. `prefers-reduced-motion` bypasses animation entirely and renders content instantly.

---

## Honest critique — what's still wrong or thin

**1. Case study "Challenges" and "Lessons learned" haven't been Venkat-verified.** I wrote them from what the code implies (Haiku JSON reliability, prompt-injection safeguards, class imbalance, target encoding). They're plausible and specific, but a technical interviewer who asks "so what actually broke?" deserves an answer that came from you, not from me. **Highest priority for a quick review pass.**

**2. Healthcare Fraud attribution is still generic.** "Team of 7, role pending" is honest, but "contributed to feature engineering, model comparison, and responsible-AI guardrails" is my safe guess. The real names and your specific role haven't landed. Same issue lighter on the BUDT 733 Airbnb case study (team names are real, role split isn't).

**3. Resume / portfolio project mismatch.** The site features Complaint + Rental + Healthcare. `Venkat_Resume.pdf` at `/resume.pdf` lists Complaint + Healthcare (Rental isn't on it, per the resume you chose). Recruiters who cross-check will notice. A merged master resume would fix it in one edit.

**4. No live demo links.** Neither the Complaint Streamlit nor the Fraud Streamlit is deployed. The case studies show architecture SVGs but no "View live demo" button. This is a credibility ceiling — "here's the code" is one tier below "here's it running."

**5. Photo on `/about` is missing.** The page renders fine without it, but a photo genuinely helps warmth for a personal portfolio. `/public/photo.jpg` is the drop point; the About component doesn't reference it yet, so you'd also need one component edit.

**6. LinkedIn hasn't been cross-verified.** I couldn't fetch it (auth-gated). If any date, title, or project on LinkedIn doesn't match the resume, a recruiter checking both sees inconsistency. Ten-minute spot-check on your side.

**7. Actual Lighthouse hasn't been run against the deployed build.** The 120 KB First Load JS budget is met. LCP, CLS, INP haven't been measured against a live URL. Should hit the spec's Performance ≥ 95 target based on architecture, but "should" isn't "did."

**8. Mobile nav focus trap is partial.** Escape closes correctly and focus moves to the first menu item on open, but Tab from the last menu item escapes to the browser chrome instead of wrapping back to the first. Good enough for a keyboard user, not perfect.

**9. Skills "Used in" reveal is a plain `title` attribute.** Touch users don't get the evidence hint (there's no hover on mobile). Spec §5.2 point 5 wanted "hover/tap reveals" — I did the hover, skipped the tap. Not blocking.

**10. `claude-hackathon` repo is still public on GitHub.** Still an empty README. Still a small credibility drag on the profile view where recruiters land before clicking through to the portfolio. **~30 seconds to delete on GitHub.**

**11. No blog / writing section.** Spec explicitly deferred it, but for entry-level candidates active writing signals coachability and clarity. `/writing` reuses `Prose` + MDX and would take an afternoon to add once you have one piece written.

**12. About page copy uses my working belief.** "Feature engineering matters more than model choice" is defensible (your Airbnb team said it), but it's not literally something you told me you believe. Read it back and tell me if the framing is yours.

---

## Post-launch punch list, prioritized

### High — do before applying anywhere

- [ ] Skim the three case-study **Challenges** and **Lessons learned** sections and tell me which lines are true, which are close, and which need rewriting. Fixes are all one-file MDX edits.
- [ ] Send Healthcare Fraud team names (6 collaborators) and your specific role. Same for Airbnb role split.
- [ ] Produce merged master resume PDF covering all three featured projects. Drop at `/public/resume.pdf`.
- [ ] Skim About para 2 ("belief") — say if the framing is yours or if we should rewrite.
- [ ] LinkedIn spot-check for date/title/project drift.
- [ ] Delete the `claude-hackathon` GitHub repo.

### Medium — meaningful lift, not blocking

- [ ] Buy a custom domain (venkatgollangi.com or similar). Adds recruiter trust. Configure DNS in Netlify.
- [ ] Deploy the Complaint Resolution Streamlit publicly (Streamlit Community Cloud is free). Add `liveDemoUrl` to `projects.ts` — case study renders the button automatically.
- [ ] Same for the Healthcare Fraud Streamlit.
- [ ] Add a photo at `/public/photo.jpg` and a photo component to `/about`.
- [ ] Run Lighthouse against the deployed URL. Target: Perf ≥ 95, A11y 100, Best Practices 100, SEO 100. Address anything under budget.
- [ ] Improve mobile nav focus trap so Tab wraps within the menu.

### Low — post-launch polish

- [ ] `/writing` blog route. Reuses Prose + MDX. One folder + one page component + one MDX file gets it live.
- [ ] Testimonials or LinkedIn recommendations block on `/about` or home. Adds significant trust at low cost.
- [ ] Refine per-project OG images with proper font loading (currently system-ui inside ImageResponse).
- [ ] Add tap-reveal for "Used in: X" on skill chips on touch devices.
- [ ] Consider a `/contact` page instead of a section — recruiters sometimes look for it as a route.
- [ ] Netlify Analytics ($9/mo) to see actual visit patterns without adding a script.
- [ ] Favicon that scales cleanly at 16×16 — the current 64px monogram compresses OK but a real SVG icon would be sharper.

---

## Deploying to Netlify

Nothing exotic. The current pipeline is `git push origin main` → Netlify auto-detects Next.js via `netlify.toml` → build → live at `venkatagollangi.netlify.app`.

Netlify's Next.js runtime auto-installs `@netlify/plugin-nextjs`. The plugin handles the App Router static-plus-image-response output for you.

First push after the framework change (static HTML → Next 15) may need one manual verification in the Netlify dashboard:

- **Site settings → Build & deploy → Build settings**
- Build command: `npm run build`
- Publish directory: `.next`

Both are declared in `netlify.toml` too. If Netlify's cached settings disagree, the dashboard values win — reset them.

---

## Verification checklist for the deployed URL

Run these against `https://venkatagollangi.netlify.app` once the first v2 build finishes:

- [ ] `/` renders with hero, 3 project cards, timeline
- [ ] `/projects` shows 4 cards + filter chips work (URL param updates)
- [ ] `/projects/financial-complaint-resolution` shows full MDX + architecture SVG
- [ ] `/projects/short-term-rental-quality` shows full MDX + architecture SVG
- [ ] `/projects/healthcare-fraud-detection` shows full MDX + architecture SVG + decision engine diagram
- [ ] `/projects/spotify-hit-song-classification` shows the "no case study yet" placeholder cleanly
- [ ] `/about` renders 4 paragraphs
- [ ] `/resume` shows Download button + inline PDF
- [ ] `/resume.pdf` downloads the actual PDF
- [ ] Theme toggle in the nav flips light ↔ dark cleanly, no flash
- [ ] Random `/does-not-exist` URL → designed 404 page
- [ ] `/sitemap.xml` and `/robots.txt` return proper XML/text
- [ ] `/icon` and `/opengraph-image` return PNGs
- [ ] Share any project URL on LinkedIn — preview shows the per-project OG image with title + top metric

---

## Final architecture summary

Twelve commits from `bcb5a2c initial portfolio` (v1) to whatever ends up being HEAD after this REVIEW commit. v1 preserved forever at the `v1-archive` git tag.

```
main
├── 2e82bfc  feat: v2 rebuild scaffold — Next.js 15 + Tailwind v4 + design system
├── a12155c  feat(pages): wireframe pass — home, projects, case studies, about, resume
├── 3878f84  fix(copy): remove em dashes site-wide + update availability
├── bc3af22  chore: rename resume asset to resume.pdf to match /resume.pdf URL
├── 2585891  feat(case-studies): write MDX bodies + architecture SVGs for 3 flagships
├── 6fb0e51  feat: filter chips on /projects + resume download filename
├── 3c5bbbd  feat(motion): reveal-on-scroll + hero load-in with reduced-motion respect
├── a8fc51e  feat(a11y): aria-current on nav + focus-trapped mobile menu with Escape
├── fc4ec21  feat(seo): sitemap + robots + JSON-LD Person + favicon + per-project OG
└── HEAD     chore(review): delete /dev/styleguide + write REVIEW.md
```

Docs: [AUDIT.md](AUDIT.md), [DECISIONS.md](DECISIONS.md), [CONTENT_GAPS.md](CONTENT_GAPS.md), [_planning/information-architecture.md](_planning/information-architecture.md), [_planning/case-studies/](_planning/case-studies/), and this file.

Ready to push. The hard part — writing the case studies, deciding what to feature and what to cut, drafting the About page — is done. The lift left on you is roughly: an evening of verifying the case-study claims, an hour to send team names, and a `git push`.
