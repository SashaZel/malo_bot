import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: 'ru',
  //debug: true,
  detection: {
    order: ['queryString', 'cookie', 'navigator'],
    caches: ['cookie']
  },
  interpolation: {
    escapeValue: false
  },
  backend: {
    loadPath: "./locales/{{lng}}/{{ns}}.json"
  }
});

export default i18n;