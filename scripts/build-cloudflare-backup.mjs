import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const USER_AGENT = 'CandyBaked-Cloudflare-Backup/1.1';

const safeId = value => String(value || 'item').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'item';
const isAsciiName = value => /^[\x20-\x7E]+$/.test(String(value || '').trim());

function nameEn(product) {
  if (product.nameEn) return product.nameEn;
  if (isAsciiName(product.name)) return String(product.name).trim();
  const text = String(product.description || '').replace(/ราคา\s*[\d,.]+\s*บาท.*$/s, '');
  const match = text.match(/([A-Z][A-Za-z0-9&'’+\- /().]+?)(?=,\s|\.\s|ราคา|$)/);
  return match ? match[1].trim() : String(product.group || 'Candy Baked');
}

function nameTh(product) {
  if (product.nameTh) return product.nameTh;
  if (/[ก-๙]/.test(String(product.name || ''))) return String(product.name).trim();
  const text = String(product.description || '');
  const match = text.match(/^([^A-Z]+?)(?=[A-Z])/);
  return match ? match[1].trim() : String(product.name || '').trim();
}

function nameJa(product) {
  return product.nameJa || product.thai || product.japanese || '';
}

function extFrom(contentType, url) {
  const type = String(contentType || '').toLowerCase();
  if (type.includes('png')) return '.png';
  if (type.includes('webp')) return '.webp';
  if (type.includes('gif')) return '.gif';
  if (type.includes('avif')) return '.avif';
  if (type.includes('jpeg') || type.includes('jpg')) return '.jpg';
  try {
    const ext = path.extname(new URL(url).pathname).toLowerCase();
    if (['.png','.webp','.gif','.avif','.jpg','.jpeg'].includes(ext)) return ext === '.jpeg' ? '.jpg' : ext;
  } catch {}
  return '.jpg';
}

function normalizeImageUrl(value, base) {
  if (!value) return null;
  const raw = String(value).trim();
  if (!raw) return null;
  if (raw.startsWith('//')) return `https:${raw}`;
  try { return new URL(raw, base).href; } catch { return null; }
}

async function fetchImage(url) {
  const response = await fetch(url, { headers: { 'user-agent': USER_AGENT } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return {
    bytes: Buffer.from(await response.arrayBuffer()),
    contentType: response.headers.get('content-type')
  };
}

async function resolveCurrentShopifyImage(item) {
  const productUrl = String(item.shopifyUrl || '').trim().replace(/\/$/, '');
  if (!/^https:\/\//i.test(productUrl) || !/\/products\//.test(productUrl)) return null;
  try {
    const response = await fetch(`${productUrl}.js`, {
      headers: { 'user-agent': USER_AGENT, accept: 'application/json' }
    });
    if (!response.ok) throw new Error(`product.js HTTP ${response.status}`);
    const product = await response.json();
    return normalizeImageUrl(product.featured_image || product.images?.[0], productUrl);
  } catch (error) {
    console.warn(`Shopify image lookup failed for ${item.id || item.name}: ${error.message}`);
    return null;
  }
}

async function backupOne(item, folder, index) {
  const originalSource = item.image || item.imageUrl;
  const enriched = {
    ...item,
    nameTh: nameTh(item),
    nameEn: nameEn(item),
    nameJa: nameJa(item)
  };
  if (!originalSource || !/^https:\/\//i.test(originalSource)) return enriched;

  let source = originalSource;
  let imageResult;
  try {
    imageResult = await fetchImage(source);
  } catch (legacyError) {
    const refreshedSource = await resolveCurrentShopifyImage(item);
    if (!refreshedSource) {
      console.warn(`Image backup skipped for ${item.id || item.name}: ${legacyError.message}`);
      enriched.sourceImage = originalSource;
      enriched.backup = 'remote-fallback';
      return enriched;
    }
    try {
      source = refreshedSource;
      imageResult = await fetchImage(source);
      enriched.legacySourceImage = originalSource;
      enriched.imageRefreshedFromShopify = true;
      console.log(`Refreshed stale image for ${item.id || item.name}`);
    } catch (refreshError) {
      console.warn(`Image backup skipped for ${item.id || item.name}: ${refreshError.message}`);
      enriched.sourceImage = originalSource;
      enriched.backup = 'remote-fallback';
      return enriched;
    }
  }

  const ext = extFrom(imageResult.contentType, source);
  const filename = `${String(index + 1).padStart(3,'0')}-${safeId(item.id || item.name || item.nameTh)}${ext}`;
  const directory = path.join(dist, 'assets', folder);
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(path.join(directory, filename), imageResult.bytes);
  enriched.sourceImage = source;
  enriched.image = `assets/${folder}/${filename}`;
  enriched.backup = 'cloudflare-pages';
  return enriched;
}

async function processJson(sourceFile, outputFile, folder) {
  try {
    const raw = await fs.readFile(path.join(root, sourceFile), 'utf8');
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) {
      await fs.writeFile(path.join(dist, outputFile), raw);
      return;
    }
    const output = [];
    for (let i = 0; i < data.length; i += 1) output.push(await backupOne(data[i], folder, i));
    await fs.writeFile(path.join(dist, outputFile), JSON.stringify(output, null, 2) + '\n');
    const backedUp = output.filter(item => item.backup === 'cloudflare-pages').length;
    const refreshed = output.filter(item => item.imageRefreshedFromShopify).length;
    const fallback = output.filter(item => item.backup === 'remote-fallback').length;
    console.log(`Backed up ${backedUp}/${output.length} from ${sourceFile}; refreshed=${refreshed}; fallback=${fallback}`);
  } catch (error) {
    console.warn(`Could not process ${sourceFile}: ${error.message}`);
  }
}

await fs.mkdir(path.join(dist, 'assets'), { recursive: true });
await processJson('bakery-products.json', 'bakery-products.json', 'backup/bakery');
await processJson('chocolate-products.json', 'chocolate-products.json', 'backup/chocolate');
await processJson('posters.json', 'posters.json', 'backup/posters');
