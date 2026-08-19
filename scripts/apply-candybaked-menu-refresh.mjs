import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const deliveryRoot = path.resolve(root, '..', 'deliverables');
fs.mkdirSync(deliveryRoot, { recursive: true });

const sourcePath = path.join(root, 'bakery-products.json');
const products = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

const copy = {
  'CBK-SHP-001': {
    name: 'ShioPan Original / Charcoal',
    thai: 'ชิโอะปัง-ออริจินัล',
    price: 39,
    description: 'ชิโอะปัง-ออริจินัล เนื้อนุ่มหอมมันเนย เหมาะสำหรับทานเล่น หรือ ทานคู่กับเครื่องดื่ม',
    descriptionEn: 'Original ShioPan is soft, rich, and buttery—perfect as a snack or paired with your favorite drink.',
    variants: [
      { name: 'Original', price: 39, sku: 'CBK-SHP-001' },
      { name: 'Charcoal', price: 49, sku: 'CBK-SHP-016' },
    ],
  },
  'CBK-SHP-016': {
    name: 'ShioPan - Charcoal', thai: 'ชิโอะปัง-ชาโคล', price: 49,
    description: 'ชิโอะปังแป้งชาโคล เนื้อนุ่ม หอมเนย รสละมุน เหมาะสำหรับทานเล่นหรือทานคู่เครื่องดื่ม',
    descriptionEn: 'Soft charcoal ShioPan with a gentle buttery aroma, ideal as a snack or paired with a drink.',
    mergeInto: 'CBK-SHP-001',
  },
  'CBK-SHP-002': { name: 'ShioPan - Oreo Whipped Cream', price: 69, descriptionEn: 'Soft ShioPan filled with whipped cream and crunchy Oreo cookies.' },
  'CBK-SHP-003': { name: 'ShioPan - Strawberry Whipped Cream', price: 69, descriptionEn: 'Soft ShioPan with whipped cream and strawberry for a bright sweet-tart finish.' },
  'CBK-SHP-004': { name: 'ShioPan - Nutella Strawberry Crumble', price: 69, descriptionEn: 'Nutella, strawberry, and crumble bring rich chocolate, fruit, and crunch together.' },
  'CBK-SHP-005': { name: 'ShioPan - Banoffee', price: 69, descriptionEn: 'Banoffee-style ShioPan layered with banana, whipped cream, and caramel sauce.' },
  'CBK-SHP-006': { name: 'ShioPan - Caramel Banana Crumble', price: 69, descriptionEn: 'Banana and caramel ShioPan finished with a crisp crumble topping.' },
  'CBK-SHP-007': { name: 'ShioPan - Nutella Banana Crumble', price: 69, descriptionEn: 'Nutella, banana, and crumble create a rich, layered bite.' },
  'CBK-SHP-008': { name: 'ShioPan - Strawberry Whip Crumble', price: 69, descriptionEn: 'Whipped cream, strawberry, and crumble deliver a creamy, fruity crunch.' },
  'CBK-SHP-009': { name: 'ShioPan - Brownie Whipped Cream', price: 69, descriptionEn: 'Whipped cream and brownie pieces make this a soft, chocolate-forward ShioPan.' },
  'CBK-SHP-010': { name: 'ShioPan - Marshmallow Whipped Cream', price: 69, descriptionEn: 'Fluffy whipped cream and marshmallow give this ShioPan a soft, mellow sweetness.' },
  'CBK-SHP-011': { name: 'ShioPan - Foi Thong Whipped Cream', price: 69, descriptionEn: 'Whipped cream and foi thong pair soft bakery texture with fragrant Thai sweetness.' },
  'CBK-SHP-012': { name: 'ShioPan - Nutella Banana', price: 69, descriptionEn: 'Nutella and banana form a rich, familiar chocolate-fruit pairing.' },
  'CBK-SHP-013': { name: 'ShioPan - Blueberry Whipped Cream', price: 69, descriptionEn: 'Whipped cream and blueberry add a fragrant, gently sweet-tart finish.' },
  'CBK-SHP-014': { name: 'ShioPan - Dark Chocolate', price: 69, descriptionEn: 'Dark chocolate coating brings a bold cocoa finish for chocolate lovers.' },
  'CBK-SHP-015': { name: 'ShioPan - Dark Chocolate Almond', price: 69, descriptionEn: 'Dark chocolate coating and roasted almond add rich cocoa and nutty crunch.' },
};

