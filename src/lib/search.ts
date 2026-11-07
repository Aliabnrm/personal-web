export type SearchItem = {
  title: string;
  description: string;
  type: string;
  href: string;
  keywords: string;
};

export function searchIndex(index: SearchItem[], query: string, type = "All") {
  const words = query
    .trim()
    .slice(0, 200)
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  if (!words.length) return [];
  return index
    .filter(
      (item) =>
        (type === "All" || item.type === type) &&
        words.every((word) =>
          `${item.title} ${item.description} ${item.keywords}`
            .toLowerCase()
            .includes(word),
        ),
    )
    .slice(0, 50);
}
