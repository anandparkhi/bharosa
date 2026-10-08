/** Shown when the model is unreachable. The rules layer still decides the verdict. */
export const FALLBACK_COPY: Record<string, { why: string; nowRed: string; nowAmber: string }> = {
  hi: {
    why: "पूरी जाँच नहीं हो पाई। हम संदेश या स्क्रीनशॉट की पुष्टि नहीं कर सकते।",
    nowRed: "कॉल काट दें, पैसे न भेजें, और अपने भरोसेमंद व्यक्ति या 1930 को फ़ोन करें।",
    nowAmber: "संदेश के नंबर पर नहीं, बल्कि आधिकारिक वेबसाइट के नंबर पर फ़ोन करके पूछें।"
  },
  mr: {
    why: "पूर्ण तपासणी झाली नाही. संदेश किंवा स्क्रीनशॉटची खात्री देता येत नाही.",
    nowRed: "कॉल कट करा, पैसे पाठवू नका, आणि विश्वासू व्यक्तीला किंवा 1930 ला फोन करा.",
    nowAmber: "संदेशातील क्रमांकावर नाही, तर अधिकृत संकेतस्थळावरील क्रमांकावर फोन करून विचारा."
  },
  en: {
    why: "The full check could not be completed. We cannot verify this message or screenshot.",
    nowRed: "Cut the call, do not pay, and call your trusted person or 1930.",
    nowAmber: "Call the organisation on the number from its official website, not from the message."
  }
};
