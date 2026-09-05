# WF Sequence A1-A6 Status

Shortcut: `/WF.Sequence of Work Steps.Sequence of Work Steps.A,A1-A6`

- Work mode required: **No**
- Source of truth: **Google Drive + the two canonical Google Docs**
- Canonical step order: **A1 → A2 → A3 → A4 → A5 → A6**
- A4 canonical categories: **14**
- A4 canonical product/data records: **133**
- A4 canonical media files: **97**
- A5 posters: **18, PT1 → PT18**
- Production publish: **BLOCKED until validator passes**

## Canonical corrections applied

- A1 label is `[A1]-[Item1]:Website header video`.
- A2 repository files were remapped so `row2-1..4` now follow Drive Figure 1..4 in normal numeric order.
- A4 removed non-canonical records/assets: 1.17 category cover, 3.1, duplicate 9.6 and repository-only legacy extras.
- A4 group 06 item 6.7 is `วาฟเฟิลเพลน | Waffle Plain | プレーンワッフル | 69`.
- A4 group 13 is canonical Ramen/MAMA media group with 13 media files.
- A4 group 14 is canonical Drinks/Shakes/Coffee media group with 7 media files.
- Legacy repository category 15 was deleted from this branch.
- A5 poster blobs were reordered to match Drive PT1 → PT18 by exact source file size identity.
- Non-canonical derived story JPEGs were deleted from this branch.

## Current validator state

A4 now validates at **133/133 records** and **97/97 media**, with no legacy category warning.

The only current blockers are the two exact Drive source binaries that are not yet present in the repository:

1. A3 `Story 1 & Text` → expected repo path `assets/story/story-1-and-text.png`
2. A6 `Story The End.png` → expected repo path `assets/story/story-the-end.png`

Do not substitute compressed/legacy JPEGs for these source images. Production Cloudflare publish stays blocked until both exact source binaries are synchronized and `scripts/validate-wf-sequence.mjs` passes.
