import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cookies from "js-cookie";

const languages = Cookies.get("teeru_lang") || "fr";

import enTranslation from "../../public/locales/en/translation.json";
import frTranslation from "../../public/locales/fr/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    fr: {
      translation: frTranslation,
    },
  },
  lng: languages,
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

export const translate = (key: string) => i18n.t(key);
