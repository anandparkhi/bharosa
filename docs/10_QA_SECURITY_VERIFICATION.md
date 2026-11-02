# 10 — QA, security and verification
Last refreshed: 17 Oct 2026. **Independent test execution status: COMPLETE for current GitHub Actions CI; UNVERIFIED for real-device, deployment equivalence and model-accuracy checks.**
- Local container cannot clone from GitHub (DNS error). However GitHub Actions successfully ran `npm ci`, `npm run check` and `npm audit --omit=dev --audit-level=high` on the branch head; see [successful check](https://github.com/anandparkhi/bharosa/actions/runs/39018889501).
- Historical Oct 8 audit reports 115 passing tests on the earlier patch; this is *not* a result for this branch.
- GitHub Actions result: 121/121 Node tests pass; ESLint, TypeScript and Vite production build pass; production dependency audit reports zero vulnerabilities. `npm ci` reports 19 vulnerabilities when *development* dependencies are included (1 low, 3 moderate, 14 high, 1 critical). Full dependency tree needs remediation and dedicated CI policy. Passing CI still does not prove real-device or production correctness.

## Traceability and gates
| Requirement | Evidence path | Status |
|---|---|---|
| Six device+language flows | `src/lib/coach.ts`; `tests/coach.test.mjs`; CI 121/121 | COMPLETE (automated checks only) |
| Unknown task rejection | `getGuide`, `isTaskId`, regression test | COMPLETE (automated checks only) |
| Local history bounded and sanitized | `parseHistory`, `addOutcome`, tests | COMPLETE (automated checks only) |
| Manual contact with explicit opt-in | `src/screens/Coach.tsx`; browser manual review required | UNVERIFIED (E2E) |
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
