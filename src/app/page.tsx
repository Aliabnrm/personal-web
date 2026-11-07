import Link from "next/link";
import { paths, resources, notes, issues } from "@/content/notebook";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  NoteRow,
  PathCard,
  ResourceRow,
  SectionHeading,
} from "@/components/notebook/content";

export default function HomePage() {
  const issue = issues[0];
  return (
    <div className="page-stack">
      <section className="flex flex-col items-start gap-5 pb-4 pt-6">
        <p className="eyebrow">A PERSONAL NOTEBOOK</p>
        <h1 className="text-[36px] font-semibold leading-[1.5] sm:text-[44px] lg:text-[52px]">
          Learn, connect, return.
        </h1>
        <p className="text-base leading-[1.95] text-muted sm:text-lg">
          A place to think clearly, build with curiosity, and connect what I
          learn in AI and engineering.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/roadmaps">Explore learning paths</ButtonLink>
          <ButtonLink href="/this-week" variant="outline">
            Read this week&apos;s notes
          </ButtonLink>
        </div>
      </section>
      <section
        aria-labelledby="continue-title"
        className="flex flex-col items-start gap-4 rounded-md bg-accent p-6 sm:flex-row sm:items-center"
      >
        <div className="flex-1">
          <p className="eyebrow">CONTINUE LEARNING</p>
          <h2
            id="continue-title"
            className="mt-1 text-lg font-semibold leading-[1.95]"
          >
            Build a RAG system that works
          </h2>
          <p className="mt-1 text-xs text-muted">
            LLM engineering · Retrieval and context
          </p>
        </div>
        <ButtonLink variant="outline" href="/roadmaps/llm-engineering">
          Continue →
        </ButtonLink>
      </section>
      <section className="flex flex-col gap-5">
        <SectionHeading
          title="This week"
          href="/this-week"
          label="All issues"
        />
        <article className="panel flex flex-col items-start gap-[18px] p-6 sm:p-9">
          <div className="flex w-full items-start justify-between gap-4">
            <Badge outlined>Issue {issue.number}</Badge>
            <span className="text-xs text-muted">7 min read</span>
          </div>
          <h2 className="text-[27px] font-semibold leading-[1.5] sm:text-[34px]">
            <Link
              href={`/this-week/${issue.slug}`}
              className="hover:text-primary"
            >
              {issue.title}
            </Link>
          </h2>
          <p className="text-xs text-muted">
            {issue.date} · AI, retrieval, and learning in public
          </p>
          <p className="text-[17px] leading-[1.95]">
            A few ideas worth keeping, a handful of useful resources, and a
            small experiment to connect them. This is a working notebook, not
            the final word.
          </p>
          <Link
            href={`/this-week/${issue.slug}`}
            className="text-link text-sm font-semibold"
          >
            Read this week&apos;s issue →
          </Link>
        </article>
      </section>
      <section className="flex flex-col gap-5">
        <SectionHeading
          title="Learning paths"
          href="/roadmaps"
          label="All paths"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {paths.map((path) => (
            <PathCard key={path.slug} path={path} />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <SectionHeading
          title="From the library"
          href="/library"
          label="Browse the library"
        />
        {resources.map((resource) => (
          <ResourceRow key={resource.slug} resource={resource} />
        ))}
      </section>
      <section className="flex flex-col gap-3">
        <SectionHeading
          title="Latest notes"
          href="/notes"
          label="Explore all notes"
        />
        <p className="text-sm text-muted">Small ideas, connected over time.</p>
        {notes.map((note) => (
          <NoteRow key={note.slug} note={note} />
        ))}
      </section>
    </div>
  );
}
