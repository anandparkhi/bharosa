export type Lang = "hi" | "mr" | "en";

export const LANGS: { code: Lang; label: string; bcp47: string }[] = [
  { code: "hi", label: "हिन्दी", bcp47: "hi-IN" },
  { code: "mr", label: "मराठी", bcp47: "mr-IN" },
  { code: "en", label: "English", bcp47: "en-IN" }
];

const en = {
  storageError: "Could not save on this device. Check browser storage permissions and try again.",
  duplicateContact: "This number is already saved.",
  invalidPhone: "Enter a valid number. Add the country code for numbers outside India.",
  circlePrivacy:
    "Contacts stay in this browser. No one is notified automatically. WhatsApp opens a draft; you must send it.",
  drillUnsureFeedback: "Pausing to check is a good choice. Here is what to look for.",
  askError: "Phone help is unavailable right now. Try again, or ask someone you trust.",
  checkPrivacy:
    "Checking sends this text or image to our server and AI provider (Anthropic). Remove OTPs, passwords, and unnecessary personal details before submitting.",
  limitedAnalysis: "Full analysis unavailable. This is limited guidance, not a completed check.",
  micError: "We could not use the microphone. Check permission or type your question.",
  sourceChecked: "Source checked: {date}",
  sourceUnverified: "Contact details need rechecking on the official website.",
  appName: "Bharosa",
  tagline: "You are not alone. Let us check together.",
  fontSmaller: "Smaller text",
  fontBigger: "Bigger text",
  contrast: "High contrast",
  language: "Language",
  back: "Back",
  speak: "Read aloud",
  stop: "Stop reading",
  listen: "Speak instead of typing",
  listening: "Listening… speak now",
  micUnsupported: "Voice typing is not available in this browser. You can type instead.",

  // Home
  homeTitle: "What do you need right now?",
  emergency: "Someone is threatening me",
  emergencySub: "Get calm steps and call your trusted person",
  check: "Is this message or call real?",
  checkSub: "Paste a message, add a screenshot, or tell us what happened",
  verify: "Call the real bank or office",
  verifySub: "Official numbers only. Never the number they gave you",
  circle: "My trusted people",
  circleSub: "Set up who to call and share with",
  learn: "Practice and ask",
  learnSub: "Practice recognising scams and get everyday phone help",
  paid: "I already sent money",
  paidSub: "Report it now, even if time has passed",

  // Emergency
  emTitle: "Take a breath. Let us get help.",
  emLine1: "No police, court, or bank arrests anyone over the phone.",
  emLine2: "Pressure to keep a money request secret is a warning sign. Speak to someone you trust.",
  emLine3: "You deserve help without blame. It is okay to pause and ask.",
  emStep1: "Cut the call. Do not call back.",
  emStep2: "Do not send money. Do not share any OTP or PIN.",
  emStep3: "Call your trusted person now.",
  emCallTrusted: "Call {name}",
  emNoTrusted: "Add a trusted person",
  emCall1930: "Call 1930 (India cyber helpline)",
  emCall112: "Call 112 (India emergency)",
  emShareCase: "Send this to {name} on WhatsApp",
  emShareText: "I got a threatening call/message. Please call me now. (Sent from Bharosa app)",

  // Check
  checkTitle: "Tell us what happened",
  checkHelp: "You can paste the message, add a screenshot, or just speak.",
  checkLabel: "The message, or what the caller said",
  checkPlaceholder: "For example: A man said he is from CBI and my Aadhaar was used for a crime…",
  addScreenshot: "Add a screenshot",
  removeImage: "Remove screenshot",
  checkNow: "Check this",
  checking: "Checking… this takes a few seconds",
  checkError:
    "We could not complete the check. Try again later. If someone is pressuring you, pause and call a trusted person.",
  noticed: "What we noticed",
  why: "Why it matters",
  now: "What to do now",
  verdictRed: "Strong signs of a scam",
  verdictAmber: "We cannot confirm this. Check on your own",
  verdictGreen: "No warning signs found",
  greenCaveat: "We still cannot confirm who sent this. When in doubt, call the real office yourself.",
  askAgain: "Check another message",
  shareResult: "Send result to my trusted person",

  // Verify
  verifyTitle: "Call the real office",
  verifyLead:
    "These contacts are for India. Open the official website independently to confirm current contact details.",
  verifyNote:
    "Phone numbers can change. Cross-check with the official website or your bank card or statement. Bharosa does not verify a caller’s identity.",
  callNumber: "Call {n}",
  openSite: "Open official website",

  // Circle
  circleTitle: "My trusted people",
  circleLead:
    "Add up to three people you trust. Bharosa will make it easy to call or message them when you feel unsure.",
  name: "Name",
  phone: "Indian mobile number, or international number with country code",
  save: "Save",
  remove: "Remove",
  saved: "Saved",
  circleEmpty: "No one added yet. Add your son, daughter, neighbour, or friend.",
  yourName: "Your name (so they know who is messaging)",

  // Learn
  learnTitle: "Practice and ask",
  drillIntro: "What warning signs can you spot?",
  drillScam: "Scam",
  drillSafe: "No obvious warning signs",
  drillUnsure: "Not sure",
  drillCorrect: "Correct.",
  drillWrong: "Not quite. Here is why.",
  drillNext: "Next one",
  askTitle: "Help using your phone",
  askHelp:
    "Supported topics: text size, blocking calls, screenshots, WhatsApp, updates, sound, and finding your bank balance. No coding, homework, or personal financial advice.",
  askPlaceholder: "Type or speak your question",
  ask: "Ask",
  asking: "Finding a simple answer…",

  // Paid
  paidTitle: "You sent money. Report it immediately.",
  paidLead:
    "Contact your bank and the cybercrime helpline promptly. Recovery is not guaranteed, but it is still worth reporting even if time has passed.",
  paidStep1: "Call your bank’s official number now and say: “I want to report a fraud transaction and freeze it.”",
  paidStep2: "Call 1930. Tell them the amount, time, and the number you sent it to.",
  paidStep3: "File a report at cybercrime.gov.in. Your trusted person can help.",
  paidStep4: "Keep messages and transaction records. Do not send more money to anyone promising recovery.",
  paidCallBank: "Find my bank’s number",

  offline: "You are offline. Saved guidance is available; calls need phone service and WhatsApp needs internet.",
  poweredNote: "Bharosa gives guidance, not a guarantee. When unsure, call the real office yourself."
};

