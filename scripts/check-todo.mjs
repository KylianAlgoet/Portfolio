// Fails the production build if unfinished input ("TODO(input)") reached dist/.
// Drafts are filtered out in production, so this only trips on content that slipped through.
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const DIST = fileURLToPath(new URL("../dist/", import.meta.url));
const MARKER = "TODO(input)";
const TEXT_FILES = /\.(html|xml|txt|json|js|css)$/;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (TEXT_FILES.test(entry.name)) yield path;
  }
}

const hits = [];
for await (const file of walk(DIST)) {
  if ((await readFile(file, "utf8")).includes(MARKER)) hits.push(file);
}

if (hits.length > 0) {
  console.error(`\n✗ Found "${MARKER}" in the production build:\n  ${hits.join("\n  ")}\n`);
  process.exit(1);
}
console.log(`✓ No "${MARKER}" in dist/`);
