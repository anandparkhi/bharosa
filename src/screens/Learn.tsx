import { useState } from "react";
import { Back } from "../components/Back";
import { Mic } from "../components/Mic";
import { Speak } from "../components/Speak";
import { askQuestion } from "../lib/api";
import { useSettings } from "../lib/settings";
import drills from "../data/drills.json";
import { ICONS } from "../constants";

type Localised = Record<string, string>;
type Drill = { id: number; scam: boolean; text: Localised; why: Localised };
const DRILLS = drills as Drill[];

export function Learn() {
  const { t, lang } = useSettings();
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [answer, setAnswer] = useState("");
  const [failed, setFailed] = useState(false);

  const { scam, text: textByLang, why: whyByLang } = DRILLS[index % DRILLS.length];
  const text = textByLang[lang] || textByLang.en;
  const why = whyByLang[lang] || whyByLang.en;
  const answered = correct !== null;
  const feedback = correct ? t("drillCorrect") : t("drillWrong");

  const next = () => {
    setIndex((i) => i + 1);
    setCorrect(null);
  };
  const ask = async () => {
    setBusy(true);
    setFailed(false);
    setAnswer("");
    try {
      setAnswer((await askQuestion({ text: question, lang })).answer);
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main>
      <Back />
      <h1>{t("learnTitle")}</h1>

      <section className="card" aria-labelledby="drill">
        <h2 id="drill" style={{ marginTop: 0 }}>
          {t("drillIntro")}
        </h2>
        <p className="evidence drill-text">{text}</p>
        <Speak text={text} />
        {answered ? (
          <div className={`result ${scam ? "red" : "green"}`} role="status" aria-live="polite">
            <h2>
              <span aria-hidden="true">{correct ? ICONS.CORRECT : ICONS.INFO}</span> {feedback}
            </h2>
            <p>{why}</p>
            <Speak text={`${feedback} ${why}`} autoplay />
            <div className="row" style={{ marginTop: ".75rem" }}>
              <button className="btn fill" onClick={next}>
                {t("drillNext")}
              </button>
            </div>
          </div>
        ) : (
          <div className="row" style={{ marginTop: ".75rem" }}>
            <button className="btn danger" onClick={() => setCorrect(scam)}>
              {t("drillScam")}
            </button>
            <button className="btn" onClick={() => setCorrect(!scam)}>
              {t("drillSafe")}
            </button>
            <button className="btn quiet" onClick={() => setCorrect(false)}>
              {t("drillUnsure")}
            </button>
          </div>
        )}
      </section>

      <h2>{t("askTitle")}</h2>
      <p className="help">{t("askHelp")}</p>
      <label htmlFor="q" className="sr-only">
        {t("askPlaceholder")}
      </label>
      <textarea
        id="q"
        className="short"
        value={question}
        onChange={({ target }) => setQuestion(target.value)}
        placeholder={t("askPlaceholder")}
      />
      <div className="row" style={{ marginTop: ".5rem" }}>
        <Mic onText={(s) => setQuestion((v) => `${v ? `${v} ` : ""}${s}`)} />
        <button className="btn fill" disabled={busy || !question.trim()} onClick={ask}>
          {busy ? t("asking") : t("ask")}
        </button>
      </div>
      <p className="status" role="status" aria-live="polite">
        {busy && t("asking")}
      </p>
      {failed && (
        <p className="result amber" role="alert">
          {t("checkError")}
        </p>
      )}
      {answer && (
        <section className="card" aria-live="polite">
          <p className="prewrap">{answer}</p>
          <Speak text={answer} autoplay />
        </section>
      )}
    </main>
  );
}
