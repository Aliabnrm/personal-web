import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { PageIntro } from "@/components/content/content";
import { ProjectCard } from "@/components/work/project-card";
import { RepositoryList } from "@/components/work/repository-list";
import { getRepositories } from "@/lib/github";
import { site } from "@/lib/site";
export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Three engineering case studies: bilingual document Q&A, a focused order-management product, and a transactional salon-booking platform.",
  alternates: { canonical: "/projects" },
};
export default async function ProjectsPage() {
  const { repositories, source } = await getRepositories();
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="SELECTED WORK"
        title="The work, and the reasoning behind it."
        description="Product problems, engineering decisions, and inspectable evidence. Each case study includes what works, what it costs, and what still needs validation."
      />
      <section
        aria-label="Selected case studies"
        className="grid gap-5 md:grid-cols-2"
      >
        <h2 className="sr-only">Selected case studies</h2>
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            featured={i === 0}
          />
        ))}
      </section>
      <section id="repositories" className="flex flex-col gap-5">
        <div>
          <h2 className="section-title">Public code & experiments</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            The wider collection, including smaller exercises and earlier work.
            The case studies above are the best starting point.
          </p>
        </div>
        <RepositoryList repositories={repositories} />
        <p className="text-xs text-muted">
          {source === "github"
            ? "Public GitHub metadata, cached for up to an hour."
            : "GitHub is unavailable. Showing the committed repository snapshot."}{" "}
          <a
            className="text-link"
            href={site.github}
            target="_blank"
            rel="noreferrer"
          >
            View GitHub →
          </a>
        </p>
      </section>
    </div>
  );
}
