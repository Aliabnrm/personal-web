import Link from "next/link";
import { site } from "@/lib/site";
export function Footer() {
  return (
    <footer className="page-container pb-8 pt-8 text-xs text-muted">
      <div className="mb-4 h-px bg-border" />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-4 text-[13px] text-primary">
          <Link className="hover:underline" href="/about">
            About
          </Link>
          <Link className="hover:underline" href="/now">
            Now
          </Link>
          <Link className="hover:underline" href="/projects">
            Projects
          </Link>
          <a className="hover:underline" href="/feed.xml">
            RSS
          </a>
        </div>
        <span>Learn in public. Return with context.</span>
      </div>
      <div className="flex flex-wrap justify-between gap-2">
        <p>
          A personal notebook by{" "}
          <a
            className="text-link"
            href={site.github}
            target="_blank"
            rel="noreferrer"
          >
            Ali Abnar
          </a>{" "}
          on AI, learning, and building.
        </p>
        <span>© {new Date().getFullYear()} AI Notebook</span>
      </div>
    </footer>
  );
}
