import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const caseStudies = ["document-qa", "fastfactor", "salon-booking"];
const routes = [
  "/",
  "/projects",
  ...caseStudies.map((slug) => `/projects/${slug}`),
  "/writing",
  "/notes",
  "/notes/retrieval-before-generation",
  "/notes/scope-before-features",
  "/notes/booking-correctness",
  "/roadmaps",
  "/roadmaps/ai-fundamentals",
  "/roadmaps/llm-engineering",
  "/roadmaps/building-agents",
  "/library",
  "/library/introduction-to-information-retrieval",
  "/library/neural-networks-zero-to-hero",
  "/library/hugging-face-llm-course",
  "/library/building-effective-agents",
  "/lab/retrieval",
  "/about",
  "/now",
  "/search",
];

test("navigation is keyboard accessible at 320px and returns focus after Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.click();
  const menu = page.getByRole("dialog");
  await expect(menu).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await menu.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(menu).not.toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});

test("home presents identity, selected work, and a working contact route", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Ali");
  await expect(page).toHaveTitle("Ali Abnar · Software & Product Engineer");
  await expect(
    page.getByRole("link", { name: "Read the case study" }),
  ).toHaveCount(3);
  await page
    .getByRole("link", { name: "Explore my work", exact: true })
    .click();
  await expect(page).toHaveURL(/\/projects$/);
  await page.goto("/");
  await page.getByRole("link", { name: "Let’s connect", exact: true }).click();
  await expect(page).toHaveURL(/\/about#contact$/);
  await expect(page.locator("#contact")).toBeInViewport();
});

test("theme persists across navigation and reload", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Toggle color theme" }).click();
  const theme = await page.locator("html").getAttribute("class");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("class", theme!);
  await page.goto("/projects/document-qa");
  await expect(page.locator("html")).toHaveAttribute("class", theme!);
});

