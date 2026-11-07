import type { Metadata } from "next";
import { resources } from "@/content/notebook";
import { PageIntro } from "@/components/notebook/content";
import { Collection } from "@/components/notebook/collection";
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
