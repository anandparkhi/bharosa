import { useState } from "react";
import { Back } from "../components/Back";
import { Speak } from "../components/Speak";
import { useSettings } from "../lib/settings";
import { getContacts, load, persist, waLink } from "../lib/storage";
import {
  DEVICE_KEY, GUIDES, HISTORY_KEY, addOutcome, getGuide, helperDraft, outcomeStats, parseHistory,
  type CoachLang, type Device, type Outcome, type TaskEvent, type TaskId
} from "../lib/coach";

type Copy = {
  title: string; lead: string; device: string; choose: string; back: string; next: string;
  done: string; stuck: string; help: string; privacy: string; progress: string;
  chooseHelper: string; preview: string; consent: string; openWhatsApp: string;
  sendReminder: string; noContacts: string; saved: string; error: string;
  erase: string; eraseDone: string; stats: string; zero: string; privacyNote: string;
};
const COPY: Record<CoachLang, Copy> = {
  en: {
    title: "Get something done", lead: "Follow one safe phone step at a time. Your phone may show slightly different menu names.",
    device: "Which phone do you use?", choose: "What would you like to do?", back: "Previous step",
    next: "Next step", done: "I did it", stuck: "I couldn't finish", help: "Ask a trusted person",
    privacy: "This guide works without AI or uploading your activity. Only task type, device and outcome are saved on this phone.",
    progress: "Step", chooseHelper: "Choose who to ask", preview: "This is the only text you will share:",
    consent: "I have reviewed this message and choose to share it.",
    openWhatsApp: "Open WhatsApp draft", sendReminder: "WhatsApp opens a draft. You must review and send it yourself. Bharosa cannot confirm delivery or resolution.",
    noContacts: "Add a trusted contact in Trusted Circle first.",
    saved: "Outcome saved on this device.", error: "Could not save on this device. Your result was not recorded.",
    erase: "Delete my task history", eraseDone: "Task history deleted from this device.",
    stats: "Tasks you reported completed", zero: "No task outcomes recorded yet.",
    privacyNote: "No OTPs, screenshots or conversation contents are stored in the task history. Deleting it does not delete messages you separately send in WhatsApp."
  },
  hi: {
    title: "अपना काम पूरा करें", lead: "फ़ोन का एक-एक सुरक्षित चरण देखें। मेनू के नाम बदल सकते हैं।",
    device: "आपका फ़ोन कौन सा है?", choose: "क्या करना चाहते हैं?", back: "पिछला चरण",
    next: "अगला चरण", done: "काम हो गया", stuck: "काम पूरा नहीं हुआ", help: "विश्वसनीय व्यक्ति से मदद",
    privacy: "यह गाइड AI के बिना चलता है। केवल काम, फ़ोन और नतीजा इस फ़ोन में सेव होता है।",
    progress: "चरण", chooseHelper: "किससे मदद चाहिए?", preview: "सिर्फ़ यह संदेश साझा होगा:",
    consent: "मैंने संदेश पढ़ लिया है और इसे भेजना चाहता/चाहती हूँ।",
    openWhatsApp: "WhatsApp ड्राफ़्ट खोलें", sendReminder: "WhatsApp में सिर्फ़ ड्राफ़्ट खुलेगा। भेजना आपको होगा। भरोसा डिलीवरी की पुष्टि नहीं करता।",
    noContacts: "पहले Trusted Circle में संपर्क जोड़ें।",
    saved: "नतीजा इस फ़ोन पर सेव हुआ।", error: "इस फ़ोन में सेव नहीं हुआ। नतीजा दर्ज नहीं हुआ।",
    erase: "काम का इतिहास मिटाएँ", eraseDone: "इस फ़ोन से काम का इतिहास मिटा दिया।",
    stats: "आपके अनुसार पूरे किए काम", zero: "अभी कोई नतीजा दर्ज नहीं हुआ।",
    privacyNote: "इतिहास में OTP, स्क्रीनशॉट या बातचीत नहीं रखी जाती। WhatsApp पर भेजे संदेश अलग होते हैं।"
  },
  mr: {
    title: "तुमचे काम पूर्ण करा", lead: "फोनवर एकावेळी एक सुरक्षित पाऊल वापरा. मेनूची नावे वेगळी असू शकतात.",
    device: "तुमचा फोन कोणता?", choose: "कोणते काम करायचे?", back: "मागील पाऊल",
    next: "पुढील पाऊल", done: "काम झाले", stuck: "काम पूर्ण झाले नाही", help: "विश्वासू व्यक्तीची मदत",
    privacy: "हे मार्गदर्शन AI शिवाय चालते. फक्त काम, फोन आणि निकाल या फोनवर साठतो.",
    progress: "पाऊल", chooseHelper: "कोणाची मदत घ्यायची?", preview: "फक्त हा संदेश पाठवला जाईल:",
    consent: "मी हा संदेश वाचला असून तो पाठवण्यास संमती देतो/देते.",
    openWhatsApp: "WhatsApp मसुदा उघडा", sendReminder: "WhatsApp मध्ये फक्त मसुदा उघडतो. तुम्हालाच पाठवावा लागेल. भरोसा पोहोचल्याची खात्री देत नाही.",
    noContacts: "आधी Trusted Circle मध्ये संपर्क जोडा.",
    saved: "निकाल या फोनवर साठवला.", error: "या फोनवर साठवता आले नाही. निकाल नोंदला गेला नाही.",
    erase: "कामाचा इतिहास पुसा", eraseDone: "या फोनवरील कामाचा इतिहास पुसला.",
    stats: "तुम्ही पूर्ण झाल्याचे नोंदवलेली कामे", zero: "अजून कोणताही निकाल नाही.",
    privacyNote: "इतिहासात OTP, स्क्रीनशॉट किंवा संभाषणे साठत नाहीत. WhatsApp वरील संदेश वेगळे असतात."
  }
};

