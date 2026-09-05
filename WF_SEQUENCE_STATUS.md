# WF Sequence A1-A6 Status

Shortcut: `/WF.Sequence of Work Steps.Sequence of Work Steps.A,A1-A6`

- Work mode required: **No**
- Canonical step order: **A1 → A2 → A3 → A4 → A5 → A6**
- A4 canonical categories: **14**
- A4 canonical product/data records: **135**
- A4 canonical media mappings: **100**
- A5 posters: **18**
- Runtime media source: **repository-local assets**
- Google Drive role: **source/sync only**

## Current diagnostic

A2 repository filenames do not match the canonical Figure labels numerically. The manifest therefore maps by content:

1. Figure 1 → `assets/website/row2-1.png`
2. Figure 2 → `assets/website/row2-4.png`
3. Figure 3 → `assets/website/row2-3.png`
4. Figure 4 → `assets/website/row2-2.png`

A4 category 13 currently has **5 repository-local media files**, while the canonical Drive source contains **13 media files** for the noodle packages. The remaining 8 media files must be synchronized before production publish.

Several legacy catalog folders contain extra files beyond the canonical media count. Extra files must be excluded by manifest ordering rather than rendered automatically.

Production Cloudflare publish stays blocked until `scripts/validate-wf-sequence.mjs` passes.
