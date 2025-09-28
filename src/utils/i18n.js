import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslations from "../locales/en/global.json";
import viTranslations from "../locales/vi/global.json";
import jaTranslations from "../locales/ja/global.json";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: false,
        lng: "en",
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: enTranslations,
            },
            vi: {
                translation: viTranslations,
            },
            ja: {
                translation: jaTranslations,
            },
        },
        // detection: {
        //     order: ['localStorage', 'navigator', 'htmlTag'],
        //     caches: ['localStorage'],
        // },
    });

export default i18n;
