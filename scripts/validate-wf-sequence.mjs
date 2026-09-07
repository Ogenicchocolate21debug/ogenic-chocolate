import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await readFile(resolve(root, "wf-sequence.manifest.json"), "utf8"));
const errors = [];
const warnings = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };
const paths = [];

expect(manifest.schemaVersion === 1, "schemaVersion must be 1");
expect(manifest.policy?.publishGate, "publish gate is required");
expect(manifest.stages?.map(stage => stage.id).join(",") === "A1,A2,A3,A4,A5,A6", "stage order must be exactly A1,A2,A3,A4,A5,A6");

for (const stage of manifest.stages ?? []) {
  for (const media of stage.media ?? []) if (media.path) paths.push(media.path);
}

const a2 = manifest.stages?.find(stage => stage.id === "A2");
expect(a2?.media?.length === 4, "A2 must contain four figures");
expect(a2?.media?.every((media, index) => media.order === index + 1 && media.title === `Figure ${index + 1}`), "A2 figures must be ordered Figure 1–4");

const a4 = manifest.stages?.find(stage => stage.id === "A4");
expect(a4?.catalog?.length === 14, "A4 must contain exactly 14 categories");
expect(a4?.catalog?.map(group => group.id).join(",") === Array.from({ length: 14 }, (_, i) => String(i + 1).padStart(2, "0")).join(","), "A4 category IDs must be 01–14");
const seenItems = new Set();
const catalogItems = a4?.catalog?.flatMap(group => group.items ?? []) ?? [];
expect(catalogItems.length === 97, `A4 must expose 97 current Drive media items; got ${catalogItems.length}`);
for (const group of a4?.catalog ?? []) {
  expect(group.th && group.en && group.ja, `category ${group.id} requires TH/EN/JA labels`);
  for (const product of group.items ?? []) {
    expect(!seenItems.has(product.id), `duplicate item id ${product.id}`);
    seenItems.add(product.id);
    expect(product.th && product.en && product.ja, `${product.id} requires TH/EN/JA labels`);
    expect(Number.isFinite(product.price) || /^\d[\d,]*[–-]\d[\d,]*$/.test(product.price ?? ""), `${product.id} requires a numeric price or range`);
    expect(Boolean(product.image), `${product.id} requires an image path`);
    if (product.image) paths.push(product.image);
  }
}

const a5 = manifest.stages?.find(stage => stage.id === "A5");
expect(a5?.media?.length === 18, "A5 must contain PT1–PT18");
expect(a5?.media?.every((media, index) => media.order === index + 1 && media.title === `PT${index + 1}`), "A5 posters must be ordered PT1–PT18");

expect(manifest.menuBuilder?.hotPot?.length === 3, "Mala hot pot must have S/M/L data-only options");
expect(manifest.menuBuilder?.toppings?.count === 29, "menu builder must preserve 29 topping records");
warnings.push("A4 media count is 97 because deleted Drive media is not recreated; data-only menu choices remain in menuBuilder.");

for (const path of new Set(paths)) {
  try { await access(resolve(root, path)); }
  catch { errors.push(`missing local asset: ${path}`); }
}

if (errors.length) {
  console.error(`WF sequence validation failed (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`WF sequence valid: 6 stages · 14 categories · ${catalogItems.length} current media items · 18 posters`);
for (const warning of warnings) console.warn(`Warning: ${warning}`);
