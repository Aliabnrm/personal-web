import type { Metadata } from "next";
import { paths } from "@/content/notebook";
import { PageIntro, PathCard } from "@/components/notebook/content";
import { ButtonLink } from "@/components/ui/button";
export const metadata: Metadata = { title: "Learning paths" };
export default function RoadmapsPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="LEARNING PATHS"
        title="One path instead of a hundred open tabs"
        description="A guided way to move from curiosity to understanding. Choose a path, make something, and return with better questions."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {paths.map((path) => (
          <PathCard key={path.slug} path={path} />
        ))}
      </div>
      <section className="rounded-md bg-accent p-6 sm:p-8">
        <h2 className="text-xl font-semibold">Where should I start?</h2>
        <p className="mb-5 mt-3 max-w-3xl text-sm text-muted">
          If you are new to AI, start with the fundamentals. If you have already
          used a model API, LLM engineering is a practical next step. Building
          agents works best after a few small projects.
        </p>
        <ButtonLink variant="outline" href="/roadmaps/ai-fundamentals">
          Start with the fundamentals
        </ButtonLink>
      </section>
    </div>
  );
}
