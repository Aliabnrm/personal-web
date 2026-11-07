const origin = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
);
if (!["http:", "https:"].includes(origin.protocol)) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin.");
}
export const site = {
  name: "Ali Abnar",
  author: "Ali Abnar",
  role: "Software & Product Engineer",
  description:
    "Software engineer with a frontend background, building useful products and applied AI systems. Selected projects, engineering decisions, and practical notes by Ali Abnar.",
  url: origin.origin,
  github: "https://github.com/Aliabnrm",
  email: "aliabnar96@gmail.com",
  linkedin: "https://www.linkedin.com/in/ali-abnar/",
  telegram: "https://t.me/aliabnar",
  resume: "/resume/ali-abnar-frontend-engineer.pdf",
  updated: "2026-11-07",
} as const;
export const navigation = [
  { label: "Work", href: "/projects" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
  { label: "Now", href: "/now" },
] as const;
