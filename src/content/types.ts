export type ArticleSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  code?: string;
};
export type Note = {
  slug: string;
  title: string;
  description: string;
  status: "Complete" | "In progress" | "Idea";
  kind: "Engineering note" | "Decision note" | "Architecture note";
  projectSlug: string;
  sources: { label: string; url: string }[];
  topic: string;
  updated: string;
  sections: ArticleSection[];
};
export type Resource = {
  slug: string;
  title: string;
  author: string;
  kind: "Book" | "Course" | "Article" | "Documentation";
  topic: string;
  description: string;
  url: string;
  sections: ArticleSection[];
};
export type LearningPath = {
  slug: string;
  title: string;
  number: string;
  level: string;
  description: string;
  duration: string;
  modules: { title: string; description: string; resource: string }[];
};
