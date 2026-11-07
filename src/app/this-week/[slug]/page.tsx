import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { issues } from "@/content/notebook";
import { getIssueSections } from "@/content/weekly-details";
import {
  ArticleBody,
  PageIntro,
  TableOfContents,
} from "@/components/notebook/content";
import { ReadingTools } from "@/components/notebook/reading-tools";
export function generateStaticParams() {
  return issues.map((i) => ({ slug: i.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const issue = issues.find((i) => i.slug === slug);
  return { title: issue?.title, description: issue?.description };
}
export default async function IssuePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const issue = issues.find((i) => i.slug === slug);
  if (!issue) notFound();
  const sections = getIssueSections(slug);
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow={`ISSUE ${issue.number} · ${issue.date.toUpperCase()}`}
        title={issue.title}
        description={issue.description}
      >
        <Link className="text-link text-xs" href="/this-week">
          ← Back to all issues
        </Link>
      </PageIntro>
      <div className="reading-layout">
        <div>
          <div className="mb-10 rounded-md bg-accent p-6">
            <h2 className="mb-3 text-lg font-semibold">At a glance</h2>
            <ul className="space-y-2 text-sm">
              {issue.items.map((item, i) => (
                <li key={item}>
                  <a href={`#idea-${i + 1}`} className="text-link">
                    {String(i + 1).padStart(2, "0")} · {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <ArticleBody sections={sections} />
          <section className="mb-8 border-t border-border pt-6">
            <h2 className="mb-3 text-xl font-semibold">
              That is enough for this week.
            </h2>
            <p className="text-muted">
              Pick one question, make one small experiment, and leave a note for
              your future self.
            </p>
            <Link
              href="/roadmaps/llm-engineering"
              className="text-link mt-4 inline-block"
            >
              Continue with LLM engineering →
            </Link>
          </section>
          <ReadingTools id={`this-week/${slug}`} />
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}