const burntCheesecakeCost = {
  sourceDate: '2026-08-20',
  materialCostPerBatch: 387.968,
  overheadPercent: 10,
  targetProfitPercentInSource: 50,
  laborCostPerBatch: 88,
  approvedBatchCostBasis: 729,
  unitsPerBatch: 10,
  costPerUnit: 72.9,
  sellingPrice: 69,
  grossProfitPerUnit: -3.9,
  grossMarginPercent: -5.65,
  note: 'ใช้ฐานต้นทุนเดียวกันทั้ง 5 รสตามภาพเจ้าของ; ยังไม่รวมค่าธรรมเนียมช่องทาง ท็อปปิงเฉพาะรส และบรรจุภัณฑ์เพิ่มเติม',
};

const cheesecakes = [
  { id: 'CBK-CHK-016', name: 'Burnt Cheesecake - Original', thai: 'ชีสเค้กหน้าไหม้ ออริจินอล', slug: 'burnt-cheesecake-original', orderType: 'Original' },
  { id: 'CBK-CHK-017', name: 'Burnt Cheesecake - Strawberry', thai: 'ชีสเค้กหน้าไหม้ สตรอว์เบอร์รี', slug: 'burnt-cheesecake-strawberry', orderType: 'Fruit' },
  { id: 'CBK-CHK-018', name: 'Burnt Cheesecake - Blueberry', thai: 'ชีสเค้กหน้าไหม้ บลูเบอร์รี', slug: 'burnt-cheesecake-blueberry', orderType: 'Fruit' },
  { id: 'CBK-CHK-019', name: 'Burnt Cheesecake - Nutella Banana', thai: 'ชีสเค้กหน้าไหม้ นูเทลล่ากล้วย', slug: 'burnt-cheesecake-nutella-banana', orderType: 'Nutella' },
  { id: 'CBK-CHK-020', name: 'Burnt Cheesecake - Oreo Whipped Cream', thai: 'ชีสเค้กหน้าไหม้ วิปครีมโอรีโอ้', slug: 'burnt-cheesecake-oreo-whipped-cream', orderType: 'Whipped Cream' },
];

for (const cheesecake of cheesecakes) {
  const record = {
    ...cheesecake,
    group: 'Burnt Cheesecake',
    leadTime: 'สั่งผ่าน LINE OA',
    price: 69,
    description: `${cheesecake.thai} เนื้อชีสเค้กเข้มข้น ขนาด 60 กรัมต่อชิ้น`,
    descriptionEn: `${cheesecake.name}, rich and creamy, 60 g per piece.`,
    details: ['ขนาด 60 กรัม', 'ราคา 69 บาท'],
    image: 'assets/hero/candy-baked-cover.jpeg',
    featured: false,
    soldOut: false,
    costAnalysis: burntCheesecakeCost,
  };
  const existingIndex = products.findIndex((product) => product.id === cheesecake.id);
  if (existingIndex >= 0) products[existingIndex] = { ...products[existingIndex], ...record };
  else products.push(record);
}

for (const product of products) {
  if (!copy[product.id]) continue;
  Object.assign(product, copy[product.id]);
  product.details = (product.details || []).filter((item) => !/^ราคา\s*\d+\s*บาท$/.test(item));
  product.details.push(`ราคา ${product.price} บาท`);
}

fs.writeFileSync(sourcePath, `${JSON.stringify(products, null, 2)}\n`);

const indexPath = path.join(root, 'index.html');
let index = fs.readFileSync(indexPath, 'utf8');
index = index
  .replace('ชิโอะปังแบบเปล่าเริ่มต้น 39 บาท และเมนูไส้อยู่ที่ 59 บาท', 'ชิโอะปัง Original 39 บาท · Charcoal 49 บาท · เมนูไส้ 69 บาท')
  .replace('🥐 ชิโอะปัง 16 เมนู', '🥐 ชิโอะปัง 15 เมนู · 2 แบบแป้ง')
  .replace('ชิโอะปัง 16 เมนู · ราคาเริ่มต้น 39 บาท', 'ชิโอะปัง 15 เมนู · Original 39 / Charcoal 49 บาท')
  .replace('89 บาท / ถ้วย', '69 บาท / ถ้วย')
  .replace('BAKERY.map(p=>{', 'BAKERY.filter(p=>!p.mergeInto).map(p=>{');
fs.writeFileSync(indexPath, index);

