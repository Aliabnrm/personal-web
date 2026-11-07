"use client";
import { useState } from "react";
import { Check, ExternalLink } from "lucide-react";
import type { LearningPath } from "@/content/notebook";
import { useLocalSet } from "@/hooks/use-local-set";
export function PathProgress({ path }: { path: LearningPath }) {
  const { items, toggle } = useLocalSet(`ai-notebook:progress:${path.slug}:v1`);
  const [error, setError] = useState("");
  const complete = path.modules.filter((_, i) =>
    items.includes(String(i)),
  ).length;
  const percent = Math.round((complete / path.modules.length) * 100);
  return (
    <div>
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm">
          <h2 className="font-semibold">Your progress · {percent}%</h2>
          <span className="text-xs text-muted">
            {complete} of {path.modules.length} chapters
          </span>
        </div>
        <div
          role="progressbar"
          aria-label="Learning path progress"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-1.5 overflow-hidden rounded-full bg-accent"
        >
          <div
            className="h-full rounded-full bg-primary transition-[width]"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted">
          Saved on this device. Check off a chapter when you finish.
        </p>
        <p role="status" className="text-xs text-muted">
          {error}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {path.modules.map((module, i) => {
          const checked = items.includes(String(i));
          return (
            <article key={module.title} className="panel p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <button
                  aria-pressed={checked}
                  aria-label={`${checked ? "Mark incomplete" : "Complete"}: ${module.title}`}
                  onClick={() => {
                    if (!toggle(String(i)))
                      setError("Progress could not be saved in this browser.");
                  }}
                  className={`mt-1 flex size-6 shrink-0 items-center justify-center rounded border ${checked ? "border-primary bg-primary text-primary-foreground" : "border-primary text-primary"}`}
                >
                  {checked && <Check size={16} />}
                </button>
                <div className="min-w-0">
                  <p className="text-xs text-muted">
                    Chapter {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">{module.title}</h3>
                  <p className="mt-2 text-sm text-muted">
                    {module.description}
                  </p>
                  <a
                    href={module.resource}
                    target="_blank"
                    rel="noreferrer"
                    className="text-link mt-3 inline-flex items-center gap-2 text-[13px]"
                  >
                    Open learning resource
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
