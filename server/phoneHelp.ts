import type { Language } from "./validation.js";

type Copy = Record<Language, string>;
type Guide = { id: string; matches: RegExp; answer: Copy };
// Only reviewed, fixed guidance can leave this endpoint. User text is NEVER
// sent to a general-purpose model, so instructions cannot unlock arbitrary answers.
const GUIDES: Guide[] = [
  {
    id: "font",
    matches:
      /font|text (size|bigger|larger)|bigger (text|letters)|अक्षर|लिखावट|लिखा.*छोटा|फ़ॉन्ट|फॉन्ट|akshar|bade.*letter/i,
    answer: {
      en: "1. Open Settings on your phone.\n2. Search Settings for ‘Font size’ or ‘Text size’.\n3. Increase the size a little and check the preview.\n4. If you cannot find it, ask your trusted person to help. Button names vary by phone. You can also use A+ in Bharosa.",
      hi: "1. फ़ोन की Settings खोलें।\n2. खोज में ‘Font size’ या ‘Text size’ लिखें।\n3. आकार थोड़ा बढ़ाएँ और देखकर जाँचें।\n4. विकल्प न मिले तो भरोसेमंद व्यक्ति की मदद लें। अलग फ़ोन में नाम बदल सकते हैं। भरोसा में A+ भी इस्तेमाल कर सकते हैं।",
      mr: "1. फोनची Settings उघडा.\n2. शोधात ‘Font size’ किंवा ‘Text size’ लिहा.\n3. आकार थोडा वाढवून पाहा.\n4. पर्याय सापडला नाही तर विश्वासू व्यक्तीची मदत घ्या. फोननुसार नाव बदलू शकते. भरोसामध्ये A+ वापरू शकता."
    }
  },
  {
    id: "block",
    matches: /block|unwanted (call|message)|spam|ब्लॉक|ब्लाक|अवांछित/i,
    answer: {
      en: "1. Do not reply to the unwanted caller or message.\n2. Open the conversation or recent call, then open its contact details or menu.\n3. Look for Block or Report spam. In WhatsApp, tap the contact name to find Block.\n4. If you cannot find it, ask someone you trust. Do not delete evidence if you need to report fraud.",
      hi: "1. अनचाहे कॉल या संदेश का जवाब न दें।\n2. बातचीत या हाल का कॉल खोलकर संपर्क की जानकारी या मेनू खोलें।\n3. Block या Report spam खोजें। WhatsApp में संपर्क के नाम पर टैप करें।\n4. विकल्प न मिले तो भरोसेमंद व्यक्ति से पूछें। धोखाधड़ी की शिकायत करनी हो तो सबूत न मिटाएँ।",
      mr: "1. नको असलेल्या कॉल किंवा संदेशाला उत्तर देऊ नका.\n2. संभाषण किंवा अलीकडील कॉलमधील संपर्काची माहिती अथवा मेनू उघडा.\n3. Block किंवा Report spam शोधा. WhatsApp मध्ये संपर्काच्या नावावर टॅप करा.\n4. पर्याय न सापडल्यास विश्वासू व्यक्तीला विचारा. तक्रारीसाठी लागणारे पुरावे मिटवू नका."
    }
  },
  {
    id: "screenshot",
    matches: /screen ?shot|स्क्रीनशॉट|स्क्रीन.?शॉट/i,
    answer: {
      en: "1. Open the screen you want to save.\n2. Use your phone’s Screenshot control; its location depends on the phone. Search Settings for Screenshot if needed.\n3. Find the saved picture in Photos or Gallery.\n4. Before sharing, crop or cover OTPs, account details, and other private information.",
      hi: "1. जिस स्क्रीन की तस्वीर चाहिए उसे खोलें।\n2. अपने फ़ोन का Screenshot विकल्प इस्तेमाल करें। ज़रूरत हो तो Settings में Screenshot खोजें।\n3. तस्वीर Photos या Gallery में देखें।\n4. भेजने से पहले OTP, खाते की जानकारी और निजी विवरण छिपाएँ या काटें।",
      mr: "1. ज्या स्क्रीनचा फोटो हवा ती उघडा.\n2. फोनचा Screenshot पर्याय वापरा. गरज असल्यास Settings मध्ये Screenshot शोधा.\n3. फोटो Photos किंवा Gallery मध्ये पाहा.\n4. पाठवण्याआधी OTP, खात्याची माहिती व खाजगी तपशील झाका किंवा कापा."
    }
  },
  {
    id: "linked_devices",
    matches: /linked device|लिंक.*डिवाइस|जोडलेली उपकरण|another device|unknown device/i,
    answer: {
      en: "1. Open WhatsApp yourself.\n2. Open its menu or Settings and look for Linked devices.\n3. Review the listed devices. Ask a trusted person if you do not recognise one.\n4. Log out a device you did not authorise. Never share a linking code or scan a login QR code sent by a stranger.",
      hi: "1. WhatsApp खुद खोलें।\n2. मेनू या Settings में Linked devices देखें।\n3. उपकरणों की सूची देखें। कोई पहचान में न आए तो भरोसेमंद व्यक्ति से पूछें।\n4. जिस उपकरण को आपने अनुमति नहीं दी उसे Log out करें। लिंकिंग कोड न बताएँ और अनजान व्यक्ति का लॉगिन QR न स्कैन करें।",
      mr: "1. WhatsApp स्वतः उघडा.\n2. मेनू किंवा Settings मध्ये Linked devices पाहा.\n3. उपकरणांची यादी तपासा. एखादे ओळखता आले नाही तर विश्वासू व्यक्तीला विचारा.\n4. परवानगी न दिलेले उपकरण Log out करा. लिंकिंग कोड सांगू नका किंवा अनोळखी व्यक्तीचा लॉगिन QR स्कॅन करू नका."
    }
  },
  {
    id: "video_call",
    matches: /video call|वीडियो कॉल|व्हिडिओ कॉल/i,
    answer: {
      en: "1. Open WhatsApp and choose a person you already know.\n2. Open your conversation and tap the video-camera button.\n3. Allow camera and microphone access only if you want to make this call.\n4. Tap the red end-call button to finish. A familiar face or voice alone does not prove a money request is genuine.",
      hi: "1. WhatsApp खोलकर अपना जाना-पहचाना संपर्क चुनें।\n2. बातचीत खोलें और वीडियो कैमरे वाले बटन पर टैप करें।\n3. कॉल करना चाहते हों तभी कैमरे और माइक्रोफ़ोन की अनुमति दें।\n4. खत्म करने के लिए लाल बटन दबाएँ। सिर्फ़ जाना-पहचाना चेहरा या आवाज़ पैसे की माँग के असली होने का प्रमाण नहीं है।",
      mr: "1. WhatsApp उघडून ओळखीचा संपर्क निवडा.\n2. संभाषण उघडा आणि व्हिडिओ कॅमेऱ्याचे बटण दाबा.\n3. कॉल करायचा असेल तरच कॅमेरा व मायक्रोफोनची परवानगी द्या.\n4. संपवण्यासाठी लाल बटण दाबा. ओळखीचा चेहरा किंवा आवाज म्हणजे पैशांची मागणी खरी असल्याचा पुरावा नाही."
    }
  },
  {
    id: "photo",
    matches: /send.*(photo|picture)|share.*photo|फोटो.*(भेज|पाठव)|तस्वीर.*भेज/i,
    answer: {
      en: "1. Open WhatsApp and your conversation with a known contact.\n2. Tap the attachment or plus button and choose Photos or Gallery.\n3. Select the picture, then check the recipient and preview.\n4. Send only if you are comfortable sharing it. Do not share passwords, OTPs, or private banking details.",
      hi: "1. WhatsApp में अपने परिचित की बातचीत खोलें।\n2. अटैचमेंट या प्लस बटन दबाकर Photos या Gallery चुनें।\n3. तस्वीर चुनें और पाने वाले का नाम व तस्वीर जाँचें।\n4. भेजना ठीक लगे तभी भेजें। पासवर्ड, OTP या बैंक की निजी जानकारी न भेजें।",
      mr: "1. WhatsApp मध्ये ओळखीच्या व्यक्तीचे संभाषण उघडा.\n2. अटॅचमेंट किंवा प्लस बटण दाबून Photos किंवा Gallery निवडा.\n3. फोटो निवडा आणि प्राप्तकर्त्याचे नाव व फोटो तपासा.\n4. योग्य वाटल्यासच पाठवा. पासवर्ड, OTP किंवा बँकेची खाजगी माहिती पाठवू नका."
    }
  },
  {
    id: "update",
    matches: /update.*(app|phone)|app.*update|अपडेट|अद्ययावत/i,
    answer: {
      en: "1. Open the Play Store on Android or App Store on iPhone yourself.\n2. Find the app you already use and check its publisher.\n3. Use Update if it is available.\n4. Do not install updates or APK files sent in a message. For phone-system updates, use Settings.",
      hi: "1. Android में Play Store या iPhone में App Store खुद खोलें।\n2. इस्तेमाल होने वाला ऐप खोजें और प्रकाशक जाँचें।\n3. Update उपलब्ध हो तो उसे दबाएँ।\n4. संदेश में आई अपडेट या APK फ़ाइल इंस्टॉल न करें। फ़ोन सिस्टम अपडेट के लिए Settings इस्तेमाल करें।",
      mr: "1. Android वर Play Store किंवा iPhone वर App Store स्वतः उघडा.\n2. वापरत असलेले अ‍ॅप शोधा व प्रकाशक तपासा.\n3. Update दिसल्यास तो पर्याय वापरा.\n4. संदेशातील अपडेट किंवा APK फाइल इन्स्टॉल करू नका. फोनच्या सिस्टम अपडेटसाठी Settings वापरा."
    }
  },
  {
    id: "volume",
    matches: /volume|sound|आवाज़|आवाज|आवाजाचा/i,
    answer: {
      en: "1. Press a volume button on the side of your phone.\n2. Adjust the volume gently.\n3. In Settings, search for Sound if calls are still quiet or silent. Check whether the phone is muted or connected to headphones.\n4. If it still does not work, ask a trusted person to help.",
      hi: "1. फ़ोन के किनारे का वॉल्यूम बटन दबाएँ।\n2. आवाज़ धीरे-धीरे बढ़ाएँ।\n3. आवाज़ न आए तो Settings में Sound खोजें। साइलेंट मोड और हेडफ़ोन कनेक्शन जाँचें।\n4. फिर भी दिक्कत हो तो भरोसेमंद व्यक्ति से मदद लें।",
      mr: "1. फोनच्या बाजूचे व्हॉल्यूम बटण दाबा.\n2. आवाज हळूहळू वाढवा.\n3. आवाज येत नसेल तर Settings मध्ये Sound शोधा. सायलेंट मोड व हेडफोन जोडले आहेत का ते पाहा.\n4. अडचण राहिल्यास विश्वासू व्यक्तीची मदत घ्या."
    }
  },
  {
    id: "balance",
    matches: /bank balance|account balance|बैलेंस|बॅलन्स|शिल्लक/i,
    answer: {
      en: "1. Open your bank’s existing official app yourself, not a link from a message.\n2. Look for Accounts or Balance; names differ between banks.\n3. Enter credentials only in the genuine bank app, privately. Never tell Bharosa or a caller your OTP, PIN, or password.\n4. If unsure which app is genuine, use the contact details on your bank card or statement.",
      hi: "1. संदेश की लिंक के बजाय बैंक का पहले से इस्तेमाल किया जाने वाला आधिकारिक ऐप खुद खोलें।\n2. Accounts या Balance देखें; नाम बैंक के अनुसार बदल सकते हैं।\n3. लॉगिन जानकारी सिर्फ़ असली बैंक ऐप में निजी तौर पर भरें। भरोसा या किसी कॉल करने वाले को OTP, PIN या पासवर्ड न बताएँ।\n4. ऐप पर शक हो तो बैंक कार्ड या स्टेटमेंट पर दिए संपर्क का इस्तेमाल करें।",
      mr: "1. संदेशातील लिंकऐवजी बँकेचे आधीपासून वापरत असलेले अधिकृत अ‍ॅप स्वतः उघडा.\n2. Accounts किंवा Balance पाहा; बँकेनुसार नावे बदलू शकतात.\n3. लॉगिन माहिती फक्त खऱ्या बँक अ‍ॅपमध्ये खाजगीपणे भरा. भरोसा किंवा कॉल करणाऱ्याला OTP, PIN किंवा पासवर्ड सांगू नका.\n4. अ‍ॅपबद्दल शंका असल्यास बँक कार्ड किंवा स्टेटमेंटवरील संपर्क वापरा."
    }
  }
];
const OUT_OF_SCOPE =
  /c\+\+|\b(python|java(script)?|coding|programming|algorithm|leetcode|sql|essay|poem|recipe|horoscope|stock pick|diagnos\w*)\b|प्रोग्राम|कोड लिख|कविता|रेसिपी|ज्योतिष|ignore.{0,40}(instruction|rule)|system prompt/i;
