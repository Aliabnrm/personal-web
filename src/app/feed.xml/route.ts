import { notes, issues } from "@/content/notebook";
import { site } from "@/lib/site";
const escape = (s: string) =>
  s.replace(
    /[<>&'\"]/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[c]!,
  );
export function GET() {
  const entries = [
    ...issues.map((i) => ({
      title: i.title,
      description: i.description,
      path: `/this-week/${i.slug}`,
      date: new Date(i.date + " 12:00:00 GMT"),
    })),
    ...notes.map((n) => ({
      title: n.title,
      description: n.description,
      path: `/notes/${n.slug}`,
      date: new Date(n.updated + "T12:00:00Z"),
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escape(site.name)}</title><link>${escape(site.url)}</link><description>${escape(site.description)}</description><language>en</language><atom:link href="${escape(site.url)}/feed.xml" rel="self" type="application/rss+xml"/>${entries.map((e) => `<item><title>${escape(e.title)}</title><link>${escape(site.url + e.path)}</link><guid isPermaLink="true">${escape(site.url + e.path)}</guid><description>${escape(e.description)}</description><pubDate>${e.date.toUTCString()}</pubDate></item>`).join("")}</channel></rss>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600",
    },
  });
}
