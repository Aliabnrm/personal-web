export const site = {
  name: "AI Notebook",
  author: "Ali Abnar",
  description:
    "A personal notebook on AI, thoughtful software, and learning in public. Learn, connect, return.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  github: "https://github.com/Aliabnrm",
} as const;
export const navigation = [
  { label: "This week", href: "/this-week" },
  { label: "Learning paths", href: "/roadmaps" },
  { label: "Library", href: "/library" },
  { label: "Notes", href: "/notes" },
  { label: "About", href: "/about" },
] as const;