const REFUSAL: Copy = {
  en: "I can help with everyday phone tasks: larger text, blocking a number, screenshots, WhatsApp calls and photos, linked devices, updates, sound, or finding your bank balance. Please ask about one of these. For a suspicious message, use ‘Check a message’. For other questions, ask someone you trust.",
  hi: "मैं फ़ोन के इन कामों में मदद कर सकता हूँ: अक्षर बड़े करना, नंबर ब्लॉक करना, स्क्रीनशॉट, WhatsApp कॉल और फोटो, Linked devices, अपडेट, आवाज़ और बैंक बैलेंस देखना। इनमें से किसी काम के बारे में पूछें। संदिग्ध संदेश के लिए ‘संदेश जाँचें’ इस्तेमाल करें। दूसरे सवालों के लिए भरोसेमंद व्यक्ति से पूछें।",
  mr: "मी फोनच्या या कामांत मदत करू शकतो: अक्षरे मोठी करणे, क्रमांक ब्लॉक करणे, स्क्रीनशॉट, WhatsApp कॉल व फोटो, Linked devices, अपडेट, आवाज आणि बँक बॅलन्स पाहणे. यापैकी एखाद्या कामाबद्दल विचारा. संशयास्पद संदेशासाठी ‘संदेश तपासा’ वापरा. इतर प्रश्नांसाठी विश्वासू व्यक्तीला विचारा."
};
export function phoneHelp(text: string, lang: Language) {
  const guide = OUT_OF_SCOPE.test(text)
    ? undefined
    : GUIDES.find(({ matches }) => matches.test(text.normalize("NFKC")));
  return { answer: guide?.answer[lang] ?? REFUSAL[lang], supported: Boolean(guide), topic: guide?.id ?? null };
}
