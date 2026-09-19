import type { VercelRequest, VercelResponse } from "@vercel/node";
import { callClaude, parseJsonObject } from "../server/anthropic";
import {
  HTTP,
  DEFAULT_LANG,
  MAX_INPUT_CHARS,
  MAX_NOTICED,
  MAX_TOKENS,
  VERDICTS,
  type Verdict
} from "../server/constants";
import { ASK_DEFAULT_QUESTION, FALLBACK_COPY, IMAGE_ONLY_NOTE, TEXT_PREFIX } from "../server/fallbackCopy";
import { askSystemPrompt, checkSystemPrompt } from "../server/prompts";
import { runRules, type RuleResult } from "../server/rules";

/**
 * POST /api/ai — the only server-side entry point. The API key never reaches the browser.
 *   mode "check": rules layer → Claude → strict JSON. Rules override the model.
 *   mode "ask":   plain-language phone help.
 */

type Body = { mode: "check" | "ask"; text?: string; imageBase64?: string; imageType?: string; lang?: string };
type ModelVerdict = { verdict?: string; noticed?: unknown; why?: string; now?: string };

const isVerdict = (v: string): v is Verdict => (VERDICTS as readonly string[]).includes(v);

function resolveVerdict(model: string | undefined, { forced }: RuleResult): Verdict {
  const fromModel = (model ?? "AMBER").toUpperCase();
  if (forced === "RED") return "RED";
  if (forced === "AMBER" && fromModel === "GREEN") return "AMBER";
  return isVerdict(fromModel) ? fromModel : "AMBER";
}

function fallbackVerdict(lang: string, rules: RuleResult): Required<ModelVerdict> & { noticed: string[] } {
  const { why, nowRed, nowAmber } = FALLBACK_COPY[lang] ?? FALLBACK_COPY.en;
  const verdict = rules.forced ?? "AMBER";
  return { verdict, noticed: rules.hits.slice(0, MAX_NOTICED), why, now: verdict === "RED" ? nowRed : nowAmber };
}

async function handleAsk(text: string, lang: string) {
  const answer = await callClaude(
    askSystemPrompt(lang),
    [{ type: "text", text: text || ASK_DEFAULT_QUESTION }],
    MAX_TOKENS.ASK
  );
  return { answer };
}

async function handleCheck({
  text,
  imageBase64,
  imageType,
  lang
}: Required<Pick<Body, "text" | "lang">> & Pick<Body, "imageBase64" | "imageType">) {
  const rules = runRules(text);
  const content: unknown[] = [];
  if (imageBase64 && imageType)
    content.push({ type: "image", source: { type: "base64", media_type: imageType, data: imageBase64 } });
  content.push({ type: "text", text: text ? `${TEXT_PREFIX}${text}` : IMAGE_ONLY_NOTE });

  let out: ModelVerdict;
  try {
    out = parseJsonObject<ModelVerdict>(
      await callClaude(checkSystemPrompt(lang, rules.hits), content, MAX_TOKENS.CHECK)
    );
  } catch {
    out = fallbackVerdict(lang, rules);
  }
  const { verdict: modelVerdict, noticed, why = "", now = "" } = out;
  return {
    verdict: resolveVerdict(modelVerdict, rules),
    noticed: Array.isArray(noticed) ? noticed.slice(0, MAX_NOTICED).map(String) : [],
    why: String(why),
    now: String(now),
    ruleHits: rules.hits
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(HTTP.METHOD_NOT_ALLOWED).json({ error: "POST only" });
  const { mode, text = "", imageBase64, imageType, lang = DEFAULT_LANG } = (req.body ?? {}) as Body;
  const safeText = String(text).slice(0, MAX_INPUT_CHARS);
  try {
    const result =
      mode === "ask"
        ? await handleAsk(safeText, lang)
        : await handleCheck({ text: safeText, imageBase64, imageType, lang });
    return res.status(HTTP.OK).json(result);
  } catch (err) {
    console.error(err);
    return res.status(HTTP.SERVER_ERROR).json({ error: "ai_unavailable" });
  }
}
