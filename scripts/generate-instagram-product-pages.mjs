import fs from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve(import.meta.dirname, '..');
const outputRoot = path.resolve(process.argv[2] || projectRoot);
const products = JSON.parse(
  fs.readFileSync(path.join(projectRoot, 'bakery-products.json'), 'utf8'),
);

const site = 'https://candybaked.ogenicchocolate.com';
const lineUrl = 'https://page.line.me/014refkl';
const brand = 'Candy Baked Factory';
const generatedDate = '2026-08-20';

const slugs = {
  'CBK-SHP-001': 'original-shio-pan',
  'CBK-SHP-002': 'oreo-whipped-cream',
  'CBK-SHP-003': 'strawberry-whipped-cream',
  'CBK-SHP-004': 'nutella-strawberry-crumble',
  'CBK-SHP-005': 'banoffee',
  'CBK-SHP-006': 'caramel-banana-crumble',
  'CBK-SHP-007': 'nutella-banana-crumble',
  'CBK-SHP-008': 'strawberry-whip-crumble',
  'CBK-SHP-009': 'brownie-whipped-cream',
  'CBK-SHP-010': 'marshmallow-whipped-cream',
  'CBK-SHP-011': 'foi-thong-whipped-cream',
  'CBK-SHP-012': 'nutella-banana',
  'CBK-SHP-013': 'blueberry-whipped-cream',
  'CBK-SHP-014': 'dark-chocolate',
  'CBK-SHP-015': 'dark-chocolate-almond',
  'CBK-SHP-016': 'chocolate-dough-shio-pan',
  'CBK-CHK-016': 'burnt-cheesecake-original',
  'CBK-CHK-017': 'burnt-cheesecake-strawberry',
  'CBK-CHK-018': 'burnt-cheesecake-blueberry',
  'CBK-CHK-019': 'burnt-cheesecake-nutella-banana',
  'CBK-CHK-020': 'burnt-cheesecake-oreo-whipped-cream',
};

function html(value = '') {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[character]);
}

