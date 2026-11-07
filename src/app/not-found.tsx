import { ButtonLink } from "@/components/ui/button";
export default function NotFound() {
  return (
    <div className="flex min-h-[55vh] flex-col items-start justify-center gap-5">
      <p className="eyebrow">404 · A MISSING PAGE</p>
      <h1 className="page-title">A little off the path.</h1>
      <p className="text-muted">
        This page may have moved, or the link might be incomplete.
      </p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/">Return home</ButtonLink>
        <ButtonLink variant="outline" href="/search">
          Search the site
        </ButtonLink>
      </div>
    </div>
  );
}
