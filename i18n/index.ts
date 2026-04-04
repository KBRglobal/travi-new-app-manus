/**
 * TRAVI — i18n Configuration
 * 
 * Supports English and Hebrew with automatic RTL layout switching.
 * Uses expo-localization for device locale detection.
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import { I18nManager } from 'react-native';
import en from './locales/en';
import he from './locales/he';

// RTL languages
const RTL_LANGUAGES = ['he', 'ar', 'fa', 'ur'];

// Get device locale
const deviceLocales = getLocales();
const deviceLanguage = deviceLocales?.[0]?.languageCode || 'en';

// Determine if we should use RTL
const isRTL = RTL_LANGUAGES.includes(deviceLanguage);

// Configure RTL layout
I18nManager.allowRTL(true);
I18nManager.forceRTL(isRTL);

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      he: { translation: he },
    },
    lng: deviceLanguage === 'he' ? 'he' : 'en', // Default to English unless device is Hebrew
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
    react: {
      useSuspense: false, // Prevent suspense boundary issues
    },
  });

/**
 * Change the app language and update RTL layout.
 * Note: RTL changes require an app restart to take full effect.
 */
export function changeLanguage(languageCode: string): void {
  i18n.changeLanguage(languageCode);

  const shouldBeRTL = RTL_LANGUAGES.includes(languageCode);
  if (I18nManager.isRTL !== shouldBeRTL) {
    I18nManager.forceRTL(shouldBeRTL);
    // Note: The app needs to be restarted for RTL changes to take effect
    // You can use expo-updates or RNRestart for this
    console.log(`[i18n] RTL changed to ${shouldBeRTL}. App restart required.`);
  }
}

/**
 * Get the current language code.
 */
export function getCurrentLanguage(): string {
  return i18n.language;
}

/**
 * Check if the current language is RTL.
 */
export function isCurrentLanguageRTL(): boolean {
  return RTL_LANGUAGES.includes(i18n.language);
}

/**
 * Get available languages.
 */
export function getAvailableLanguages() {
  return [
    { code: 'en', name: 'English', nativeName: 'English', rtl: false },
    { code: 'he', name: 'Hebrew', nativeName: 'עברית', rtl: true },
  ];
}

export default i18n;
