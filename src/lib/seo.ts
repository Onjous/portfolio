import { defaultLocale, locales, type Locale } from "@/i18n/config";

/** Canonical URL plus hreflang alternates (incl. x-default) for a page that exists in every locale. */
export function languageAlternates(lang: Locale, pathFor: (l: Locale) => string) {
  return {
    canonical: pathFor(lang),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, pathFor(l)])),
      "x-default": pathFor(defaultLocale),
    },
  };
}
