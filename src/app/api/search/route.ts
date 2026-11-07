import { getSearchIndex } from "@/lib/search-index";
import { searchIndex } from "@/lib/search";
import { getRepositories } from "@/lib/github";
export async function GET(request: Request) {
  const query = (new URL(request.url).searchParams.get("q") || "")
    .trim()
    .slice(0, 200);
  if (!query) return Response.json({ results: [], query });
  const { repositories } = await getRepositories();
  return Response.json(
    { results: searchIndex(getSearchIndex(repositories), query), query },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
      },
    },
  );
}
