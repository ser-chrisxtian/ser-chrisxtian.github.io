# Christian B. Peña — Portfolio

Personal portfolio of **Christian B. Peña** — IT Educator • Software Developer • Web Developer.

A fast, fully static Angular site with dark/light themes, data-driven content, and project detail pages. It is deployed automatically to GitHub Pages at **https://ser-chrisxtian.github.io/**.

## Technologies

- **Angular 22**: standalone components, signals, zoneless change detection, lazy-loaded routes
- **TypeScript** (strict mode)
- **Tailwind CSS 4** with design tokens for both themes (`src/styles.css`): warm cream / terracotta light theme and an espresso-brown dark theme
- **Angular Router**: `/` and `/projects/:id`
- Native CSS animations plus Angular `animate.enter` / `animate.leave` (no animation library)
- **Vitest** for unit tests
- **GitHub Actions** + **GitHub Pages** for deployment

No backend, database, or paid services are used.

## Development

Requires Node.js 22.22+ or 24.15+ (matching Angular 22's supported versions).

```bash
npm install     # install dependencies
npm start       # dev server at http://localhost:4200
npm test        # run unit tests
```

## Production build

```bash
npm run build
```

The output is written to `dist/portfolio/browser/`. The build runs three steps automatically:

1. `scripts/resume-status.mjs` records whether `public/resume.pdf` exists.
2. `ng build` creates the optimized production bundle.
3. `scripts/postbuild.mjs` adds `404.html` (a copy of `index.html`) and `.nojekyll`.

`404.html` lets deep links such as `/projects/safelink` work on GitHub Pages. GitHub serves that file for any unknown path, and Angular's router then shows the correct page.

## GitHub Pages deployment

This project is configured as a **user site**, so it is served from the domain root (`<base href="/">`). Asset paths are relative, so no extra base-path configuration is needed.

1. **Create the repository** on GitHub, named exactly `ser-chrisxtian.github.io` (public).
2. **Push the project:**
   ```bash
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/ser-chrisxtian/ser-chrisxtian.github.io.git
   git push -u origin main
   ```
3. **Configure GitHub Pages:** open the repository → **Settings → Pages**.
4. Under **Build and deployment → Source**, select **GitHub Actions**.
5. **Push changes** to `main`. Every push triggers `.github/workflows/deploy.yml`. You can also run it manually from the **Actions** tab ("Run workflow").
6. **Wait for the workflow** "Deploy to GitHub Pages" to finish (usually 1–2 minutes) in the **Actions** tab.
7. **Open** https://ser-chrisxtian.github.io/

The workflow installs dependencies with `npm ci`, runs `npm run build`, and publishes `dist/portfolio/browser` using the official `actions/upload-pages-artifact` and `actions/deploy-pages` actions.

## Updating portfolio content

All content lives in `src/app/data/`. You don't need to edit any components.

Any value written in brackets, such as `[Add Email]`, is a **placeholder**. The site shows it as a clearly marked label and never turns it into a link. Replace the bracketed text with real information when you have it.

| File            | What it controls                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| `profile.ts`    | Name, roles, summary, bio, areas of work, "What I do" cards, email, GitHub, LinkedIn, other links, resume path |
| `projects.ts`   | Projects: cards, category filter, and detail pages                                                             |
| `skills.ts`     | Technology stack categories                                                                                    |
| `experience.ts` | Experience timeline                                                                                            |
| `education.ts`  | Education entries                                                                                              |

Notes:

- **Social links:** set `email`, `githubUrl`, `linkedinUrl`, and `otherLinks` in `profile.ts`. A real email address automatically becomes a `mailto:` link.
- **Skills:** technologies whose names also appear in a project's `technologies` list are marked in the Skills section and linked to those projects. Keep the spelling consistent.
- **Experience / Education:** append objects to the arrays to add more entries.

### Hero photo

The hero shows an illustrated workspace by default. To use a real portrait instead, add a square image (at least 800×800) to `public/images/`, then set it in `profile.ts`:

```ts
photo: { src: 'images/profile.jpg', alt: 'Portrait of Christian B. Peña' },
```

### Adding a project

Append an object to the `projects` array in `src/app/data/projects.ts`:

```ts
{
  id: 'library-system',                       // URL: /projects/library-system
  title: 'Library Management System',
  description: 'Short summary shown on the project card.',
  longDescription: 'Overview paragraph for the detail page.',
  category: 'Information System',             // Web Application | Information System | Mobile Application | Education Technology | Other
  technologies: ['Angular', 'NestJS', 'PostgreSQL'],
  image: {
    src: 'images/projects/library-system/cover.png',
    alt: 'Dashboard of the Library Management System',
  },
  problem: 'What problem the project addresses.',
  solution: 'How the system addresses it.',
  featuresLabel: 'Key features',
  features: ['Catalog search', 'Borrowing records', 'Reports'],
  role: 'Full-stack developer',
  screenshots: [
    { src: 'images/projects/library-system/catalog.png', alt: 'Catalog search page', caption: 'Catalog search' },
  ],
  githubUrl: 'https://github.com/ser-chrisxtian/library-system', // omit if private → shows "Private Project"
  demoUrl: 'https://example.com',                                 // omit if no live demo
  featured: false,
},
```

The card, category filter, and detail page are generated automatically. Filter buttons appear only for categories that have projects.

### Adding screenshots

Put images in `public/images/projects/<project-id>/`:

```
public/images/projects/
├── neust-portal/cover.svg
├── scheduling-system/cover.svg
├── document-monitoring/cover.svg
└── safelink/cover.svg
```

The current `cover.svg` files are **generated placeholder illustrations, not real screenshots**. To replace them:

1. Add your screenshots (PNG/JPG/WebP, about 1600×1000 / 16:10, compressed) to the project's folder.
2. In `projects.ts`, update `image.src` and the `screenshots` list. Remove `placeholder: true`, and replace the `[Add Project Screenshot]` caption.
3. Always use paths **without a leading slash** (`images/...`, not `/images/...`) and write a descriptive `alt` text.

## Resume

Put your resume at **`public/resume.pdf`** and rebuild (or push). The Resume buttons switch from "Resume in preparation" to a working download link automatically. To replace the resume later, overwrite the same file.

## Project structure

```
src/app/
├── components/      # navbar, footer, icon, theme-toggle, project-card, tech-badge, section-heading, resume-button
├── sections/        # hero, about, skills, projects, experience, education, contact
├── pages/           # home, project-detail, not-found
├── data/            # profile.ts, projects.ts, skills.ts, experience.ts, education.ts  ← edit content here
├── shared/          # theme & resume services, section scroll-spy, reveal directive, placeholder helper
├── app.routes.ts
└── app.config.ts
public/              # static files copied as-is (images, favicon, og-image.png, resume.pdf)
scripts/             # build helpers (resume status, GitHub Pages fallback)
.github/workflows/   # deploy.yml
```

## Accessibility and performance

- Semantic landmarks, one `h1` per page, labelled sections, skip link, and visible focus styles
- Keyboard-accessible mobile menu (Escape closes it) and `aria-pressed` filter buttons
- `prefers-reduced-motion` disables animations and smooth scrolling
- Theme preference is saved in `localStorage`; otherwise the OS preference is followed (dark by default)
- About 85 kB (compressed) initial load; the project detail page is lazy-loaded; icons are inline SVG; Google Fonts CSS is inlined at build time
