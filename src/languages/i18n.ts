import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { TRANSLATIONS_EN } from "./english";
import { TRANSLATIONS_RS } from "./serbian";

export const languages = [
  { code: "en", name: "EN" },
  { code: "rs", name: "RS" },
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: TRANSLATIONS_EN,
      },
      rs: {
        translation: TRANSLATIONS_RS,
      },
    },
  });

