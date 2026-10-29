import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/config/site";

const slugs = new Set(projects.map((p) => p.slug));

/**
 * Unknown case-study slugs get a real 404 status. Without this the static
 * page shell streams first, so the not-found UI would arrive with a 200.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !slugs.has(slug) && !slug.startsWith("opengraph-image")) {
    return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
  }
}

export const config = {
  matcher: "/projekty/:slug",
};
