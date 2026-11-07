import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { notes } from "@/content/notebook";
import {
  ArticleBody,
  PageIntro,
  TableOfContents,
} from "@/components/notebook/content";
import { ReadingTools } from "@/components/notebook/reading-tools";
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
  return { title: n?.title, description: n?.description };
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
        eyebrow={`NOTE · ${note.topic.toUpperCase()}`}
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
          <ReadingTools id={`notes/${slug}`} />
          <div className="mt-10 border-t border-border pt-6">
            <Link className="text-link" href="/notes">
              ← Explore the notes garden
            </Link>
          </div>
        </div>
        <TableOfContents sections={note.sections} />
      </div>
    </div>
  );
}
