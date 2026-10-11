import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { caseStudySlugs } from "../scripts/routes.mjs";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders Varun Patil's complete portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Varun Patil/);
  assert.match(html, /Engineering/);
  assert.match(html, /intelligence/);
  assert.match(html, /into motion/);
  assert.match(html, /TransformerLMs/);
  assert.match(html, /work\/transformer-lms/);
  assert.match(html, /Judgment Explained/);
  assert.match(html, /Atelier/);
  assert.match(html, /StreamRank/);
  assert.match(html, /SignSense/);
  assert.match(html, /SyncSpace/);
  assert.match(html, /work\/syncspace/);
  assert.match(html, /Data Axle/);
  assert.match(html, /Shaastra Techathon/i);
  assert.match(html, /Varun-Patil-Resume\.pdf/);
  assert.doesNotMatch(
    html,
    /codex-preview|Building your site|react-loading-skeleton/,
  );
});

for (const slug of caseStudySlugs) {
  test(`exports a complete, directly loadable ${slug} case study`, async () => {
    const html = await readFile(
      new URL(`../dist/client/work/${slug}/index.html`, import.meta.url),
      "utf8",
    );
    assert.match(html, /Case study/);
    assert.match(html, /case-title/);
    assert.match(html, /In this study/);
    assert.match(html, /Built with/);
    assert.match(html, /Next exploration/);
    assert.match(html, /Varun-Patil-Resume\.pdf/);
    assert.doesNotMatch(html, /Building your site|Application error/);
  });
}

test("exports a real 404 and discoverable sitemap", async () => {
  const html = await readFile(
    new URL("../dist/client/404.html", import.meta.url),
    "utf8",
  );
  assert.match(html, /Not in this orbit/);
  assert.doesNotMatch(html, /id="hero-title"/);
  const sitemap = await readFile(
    new URL("../dist/client/sitemap.xml", import.meta.url),
    "utf8",
  );
  for (const slug of caseStudySlugs)
    assert.ok(sitemap.includes(`/work/${slug}/`));
});
