# Information Architecture

This doc translates the spec (§5) + our locked decisions into an implementation-ready map: exact routes, exact section order per page, exact components per section, exact data source per component. When Phase 6 starts (wireframe pass), this is the blueprint.

---

## Routes

Multi-page, statically generated. Six routes + supporting files.

| Route | Purpose | Data sources | Notes |
|---|---|---|---|
| `/` | Home — the conversion page | hero, projects (featured), experience, skills, certifications, exploring, education, site | Single scrollable page with in-page anchors for nav. |
| `/projects` | All-projects grid | projects (all) | Filter chips (client-side, URL-param-backed): All · Engineering · Analytics · ML. |
| `/projects/[slug]` | Individual case study | projects[slug], MDX content | Static param generation from `projects.ts`. |
| `/about` | Extended about + photo | about, site, education, experience (summary) | Longer-form. Photo optional. |
| `/resume` | Embedded resume viewer + PDF | site.resumeUrl | Big download CTA above the fold + inline `<iframe>` or `<embed>` of the PDF beneath. |
| `not-found.tsx` | Designed 404 | — | Nav back to `/` and `/projects`. Warm copy, not a stack trace. |

**Supporting files (also part of route tree):**
- `sitemap.ts` — enumerates all static routes + case-study slugs.
- `robots.ts` — allow everything, point to sitemap.
- `opengraph-image.tsx` — default OG image for `/`, `/about`, `/projects`, `/resume`.
- `/projects/[slug]/opengraph-image.tsx` — per-project OG image with project title + top metric.

**Direct file URLs (Netlify serves as static assets):**
- `/resume.pdf` — the actual PDF (must be placed at `/public/resume.pdf` before build).
- `/favicon.ico`, `/apple-touch-icon.png`, `/manifest.webmanifest`.

**Excluded from sitemap + `robots.txt` (`Disallow`):**
- `/dev/styleguide` — throwaway route from Phase 5 to verify design primitives. Deleted before final build.

---

## Homepage section order (top to bottom)

Locked per spec §5.2 + our decisions.

| # | Section | Component | Data | Height priority |
|---|---|---|---|---|
| 1 | Nav | `<Nav>` | site.navigation | Sticky, blur on scroll |
| 2 | Hero | `<Hero>` | hero | Above the fold |
| 3 | Featured Projects | `<FeaturedProjects>` | featuredProjects | High — critical for hiring managers |
| 4 | Experience | `<ExperienceTimeline>` | experience | High |
| 5 | Skills | `<SkillsGrid>` | skills (grouped by category) | Medium |
| 6 | Certifications | `<Certifications>` | inProgressCertifications, completedCertifications | Medium |
| 7 | Currently Exploring | `<CurrentlyExploring>` | exploring | Medium — growth signal |
| 8 | Education | `<EducationBlock>` | education | Low |
| 9 | Contact CTA | `<ContactCta>` | site | High — final conversion moment |
| 10 | Footer | `<Footer>` | site | — |

Under the fold, the reader has already decided to keep reading — every subsequent section is a chance to reinforce or convert, in order of expected recruiter interest.

### Section 3 — Featured Projects
- 3 cards, ranked per D-01.
- Card format: visual (architecture SVG or ImageFrame placeholder) → title → one-line outcome-led summary → 2–3 metric chips → 3–4 tech chips → "Read case study →" link. Entire card is a single clickable link (pseudo-element expansion for a11y).
- Below cards: a single small link — *"All projects →"* — to `/projects`.

### Section 4 — Experience Timeline
- Vertical rail with nodes.
- Accordion India renders as one company block with two roles inside; role progression visible (promotion from Technical Associate Intern → Data Engineer is a signal). Bullets outcome-led. Small tech chips per role.
- Get9nine Soft: one role block.
- Chords & Co.: one role block with `volunteer: true` (rendered with subtle "Volunteer" chip in place of a company subtitle).

### Section 5 — Skills
- 6 groups per category (spec §5.2 point 5).
- Each chip shows the technology name. Hover/tap reveals *"Used in: {Project or Experience}"* — this is the proof-of-evidence layer. On touch devices, tap-to-reveal via a small info button.
- No proficiency bars. No juvenile "stars."

