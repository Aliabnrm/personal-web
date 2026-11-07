"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-start justify-center gap-5">
      <p className="eyebrow">SOMETHING WENT WRONG</p>
      <h1 className="page-title">Let’s try that again.</h1>
      <p className="text-muted">
        The page could not load. Your saved notes and progress are still in this
        browser.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