export function Coach() {
  const { lang } = useSettings();
  const copy = COPY[lang];
  const [device, setDevice] = useState<Device>(() => load<unknown>(DEVICE_KEY, "android") === "iphone" ? "iphone" : "android");
  const [task, setTask] = useState<TaskId | null>(null);
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState<TaskEvent[]>(() => {
    try { return parseHistory(localStorage.getItem(HISTORY_KEY)); } catch { return []; }
  });
  const [status, setStatus] = useState("");
  const [sharing, setSharing] = useState(false);
  const [approved, setApproved] = useState(false);
  const [helperPhone, setHelperPhone] = useState("");
  const contacts = getContacts();
  const guide = task ? getGuide(task, lang, device) : null;
  const stats = outcomeStats(history);
  const chooseDevice = (next: Device) => {
    if (persist(DEVICE_KEY, next)) {
      setDevice(next);
      setTask(null);
      setStep(0);
    } else setStatus(copy.error);
  };
  const chooseTask = (next: TaskId) => {
    setTask(next);
    setStep(0);
    setSharing(false);
    setApproved(false);
    setStatus("");
  };
  const log = (outcome: Outcome): boolean => {
    if (!task) return false;
    const next = addOutcome(history, { task, outcome, device, at: Date.now() });
    if (!persist(HISTORY_KEY, next)) { setStatus(copy.error); return false; }
    setHistory(next);
    setStatus(copy.saved);
    return true;
  };
  const finish = (outcome: Outcome) => {
    if (log(outcome)) {
      setTask(null);
      setStep(0);
      setSharing(false);
      setApproved(false);
    }
  };
  const erase = () => {
    try {
      localStorage.removeItem(HISTORY_KEY);
      setHistory([]);
      setStatus(copy.eraseDone);
    } catch { setStatus(copy.error); }
  };
  const draft = task ? helperDraft(task, lang, device) : "";
  return (
    <main>
      <Back />
      <h1>{copy.title}</h1>
      <p className="lead">{copy.lead}</p>
      <p className="help">{copy.privacy}</p>
      <fieldset className="card">
        <legend>{copy.device}</legend>
        <div className="row">
          <button type="button" className={device === "android" ? "btn fill" : "btn"} aria-pressed={device === "android"} onClick={() => chooseDevice("android")}>Android</button>
          <button type="button" className={device === "iphone" ? "btn fill" : "btn"} aria-pressed={device === "iphone"} onClick={() => chooseDevice("iphone")}>iPhone</button>
        </div>
      </fieldset>
      {!guide ? (
        <section aria-labelledby="choose-task">
          <h2 id="choose-task">{copy.choose}</h2>
          <div className="stack">
            {GUIDES.map((g) => (
              <button key={g.id} type="button" className="btn" onClick={() => chooseTask(g.id)}>
                {g.title[lang]}
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="card" aria-live="polite">
          <h2>{guide.title}</h2>
          <p className="help">{copy.progress} {step + 1} / {guide.steps.length}</p>
          <p className="lead">{guide.steps[step]}</p>
          <Speak text={guide.steps[step]} />
          <div className="row">
            <button type="button" className="btn" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>{copy.back}</button>
            {step < guide.steps.length - 1 && <button type="button" className="btn fill" onClick={() => setStep((s) => Math.min(guide.steps.length - 1, s + 1))}>{copy.next}</button>}
          </div>
          <div className="row" style={{ marginTop: "1rem" }}>
            <button type="button" className="btn fill" onClick={() => finish("completed")}>{copy.done}</button>
            <button type="button" className="btn" onClick={() => finish("unresolved")}>{copy.stuck}</button>
            <button type="button" className="btn quiet" onClick={() => { setSharing(true); setApproved(false); }}>{copy.help}</button>
          </div>
          {sharing && (
            <div className="card">
              <h3>{copy.chooseHelper}</h3>
              {contacts.length === 0 ? <p>{copy.noContacts}</p> : (
                <>
                  <label htmlFor="helper">{copy.chooseHelper}</label>
                  <select id="helper" value={helperPhone} onChange={(e) => { setHelperPhone(e.target.value); setApproved(false); }}>
                    <option value="">—</option>
                    {contacts.map((c) => <option key={c.phone} value={c.phone}>{c.name}</option>)}
                  </select>
                  <p>{copy.preview}</p>
                  <pre className="prewrap">{draft}</pre>
                  <label><input type="checkbox" checked={approved} onChange={(e) => setApproved(e.target.checked)} /> {copy.consent}</label>
                  <p className="help">{copy.sendReminder}</p>
                  {helperPhone && approved && (
                    <a className="btn fill" target="_blank" rel="noopener noreferrer" href={waLink(helperPhone, draft)}
                      onClick={() => { log("help_requested"); setApproved(false); }}>
                      {copy.openWhatsApp}
                    </a>
                  )}
                </>
              )}
            </div>
          )}
        </section>
      )}
      <p className="status" role="status" aria-live="polite">{status}</p>
      <section className="card" aria-label={copy.stats}>
        <h2>{copy.stats}</h2>
        <p>{stats.total ? String(stats.completed) + " / " + String(stats.total) : copy.zero}</p>
        <p className="help">{copy.privacyNote}</p>
        <button type="button" className="btn quiet" disabled={history.length === 0} onClick={erase}>{copy.erase}</button>
      </section>
    </main>
  );
}
