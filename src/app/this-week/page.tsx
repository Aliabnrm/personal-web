import type { Metadata } from "next";
import Link from "next/link";
import { issues } from "@/content/notebook";
import { PageIntro } from "@/components/notebook/content";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
export const metadata: Metadata = { title: "This week" };
export default function WeeklyPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="WEEKLY NOTES"
        title="This week, with a little distance"
        description="A few useful ideas, a reading trail, and small experiments — collected before moving on."
      >
        <ButtonLink variant="outline" href="/feed.xml">
          Subscribe via RSS
        </ButtonLink>
      </PageIntro>
      <section>
        <h2 className="mb-4 text-right text-xl font-semibold">2026</h2>
        {issues.map((issue) => (
          <article
            key={issue.slug}
            className="flex flex-col gap-3 border-b border-border py-6 sm:flex-row sm:gap-10"
          >
            <p className="w-36 shrink-0 text-xs text-muted sm:pt-2">
              {issue.date}
            </p>
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-semibold">
                <Link
                  className="hover:text-primary"
                  href={`/this-week/${issue.slug}`}
                >
                  {issue.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-muted">{issue.description}</p>
              <Link
                className="text-link mt-3 inline-block text-xs"
                href={`/this-week/${issue.slug}`}
              >
                Read this issue →
              </Link>
            </div>
            <div>
              <Badge outlined>Issue {issue.number}</Badge>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
