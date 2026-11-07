import type { MetadataRoute } from "next";
import { paths, resources, notes, issues } from "@/content/notebook";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/this-week",
    "/roadmaps",
    "/library",
    "/notes",
    "/projects",
    "/about",
    "/now",
    ...paths.map((p) => `/roadmaps/${p.slug}`),
    ...resources.map((r) => `/library/${r.slug}`),
    ...notes.map((n) => `/notes/${n.slug}`),
    ...issues.map((i) => `/this-week/${i.slug}`),
  ];
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: route === "/projects" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
