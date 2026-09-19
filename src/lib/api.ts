import type { Lang } from "../i18n/strings";
import { API, type Verdict } from "../constants";

export type CheckInput = { text: string; imageBase64?: string; imageType?: string; lang: Lang };
export type CheckResult = { verdict: Verdict; noticed: string[]; why: string; now: string; ruleHits: string[] };
export type AskResult = { answer: string };

async function post<T>(body: Record<string, unknown>): Promise<T> {
  const response = await fetch(API.AI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    // The friendly checkError copy is what the person sees; this console line is
    // what a developer sees in devtools -> Network/Console when debugging a
    // deploy, e.g. an Anthropic 404 for a retired model ID.
    const detail = await response.text().catch(() => "");
    console.error(`api ${response.status}: ${detail}`);
    throw new Error(`api ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export const checkMessage = (input: CheckInput) => post<CheckResult>({ mode: "check", ...input });
export const askQuestion = (input: { text: string; lang: Lang }) => post<AskResult>({ mode: "ask", ...input });
