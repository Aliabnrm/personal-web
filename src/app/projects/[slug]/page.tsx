import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Github } from "lucide-react";
import { projects, sourceUrl } from "@/content/projects";
import { notes } from "@/content/notes";
import { PageIntro, NoteRow } from "@/components/content/content";
import { Badge } from "@/components/ui/badge";
import {
  ProjectDiagram,
  ProjectEvidence,
  NextProject,
} from "@/components/work/project-card";
import { ReadingTools } from "@/components/content/reading-tools";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return {
    title: p?.title,
    description: p?.summary,
    openGraph: {
      title: p?.title,
      description: p?.summary,
      url: `/projects/${slug}`,
    },
    alternates: { canonical: `/projects/${slug}` },
  };
}
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const related = notes.find((n) => n.slug === project.note);
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <div className="page-stack">
      <Link href="/projects" className="text-link text-xs">
        ← All selected work
      </Link>
      <PageIntro
        eyebrow={project.category}
        title={project.title}
        description={project.summary}
      >
        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
        <p className="text-xs text-muted">{project.status}</p>
        <a
          className="text-link inline-flex min-h-11 items-center gap-2 text-sm"
          href={`https://github.com/Aliabnrm/${project.repository}`}
          target="_blank"
          rel="noreferrer"
        >
          <Github size={17} />
          Explore the repository <ArrowUpRight size={14} />
        </a>
        {project.demo && (
          <a
            className="text-link inline-flex min-h-11 items-center gap-2 text-sm"
            href={project.demo}
            target="_blank"
            rel="noreferrer"
          >
            Open frontend preview <ArrowUpRight size={14} />
          </a>
        )}
      </PageIntro>
      <ProjectEvidence project={project} />
      <div className="reading-layout">
        <article className="article-body min-w-0">
          <section id="problem">
            <h2>The problem & the people</h2>
            <p>{project.problem}</p>
            <p>
              <strong>Who it is for:</strong> {project.audience}
            </p>
          </section>
          <section id="contribution">
            <h2>My contribution</h2>
            <p>{project.contribution}</p>
          </section>
          <section id="system">
            <h2>How the pieces connect</h2>
            <ProjectDiagram project={project} />
          </section>
          <section id="decisions">
            <h2>Engineering decisions & tradeoffs</h2>
            <div className="space-y-7">
              {project.decisions.map((decision, i) => (
                <div
                  key={decision.title}
                  className="border-l-2 border-primary/40 pl-5"
                >
                  <h3 className="mb-3 text-lg font-semibold">
                    0{i + 1} / {decision.title}
                  </h3>
                  <p>{decision.reasoning}</p>
                  <p className="text-muted">
                    <strong className="text-foreground">Tradeoff:</strong>{" "}
                    {decision.tradeoff}
                  </p>
                </div>
              ))}
            </div>
          </section>
          <section id="outcome">
            <h2>Outcome & limits</h2>
            <p>{project.outcome}</p>
            <ul>
              {project.limitations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="next">
            <h2>The next useful step</h2>
            <p>{project.next}</p>
          </section>
          <section id="sources">
            <h2>Inspect the evidence</h2>
            <p className="text-sm text-muted">
              Source snapshot reviewed November 7, 2026. Links are pinned to
              revision{" "}
              <code className="text-xs">{project.revision.slice(0, 7)}</code>,
              so this explanation stays tied to the code it describes.
            </p>
            <ul>
              {project.sources.map((source) => (
                <li key={source.path}>
                  <a
                    className="text-link"
                    href={sourceUrl(project, source.path)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {source.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>
          <ReadingTools id={`projects/${project.slug}`} />
        </article>
        <aside className="panel self-start p-5 text-[13px] md:sticky md:top-8">
          <h2 className="mb-3 font-semibold">In this case study</h2>
          <nav aria-label="Case study contents" className="flex flex-col gap-3">
            {[
              ["problem", "Problem & users"],
              ["contribution", "My contribution"],
              ["system", "System outline"],
              ["decisions", "Decisions & tradeoffs"],
              ["outcome", "Outcome & limits"],
              ["next", "Next step"],
              ["sources", "Source evidence"],
            ].map(([id, label]) => (
              <a className="text-link" key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
        </aside>
      </div>
      {related && (
        <section>
          <h2 className="section-title">A connected engineering note</h2>
          <NoteRow note={related} />
        </section>
      )}
      <NextProject project={next} />
    </div>
  );
}
