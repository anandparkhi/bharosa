# 07 — Feature catalogue and metric dictionary
## North-star metric
**Weekly verified valuable task outcomes** = distinct users completing a meaningful task, *confirmed by user self-report plus sampled follow-up evidence where consented*, during a Monday–Sunday window. Current product stores local self-reports only; therefore **verified** north-star cannot currently be reported. Count self-reported outcomes separately from audited completions. Never count model responses or task starts as success.

## Integrated feature portfolio
| Feature / problem | Journey and user value | Buyer value | Formula / measurement | Baseline | Target hypothesis | Current implementation |
|---|---|---|---|---|---|---|
| 1 Guided task coach | Choose job, follow bounded reviewed steps, mark done or blocked | lower repeat support contacts | User-reported task completion / tasks started × 100, weekly | unknown | >65% for supported simple tasks | committed; unverified browser |
| 2 Device/language guidance | Pick Android/iPhone + language, compatible steps | fewer failed instructions | tasks completed / tasks attempted by language-device cohort, weekly | unknown | >60% in each cohort | committed; unverified browser |
| 3 Minimal outcome tracking | save category, device and self-reported outcome; erase locally | eventual evidence of value | completed/(completed+unresolved+help initiated), 30d; NEVER claim confirmed success | unknown | 70% self-reported in eligible tasks | committed locally; no sponsor telemetry |
| 4 Consented helper draft | select trusted person, inspect exact prewritten message, opt-in, manually send | partial reduction in expensive human interventions | helper draft initiated / failed tasks, weekly; delivered/acknowledged rate unavailable | unknown | >30% uptake among blocked tasks | manual draft committed; delivery unverified |
| 5 Suspicious-message triage | explicit user-submitted text/image, rules + Anthropic + safe unknown state | trust gateway and fewer escalations | false reassurance = confirmed dangerous rated safe / dangerous evaluation cases | unknown | <1% on held-out risk corpus, hypothesis only | preexisting on main; fresh evaluation blocked |
| 6 Official service directory | independently verify bank/agency contact | resolution & fewer fraud support calls | users reaching independently verified route / directory sessions | unknown | >50% | preexisting |
| 7 Digital drills | optional lesson | limited buyer economics | retained voluntary skill at day 30 | unknown | undecided | demote |
| 8 Automated action agent | user asks AI to do external actions | speculative | forbidden without auth + audit + partner integration | none | none | DO NOT BUILD |

## Analytics dictionary and exclusions
Numerator and denominator both require consented, pseudonymous event IDs for multi-device cohort reports; current local history has no stable identity or centrally observed event stream. `completed` means **user said done** not independently verified. `help_requested` means draft clicked, **not** helper reached. Inactive users never count as completed. Exclude staff demos, duplicate taps, synthetic traffic, and missing event integrity from commercial dashboards. Retain neither screenshots nor OTPs in analytics.

**Cost/success:** attributable model + hosting + human direct cost / independently confirmed successful tasks. **Weekly repeat value rate:** users with at least one independently confirmed outcome in week n+1 / eligible successful users in week n. **Sponsor impact:** (matched baseline support minutes − pilot support minutes)/matched eligible outcomes; report confidence interval and channel leakage. All measured baselines unknown.
