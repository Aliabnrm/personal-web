# Ali Abnar — personal site

A professional portfolio and engineering notebook for software/product engineering with an applied AI focus. English content, light and dark themes, and responsive layouts for mobile, tablet, and desktop.

## Local development

Requires Node.js **22.18+** (Node 24 recommended) and **pnpm 12**. The Node minimum also supports native TypeScript imports in the maintenance and domain-check scripts.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

For a production preview, run `pnpm build`, then `pnpm start`. Open [localhost:3000](http://localhost:3000).

## What is included

- Personal introduction, selected work, résumé download, professional experience, and direct email/LinkedIn/Telegram contact.
- Three source-linked case studies: Document Q&A, FastFactor, and Salon Booking. Decisions, tradeoffs, measurements, conditions, and limits are explicit. Evidence links are pinned to the reviewed Git revisions.
- Writing hub, project-backed notes, annotated resources, and learning paths. Historical weekly URLs redirect to the writing hub; replaced sample notes have explicit redirects.
- A browser-only retrieval playground using labeled teaching fixtures, reciprocal rank fusion, and an adjustable context budget. It makes no model/API calls.
- Search across case studies, notes, resources, learning paths, and public repositories. Public GitHub metadata is cached for an hour, with a committed fallback.
- Per-browser bookmarks, learning progress, and theme preference. These are not accounts or cross-device sync.
- RSS, sitemap, canonical metadata on primary pages, social preview, Person structured data, and 404/error states.

## Architecture

Next.js App Router and React with strict TypeScript. Tailwind CSS uses the existing blue palette and shared design tokens; Radix Dialog handles mobile navigation. Inter is self-hosted. Editorial routes are statically generated, interactive components are small client boundaries, and GitHub requests stay on the server. No database, CMS, or paid AI service is required.

```text
src/
  app/                  Pages, metadata, RSS, and read-only API handlers
  components/
    content/            Articles, collections, search, and reading tools
    layout/             Shared navigation and footer
    profile/            Contact presentation
    ui/                 Small reusable primitives
    work/               Project cards, repository list, retrieval playground
  content/
    projects.ts         Reviewed case studies and pinned evidence
    profile.ts          Experience and areas of contribution
    notes.ts            Published project-backed writing
    resources.ts        Annotated external references
    learning-paths.ts   Curated study routes
    types.ts            Editorial content contracts
    github-snapshot.json  Public repository fallback
  hooks/                Resilient browser persistence
  lib/                  Site config, GitHub adapter, search, retrieval example
public/resume/          Original supplied résumé PDF
scripts/                Repository snapshot refresh
.github/                Quality checks, maintenance workflow, note-capture form
tests/                  Domain, browser, and automated accessibility checks
```

## Editing content without maintaining a publishing schedule

1. After a useful project decision, record four things: the problem, what you tried, what happened, and the next step. A short voice transcript is enough input.
2. Use **Capture an engineering note** in GitHub Issues to collect that input and source links. This form captures a brief; it does not publish or generate text.
3. Prepare a short English note in `src/content/notes.ts`, connect its project, and link the exact source revision. AI can help edit a draft, but personal claims and measurements need review.
4. Review the diff and merge a normal PR. Search, static routes, and RSS pick up published notes at build time. There is no weekly publishing obligation.

Update case-study measurements only after reviewing the source report and its conditions. `src/lib/site.ts` owns identity and contact links. The supplied PDF is preserved byte-for-byte; its original contact details may differ from the current site contact information. Replace the PDF when you have a revised résumé.

## Automation

`pnpm sync:github` validates and atomically updates the public repository snapshot. A failed request leaves the committed file intact.

The **Refresh public GitHub metadata** workflow runs weekly or manually and proposes a draft PR only when metadata changes. It does not change case studies, claim new achievements, generate articles, or auto-merge. Enable GitHub Actions' permission to create pull requests in the repository settings before using it. The default GitHub token is sufficient; no external service key is required.

The **Quality checks** workflow runs formatting, lint, generated route types, domain checks, the production build, and Chromium browser tests. The maintenance job runs its own checks because PRs created with the default GitHub token do not trigger ordinary PR workflows.

## Configuration and deployment

Set `NEXT_PUBLIC_SITE_URL` to the real production origin **before building**. Feed, sitemap, canonical links, and structured data use this origin. `.env.example` lists the settings. `GITHUB_TOKEN` is optional, remains server-side, and raises the API rate limit.

Deploy to a Node host or Next.js platform such as Vercel using `pnpm install --frozen-lockfile` and `pnpm build`. A static-only host cannot run server search or GitHub revalidation. Deployment is separate from local verification.

Read-only endpoints: `/api/projects` and `/api/search?q=retrieval`.

## Verification

```sh
pnpm format:check
pnpm check
pnpm test:e2e
```

`pnpm check` runs lint, `next typegen` and TypeScript, domain tests, and the production build. Browser tests require that build and start their own production server on port 3000. Local tests use installed Google Chrome; CI uses Playwright Chromium. Tests cover three viewport profiles, navigation/focus, theme persistence, case studies, contact and résumé delivery, search, malformed local storage, learning progress, repository filters, the interactive experiment, content routes, redirects, feeds, and automated WCAG checks in both themes. Build and test artifacts are ignored.

The design preserves the supplied Figma palette while adapting the information architecture to the professional portfolio brief. This is not a claim of pixel equivalence to every original Figma frame.
