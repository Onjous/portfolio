/**
 * Locales and public URL shapes.
 *
 * Polish is the default and lives at the root ("/", "/projekty/brut").
 * English is prefixed ("/en", "/en/projects/brut"). Internally every route
 * sits under app/[lang]; src/proxy.ts maps public URLs onto it.
 */

export const locales = ["pl", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pl";

export type Localized<T = string> = Record<Locale, T>;

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Localised path segment for case studies. */
export const projectSegment: Localized = { pl: "projekty", en: "projects" };

const prefix = (lang: Locale) => (lang === defaultLocale ? "" : `/${lang}`);

export function homePath(lang: Locale, hash?: string) {
  const base = prefix(lang);
  if (hash) return `${base || "/"}#${hash}`;
  return base || "/";
}

export function projectPath(lang: Locale, slug: string) {
  return `${prefix(lang)}/${projectSegment[lang]}/${slug}`;
}

/** Splits a public pathname into its locale and the locale-free remainder. */
export function parsePath(pathname: string): { lang: Locale; rest: string } {
  for (const l of locales) {
    if (pathname === `/${l}` || pathname.startsWith(`/${l}/`)) return { lang: l, rest: pathname.slice(l.length + 1) || "/" };
  }
  return { lang: defaultLocale, rest: pathname };
}

/** The same page in another language. */
export function localizedPath(pathname: string, to: Locale) {
  const { rest } = parsePath(pathname);
  const match = rest.match(/^\/(?:projekty|projects)\/([^/]+)\/?$/);
  return match ? projectPath(to, match[1]) : homePath(to);
}

export const ogLocale: Localized = { pl: "pl_PL", en: "en_US" };
