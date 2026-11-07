import { writeFile } from "node:fs/promises";
const response = await fetch(
  "https://api.github.com/users/Aliabnrm/repos?per_page=100&sort=updated",
  {
    headers: {
      Accept: "application/vnd.github+json",
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
    },
    signal: AbortSignal.timeout(15000),
  },
);
if (!response.ok)
  throw new Error(
    `GitHub returned ${response.status}; the saved snapshot has not been changed.`,
  );
const repositories = await response.json();
const keys = [
  "name",
  "description",
  "html_url",
  "homepage",
  "language",
  "stargazers_count",
  "forks_count",
  "updated_at",
  "topics",
];
const snapshot = repositories
  .filter((r) => !r.fork && !r.archived)
  .map((r) => Object.fromEntries(keys.map((k) => [k, r[k] ?? null])));
await writeFile(
  new URL("../src/content/github-snapshot.json", import.meta.url),
  JSON.stringify(snapshot, null, 2) + "\n",
);
console.log(`Saved ${snapshot.length} public repositories.`);
