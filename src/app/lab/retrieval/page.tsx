import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/content/content";
import { RetrievalPlayground } from "@/components/work/retrieval-playground";
export const metadata: Metadata = {
  title: "Retrieval playground",
  description:
    "An interactive explanation of rank fusion and context budgets using transparent teaching fixtures.",
  alternates: { canonical: "/lab/retrieval" },
};
export default function RetrievalLabPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="INTERACTIVE EXPLANATION"
        title="What makes it into the context?"
        description="Change the ranking strategy and context budget. Inspect which passages reach the answer stage, and whether the important exception survives."
      />
      <RetrievalPlayground />
      <section className="article-body max-w-3xl">
        <h2>What this experiment shows</h2>
        <p>
          The passages and input ranks are authored teaching fixtures. Hybrid
          mode computes reciprocal rank fusion with k = 60, then packs whole
          passages in score order while skipping passages that exceed the
          remaining budget. No model runs and no document leaves your browser.
        </p>
        <p>
          Observe what happens at a 40-word budget: a relevant-looking passage
          can use the available space while leaving the policy incomplete.
          Adding context can help, but a larger budget also admits unrelated
          material.
        </p>
        <p>
          This is an explanation of evidence selection, not a benchmark or a
          demonstration of generated-answer quality.
        </p>
        <div className="mt-6 flex flex-wrap gap-5 text-sm">
          <Link className="text-link" href="/projects/document-qa">
            See the Document Q&A case study →
          </Link>
          <Link className="text-link" href="/notes/retrieval-before-generation">
            Read the evaluation note →
          </Link>
        </div>
      </section>
    </div>
  );
}
