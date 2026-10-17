# 08 — Independent commercial and engineering prioritisation
**Scores are directional analyst hypotheses, not measured customer outcomes.** Ratings are 0–5, final normalized score weighted-average × 20. Evidence grade at present **low**; code feasibility based on inspected repository.

Commercial weights: severity/frequency 20%; user benefit 25%; paid demand 20%; adoption 15%; moat 10%; cost 10%.
| Feature | S | U | $ | A | D | C | Commercial /100 |
|---|---:|---:|---:|---:|---:|---:|---:|
| Outcome evidence + tracking | 4 | 5 | 5 | 3 | 4 | 5 | **89** |
| Guided task coach | 4 | 5 | 4 | 4 | 3 | 5 | **85** |
| Consent helper handoff | 5 | 4 | 4 | 4 | 3 | 4 | **82** |
| Device & language fit | 3 | 4 | 3 | 4 | 3 | 5 | **72** |
| Scam triage (free gateway) | 5 | 3 | 2 | 3 | 1 | 2 | **60** |

Engineering weights: simplicity 25%, API/data available 20%, security feasibility 25%, running cost 15%, testability 15%.
| Feature | Simplicity | Data | Privacy | Cost | Testability | Engineering /100 |
|---|---:|---:|---:|---:|---:|---:|
| Device & language guidance | 5 | 5 | 5 | 5 | 5 | **100** |
| Guided task coach | 4 | 5 | 5 | 5 | 5 | **95** |
| Outcome evidence + tracking | 4 | 5 | 5 | 5 | 4 | **92** |
| Consent helper draft | 4 | 4 | 3 | 5 | 3 | **75** |
| Scam triage | 2 | 4 | 2 | 2 | 3 | **51** |

## Reconciliation
Prioritize 1–4 as the same integrated workflow, retain 5 as a bounded unpaid safety entry point from the existing product. Do **not** expand autonomous agent privileges or pretend WhatsApp draft creation equals delivery. The independent security veto is triggered for any automated banking movement, secret collection, unauthorised screen control or unconsented family monitoring.

## Delivery decomposition
Core task coach, compatibility and local outcomes are implemented on feature branch but no production/real-device verification. Manual sharing is available as a draft, not a case-management system. Scam checks existed before this branch. Next level (institution telemetry, helper acknowledgements, API-level entitlement) is **BLOCKED** on authentication, partner data agreements, privacy design and testing.
