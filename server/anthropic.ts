import { ANTHROPIC_URL, ANTHROPIC_VERSION, MODEL } from "./constants.js";

type ContentBlock = { type: string; text?: string };

export async function callClaude(system: string, content: unknown[], maxTokens: number): Promise<string> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("ANTHROPIC_API_KEY not set");
  const response = await fetch(ANTHROPIC_URL, {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": ANTHROPIC_VERSION },
    body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, system, messages: [{ role: "user", content }] })
  });
  if (!response.ok) throw new Error(`anthropic ${response.status}: ${await response.text()}`);
  const { content: blocks } = (await response.json()) as { content: ContentBlock[] };
  return blocks
    .filter(({ type }) => type === "text")
    .map(({ text = "" }) => text)
    .join("\n");
}

/** Tolerates code fences and stray text around the JSON object. */
export function parseJsonObject<T>(raw: string): T {
  const clean = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(clean.slice(clean.indexOf("{"), clean.lastIndexOf("}") + 1)) as T;
}
