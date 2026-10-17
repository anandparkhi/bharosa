# 06 — Editable unit economics
The live editable financial model is delivered as **Bharosa_Unit_Economics_Model.xlsx** (separately downloadable). Every figure below is a **planning assumption**.

## Base unit economics
Institution fee ₹35 / billed eligible seat / month; assumed 40% of billed seats MAU; therefore revenue per MAU ₹87.50. Assumed 2 AI scam checks per MAU per month × ₹1.20/check = ₹2.40; variable traditional support ₹6.50 per MAU; 8% human escalation × 12 minutes × ₹3/min = ₹2.88; other hosting/storage/monitoring ₹2.75. **Total variable cost ₹14.53 per MAU**. Fixed direct serving cost ₹10,000 per month; separate operating expenses ₹480,000 per month. Browser-guided task steps themselves do not call a generative model.

| MAU | Billed seats assumption | Revenue/mo | Variable COGS | Fixed service cost | Gross profit | Gross margin |
|---:|---:|---:|---:|---:|---:|---:|
| 100 | 250 | ₹8,750 | ₹1,453 | ₹10,000 | -₹2,703 | -30.9% |
| 1,000 | 2,500 | ₹87,500 | ₹14,530 | ₹10,000 | ₹62,970 | 72.0% |
| 10,000 | 25,000 | ₹875,000 | ₹145,300 | ₹10,000 | ₹719,700 | 82.3% |
| 100,000 | 250,000 | ₹8,750,000 | ₹1,453,000 | ₹10,000 | ₹7,287,000 | 83.3% |

Break-even at approximately 6,715 MAU on the base assumptions (₹490k fixed monthly spend divided by ₹72.97 contribution/MAU). **Not actual company cost data.** Base billed-seat CAC ₹75, churn 4% per month, contribution per billed seat about ₹29.19, payback ~2.57 months and simple undiscounted seat LTV ~₹730; partner acquisition costs and contracting delays can invalidate this illustrative result.

## Scenario sensitivity
Conservative ₹25 price / 25% activation, increased serving costs / 7% churn, 9-month sales cycles. Optimistic ₹50 / 50% activation, cheaper AI and support, 3% churn, 4-month sales cycles. The workbook contains live formulas for three scenarios, four MAU scales, break-even and three-year *hypothetical* revenue outlook. Do not interpret annual outlook as bookings or financial guidance.

## Source quality
Operational price/usage/staffing inputs are currently founder hypotheses, not quotes or observed metrics. Official context for digital penetration (not customer demand): https://trai.gov.in and https://www.npci.org.in/product/upi/product-statistics . AI unit prices require supplier-bill evaluation; current text is **not** a quotation from Anthropic.
