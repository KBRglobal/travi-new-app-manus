/**
 * TRAVI — Internationalization (i18n)
 * Supports 12 major traveler languages:
 * EN, HE, ES, FR, DE, IT, PT, JA, ZH, KO, AR, RU
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";

import en from "./locales/en";
import he from "./locales/he";
import es from "./locales/es";
import fr from "./locales/fr";
import de from "./locales/de";
import it from "./locales/it";
import pt from "./locales/pt";
import ja from "./locales/ja";
import zh from "./locales/zh";
import ko from "./locales/ko";
import ar from "./locales/ar";
import ru from "./locales/ru";

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", rtl: false, flag: "🇺🇸" },
  { code: "he", name: "Hebrew", nativeName: "עברית", rtl: true, flag: "🇮🇱" },
  { code: "es", name: "Spanish", nativeName: "Español", rtl: false, flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", rtl: false, flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", rtl: false, flag: "🇩🇪" },
  { code: "it", name: "Italian", nativeName: "Italiano", rtl: false, flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", nativeName: "Português", rtl: false, flag: "🇧🇷" },
  { code: "ja", name: "Japanese", nativeName: "日本語", rtl: false, flag: "🇯🇵" },
  { code: "zh", name: "Chinese", nativeName: "中文", rtl: false, flag: "🇨🇳" },
  { code: "ko", name: "Korean", nativeName: "한국어", rtl: false, flag: "🇰🇷" },
  { code: "ar", name: "Arabic", nativeName: "العربية", rtl: true, flag: "🇸🇦" },
  { code: "ru", name: "Russian", nativeName: "Русский", rtl: false, flag: "🇷🇺" },
] as const;

export type SupportedLanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

// Get device language, fallback to English
const deviceLocale = getLocales()[0]?.languageCode ?? "en";
const supportedCodes = SUPPORTED_LANGUAGES.map((l) => l.code);
const defaultLanguage = supportedCodes.includes(deviceLocale as SupportedLanguageCode)
  ? deviceLocale
  : "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    he: { translation: he },
    es: { translation: es },
    fr: { translation: fr },
    de: { translation: de },
    it: { translation: it },
    pt: { translation: pt },
    ja: { translation: ja },
    zh: { translation: zh },
    ko: { translation: ko },
    ar: { translation: ar },
    ru: { translation: ru },
  },
  lng: defaultLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes
  },
  compatibilityJSON: "v4",
});

export default i18n;
export { i18n };
