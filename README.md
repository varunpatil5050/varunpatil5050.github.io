# Varun Patil — Portfolio

A responsive portfolio for Varun Patil, focused on software engineering,
language models, distributed systems, and product thinking.

## Included

- Featured case studies for Hindi/Nepali Transformer LMs, Atelier, and Judgment Explained
- A filterable project shelf with StreamRank, SignSense, and SyncSpace
- Interactive language evaluation results and an illustrative CRDT replay
- Experience, education, skills, and academic achievements
- Downloadable résumé and social/contact links
- Responsive layouts for desktop, tablet, and mobile
- Social sharing preview image
- Static GitHub Pages hosting with source on `main` and generated output on `gh-pages`

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

## Deployment

The repository is `varunpatil5050/varunpatil5050.github.io`. Source is maintained
on `main`; the contents of `dist/client` are published to the root of `gh-pages`.
GitHub Pages is configured to serve the `gh-pages` branch, with HTTPS enabled.
Source pushes alone do not update the website: rebuild and publish the generated
branch after a change. Keep `.nojekyll` so GitHub serves the `_next` assets.

The resume download was updated from `resume (18).pdf` in October 2026.
All displayed project measurements are reported results, not live telemetry.
