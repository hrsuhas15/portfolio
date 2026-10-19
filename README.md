# portfolio

Personal portfolio of **Suhas H R**, Lead Software Engineer. Built with Vue 3 + Vite and deployed to GitHub Pages.

All personal and project content comes from `Resume/SuhasHRResume.pdf`.

## Stack

- Vue 3 (`<script setup>`), Vue Router, Vite
- Plain CSS with design tokens (`src/styles/`)
- Inter + Fira Code (self-hosted via Fontsource)
- Lucide icons (`lucide-vue-next`)
- ESLint

## Getting started

Requires Node.js 20.

```bash
npm install
npm run dev       # http://localhost:5173/portfolio/
npm run lint
npm run build     # outputs dist/
npm run preview   # serve the production build locally
```

## Project structure

```
src/
  data/          # all content: profile, experience/education, skills, projects
  components/    # header, footer, cards, timeline, skills grid, diagram
  composables/   # useTheme (dark/light), useSeo (title + meta tags)
  pages/         # Home, Projects, ProjectDetail, About, NotFound
  router/        # routes + per-page meta
  styles/        # tokens.css, themes.css, global.css
public/          # favicon, resume.pdf, robots.txt
```

## Updating content

Edit the files in `src/data/` only — components read from them.

- **Profile, summary, links, achievements:** `src/data/profile.js`
- **Jobs and education:** `src/data/experience.js`
- **Skills:** `src/data/skills.js`
- **Projects:** `src/data/projects.js`
- **Resume PDF:** replace `public/resume.pdf`
- **Profile picture:** save a square photo (about 600×600) as `public/profile.jpg`, then set `photo: 'profile.jpg'` in `src/data/profile.js`. Until then, the site shows your initials.

### Adding a project

Append an object to `projects` in `src/data/projects.js` with a unique `slug`. The page at `/projects/<slug>`, the card, search, and category filter are generated automatically. Each section has a `kind`:

- `documented` — facts from the resume.
- `context` — general engineering explanation. Shown with a "General technical context" badge.

An optional `diagram` (nodes with x/y positions + edges) renders as an SVG. Set `conceptual: true` when it shows a typical approach rather than the real system.

## Deployment (GitHub Pages)

```bash
npm run deploy
```

This builds the site and pushes `dist/` to the `gh-pages` branch.

One-time setup: in the repo on GitHub, open **Settings → Pages**, set **Source: Deploy from a branch**, and pick **Branch: `gh-pages`**, folder **`/ (root)`**.

Run `npm run deploy` again whenever you change the site. The site is at `https://hrsuhas15.github.io/portfolio/`.

**Base path:** the build uses `/portfolio/` by default. For a custom domain or a `hrsuhas15.github.io` user site, add `VITE_BASE=/` to a `.env` file.

**Deep links:** GitHub Pages can't rewrite URLs, so the build copies `index.html` to `404.html`. Opening or refreshing `/projects/<slug>` loads the app, which then shows the right page.

## Content pending review

These details aren't in the resume, so the site leaves them out. Add them to `src/data/` if you'd like them shown:

- **AI-Powered Catalog Assistant:** where it was built (Samsung, academic, or personal), which LLM was used, and whether it's in production.
- **Metrics:** any numbers you can share publicly (data volume migrated, test coverage, release frequency, number of manufacturers).
- **Cassandra → DynamoDB:** the actual migration mechanism (dual-write, CDC, tooling). The diagram currently shows a common pattern.
- **Multi-cloud platform:** RL algorithms used and the evaluation results.
- **Hero tagline:** "I build cloud-native platforms at scale." is a condensed version of your summary. Change it in `profile.js` if you prefer different wording.
- **Social preview image:** no `og:image` is set. To add one, put a 1200×630 PNG in `public/` and add an absolute-URL `og:image` meta tag to `index.html`.

Each project's `reviewNotes` in `projects.js` lists the gaps for that project.
