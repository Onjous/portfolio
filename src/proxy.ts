import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/config/site";
import { defaultLocale, parsePath, projectPath, projectSegment } from "@/i18n/config";

const slugs = new Set(projects.map((p) => p.slug));
const segments = new Set(Object.values(projectSegment));

/**
 * Maps public URLs onto the internal app/[lang] routes:
 *   /                      → /pl
 *   /projekty/brut         → /pl/projekty/brut
 *   /en/projects/brut      → /en/projekty/brut
 * The prefixed default locale (/pl/…) redirects to its canonical URL,
 * the wrong project segment for a language redirects to the right one,
 * and anything else gets a real 404 status.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Generated Open Graph images are addressed by their internal path.
  if (pathname.includes("/opengraph-image")) return;

  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    return redirect(request, pathname.slice(defaultLocale.length + 1) || "/");
  }

  const { lang, rest } = parsePath(pathname);
  const parts = rest.split("/").filter(Boolean);
  const url = request.nextUrl.clone();

  if (parts.length === 0) {
    url.pathname = `/${lang}`;
    return NextResponse.rewrite(url);
  }

  if (parts.length === 2 && segments.has(parts[0]) && slugs.has(parts[1])) {
    if (parts[0] !== projectSegment[lang]) return redirect(request, projectPath(lang, parts[1]));
    url.pathname = `/${lang}/projekty/${parts[1]}`;
    return NextResponse.rewrite(url);
  }

  url.pathname = `/${lang}/404`;
  url.search = "";
  return NextResponse.rewrite(url, { status: 404 });
}

function redirect(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url, 308);
}

export const config = {
  // Everything except Next internals and files with an extension (icon.svg, sitemap.xml, robots.txt…).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
