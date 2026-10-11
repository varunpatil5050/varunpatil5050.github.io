import assert from "node:assert/strict";
import test from "node:test";

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
  assert.match(html, /Intelligence/);
  assert.match(html, /built to work/);
  assert.match(html, /Transformer LMs/);
  assert.match(html, /hindi-nepali-transformers-from-scratch/);
  assert.match(html, /Judgment Explained/);
  assert.match(html, /Atelier/);
  assert.match(html, /StreamRank/);
  assert.match(html, /SignSense/);
  assert.match(html, /SyncSpace/);
  assert.match(html, /github\.com\/varunpatil5050\/SyncSpace/);
  assert.match(html, /Data Axle/);
  assert.match(html, /Shaastra Techathon 2024/i);
  assert.match(html, /Varun-Patil-Resume\.pdf/);
  assert.doesNotMatch(
    html,
    /codex-preview|Building your site|react-loading-skeleton/,
  );
});
