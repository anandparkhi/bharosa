import { useEffect, useRef, useState } from "react";
import { Back } from "../components/Back";
import { Mic } from "../components/Mic";
import { Speak } from "../components/Speak";
import { checkMessage, fileToBase64, type CheckInput, type CheckResult } from "../lib/api";
import { useSettings } from "../lib/settings";
import { getContacts, waLink } from "../lib/storage";
import { navigate } from "../lib/router";
import { ICONS, ROUTES, VERDICT_META } from "../constants";

type Shot = { file: File; url: string };

/** Android share-target and deep links arrive as /check?title=&text=&url= */
const sharedText = () => {
  const q = new URLSearchParams(location.search);
  return ["title", "text", "url"]
    .map((k) => q.get(k))
    .filter(Boolean)
    .join("\n");
};

export function Check() {
  const { t, lang } = useSettings();
  const [text, setText] = useState(sharedText);
  const [shot, setShot] = useState<Shot | null>(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [trusted] = getContacts();

  useEffect(
    () => () => {
      if (shot) URL.revokeObjectURL(shot.url);
    },
    [shot]
  );

  const run = async () => {
    setBusy(true);
    setFailed(false);
    setResult(null);
    try {
      const input: CheckInput = { text, lang };
      if (shot) Object.assign(input, { imageBase64: await fileToBase64(shot.file), imageType: shot.file.type });
      setResult(await checkMessage(input));
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  };
  const reset = () => {
    setResult(null);
    setText("");
    setShot(null);
  };
  const pickShot = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];
    if (file) setShot({ file, url: URL.createObjectURL(file) });
  };
  const clearShot = () => {
    setShot(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <main>
      <Back />
      <h1>{t("checkTitle")}</h1>
      <p className="lead">{t("checkHelp")}</p>
      {result ? (
        <Result result={result} onReset={reset} trustedPhone={trusted?.phone} />
      ) : (
        <>
          <label htmlFor="msg">{t("checkLabel")}</label>
          <textarea
            id="msg"
            value={text}
            onChange={({ target }) => setText(target.value)}
            placeholder={t("checkPlaceholder")}
          />
          <div className="row" style={{ marginTop: ".75rem" }}>
            <Mic onText={(s) => setText((v) => `${v ? `${v} ` : ""}${s}`)} />
          </div>
          <div className="row" style={{ marginTop: ".5rem" }}>
            <input ref={fileRef} type="file" accept="image/*" className="sr-only" id="shot" onChange={pickShot} />
            {shot ? (
              <button type="button" className="btn quiet" onClick={clearShot}>
                {t("removeImage")}
              </button>
            ) : (
              <button type="button" className="btn" onClick={() => fileRef.current?.click()}>
                <span aria-hidden="true">{ICONS.IMAGE}</span> {t("addScreenshot")}
              </button>
            )}
          </div>
          {shot && <img className="preview" src={shot.url} alt="" />}
          <div className="row" style={{ marginTop: "1rem" }}>
            <button type="button" className="btn fill" disabled={busy || (!text.trim() && !shot)} onClick={run}>
              {busy ? t("checking") : t("checkNow")}
            </button>
          </div>
          <p className="status" role="status" aria-live="polite">
            {busy && t("checking")}
          </p>
          {failed && (
            <div className="result amber" role="alert">
              <h2>
                <span aria-hidden="true">{ICONS.WARN}</span> {t("checkError")}
              </h2>
              <div className="row">
                <button className="btn danger" onClick={() => navigate(ROUTES.EMERGENCY)}>
                  {t("emergency")}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}

function Result({
  result,
  onReset,
  trustedPhone
}: {
  result: CheckResult;
  onReset: () => void;
  trustedPhone?: string;
}) {
  const { t } = useSettings();
  const { verdict, noticed, why, now } = result;
  const { icon, labelKey, className } = VERDICT_META[verdict];
  const label = t(labelKey);
  const isGreen = verdict === "GREEN";
  const spoken = [
    label,
    `${t("noticed")}: ${noticed.join(". ")}`,
    `${t("why")}: ${why}`,
    `${t("now")}: ${now}`,
    isGreen ? t("greenCaveat") : ""
  ]
    .filter(Boolean)
    .join(". ");
  const shareText = `${t("appName")}: ${label}\n${t("noticed")}: ${noticed.join("; ")}\n${t("why")}: ${why}\n${t("now")}: ${now}`;

  return (
    <section className={`result ${className}`} aria-live="assertive">
      <h2>
        <span aria-hidden="true">{icon}</span> {label}
      </h2>
      <Speak text={spoken} autoplay />
      <h2>{t("noticed")}</h2>
      {noticed.map((item) => (
        <p key={item} className="evidence">
          {item}
        </p>
      ))}
      <h2>{t("why")}</h2>
      <p>{why}</p>
      <p className="now">
        {t("now")}: {now}
      </p>
      {isGreen && <p className="help">{t("greenCaveat")}</p>}
      <div className="row" style={{ marginTop: "1rem" }}>
        {verdict === "RED" && (
          <button className="btn danger" onClick={() => navigate(ROUTES.EMERGENCY)}>
            {t("emergency")}
          </button>
        )}
        {!isGreen && (
          <button className="btn" onClick={() => navigate(ROUTES.VERIFY)}>
            {t("verify")}
          </button>
        )}
        {trustedPhone && (
          <a className="btn" href={waLink(trustedPhone, shareText)} target="_blank" rel="noreferrer">
            {t("shareResult")}
          </a>
        )}
        <button className="btn quiet" onClick={onReset}>
          {t("askAgain")}
        </button>
      </div>
    </section>
  );
}
