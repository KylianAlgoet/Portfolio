# Kylian Algoet: portfolio

Personal portfolio of Kylian Algoet, AI & Automation / Fullstack Developer.
Built with [Astro](https://astro.build) as a static site.

## Getting started

Requires Node.js 22.23.4 or newer (developed on 24 LTS).

```bash
npm install
npm run dev       # http://localhost:4321
npm run check     # type-check .astro and .ts files
npm run build     # production build into dist/
npm run preview   # serve the production build
```

## Project structure

```
brief/                  Planning: research, art direction, copy, acceptance criteria
public/                 Files served as-is (cv.pdf, favicon.svg)
src/
  assets/               Images processed by astro:assets (one folder per project)
  components/           Reusable .astro components
  content/              Site content (Markdown/MDX/YAML), validated by src/content.config.ts
  data/                 Site-wide constants (name, links, navigation) and trick recordings
  layouts/              Page shells
  lib/                  Content helpers, the SK8Sense detection port, OG image rendering
  pages/                Routes, including og/ (social images) and robots.txt
  scripts/deck/         The DeckForge 3D viewer, loaded on demand
  styles/               tokens.css (design tokens), global.css and prose.css
scripts/                Build-time checks
tests/e2e/              Playwright and axe tests
```

## Adding content

- **A project:** add `src/content/work/<slug>.mdx` and its images in `src/assets/work/<slug>/`.
  The frontmatter schema is in `src/content.config.ts`.
- **A Playground item:** add `src/content/playground/<slug>.md` (type `game`, `render` or `animation`).
- **A trick recording:** add a CSV to `src/data/traces/` (see the README there).
- **Unfinished content:** set `draft: true`. Drafts never reach the production build, and the
  build fails if the text `TODO(input)` ends up in `dist/`.

## Testing

```bash
npx playwright install chromium   # once
npm run build
npm test                           # Playwright smoke tests + axe (WCAG 2.2 AA), desktop and mobile
```

CI (`.github/workflows/ci.yml`) runs the type check, the build, these tests and Lighthouse on
every push and pull request. Lighthouse must score at least 95 in every category, with
LCP ≤ 2.5 s, CLS ≤ 0.1, TBT ≤ 200 ms and at most 30 kB of JavaScript per page
(`lighthouserc.json`; three.js on the DeckForge page only loads on demand).

## Deploying

The site is fully static. Canonical URLs, Open Graph images and the sitemap need the public URL:

- `SITE_URL`, if set (for a custom domain, e.g. `https://example.com`);
- otherwise Vercel's production domain (`VERCEL_PROJECT_PRODUCTION_URL`), picked up automatically;
- otherwise `http://localhost:4321` for local builds.

## Design

The design system ("Spec Sheet") is described in `brief/01-handoff.md` §6.
All colours, type sizes, spacing and motion timings live in `src/styles/tokens.css`.
