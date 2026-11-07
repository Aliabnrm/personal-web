import { getRepositories } from "@/lib/github";
export async function GET() {
  const data = await getRepositories();
  return Response.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
