import "server-only";
import snapshot from "@/content/github-snapshot.json";

export type Repository = (typeof snapshot)[number];

function isRepository(value: unknown): value is Repository {
  if (!value || typeof value !== "object") return false;
  const repo = value as Record<string, unknown>;
  return (
    typeof repo.name === "string" &&
    typeof repo.html_url === "string" &&
    repo.html_url.startsWith("https://github.com/Aliabnrm/") &&
    typeof repo.updated_at === "string"
  );
}

export async function getRepositories(): Promise<{
  repositories: Repository[];
  source: "github" | "snapshot";
}> {
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
    const data: unknown = await response.json();
    if (!Array.isArray(data)) throw new Error("Unexpected GitHub response");
    const repositories = data
      .filter((r) => !r.fork && !r.archived)
      .filter(isRepository);
    return { repositories, source: "github" };
  } catch {
    return { repositories: snapshot, source: "snapshot" };
  }
}
