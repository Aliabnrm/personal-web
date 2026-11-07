# personal-web

AI Notebook is Ali Abnar’s personal notebook and project collection. It includes English content, light and dark themes, and responsive layouts for phones, tablets, and desktop browsers.

## Run locally

Requires Node.js 22 or newer and pnpm 12.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open [localhost:3000](http://localhost:3000). For a production preview:

```sh
pnpm build
pnpm start
```

## Stack

- Next.js 16 App Router, React 19, and strict TypeScript.
- Tailwind CSS 4 with shared color, typography, spacing, and radius tokens.
- Radix Dialog and small typed UI primitives for accessible interactions.
- Self-hosted Inter variable font; no Google Fonts request at runtime or build time.
- Server-rendered pages, static generation for editorial content, and hourly revalidation for GitHub projects.
- Playwright, axe, ESLint, and Prettier for verification.

## Features

- Home, weekly archive and issues, learning paths and chapters, library, notes, about, now, and projects.
- Real public projects from [Aliabnrm](https://github.com/Aliabnrm), with language filtering and a saved fallback if GitHub is unavailable.
- Search across editorial content and public projects; working empty and filtered states.
- Theme preference, saved notes/resources, and learning progress persist in the current browser.
- Mobile navigation with focus management, keyboard support, RSS, sitemap, social preview, and meaningful 404/error states.
- Read-only server endpoints at `/api/projects` and `/api/search?q=retrieval`.

## Configuration and deployment

Copy `.env.example` to `.env.local` if needed. Set `NEXT_PUBLIC_SITE_URL` to the real production origin before the production build, so feed, sitemap, and social metadata use the correct address. `GITHUB_TOKEN` is optional and remains server-side; public repositories work without it.

Deploy to a Node.js host or a Next.js platform such as Vercel. Use `pnpm install --frozen-lockfile`, `pnpm build`, and `pnpm start`. A static-only host cannot run the search API and server-side GitHub revalidation.

No database is needed for this public read-only content site. Saved learning state is per browser and is not account-based or synchronized between devices. Editorial content lives in `src/content/notebook.ts`; edit this file to publish your own notes, resources, and weekly issue summaries. Weekly article bodies live in `src/content/weekly-details.ts` and use the same issue slugs. Update the offline GitHub snapshot with `pnpm sync:github`.

## Structure

```text
src/
  app/                  Routes, metadata, RSS, and server API handlers
  components/
    layout/             Shared header and footer
    notebook/           Content views and interactive collections
    ui/                 Small reusable design primitives
  content/              Typed editorial content and GitHub fallback data
  hooks/                Browser persistence
  lib/                  Server GitHub integration, site config, utilities
scripts/                GitHub snapshot refresh
tests/                  Browser and accessibility checks
```

## Checks

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm test
pnpm format:check
```

Browser tests use the installed Google Chrome and cover desktop, tablet, mobile, and narrow navigation. Run `pnpm build` before `pnpm test`. Test reports and build output are ignored by Git.

## Design and content

The home layout follows the [supplied Figma frame](https://www.figma.com/design/oVuDO2VKh2u3IZ2A74YBEd/Untitled?node-id=3-29985). A full pixel comparison against all Figma frames has not been verified. Supporting article copy should be reviewed before public publication.
