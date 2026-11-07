import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/content/content";
import { Contact } from "@/components/profile/contact";
import { projects } from "@/content/projects";
import { site } from "@/lib/site";
export const metadata: Metadata = {
  title: "Now",
  description:
    "Ali Abnar's current focus: product engineering, trustworthy document AI, and useful technical writing.",
  alternates: { canonical: "/now" },
};
export default function NowPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="NOW"
        title="Building a clearer connection between product and AI."
        description="A snapshot of my direction, the work that represents it, and the questions I want to explore next."
      >
        <p className="text-xs text-muted">
          Last updated <time dateTime={site.updated}>November 7, 2026</time>
        </p>
      </PageIntro>
      <div className="max-w-[760px] article-body">
        <section>
          <h2>The direction</h2>
          <p>
            My focus for the next stage is Software / Product Engineering with
            applied AI: connecting strong frontend foundations to useful
            end-to-end systems.
          </p>
          <p>
            I’m especially interested in interfaces that make system behavior
            understandable, from order and booking workflows to document answers
            with inspectable evidence.
          </p>
        </section>
        <section>
          <h2>The work behind that direction</h2>
          <ul>
            {projects.map((p) => (
              <li key={p.slug}>
                <Link className="text-link" href={`/projects/${p.slug}`}>
                  {p.title}
                </Link>{" "}
                — {p.focus.toLowerCase()}.
              </li>
            ))}
          </ul>
          <p>
            The case studies include their current limits and next validation
            steps. This page is a dated snapshot, rather than an automatic claim
            that every repository is actively being developed.
          </p>
        </section>
        <section>
          <h2>Questions worth discussing</h2>
          <ul>
            <li>
              How should an AI interface communicate missing evidence and
              uncertainty?
            </li>
            <li>Which product boundaries make a small system useful?</li>
            <li>
              How can a frontend make retries, streaming, and partial failure
              understandable?
            </li>
            <li>
              What evidence is enough to justify a more complex architecture?
            </li>
          </ul>
        </section>
        <section>
          <h2>A sustainable writing practice</h2>
          <p>
            Short notes tied to actual code, decisions, and experiments. The aim
            is a useful trail that helps me revisit a problem and gives others
            enough context to question or reuse the approach.
          </p>
          <Link href="/writing" className="text-link">
            Explore the engineering notebook →
          </Link>
        </section>
      </div>
      <Contact compact />
    </div>
  );
}
