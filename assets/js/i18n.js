const translations = {
  ml: {
    appTitle: "കോഡ്മെഡിക്സ്",
    heroTitle: "കേരളത്തിലെ കുടിയേറ്റ തൊഴിലാളികൾക്കായുള്ള ഡിജിറ്റൽ ആരോഗ്യം",
    heroDesc: "ഒരു റെക്കോർഡ്. ആറ് ഭാഷകൾ. യഥാർത്ഥ സമയ സമന്വയം."
  },
  hi: {
    appTitle: "कोडमेडिक्स",
    heroTitle: "प्रवासी श्रमिकों के लिए डिजिटल स्वास्थ्य",
    heroDesc: "एक रिकॉर्ड। छह भाषाएँ। वास्तविक समय समन्वय।"
  },
  ta: {
    appTitle: "கோட்மெடிக்ஸ்",
    heroTitle: "குடியேறிய தொழிலாளர்களுக்கான டிஜிட்டல் சுகாதாரம்",
    heroDesc: "ஒரு பதிவு. ஆறு மொழிகள். உண்மையான நேர ஒருங்கிணைப்பு."
  },
  te: {
    appTitle: "కోడ్మెడిక్స్",
    heroTitle: "వలస కార్మికులకు డిజిటల్ హెల్త్",
    heroDesc: "ఒక రికార్డు. ఆరు భాషలు. రియల్-టైమ్ సింక్."
  },
  bn: {
    appTitle: "কোডমেডিক্স",
    heroTitle: "অভিবাসী শ্রমিকদের জন্য ডিজিটাল স্বাস্থ্য",
    heroDesc: "একটি রেকর্ড। ছয়টি ভাষা। রিয়েল-টাইম সিঙ্ক।"
  },
  ur: {
    appTitle: "کوڈمیڈکس",
    heroTitle: "مہاجرین کے لیے ڈیجیٹل ہیلتھ",
    heroDesc: "ایک ریکارڈ۔ چھ زبانیں۔ حقیقی وقت کی ہم آہنگی۔"
  }
};

function translatePage(lang = 'ml') {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = translations[lang]?.[key] || key;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('userLang') || 'ml';
  translatePage(savedLang);
  const switcher = document.getElementById('language-switcher');
  if (switcher) {
    switcher.value = savedLang;
    switcher.addEventListener('change', (e) => {
      const lang = e.target.value;
      localStorage.setItem('userLang', lang);
      translatePage(lang);
    });
  }
});
