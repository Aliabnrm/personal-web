import assert from "node:assert/strict";
import { test } from "node:test";
import { normalizeRepositories } from "../src/lib/repository.ts";
import {
  demoPassages,
  packPassages,
  rankPassages,
} from "../src/lib/retrieval-demo.ts";
import { projects, sourceUrl } from "../src/content/projects.ts";

const repository = {
  name: "example",
  html_url: "https://github.com/Aliabnrm/example",
  updated_at: "2026-11-07T00:00:00Z",
  homepage: "javascript:alert(1)",
};
test("upstream repository payloads tolerate malformed entries without exposing unsafe links", () => {
  const result = normalizeRepositories([
    null,
    false,
    {},
    { ...repository, html_url: "https://evil.test/example" },
    { ...repository, name: "../example" },
    repository,
  ]);
  assert.equal(result.length, 1);
  assert.equal(result[0].homepage, null);
  assert.deepEqual(result[0].topics, []);
  assert.equal(result[0].stargazers_count, 0);
  assert.throws(() => normalizeRepositories({ message: "rate limited" }));
  assert.throws(() => normalizeRepositories([null]));
});
test("forks and archives are omitted; valid metadata remains deterministic", () => {
  const result = normalizeRepositories([
    { ...repository, fork: true },
    { ...repository, archived: true },
    {
      ...repository,
      homepage: "https://example.com",
      topics: ["rag", 42],
      stargazers_count: -1,
    },
  ]);
  assert.equal(result.length, 1);
  assert.equal(result[0].homepage, "https://example.com/");
  assert.deepEqual(result[0].topics, ["rag"]);
  assert.equal(result[0].stargazers_count, 0);
});
test("context packing never exceeds its budget or duplicates a passage", () => {
  for (const strategy of ["keyword", "semantic", "hybrid"]) {
    for (const budget of [0, 20, 40, 60, 80, 120, 160]) {
      const selected = packPassages(strategy, budget).filter((p) => p.included);
      assert.ok(selected.reduce((sum, p) => sum + p.words, 0) <= budget);
      assert.equal(new Set(selected.map((p) => p.id)).size, selected.length);
    }
  }
});
test("rank fusion uses both lists; a restricted context can omit required evidence", () => {
  const hybrid = rankPassages("hybrid");
  assert.equal(
    hybrid[0].score,
    1 / (60 + hybrid[0].keywordRank) + 1 / (60 + hybrid[0].semanticRank),
  );
  assert.equal(rankPassages("keyword")[0].id, "product");
  assert.equal(
    packPassages("hybrid", 80).filter((p) => p.included && p.required).length,
    2,
  );
  assert.ok(
    packPassages("hybrid", 40).filter((p) => p.included && p.required).length <
      2,
  );
  assert.equal(
    packPassages("hybrid", 160).filter((p) => p.included).length,
    demoPassages.length,
  );
});
test("selected work has distinct routes, pinned evidence, and explicit limits", () => {
  assert.equal(projects.length, 3);
  assert.equal(new Set(projects.map((p) => p.slug)).size, 3);
  for (const project of projects) {
    assert.match(project.revision, /^[a-f0-9]{40}$/);
    assert.ok(project.decisions.length >= 2);
    assert.ok(project.limitations.length > 0);
    for (const source of project.sources)
      assert.equal(
        new URL(sourceUrl(project, source.path)).hostname,
        "github.com",
      );
  }
});
