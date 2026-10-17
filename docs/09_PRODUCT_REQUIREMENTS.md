# 09 — Outcome-first prototype PRD
Version 0.2 candidate, 17 Oct 2026. Source code is on `feat/outcome-first-transformation-20261017`; CI acceptance **COMPLETE** (121 tests, lint, type/build); device/E2E acceptance **UNVERIFIED**.

## User story and jobs-to-be-done
When I encounter a common digital task that feels unfamiliar, I want a safe, understandable next step and an honest way to mark whether I finished, so I can remain independent without exposing credentials.

## Flows
1. Home → Get something done → choose Android/iPhone → choose one of six reviewed tasks → show one step (back/next/read aloud) → choose Done, Couldn't finish or Ask trusted person.
2. Ask trusted person → select previously saved contact → review minimal, fixed text → explicit opt-in → open WhatsApp draft. **User** must press Send in WhatsApp.
3. Local stats show number of self-reported completions / total entered outcomes. Delete removes coach outcome history; earlier WhatsApp messages are separate.
4. Scam check uses existing API, not agentic financial action.

## Interface contracts
No new server API for task coach: `src/lib/coach.ts` is an allowlist with `TaskId`, `Device`, `CoachLang`. Browser persistence: `bharosa.coach.device.v1` and `bharosa.coach.outcomes.v1`. Event keys `task, outcome, at, device`, max 100 history records. No task content, screenshot, bank ID or contact copied into telemetry. New user contact must be separately configured under Trusted Circle.

Existing `POST /api/ai`: `{mode:"ask"|"check",text,lang,...image}`; Ask deterministic, Check Anthropic/rules; see `api/ai.ts` and `server/validation.ts` for actual schema. No account auth, institution API, push notifications or delivery receipts.

## Acceptance criteria
A. Six allowlisted tasks show at least three steps on two device families and all three languages.
B. Unknown tasks never become ad hoc generative conversations.
C. Completion requires explicit action and is labelled self-report.
D. Untrusted local-storage object keys cannot leak into persisted typed outcomes.
E. The share text contains only reviewed task names and never raw user input.
F. Without consent or selected contact there is no WhatsApp handoff link.
G. User can delete stored task history.
H. CI passed lint, type check, 121 regression tests, production build and production-only dependency audit on 2026-10-17. Browser screen readers/mobile/speech must be tested separately; development dependency advisories remain.

## Error and fallback
Storage failure → visible error and no false claim of recording. Unavailable speech → text remains available; actual device test pending. Offline → guides remain locally renderable once page loads; PWA offline install behavior unverified. No auto-disbursement, password entry, OTP collection or unattended browser automation.

## Definition of Done
Complete only after real device E2E, CI, security review, usability trial, clear version expiry of guides, and at least one consented pilot with observed outcome-quality checks. Current state is **PARTIAL / UNVERIFIED**, not DoD complete.
