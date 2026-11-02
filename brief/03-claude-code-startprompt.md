# Startprompt voor Claude Code

## Mee te geven (in de projectmap, vóór je de prompt plakt)

```
portfolio/
  brief/
    01-handoff.md                 ← verplicht
    02-content.md                 ← verplicht
    03-claude-code-startprompt.md ← dit bestand
  assets/
    cv.pdf                        ← verplicht (Engels)
    deckforge/decal-ukiyo-e.png, decal-minimal-geometric.png, decal-retro-poster.png   ← 512×1536
    deckforge/screen-recording.mp4          (optioneel)
    sk8sense/board-module-*.jpg             ← verplicht (min. 2 foto's)
    sk8sense/trick-kickflip.csv             ← t_ms,gx,gy,gz (+ ollie/shuv optioneel)
    sk8sense/demo.mp4                        (optioneel)
    playground/<slug>/...                    ← Unity-screens/video, renders + info.md per item
    portrait.jpg                             (optioneel)
  contact.md                      ← e-mail, LinkedIn-URL, BeerSecret-titel + periode, afstudeerjaar, 3D-tool, repo-regels
```

Ontbreekt iets? Dan laat Claude Code een `TODO(input)` staan en blijft die pagina uit productie.

---

## De prompt (kopieer alles hieronder)

