# OGENIC — DELIVERY & APP INTEGRATION MASTER MAP

> **PUBLIC-SAFE METADATA ONLY**
> Do NOT put real API keys, tokens, passwords, OAuth codes, cookies, or private keys in this file.
> Put actual values in **GitHub → Settings → Secrets and variables → Actions** or in **Infisical**.

## 1. DELIVERY / DEPLOYMENT

### Vercel
- Purpose: web deployment / preview / production
- Secret reference: `VERCEL_TOKEN`
- Source of truth: Infisical or GitHub encrypted Secret
- Status: VERIFY EXISTING CONNECTION
- Action: reuse existing credential; do not rotate unless required

### n8n Cloud
- Purpose: automation / orchestration / webhook execution
- Secret references:
  - `N8N_API_KEY`
  - `N8N_WEBHOOK_SECRET`
- Source of truth: Infisical / n8n encrypted credentials
- Status: EXISTING CREDENTIALS — PRESERVE / VERIFY

### GitHub
- Purpose: source control / CI-CD / deployment bridge
- Preferred auth: GitHub App or OIDC where practical
- Secret references:
  - `GITHUB_TOKEN` (use GitHub-provided runtime token where possible)
- Status: CONNECTED

## 2. APP / APPLICATION INTEGRATIONS

### OpenAI
- Purpose: AI model provider
- Secret reference: `OPENAI_API_KEY`
- Source of truth: Infisical / encrypted runtime secret
- Existing n8n credential: PRESERVE / VERIFY

### Infisical
- Purpose: central secret management
- Secret reference: `INFISICAL_TOKEN`
- Source of truth: Infisical
- Existing n8n credential: PRESERVE / VERIFY

### HTTP Basic Auth
- Purpose: existing protected integration
- Secret reference: `HTTP_BASIC_AUTH_*`
- Source of truth: n8n credential store / Infisical
- Existing credential: PRESERVE / VERIFY

### Notion
- Purpose: knowledge / documentation / source-of-truth layer
- Secret reference: `NOTION_TOKEN` (if required by runtime integration)
- Status: verify actual ChatGPT / n8n connection separately

### GitHub App / MCP
- Purpose: AI-assisted repository operations
- Secret reference: provider-managed connection
- Status: verify actual account connection

## 3. PRESERVATION RULE

EXISTING → VERIFY → PRESERVE → REUSE

Do NOT create a new token merely because:
- ChatGPT account changed
- Project changed
- Vercel was reconnected
- n8n workflow was imported again

Rotate only if the credential is compromised, expired, revoked, or explicitly requested.

## 4. WHERE TO PUT THE REAL SECRETS

Preferred:
`Infisical`

GitHub runtime bridge:
`Repository Settings → Secrets and variables → Actions`

Examples of GitHub Secret NAMES only:
- `OPENAI_API_KEY`
- `INFISICAL_TOKEN`
- `VERCEL_TOKEN`
- `N8N_API_KEY`
- `N8N_WEBHOOK_SECRET`

Never commit the values themselves.

## 5. DELIVERY CHECKLIST

- [ ] Existing Vercel credential verified
- [ ] Existing n8n credentials verified
- [ ] Infisical source verified
- [ ] GitHub Actions secret names configured
- [ ] Vercel project / deployment target verified
- [ ] Production environment separated from TEST
- [ ] DRY_RUN remains enabled until release approval
- [ ] No plaintext secrets committed
- [ ] Deployment test completed
- [ ] Rollback path verified

## 6. APP CHECKLIST

- [ ] OpenAI credential reference verified
- [ ] Infisical credential reference verified
- [ ] HTTP Basic Auth reference verified
- [ ] Notion integration verified
- [ ] GitHub integration verified
- [ ] n8n webhook / API integration verified
- [ ] Error handling verified
- [ ] Audit / logging verified
- [ ] Idempotency verified
- [ ] Human approval required for high-risk writes

## 7. CURRENT MIGRATION PRINCIPLE

This repository is the application / deployment integration layer.
It is NOT the plaintext secret vault.

Use Infisical as the preferred secret source-of-truth and GitHub encrypted Secrets
as the runtime bridge where needed.
