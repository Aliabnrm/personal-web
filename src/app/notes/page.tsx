import type { Metadata } from "next";
import { notes } from "@/content/notebook";
import { PageIntro } from "@/components/notebook/content";
import { Collection } from "@/components/notebook/collection";
export const metadata: Metadata = { title: "Notes" };
export default function NotesPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="NOTES GARDEN"
        title="Notes, still growing"
        description="Thoughts in different stages of becoming useful. Some are settled; others are invitations to think a little further."
      />
      <Collection kind="notes" notes={notes} />
    </div>
  );
}
