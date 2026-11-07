import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Library, Rss } from "lucide-react";
import { notes } from "@/content/notes";
import { resources } from "@/content/resources";
import {
  PageIntro,
  NoteRow,
  ResourceRow,
  SectionHeading,
} from "@/components/content/content";
export const metadata: Metadata = {
  title: "Writing & engineering notes",
  description:
    "Source-linked notes on product decisions, AI evaluation, and system design, alongside curated learning resources.",
  alternates: { canonical: "/writing" },
};
export default function WritingPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="THE ENGINEERING NOTEBOOK"
        title="Build something. Leave a useful trail."
        description="Notes on the decisions behind the work: what the system does, why it is shaped that way, and what the evidence can actually tell us."
      >
        <a
          href="/feed.xml"
          className="text-link inline-flex min-h-11 items-center gap-2 text-sm"
        >
          <Rss size={16} />
          Follow via RSS
        </a>
      </PageIntro>
      <section className="rounded-lg border border-border bg-accent p-6 sm:p-8">
        <p className="eyebrow">START HERE</p>
        <h2 className="mt-2 text-xl font-semibold">
          Three questions behind three projects.
        </h2>
        <ol className="mt-5 grid gap-5 md:grid-cols-3">
          {notes.map((note, i) => (
            <li key={note.slug}>
              <span className="text-xs text-primary">
                0{i + 1} / {note.topic}
              </span>
              <Link
                className="mt-2 block text-base font-semibold hover:text-primary"
                href={`/notes/${note.slug}`}
              >
                {note.title} <span aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
      <section>
        <SectionHeading
          title="Project-backed notes"
          href="/notes"
          label="Browse & save notes"
        />
        {notes.map((note) => (
          <NoteRow key={note.slug} note={note} />
        ))}
      </section>
      <section className="grid gap-5 md:grid-cols-2">
        {[
          {
            icon: BookOpen,
            title: "Learning paths",
            href: "/roadmaps",
            description:
              "Curated routes through AI fundamentals, LLM engineering, and bounded agents. Progress stays in your browser.",
          },
          {
            icon: Library,
            title: "Resource library",
            href: "/library",
            description:
              "A small annotated collection: why a resource is useful, where to start, and a practical exercise.",
          },
        ].map((item) => (
          <article className="panel p-6 sm:p-8" key={item.href}>
            <item.icon className="mb-4 text-primary" size={23} />
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm text-muted">{item.description}</p>
            <Link
              className="text-link mt-4 inline-flex min-h-11 items-center gap-2 text-sm"
              href={item.href}
            >
              Explore {item.title.toLowerCase()}
              <ArrowUpRight size={14} />
            </Link>
          </article>
        ))}
      </section>
      <section>
        <SectionHeading
          title="A few useful references"
          href="/library"
          label="Full library"
        />
        {resources.slice(0, 2).map((resource) => (
          <ResourceRow resource={resource} key={resource.slug} />
        ))}
      </section>
      <section className="border-t border-border pt-6">
        <h2 className="text-lg font-semibold">About these notes</h2>
        <p className="mt-3 max-w-3xl text-sm text-muted">
          Project notes link to the source revision they describe. Reported
          measurements include their conditions and limits. Learning paths are
          suggested study routes, not claims of completed courses. New writing
          appears when there is something useful to share.
        </p>
      </section>
    </div>
  );
}
