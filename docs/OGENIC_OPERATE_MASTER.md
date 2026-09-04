# OGENIC CORE HARNESS — OPERATE MASTER

Status: STAGING / CHAT-MODE FIRST
Brand: Black 40% · Type Violet 40% · White 20%
Shorthand: CF = Cloudflare · CN = Candy

## Operating law
Chat is the Operator Console. Agents are replaceable; HARNESS is persistent. Prefer deterministic execution over repeated model reasoning. Read before write. Smallest reversible change. Preview/verify before production. Never invent source data. Never claim an external success until verified.

## 01 — COMMAND & SOLUTION ARCHITECTURE
- Intent Router
- Solution / Enterprise Architecture
- API & MCP contracts
- System / data-flow design
- Policy & approval gates

## 02 — KNOWLEDGE & CONTEXT FABRIC
- Notion / RAG / Project context
- Source Registry: CURRENT / APPROVED / DEPRECATED
- Executable Memory: skills, playbooks, recipes, failure recovery
- Context retrieval / repo map / search

## 03 — DEVELOPMENT & SOURCE FABRIC
- Coding / editors / IDE
- Git / VCS / repository hosting
- Package managers / build / bundlers
- Testing / lint / typecheck / API tests
- CI/CD / deployment

## 04 — X: EXECUTION FABRIC
- Tool Registry and capability discovery
- MCP tools / child MCP bridges
- Shell / process / filesystem / browser / WSL execution nodes
- GitHub / CF / Vercel / n8n execution surfaces
- Permission classes: READ → WRITE → EXECUTE → DANGEROUS
- Checkpoint / recovery / audit

## 05 — Y: IDENTITY & SESSION CONTINUITY
- Machine / Workload Identity
- Trusted Runtime Environment
- Session Registry
- Session Broker / Recovery / Fallback Chain
- Capability Broker / delegated authorization
- OIDC / token exchange / ephemeral credentials
- Infisical holds real secrets; Git and docs hold no raw secrets
- Never harvest raw cookies or bypass provider authorization

## 06 — Z: CONVERGENCE & WORKFLOW FABRIC
- n8n orchestration
- Desired State ↔ Actual State
- Discover / snapshot / hash / diff
- NEW / MODIFIED / DRIFT / MISSING / DISABLED / ERROR
- Reconcile changed items only
- Validate → test → promote → rollback → audit

## 07 — DATA & STORAGE FABRIC
- Google Drive canonical business assets
- Structured databases / object storage / KV/state stores
- Data pipeline / ETL / indexing
- Canonical manifests + hashes

## 08 — OBSERVABILITY & GOVERNANCE
- Logs / traces / metrics / runtime health
- Correlation IDs / idempotency / dead letter / retry
- Security / IAM / compliance / audit
- Incident and recovery paths

## 09 — AGENT & INTELLIGENCE RUNTIME
Agents are workloads, not the architecture.
- ChatGPT / Codex / Claude / future models
- Planner / reasoning / tool selection
- Structured outputs
- Agent instances attach to HARNESS contracts

## 10 — PRODUCT & BUSINESS CONNECTORS
- CN / Shopify / delivery / social / communication
- GitHub / Notion / Linear / Vercel / CF / n8n
- Connector provisioning: SELECT → AUTHORIZE → PROVISION → VERIFY → LIVE

# MAIN MODULE — CN MAINPHOTO BUILDING TO CF

Source of truth: Google Drive / Main Photo
Strict traversal: A1 → A2 → A3 → A4 → A5. Never skip or reorder.

## A1 — Head Website Hero + 4 Photo Under Hero
- 1.1 Read folder/file names as metadata
- 1.2 Inventory assets
- 1.3 Hash and map assets
- 1.4 No guessing / no duplicate generation

## A2 — Story on Website
- 2.1 Read after A1 only
- 2.2 Preserve source order and canonical wording/assets

## A3 — On Website Product
- 3.1 Read `1-Data Details Product & Prosess Master`
- 3.2 Product Master is canonical product data
- 3.3 Traverse numbered product groups in numeric order
- 3.4 Traverse product files in numeric item order
- 3.5 Map product data ↔ canonical image
- 3.6 Missing/ambiguous mapping = REPORT, never guess

## A4 — Poster
- 4.1 Process only after A3
- 4.2 Preserve canonical asset relationship

## A5 — Story on Website
- 5.1 Process only after A4
- 5.2 Final content/asset reconciliation

## Build pipeline
SCAN → INDEX → HASH → DIFF → MAP → BUILD → VALIDATE → CF PREVIEW → VERIFY → REPORT

Rules:
- unchanged = SKIP
- new/changed = process only affected item
- deleted source = do not recreate automatically
- no production promotion without explicit approval
- source files in Drive are never renamed/deleted by this pipeline

# CHAT-MODE OPERATE CONTRACT

Normal chat is the primary control surface whenever connected capabilities allow the task.

`Intent → Retrieve Canonical Context → Discover Capability → Plan Minimal Diff → Execute → Verify → Persist Result → Report`

Do not force Work mode for tasks that can be completed with normal-chat connectors/tools. If a required capability is unavailable, mark it `CAPABILITY_REQUIRED` and continue all independent steps rather than blocking the whole run.

## Session / Work / Chat continuity
Persist operating knowledge, not hidden chain-of-thought:
- decisions and constraints
- canonical paths and source precedence
- tool contracts / capability map
- commands / shortcuts
- verified outcomes
- failures and recovery recipes
- session/auth health metadata without raw credentials

A chat/session may end; the operating system must remain recoverable from canonical artifacts.

# SHORTCUTS
- `/OG.help` — show command map
- `/OG.status` — system/capability health
- `/OG.tools` — tool registry
- `/OG.context` — load canonical operating context
- `/OG.sync` — reconcile canonical state
- `/OG.audit` — audit current state
- `/CN.scan` — scan Main Photo A1→A5
- `/CN.diff` — changed/new/missing report
- `/CN.build` — build changed CN assets/data
- `/CN.preview` — deploy CF preview only
- `/CN.verify` — validate preview
- `/CN.promote` — production promotion; explicit approval required
- `/Z.reconcile` — n8n convergence run
- `/Y.health` — identity/session continuity status
- `/X.tools` — execution capability inventory

# AGENT HANDOFF CONTRACT
Every agent should receive the same minimal bootstrap:
1. Read this OPERATE MASTER.
2. Load CURRENT/APPROVED project context.
3. Discover available tools instead of assuming access.
4. Use canonical source precedence.
5. Execute deterministic work mechanically; use model reasoning only for ambiguity.
6. Persist verified decisions/results back to canonical artifacts.
7. Never expose secrets or silently promote production.

# DAILY CONTEXT SYNC TARGET
Daily sync should reconcile verified operating metadata across GitHub + Notion/RAG + agent handoff artifacts. It should not copy raw secrets, private session cookies, or hidden model reasoning. Update only changed context and report drift/errors.