const publicProducts = products.filter((product) => !product.mergeInto);
const csv = (value = '') => `"${String(value).replaceAll('"', '""')}"`;
const shopifyHeader = ['Handle','Title','Body (HTML)','Vendor','Product Type','Tags','Published','Option1 Name','Option1 Value','Variant SKU','Variant Price','Variant Inventory Policy','Variant Fulfillment Service','Variant Requires Shipping','Variant Taxable','Image Src','Image Alt Text','Status'];
const shopifyRows = [];
for (const product of publicProducts) {
  const handle = product.id === 'CBK-SHP-001' ? 'original-shio-pan' : product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const variants = product.variants || [{ name: 'Default', price: product.price, sku: product.id }];
  variants.forEach((variant, index) => {
    shopifyRows.push([
      handle,
      index === 0 ? product.name : '',
      index === 0 ? `<p>${product.description}</p><p>${product.descriptionEn || ''}</p>` : '',
      'CandyBaked Factory',
      product.group === 'Burnt Cheesecake' ? 'Burnt Cheesecake' : 'Shio Pan',
      product.group === 'Burnt Cheesecake' ? 'Candy Baked,Instagram Product,Burnt Cheesecake' : 'Candy Baked,Instagram Product,ShioPan',
      'TRUE',
      'Dough',
      variant.name,
      variant.sku,
      variant.price,
      'continue',
      'manual',
      'TRUE',
      'TRUE',
      index === 0 ? (product.image.startsWith('http') ? product.image : `https://candybaked.ogenicchocolate.com/${product.image}`) : '',
      index === 0 ? product.thai : '',
      'active',
    ]);
  });
}
fs.writeFileSync(path.join(deliveryRoot, 'CANDY_BAKED_SHOPIFY_IMPORT_2026-08-20.csv'), [shopifyHeader, ...shopifyRows].map((row) => row.map(csv).join(',')).join('\n') + '\n');

const cloudflareCatalog = {
  version: '2026-08-20',
  currency: 'THB',
  pricingRules: {
    original: 39,
    charcoal: 49,
    darkChocolate: 69,
    otherShioPan: 69,
    burntCheesecake: 69,
  },
  products: [
    ...publicProducts.map((product) => ({
      id: product.id,
      title: product.name,
      titleTh: product.thai,
      descriptionTh: product.description,
      descriptionEn: product.descriptionEn || '',
      price: product.price,
      variants: product.variants || undefined,
      image: product.image,
      url: `https://candybaked.ogenicchocolate.com/products/${product.id === 'CBK-SHP-001' ? 'original-shio-pan' : product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.html`,
    })),
  ],
};
fs.writeFileSync(path.join(deliveryRoot, 'CANDY_BAKED_CLOUDFLARE_CATALOG_2026-08-20.json'), `${JSON.stringify(cloudflareCatalog, null, 2)}\n`);

fs.writeFileSync(path.join(deliveryRoot, 'CANDY_BAKED_NOTION_UPDATE_2026-08-20.md'), `# Candy Baked — Notion Price & Profit Update\n\nUpdated: 2026-08-20\n\n## Approved selling prices\n\n- ShioPan Original: 39 THB\n- ShioPan Charcoal: 49 THB\n- All other ShioPan items: 69 THB\n- Burnt Cheesecake (all five flavors): 69 THB\n\n## Burnt Cheesecake profit and loss\n\n- Shared material cost per batch: 387.968 THB\n- Overhead: 10%\n- Target profit in source document: 50%\n- Labor per batch: 88 THB\n- Approved batch cost basis: 729 THB\n- Yield: 10 pieces\n- Cost basis per piece: 72.90 THB\n- Selling price per piece: 69 THB\n- Gross loss per piece: -3.90 THB\n- Gross margin: -5.65% before channel fees\n- Apply the same cost basis to all five flavors.\n`);

fs.writeFileSync(path.join(deliveryRoot, 'CANDY_BAKED_GITHUB_CHANGELOG_2026-08-20.md'), `# Candy Baked menu refresh — 2026-08-20\n\n## Changes\n\n- Standardized product naming to ShioPan format.\n- Combined product 01 as ShioPan Original / Charcoal.\n- Added Original 39 THB and Charcoal 49 THB variants.\n- Set all remaining ShioPan items to 69 THB.\n- Added all five Burnt Cheesecake products at 69 THB.\n- Added the shared Burnt Cheesecake cost basis: 729 THB per 10 pieces, or 72.90 THB per piece.\n- At 69 THB, each Burnt Cheesecake flavor shows a gross loss of 3.90 THB per piece before channel fees.\n- Updated Cloudflare-ready catalog and Shopify import file.\n`);

console.log(`Updated ${products.length} bakery records and created delivery files in ${deliveryRoot}`);
