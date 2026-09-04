# CN Main Photo Backup Manifest

Status: IN PROGRESS / NOT YET VERIFIED COMPLETE
Canonical target: 100 image files total
Source of truth: Google Drive `Main Photo`
Traversal: A1 → A2 → A3 → A4 → A5
Linear tracker: OGE-5

## Preservation rules
- Preserve prior 55-file set.
- Do not recreate deleted files by inference.
- Do not rename or delete Drive source files from this backup workflow.
- Missing/ambiguous mapping = REPORT, never guess.
- Unchanged = SKIP.
- Production deploy remains approval-gated.

## Verified inventory so far

### A1 — Head Website Hero + 4 Photo Under Hero
- `1hPb4E77atDaGLCnqVtHKIpvxbz3uYZ9O` — หัวเว็ปเเถว1 Hero (ไม่เอาเสียง) — video/mp4 — 889179 bytes
- `1nME-r2l_RXFkvlfU6F85F8CRP3EnG5fv` — แถว2 ถัดจากคลิป hero ลงมา รูปที่ 5 — image/png — 2450770 bytes
- `1ulCCX2vD8ODgNBpq_wKILdlFt_2pQkTI` — แถว2 ถัดจากคลิป hero ลงมา รูปที่ 3 — image/png — 2300891 bytes
- `1hnb6nCtACTHXYJoj113WLjnQq_2RLMTq` — แถว2 ถัดจากคลิป hero ลงมา รูปที่ 2 — image/png — 2226906 bytes
- `1tnv1sucC6--8QM9X2xYIsKWkEFPYhQPB` — แถว2 ถัดจากคลิป hero ลงมา รูปที่ 1 — image/png — 2337109 bytes

A1 image count verified: 4
A1 non-image asset count verified: 1

### A2 — Story on Website
- `1LV6x1Xg__epdjQBwccq8vddQidtXzQKr` — Story 1 up — image/png — 1811138 bytes

A2 image count verified: 1

## Pending inventory
- A3 — On Website Product — pending full recursive inventory
- A4 — Poster — pending
- A5 — Story on Website — pending

## Completion gate
This manifest MUST NOT be marked COMPLETE until:
1. A1→A5 recursive inventory is finished.
2. Verified image count = 100.
3. Duplicate/ambiguous mappings are reported.
4. Banoffee canonical image mapping is verified.
5. Product price render source is verified.
6. CF preview passes QA.
