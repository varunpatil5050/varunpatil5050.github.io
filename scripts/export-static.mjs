import { mkdir, writeFile } from "node:fs/promises";
import { caseStudySlugs } from "./routes.mjs";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("static-export", `${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function render(path) {
  return worker.fetch(
    new Request(
      `https://varunpatil5050.github.io${path === "/" ? path : path.replace(/\/$/, "")}`,
      {
        headers: { accept: "text/html" },
      },
    ),
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
}

for (const path of ["/", ...caseStudySlugs.map((slug) => `/work/${slug}/`)]) {
  const response = await render(path);
  if (!response.ok)
    throw new Error(`Static export of ${path} failed: ${response.status}`);
  const directory = new URL(`../dist/client${path}`, import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(
    new URL("index.html", directory),
    await response.text(),
    "utf8",
  );
}
const missing = await render("/this-page-does-not-exist/");
if (missing.status !== 404)
  throw new Error(`404 route returned ${missing.status}`);
await writeFile(
  new URL("../dist/client/404.html", import.meta.url),
  await missing.text(),
  "utf8",
);
await writeFile(
  new URL("../dist/client/.nojekyll", import.meta.url),
  "",
  "utf8",
);
const root = "https://varunpatil5050.github.io";
const urls = ["/", ...caseStudySlugs.map((slug) => `/work/${slug}/`)];
await writeFile(
  new URL("../dist/client/sitemap.xml", import.meta.url),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((path) => `<url><loc>${root}${path}</loc></url>`).join("")}</urlset>`,
);
await writeFile(
  new URL("../dist/client/robots.txt", import.meta.url),
  `User-agent: *\nAllow: /\nSitemap: ${root}/sitemap.xml\n`,
);

console.log("Static GitHub Pages export created in dist/client");