export type Strings = typeof en;

const hi: Strings = {
  storageError: "इस डिवाइस पर सहेज नहीं पाए। ब्राउज़र की स्टोरेज अनुमति जाँचकर फिर कोशिश करें।",
  duplicateContact: "यह नंबर पहले से सहेजा गया है।",
  invalidPhone: "सही नंबर डालें। भारत से बाहर के नंबर में देश कोड जोड़ें।",
  circlePrivacy:
    "संपर्क इसी ब्राउज़र में रहते हैं। किसी को अपने आप सूचना नहीं जाती। WhatsApp में ड्राफ़्ट खुलेगा; उसे आपको भेजना होगा।",
  drillUnsureFeedback: "रुककर जाँचना अच्छा कदम है। इन संकेतों को देखें।",
  askError: "फ़ोन की मदद अभी उपलब्ध नहीं है। फिर कोशिश करें या भरोसेमंद व्यक्ति से पूछें।",
  checkPrivacy:
    "जाँच के लिए यह संदेश या तस्वीर हमारे सर्वर और AI प्रदाता (Anthropic) को भेजी जाती है। भेजने से पहले OTP, पासवर्ड और अनावश्यक निजी जानकारी हटाएँ।",
  limitedAnalysis: "पूरी जाँच उपलब्ध नहीं है। यह सीमित मार्गदर्शन है, पूरी जाँच नहीं।",
  micError: "माइक्रोफ़ोन इस्तेमाल नहीं हो पाया। अनुमति जाँचें या सवाल टाइप करें।",
  sourceChecked: "स्रोत जाँचा गया: {date}",
  sourceUnverified: "आधिकारिक वेबसाइट पर संपर्क की जानकारी फिर जाँचें।",
  appName: "भरोसा",
  tagline: "आप अकेले नहीं हैं। चलिए साथ में जाँचते हैं।",
  fontSmaller: "अक्षर छोटे करें",
  fontBigger: "अक्षर बड़े करें",
  contrast: "गहरा रंग",
  language: "भाषा",
  back: "पीछे",
  speak: "पढ़कर सुनाएँ",
  stop: "पढ़ना रोकें",
  listen: "टाइप करने के बजाय बोलें",
  listening: "सुन रहे हैं… अब बोलिए",
  micUnsupported: "इस ब्राउज़र में बोलकर लिखना उपलब्ध नहीं है। आप टाइप कर सकते हैं।",

  homeTitle: "अभी आपको क्या चाहिए?",
  emergency: "कोई मुझे धमका रहा है",
  emergencySub: "शांत रहने के कदम पाएँ और अपने भरोसेमंद व्यक्ति को फ़ोन करें",
  check: "क्या यह संदेश या कॉल असली है?",
  checkSub: "संदेश चिपकाएँ, स्क्रीनशॉट डालें, या बताएँ क्या हुआ",
  verify: "असली बैंक या दफ़्तर को फ़ोन करें",
  verifySub: "सिर्फ़ आधिकारिक नंबर। कभी भी उनका दिया नंबर नहीं",
  circle: "मेरे भरोसेमंद लोग",
  circleSub: "तय करें किसे फ़ोन करना है और किसे बताना है",
  learn: "अभ्यास करें और पूछें",
  learnSub: "धोखे के संकेत पहचानने का अभ्यास और फ़ोन के रोज़मर्रा के कामों में मदद",
  paid: "मैंने पैसे भेज दिए हैं",
  paidSub: "समय बीत गया हो तब भी अभी शिकायत करें",

  emTitle: "एक गहरी साँस लीजिए। चलिए मदद लेते हैं।",
  emLine1: "कोई भी पुलिस, अदालत या बैंक फ़ोन पर किसी को गिरफ़्तार नहीं करता।",
  emLine2: "पैसे की माँग को गुप्त रखने का दबाव चेतावनी है। किसी भरोसेमंद व्यक्ति से बात करें।",
  emLine3: "बिना दोष दिए मदद मिलना आपका अधिकार है। रुककर पूछना ठीक है।",
  emStep1: "कॉल काट दीजिए। वापस फ़ोन मत कीजिए।",
  emStep2: "पैसे मत भेजिए। कोई OTP या PIN मत बताइए।",
  emStep3: "अभी अपने भरोसेमंद व्यक्ति को फ़ोन कीजिए।",
  emCallTrusted: "{name} को फ़ोन करें",
  emNoTrusted: "भरोसेमंद व्यक्ति जोड़ें",
  emCall1930: "1930 पर फ़ोन करें (भारत साइबर हेल्पलाइन)",
  emCall112: "112 पर फ़ोन करें (भारत आपातकाल)",
  emShareCase: "{name} को WhatsApp पर भेजें",
  emShareText: "मुझे एक धमकी भरा कॉल/संदेश आया है। कृपया मुझे अभी फ़ोन करें। (भरोसा ऐप से भेजा गया)",

  checkTitle: "बताइए क्या हुआ",
  checkHelp: "आप संदेश चिपका सकते हैं, स्क्रीनशॉट डाल सकते हैं, या बस बोल सकते हैं।",
  checkLabel: "संदेश, या कॉल करने वाले ने क्या कहा",
  checkPlaceholder: "जैसे: एक आदमी ने कहा कि वह CBI से है और मेरे आधार का अपराध में इस्तेमाल हुआ है…",
  addScreenshot: "स्क्रीनशॉट जोड़ें",
  removeImage: "स्क्रीनशॉट हटाएँ",
  checkNow: "इसे जाँचें",
  checking: "जाँच हो रही है… कुछ सेकंड लगेंगे",
  checkError:
    "जाँच पूरी नहीं हुई। थोड़ी देर बाद फिर कोशिश करें। कोई दबाव डाल रहा हो तो रुकें और भरोसेमंद व्यक्ति को फ़ोन करें।",
  noticed: "हमने क्या देखा",
  why: "यह क्यों ज़रूरी है",
  now: "अब क्या करें",
  verdictRed: "धोखाधड़ी के गंभीर संकेत",
  verdictAmber: "हम पक्का नहीं कह सकते। खुद जाँचें",
  verdictGreen: "कोई चेतावनी का संकेत नहीं मिला",
  greenCaveat: "फिर भी हम पक्का नहीं कह सकते कि यह किसने भेजा। शक हो तो असली दफ़्तर को खुद फ़ोन करें।",
  askAgain: "दूसरा संदेश जाँचें",
  shareResult: "नतीजा भरोसेमंद व्यक्ति को भेजें",

  verifyTitle: "असली दफ़्तर को फ़ोन करें",
  verifyLead: "ये संपर्क भारत के लिए हैं। ताज़ा जानकारी जाँचने के लिए आधिकारिक वेबसाइट खुद खोलें।",
  verifyNote:
    "नंबर बदल सकते हैं। आधिकारिक वेबसाइट, बैंक कार्ड या स्टेटमेंट से मिलान करें। भरोसा कॉल करने वाले की पहचान की पुष्टि नहीं करता।",
  callNumber: "{n} पर फ़ोन करें",
  openSite: "आधिकारिक वेबसाइट खोलें",

  circleTitle: "मेरे भरोसेमंद लोग",
  circleLead:
    "तीन तक ऐसे लोग जोड़ें जिन पर आपको भरोसा है। जब भी शक हो, भरोसा ऐप उन्हें फ़ोन या संदेश करना आसान बना देगा।",
  name: "नाम",
  phone: "भारतीय मोबाइल नंबर, या देश कोड सहित अंतरराष्ट्रीय नंबर",
  save: "सहेजें",
  remove: "हटाएँ",
  saved: "सहेज लिया",
  circleEmpty: "अभी कोई नहीं जोड़ा गया। अपने बेटे, बेटी, पड़ोसी या दोस्त को जोड़ें।",
  yourName: "आपका नाम (ताकि उन्हें पता चले कौन संदेश भेज रहा है)",

  learnTitle: "अभ्यास करें और पूछें",
  drillIntro: "कौन से चेतावनी के संकेत दिख रहे हैं?",
  drillScam: "धोखा",
  drillSafe: "स्पष्ट चेतावनी नहीं दिखती",
  drillUnsure: "पक्का नहीं",
  drillCorrect: "सही।",
  drillWrong: "पूरी तरह नहीं। वजह यह है।",
  drillNext: "अगला",
  askTitle: "फ़ोन चलाने में मदद",
  askHelp:
    "मदद के विषय: अक्षर बड़े करना, नंबर ब्लॉक करना, स्क्रीनशॉट, WhatsApp, अपडेट, आवाज़ और बैंक बैलेंस देखना। कोडिंग, होमवर्क या निजी वित्तीय सलाह नहीं।",
  askPlaceholder: "अपना सवाल टाइप करें या बोलें",
  ask: "पूछें",
  asking: "आसान जवाब ढूँढ रहे हैं…",

  paidTitle: "पैसे भेज दिए हैं। तुरंत शिकायत करें।",
  paidLead:
    "तुरंत अपने बैंक और साइबर हेल्पलाइन से संपर्क करें। पैसे वापस मिलने की गारंटी नहीं है, पर समय बीतने के बाद भी शिकायत करें।",
  paidStep1:
    "अभी अपने बैंक के आधिकारिक नंबर पर फ़ोन करें और कहें: “मुझे एक धोखाधड़ी लेनदेन की शिकायत करनी है और उसे रोकना है।”",
  paidStep2: "1930 पर फ़ोन करें। रकम, समय, और जिस नंबर पर भेजा वह बताएँ।",
  paidStep3: "cybercrime.gov.in पर शिकायत दर्ज करें। आपका भरोसेमंद व्यक्ति मदद कर सकता है।",
  paidStep4: "संदेश और लेनदेन के सबूत रखें। पैसे वापस दिलाने का वादा करने वाले को और पैसे न दें।",
  paidCallBank: "मेरे बैंक का नंबर ढूँढें",

  offline: "आप ऑफ़लाइन हैं। सहेजे गए निर्देश उपलब्ध हैं; कॉल के लिए फ़ोन सेवा और WhatsApp के लिए इंटरनेट चाहिए।",
  poweredNote: "भरोसा मार्गदर्शन देता है, गारंटी नहीं। शक हो तो असली दफ़्तर को खुद फ़ोन करें।"
};