```text
You are building the portfolio website of Kylian Algoet, a recent Multimedia & Creative
Technology graduate in Belgium positioned as an AI & Automation / Fullstack Developer
(target roles: junior AI engineer, software developer, fullstack developer).

The research, art direction, content and architecture are DECIDED. Do not reinvent
them. Your job is to implement them with care and verify the result.

READ FIRST, fully, before writing code:
- brief/01-handoff.md: structure (§4), design system (§6), tech approach (§7),
  assets (§8), acceptance criteria (§9)
- brief/02-content.md: all copy; use it verbatim, including headings and captions
- contact.md and everything in assets/
Then summarise back to me in 10 bullet points what you will build, and list any
missing input. Wait for my go before step 1.

## Facts you must respect
- Only claim what the brief or the repositories support. Never invent experience,
  numbers, clients, awards, skills or results.
- Source repositories for assets and fact-checking (read-only):
  https://github.com/KylianAlgoet/Selftrained-and-deployed-AI-image-generator
  https://github.com/KylianAlgoet/Sk8Sense
- SK8Sense trick detection is RULE-BASED: a gyro peak window in
  firmware/src/main.cpp (window opens at |gyro| > 70°/s, closes after 80 ms quiet
  or 480 ms; flip |gx| >= 220 and >= 1.35×|gy|; shuv |gz| >= 170 and dominant;
  ollie |gy| >= 150). The SK8Sense README describes an older airtime state machine.
  Follow the code. AI (Claude API) is only used for coaching.
- DeckForge AI runs locally only; there is no hosted demo. Tests never load the model.
- SK8Sense is a working prototype, not a product; it has no automated test suite.
- Any value marked TODO(input) stays visibly marked in dev and blocks the production
  build (add a build check that fails if "TODO(input)" appears in dist/).

## Stack (verify every API against the official docs before using it; do not rely on memory)
- Astro (current major, v7 at time of writing), static output, TypeScript strict.
- Content collections in src/content.config.ts with the glob() loader:
  work (MDX), playground (MD/MDX, type: game | render | animation), experience (YAML).
  Zod schemas; adding a project = one MDX file + images.
- @astrojs/mdx with components: Figure, SpecStrip, DecisionCard, ArchDiagram,
  TrickTrace, DeckViewer, Lightbox.
- Images via astro:assets <Picture> (AVIF/WebP, widths/sizes, lazy except hero).
- Fonts via the built-in Astro Fonts API with the Fontsource provider, self-hosted:
  Instrument Serif (400, italic), Geist (variable), Geist Mono. All SIL OFL.
- Vanilla CSS with custom properties (src/styles/tokens.css) + scoped Astro styles.
  No CSS or UI framework. Small TS scripts / web components for interactivity.
- three.js ONLY on /work/deckforge-ai, dynamically imported after the user clicks
  "Rotate the deck". Reuse the deck geometry from the DeckForge repo
  (apps/web/src/deck/deckGeometry.ts, textureFit.ts) if licence/structure allows;
  otherwise a simple extruded deck shape with correct nose/tail orientation.
- @astrojs/sitemap, robots.txt, canonical URLs, Open Graph + Twitter cards,
  JSON-LD Person (+ CreativeWork per project), lang="en".
- Astro view transitions: 200 ms cross-fade; project image morphs into case-study hero.
- Quality: astro check, ESLint + Prettier, Playwright smoke tests + @axe-core/playwright,
  Lighthouse CI with budgets. GitHub Actions runs all of it. Deploy target: Vercel
  (static), preview deploy per branch.

## Art direction: "Spec Sheet" (technical editorial)
- Tokens (light / dark):
  --paper #F3F1EC / #111110 · --paper-2 #E8E5DE / #1B1B19 · --ink #141414 / #EDEAE3
  --ink-2 #55524C / #A7A39A · --rule #CFCAC0 / #2E2D2A · --signal #2337E6 / #8E9BFF
  --signal-ink #FFFFFF / #0B0B14. Dark mode via prefers-color-scheme + footer toggle
  (persist choice in localStorage, wrapped in try/catch).
- Accent (--signal) only for links, focus, active states and data. Never large fills.
- Type: H1 Instrument Serif clamp(2.75rem, 1.6rem + 4.6vw, 6rem)/1.0, -0.01em;
  H2 clamp(2rem, 1.4rem + 2.2vw, 3.25rem)/1.05; body Geist 17px/1.6, max 68ch;
  lead 20px/1.5; labels Geist Mono 12px uppercase, 0.06em, tabular-nums.
  One italic serif emphasis word per headline at most.
- Grid: 12 columns, max 1320px, gutter clamp(16px, 2vw, 24px), side margin
  clamp(16px, 4vw, 48px). Breakpoints 640 / 960 / 1200. Section spacing
  clamp(4rem, 8vw, 8rem).
- Figures: 1px --rule frame, 0 radius, mono caption "FIG. 0X: ...". Fixed
  aspect-ratio on every image/video (16:10 desktop shots, 9:19.5 phones, 1:3 decals,
  4:5 renders, 16:9 case heroes).
- Buttons: primary ink bg / paper text, 44px high, radius 2px, hover -> signal bg;
  secondary 1px ink border. Links underlined, offset 0.2em, hover 2px + signal.
  External links end with ↗. Focus: 2px signal outline, 3px offset, everywhere.
- Motion: 140 ms hover, 240 ms UI, 560 ms reveal, easing cubic-bezier(.2,.7,.2,1).
  Below-the-fold sections fade + 12px rise once (IntersectionObserver, max 60 ms
  stagger). The hero does not animate except the one-time 900 ms trace draw.
  No scroll-jacking, no custom cursor, no smooth-scroll library.
  prefers-reduced-motion: disable reveals, draw, morphs and auto-rotation.
- Playground gets a slightly looser grid, larger images and mono "label tape" per
  tile; the rest of the site stays strict.

## Pages and sections: follow 01-handoff.md §4 exactly
/ (Hero · Selected work + More on GitHub · How I work · Experience · Playground ·
About · Contact · Footer), /work/deckforge-ai, /work/sk8sense, /playground,
/playground/[slug], /cv.pdf, 404. Case studies use the 6-part template:
The question · What I built · Key decisions · How it works · How I tested it ·
Limits & next. Sticky table of contents from 1200px.

First viewport (1440×900) must show: name, role, positioning line, both projects
(title + one line), CV link, GitHub link. On 390×844 the project index must start
within one screen height. Mobile menu: full-screen sheet, focus trap, Esc closes.

## Signature detail: Trick Trace (01-handoff.md §6.8)
- Server-rendered SVG from assets/sk8sense/trick-*.csv (t_ms, gx, gy, gz).
  Works without JS; JS only adds scrubbing (pointer + arrow keys) and the one-time
  draw.
- Full version (SK8Sense page): three lines (gx flip, gy pop, gz shuv); decisive axis
  in --signal, others --ink-2; dashed thresholds 220 / 150 / 170 °/s; shaded peak
  window computed with the firmware rules above; end label such as
  "|gx| 512 ≥ 220 and ≥ 1.35 × |gy| → KICKFLIP" computed from the data, not typed.
  Toggle between recordings if more than one exists.
- Compact version (hero, 96px desktop / 64px mobile): magnitude line only, caption
  from 02-content.md; thin static fragments may be reused as section dividers
  (aria-hidden).
- Accessibility: role="img" + aria-label from 02-content.md, plus <details>
  "View the data" with a table.
- If no CSV exists: no hero trace; on the SK8Sense page show a schematic with the
  label "Schematic: thresholds from the firmware, not recorded data." Never
  present synthetic data as recorded.

## Build order (stop after each step, run astro check + build + tests, show
## screenshots at 1440 and 390 wide in light and dark, then continue)
1. Setup, tokens, fonts, base layout, header/footer, mobile menu, skip link, dark mode.
2. Content collections + schemas; enter all copy from 02-content.md.
3. Home sections with real assets (pull DeckForge/SK8Sense images from the repos;
   see 01-handoff.md §8 for exact paths).
4. Case-study template + both case studies.
5. Playground index, detail page, lightbox (<dialog>, arrow keys, Esc).
6. Trick Trace (static SVG first, then data + interaction).
7. DeckForge 3D viewer on demand + no-WebGL fallback (three stills).
8. SEO, OG images (1200×630 per page), sitemap, 404, CV download.
9. Tests, a11y, Lighthouse budgets, CI, Vercel deploy.

## Done when (01-handoff.md §9)
- WCAG 2.2 AA: text contrast ≥ 4.5:1 in both themes, visible focus, one H1 per page,
  meaningful alt text, axe: no serious/critical issues, reduced motion respected.
- Lighthouse mobile ≥ 95 in all four categories on home and both case studies.
  LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. Home initial JS ≤ 30 kB gz, no WebGL on home.
- No horizontal scroll at 360 px; touch targets ≥ 44 px.
- All links work; CI green; no "TODO(input)" in the production build.
```
