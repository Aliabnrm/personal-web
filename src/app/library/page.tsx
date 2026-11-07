import type { Metadata } from "next";
import { resources } from "@/content/resources";
import { PageIntro } from "@/components/content/content";
import { Collection } from "@/components/content/collection";
export const metadata: Metadata = { title: "Library" };
export default function LibraryPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="LIBRARY"
        title="Resources worth returning to"
        description="A small, considered collection of books, courses, and ideas. Each resource comes with context for why it belongs here."
      />
      <Collection kind="library" resources={resources} />
    </div>
  );
}
