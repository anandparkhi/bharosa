/** Privacy-first, device-aware task guidance. No generative model and no sensitive content stored. */
export type CoachLang = "en" | "hi" | "mr";
export type Device = "android" | "iphone";
export type Outcome = "completed" | "unresolved" | "help_requested";
export type TaskId = "font" | "block" | "update" | "linked" | "screenshot" | "balance";
export type TaskEvent = { task: TaskId; outcome: Outcome; at: number; device: Device };
export type Guide = {
  id: TaskId;
  title: Record<CoachLang, string>;
  common: Record<CoachLang, string[]>;
  device: Record<Device, Record<CoachLang, string>>;
};
export const HISTORY_KEY = "bharosa.coach.outcomes.v1";
export const DEVICE_KEY = "bharosa.coach.device.v1";
const MAX_HISTORY = 100;
const CLOCK_SKEW_MS = Date.parse("1970-01-02T00:00:00Z") - Date.parse("1970-01-01T00:00:00Z");
const taskIds: TaskId[] = ["font", "block", "update", "linked", "screenshot", "balance"];
const outcomes: Outcome[] = ["completed", "unresolved", "help_requested"];

export const GUIDES: Guide[] = [
  {
    id: "font",
    title: { en: "Make text easier to read", hi: "अक्षर बड़े करें", mr: "अक्षरे मोठी करा" },
    common: {
      en: ["Open your phone's Settings.", "Find the text-size or font-size control.", "Adjust a little and check whether the text is now comfortable."],
      hi: ["फ़ोन की Settings खोलें।", "Text size या Font size खोजें।", "आकार बदलकर देखें कि अब पढ़ना आसान है या नहीं।"],
      mr: ["फोनची Settings उघडा.", "Text size किंवा Font size शोधा.", "आकार बदलून आता वाचायला सोपे होते का पाहा."]
    },
    device: {
      android: { en: "Search Settings for Font size. Menu names vary by manufacturer.", hi: "Settings में Font size खोजें। अलग फ़ोन में मेनू बदल सकते हैं।", mr: "Settings मध्ये Font size शोधा. फोननुसार मेनू बदलू शकतो." },
      iphone: { en: "Go to Settings > Display & Brightness > Text Size.", hi: "Settings > Display & Brightness > Text Size खोलें।", mr: "Settings > Display & Brightness > Text Size उघडा." }
    }
  },
  {
    id: "block",
    title: { en: "Block an unwanted caller", hi: "अनचाहा नंबर ब्लॉक करें", mr: "नको असलेला नंबर ब्लॉक करा" },
    common: {
      en: ["Open the Phone app and find the recent call.", "Open caller details and choose Block if available.", "Do not delete evidence you might need to report fraud."],
      hi: ["Phone ऐप में हाल की कॉल खोजें।", "कॉलर की जानकारी खोलकर Block चुनें।", "धोखाधड़ी का सबूत हो तो उसे न मिटाएँ।"],
      mr: ["Phone अ‍ॅपमध्ये अलीकडील कॉल शोधा.", "कॉलरची माहिती उघडून Block निवडा.", "फसवणुकीचा पुरावा असल्यास मिटवू नका."]
    },
    device: {
      android: { en: "Your Android dialer may label the action Block or Report spam.", hi: "Android पर Block या Report spam दिख सकता है।", mr: "Android वर Block किंवा Report spam दिसू शकते." },
      iphone: { en: "Tap the information (i) beside the call and look for Block Caller.", hi: "कॉल के पास (i) खोलें और Block Caller चुनें।", mr: "कॉलशेजारी (i) दाबून Block Caller शोधा." }
    }
  },
  {
    id: "update",
    title: { en: "Update an app safely", hi: "ऐप सुरक्षित अपडेट करें", mr: "अ‍ॅप सुरक्षितपणे अपडेट करा" },
    common: {
      en: ["Open your official app store yourself.", "Search for the app and verify its publisher.", "Tap Update if offered. Never install an APK sent by a stranger."],
      hi: ["आधिकारिक ऐप स्टोर खुद खोलें।", "ऐप खोजकर प्रकाशक जाँचें।", "Update दबाएँ। अनजान लिंक से APK न लें।"],
      mr: ["अधिकृत अ‍ॅप स्टोअर स्वतः उघडा.", "अ‍ॅप शोधून प्रकाशक तपासा.", "Update दाबा. अनोळखी लिंकवरून APK घेऊ नका."]
    },
    device: {
      android: { en: "Use Google Play Store.", hi: "Google Play Store इस्तेमाल करें।", mr: "Google Play Store वापरा." },
      iphone: { en: "Use Apple's App Store.", hi: "Apple App Store इस्तेमाल करें।", mr: "Apple App Store वापरा." }
    }
  },
  {
    id: "linked",
    title: { en: "Check WhatsApp linked devices", hi: "WhatsApp के जुड़े उपकरण जाँचें", mr: "WhatsApp ला जोडलेली उपकरणे तपासा" },
    common: {
      en: ["Open WhatsApp yourself, not a link from a message.", "Open Linked devices and review the list.", "Log out any device you did not authorise. Never share a linking code."],
      hi: ["WhatsApp खुद खोलें, किसी लिंक से नहीं।", "Linked devices की सूची देखें।", "अनजान उपकरण से Log out करें। लिंकिंग कोड न दें।"],
      mr: ["WhatsApp स्वतः उघडा, संदेशातील लिंकवरून नाही.", "Linked devices यादी तपासा.", "ओळख नसलेले उपकरण Log out करा. लिंकिंग कोड देऊ नका."]
    },
    device: {
      android: { en: "Open WhatsApp's three-dot menu and choose Linked devices.", hi: "WhatsApp के तीन-बिंदु मेनू से Linked devices खोलें।", mr: "WhatsApp च्या तीन ठिपक्यांच्या मेनूतून Linked devices उघडा." },
      iphone: { en: "Open WhatsApp Settings and choose Linked Devices.", hi: "WhatsApp Settings से Linked Devices खोलें।", mr: "WhatsApp Settings मधून Linked Devices उघडा." }
    }
  },
  {
    id: "screenshot",
    title: { en: "Take a screenshot privately", hi: "स्क्रीनशॉट सुरक्षित लें", mr: "सुरक्षित स्क्रीनशॉट काढा" },
    common: {
      en: ["Open the screen you want to capture.", "Capture the screen with your phone's buttons.", "Before sharing, hide account details, passwords and OTPs."],
      hi: ["वह स्क्रीन खोलें जिसकी तस्वीर चाहिए।", "फ़ोन के बटन से स्क्रीनशॉट लें।", "भेजने से पहले खाते, पासवर्ड और OTP छिपाएँ।"],
      mr: ["ज्या स्क्रीनचा फोटो हवा ती उघडा.", "फोनच्या बटणांनी स्क्रीनशॉट काढा.", "पाठवण्यापूर्वी खाते, पासवर्ड आणि OTP झाका."]
    },
    device: {
      android: { en: "On many Android phones, press Power + Volume Down together.", hi: "कई Android फ़ोन पर Power और Volume Down साथ दबाएँ।", mr: "अनेक Android फोनवर Power आणि Volume Down एकत्र दाबा." },
      iphone: { en: "On Face ID iPhones, press Side + Volume Up; older models may use Home + Side.", hi: "Face ID iPhone पर Side और Volume Up साथ दबाएँ।", mr: "Face ID iPhone वर Side आणि Volume Up एकत्र दाबा." }
    }
  },
  {
    id: "balance",
    title: { en: "Find your bank balance safely", hi: "बैंक बैलेंस सुरक्षित देखें", mr: "बँक शिल्लक सुरक्षित पाहा" },
    common: {
      en: ["Open the official bank app you already use, not a message link.", "Find Accounts or Balance; the wording depends on the bank.", "Enter credentials privately only in your bank app. Never tell Bharosa, callers or helpers your OTP or PIN."],
      hi: ["बैंक का अपना आधिकारिक ऐप खोलें, संदेश की लिंक नहीं।", "Accounts या Balance खोजें।", "सिर्फ बैंक ऐप में निजी तौर पर लॉगिन करें। भरोसा या किसी व्यक्ति को OTP या PIN न दें।"],
      mr: ["बँकेचे स्वतःचे अधिकृत अ‍ॅप उघडा, संदेशातील लिंक नाही.", "Accounts किंवा Balance शोधा.", "बँक अ‍ॅपमध्येच खाजगीत लॉगिन करा. भरोसा किंवा इतरांना OTP किंवा PIN देऊ नका."]
    },
    device: {
      android: { en: "If unsure which app is genuine, contact your bank through your bank card or statement.", hi: "ऐप असली है या नहीं, बैंक कार्ड या स्टेटमेंट से संपर्क करें।", mr: "अ‍ॅप खरे आहे का शंका असल्यास बँक कार्ड किंवा स्टेटमेंटवरील नंबर वापरा." },
      iphone: { en: "If unsure which app is genuine, contact your bank through your bank card or statement.", hi: "ऐप असली है या नहीं, बैंक कार्ड या स्टेटमेंट से संपर्क करें।", mr: "अ‍ॅप खरे आहे का शंका असल्यास बँक कार्ड किंवा स्टेटमेंटवरील नंबर वापरा." }
    }
  }
];

