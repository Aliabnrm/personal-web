import Link from "next/link";
import { site } from "@/lib/site";
export function Footer() {
  return (
    <footer className="page-container pb-8 pt-8 text-xs text-muted">
      <div className="mb-6 h-px bg-border" />
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <Link href="/" className="text-sm font-semibold text-foreground">
            Ali Abnar<span className="text-primary">.</span>
          </Link>
          <p className="mt-1">
            Software, product, and the decisions in between.
          </p>
        </div>
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-x-5 gap-y-1"
        >
          {[
            { href: "/projects", label: "Work" },
            { href: "/writing", label: "Writing" },
            { href: "/about#contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.href}
              className="text-link inline-flex min-h-11 items-center"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
          <a
            className="text-link inline-flex min-h-11 items-center"
            href={site.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a
            className="text-link inline-flex min-h-11 items-center"
            href="/feed.xml"
          >
            RSS
          </a>
        </nav>
      </div>
      <p className="mt-6 text-[11px]">
        © {new Date().getFullYear()} {site.author} · Built with care. Shared
        with context.
      </p>
    </footer>
  );
}
