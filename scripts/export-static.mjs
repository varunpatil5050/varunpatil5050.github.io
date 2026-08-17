import { copyFile, writeFile } from "node:fs/promises";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("static-export", `${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const response = await worker.fetch(
  new Request("https://varunpatil5050.github.io/", {
    headers: { accept: "text/html" },
  }),
  {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  },
  {
    waitUntil() {},
    passThroughOnException() {},
  },
);

if (!response.ok) {
  throw new Error(`Static export failed with status ${response.status}`);
}

const html = await response.text();
const output = new URL("../dist/client/index.html", import.meta.url);
await writeFile(output, html, "utf8");
await copyFile(output, new URL("../dist/client/404.html", import.meta.url));
await writeFile(new URL("../dist/client/.nojekyll", import.meta.url), "", "utf8");

console.log("Static GitHub Pages export created in dist/client");
