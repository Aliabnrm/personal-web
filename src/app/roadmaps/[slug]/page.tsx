import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { paths } from "@/content/learning-paths";
import { PageIntro } from "@/components/content/content";
import { PathProgress } from "@/components/content/path-progress";
import { Badge } from "@/components/ui/badge";
export function generateStaticParams() {
  return paths.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = paths.find((p) => p.slug === slug);
  return { title: path?.title, description: path?.description };
}
export default async function PathPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const path = paths.find((p) => p.slug === slug);
  if (!path) notFound();
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="LEARNING PATH"
        title={path.title}
        description={path.description}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Badge>{path.level}</Badge>
          <p className="text-xs text-muted">{path.duration}</p>
        </div>
        <Link href="/roadmaps" className="text-link text-xs">
          ← All learning paths
        </Link>
      </PageIntro>
      <div className="reading-layout">
        <PathProgress path={path} />
        <aside className="panel self-start p-6 md:sticky md:top-8">
          <Badge>Learning note</Badge>
          <h2 className="mt-4 text-lg font-semibold">
            Understanding takes a few returns.
          </h2>
          <p className="mt-3 text-sm text-muted">
            You do not need to finish everything in one sitting. Make something
            small, keep a note, and revisit the ideas that feel uncertain.
          </p>
          <Link href="/notes" className="text-link mt-5 inline-block text-xs">
            Explore connected notes →
          </Link>
          <Link href="/library" className="text-link mt-3 block text-xs">
            Find a supporting resource →
          </Link>
        </aside>
      </div>
    </div>
  );
}
