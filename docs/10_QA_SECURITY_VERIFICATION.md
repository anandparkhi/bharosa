# 10 — QA, security and verification
Last refreshed: 17 Oct 2026. **Independent test execution status: UNVERIFIED until CI and device evidence is obtained.**
- Current local container cannot clone from GitHub (DNS error), so `npm ci`, `npm run check`, real Vercel preview browsing and Anthropic evaluation could not be run there.
- Historical Oct 8 audit reports 115 passing tests on the earlier patch; this is *not* a result for this branch.
- A GitHub Actions workflow was committed to execute `npm ci`, `npm run check`, and `npm audit --omit=dev --audit-level=high`. Check PR #2 for actual results. Passing CI will not prove real-device or production correctness.

## Traceability and gates
| Requirement | Evidence path | Status |
|---|---|---|
| Six device+language flows | `src/lib/coach.ts`; `tests/coach.test.mjs` | UNVERIFIED (test committed, check run pending) |
| Unknown task rejection | `getGuide`, `isTaskId`, regression test | UNVERIFIED |
| Local history bounded and sanitized | `parseHistory`, `addOutcome`, tests | UNVERIFIED |
| Manual contact with explicit opt-in | `src/screens/Coach.tsx`; browser manual review required | UNVERIFIED |
| Delete local history | Coach erase control; manual blocked-storage test required | UNVERIFIED |
| Existing screenshot scam analysis | `server/check.ts`; historical suite | UNVERIFIED current model accuracy |
| iOS/Android assistive technologies | no device lab performed | BLOCKED |
| Secure institution data and paid APIs | no such backend implemented | NOT STARTED |

## Independent threats to test before production
1. **High:** `api/ai.ts` still lacks authenticated/quota-billed identity and uses per-instance memory rate limit. Real paid inference endpoint can be abused; distributed limiter and model budget cap needed.
2. **High:** Triage verdicts may falsely reassure; blind multilingual held-out labelled fraud set and neutral controls mandatory. Public demo cannot establish classifier accuracy.
3. **Medium:** Device-specific guide UI names drift across OEM/app versions; assign guide owner and review date.
4. **Medium:** Trusted contact is not authenticated or confirmed to accept/resolve a task; opening a WhatsApp draft proves nothing about delivery.
5. **Medium:** Outcome events are self-reported; commercial dashboard cannot truthfully call them 'verified success'. Browser storage may be cleared.
6. **Medium:** No organisation permission boundary, no server-side case history and no DPDP assessment for new institutional deployments.
7. **Low/Medium:** Client feature requires Android Chrome, iOS Safari, Hindi/Marathi native speaker, screen reader, speech denied/offline and large-text smoke testing.

## Adversarial cases
Phone-framed C++, Hindi/Marathi code requests, prompt-injection in screenshot and message, altered image MIME signatures, 4k+ input, oversized base64, cloud rate-limit bypass, sharing when unchecked, invalid local history, duplicate send click, storage blocked, language switch while running, and device guide mismatch. Mark each PASSED only after an actual recorded test run.
