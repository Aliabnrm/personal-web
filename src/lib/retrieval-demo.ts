export type RetrievalStrategy = "keyword" | "semantic" | "hybrid";
export type DemoPassage = {
  id: string;
  title: string;
  text: string;
  keywordRank: number;
  semanticRank: number;
  required: boolean;
};

// Authored teaching fixtures: ranks illustrate behavior, not measured model output.
export const demoPassages: DemoPassage[] = [
  {
    id: "returns",
    title: "General returns policy",
    text: "Unused items can be returned within thirty days of delivery. Keep the original packaging and proof of purchase. Some product categories have additional conditions, which take precedence over this general returns policy.",
    keywordRank: 2,
    semanticRank: 2,
    required: true,
  },
  {
    id: "opened",
    title: "Opened electrical items",
    text: "An opened electrical item, including a desk lamp, is eligible for return only if it is defective. Contact support with the order number before sending it back.",
    keywordRank: 3,
    semanticRank: 1,
    required: true,
  },
  {
    id: "product",
    title: "Desk lamp specifications",
    text: "The adjustable desk lamp has three brightness settings, a warm light mode, a metal base, and a two metre power cable. Available in white or blue.",
    keywordRank: 1,
    semanticRank: 4,
    required: false,
  },
  {
    id: "delivery",
    title: "Order and delivery updates",
    text: "An email confirms dispatch and includes the delivery tracking link. Contact support if the tracking page has not changed for three working days after dispatch.",
    keywordRank: 4,
    semanticRank: 3,
    required: false,
  },
];
export function rankPassages(strategy: RetrievalStrategy) {
  return demoPassages
    .map((passage) => ({
      ...passage,
      score:
        strategy === "hybrid"
          ? 1 / (60 + passage.keywordRank) + 1 / (60 + passage.semanticRank)
          : 1 /
            (strategy === "keyword"
              ? passage.keywordRank
              : passage.semanticRank),
      words: passage.text.split(/\s+/).length,
    }))
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
}
export function packPassages(strategy: RetrievalStrategy, budget: number) {
  let used = 0;
  return rankPassages(strategy).map((passage) => {
    const included = used + passage.words <= Math.max(0, budget);
    if (included) used += passage.words;
    return { ...passage, included };
  });
}
