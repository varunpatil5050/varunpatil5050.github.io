# Varun Patil — Portfolio

A responsive portfolio for Varun Patil, focused on software engineering,
language models, distributed systems, and product thinking.

## Included

- Six direct case-study pages: Atelier, Hindi/Nepali Transformer LMs, Judgment Explained,
  StreamRank, SignSense, and SyncSpace
- Original lime-lit solar visual with a blue halo, mixed-color revolving nodes,
  pointer lighting, motion pause, and offscreen suspension
- Interactive language evaluation results, illustrative CRDT replay, and evidence tracing
- Native scroll-linked depth and staged project reveals without animation libraries
- Experience, education, skills, and academic achievements
- Downloadable résumé and social/contact links
- Responsive layouts for desktop, tablet, and mobile
- Social sharing preview image
- Static GitHub Pages hosting with source on `main` and generated output on `gh-pages`

The October refinement is a local preview pending approval; the live deployment
is not changed by local source commits. Art direction and motion rules are in
`DESIGN.md`. Browser verification details are in `QA.md`.

## Local preview

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
```

The GitHub Pages-ready static site is created in `dist/client`.
It includes real `/work/<slug>/index.html` pages, a dedicated 404, sitemap,
robots file, and `.nojekyll`. Links use standard navigation so deep pages work
without a server-side rendering service.

## Deployment

The repository is `varunpatil5050/varunpatil5050.github.io`. Source is maintained
on `main`; the contents of `dist/client` are published to the root of `gh-pages`.
GitHub Pages is configured to serve the `gh-pages` branch, with HTTPS enabled.
Source pushes alone do not update the website: rebuild and publish the generated
branch after a change. Keep `.nojekyll` so GitHub serves the `_next` assets.

The resume download was updated from `resume (18).pdf` in October 2026.
All displayed project measurements are reported results, not live telemetry.
