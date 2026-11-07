import "server-only";
import { cache } from "react";
import snapshot from "@/content/github-snapshot.json";
import { normalizeRepositories, type Repository } from "./repository";

export const getRepositories = cache(
  async (): Promise<{
    repositories: Repository[];
    source: "github" | "snapshot";
  }> => {
    try {
      const response = await fetch(
        "https://api.github.com/users/Aliabnrm/repos?per_page=100&sort=updated",
        {
          headers: {
            Accept: "application/vnd.github+json",
            ...(process.env.GITHUB_TOKEN
              ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
              : {}),
          },
          next: { revalidate: 3600, tags: ["github-repositories"] },
          signal: AbortSignal.timeout(5000),
        },
      );
      if (!response.ok) throw new Error(`GitHub responded ${response.status}`);
      return {
        repositories: normalizeRepositories(await response.json()),
        source: "github",
      };
    } catch {
      return {
        repositories: normalizeRepositories(snapshot),
        source: "snapshot",
      };
    }
  },
);
