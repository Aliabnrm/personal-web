import type { Metadata } from "next";
import { notes } from "@/content/notes";
import { PageIntro } from "@/components/content/content";
import { Collection } from "@/components/content/collection";
export const metadata: Metadata = {
  title: "Engineering notes",
  alternates: { canonical: "/notes" },
};
export default function NotesPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="ENGINEERING NOTES"
        title="Small notes. Concrete decisions."
        description="Source-linked explanations of AI evaluation, product scope, and system design. Filter the collection or save a note for later."
      />
      <Collection kind="notes" notes={notes} />
    </div>
  );
}
