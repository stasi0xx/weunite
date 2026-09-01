import { getPathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

export const BASE_URL = "https://www.weunite.pl";

/**
 * Builds a self-referencing `alternates` object (canonical + hreflang,
 * including x-default) for a locale-invariant pathname, e.g. "/realizacje".
 * Every in-scope page calls this with its own path so its canonical always
 * points at itself, never at its sibling-language page (AC-7).
 */
export function buildAlternates(pathname: string, locale: AppLocale) {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [
      l,
      `${BASE_URL}${getPathname({ href: pathname, locale: l })}`,
    ])
  );
  languages["x-default"] = `${BASE_URL}${getPathname({
    href: pathname,
    locale: routing.defaultLocale,
  })}`;

  return {
    canonical: `${BASE_URL}${getPathname({ href: pathname, locale })}`,
    languages,
  };
}
