import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("Strawberry Glam Models source contains the finished site content", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /title:\s*"Strawberry Glam Models"/);
  assert.match(page, /Exclusive Webcam Agency for Premium Clients/);
  assert.match(page, /Максимальная конфиденциальность/);
  assert.match(page, /Relocation Program/);
  assert.match(page, /Upload 8-15 high-quality photos/);
  assert.match(css, /hero-strawberry\.jpg/);
  assert.doesNotMatch(
    `${page}\n${layout}\n${packageJson}`,
    /codex-preview|react-loading-skeleton|Your site is taking shape|Starter Project/i,
  );
});
