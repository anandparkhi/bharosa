import { useEffect, useRef, useState } from "react";
import { canListen, listen } from "../lib/speech";
import { useSettings } from "../lib/settings";
import { ICONS } from "../constants";

type State = "idle" | "listening" | "unsupported";

/** Dictation control. Emits each final transcript. */
export function Mic({ onText }: { onText: (text: string) => void }) {
  const { t, bcp47 } = useSettings();
  const [state, setState] = useState<State>(canListen() ? "idle" : "unsupported");
  const [failed, setFailed] = useState(false);
  const stopRef = useRef<() => void>(() => {});
  useEffect(() => () => stopRef.current(), []);

  if (state === "unsupported") return <p className="help">{t("micUnsupported")}</p>;
  const listening = state === "listening";
  const toggle = () => {
    if (listening) return stopRef.current();
    setFailed(false);
    setState("listening");
    stopRef.current = listen(bcp47, {
      onText: (text, isFinal) => {
        if (isFinal) onText(text);
      },
      onEnd: () => setState("idle"),
      onError: () => {
        setState("idle");
        setFailed(true);
      }
    });
  };
  return (
    <div>
      <button type="button" className="btn" aria-pressed={listening} onClick={toggle}>
        <span aria-hidden="true">{ICONS.MIC}</span> {listening ? t("listening") : t("listen")}
      </button>
      <p className="status" role="status" aria-live="polite">
        {failed && t("micError")}
        {listening && <span className="listening">{t("listening")}</span>}
      </p>
    </div>
  );
}
