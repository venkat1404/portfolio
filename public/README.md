# /public assets

Drop these files here before shipping v2:

- **`resume.pdf`** — served at `/resume.pdf`. Referenced from the hero, About page, Contact CTA, and the Resume page's inline viewer. Currently missing — the Resume page shows a browser-default fallback until it lands.
- **`photo.jpg`** (optional) — square headshot for `/about`. Site renders fine without it.
- **`favicon.ico`, `apple-touch-icon.png`, `manifest.webmanifest`** — added in Phase 13.

Anything in this folder is served as a static asset at the site root by Next.js. This README file itself is harmless — Next serves it at `/README.md`, but no page links to it.
