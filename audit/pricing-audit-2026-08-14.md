# Candy Baked pricing audit — 2026-08-14

Scope: price and price-related copy only. No layout, tracking, payment, or deployment changes.

## Approved storefront prices

| SKU group | Previous storefront price | New price | Change per unit |
|---|---:|---:|---:|
| CBK-SHP-001 — Original Shio Pan | 49 THB | 39 THB | -10 THB |
| CBK-SHP-016 — Chocolate Dough Shio Pan | 59 THB | 49 THB | -10 THB |
| CBK-SHP-002…015 — filled menus | 89 THB | 59 THB | -30 THB |

Required copy:

> เปลี่ยนเป็นแป้งช็อกโกแลต +10 บาท
>
> ราคาที่แสดงเป็นราคาสินค้าหน้าร้าน ชิโอะปังแบบเปล่าเริ่มต้น 39 บาท และเมนูไส้อยู่ที่ 59 บาท ฟรีค่าส่งเมื่อสั่งครบ 250 บาท · ภายใน 10 กิโลเมตรแรก

## Cost and profit recalculation

The Product Master rows do not contain verified values for material cost, packaging cost, labor cost, overhead, fixed-cost allocation, shipping subsidy, or channel/payment fees. Numeric profit and margin figures must not be invented.

For each SKU, with verified total variable cost per unit `C`:

- New gross profit per unit = `new price - C`
- New gross margin % = `(new price - C) / new price × 100`
- Gross-profit change per unit, assuming cost is unchanged = `new price - previous price`
- Revenue for quantity `Q` = `new price × Q`

Accordingly, gross profit per unit decreases by 10 THB for CBK-SHP-001 and CBK-SHP-016, and by 30 THB for CBK-SHP-002…015, assuming unchanged cost. Notion formula fields will recalculate automatically once verified cost inputs are supplied.

## Verification result

- Product prices in the website catalog, SSR HTML, runtime catalog, cart migration map, GitHub JSON, Notion Product Master, and Notion Product Data Lite agree.
- Old price-copy strings `ราคาเริ่มต้น 49 บาท`, `ชิโอะปังแบบเปล่าเริ่มต้น 49 บาท`, and `เมนูไส้อยู่ที่ 89 บาท` are absent from the preview bundle.
- Production was not deployed. Lovable was not accessed or changed.
