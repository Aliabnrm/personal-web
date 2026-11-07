import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/notebook/content";
export const metadata: Metadata = { title: "Now" };
export default function NowPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="NOW"
        title="A snapshot of the notebook."
        description="What this space is exploring: useful AI, better interfaces, and the practice of learning by building."
      />
      <div className="max-w-[740px] article-body">
        <section>
          <h2>Building in the open</h2>
          <p>
            The{" "}
            <Link href="/projects" className="text-link">
              projects collection
            </Link>{" "}
            reflects the latest public work on GitHub, from frontend
            applications to backend systems.
          </p>
        </section>
        <section>
          <h2>Following the questions</h2>
          <p>
            The current learning paths focus on AI fundamentals, LLM
            engineering, and building agents. Each path connects practical
            resources to a small, repeatable next step.
          </p>
        </section>
        <section>
          <h2>Keeping a useful trail</h2>
          <p>
            Weekly issues and the notes garden collect ideas that are worth
            another visit. Start with{" "}
            <Link href="/this-week" className="text-link">
              the latest issue
            </Link>{" "}
            or explore{" "}
            <Link href="/notes" className="text-link">
              the notes
            </Link>{" "}
            by topic.
          </p>
        </section>
      </div>
    </div>
  );
}
