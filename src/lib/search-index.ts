import "server-only";
import { notes } from "@/content/notes";
import { resources } from "@/content/resources";
import { paths } from "@/content/learning-paths";
import { projects } from "@/content/projects";
import type { Repository } from "@/lib/repository";

import type { SearchItem } from "./search";

export function getSearchIndex(repositories: Repository[] = []): SearchItem[] {
  return [
    ...projects.map((p) => ({
      title: p.title,
      description: p.summary,
      type: "Case study",
      href: `/projects/${p.slug}`,
      keywords: `${p.repository} ${p.focus} ${p.stack.join(" ")} ${p.problem}`,
    })),
    ...notes.map((n) => ({
      title: n.title,
      description: n.description,
      type: "Note",
      href: `/notes/${n.slug}`,
      keywords: `${n.topic} ${n.kind}`,
    })),
    ...resources.map((r) => ({
      title: r.title,
      description: r.description,
      type: "Resource",
      href: `/library/${r.slug}`,
      keywords: `${r.topic} ${r.kind} ${r.author}`,
    })),
    ...paths.map((p) => ({
      title: p.title,
      description: p.description,
      type: "Learning path",
      href: `/roadmaps/${p.slug}`,
      keywords: p.level,
    })),
    ...repositories
      .filter((r) => !projects.some((p) => p.repository === r.name))
      .map((r) => ({
        title: r.name,
        description: r.description || "Public repository by Ali Abnar.",
        type: "Repository",
        href: r.html_url,
        keywords: [r.language, ...r.topics].filter(Boolean).join(" "),
      })),
  ];
}
