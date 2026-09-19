import { SPEECH_RATE } from "../constants";
// Browser-native TTS/STT: free, and offline-capable on most Android phones with Google TTS installed.

export function speak(text: string, lang: string) {
  if (!("speechSynthesis" in window)) return;
  const { speechSynthesis } = window;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = SPEECH_RATE;
  const voices = speechSynthesis.getVoices();
  const prefix = lang.slice(0, 2).toLowerCase();
  const voice =
    voices.find((v) => v.lang.toLowerCase() === lang.toLowerCase()) ??
    voices.find((v) => v.lang.toLowerCase().startsWith(prefix));
  if (voice) utterance.voice = voice;
  speechSynthesis.speak(utterance);
}

export const stopSpeaking = () => window.speechSynthesis?.cancel();
export const isSpeaking = () => Boolean(window.speechSynthesis?.speaking);

type SRConstructor = typeof window.SpeechRecognition;
const getRecognition = (): SRConstructor | undefined => {
  const { SpeechRecognition, webkitSpeechRecognition } = window as Window & { webkitSpeechRecognition?: SRConstructor };
  return SpeechRecognition ?? webkitSpeechRecognition;
};
export const canListen = () => Boolean(getRecognition());

type ListenHandlers = {
  onText: (text: string, isFinal: boolean) => void;
  onEnd: () => void;
  onError: (code: string) => void;
};

/** Starts one dictation session. Returns a stop() function. */
export function listen(lang: string, { onText, onEnd, onError }: ListenHandlers) {
  const Recognition = getRecognition();
  if (!Recognition) {
    onError("unsupported");
    onEnd();
    return () => {};
  }
  const rec = new Recognition();
  Object.assign(rec, { lang, interimResults: true, continuous: false, maxAlternatives: 1 });
  rec.onresult = ({ resultIndex, results }: SpeechRecognitionEvent) => {
    let interim = "",
      final = "";
    for (let i = resultIndex; i < results.length; i++) {
      const [{ transcript }] = [results[i][0]];
      if (results[i].isFinal) final += transcript;
      else interim += transcript;
    }
    if (final) onText(final, true);
    else if (interim) onText(interim, false);
  };
  rec.onerror = ({ error }: Event & { error?: string }) => onError(error ?? "error");
  rec.onend = onEnd;
  rec.start();
  return () => rec.stop();
}
