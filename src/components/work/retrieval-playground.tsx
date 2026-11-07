"use client";
import { useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { packPassages, type RetrievalStrategy } from "@/lib/retrieval-demo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export function RetrievalPlayground() {
  const [strategy, setStrategy] = useState<RetrievalStrategy>("hybrid");
  const [budget, setBudget] = useState(80);
  const passages = packPassages(strategy, budget);
  const selected = passages.filter((p) => p.included);
  const used = selected.reduce((sum, p) => sum + p.words, 0);
  const covered = selected.filter((p) => p.required).length;
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[300px_1fr]">
      <div className="panel p-6">
        <fieldset>
          <legend className="mb-3 text-sm font-semibold">
            Retrieval strategy
          </legend>
          <div className="flex flex-wrap gap-2 lg:flex-col">
            {(
              [
                ["keyword", "Keyword ranking"],
                ["semantic", "Semantic ranking"],
                ["hybrid", "Hybrid / rank fusion"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                aria-pressed={strategy === value}
                onClick={() => setStrategy(value)}
                className={cn(
                  "min-h-11 rounded-md border px-3 py-2 text-left text-xs",
                  strategy === value
                    ? "border-primary bg-accent text-primary"
                    : "border-border hover:border-primary",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>
        <label
          htmlFor="context-budget"
          className="mb-3 mt-7 block text-sm font-semibold"
        >
          Context budget: {budget} words
        </label>
        <input
          id="context-budget"
          type="range"
          min="20"
          max="160"
          step="20"
          value={budget}
          onChange={(event) => setBudget(Number(event.target.value))}
          className="h-11 w-full accent-primary"
        />
        <p className="mt-2 text-xs text-muted">
          A word budget keeps the example readable. Production systems need the
          model’s actual tokenizer.
        </p>
        <Button
          variant="ghost"
          className="mt-4 px-0 text-xs"
          onClick={() => {
            setStrategy("hybrid");
            setBudget(80);
          }}
        >
          <RotateCcw size={13} />
          Reset experiment
        </Button>
      </div>
      <div className="min-w-0">
        <div className="mb-5 rounded-md bg-accent p-5">
          <p className="eyebrow">THE QUESTION</p>
          <h2 className="mt-1 text-lg font-semibold">
            Can an opened desk lamp be returned within 30 days?
          </h2>
          <p className="mt-2 text-xs text-muted">
            A complete evidence set needs both the general return policy and the
            opened-item exception.
          </p>
        </div>
        <div role="status" aria-live="polite" className="mb-5 text-sm">
          <p className="font-semibold">
            {selected.length} passages included · {used} / {budget} words
          </p>
          <p className="text-xs text-muted">
            {covered === 2
              ? "Both required policy passages are included."
              : `Policy context incomplete: ${covered} of 2 required passages included.`}
          </p>
        </div>
        <ol className="space-y-3">
          {passages.map((passage, index) => (
            <li
              key={passage.id}
              className={cn(
                "panel p-5",
                passage.included && "border-primary/50",
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold">
                  <span className="mr-2 text-xs text-muted">0{index + 1}</span>
                  {passage.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] text-muted">
                  {passage.included && (
                    <Check size={13} className="text-primary" />
                  )}
                  {passage.included ? "Included" : "Outside budget"} ·{" "}
                  {passage.words} words
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{passage.text}</p>
              <p className="mt-3 text-[11px] text-muted">
                Keyword rank {passage.keywordRank} · Semantic rank{" "}
                {passage.semanticRank}
                {strategy === "hybrid"
                  ? ` · RRF ${passage.score.toFixed(5)}`
                  : ""}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
