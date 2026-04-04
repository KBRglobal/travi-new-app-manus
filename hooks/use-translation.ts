/**
 * TRAVI — Translation Hook
 * Usage: const { t, language, changeLanguage, isRTL } = useAppTranslation();
 */
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";
import { SUPPORTED_LANGUAGES, type SupportedLanguageCode } from "@/lib/i18n";

const LANGUAGE_STORAGE_KEY = "@travi/language";

export function useAppTranslation() {
  const { t, i18n } = useTranslation();

  const language = i18n.language as SupportedLanguageCode;
  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === language);
  const isRTL = currentLang?.rtl ?? false;

  const changeLanguage = async (code: SupportedLanguageCode) => {
    await i18n.changeLanguage(code);
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, code);
    // RTL support for Arabic and Hebrew
    const lang = SUPPORTED_LANGUAGES.find((l) => l.code === code);
    if (lang?.rtl !== I18nManager.isRTL) {
      I18nManager.forceRTL(lang?.rtl ?? false);
      // Note: App restart required for RTL to take full effect
    }
  };

  return {
    t,
    language,
    isRTL,
    changeLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
    currentLang,
  };
}
