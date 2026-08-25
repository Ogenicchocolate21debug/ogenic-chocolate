# OGENIC AI Media Pipeline

Safe first-pass architecture for producing short-form social video without touching the current website production flow.

## Flow

Meta/approved product asset -> optional image enhancement -> video generation -> human approval -> optional publish adapter

1. **Input asset**
   - Start from an approved product image URL or uploaded asset.
   - Meta assets can be used only when the application/account has permission to access them.

2. **Image enhancement**
   - Provider: OpenAI
   - Recommended model: `gpt-image-2`
   - Purpose: clean background, improve lighting/composition, create premium product framing, preserve brand/product identity.
   - Runs only when `enhance_image: true`. Otherwise the source asset passes directly to Veo.

3. **Short video generation**
   - Provider: Google Gemini API / Veo
   - Model, aspect ratio, and resolution come from `VEO_MODEL`, `VEO_ASPECT_RATIO`, and `VEO_RESOLUTION` at runtime.
   - Default social format: portrait `9:16`.
   - Default duration: 8 seconds.
   - Input can be text + image. Veo 3.1 also supports reference-image guidance.

4. **Approval gate**
   - Required before publishing.
   - Store status as one of: `draft`, `generated`, `approved`, `rejected`, `published`.
   - Approval does not publish by itself. Publishing additionally requires `publish_after_approval: true` and `publish_target: "meta"`.

5. **Publish adapter**
   - Meta publishing is intentionally separated from generation.
   - Later n8n can call the same stages as HTTP nodes and own scheduling/retries.

## Security rules

- Never commit API keys, access tokens, page tokens, refresh tokens, or Meta app secrets.
- Secrets belong in server-side environment variables / n8n Credentials / Cloudflare Secrets.
- Browser/frontend code must never receive `OPENAI_API_KEY`, `GEMINI_API_KEY`, or Meta long-lived tokens.
- Real `.env` files are ignored by Git; keep only `.env.example` in source control.
- Log request IDs and status transitions, not raw credentials.

## Environment variables

See `.env.example`. The `AI_IMAGE_MODEL`, `VEO_MODEL`, `VEO_ASPECT_RATIO`, and `VEO_RESOLUTION` values are runtime inputs to the pipeline contract.

## Suggested request contract

```json
{
  "asset_url": "https://.../approved-product-image.jpg",
  "product_name": "Burnt Cheesecake Slice",
  "brand": "OGENIC",
  "prompt": "Premium dark-luxury food commercial, slow cinematic push-in, warm highlights, realistic texture, preserve the product exactly.",
  "enhance_image": true,
  "publish_target": "meta",
  "publish_after_approval": true
}
```

## Idempotency and retries

Derive an `idempotency_key` from the asset, prompt, model, and settings, then derive a stage key for `generate_video` and `publish_meta`. Before either side effect, check the idempotency registry. On replay, return the prior result instead of creating a new Veo operation or Meta post. Keep generation and publishing keys separate so an approved video can be published once without regenerating it.

## n8n mapping later

When the current n8n UI/workflow is ready, map this pipeline to nodes:

`Webhook/Form -> Validate -> Generation idempotency lookup -> Optional OpenAI image edit -> Veo generate -> Poll operation -> Save output -> Approval -> Publish idempotency lookup -> Optional Meta publish -> Audit log`

Keep generation and publishing as separate sub-workflows so a failed social publish does not force expensive media regeneration.

## Cost-control defaults

- Prototype with Veo 3.1 Fast/Lite and 720p/1080p.
- Upgrade only approved hero creatives to Standard/4K.
- Reuse approved enhanced product images instead of regenerating them for every video.
- Hash `asset + prompt + model + settings` and reuse a prior result when the same request is repeated.

## Production checklist

- [ ] OpenAI API key stored server-side
- [ ] Gemini API key stored server-side and paid Veo access enabled
- [ ] Meta app/page/IG permissions verified
- [ ] Asset usage rights confirmed
- [ ] Approval gate enabled
- [ ] Idempotency registry + retry policy enabled
- [ ] Output storage configured
- [ ] Audit log configured
- [ ] n8n adapters added after the workflow layer is stable
