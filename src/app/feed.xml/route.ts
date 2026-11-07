import { notes } from "@/content/notes";
import { projects } from "@/content/projects";
import { site } from "@/lib/site";
export const dynamic = "force-static";
function escape(value: string) {
  return value.replace(
    /[<>&"']/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[char]!,
  );
}
export function GET() {
  const entries = [
    ...notes.map((n) => ({
      title: n.title,
      description: n.description,
      path: `/notes/${n.slug}`,
      date: n.updated,
    })),
    ...projects.map((p) => ({
      title: `${p.title}: engineering case study`,
      description: p.summary,
      path: `/projects/${p.slug}`,
      date: site.updated,
    })),
  ].sort((a, b) => b.date.localeCompare(a.date));
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escape(site.name)} — Engineering notebook</title><link>${escape(site.url)}</link><description>${escape(site.description)}</description><language>en</language><atom:link href="${escape(site.url)}/feed.xml" rel="self" type="application/rss+xml"/>${entries.map((e) => `<item><title>${escape(e.title)}</title><link>${escape(site.url + e.path)}</link><guid isPermaLink="true">${escape(site.url + e.path)}</guid><description>${escape(e.description)}</description><pubDate>${new Date(e.date + "T12:00:00Z").toUTCString()}</pubDate></item>`).join("")}</channel></rss>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600",
    },
  });
}
