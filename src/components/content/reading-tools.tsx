"use client";
import { useState } from "react";
import { Bookmark, Check, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalSet } from "@/hooks/use-local-set";
export function ReadingTools({ id }: { id: string }) {
  const { items, toggle } = useLocalSet("ai-notebook:bookmarks:v1");
  const [message, setMessage] = useState("");
  const saved = items.includes(id);
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(location.href);
      setMessage("Link copied.");
    } catch {
      setMessage("Copy the address from your browser to share this page.");
    }
  }
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={() => {
            if (!toggle(id))
              setMessage("Your browser could not save this bookmark.");
          }}
          aria-pressed={saved}
        >
          {saved ? <Check size={16} /> : <Bookmark size={16} />}{" "}
          {saved ? "Saved" : "Save for later"}
        </Button>
        <Button variant="ghost" onClick={copyLink}>
          <Link2 size={16} />
          Copy link
        </Button>
      </div>
      <p role="status" className="mt-2 text-xs text-muted">
        {message || "Bookmarks are saved in this browser."}
      </p>
    </div>
  );
}
