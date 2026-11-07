import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("navigation remains usable at narrow widths", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.getByRole("button", { name: "Open navigation" }).click();
  const menu = page.getByRole("dialog");
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(menu).not.toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});

test("home, theme persistence, and navigation work at every size", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Learn, connect, return." }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.getByRole("button", { name: "Toggle color theme" }).click();
  const theme = await page.locator("html").getAttribute("class");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("class", theme!);
  await page
    .getByRole("link", { name: "Explore learning paths", exact: true })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "One path instead of a hundred open tabs",
    }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("learning progress and bookmarks survive reload", async ({ page }) => {
  await page.goto("/roadmaps/llm-engineering");
  await page
    .getByRole("button", {
      name: "Complete: Foundations and first runs",
      exact: true,
    })
    .click();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "20",
  );
  await page.reload();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "20",
  );
  await page.goto("/notes/retrieval-before-generation");
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

test("search handles results, no results, and reset", async ({ page }) => {
  await page.goto("/search");
  const input = page.getByRole("textbox", { name: "Search the notebook" });
  await input.fill("retrieval");
  await expect(
    page.getByRole("link", {
      name: "Introduction to Information Retrieval",
      exact: true,
    }),
  ).toBeVisible();
  await input.fill("xyzzynothingmatches");
  await expect(
    page.getByRole("heading", {
      name: "No results. A different starting point?",
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Start a new search" }).click();
  await expect(input).toHaveValue("");
});

test("projects show actual GitHub repositories and filter by language", async ({
  page,
}) => {
  await page.goto("/projects");
  await expect(
    page.getByRole("link", { name: "hair-salon", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("textbox", { name: "Search projects" })
    .fill("hair-salon");
  await expect(page.getByRole("status")).toHaveText("1 public project");
  await expect(
    page.getByRole("link", { name: "View source", exact: true }),
  ).toHaveAttribute("href", "https://github.com/Aliabnrm/hair-salon");
});

test("light and dark home meet accessibility checks", async ({ page }) => {
  await page.goto("/");
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => {
      localStorage.setItem("theme", value);
    }, theme);
    await page.reload();
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(audit.violations).toEqual([]);
  }
});

test("all content routes load and have no horizontal overflow", async ({
  page,
}) => {
  for (const path of [
    "/this-week",
    "/this-week/2026-w45",
    "/roadmaps",
    "/roadmaps/building-agents",
    "/library",
    "/library/introduction-to-information-retrieval",
    "/notes",
    "/notes/small-evaluation-sets",
    "/about",
    "/now",
    "/projects",
  ]) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      path,
    ).toBeTruthy();
  }
});

test("public API, feeds, and unknown routes behave correctly", async ({
  request,
}) => {
  const projects = await request.get("/api/projects");
  expect(projects.status()).toBe(200);
  expect((await projects.json()).repositories.length).toBeGreaterThan(0);
  const search = await request.get("/api/search?q=retrieval");
  expect((await search.json()).results.length).toBeGreaterThan(0);
  const feed = await request.get("/feed.xml");
  expect(feed.headers()["content-type"]).toContain("application/rss+xml");
  expect(await feed.text()).toContain("<rss");
  expect((await request.get("/not-a-real-page")).status()).toBe(404);
});
