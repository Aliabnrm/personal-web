import type { Metadata } from "next";
import { Github } from "lucide-react";
import { PageIntro } from "@/components/notebook/content";
import { ProjectList } from "@/components/notebook/project-list";
import { getRepositories } from "@/lib/github";
import { site } from "@/lib/site";
export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Projects",
  description: "Public projects and experiments by Ali Abnar, from GitHub.",
};
export default async function ProjectsPage() {
  const { repositories, source } = await getRepositories();
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="PROJECTS & EXPERIMENTS"
        title="Ideas become clearer when you build."
        description="A collection of public projects, experiments, and things learned along the way."
      >
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="text-link inline-flex min-h-11 items-center gap-2"
        >
          <Github size={17} />
          Follow the work on GitHub →
        </a>
      </PageIntro>
      <ProjectList repositories={repositories} />
      <p className="text-xs text-muted">
        {source === "github"
          ? "Public repositories from GitHub. Updated every hour."
          : "Showing the latest saved repository list while GitHub is unavailable."}
      </p>
    </div>
  );
}
