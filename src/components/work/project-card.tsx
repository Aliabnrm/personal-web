import Link from "next/link";
import { ArrowRight, ArrowUpRight, GitBranch } from "lucide-react";
import type { CaseStudy } from "@/content/projects";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ProjectDiagram({ project }: { project: CaseStudy }) {
  return (
    <figure
      className="system-diagram"
      aria-label={`${project.title} system outline`}
    >
      <figcaption className="mb-8 flex items-center justify-between gap-3 text-[11px] font-medium text-muted">
        <span className="inline-flex items-center gap-2">
          <GitBranch size={14} /> SYSTEM OUTLINE
        </span>
        <span>
          0
          {project.slug === "document-qa"
            ? 1
            : project.slug === "fastfactor"
              ? 2
              : 3}
        </span>
      </figcaption>
      <ol className="flex flex-col gap-3">
        {project.flow.map((step, index) => (
          <li key={step.label} className="flex items-center gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-primary/30 text-[10px] text-primary">
              {index + 1}
            </span>
            <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-x-4 gap-y-0.5 rounded-md border border-border bg-panel px-4 py-3">
              <span className="text-sm font-semibold">{step.label}</span>
              <span className="text-xs text-muted">{step.detail}</span>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-[11px] text-muted">{project.focus}</p>
    </figure>
  );
}

export function ProjectCard({
  project,
  featured = false,
}: {
  project: CaseStudy;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "panel overflow-hidden transition-colors hover:border-primary/60",
        featured && "md:col-span-2 md:grid md:grid-cols-2",
      )}
    >
      <ProjectDiagram project={project} />
      <div className="flex flex-col items-start gap-4 p-6 sm:p-8">
        <p className="eyebrow text-[10px] tracking-[0.1em]">
          {project.category}
        </p>
        <h3 className="text-2xl font-semibold leading-tight tracking-tight sm:text-[28px]">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:text-primary"
          >
            {project.title}
          </Link>
        </h3>
        <p className="max-w-lg text-sm text-muted">{project.summary}</p>
        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
        <p className="text-xs text-muted">{project.status}</p>
        <Link
          href={`/projects/${project.slug}`}
          className="text-link mt-auto inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
        >
          Read the case study <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}

export function ProjectEvidence({ project }: { project: CaseStudy }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {project.evidence.map((item) => (
        <div className="panel flex flex-col p-5 sm:p-6" key={item.label}>
          <dt className="order-2 text-sm font-semibold">{item.label}</dt>
          <dd className="order-1 mb-2 text-3xl font-semibold tracking-tight text-primary">
            {item.value}
          </dd>
          <dd className="order-3 mt-2 text-xs text-muted">{item.context}</dd>
        </div>
      ))}
    </dl>
  );
}

export function NextProject({ project }: { project: CaseStudy }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="panel flex items-center justify-between gap-4 p-6 transition-colors hover:border-primary"
    >
      <span>
        <span className="eyebrow">ANOTHER PROJECT</span>
        <span className="mt-1 block text-xl font-semibold">
          {project.title}
        </span>
      </span>
      <ArrowRight className="text-primary" size={22} />
    </Link>
  );
}
