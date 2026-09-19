import { useEffect, useState } from "react";
import { isSpeaking, speak, stopSpeaking } from "../lib/speech";
import { useSettings } from "../lib/settings";
import { ICONS } from "../constants";

const POLL_MS = 500;

/** Read-aloud control. Always paired with visible text so audio and text match. */
export function Speak({ text, autoplay = false }: { text: string; autoplay?: boolean }) {
  const { t, bcp47 } = useSettings();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (autoplay) {
      speak(text, bcp47);
      setActive(true);
    }
    return stopSpeaking;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, bcp47]);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      if (!isSpeaking()) setActive(false);
    }, POLL_MS);
    return () => clearInterval(id);
  }, [active]);

  const toggle = () => {
    if (active) {
      stopSpeaking();
      setActive(false);
    } else {
      speak(text, bcp47);
      setActive(true);
    }
  };
  return (
    <button type="button" className="btn quiet" aria-pressed={active} onClick={toggle}>
      <span aria-hidden="true">{active ? ICONS.STOP : ICONS.SPEAKER}</span> {active ? t("stop") : t("speak")}
    </button>
  );
}
