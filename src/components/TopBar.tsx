import { LANGS } from "../i18n/strings";
import { useSettings } from "../lib/settings";
import { ICONS } from "../constants";

export function TopBar() {
  const { t, lang, setLang, fontUp, fontDown, fontStep, maxFontStep, highContrast, toggleContrast } = useSettings();
  return (
    <header className="topbar">
      <p className="brand">{t("appName")}</p>
      <div className="controls" role="group" aria-label={t("language")}>
        {LANGS.map(({ code, label, bcp47 }) => (
          <button
            key={code}
            type="button"
            className="chip"
            lang={bcp47}
            aria-pressed={lang === code}
            onClick={() => setLang(code)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="controls">
        <button
          type="button"
          className="chip"
          onClick={fontDown}
          disabled={fontStep === 0}
          aria-label={t("fontSmaller")}
        >
          {ICONS.FONT_DOWN}
        </button>
        <button
          type="button"
          className="chip"
          onClick={fontUp}
          disabled={fontStep === maxFontStep}
          aria-label={t("fontBigger")}
        >
          {ICONS.FONT_UP}
        </button>
        <button
          type="button"
          className="chip"
          onClick={toggleContrast}
          aria-pressed={highContrast}
          aria-label={t("contrast")}
        >
          {ICONS.CONTRAST}
        </button>
      </div>
    </header>
  );
}
