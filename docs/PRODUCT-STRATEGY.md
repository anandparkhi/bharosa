# Bharosa: digital independence with dependable help

Prepared 8 October 2026. This is a product and investment assessment, not YC's opinion or a forecast of admission. Feature proposals are not implemented unless explicitly identified in the audit. Prices, operational targets, and economics below are hypotheses to test.

## Investment assessment

The existing product has a useful accessibility foundation: large actions, three languages, speech affordances, practice scenarios, emergency guidance, and a trusted-contact concept. It is still primarily a set of advice screens. It does not yet demonstrate repeat usage, a paying buyer, reliable case resolution, scalable support economics, or a proprietary distribution advantage.

“AI for seniors” defines an audience and technology, not a reason to buy. “AI scam checker” is increasingly difficult to defend. A model can explain a message; a business must reliably solve a problem people will pay to have solved.

My recommendation: build a focused, mission-driven commercial service with free essential safety guidance and sponsored access. Charging for dependable help can fund quality, training, and continuity. Nonprofit status alone does not solve distribution, reliability, or operating costs. Choose a nonprofit path if field evidence shows essential demand but no sustainable payer; do not fabricate venture economics to fit an application.

## Mission and first customer

**Bharosa helps older adults complete everyday digital tasks safely, with a trusted human when they get stuck.**

Senior promise: “I can do it myself, and I can get patient help when I need it.”

Buyer promise: “My parent has dependable support even when I cannot answer.”

Start with consenting older smartphone users in one Indian city/language cluster, whose adult children live elsewhere and already provide recurring phone help. Pune and Marathi/Hindi/English is a reasonable test cohort if the founder has access there; it is not an established market conclusion. Include seniors living alone through a sponsored cohort so the product does not assume everyone has a helpful family.

The payer may fund support but does not automatically gain access to private activity. A parent can decline sharing, select a different trusted person, revoke access, and use the service independently. Family coercion is a real product threat to design against, not evidence that any particular family is unsafe.

## Competitive implications

Meta announced suspicious device-linking warnings for WhatsApp in March 2026. Its same announcement describes AI chat scam review for **Messenger**, not a universal WhatsApp equivalent. Meta also described WhatsApp screen-sharing warnings in October 2025. Google added scam-message assessment through Circle to Search and Lens, including screenshot input, in December 2025. These overlap directly with a standalone “paste a message and get a warning” proposition.

Carefull already markets financial monitoring, trusted-contact visibility, human support, and institutional distribution. A family dashboard or human escalation is not automatically a novel global category. Bharosa must earn differentiation through a narrow underserved task set, local-language service quality, completion reliability, and efficient distribution.

Inference: retain scam checks as a useful entry point, but make the paid outcome “help me get this resolved.” Do not claim platforms cannot add such features. Measure whether your service solves tasks they leave unfinished.

Sources:

