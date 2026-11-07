import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Download, Terminal } from "lucide-react";
import { projects } from "@/content/projects";
import { notes } from "@/content/notes";
import { expertise, experience } from "@/content/profile";
import { ButtonLink } from "@/components/ui/button";
import { NoteRow, SectionHeading } from "@/components/content/content";
import { ProjectCard } from "@/components/work/project-card";
import { Contact } from "@/components/profile/contact";
import { site } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <div className="page-stack home-stack">
      <section className="hero-grid">
        <div className="flex flex-col items-start gap-6">
          <p className="eyebrow tracking-[0.15em]">
            SOFTWARE · PRODUCT · APPLIED AI
          </p>
          <h1 className="hero-title">
            Hi, I’m Ali.
            <br />I build software
            <br />
            that earns its place.
          </h1>
          <p className="max-w-[570px] text-base leading-[1.9] text-muted sm:text-lg">
            A software engineer with a frontend background. I turn complex
            workflows into clear interfaces and build AI systems whose answers
            can be inspected.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/projects">
              Explore my work <ArrowUpRight size={16} />
            </ButtonLink>
            <ButtonLink href="/about#contact" variant="outline">
              Let’s connect
            </ButtonLink>
          </div>
          <a
            href={site.resume}
            download
            className="text-link inline-flex min-h-11 items-center gap-2 text-xs"
          >
            <Download size={15} />
            Download résumé <span className="text-muted">PDF · 2 pages</span>
          </a>
        </div>
        <aside className="focus-card" aria-label="Engineering focus">
          <div className="flex items-center justify-between gap-3 border-b border-border pb-5">
            <span className="inline-flex items-center gap-2 text-xs font-medium">
              <Terminal size={16} className="text-primary" />
              Currently building
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] text-muted">
              <span className="size-1.5 rounded-full bg-primary" />
              IN PUBLIC
            </span>
          </div>
          <div className="py-6">
            <p className="text-xs text-muted">01 / APPLIED AI</p>
            <Link
              href="/projects/document-qa"
              className="mt-2 block text-xl font-semibold hover:text-primary"
            >
              Answers with evidence.
            </Link>
            <p className="mt-2 text-sm text-muted">
              Bilingual retrieval, citations, and evaluations that expose the
              limits.
            </p>
          </div>
          <div className="border-t border-border py-6">
            <p className="text-xs text-muted">02 / PRODUCT ENGINEERING</p>
            <p className="mt-2 text-xl font-semibold">
              From interface to invariant.
            </p>
            <p className="mt-2 text-sm text-muted">
              Customer workflows, API boundaries, and the data behind them.
            </p>
          </div>
          <Link
            href="/now"
            className="text-link inline-flex min-h-11 items-center gap-2 text-xs"
          >
            What I’m focused on now <ArrowUpRight size={14} />
          </Link>
        </aside>
      </section>
      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-border py-5 text-xs text-muted">
        <p>
          Frontend experience at{" "}
          <span className="font-medium text-foreground">Emzano</span> &{" "}
          <span className="font-medium text-foreground">Looge</span> · Based in
          Tehran
        </p>
        <Link
          className="text-link inline-flex min-h-8 items-center gap-2"
          href="/about#experience"
        >
          Experience & background <ArrowDown size={13} />
        </Link>
      </div>
      <section
        aria-labelledby="selected-work-title"
        className="flex flex-col gap-6"
      >
        <SectionHeading
          title="Selected work"
          href="/projects"
          label="All projects"
          id="selected-work-title"
        />
        <p className="-mt-3 max-w-2xl text-sm text-muted">
          Three different problems. The decisions, implementation, and evidence
          behind each one.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              featured={i === 0}
            />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-5">
        <SectionHeading title="How I approach the work" />
        <div className="grid gap-6 md:grid-cols-3">
          {expertise.map((item, i) => (
            <div className="border-t border-border pt-5" key={item.title}>
              <p className="mb-3 text-xs text-primary">0{i + 1}</p>
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        <div>
          <SectionHeading
            title="From the engineering notebook"
            href="/writing"
            label="All writing"
          />
          {notes.slice(0, 2).map((note) => (
            <NoteRow key={note.slug} note={note} />
          ))}
        </div>
        <aside className="panel self-start p-6 sm:p-8">
          <p className="eyebrow">A SMALL INTERACTIVE EXPLANATION</p>
          <h2 className="mt-3 text-xl font-semibold">
            What makes it into the context?
          </h2>
          <p className="mt-3 text-sm text-muted">
            Change a retrieval strategy and evidence budget. See which sources
            survive, and what gets left out.
          </p>
          <Link
            className="text-link mt-4 inline-flex min-h-11 items-center gap-2 text-sm"
            href="/lab/retrieval"
          >
            Try the retrieval playground <ArrowUpRight size={15} />
          </Link>
        </aside>
      </section>
      <section className="flex flex-col gap-5">
        <SectionHeading
          title="Experience, in brief"
          href="/about#experience"
          label="More about me"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {experience.map((job) => (
            <article className="panel p-6" key={job.company}>
              <p className="text-xs text-muted">{job.period}</p>
              <h3 className="mt-2 text-lg font-semibold">
                {job.company}{" "}
                <span className="font-normal text-muted">/ {job.role}</span>
              </h3>
              <p className="mt-3 text-sm text-muted">{job.summary}</p>
            </article>
          ))}
        </div>
      </section>
      <Contact compact />
    </div>
  );
}
