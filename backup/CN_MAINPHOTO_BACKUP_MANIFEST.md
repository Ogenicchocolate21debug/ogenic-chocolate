# CN Main Photo Backup Manifest

Status: AUDIT IN PROGRESS / BACKUP NOT YET VERIFIED COMPLETE
Source of truth: Google Drive `Main Photo`
Traversal: A1 → A2 → A3 → A4 → A5
Linear tracker: OGE-5
Product Master: `A3 PRODUCT MASTER — PRODUCT LIST`
Product Master document ID: `10pJHPVNCensmTFuhfpUEfNQHvbbY_wJaMeB0h_SnANY`
Product Master revision: `ANLCKQkhYZMsbJnNi7tAweQJXvUlDFde6piVshO09obeGy_thuVe__fLEcWr4Dh-6QKxSZoi6Q4Skr69ZmBw`

## Correction after ALL RECHECK
The previous manifest incorrectly treated `100` as the total Main Photo image count.

Verified source inventory is:
- A1: 4 images + 1 MP4 = 5 media
- A2: 1 image
- A3: 100 images across 14 product folders
- A4: 18 images
- A5: 1 image
- **Main Photo total: 125 media = 124 images + 1 MP4**

The A3 count of 100 is an asset/media count, not the number of sellable SKUs. A3 group 01 includes one explicit category-cover asset (`1.17`). Product Master also contains builder/set/topping records that do not map one-to-one to a dedicated A3 image.

## A3 canonical image counts by folder
| Group | Canonical source | Images |
|---|---|---:|
| 01 | Shio Pan | 17 |
| 02 | Burnt Cheesecake | 6 |
| 03 | Fudge Cake | 6 |
| 04 | Buttercream Cake | 3 |
| 05 | Roll Cake | 6 |
| 06 | Waffle Cake | 8 |
| 07 | Chiffon Cake | 2 |
| 08 | Banoffee | 2 |
| 09 | Muffin & Cupcake | 7 |
| 10 | Pound Cake | 10 |
| 11 | Bread & Bun | 8 |
| 12 | Croissant & Danish | 5 |
| 13 | Ramen & Thai Noodles media | 13 |
| 14 | Drinks, Shakes & Coffee | 7 |
| **TOTAL** |  | **100** |

## Confirmed source distinctions
- `1.4 Shiopan Banoffee` is a Shio Pan product and is not the same asset as Banoffee group 08.
- Banoffee group 08 has exactly 2 canonical source images: Blueberry Banoffee and Strawberry Banoffee.
- Drive source is not to be renamed, deleted, recreated, or deduplicated by inference.

## GitHub drift found during ALL RECHECK
Status vocabulary: `PASS / WARN / DRIFT / DUPLICATE / MISSING / EXTRA / BLOCKED`.

- `DRIFT` — legacy GitHub catalog exposes 15 category scripts/folders while canonical A3 has 14 groups.
- `DUPLICATE` — `catalog/cat08.js` exposes 4 Banoffee entries while canonical group 08 has 2 images; legacy `prev.*` entries are mixed with the 2 named Banoffee entries.
- `DRIFT` — GitHub `cat14` is Ramen & Thai Noodles although canonical Ramen is group 13.
- `EXTRA/DRIFT` — GitHub `cat15` is Drinks although canonical Drinks is group 14; canonical A3 has no group 15.
- `WARN` — A4 source titles use `.PNG` names but many Drive MIME types are JPEG. Preserve source metadata; do not rename merely to normalize extensions.
- `DRIFT` — current production backup script is Shopify/`bakery-products.json` based, not Main Photo A1→A5 based. It can therefore preserve stale price/image mappings even when Drive canonical data is newer.
- `WARN` — the isolated skill-demo page validates orchestration and group summaries, but does not prove that all 125 source media are backed up or rendered.

## Preservation rules
- Preserve prior/legacy files until the canonical mapping is verified.
- Do not recreate deleted Drive files by inference.
- Do not rename or delete Drive source files from this backup workflow.
- Missing/ambiguous mapping = REPORT, never guess.
- Unchanged = SKIP.
- No production deploy without explicit approval.
- Never use symptom-only patching as the deploy gate.

## Mandatory ALL-RECHECK gate
Every CN build/deploy must run this sequence:

`SOURCE → PRODUCT MASTER → MEDIA INVENTORY → BACKUP MAP → DUPLICATE/EXTRA CHECK → PRICE/DATA DIFF → BUILD INPUTS → RENDER PATHS → WORKFLOW TARGET → CF PREVIEW → QA → REPORT`

A deploy is blocked while any required layer is `DRIFT`, `DUPLICATE`, `MISSING`, `EXTRA`, or `BLOCKED`.

## Completion gate
This manifest MUST NOT be marked COMPLETE until:
1. Every A1→A5 source media item has a canonical ID/path record.
2. GitHub backup mapping covers all 125 source media or explicitly records an approved reference strategy.
3. A3 is exactly 14 groups and 100 source images, with no unintended duplicate mapping.
4. Product Master prices/data are reconciled against build data; no stale Shopify-derived value silently wins.
5. A2/A5 story media and A4 posters are verified in build/render outputs, not only listed in metadata.
6. Preview workflow is isolated from production and passes validation.
7. CF preview passes visual/content QA.
8. Production remains approval-gated.