export function isTaskId(value: unknown): value is TaskId {
  return typeof value === "string" && taskIds.includes(value as TaskId);
}
export function getGuide(id: TaskId, lang: CoachLang, device: Device) {
  const guide = GUIDES.find((g) => g.id === id);
  if (!guide) return null;
  return { id, title: guide.title[lang], steps: [guide.device[device][lang], ...guide.common[lang]] };
}
export function parseHistory(raw: string | null): TaskEvent[] {
  if (!raw) return [];
  try {
    const entries: unknown = JSON.parse(raw);
    if (!Array.isArray(entries)) return [];
    return entries.filter((item): item is TaskEvent =>
      !!item && typeof item === "object" &&
      isTaskId(item.task) && outcomes.includes(item.outcome) &&
      (item.device === "android" || item.device === "iphone") &&
      typeof item.at === "number" && Number.isFinite(item.at) &&
      item.at > 0 && item.at <= Date.now() + CLOCK_SKEW_MS
    ).slice(-MAX_HISTORY).map((event) => ({ task: event.task, outcome: event.outcome, at: event.at, device: event.device }));
  } catch {
    return [];
  }
}
export function addOutcome(history: TaskEvent[], event: TaskEvent): TaskEvent[] {
  if (!isTaskId(event.task) || !outcomes.includes(event.outcome) ||
    (event.device !== "android" && event.device !== "iphone") ||
    !Number.isFinite(event.at) || event.at <= 0) return history.slice(-MAX_HISTORY);
  return [...history, event].slice(-MAX_HISTORY);
}
export function outcomeStats(history: TaskEvent[]) {
  const completed = history.filter((e) => e.outcome === "completed").length;
  const total = history.length;
  return { completed, total, rate: total ? completed / total : null };
}
/** Draft contains reviewed task title only, never screenshot, chat history or credentials. */
export function helperDraft(id: TaskId, lang: CoachLang, device: Device): string {
  const g = getGuide(id, lang, device);
  if (!g) return "";
  const intro = { en: "I would like help with a phone task:", hi: "मुझे इस फ़ोन काम में मदद चाहिए:", mr: "मला या फोनच्या कामात मदत हवी आहे:" }[lang];
  const note = { en: "Please ask me what I want to share. Never ask for my OTP or PIN.", hi: "क्या साझा करना है, मुझसे पूछें। OTP या PIN न माँगें।", mr: "काय शेअर करायचे ते मला विचारा. OTP किंवा PIN मागू नका." }[lang];
  return [intro, g.title, note].join("\n");
}
