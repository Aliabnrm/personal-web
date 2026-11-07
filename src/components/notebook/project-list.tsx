"use client";
import { useDeferredValue, useState } from "react";
import { ExternalLink, Github, Search, Star } from "lucide-react";
import type { Repository } from "@/lib/github";
import { Badge } from "@/components/ui/badge";
export function ProjectList({ repositories }: { repositories: Repository[] }) {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("All languages");
  const term = useDeferredValue(query).trim().toLowerCase();
  const languages = [
    ...new Set(
      repositories
        .map((r) => r.language)
        .filter((l): l is string => Boolean(l)),
    ),
  ].sort();
  const filtered = repositories.filter(
    (r) =>
      (language === "All languages" || r.language === language) &&
      `${r.name} ${r.description || ""} ${r.language || ""}`
        .toLowerCase()
        .includes(term),
  );
  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-4 text-primary" />
          <input
            aria-label="Search projects"
            placeholder="Find a project…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-[52px] w-full rounded-md border border-border bg-background pl-12 pr-4"
          />
        </div>
        <select
          aria-label="Filter by language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="h-[52px] rounded-md border border-border bg-background px-4"
        >
          <option>All languages</option>
          {languages.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>
      <p role="status" className="mb-5 text-xs text-muted">
        {filtered.length} public{" "}
        {filtered.length === 1 ? "project" : "projects"}
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((repo) => {
          let liveUrl: string | undefined;
          try {
            if (repo.homepage && new URL(repo.homepage).protocol === "https:")
              liveUrl = repo.homepage;
          } catch {
            /* Ignore invalid upstream URLs. */
          }
          return (
            <article
              key={repo.name}
              className="panel flex min-h-[225px] flex-col gap-4 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <Github size={22} className="text-primary" />
                {repo.language && <Badge>{repo.language}</Badge>}
              </div>
              <h2 className="break-words text-xl font-semibold">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary"
                >
                  {repo.name}
                </a>
              </h2>
              <p className="flex-1 text-sm text-muted">
                {repo.description ||
                  `Explore the source code and documentation for ${repo.name.replaceAll("-", " ")}.`}
              </p>
              <div className="flex flex-wrap items-center gap-5 text-[13px]">
                <a
                  className="text-link inline-flex items-center gap-2"
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View source <ExternalLink size={13} />
                </a>
                {liveUrl && (
                  <a
                    className="text-link inline-flex items-center gap-2"
                    href={liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live demo <ExternalLink size={13} />
                  </a>
                )}
                {repo.stargazers_count > 0 && (
                  <span className="ml-auto inline-flex items-center gap-1 text-xs text-muted">
                    <Star size={13} />
                    {repo.stargazers_count}
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <div className="panel py-12 text-center">
          <h2 className="text-xl font-semibold">No matching projects</h2>
          <p className="mt-2 text-muted">Try another name or language.</p>
        </div>
      )}
    </div>
  );
}
