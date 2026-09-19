/** Shown when the model is unreachable. The rules layer still decides the verdict. */
export const FALLBACK_COPY: Record<string, { why: string; nowRed: string; nowAmber: string }> = {
  hi: {
    why: "इसमें डर, जल्दबाज़ी या पैसे/OTP माँगने जैसे संकेत हैं जो ठग इस्तेमाल करते हैं।",
    nowRed: "कॉल काट दें, पैसे न भेजें, और अपने भरोसेमंद व्यक्ति या 1930 को फ़ोन करें।",
    nowAmber: "संदेश के नंबर पर नहीं, बल्कि आधिकारिक वेबसाइट के नंबर पर फ़ोन करके पूछें।"
  },
  mr: {
    why: "यात भीती, घाई किंवा पैसे/OTP मागणे अशी लक्षणे आहेत जी फसवणूक करणारे वापरतात.",
    nowRed: "कॉल कट करा, पैसे पाठवू नका, आणि विश्वासू व्यक्तीला किंवा 1930 ला फोन करा.",
    nowAmber: "संदेशातील क्रमांकावर नाही, तर अधिकृत संकेतस्थळावरील क्रमांकावर फोन करून विचारा."
  },
  en: {
    why: "It uses fear, urgency, or asks for money/OTP — the tactics scammers rely on.",
    nowRed: "Cut the call, do not pay, and call your trusted person or 1930.",
    nowAmber: "Call the organisation on the number from its official website, not from the message."
  }
};
export const ASK_DEFAULT_QUESTION = "How do I use this phone safely?";
export const IMAGE_ONLY_NOTE = "Only a screenshot was shared. Read it carefully.";
export const TEXT_PREFIX = "Message or what the caller said:\n";
