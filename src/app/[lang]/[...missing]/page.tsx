import { notFound } from "next/navigation";

/**
 * Target of the Proxy's 404 rewrite (/<lang>/404), so unknown URLs render the
 * localised not-found page inside the normal layout, with a 404 status.
 */
export function generateStaticParams() {
  return [{ missing: ["404"] }];
}

export default function Missing() {
  notFound();
}