const mr: Strings = {
  storageError: "या उपकरणावर जतन करता आले नाही. ब्राउझरची स्टोरेज परवानगी तपासून पुन्हा प्रयत्न करा.",
  duplicateContact: "हा क्रमांक आधीच जतन केला आहे.",
  invalidPhone: "योग्य क्रमांक टाका. भारताबाहेरील क्रमांकासाठी देश कोड जोडा.",
  circlePrivacy:
    "संपर्क याच ब्राउझरमध्ये राहतात. आपोआप सूचना जात नाही. WhatsApp मध्ये मसुदा उघडतो; तुम्हालाच तो पाठवावा लागेल.",
  drillUnsureFeedback: "थांबून तपासणे योग्य आहे. ही लक्षणे पाहा.",
  askError: "फोनची मदत सध्या उपलब्ध नाही. पुन्हा प्रयत्न करा किंवा विश्वासू व्यक्तीला विचारा.",
  checkPrivacy:
    "तपासणीसाठी हा संदेश किंवा फोटो आमच्या सर्व्हर व AI प्रदात्याकडे (Anthropic) पाठवला जातो. पाठवण्याआधी OTP, पासवर्ड व अनावश्यक खाजगी माहिती काढा.",
  limitedAnalysis: "पूर्ण तपासणी उपलब्ध नाही. हे मर्यादित मार्गदर्शन आहे, पूर्ण तपासणी नाही.",
  micError: "मायक्रोफोन वापरता आला नाही. परवानगी तपासा किंवा प्रश्न टाइप करा.",
  sourceChecked: "स्रोत तपासला: {date}",
  sourceUnverified: "अधिकृत संकेतस्थळावर संपर्क माहिती पुन्हा तपासा.",
  appName: "भरोसा",
  tagline: "तुम्ही एकटे नाही. चला, एकत्र तपासूया.",
  fontSmaller: "अक्षरे लहान करा",
  fontBigger: "अक्षरे मोठी करा",
  contrast: "गडद रंग",
  language: "भाषा",
  back: "मागे",
  speak: "वाचून दाखवा",
  stop: "वाचणे थांबवा",
  listen: "टाइप करण्याऐवजी बोला",
  listening: "ऐकत आहोत… आता बोला",
  micUnsupported: "या ब्राउझरमध्ये बोलून लिहिणे उपलब्ध नाही. तुम्ही टाइप करू शकता.",

  homeTitle: "आत्ता तुम्हाला काय हवे आहे?",
  emergency: "कोणी मला धमकावत आहे",
  emergencySub: "शांत राहण्याच्या पायऱ्या मिळवा आणि विश्वासू व्यक्तीला फोन करा",
  check: "हा संदेश किंवा कॉल खरा आहे का?",
  checkSub: "संदेश चिकटवा, स्क्रीनशॉट टाका, किंवा काय झाले ते सांगा",
  verify: "खऱ्या बँकेला किंवा कार्यालयाला फोन करा",
  verifySub: "फक्त अधिकृत क्रमांक. त्यांनी दिलेला क्रमांक कधीही नाही",
  circle: "माझी विश्वासू माणसे",
  circleSub: "कोणाला फोन करायचा आणि कोणाला सांगायचे ते ठरवा",
  learn: "सराव करा आणि विचारा",
  learnSub: "फसवणुकीची लक्षणे ओळखण्याचा सराव व फोनच्या रोजच्या कामांत मदत",
  paid: "मी पैसे पाठवले आहेत",
  paidSub: "वेळ गेला असला तरी आत्ताच तक्रार करा",

  emTitle: "एक दीर्घ श्वास घ्या. चला, मदत घेऊया.",
  emLine1: "कोणतीही पोलीस, न्यायालय किंवा बँक फोनवर कोणाला अटक करत नाही.",
  emLine2: "पैशांची मागणी गुप्त ठेवण्याचा दबाव हे धोक्याचे लक्षण आहे. विश्वासू व्यक्तीशी बोला.",
  emLine3: "दोष न देता मदत मिळणे तुमचा हक्क आहे. थांबून विचारणे योग्य आहे.",
  emStep1: "कॉल कट करा. परत फोन करू नका.",
  emStep2: "पैसे पाठवू नका. कोणताही OTP किंवा PIN सांगू नका.",
  emStep3: "आत्ता तुमच्या विश्वासू व्यक्तीला फोन करा.",
  emCallTrusted: "{name} यांना फोन करा",
  emNoTrusted: "विश्वासू व्यक्ती जोडा",
  emCall1930: "1930 वर फोन करा (भारत सायबर हेल्पलाइन)",
  emCall112: "112 वर फोन करा (भारत आपत्काल)",
  emShareCase: "{name} यांना WhatsApp वर पाठवा",
  emShareText: "मला धमकीचा कॉल/संदेश आला आहे. कृपया मला आत्ता फोन करा. (भरोसा अ‍ॅपमधून पाठवले)",

  checkTitle: "काय झाले ते सांगा",
  checkHelp: "तुम्ही संदेश चिकटवू शकता, स्क्रीनशॉट टाकू शकता, किंवा फक्त बोलू शकता.",
  checkLabel: "संदेश, किंवा फोन करणाऱ्याने काय सांगितले",
  checkPlaceholder: "उदा.: एका माणसाने सांगितले की तो CBI मधून आहे आणि माझे आधार गुन्ह्यात वापरले गेले…",
  addScreenshot: "स्क्रीनशॉट जोडा",
  removeImage: "स्क्रीनशॉट काढा",
  checkNow: "हे तपासा",
  checking: "तपासत आहोत… काही सेकंद लागतील",
  checkError:
    "तपासणी पूर्ण झाली नाही. थोड्या वेळाने पुन्हा प्रयत्न करा. कोणी दबाव टाकत असेल तर थांबा आणि विश्वासू व्यक्तीला फोन करा.",
  noticed: "आम्हाला काय दिसले",
  why: "हे का महत्त्वाचे आहे",
  now: "आता काय करावे",
  verdictRed: "फसवणुकीची गंभीर लक्षणे",
  verdictAmber: "आम्ही खात्री देऊ शकत नाही. स्वतः तपासा",
  verdictGreen: "धोक्याची लक्षणे आढळली नाहीत",
  greenCaveat: "तरीही हे कोणी पाठवले याची खात्री आम्ही देऊ शकत नाही. शंका असल्यास खऱ्या कार्यालयाला स्वतः फोन करा.",
  askAgain: "दुसरा संदेश तपासा",
  shareResult: "निकाल विश्वासू व्यक्तीला पाठवा",

  verifyTitle: "खऱ्या कार्यालयाला फोन करा",
  verifyLead: "हे संपर्क भारतासाठी आहेत. ताजी माहिती तपासण्यासाठी अधिकृत संकेतस्थळ स्वतः उघडा.",
  verifyNote:
    "क्रमांक बदलू शकतात. अधिकृत संकेतस्थळ, बँक कार्ड किंवा स्टेटमेंटशी पडताळा. भरोसा कॉल करणाऱ्याची ओळख निश्चित करत नाही.",
  callNumber: "{n} वर फोन करा",
  openSite: "अधिकृत संकेतस्थळ उघडा",

  circleTitle: "माझी विश्वासू माणसे",
  circleLead: "तुमचा विश्वास असलेली तीन माणसे जोडा. शंका आली की भरोसा त्यांना फोन किंवा संदेश करणे सोपे करेल.",
  name: "नाव",
  phone: "भारतीय मोबाइल क्रमांक किंवा देश कोडसह आंतरराष्ट्रीय क्रमांक",
  save: "जतन करा",
  remove: "काढा",
  saved: "जतन केले",
  circleEmpty: "अजून कोणी जोडलेले नाही. तुमचा मुलगा, मुलगी, शेजारी किंवा मित्र जोडा.",
  yourName: "तुमचे नाव (म्हणजे त्यांना कळेल कोण संदेश पाठवत आहे)",

  learnTitle: "सराव करा आणि विचारा",
  drillIntro: "कोणती धोक्याची लक्षणे दिसतात?",
  drillScam: "फसवणूक",
  drillSafe: "स्पष्ट धोक्याची लक्षणे नाहीत",
  drillUnsure: "खात्री नाही",
  drillCorrect: "बरोबर.",
  drillWrong: "पूर्णपणे नाही. कारण असे आहे.",
  drillNext: "पुढचा",
  askTitle: "फोन वापरण्यात मदत",
  askHelp:
    "मदतीचे विषय: अक्षरे मोठी करणे, क्रमांक ब्लॉक करणे, स्क्रीनशॉट, WhatsApp, अपडेट, आवाज आणि बँक बॅलन्स पाहणे. कोडिंग, गृहपाठ किंवा वैयक्तिक आर्थिक सल्ला नाही.",
  askPlaceholder: "तुमचा प्रश्न टाइप करा किंवा बोला",
  ask: "विचारा",
  asking: "सोपे उत्तर शोधत आहोत…",

  paidTitle: "पैसे पाठवले आहेत. त्वरित तक्रार करा.",
  paidLead:
    "बँक आणि सायबर हेल्पलाइनशी त्वरित संपर्क करा. पैसे परत मिळण्याची हमी नाही, पण वेळ गेला असला तरी तक्रार करा.",
  paidStep1:
    "आत्ता बँकेच्या अधिकृत क्रमांकावर फोन करा आणि सांगा: “मला फसवणुकीचा व्यवहार नोंदवायचा आहे आणि तो थांबवायचा आहे.”",
  paidStep2: "1930 वर फोन करा. रक्कम, वेळ आणि ज्या क्रमांकावर पाठवले तो सांगा.",
  paidStep3: "cybercrime.gov.in वर तक्रार नोंदवा. तुमची विश्वासू व्यक्ती मदत करू शकते.",
  paidStep4: "संदेश आणि व्यवहारांचे पुरावे जतन करा. पैसे परत मिळवून देण्याचे आश्वासन देणाऱ्याला आणखी पैसे देऊ नका.",
  paidCallBank: "माझ्या बँकेचा क्रमांक शोधा",

  offline: "तुम्ही ऑफलाइन आहात. जतन केलेल्या सूचना उपलब्ध आहेत; कॉलसाठी फोन सेवा आणि WhatsApp साठी इंटरनेट लागते.",
  poweredNote: "भरोसा मार्गदर्शन देतो, हमी नाही. शंका असल्यास खऱ्या कार्यालयाला स्वतः फोन करा."
};

export const STRINGS: Record<Lang, Strings> = { en, hi, mr };

/** Pick a localised value from a {hi, mr, en} record, falling back to English. */
export const pick = (rec: Record<string, string>, lang: Lang) => rec[lang] || rec.en;
