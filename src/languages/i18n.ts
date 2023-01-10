import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { TRANSLATIONS_EN } from './english';
import { TRANSLATIONS_RS } from './serbian';

export const languages = [
  { code: 'en', name: 'EN' },
  { code: 'rs', name: 'RS' }
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('i18nextLng')
      ? localStorage.getItem('i18nextLng')!
      : 'en',
    resources: {
      en: {
        translation: TRANSLATIONS_EN
      },
      rs: {
        translation: TRANSLATIONS_RS
      }
    }
  });
