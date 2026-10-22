export type Locale = "zh" | "en";

export const LOCALES: Locale[] = ["zh", "en"];
export const DEFAULT_LOCALE: Locale = "zh";
export const LOCALE_COOKIE = "jb_locale";

export function isLocale(value: unknown): value is Locale {
  return value === "zh" || value === "en";
}

/** Pick a string by locale. */
export function pick<T>(locale: Locale, zh: T, en: T): T {
  return locale === "en" ? en : zh;
}
