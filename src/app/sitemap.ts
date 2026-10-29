import type { MetadataRoute } from "next";
import { projects, site } from "@/config/site";
import { defaultLocale, homePath, locales, projectPath, type Locale } from "@/i18n/config";

/** One entry per page and language, each listing its hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const abs = (path: string) => new URL(path, site.url).toString();
  const pages: { pathFor: (l: Locale) => string; priority: number }[] = [
    { pathFor: (l) => homePath(l), priority: 1 },
    ...projects.map((p) => ({ pathFor: (l: Locale) => projectPath(l, p.slug), priority: 0.8 })),
  ];

  return pages.flatMap(({ pathFor, priority }) =>
    locales.map((lang) => ({
      url: abs(pathFor(lang)),
      changeFrequency: "monthly" as const,
      priority: lang === defaultLocale ? priority : priority - 0.1,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, abs(pathFor(l))])) },
    })),
  );
}