function csv(value = '') {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function absoluteImage(image) {
  if (/^https?:\/\//.test(image)) return image;
  return `${site}/${image.replace(/^\//, '')}`;
}

function productUrl(product) {
  return `${site}/products/${slugs[product.id]}.html`;
}

function productPage(product) {
  const url = productUrl(product);
  const image = absoluteImage(product.image);
  const availability = product.soldOut ? 'OutOfStock' : 'InStock';
  const availabilityLabel = product.soldOut ? 'สินค้าหมด' : 'มีสินค้า';
  const details = (product.details || []).map((detail) => `<li>${html(detail)}</li>`).join('');
  const isOriginal = product.id === 'CBK-SHP-001';
  const variants = product.variants || [{ name: product.name, price: product.price, sku: product.id }];
  const offers = variants.map((variant) => ({
    '@type': 'Offer',
    url,
    priceCurrency: 'THB',
    price: String(variant.price),
    sku: variant.sku,
    availability: `https://schema.org/${availability}`,
    itemCondition: 'https://schema.org/NewCondition',
    seller: { '@type': 'Organization', name: brand },
  }));
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.thai} — ${product.name}`,
    image: [image],
    description: product.description,
    sku: product.id,
    brand: { '@type': 'Brand', name: brand },
    offers: isOriginal ? offers : offers[0],
    potentialAction: {
      '@type': 'BuyAction',
      target: lineUrl,
    },
  };

  return `<!doctype html>
<html lang="th">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <title>${html(product.thai)} ราคา ${product.price} บาท | Candy Baked</title>
  <meta name="description" content="${html(product.description)} ราคา ${product.price} บาท สั่งซื้อผ่าน LINE OA">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="product">
  <meta property="og:site_name" content="Candy Baked Factory × OGENIC">
  <meta property="og:title" content="${html(product.thai)} — ${html(product.name)}">
  <meta property="og:description" content="${html(product.description)} ราคา ${product.price} บาท">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:alt" content="${html(product.thai)}">
  <meta property="product:retailer_item_id" content="${html(product.id)}">
  <meta property="product:price:amount" content="${product.price}.00">
  <meta property="product:price:currency" content="THB">
  <meta property="product:availability" content="${product.soldOut ? 'out of stock' : 'in stock'}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${image}">
  <script type="application/ld+json">${JSON.stringify(structuredData).replaceAll('<', '\\u003c')}</script>
  <style>
    :root{color-scheme:light;--paper:#fffaf7;--card:#fff;--ink:#211914;--muted:#76665d;--line:#eadbd3;--accent:#8c463f;--gold:#c99555}
    *{box-sizing:border-box}body{margin:0;background:linear-gradient(145deg,#fffaf7,#f8dfdd);color:var(--ink);font-family:system-ui,-apple-system,"Segoe UI","Noto Sans Thai",sans-serif;line-height:1.55}
    a{color:inherit;text-decoration:none}.shell{max-width:1080px;margin:auto;padding:20px 18px 64px}.top{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:24px}
    .brand{display:flex;align-items:center;gap:10px;font-weight:800}.brand img{width:46px;height:46px;border-radius:50%;object-fit:cover;border:1px solid var(--line)}.back{color:var(--muted);font-size:14px}
    .product{display:grid;grid-template-columns:minmax(0,1.04fr) minmax(300px,.96fr);overflow:hidden;border:1px solid var(--line);border-radius:28px;background:var(--card);box-shadow:0 20px 64px rgba(65,35,24,.12)}
    .media{background:#f1e4dd;min-height:520px}.media img{width:100%;height:100%;min-height:520px;display:block;object-fit:cover}.copy{padding:clamp(28px,5vw,58px)}
    .eyebrow{margin:0;color:var(--accent);font-size:12px;font-weight:900;letter-spacing:.12em}.status{display:inline-flex;margin-top:14px;padding:6px 11px;border-radius:999px;background:#e8f5ea;color:#246b32;font-size:12px;font-weight:800}
    h1{font:clamp(34px,5vw,58px)/1.04 Georgia,"Times New Roman",serif;letter-spacing:-.035em;margin:14px 0 6px}.english{margin:0;color:var(--muted);font-size:17px}.description{margin:22px 0;color:var(--muted)}
    .price{font:700 38px/1 Georgia,"Times New Roman",serif}.price small{font:600 16px system-ui,-apple-system,"Segoe UI",sans-serif}.variant-prices{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:20px 0}.variant-price{border:1px solid var(--line);border-radius:18px;padding:14px;background:var(--paper);text-align:left;cursor:pointer}.variant-price.active{background:var(--ink);color:white;border-color:var(--ink)}.variant-price b,.variant-price span{display:block}.variant-price b{font-size:15px}.variant-price span{font:700 28px/1.2 Georgia,serif;margin-top:5px}.facts{display:flex;flex-wrap:wrap;gap:8px;padding:0;margin:20px 0;list-style:none}.facts li{padding:7px 11px;border-radius:999px;background:#f6ece7;font-size:12px}
    .buy{display:flex;align-items:center;justify-content:center;min-height:52px;padding:12px 18px;border-radius:999px;background:#06c755;color:white;font-weight:900}.note{margin:13px 0 0;color:var(--muted);font-size:12px}
    .payment{margin-top:22px;padding:18px;border:1px solid var(--line);border-radius:18px;background:var(--paper)}.payment h2{margin:0 0 8px;font-size:16px}.payment p{margin:0;color:var(--muted);font-size:13px}
    footer{text-align:center;color:var(--muted);font-size:12px;padding-top:30px}@media(max-width:760px){.product{grid-template-columns:1fr}.media,.media img{min-height:auto;aspect-ratio:4/3}.copy{padding:28px 22px}.top{align-items:flex-start}.back{padding-top:12px}}
  </style>
</head>
<body>
  <main class="shell">
    <nav class="top" aria-label="เมนูหลัก">
      <a class="brand" href="${site}/"><img src="${site}/assets/brand/candy-baked-logo.webp" alt="Candy Baked"><span>Candy Baked × OGENIC</span></a>
      <a class="back" href="${site}/#bakery-menu">ดูสินค้าทั้งหมด</a>
    </nav>
    <article class="product">
      <div class="media"><img src="${image}" alt="${html(product.thai)}"></div>
      <div class="copy">
        <p class="eyebrow">${html(product.id)} · ${html(product.orderType)}</p>
        <span class="status">${availabilityLabel}</span>
        <h1>${html(product.thai)}</h1>
        <p class="english">${html(product.name)}</p>
        <p class="description">${html(product.description)}${product.descriptionEn ? `<br><small>${html(product.descriptionEn)}</small>` : ''}</p>
        ${isOriginal ? `<div class="variant-prices" role="group" aria-label="เลือกชนิดแป้ง"><button class="variant-price active" type="button" aria-pressed="true"><b>Original</b><span>39 บาท</span></button><button class="variant-price" type="button" aria-pressed="false"><b>Charcoal</b><span>49 บาท</span></button></div>` : `<div class="price">${product.price} <small>บาท / ชิ้น</small></div>`}
        <ul class="facts">${details}</ul>
        <a class="buy" href="${lineUrl}" target="_blank" rel="noopener">สั่งซื้อสินค้านี้ผ่าน LINE OA</a>
        <p class="note">ฟรีค่าส่งเมื่อสั่งครบ 250 บาท ภายใน 10 กิโลเมตรแรก · กรุณาสอบถามคิวและสต็อกก่อนชำระเงิน</p>
        <section class="payment">
          <h2>วิธีสั่งซื้อและชำระเงิน</h2>
          <p>กดปุ่มสั่งซื้อ แจ้งรหัสสินค้า <strong>${html(product.id)}</strong> และจำนวนผ่าน LINE OA จากนั้นแอดมินจะแจ้งยอด วิธีชำระเงิน และการจัดส่งให้ยืนยันก่อนชำระ</p>
        </section>
      </div>
    </article>
    <footer>© 2026 Candy Baked Factory × OGENIC Chocolate</footer>
  </main>
  ${isOriginal ? `<script>document.querySelectorAll('.variant-price').forEach((button)=>button.addEventListener('click',()=>{document.querySelectorAll('.variant-price').forEach((item)=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',active?'true':'false')})}))</script>` : ''}
</body>
</html>
`;
}

const productDirectory = path.join(outputRoot, 'products');
fs.mkdirSync(productDirectory, { recursive: true });

const publicProducts = products.filter((product) => !product.mergeInto);

for (const product of publicProducts) {
  const slug = slugs[product.id];
  if (!slug) throw new Error(`Missing slug for ${product.id}`);
  fs.writeFileSync(path.join(productDirectory, `${slug}.html`), productPage(product));
}

const cards = publicProducts.map((product) => {
  const image = absoluteImage(product.image);
  return `<a class="card" href="${slugs[product.id]}.html"><img src="${image}" alt="${html(product.thai)}"><span><b>${html(product.thai)}</b><small>${product.price} บาท · ${html(product.id)}</small></span></a>`;
}).join('');

fs.writeFileSync(path.join(productDirectory, 'index.html'), `<!doctype html>
<html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>สินค้าสำหรับ Instagram | Candy Baked</title><meta name="robots" content="index,follow"><style>*{box-sizing:border-box}body{margin:0;background:#fffaf7;color:#211914;font-family:system-ui,-apple-system,"Segoe UI","Noto Sans Thai",sans-serif}.wrap{max-width:1100px;margin:auto;padding:28px 18px 60px}h1{font:clamp(34px,5vw,58px)/1.05 Georgia,serif;margin:10px 0}.intro{color:#76665d}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:28px}.card{overflow:hidden;border:1px solid #eadbd3;border-radius:20px;background:white;color:inherit;text-decoration:none}.card img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover}.card span{display:grid;gap:4px;padding:16px}.card small{color:#76665d}@media(max-width:760px){.grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:480px){.grid{grid-template-columns:1fr}}</style></head><body><main class="wrap"><a href="${site}/">← Candy Baked</a><h1>สินค้าชิโอะปัง</h1><p class="intro">เลือกสินค้าเพื่อเปิดหน้ารายละเอียด ราคา และช่องทางสั่งซื้อ</p><div class="grid">${cards}</div></main></body></html>`);

const feedHeader = ['id', 'title', 'description', 'availability', 'condition', 'price', 'link', 'image_link', 'brand'];
const feedRows = publicProducts.map((product) => [
  product.id,
  `${product.thai} — ${product.name}`,
  product.description,
  product.soldOut ? 'out of stock' : 'in stock',
  'new',
  `${product.price}.00 THB`,
  productUrl(product),
  absoluteImage(product.image),
  brand,
]);
const feed = [feedHeader, ...feedRows].map((row) => row.map(csv).join(',')).join('\n') + '\n';
fs.writeFileSync(path.join(outputRoot, 'meta-catalog.csv'), feed);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicProducts.map((product) => `  <url><loc>${productUrl(product)}</loc><lastmod>${generatedDate}</lastmod></url>`).join('\n')}
</urlset>\n`;
fs.writeFileSync(path.join(outputRoot, 'sitemap-products.xml'), sitemap);

const urlList = publicProducts.map((product) => `${product.id}\t${product.thai}\t${productUrl(product)}`).join('\n');
fs.writeFileSync(path.join(outputRoot, 'INSTAGRAM_PRODUCT_URLS.txt'), `CANDY BAKED — INSTAGRAM PRODUCT URLS\nGenerated: ${generatedDate}\n\n${urlList}\n`);

fs.writeFileSync(path.join(outputRoot, 'README_INSTAGRAM_TH.txt'), `CANDY BAKED — ชุดหน้าสินค้าสำหรับ Instagram\n\nไฟล์ชุดนี้แก้ปัญหา “ไม่ใช่หน้าสินค้า” โดยเพิ่มหน้าสินค้าเฉพาะ 1 รายการต่อ 1 URL จำนวน ${publicProducts.length} รายการ\n\nไฟล์สำคัญ\n- products/*.html: หน้าสินค้าเฉพาะรายชิ้น\n- products/index.html: หน้ารวมลิงก์สินค้า\n- meta-catalog.csv: Data Feed สำหรับ Meta Commerce Manager\n- sitemap-products.xml: Sitemap ของหน้าสินค้า\n- INSTAGRAM_PRODUCT_URLS.txt: รายการ URL สำหรับคัดลอก\n\nสำคัญ\n1. ต้องนำไฟล์ทั้งหมดไปรวมกับไฟล์เว็บไซต์ปัจจุบัน แล้ว Deploy ขึ้นโดเมน candybaked.ogenicchocolate.com ก่อน\n2. ห้ามอัปโหลด ZIP นี้แบบแทนที่เว็บเดิมหากไม่มีไฟล์เว็บปัจจุบันอยู่ใน ZIP\n3. หลัง Deploy ให้เปิด URL ตัวอย่างและตรวจว่าแสดงชื่อ ราคา รูป และปุ่มสั่งซื้อ\n4. จากนั้นคัดลอก URL หน้าสินค้าเฉพาะไปค้นหาใน Instagram เช่น\n   ${site}/products/original-shio-pan.html\n\nหมายเหตุ: หน้าเว็บใช้การสั่งซื้อและรับข้อมูลการชำระเงินผ่าน LINE OA ตามระบบปัจจุบันของร้าน\n`);

console.log(`Generated ${publicProducts.length} product pages in ${outputRoot}`);