### Section 6 — Certifications
- Two sub-groups: **In Progress** (rendered) and **Completed** (rendered only if non-empty).
- In-progress cards: outlined/ghost style + explicit "In progress" status chip in amber — visually and semantically distinguishable from completed.
- Empty "Completed" group at launch → omitted entirely (never shown as empty).

### Section 7 — Currently Exploring
- 3 cards horizontally (spec §5.3): AWS DEA-C01, Multi-agent AI, Modern gradient boosting.
- Each: icon + title + status line + "why" sentence connecting to target roles.

### Section 8 — Education
- 2 entries. UMD entry includes GPA 3.95 chip, Terrapin Scholar chip, and a wrap of coursework chips (BUDT733, BUDT737, BUDT704, BUDT758O, BUDT731, BDBA808R). Manipal entry compact.

### Section 9 — Contact CTA
- Headline: *"Let's talk about a data problem."*
- Availability line + location.
- Action row: Email, LinkedIn, GitHub, Resume — all styled equally, all one click.

### Section 10 — Footer
- Brand mark + copyright ("© 2026 Venkat Gollangi. Made in College Park, MD.")
- "View source" link → this repo on GitHub.
- No "Built with" apology.

---

## `/projects/[slug]` — case study page structure

Per spec §8. Locked layout for all three case studies:

1. **Case study hero:** title (h1) + one-line summary + meta row (role/team, timeline, GitHub link, tech chips).
2. **Sticky right-rail TOC** (desktop) / top disclosure (mobile) with scroll-spy.
3. **TL;DR card** — 3 short lines (Problem / Solution / Result).
4. **Overview** (~120 words)
5. **Problem** (~120–150 words)
6. **Business context** (~90–110 words)
7. **Data sources** (~80–110 words)
8. **Architecture** — SVG diagram + caption.
9. **Technical stack** — annotated: *why each choice*.
10. **Approach** — walkthrough (~150–200 words).
11. **Challenges** (~110–130 words) — at least one honest failure/fix.
12. **Results** — visually distinct large tabular-numeral stat grid.
13. **Business impact** (~110–130 words).
14. **Lessons learned** (~100–120 words) — honest, specific.
15. **Future improvements** — 3–5 bulleted items.
16. **Prev / Next** navigation footer.

All figures get captions. Every image has descriptive alt text.

---

## `/projects` grid

- Grid layout: 3 columns on desktop, 2 on tablet, 1 on mobile.
- Filter chips at top: **All · Engineering · Analytics · ML**. Client-side (via React state + `URLSearchParams` — deep-linkable). Layout jank prevention: cards preserve their positions in the grid; filtered-out cards fade out with a fixed-height reserve.
- Order: featured projects first (by rank), then non-featured.
- Cards on `/projects` use the same `ProjectCard` component as home.

---

## `/about` page

- Hero: `About` label + h1 ("A short version.") + 4 paragraph blocks from `about.ts`.
- Optional photo (right rail on desktop, top on mobile).
- Below: compact repeats of Education + one-line summary of Experience with a link to home for the timeline.

Length target: page fits above two mobile scrolls.

---

## `/resume` page

- H1: "Resume."
- Big primary CTA: **Download PDF** (2rem button) above the fold, with file size and last-updated date beneath.
- Secondary text: single sentence about what's in the resume.
- Below: `<embed>` or `<iframe>` of the PDF at 90vh — inline reader.

---

## Nav

- Sticky top, translucent-blur when scrolled off zero.
- **Left:** brand mark (small monogram) + name.
- **Right (desktop):** Projects · Experience · About · Resume (subtle button styling on Resume).
- **Right (mobile):** hamburger → slide-in menu with focus trap + Escape close. Resume + logo always visible in the collapsed nav.
- Active-page indicator via `aria-current` + subtle underline.
- Scroll-links (home) vs route-links: nav intelligently routes to home + anchor when off-home.

---

## SEO/metadata per route

Every route sets its own `<title>`, description, and OG image via the Next Metadata API.

| Route | Title | Description | OG image |
|---|---|---|---|
| `/` | `Venkat Gollangi — Data Engineer & Analytics Engineer` | site.seo.defaultDescription | default |
| `/projects` | `Projects · Venkat Gollangi` | "Case studies from Venkat Gollangi's data engineering, analytics, and applied ML work." | default |
| `/projects/[slug]` | `{title} — Case Study · Venkat Gollangi` | Project's `description` (truncated to ~155 chars) | Per-project OG |
| `/about` | `About · Venkat Gollangi` | 1-liner about background | default |
| `/resume` | `Resume · Venkat Gollangi` | "Download the current resume." | default |
| `404` | `Page not found · Venkat Gollangi` | short | default |

