# Architecture — actual branch design
```mermaid
flowchart LR
 H[Home] --> K[Client task coach]
 K --> G[Reviewed guides, locale + device]
 K --> S[Browser outcome history, max 100]
 K --> W[Consent preview -> WhatsApp draft]
 H --> C[Scam Check]
 C --> V[Vercel API]
 V --> D[Rules]
 V --> A[Anthropic]
```
React 18 + TypeScript + Vite frontend, per-user browser localStorage, Vercel serverless `/api/ai`, Anthropic only in scam checks. Coach guide/step progression and outcome persistence execute in browser, no institution endpoint/auth. Security boundary: user input never chooses an executable tool; task IDs allowlisted; WhatsApp draft manually reviewed. See `src/lib/coach.ts`, `src/screens/Coach.tsx`, `api/ai.ts`.
