import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const manifestPath = path.join(root, 'wf-sequence.manifest.json');
const errors = [];
const warnings = [];

const exists = p => fs.existsSync(path.join(root, p));
const imageFiles = dir => {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full).filter(name => /\.(png|jpe?g|webp|gif|avif)$/i.test(name)).sort();
};

if (!fs.existsSync(manifestPath)) {
  console.error('WF VALIDATION FAILED: wf-sequence.manifest.json missing');
  process.exit(1);
}

const m = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const s = m.steps;

for (const p of s.A1.assets) if (!exists(p)) errors.push(`A1 missing: ${p}`);
for (const p of s.A2.ordered_assets) if (!exists(p)) errors.push(`A2 missing: ${p}`);
if (!exists(s.A3.asset)) errors.push(`A3 missing: ${s.A3.asset}`);
if (!exists(s.A6.asset)) errors.push(`A6 missing: ${s.A6.asset}`);

let mediaTotal = 0;
const categoryRoot = path.join(root, s.A4.asset_root);
if (!fs.existsSync(categoryRoot)) {
  errors.push(`A4 asset root missing: ${s.A4.asset_root}`);
} else {
  const dirs = fs.readdirSync(categoryRoot, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort();
  const canonical = s.A4.category_order;
  for (const id of canonical) {
    const category = s.A4.categories.find(c => c.id === id);
    if (!dirs.includes(id)) {
      errors.push(`A4 missing category folder: ${id}`);
      continue;
    }
    const media = imageFiles(`${s.A4.asset_root}/${id}`);
    mediaTotal += media.length;
    const expectedMedia = category?.expected_media_files ?? 0;
    if (media.length < expectedMedia) {
      errors.push(`A4 category ${id}: local media ${media.length} < expected media ${expectedMedia}; sync incomplete`);
    } else if (media.length > expectedMedia) {
      warnings.push(`A4 category ${id}: local media ${media.length} > expected media ${expectedMedia}; review extra files`);
    }
  }
  for (const id of dirs.filter(id => /^\d{2}$/.test(id) && !canonical.includes(id))) {
    warnings.push(`A4 legacy/unmapped category folder excluded from canonical sequence: ${id}`);
  }
}

if (mediaTotal < s.A4.expected_media_file_count) {
  errors.push(`A4 media total incomplete: found ${mediaTotal}, expected at least ${s.A4.expected_media_file_count}`);
}

const posterFiles = imageFiles(s.A5.asset_root);
if (posterFiles.length < s.A5.expected_count) {
  errors.push(`A5 posters incomplete: found ${posterFiles.length}, expected at least ${s.A5.expected_count}`);
}

const requiredPosterNames = Array.from({ length: s.A5.expected_count }, (_, i) => `${String(i + 1).padStart(3, '0')}`);
for (const stem of requiredPosterNames) {
  if (!posterFiles.some(name => name.startsWith(stem + '.'))) errors.push(`A5 missing poster sequence item: ${stem}`);
}

console.log('\nWF Sequence Validation');
console.log(`Shortcut: ${m.shortcut}`);
console.log(`Order: ${m.rules.strict_order.join(' -> ')}`);
console.log(`A4 media: ${mediaTotal}/${s.A4.expected_media_file_count}`);
for (const w of warnings) console.warn(`WARN: ${w}`);

if (errors.length) {
  for (const e of errors) console.error(`ERROR: ${e}`);
  console.error(`\nBLOCK_PUBLISH (${errors.length} error(s), ${warnings.length} warning(s))`);
  process.exit(1);
}

console.log(`PASS (${warnings.length} warning(s))`);
