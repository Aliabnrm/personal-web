import type { Metadata } from "next";
import Link from "next/link";
import { Github, ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/notebook/content";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";
export const metadata: Metadata = { title: "About Ali Abnar" };
export default function AboutPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="ABOUT THIS NOTEBOOK"
        title="Hi, I’m Ali."
        description="A frontend engineer, learning in public and building with curiosity."
      />
      <div className="reading-layout">
        <div className="article-body">
          <section>
            <h2>A place to connect the dots.</h2>
            <p>
              AI Notebook brings together notes on AI, learning paths, useful
              resources, and the projects that turn those ideas into something
              concrete.
            </p>
            <p>
              The goal is simple: make it easier to return to an idea with more
              context than the last time. A note can start as a question, become
              an experiment, and eventually connect to a project.
            </p>
          </section>
          <section>
            <h2>How to explore</h2>
            <ul>
              <li>
                <Link className="text-link" href="/this-week">
                  This week
                </Link>{" "}
                collects a handful of ideas in one place.
              </li>
              <li>
                <Link className="text-link" href="/roadmaps">
                  Learning paths
                </Link>{" "}
                give a topic some structure.
              </li>
              <li>
                <Link className="text-link" href="/library">
                  The library
                </Link>{" "}
                keeps resources close to the questions they help answer.
              </li>
              <li>
                <Link className="text-link" href="/notes">
                  Notes
                </Link>{" "}
                show ideas at different stages of development.
              </li>
            </ul>
          </section>
          <section>
            <h2>Let the work speak.</h2>
            <p>
              You can find the source code, documentation, and ongoing
              experiments on GitHub.
            </p>
            <div className="mt-5">
              <ButtonLink href="/projects">
                Explore my projects
                <ArrowUpRight size={16} />
              </ButtonLink>
            </div>
          </section>
        </div>
        <aside className="panel self-start p-6">
          <p className="eyebrow">ELSEWHERE</p>
          <h2 className="mt-2 text-lg font-semibold">Keep in touch</h2>
          <a
            className="text-link mt-4 inline-flex items-center gap-2"
            href={site.github}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={17} />
            Aliabnrm on GitHub
            <ArrowUpRight size={14} />
          </a>
          <p className="mt-5 text-sm text-muted">
            Follow new notes in your own reader.
          </p>
          <a href="/feed.xml" className="text-link mt-2 inline-block">
            Subscribe via RSS →
          </a>
        </aside>
      </div>
    </div>
  );
}