test("case studies provide pinned evidence, limits, and related writing", async ({
  page,
}) => {
  for (const slug of caseStudies) {
    await page.goto(`/projects/${slug}`);
    await expect(
      page.getByRole("heading", { name: "Engineering decisions & tradeoffs" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Outcome & limits" }),
    ).toBeVisible();
    const sources = page.locator("#sources a");
    expect(await sources.count()).toBeGreaterThan(1);
    for (const href of await sources.evaluateAll((links) =>
      links.map((link) => link.getAttribute("href")),
    )) {
      expect(href).toMatch(
        /^https:\/\/github\.com\/Aliabnrm\/[^/]+\/blob\/[a-f0-9]{40}\//,
      );
    }
    await expect(
      page.getByRole("heading", { name: "A connected engineering note" }),
    ).toBeVisible();
    if (slug === "fastfactor")
      await expect(
        page.getByRole("link", { name: "Open frontend preview" }),
      ).toHaveAttribute("href", "https://fastfactor.vercel.app");
  }
});

test("search finds local case studies and keeps UI and API results aligned", async ({
  page,
  request,
}) => {
  await page.goto("/search?q=bilingual&q=ignored");
  const input = page.getByRole("textbox", { name: "Search the site" });
  await expect(input).toHaveValue("bilingual");
  await expect(
    page.getByRole("link", { name: "Document Q&A", exact: true }),
  ).toHaveAttribute("href", "/projects/document-qa");
  const data = await (await request.get("/api/search?q=bilingual")).json();
  expect(
    data.results.some(
      (r: { href: string }) => r.href === "/projects/document-qa",
    ),
  ).toBeTruthy();
  await input.fill("xyzzynothingmatches");
  await expect(
    page.getByRole("heading", {
      name: "No results. A different starting point?",
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Start a new search" }).click();
  await expect(input).toHaveValue("");
  await input.fill("retrieval");
  await expect(
    page.getByRole("link", {
      name: "Introduction to Information Retrieval",
      exact: true,
    }),
  ).toBeVisible();
});

test("learning progress and bookmarks persist, including recovery from damaged data", async ({
  page,
}) => {
  await page.goto("/roadmaps/llm-engineering");
  await page
    .getByRole("button", {
      name: "Complete: Foundations and first runs",
      exact: true,
    })
    .click();
  await page.reload();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "20",
  );
  await page.goto("/notes/retrieval-before-generation");
  await page.evaluate(() =>
    localStorage.setItem("ai-notebook:bookmarks:v1", "invalid-json"),
  );
  await page.reload();
  await page
    .getByRole("button", { name: "Save for later", exact: true })
    .click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Saved", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.goto("/notes");
  await page.getByRole("button", { name: "Saved", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("1 result");
});

test("public repositories support search, language filtering, and empty-state recovery", async ({
  page,
}) => {
  await page.goto("/projects");
  const input = page.getByRole("textbox", { name: "Search projects" });
  await input.fill("hair-salon");
  await expect(page.getByRole("status")).toHaveText("1 public project");
  await expect(
    page.getByRole("link", { name: "View source", exact: true }),
  ).toHaveAttribute("href", "https://github.com/Aliabnrm/hair-salon");
  await page.getByLabel("Filter by language").selectOption("Python");
  await expect(
    page.getByRole("heading", { name: "No matching projects" }),
  ).toBeVisible();
  await input.fill("");
  await expect(
    page.getByRole("link", { name: "document-rag-system", exact: true }),
  ).toBeVisible();
});

test("retrieval playground responds to strategy, budget, and reset", async ({
  page,
}) => {
  await page.goto("/lab/retrieval");
  const status = page.getByRole("status");
  await expect(status).toContainText(
    "Both required policy passages are included.",
  );
  await page.getByLabel("Context budget:", { exact: false }).fill("40");
  await expect(status).toContainText("Policy context incomplete");
  await page
    .getByRole("button", { name: "Keyword ranking", exact: true })
    .click();
  await expect(page.locator("main ol li").first()).toContainText(
    "Desk lamp specifications",
  );
  await page.getByRole("button", { name: "Reset experiment" }).click();
  await expect(status).toContainText(
    "Both required policy passages are included.",
  );
});

test("contact destinations and original résumé are available", async ({
  page,
  request,
}) => {
  await page.goto("/about");
  const contact = page.locator("#contact");
  await expect(
    contact.getByRole("link", { name: /aliabnar96@gmail.com/ }),
  ).toHaveAttribute("href", "mailto:aliabnar96@gmail.com");
  await expect(contact.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/ali-abnar/",
  );
  await expect(contact.getByRole("link", { name: /Telegram/ })).toHaveAttribute(
    "href",
    "https://t.me/aliabnar",
  );
  const resume = await request.get("/resume/ali-abnar-frontend-engineer.pdf");
  expect(resume.status()).toBe(200);
  expect(resume.headers()["content-type"]).toContain("application/pdf");
  expect((await resume.body()).subarray(0, 5).toString()).toBe("%PDF-");
});

test("all canonical content routes load without JavaScript errors or overflow", async ({
  page,
}) => {
  test.setTimeout(60000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const path of routes) {
    expect((await page.goto(path))?.status(), path).toBe(200);
    await expect(page.locator("h1"), path).toHaveCount(1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      path,
    ).toBeTruthy();
  }
  expect(errors).toEqual([]);
});

test("key pages pass automated accessibility checks in light and dark", async ({
  page,
}) => {
  test.setTimeout(120000);
  for (const theme of ["light", "dark"]) {
    await page.addInitScript(
      (value) => localStorage.setItem("theme", value),
      theme,
    );
    for (const path of [
      "/",
      "/projects/document-qa",
      "/writing",
      "/about",
      "/lab/retrieval",
    ]) {
      await page.goto(path);
      await expect(page.locator("html")).toHaveClass(new RegExp(theme));
      const audit = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(audit.violations, `${theme}: ${path}`).toEqual([]);
    }
  }
});

test("public APIs, sitemap, feeds, redirects, and missing routes behave correctly", async ({
  request,
}) => {
  const projects = await request.get("/api/projects");
  expect(projects.status()).toBe(200);
  expect((await projects.json()).repositories.length).toBeGreaterThan(0);
  expect(
    (await (await request.get("/api/search?q=   ")).json()).results,
  ).toEqual([]);
  const feed = await request.get("/feed.xml");
  expect(feed.headers()["content-type"]).toContain("application/rss+xml");
  expect(await feed.text()).toContain("/projects/document-qa");
  expect(await feed.text()).not.toContain("Invalid Date");
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain("/lab/retrieval");
  expect(await sitemap.text()).not.toContain("/this-week");
  for (const path of ["/this-week", "/this-week/2026-w45"]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe("/writing");
  }
  expect((await request.get("/projects/not-a-real-project")).status()).toBe(
    404,
  );
  expect((await request.get("/notes/not-a-real-note")).status()).toBe(404);
});
