import type { Lang } from "../i18n/strings";
import { API, type Verdict } from "../constants";
export type CheckInput = { text: string; imageBase64?: string; imageType?: string; lang: Lang };
export type CheckResult = {
  verdict: Verdict;
  noticed: string[];
  why: string;
  now: string;
  ruleHits: string[];
  analysisStatus: "complete" | "limited";
};
export type AskResult = { answer: string; supported: boolean; topic: string | null };
const REQUEST_TIMEOUT_MS = 45_000;
async function post<T>(body: Record<string, unknown>, parent?: AbortSignal): Promise<T> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  parent?.addEventListener("abort", abort, { once: true });
  if (parent?.aborted) controller.abort();
  const timeout = setTimeout(abort, REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(API.AI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`request_${response.status}`);
    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
    parent?.removeEventListener("abort", abort);
  }
}
export const checkMessage = (input: CheckInput, signal?: AbortSignal) =>
  post<CheckResult>({ mode: "check", ...input }, signal);
export const askQuestion = (input: { text: string; lang: Lang }, signal?: AbortSignal) =>
  post<AskResult>({ mode: "ask", ...input }, signal);
