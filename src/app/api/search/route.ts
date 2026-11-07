import { searchItems } from "@/content/notebook";
import { getRepositories } from "@/lib/github";
export async function GET(request: Request) {
  const query = (new URL(request.url).searchParams.get("q") || "")
    .trim()
    .slice(0, 200)
    .toLowerCase();
  if (!query) return Response.json({ results: [], query });
  const { repositories } = await getRepositories();
  const index = [
    ...searchItems,
    ...repositories.map((r) => ({
      title: r.name,
      description: r.description || "Public project by Ali Abnar.",
      type: "Project",
      href: r.html_url,
      keywords: r.language || "",
    })),
  ];
  const results = index
    .filter((i) =>
      query
        .split(/\s+/)
        .every((word) =>
          `${i.title} ${i.description} ${i.keywords}`
            .toLowerCase()
            .includes(word),
        ),
    )
    .slice(0, 50);
  return Response.json(
    { results, query },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
      },
    },
  );
}
