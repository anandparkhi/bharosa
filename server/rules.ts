import { RULE_THRESHOLDS, type Verdict, WEIGHT, type Weight } from "./constants";

/**
 * Deterministic scam-signal rules. Run BEFORE the model and override it.
 * Covers Hindi, Marathi (Devanagari) and English/Hinglish. `unless` suppresses
 * false positives (e.g. a bank's own "do not share this OTP" message).
 * Add every real-world miss here and to tests/rules.test.mjs.
 */
type Rule = { id: string; weight: Weight; re: RegExp; unless?: RegExp };
const RULES: Rule[] = [
  // Digital arrest / impersonation of authority
  {
    id: "authority_impersonation",
    weight: WEIGHT.CRITICAL,
    re: /\b(cbi|ed|enforcement directorate|narcotics|ncb|customs|trai|police|crime branch|inspector|supreme court|high court|income tax|cyber ?cell|interpol|rbi)\b|सीबीआई|पुलिस|अदालत|कोर्ट|नारकोटिक्स|कस्टम|क्राइम ब्रांच|क्राइम ब्रँच|इंस्पेक्टर|इन्स्पेक्टर|पोलीस|न्यायालय/i
  },
  {
    id: "arrest_threat",
    weight: WEIGHT.CRITICAL,
    re: /digital arrest|arrest|warrant|money laundering|drugs? (parcel|found)|parcel .*(drug|illegal)|गिरफ़?्तार|गिरफ्तार|वारंट|अटक|पार्सल|ड्रग्स|ड्रग्ज/i
  },
  {
    id: "isolation",
    weight: WEIGHT.CRITICAL,
    re: /(don'?t|do not|never) (tell|inform|share with|involve|call) (anyone|family|your (son|daughter|wife|husband)|police)|stay on (the )?(call|line)|video call|(परिवार|किसी).*(मत|ना|न) बता|किसी को (मत|न) बता|कुटुंबाला सांगू नका|कोणाला सांगू नका|वीडियो कॉल|व्हिडिओ कॉल/i
  },
  // Credential / money extraction
  {
    id: "otp_request",
    weight: WEIGHT.CRITICAL,
    re: /\b(otp|pin|cvv|password|passcode|mpin|upi ?pin)\b.{0,40}(share|send|tell|enter|batao|बताओ|बताइए|दें|सांगा|शेअर)|(share|send|tell|batao|बताओ|बताइए|सांगा).{0,40}\b(otp|pin|cvv|password|mpin)\b|ओटीपी (बता|भेज|पाठव)|पिन बता/i,
    // A bank's own "do not share this OTP" message is not a request for it.
    unless:
      /(do not|don'?t|never|कभी|किसी से (भी )?(साझा|शेयर) (न|मत)|कोणाशीही|शेअर करू नका|साझा न करें|share it with anyone)/i
  },
  {
    id: "remote_access",
    weight: WEIGHT.CRITICAL,
    re: /any ?desk|team ?viewer|quick ?support|screen ?shar(e|ing)|remote access|install (this|the) app|\.apk\b|एनीडेस्क|स्क्रीन शेयर/i
  },
  {
    id: "pay_to_verify",
    weight: WEIGHT.CRITICAL,
    re: /(verification|security|refundable|safe) (fee|deposit|amount|account)|transfer.{0,40}(verify|verification|safe|rbi account)|(verify|verification).{0,40}(transfer|pay|send)|जाँच.{0,30}(पैसे|रकम)|(पैसे|रकम).{0,30}(जाँच|सत्यापन)|सुरक्षित खात/i
  },
  {
    id: "new_number_money",
    weight: WEIGHT.CRITICAL,
    re: /(new number|new no|lost (my )?phone|नया नंबर|नया नम्बर|फ़?ोन खो|नवीन (नंबर|क्रमांक)|फोन हरव).{0,200}(₹|rs\.?|rupees|money|send|transfer|upi|पैसे|भेज|पाठव)/i
  },
  { id: "gift_card_crypto", weight: WEIGHT.STRONG, re: /gift card|bitcoin|crypto|usdt|prepaid card/i },
  // Urgency and fear
  {
    id: "urgency",
    weight: WEIGHT.STRONG,
    re: /\b(immediately|within \d+ ?(hours?|minutes?|hrs?|mins?)|today|tonight|urgent(ly)?|last chance|final (notice|warning)|will be (blocked|suspended|disconnected|cut|deactivated))\b|तुरंत|अभी|आज ही|आज रात|बंद (हो|कर) (जाएगा|दिया जाएगा)|काट दी जाएगी|अंतिम (चेतावनी|सूचना)|ताबडतोब|लगेच|आजच|आज रात्री|बंद (होईल|केले जाईल)|कापली जाईल/i
  },
  {
    id: "kyc_link",
    weight: WEIGHT.STRONG,
    re: /\bkyc\b.{0,80}(update|expire|expir|link|click|लिंक|क्लिक|समाप्त|संपत)|(update|expire|click).{0,40}\bkyc\b|केवाईसी|पैन (कार्ड )?(अपडेट|लिंक)/i
  },
  {
    id: "electricity_cutoff",
    weight: WEIGHT.STRONG,
    re: /(electricity|power|light|bijli|बिजली|वीज).{0,60}(disconnect|cut|बंद|खंडित|काट|कापली)|(disconnect|cut).{0,40}(electricity|power)/i
  },
  {
    id: "suspicious_link",
    weight: WEIGHT.STRONG,
    re: /(https?:\/\/)?(bit\.ly|tinyurl|t\.co|cutt\.ly|rb\.gy|shorturl|is\.gd)\/|\.(apk|xyz|top|click|live|buzz)\b|https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}/i
  },
  { id: "prize_lottery", weight: WEIGHT.STRONG, re: /lottery|you (have )?won|prize|lucky draw|kbc|लॉटरी|इनाम|जीत/i },
  {
    id: "family_emergency",
    weight: WEIGHT.STRONG,
    re: /(son|daughter|grandson|nephew|beta|बेटा|बेटी|नाती|नातू).{0,60}(accident|hospital|jail|arrested|police|अस्पताल|जेल)/i
  },
  {
    id: "contact_this_number",
    weight: WEIGHT.WEAK,
    re: /(contact|call|whatsapp) (this|on) (number|no)|इस नंबर पर|या क्रमांकावर/i
  },
  { id: "secrecy_generic", weight: WEIGHT.WEAK, re: /confidential|secret|keep this private|गुप्त|गोपनीय/i }
];

export type RuleResult = { hits: string[]; forced: Extract<Verdict, "RED" | "AMBER"> | null };

export function runRules(text: string): RuleResult {
  const fired = RULES.filter(({ re, unless }) => re.test(text) && !(unless && unless.test(text)));
  const score = fired.reduce((sum, { weight }) => sum + weight, 0);
  const hasCritical = fired.some(({ weight }) => weight === WEIGHT.CRITICAL);
  const forced = hasCritical || score >= RULE_THRESHOLDS.RED ? "RED" : score >= RULE_THRESHOLDS.AMBER ? "AMBER" : null;
  return { hits: fired.map(({ id }) => id), forced };
}
