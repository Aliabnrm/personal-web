import type { Metadata } from "next";
import { searchItems } from "@/content/notebook";
import { getRepositories } from "@/lib/github";
import { PageIntro } from "@/components/notebook/content";
import { NotebookSearch } from "@/components/notebook/search";
export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: true },
};
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const { repositories } = await getRepositories();
  const index = [
    ...searchItems,
    ...repositories.map((r) => ({
      title: r.name,
      description: r.description || `Public project by Ali Abnar.`,
      type: "Project",
      href: r.html_url,
      keywords: r.language || "",
    })),
  ];
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="SEARCH"
        title="Find a connection."
        description="One place to search the notebook, from a passing thought to a practical project."
      />
      <NotebookSearch index={index} initialQuery={q?.slice(0, 200) || ""} />
    </div>
  );
}
