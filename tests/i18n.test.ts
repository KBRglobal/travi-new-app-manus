/**
 * TRAVI — i18n Tests
 * Verifies all 12 locale files load correctly and contain required keys
 */
import { describe, it, expect } from "vitest";

// Import all locale files directly
import en from "../lib/i18n/locales/en";
import he from "../lib/i18n/locales/he";
import es from "../lib/i18n/locales/es";
import fr from "../lib/i18n/locales/fr";
import de from "../lib/i18n/locales/de";
import itLocale from "../lib/i18n/locales/it";
import pt from "../lib/i18n/locales/pt";
import ja from "../lib/i18n/locales/ja";
import zh from "../lib/i18n/locales/zh";
import ko from "../lib/i18n/locales/ko";
import ar from "../lib/i18n/locales/ar";
import ru from "../lib/i18n/locales/ru";

const ALL_LOCALES = { en, he, es, fr, de, it: itLocale, pt, ja, zh, ko, ar, ru };
const LOCALE_CODES = Object.keys(ALL_LOCALES) as Array<keyof typeof ALL_LOCALES>;

// Required top-level keys that every locale must have
const REQUIRED_KEYS = [
  "common",
  "home",
  "explore",
  "trips",
  "wallet",
  "profile",
  "auth",
  "dna",
  "agent",
];

// Required common keys
const REQUIRED_COMMON_KEYS = ["loading", "error", "retry", "save", "cancel", "done", "back"];

describe("i18n — Locale Files", () => {
  it("should have all 12 locale files", () => {
    expect(LOCALE_CODES).toHaveLength(12);
    expect(LOCALE_CODES).toContain("en");
    expect(LOCALE_CODES).toContain("he");
    expect(LOCALE_CODES).toContain("ar");
    expect(LOCALE_CODES).toContain("ja");
    expect(LOCALE_CODES).toContain("zh");
    expect(LOCALE_CODES).toContain("ko");
  });

  LOCALE_CODES.forEach((code) => {
    describe(`Locale: ${code}`, () => {
      it("should have all required top-level keys", () => {
        const locale = ALL_LOCALES[code];
        REQUIRED_KEYS.forEach((key) => {
          expect(locale, `${code} missing key: ${key}`).toHaveProperty(key);
        });
      });

      it("should have all required common keys", () => {
        const locale = ALL_LOCALES[code];
        REQUIRED_COMMON_KEYS.forEach((key) => {
          expect(locale.common, `${code}.common missing key: ${key}`).toHaveProperty(key);
          expect(typeof (locale.common as Record<string, string>)[key]).toBe("string");
          expect((locale.common as Record<string, string>)[key].length).toBeGreaterThan(0);
        });
      });

      it("should have non-empty string values (no empty translations)", () => {
        const locale = ALL_LOCALES[code];
        const checkValues = (obj: Record<string, unknown>, path = "") => {
          Object.entries(obj).forEach(([k, v]) => {
            const fullPath = path ? `${path}.${k}` : k;
            if (typeof v === "string") {
              expect(v.length, `${code}: ${fullPath} is empty`).toBeGreaterThan(0);
            } else if (typeof v === "object" && v !== null) {
              checkValues(v as Record<string, unknown>, fullPath);
            }
          });
        };
        checkValues(locale as Record<string, unknown>);
      });

      it("should have same number of keys as English (completeness check)", () => {
        const countKeys = (obj: Record<string, unknown>): number => {
          return Object.values(obj).reduce((sum, v) => {
            if (typeof v === "object" && v !== null) {
              return sum + countKeys(v as Record<string, unknown>);
            }
            return sum + 1;
          }, 0) as number;
        };
        const enCount = countKeys(en as Record<string, unknown>);
        const localeCount = countKeys(ALL_LOCALES[code] as Record<string, unknown>);
        // Allow up to 5% difference (some locales may have slightly different structures)
        const diff = Math.abs(enCount - localeCount);
        const tolerance = Math.ceil(enCount * 0.05);
        expect(diff, `${code} has ${localeCount} keys vs EN ${enCount} (diff: ${diff})`).toBeLessThanOrEqual(tolerance);
      });
    });
  });
});

describe("i18n — RTL Languages", () => {
  it("Hebrew locale should have RTL-compatible content", () => {
    expect(he).toBeDefined();
    // Hebrew text should contain Hebrew characters
    const heJson = JSON.stringify(he);
    const hasHebrew = /[\u0590-\u05FF]/.test(heJson);
    expect(hasHebrew).toBe(true);
  });

  it("Arabic locale should have RTL-compatible content", () => {
    expect(ar).toBeDefined();
    const arJson = JSON.stringify(ar);
    const hasArabic = /[\u0600-\u06FF]/.test(arJson);
    expect(hasArabic).toBe(true);
  });
});

describe("i18n — Asian Languages", () => {
  it("Japanese locale should contain Japanese characters", () => {
    const jaJson = JSON.stringify(ja);
    const hasJapanese = /[\u3040-\u30FF\u4E00-\u9FFF]/.test(jaJson);
    expect(hasJapanese).toBe(true);
  });

  it("Chinese locale should contain Chinese characters", () => {
    const zhJson = JSON.stringify(zh);
    const hasChinese = /[\u4E00-\u9FFF]/.test(zhJson);
    expect(hasChinese).toBe(true);
  });

  it("Korean locale should contain Korean characters", () => {
    const koJson = JSON.stringify(ko);
    const hasKorean = /[\uAC00-\uD7AF\u1100-\u11FF]/.test(koJson);
    expect(hasKorean).toBe(true);
  });
});
