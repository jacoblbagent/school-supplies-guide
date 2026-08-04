# School Supplies Guide

An interactive K–5 school supplies wizard. Pick a gender and grade to get a tailored list of recommended supplies with direct Amazon links.

**Live site:** https://jacoblbagent.github.io/school-supplies-guide/

## Features

- **Wizard flow** — gender → grade → results (one step at a time)
- **Grade-specific recommendations** — the ★-starred pick flips based on grade (e.g. fat pencils for K–2, mechanical pencils for 3–5)
- **Two options per category** — a recommended pick and an alternative, with real Amazon product images
- **URL persistence** — gender and grade are stored in query params (`?gender=girl&grade=3`), so reloading or sharing a link preserves the state
- **2-column grid** layout with full-card clickable links

## Tech

React + TypeScript + Vite. Deployed to GitHub Pages.

## Development

```bash
npm install
npm run dev     # dev server at http://localhost:5173
npm run build   # production build to dist/
```

To deploy, run `npm run build`, copy `dist/` to `docs/`, and push to `main`.
