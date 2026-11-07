import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import type {
  ArticleSection,
  LearningPath,
  Note,
  Resource,
} from "@/content/types";

export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="page-title">{title}</h1>
      <p className="page-description">{description}</p>
      {children}
    </div>
  );
}
export function SectionHeading({
  title,
  href,
  label,
  id,
}: {
  title: string;
  href?: string;
  label?: string;
  id?: string;
}) {
  return (
    <div className="flex min-h-[45px] items-center justify-between gap-4">
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {href && (
        <Link href={href} className="text-link shrink-0 text-[13px]">
          {label} →
        </Link>
      )}
    </div>
  );
}
export function PathCard({ path }: { path: LearningPath }) {
  return (
    <article className="panel flex min-h-[300px] flex-col gap-[14px] p-6 transition-colors hover:border-primary">
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs text-muted">{path.number}</span>
        <Badge>{path.level}</Badge>
      </div>
      <h3 className="text-[22px] font-semibold leading-[1.95]">
        <Link className="hover:text-primary" href={`/roadmaps/${path.slug}`}>
          {path.title}
        </Link>
      </h3>
      <p className="text-sm text-muted">{path.description}</p>
      <p className="text-xs text-muted">{path.duration}</p>
      <Link
        className="text-link mt-auto text-xs"
        href={`/roadmaps/${path.slug}`}
      >
        Explore this path →
      </Link>
    </article>
  );
}
export function ResourceRow({ resource }: { resource: Resource }) {
  return (
    <article className="border-b border-border py-[18px]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[17px] font-semibold leading-[1.95]">
          <Link
            className="hover:text-primary"
            href={`/library/${resource.slug}`}
          >
            {resource.title}
          </Link>
        </h3>
        <span className="shrink-0 text-xs text-muted">{resource.kind}</span>
      </div>
      <p className="mt-2 text-xs text-muted">
        {resource.author} · {resource.topic}
      </p>
    </article>
  );
}
export function NoteRow({ note }: { note: Note }) {
  return (
    <article className="border-b border-border py-[17px]">
      <div className="flex items-start justify-between gap-3 sm:items-center">
        <h3 className="text-[17px] font-semibold leading-[1.95]">
          <Link className="hover:text-primary" href={`/notes/${note.slug}`}>
            {note.title}
          </Link>
        </h3>
        <span className="shrink-0 text-[11px] text-muted">{note.kind}</span>
      </div>
      <p className="mt-1.5 text-xs text-muted">{note.description}</p>
    </article>
  );
}
export function ArticleBody({ sections }: { sections: ArticleSection[] }) {
  return (
    <div className="article-body">
      {sections.map((section) => (
        <section key={section.id} id={section.id}>
          <h2>{section.title}</h2>
          {section.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {section.bullets && (
            <ul>
              {section.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          {section.code && (
            <pre>
              <code>{section.code}</code>
            </pre>
          )}
        </section>
      ))}
    </div>
  );
}
export function TableOfContents({ sections }: { sections: ArticleSection[] }) {
  return (
    <aside className="self-start rounded-md border border-border p-5 text-[13px] md:sticky md:top-8">
      <h2 className="mb-3 font-semibold">On this page</h2>
      <nav aria-label="Table of contents" className="flex flex-col gap-3">
        {sections.map((s) => (
          <a key={s.id} className="text-link" href={`#${s.id}`}>
            {s.title}
          </a>
        ))}
      </nav>
    </aside>
  );
}
