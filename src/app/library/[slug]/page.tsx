import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { resources } from "@/content/notebook";
import {
  ArticleBody,
  PageIntro,
  TableOfContents,
} from "@/components/notebook/content";
import { ReadingTools } from "@/components/notebook/reading-tools";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = resources.find((r) => r.slug === slug);
  return { title: r?.title, description: r?.description };
}
export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = resources.find((r) => r.slug === slug);
  if (!resource) notFound();
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="RESOURCE NOTE"
        title={resource.title}
        description={resource.description}
      >
        <div className="flex flex-wrap gap-3">
          <Badge>{resource.kind}</Badge>
          <Badge>{resource.topic}</Badge>
        </div>
        <p className="text-xs text-muted">{resource.author}</p>
        <a
          href={resource.url}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Open resource
          <ExternalLink size={15} />
        </a>
      </PageIntro>
      <div className="reading-layout">
        <div>
          <ArticleBody sections={resource.sections} />
          <ReadingTools id={`library/${slug}`} />
          <Link className="text-link mt-8 inline-block text-sm" href="/library">
            ← Back to the library
          </Link>
        </div>
        <TableOfContents sections={resource.sections} />
      </div>
    </div>
  );
}
