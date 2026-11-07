"use client";
import { useDeferredValue, useState } from "react";
import { Search, X } from "lucide-react";
import { NoteRow, ResourceRow } from "@/components/content/content";
import { useLocalSet } from "@/hooks/use-local-set";
import type { Note, Resource } from "@/content/types";
import { cn } from "@/lib/utils";

export function Collection({
  kind,
  notes = [],
  resources = [],
}: {
  kind: "notes" | "library";
  notes?: Note[];
  resources?: Resource[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [savedOnly, setSavedOnly] = useState(false);
  const { items } = useLocalSet("ai-notebook:bookmarks:v1");
  const deferred = useDeferredValue(query).trim().toLowerCase();
  const categories =
    kind === "notes"
      ? ["All", "Complete", "In progress", "Idea"]
      : ["All", "Book", "Course", "Article", "Documentation"];
  const matches = (item: Note | Resource) =>
    `${item.title} ${item.description} ${item.topic}`
      .toLowerCase()
      .includes(deferred) &&
    (!savedOnly || items.includes(`${kind}/${item.slug}`));
  const filteredNotes = notes.filter(
    (n) => matches(n) && (category === "All" || n.status === category),
  );
  const filteredResources = resources.filter(
    (r) => matches(r) && (category === "All" || r.kind === category),
  );
  const count =
    kind === "notes" ? filteredNotes.length : filteredResources.length;
  return (
    <div>
      <div className="relative mb-4">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-4 text-primary"
        />
        <input
          aria-label={`Search ${kind}`}
          className="h-[52px] w-full rounded-md border border-primary bg-background pl-12 pr-12 text-sm placeholder:text-muted"
          placeholder={
            kind === "library"
              ? "Search by title, topic, or keyword…"
              : "Find a note, idea, or connection…"
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-1 top-1 flex size-11 items-center justify-center text-primary"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <div
        className="mb-7 flex flex-wrap items-center gap-2"
        aria-label="Filter collection"
      >
        {categories.map((c) => (
          <button
            key={c}
            aria-pressed={c === category}
            onClick={() => setCategory(c)}
            className={cn(
              "min-h-11 rounded-md border px-4 text-xs text-primary transition-colors hover:bg-accent",
              category === c &&
                "border-primary bg-primary text-primary-foreground hover:bg-primary-hover",
            )}
          >
            {c}
          </button>
        ))}
        <button
          aria-pressed={savedOnly}
          onClick={() => setSavedOnly(!savedOnly)}
          className={cn(
            "min-h-11 rounded-md border px-4 text-xs text-primary hover:bg-accent",
            savedOnly && "border-primary bg-accent",
          )}
        >
          Saved
        </button>
      </div>
      <p role="status" className="mb-3 text-xs text-muted">
        {count} {count === 1 ? "result" : "results"}
        {savedOnly ? " saved in this browser" : ""}
      </p>
      {count === 0 ? (
        <div className="panel py-14 text-center">
          <h2 className="text-xl font-semibold">Nothing here yet.</h2>
          <p className="mt-2 text-muted">
            Try another keyword or a different filter.
          </p>
          <button
            className="text-link mt-4 min-h-11"
            onClick={() => {
              setQuery("");
              setCategory("All");
              setSavedOnly(false);
            }}
          >
            Clear all filters →
          </button>
        </div>
      ) : kind === "library" ? (
        <section aria-labelledby="resources-title">
          <h2 id="resources-title" className="sr-only">
            Resources
          </h2>
          {filteredResources.map((r) => (
            <ResourceRow key={r.slug} resource={r} />
          ))}
        </section>
      ) : (
        ["Complete", "In progress", "Idea"].map((status) => {
          const group = filteredNotes.filter((n) => n.status === status);
          return (
            group.length > 0 && (
              <section key={status} className="mb-10">
                <h2 className="mb-2 text-lg font-semibold">{status}</h2>
                {group.map((note) => (
                  <NoteRow key={note.slug} note={note} />
                ))}
              </section>
            )
          );
        })
      )}
    </div>
  );
}
