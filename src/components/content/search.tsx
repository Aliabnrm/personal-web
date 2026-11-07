"use client";
import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { searchIndex, type SearchItem } from "@/lib/search";
export function SiteSearch({
  index,
  initialQuery = "",
}: {
  index: SearchItem[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState("All");
  const term = useDeferredValue(query).trim().toLowerCase();
  const types = ["All", ...new Set(index.map((i) => i.type))];
  const results = searchIndex(index, term, type);
  return (
    <div>
      <form action="/search" className="relative mb-5">
        <Search size={20} className="absolute left-4 top-[18px] text-primary" />
        <input
          name="q"
          aria-label="Search the site"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you curious about?"
          className="h-14 w-full rounded-md border border-primary bg-background pl-12 pr-12 text-base"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQuery("")}
            className="absolute right-1 top-1.5 flex size-11 items-center justify-center text-primary"
          >
            <X size={18} />
          </button>
        )}
      </form>
      <div className="mb-6 flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t}
            aria-pressed={type === t}
            onClick={() => setType(t)}
            className={cn(
              "min-h-11 rounded-md border border-border px-4 text-xs text-primary hover:bg-accent",
              type === t &&
                "border-primary bg-primary text-primary-foreground hover:bg-primary-hover",
            )}
          >
            {t}
          </button>
        ))}
      </div>
      <p role="status" className="mb-5 text-xs text-muted">
        {term
          ? `${results.length} ${results.length === 1 ? "result" : "results"} for “${query.trim()}”`
          : "Search case studies, engineering notes, resources, and repositories."}
      </p>
      {!term ? (
        <div className="rounded-md bg-accent p-6">
          <h2 className="text-lg font-semibold">Follow a thread.</h2>
          <p className="mt-2 text-sm text-muted">
            Try a topic you want to understand a little better.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {["retrieval", "evaluation", "agents", "TypeScript"].map((t) => (
              <button
                key={t}
                onClick={() => setQuery(t)}
                className="text-link min-h-11 rounded-md border border-primary px-4 text-sm"
              >
                {t} →
              </button>
            ))}
          </div>
        </div>
      ) : results.length === 0 ? (
        <div className="panel px-6 py-14 text-center">
          <Search size={26} className="mx-auto mb-4 text-primary" />
          <h2 className="text-xl font-semibold">
            No results. A different starting point?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Try a shorter phrase or a broader topic. The collection is still
            growing.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setType("All");
            }}
            className="text-link mt-5 min-h-11"
          >
            Start a new search →
          </button>
        </div>
      ) : (
        <div>
          {results.map((result) => (
            <article key={result.href} className="border-b border-border py-5">
              <p className="eyebrow">{result.type}</p>
              <h2 className="mt-1 text-lg font-semibold">
                <Link className="hover:text-primary" href={result.href}>
                  {result.title}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-muted">{result.description}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
