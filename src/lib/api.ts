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
  if (!response.ok) throw new Error(`api ${response.status}`);
  return response.json() as Promise<T>;
}

export const checkMessage = (input: CheckInput) => post<CheckResult>({ mode: "check", ...input });
export const askQuestion = (input: { text: string; lang: Lang }) => post<AskResult>({ mode: "ask", ...input });

export const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
