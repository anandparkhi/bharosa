# Bharosa
India-first, privacy-conscious guided digital-task assistance. **Prototype and commercial model hypotheses, not a production-validated service.**

## Start locally
Prerequisites: Node.js 22, npm, environment variables stored only server-side when scam analysis is enabled.

```bash
npm ci
npm run dev
npm run check
npm audit --omit=dev --audit-level=high
```

Use `npm run build` for the Vite output. Vercel provides the server-side API at `/api/ai`; Vite local development mocks/routing are defined by `vite.config.ts`. Set `ANTHROPIC_API_KEY` server-side and optional `ANTHROPIC_MODEL` per existing server code; **never put model API credentials in `VITE_*` env values.** No key needed for curated task coach/Ask Phone.

## What is implemented?
- Existing public `main`: scam check (Anthropic+rules), reviewed nine-topic phone help, emergency directions, directory and manual Trusted Circle contacts, browser accessibility/settings and optional practice.
- Draft transformation PR #2: six bounded Android/iPhone task coach journeys in English/Hindi/Marathi, spoken steps, local outcome history and deletion, manual explicit-contact-consent WhatsApp draft. A draft opened in WhatsApp is not proof it was sent.
- No production merge/deploy of transformation branch; no institutional login, payment, actual verified outcome, signed partnership or revenue claim.

## Repository map
`src/screens/Coach.tsx` UI, `src/lib/coach.ts` allowlisted guide and outcome model, `src/lib/storage.ts` existing local storage, `src/i18n/strings.ts` localization, `api/ai.ts` Vercel backend, `server/check.ts` and `server/phoneHelp.ts` AI/rules, `tests/` regressions, `docs/` current audit, commercial model, PRD, security and verification. CI: `.github/workflows/verification.yml`.

## Safe use
This product does not authorize payments, remote control, identity verification or access to OTPs, passwords and UPI PINs. Institutions must not receive personal activity without independent authorization. Scam-analysis provider receives content explicitly submitted; do not send passwords or unnecessary PII. Contact directories can become stale; verify using official websites.

## Verification
Inspect [draft PR #2](https://github.com/anandparkhi/bharosa/pull/2) for **actual** build/test status. A passing CI is not equivalent to passing end-to-end production, Android/iOS accessibility or model-accuracy tests. [Verification report](docs/VERIFICATION_REPORT.md) and [plan](docs/TEST_PLAN.md).

## Investor/business documents
[Current state audit](docs/01_CURRENT_STATE_AUDIT.md) • [Positioning](docs/02_MARKET_POSITIONING.md) • [VC funding](docs/03_VC_FUNDING_INTELLIGENCE.md) • [Competitors](docs/04_COMPETITOR_AND_GLOBAL_OPPORTUNITIES.md) • [Business strategy](docs/05_BUSINESS_STRATEGY.md) • [Unit economics](docs/06_UNIT_ECONOMICS.md) • [Features](docs/07_FEATURE_CATALOGUE_AND_METRICS.md) • [Prioritization](docs/08_FEATURE_PRIORITISATION.md) • [PRD](docs/09_PRODUCT_REQUIREMENTS.md) • [QA](docs/10_QA_SECURITY_VERIFICATION.md) • [GTM](docs/11_GO_TO_MARKET_AND_VALIDATION.md) • [Fundraising](docs/12_FUNDRAISING_STRATEGY.md).

Financial workbook, pitch deck and investment memo are separate downloadable artifacts from the delivery conversation, not injected into source repository. No user or company traction implied.
