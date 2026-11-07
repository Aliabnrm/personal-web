import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";
import { notes } from "@/content/notes";
import {
  ArticleBody,
  PageIntro,
  TableOfContents,
} from "@/components/content/content";
import { ReadingTools } from "@/components/content/reading-tools";
import { Badge } from "@/components/ui/badge";
export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const n = notes.find((n) => n.slug === slug);
  return {
    title: n?.title,
    description: n?.description,
    alternates: { canonical: `/notes/${slug}` },
  };
}
export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  if (!note) notFound();
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow={`${note.kind.toUpperCase()} · ${note.topic.toUpperCase()}`}
        title={note.title}
        description={note.description}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Badge outlined={note.status === "Complete"}>{note.status}</Badge>
          <p className="text-xs text-muted">
            Updated{" "}
            <time dateTime={note.updated}>
              {new Intl.DateTimeFormat("en", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              }).format(new Date(note.updated))}
            </time>
          </p>
        </div>
      </PageIntro>
      <div className="reading-layout">
        <div>
          <ArticleBody sections={note.sections} />
          <section
            className="mb-8 border-t border-border pt-6"
            aria-labelledby="sources-title"
          >
            <h2 id="sources-title" className="text-lg font-semibold">
              Sources & related work
            </h2>
            <ul className="mt-3 space-y-3 text-sm">
              {note.sources.map((source) => (
                <li key={source.url}>
                  <a
                    className="text-link"
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {source.label} ↗
                  </a>
                </li>
              ))}
            </ul>
            <Link
              className="text-link mt-4 inline-flex min-h-11 items-center text-sm"
              href={`/projects/${note.projectSlug}`}
            >
              Read the{" "}
              {projects.find((p) => p.slug === note.projectSlug)?.title} case
              study →
            </Link>
          </section>
          <ReadingTools id={`notes/${slug}`} />
          <div className="mt-10 border-t border-border pt-6">
            <Link className="text-link" href="/notes">
              ← All engineering notes
            </Link>
          </div>
        </div>
        <TableOfContents sections={note.sections} />
      </div>
    </div>
  );
}
