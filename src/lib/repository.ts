export type Repository = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
};

export function normalizeRepositories(data: unknown): Repository[] {
  if (!Array.isArray(data))
    throw new Error("Expected a GitHub repository array.");
  const repositories: Repository[] = [];
  for (const entry of data) {
    if (!entry || typeof entry !== "object") continue;
    const r = entry as Record<string, unknown>;
    if (r.fork || r.archived) continue;
    if (typeof r.name !== "string" || !/^[\w.-]+$/.test(r.name)) continue;
    if (r.html_url !== `https://github.com/Aliabnrm/${r.name}`) continue;
    if (
      typeof r.updated_at !== "string" ||
      !Number.isFinite(Date.parse(r.updated_at))
    )
      continue;
    let homepage: string | null = null;
    try {
      if (typeof r.homepage === "string") {
        const url = new URL(r.homepage);
        if (url.protocol === "https:" && !url.username && !url.password)
          homepage = url.href;
      }
    } catch {
      /* Invalid upstream links are omitted. */
    }
    const count = (v: unknown) =>
      typeof v === "number" && Number.isSafeInteger(v) && v >= 0 ? v : 0;
    repositories.push({
      name: r.name,
      description: typeof r.description === "string" ? r.description : null,
      html_url: r.html_url,
      homepage,
      language: typeof r.language === "string" ? r.language : null,
      stargazers_count: count(r.stargazers_count),
      forks_count: count(r.forks_count),
      updated_at: r.updated_at,
      topics: Array.isArray(r.topics)
        ? r.topics.filter((t): t is string => typeof t === "string")
        : [],
    });
  }
  if (data.length && !repositories.length)
    throw new Error("No valid public repositories in the response.");
  return repositories.sort(
    (a, b) =>
      b.updated_at.localeCompare(a.updated_at) || a.name.localeCompare(b.name),
  );
}