- [Meta: anti-scam tools, March 2026](https://about.fb.com/news/2026/03/fighting-scammers-protecting-people-with-new-technology-and-partnerships/)
- [Meta: helping older adults, October 2025](https://about.fb.com/news/2025/10/cybersecurity-awareness-month-helping-older-adults-avoid-online-scams/)
- [Google: Circle to Search and Lens scam checks](https://blog.google/products-and-platforms/products/search/scam-detection-circle-to-search-lens/)
- [Carefull: financial safety and trusted contacts](https://getcarefull.com/)

## Three launch jobs

1. **Help me use my phone.** Change text size, restore sound, make a video call, send a photo, block an unwanted number, update an app. These create repeated value without requiring a crisis.
2. **Help me understand and verify this.** Explain a notice in plain language; distinguish what it says from whether the sender is genuine; guide the user to an independently sourced official contact or app.
3. **Help me get unstuck.** With consent, pass the task and attempted steps to a chosen helper, show acknowledgment, and follow up on resolution.

Exclude money movement, collecting passwords/OTPs, remote control of financial apps, investment advice, medical decisions, and claimed identity authentication from voice/video. These are boundaries of the launch service, not claims that older adults cannot make their own decisions.

## Main experience

Use three primary actions: **Help me do something**, **Check something**, **Ask someone I trust**. Keep “Money already sent / urgent help” always reachable. Move practice into optional, contextual lessons. Make phone help accessible from home instead of burying it below a scam quiz.

Example: a parent sees a message saying a bill is overdue. They share it voluntarily. Bharosa says what the message requests and explains that it cannot verify the sender. It helps open an independently verified service route. If the parent cannot find the bill, they request help and choose the information to share. Their helper accepts the case. The case closes only when the parent confirms the outcome or an explicit unresolved/abandoned status is recorded. Nobody asks for an OTP or pays on the parent's behalf.

## Feature specification

| Priority | Feature | How it should work | Acceptance criterion / measure |
| --- | --- | --- | --- |
| P0, safety patch | Bounded phone help | Reviewed multilingual answers for supported tasks; unsupported input gets useful alternatives. No arbitrary generation. | Phone-framed C++ request cannot return code; supported guides work without a model key. Implemented locally for nine topics. |
| P0, next | Device-aware task coach | Ask Android/iPhone and relevant app/version only when needed. Present one action at a time, with “Done”, “I don't see that”, “Go back”, and “Get help”. Read aloud on request. | Every flow has a tested device/version list, owner and review date; user reaches the actual goal or an honest unresolved state. |
| P0, next | Personal device profile | Store language, accessibility preferences and device family with permission. Let user inspect/edit/reset it. No passive chat, call or screen surveillance. | Advice selects compatible guides; unsupported versions abstain instead of inventing menus. |
| P0, next | Consent-based trusted handoff | Parent invites contact; contact accepts. Parent previews/redacts the case and selects recipients. Status moves requested → delivered when evidenced → accepted → resolved/unresolved. If unaccepted, offer the next chosen contact. | Never equate opening WhatsApp with delivery. No automatic disclosure to the paying child. Revocation prevents future access. |
| P0, next | Verification workflow | Separate “message meaning”, “warning signs”, and “sender not verified”. Provide sourced contact/app navigation. Do not follow a suspicious link to authenticate it or label a transaction safe. | Every official contact has jurisdiction, source and freshness metadata. No green approval for sending money. |
| P0, next | Privacy and dignity controls | Clear processing notice, user-controlled sharing, masking of obvious identifiers, bounded retention and deletion. Do not use customer content for training without separate permission. | Parent can use core tasks without family monitoring; sharing preview clearly shows exactly what leaves the app. Masking failures are tested. |
| P0, pilot | Trained support with case ownership | Limited published hours, trained named agents, visible queue estimate and capped plan entitlement. Carry forward attempted steps so users do not repeat the whole story. | Track productive and nonproductive support time. Never promise 24/7 or a response deadline before staffing supports it. Staff cannot request secrets or move funds. |
| P0, next | Accessible failure paths | Large tap targets; text resize without clipping; high contrast; explicit speech controls; editable voice transcript; slow repeat; plain offline/error states. | Real seniors complete key tasks on low-cost Android devices and iPhones; denied microphone access never blocks typed input. |
| P1 | Parent-approved family summary | Share completed tasks and requests for help at the parent's chosen detail level. Prefer “Helped with app update” to raw screenshot/chat content. | Buyer sees service value; parent can preview, withhold, or revoke sharing. |
| P1 | Independent-use practice | After successful help, offer a short optional practice run on the same task. “Unsure” is a sensible choice, not failure. | Measure next-time task completion without help, not streaks or time spent in app. |
| P1 | Incident recovery checklist | If money was already sent, surface jurisdiction-appropriate urgent reporting and official bank contact routes immediately. Later help organise evidence and reference numbers with consent. | No paywall on urgent instructions; no recovery guarantee; do not delay reporting to complete onboarding or a sales flow. |
| P1 | Partner operations | Employer/senior-community sponsor provisions entitlement; individuals separately consent to data use. Partner receives aggregate service outcomes, not personal case content. | Paid pilot validates activation, resolution and costs; sponsorship does not silently grant surveillance rights. |
| Later | Additional country packs | Senior's location determines services, contacts and response hours; language and payer country are separate fields. Local operators review each pack. | India helplines never appear as universal emergency guidance. Launch one additional market only after local operational validation. |

Dependencies: cloud case tracking needs authentication, role-based access, secure storage, retention/deletion, delivery receipts and an audit trail. A WhatsApp integration needs current platform eligibility and rules checked before implementation; do not assume a bot can inspect arbitrary personal conversations or monitor live calls. Build the first pilot through explicit user submissions and bounded human support.

## India and global risks to validate

| Context | Hard question | Product/business response |
| --- | --- | --- |
| India: buyer/user split | The child buys, but will the parent actually use it? | Observe parents without children coaching. Track parent activation and repeated tasks separately from payment. |
| India: substitutes | Why not ask a child, neighbour, bank branch or local phone shop? | Interview about specific unresolved tasks, delay, embarrassment and repeat dependence. Charge only if reliability demonstrably improves these outcomes. |
| India: language/device variation | Does translated text work on a low-cost phone with mixed-language menus? | Test spoken and Romanised language, screenshot quality, app variants and older devices. Three languages are a start, not national coverage. |
| India: trust and cost | Why would a senior trust another unfamiliar helper, and will a family renew? | Introduce staff through a known channel, transparent identity and boundaries; test actual paid renewal rather than compliments or a waitlist. |
| India: distribution | Can acquisition be economical at modest monthly revenue? | Start with a few housing/senior communities and employer parent-care pilots. Measure founder onboarding time; do not hide it as free. |
| Global: existing competition | Why buy over established financial-protection and support products? | Select a specific task/customer gap. Do not pitch “first elder AI assistant” or “no competitors”. |
| Global: localisation | Can the same service work outside India? | Translate workflows, institutions, safety routing and service operations. Currency conversion and English UI are insufficient. |
| Global: economics | Do higher prices compensate for local staffing, acquisition and support costs? | Pilot locally and rebuild the contribution model per market. Do not assume Indian staffing costs apply everywhere. |
| Everywhere: family power | What if the payer demands unrestricted monitoring? | Parent owns consent; trusted contact may be a friend. Do not treat a payment as authority over another adult. |
| Everywhere: venture scale | Does every new customer require proportionately more staff? | Automate repeated verified workflows and track falling minutes per resolved case. If this does not improve, value it as a service business rather than pretending it is software-margin SaaS. |

## Revenue model and mission safeguards

Test a family subscription before negotiating bank integrations. Proposed price experiments, not validated willingness to pay:

- **Free:** bounded guides, scam warning guidance, official emergency/reporting routes, and user-initiated sharing. Keep urgent safety instructions available regardless of subscription.
- **Family, around ₹499/month:** personalised device guides, case history, consent-based family coordination and summaries. No included unlimited staff time. If users see insufficient value in this software-only tier, remove it instead of disguising a chatbot as premium protection.
- **Assisted, around ₹999/month:** the family features plus a defined support allowance, e.g. two sessions totalling up to 30 minutes, within published hours. Show limits and any additional price before booking. Validate allowance and quality in the pilot.
- **Sponsored access:** employers, communities or charitable partners fund eligible seats or support sessions. Track the funded entitlement and actual service cost; never claim every paid account automatically funds a free account without the economics to do so.
- **Later institutional contracts:** sell measured support outcomes and accessibility assistance to partners. This is a separate sales motion with procurement and integration costs, not instant distribution.

Avoid advertising, selling personal data, commissions for steering seniors into financial products, or monetising panic during an incident. A commercial company can commit publicly to these limits. Entity/tax/legal structuring requires a separate, jurisdiction-specific decision.

Illustrative assisted-tier sensitivity, using **₹999 net revenue before indirect taxes** and hypothetical costs:

| Monthly paid support minutes per family | Labour at ₹8/minute | Other variable costs, assumed | Contribution before acquisition/fixed costs | Contribution margin |
| --- | ---: | ---: | ---: | ---: |
| 30 | ₹240 | ₹150 | ₹609 | 61.0% |
| 60 | ₹480 | ₹150 | ₹369 | 36.9% |
| 90 | ₹720 | ₹150 | ₹129 | 12.9% |

These are not forecasts. “Paid minutes” must include agent idle capacity, documentation, training and quality review allocated to families, not just talk time. The other-cost assumption must be replaced by measured model, messaging, payment, infrastructure and variable quality costs. If ₹999 is a tax-inclusive customer price, net revenue is lower. Acquisition, refunds, founder time and fixed management costs still matter. Do not pitch gross revenue as profit.

## Six-week validation plan

Recruit roughly 30–50 parent/family pairs in a reachable community. These are sample-size suggestions, not statistically powered claims. Obtain separate parent consent. Include a small sponsored cohort; report its retention and economics separately.

**Weeks 1–2:** observe existing digital problems, record task categories and current alternatives, and test onboarding. Measure whether the parent can request help unprompted. Interview people who refuse or abandon.

**Weeks 3–4:** run the three launch jobs with bounded human support. Label cases attempted, independently resolved, assisted resolved, unresolved or abandoned. Measure resolution within a declared time window and repeat use on another day.

**Weeks 5–6:** offer actual paid continuation at explicit prices and allowances. Report the eligible denominator, conversions, refunds, and subsequent renewals as they happen. Do not claim 90-day retention from a six-week pilot.

Proposed decision gates to predeclare and refine before starting: most enrolled parents complete a first task without a child's intervention; at least half use it again for a real task on another day within the pilot; at least 80% of in-scope cases reach a parent-confirmed resolution; enough families actually pay to justify the support costs. These are founder experiments, not YC benchmarks or evidence already obtained.

Extend follow-up to 90 days. The key questions are renewal, support minutes per paid family, acquisition effort, and whether independence improves. Track false reassurance and serious incorrect instructions as safety incidents. Do not equate “amount mentioned in a scam message” with money saved; only report independently supportable outcomes and label self-reports.

## Investor interview and demo

Use a 90-second demo that shows a complete task and a difficult edge case:

1. A parent asks for help with a supported phone task in their preferred language.
2. The coach presents one step and handles “my screen looks different” honestly.
3. The parent chooses a helper, previews shared information, and the helper explicitly accepts.
4. The parent confirms completion. The family sees only the summary the parent permitted.
5. An unrelated programming request is declined; a normal family video-call message is not automatically treated as fraud.

Steps 2–4 are the proposed product, not present capabilities of the safety patch. Label a prototype or manual concierge process honestly in a pitch.

Questions to prepare for:

- Who pays, and who uses it? Answer with actual cohorts, not all seniors everywhere.
- What did a parent need help with last week? Tell a consented, specific, anonymised task story.
- Why won't WhatsApp or Google solve it? Acknowledge their checks; show your measured task completion and accountable follow-through across a narrow task set.
- Is this a call centre? Show which workflows reduce human minutes over time. If you do not yet know, say what the pilot will measure.
- How will you acquire families? Name the channel you actually tested, its conversions and full cost.
- What happens when the model is wrong? Show abstention, sourced steps, human review and the failure log; do not claim perfection.
- What is defensible? Verified workflow coverage, quality feedback, a trained service operation, recurring trust, and distribution may compound. They are potential advantages, not a moat already established by using an API.
- Why a commercial company? Reliable support requires ongoing funding; paid convenience and capacity fund the operation, while essential safety guidance and sponsored access preserve the mission.

The strongest pitch is evidence that parents return, families renew, tasks resolve, and service costs improve. Additional features or a celebrity endorsement cannot substitute for that evidence.
