export const MODEL = "claude-sonnet-4-6";
export const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
export const ANTHROPIC_VERSION = "2023-06-01";
export const MAX_INPUT_CHARS = 4000;
export const MAX_TOKENS = { CHECK: 700, ASK: 600 } as const;
export const MAX_NOTICED = 3;
export const VERDICTS = ["RED", "AMBER", "GREEN"] as const;
export type Verdict = (typeof VERDICTS)[number];
export const DEFAULT_LANG = "hi";
export const LANG_NAME: Record<string, string> = {
  hi: "Hindi (Devanagari script)",
  mr: "Marathi (Devanagari script)",
  en: "simple Indian English"
};
/** Score thresholds for the rules layer. */
export const RULE_THRESHOLDS = { RED: 4, AMBER: 2 } as const;
/** Rule weights: CRITICAL alone forces RED; others accumulate toward the thresholds. */
export const WEIGHT = { CRITICAL: 3, STRONG: 2, WEAK: 1 } as const;
export type Weight = (typeof WEIGHT)[keyof typeof WEIGHT];
export const HTTP = { OK: 200, METHOD_NOT_ALLOWED: 405, SERVER_ERROR: 500 } as const;
