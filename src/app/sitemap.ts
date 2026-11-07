import type { MetadataRoute } from "next";
import { paths } from "@/content/learning-paths";
import { resources } from "@/content/resources";
import { notes } from "@/content/notes";
import { projects } from "@/content/projects";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/writing",
    "/roadmaps",
    "/library",
    "/notes",
    "/projects",
    "/about",
    "/now",
    "/lab/retrieval",
    ...paths.map((p) => `/roadmaps/${p.slug}`),
    ...resources.map((r) => `/library/${r.slug}`),
    ...notes.map((n) => `/notes/${n.slug}`),
    ...projects.map((p) => `/projects/${p.slug}`),
  ];
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: route === "/projects" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/projects") ? 0.9 : 0.7,
  }));
}
