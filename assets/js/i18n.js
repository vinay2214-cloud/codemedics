const translations = {
  en: {
    appTitle: "CodeMedics",
    heroTitle: "Digital Health for Migrant Workers",
    heroDesc: "One record. Six languages. Real-time sync. Disease prevention."
  },
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
  ur: {
    appTitle: "کوڈمیڈکس",
    heroTitle: "مہاجرین کے لیے ڈیجیٹل ہیلتھ",
    heroDesc: "ایک ریکارڈ۔ چھ زبانیں۔ حقیقی وقت کی ہم آہنگی۔"
  }
};

function setLanguageFont(lang) {
    const body = document.body;
    // Remove all language font classes
    body.classList.remove('font-en', 'font-ml', 'font-hi', 'font-ta', 'font-te', 'font-ur', 'font-bn');
    // Add correct one
    if (lang === 'ml') body.classList.add('font-ml');
    else if (lang === 'hi') body.classList.add('font-hi');
    else if (lang === 'ta') body.classList.add('font-ta');
    else if (lang === 'te') body.classList.add('font-te');
    else if (lang === 'ur') body.classList.add('font-ur');
    else if (lang === 'bn') body.classList.add('font-bn');
    else body.classList.add('font-en');
}

function translatePage(lang = 'en') {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = translations[lang]?.[key] || key;
  });

  // SET FONT BASED ON LANGUAGE
  setLanguageFont(lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('userLang') || 'en';
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
