import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "./i18n";

/** Resolve the current locale on the server: cookie first, then Accept-Language. */
export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const saved = cookieStore.get(LOCALE_COOKIE)?.value;
  if (isLocale(saved)) return saved;

  const accept = (await headers()).get("accept-language")?.toLowerCase() ?? "";
  if (accept) return accept.startsWith("zh") ? "zh" : "en";
  return DEFAULT_LOCALE;
}