### JSON-LD
- `Person` schema on `/` (name, alumniOf UMD + Manipal, sameAs LinkedIn + GitHub, jobTitle).
- `Article` / `CreativeWork` schema on each case study.

---

## Data flow (component → data module)

Every component consumes typed data — no hard-coded strings in components.

| Component | Consumes |
|---|---|
| `<Nav>` | derived nav config (a small `src/data/navigation.ts` — TODO Phase 5) |
| `<Hero>` | `hero` |
| `<FeaturedProjects>` | `featuredProjects` |
| `<ExperienceTimeline>` | `experience` |
| `<SkillsGrid>` | `skills` (grouped by `category`) |
| `<Certifications>` | `inProgressCertifications`, `completedCertifications` |
| `<CurrentlyExploring>` | `exploring` |
| `<EducationBlock>` | `education` |
| `<ContactCta>` | `site` |
| `<Footer>` | `site` |
| `<ProjectsPage>` | `projects` (all) + client-side filter state |
| `<CaseStudyLayout>` | `projects.find(slug)` + MDX content |
| `<AboutPage>` | `about` + `education` + `experience` |
| `<ResumePage>` | `site.resumeUrl` |

---

## Component tree overview (Phase 5 seed)

```
/src/components
  /layout
    Nav.tsx
    Footer.tsx
    Container.tsx
    Section.tsx
  /ui
    Button.tsx
    Card.tsx
    Chip.tsx
    StatusBadge.tsx
    SectionHeading.tsx
    MetricStat.tsx
    Prose.tsx
    ThemeToggle.tsx
    Icon.tsx
    StatusDot.tsx
    ImageFrame.tsx
  /home
    Hero.tsx
    FeaturedProjects.tsx
    ProjectCard.tsx        // shared with /projects
    ExperienceTimeline.tsx
    ExperienceEntry.tsx
    SkillsGrid.tsx
    Certifications.tsx
    CurrentlyExploring.tsx
    EducationBlock.tsx
    ContactCta.tsx
  /project
    CaseStudyLayout.tsx
    CaseStudyTOC.tsx
    ArchitectureFigure.tsx
    ProjectMeta.tsx
    ResultsGrid.tsx
    TldrCard.tsx
  /motion
    Reveal.tsx           // reduced-motion aware
    StaggerGroup.tsx
```

---

## User journey validation

Three journeys explicitly designed for. Each must be walkable in Phase 14.

### R-1 — Recruiter (~30 seconds)
1. Land on `/`
2. Hero answers: who, target role, one proof anchor
3. Scroll to Featured Projects → scan 3 cards
4. Click **Download Resume** in nav or hero → PDF downloads

**Constraint:** ≤ 1 click from landing to resume.

### R-2 — Hiring manager (~3 minutes)
1. Land on `/`
2. Open strongest case study (`/projects/financial-complaint-resolution`)
3. TL;DR → Architecture SVG → Results → Challenges
4. Click GitHub → return via back button
5. Contact via `mailto:` in Contact CTA

**Constraint:** each section skimmable in ≤ 20 seconds via right-rail TOC.

### R-3 — Technical interviewer (~10 minutes)
1. Deep-read one case study
2. Inspect architecture diagram
3. Click through to GitHub repo
4. Skim second case study
5. Notes any honest challenge / limitation

**Constraint:** case studies hold up to expert scrutiny — real trade-offs surfaced.

---

## Post-launch scalability

- **New project:** add one MDX file + one image set + one entry to `projects.ts`.
- **New certification:** add one entry to `certifications.ts`.
- **New skill:** add one entry to `skills.ts` (with `usedIn` linkage).
- **New "Currently Exploring" card:** add one entry to `exploring.ts`.
- **`/writing` route:** add `src/app/writing/page.tsx` + `src/app/writing/[slug]/page.tsx` reusing `Prose` and `CaseStudyLayout` primitives — no design work needed.

This is the whole point of the content-in-`/src/data` + MDX split.
