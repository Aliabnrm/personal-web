import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { PageIntro } from "@/components/content/content";
import { Contact } from "@/components/profile/contact";
import { expertise, experience } from "@/content/profile";
import { site } from "@/lib/site";
export const metadata: Metadata = {
  title: "About",
  description:
    "Ali Abnar's background in frontend engineering, product workflows, and applied AI, with experience at Emzano and Looge.",
  alternates: { canonical: "/about" },
};
export default function AboutPage() {
  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="ABOUT ALI"
        title="Thoughtful interfaces. Useful systems."
        description="I'm Ali Abnar, a software engineer based in Tehran. My background is in frontend engineering; my work increasingly connects product interfaces, backend systems, and applied AI."
      >
        <a
          className="text-link inline-flex min-h-11 items-center gap-2"
          href={site.resume}
          download
        >
          <Download size={16} />
          Download my résumé{" "}
          <span className="text-xs text-muted">PDF · 2 pages</span>
        </a>
      </PageIntro>
      <div className="reading-layout">
        <div className="article-body">
          <section id="approach">
            <h2>Start with the person using it.</h2>
            <p>
              My professional work includes contract-management,
              digital-signature, and property-search experiences. These
              workflows need clear interfaces, reliable server state, and
              careful handling of the steps between a user’s intention and a
              completed task.
            </p>
            <p>
              In my personal projects, I carry those questions further into
              order management, transactional booking, and bilingual document
              Q&A. I care about the decisions behind the interface: what data is
              trusted, what happens when a request fails, and how someone can
              inspect an AI-generated answer.
            </p>
            <p>
              This site brings together the{" "}
              <Link className="text-link" href="/projects">
                projects
              </Link>
              , their tradeoffs, and{" "}
              <Link className="text-link" href="/writing">
                technical notes
              </Link>{" "}
              that make those decisions easier to discuss.
            </p>
          </section>
          <section id="experience">
            <h2>Professional experience</h2>
            <div className="space-y-8">
              {experience.map((job) => (
                <article
                  className="border-l-2 border-primary/40 pl-5"
                  key={job.company}
                >
                  <p className="text-xs text-muted">{job.period} · Tehran</p>
                  <h3 className="mt-1 text-xl font-semibold">{job.company}</h3>
                  <p className="text-sm text-primary">{job.role}</p>
                  <p className="mt-3">{job.summary}</p>
                  <p>{job.details}</p>
                  <a
                    className="text-link mt-3 inline-flex min-h-11 items-center gap-2 text-sm"
                    href={job.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit {job.company}
                    <ArrowUpRight size={14} />
                  </a>
                </article>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted">
              Experience summarized from the résumé supplied in November 2026.
              The original PDF is available above.
            </p>
          </section>
          <section id="focus">
            <h2>Where I can contribute</h2>
            <div className="space-y-5">
              {expertise.map((item) => (
                <div key={item.title}>
                  <h3 className="mb-1 text-base font-semibold">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>
          <section id="education">
            <h2>Education</h2>
            <p className="font-medium">B.Sc. in Computer Engineering</p>
            <p>
              Islamic Azad University · September 2022 — Present, as listed in
              my résumé.
            </p>
          </section>
        </div>
        <aside className="panel self-start p-6 md:sticky md:top-8">
          <p className="eyebrow">AT A GLANCE</p>
          <dl className="mt-4 space-y-5 text-sm">
            <div>
              <dt className="text-xs text-muted">Based in</dt>
              <dd>Tehran, Iran</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Direction</dt>
              <dd>Software / Product Engineering with a focus on AI</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Strong foundations</dt>
              <dd>React · Next.js · TypeScript</dd>
            </div>
          </dl>
          <Link className="text-link mt-6 block min-h-11 text-sm" href="/now">
            Current focus →
          </Link>
          <a
            className="text-link inline-flex min-h-11 items-center text-sm"
            href="#contact"
          >
            Get in touch ↓
          </a>
        </aside>
      </div>
      <Contact />
    </div>
  );
}
