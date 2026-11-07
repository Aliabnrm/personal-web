import type { Metadata } from "next";
import { getSearchIndex } from "@/lib/search-index";
import { getRepositories } from "@/lib/github";
import { PageIntro } from "@/components/content/content";
import { SiteSearch } from "@/components/content/search";
export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: true },
};
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const { repositories } = await getRepositories();
  const index = getSearchIndex(repositories);
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="SEARCH"
        title="Find a connection."
        description="Search selected work, technical notes, useful resources, and public code."
      />
      <SiteSearch
        index={index}
        initialQuery={(Array.isArray(q) ? q[0] : q)?.slice(0, 200) || ""}
      />
    </div>
  );
}
