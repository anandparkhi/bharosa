/** Single source for every non-translated literal used in the UI. Copy lives in src/i18n. */

export const ROUTES = {
  HOME: "/",
  EMERGENCY: "/emergency",
  CHECK: "/check",
  VERIFY: "/verify",
  PAID: "/paid",
  CIRCLE: "/circle",
  LEARN: "/learn"
} as const;
export type Route = (typeof ROUTES)[keyof typeof ROUTES];

export const HELPLINES = {
  CYBER: "1930",
  POLICE: "112"
} as const;

export const STORAGE_KEYS = {
  LANG: "bharosa.lang",
  FONT: "bharosa.font",
  CONTRAST: "bharosa.hc",
  CONTACTS: "bharosa.contacts",
  MY_NAME: "bharosa.me"
} as const;

export const DEFAULT_LANG = "hi" as const;
export const FONT_SCALE = [1, 1.25, 1.5, 1.8] as const;
export const DEFAULT_FONT_STEP = 1;
export const SPEECH_RATE = 0.88;
export const MAX_CONTACTS = 3;
export const MIN_PHONE_DIGITS = 10;
export const PHONE_PLACEHOLDER = "91 98765 43210";

export const ICONS = {
  EMERGENCY: "🛑",
  CHECK: "🔍",
  VERIFY: "☎️",
  PAID: "⏱️",
  CIRCLE: "👨‍👩‍👧",
  LEARN: "📘",
  CALL: "📞",
  WHATSAPP: "💬",
  SHIELD: "🛡️",
  SIREN: "🚨",
  ADD: "➕",
  BANK: "🏦",
  MIC: "🎙️",
  SPEAKER: "🔊",
  STOP: "⏹",
  IMAGE: "🖼️",
  BACK: "←",
  CORRECT: "✅",
  INFO: "ℹ️",
  WARN: "⚠️",
  FONT_DOWN: "A−",
  FONT_UP: "A+",
  CONTRAST: "◐"
} as const;

export const VERDICTS = ["RED", "AMBER", "GREEN"] as const;
export type Verdict = (typeof VERDICTS)[number];
export const VERDICT_META = {
  RED: { icon: ICONS.EMERGENCY, labelKey: "verdictRed", className: "red" },
  AMBER: { icon: ICONS.WARN, labelKey: "verdictAmber", className: "amber" },
  GREEN: { icon: ICONS.CORRECT, labelKey: "verdictGreen", className: "green" }
} as const;

/** Home screen actions, in priority order. labelKey/subKey resolve via i18n. */
export const HOME_ACTIONS = [
  { route: ROUTES.EMERGENCY, icon: ICONS.EMERGENCY, labelKey: "emergency", subKey: "emergencySub", kind: "emergency" },
  { route: ROUTES.CHECK, icon: ICONS.CHECK, labelKey: "check", subKey: "checkSub", kind: "primary" },
  { route: ROUTES.VERIFY, icon: ICONS.VERIFY, labelKey: "verify", subKey: "verifySub" },
  { route: ROUTES.PAID, icon: ICONS.PAID, labelKey: "paid", subKey: "paidSub" },
  { route: ROUTES.CIRCLE, icon: ICONS.CIRCLE, labelKey: "circle", subKey: "circleSub" },
  { route: ROUTES.LEARN, icon: ICONS.LEARN, labelKey: "learn", subKey: "learnSub" }
] as const;

export const API = { AI: "/api/ai" } as const;
