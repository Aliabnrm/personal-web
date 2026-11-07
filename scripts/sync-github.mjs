import { rename, writeFile } from "node:fs/promises";
import { normalizeRepositories } from "../src/lib/repository.ts";

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
  throw new Error(`GitHub returned ${response.status}; snapshot unchanged.`);
const snapshot = normalizeRepositories(await response.json());
const target = new URL("../src/content/github-snapshot.json", import.meta.url);
const temporary = new URL(`${target.href}.tmp`);
await writeFile(temporary, JSON.stringify(snapshot, null, 2) + "\n");
await rename(temporary, target);
console.log(`Saved ${snapshot.length} public repositories.`);
