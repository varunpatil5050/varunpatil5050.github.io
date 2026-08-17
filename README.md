# Varun Patil — Portfolio

A bold, responsive portfolio for Varun Patil, focused on machine learning,
distributed systems, and product engineering.

## Included

- Featured case studies for Atelier, StreamRank, and SignSense
- Experience, education, skills, and academic achievements
- Downloadable résumé and social/contact links
- Responsive layouts for desktop, tablet, and mobile
- Social sharing preview image
- GitHub Pages deployment workflow

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

The included GitHub Actions workflow publishes `dist/client` whenever the
`main` branch is pushed. For a personal GitHub Pages URL, use a repository named
`varunpatil5050.github.io` and choose **GitHub Actions** as the Pages source.
