import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { LANGS, STRINGS, type Lang, type Strings } from "../i18n/strings";
import { DEFAULT_FONT_STEP, DEFAULT_LANG, FONT_SCALE, STORAGE_KEYS } from "../constants";
import { load, persist } from "./storage";

export type StringKey = keyof Strings;
type Settings = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  bcp47: string;
  fontStep: number;
  maxFontStep: number;
  fontUp: () => void;
  fontDown: () => void;
  highContrast: boolean;
  toggleContrast: () => void;
  t: (key: StringKey, vars?: Record<string, string>) => string;
};

const Ctx = createContext<Settings | null>(null);
const MAX_FONT_STEP = FONT_SCALE.length - 1;

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => load(STORAGE_KEYS.LANG, DEFAULT_LANG));
  const [fontStep, setFontStep] = useState(() => load(STORAGE_KEYS.FONT, DEFAULT_FONT_STEP));
  const [highContrast, setHighContrast] = useState(() => load(STORAGE_KEYS.CONTRAST, false));

  useEffect(() => {
    document.documentElement.style.setProperty("--fs", String(FONT_SCALE[fontStep]));
    persist(STORAGE_KEYS.FONT, fontStep);
  }, [fontStep]);
  useEffect(() => {
    document.documentElement.dataset.contrast = highContrast ? "high" : "normal";
    persist(STORAGE_KEYS.CONTRAST, highContrast);
  }, [highContrast]);
  useEffect(() => {
    document.documentElement.lang = lang;
    persist(STORAGE_KEYS.LANG, lang);
  }, [lang]);

  const value = useMemo<Settings>(() => {
    const dict = STRINGS[lang];
    const t: Settings["t"] = (key, vars = {}) =>
      Object.entries(vars).reduce(
        (s, [k, v]) => s.replaceAll(`{${k}}`, v),
        dict[key] ?? STRINGS.en[key] ?? String(key)
      );
    return {
      lang,
      setLang,
      bcp47: LANGS.find(({ code }) => code === lang)!.bcp47,
      fontStep,
      maxFontStep: MAX_FONT_STEP,
      fontUp: () => setFontStep((s) => Math.min(MAX_FONT_STEP, s + 1)),
      fontDown: () => setFontStep((s) => Math.max(0, s - 1)),
      highContrast,
      toggleContrast: () => setHighContrast((v) => !v),
      t
    };
  }, [lang, fontStep, highContrast]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSettings() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}
