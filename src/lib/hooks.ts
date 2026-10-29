"use client";

import { useEffect, useLayoutEffect, useSyncExternalStore } from "react";

export const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** SSR-safe media query. Returns `serverValue` during SSR and hydration. */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/** True once hydrated on a device without a reduced-motion preference. SSR-safe (false on the server). */
export function useMotionOK() {
  return useMediaQuery("(prefers-reduced-motion: no-preference)");
}

/** Large screen with a precise pointer — gets the full scroll choreography. */
export function useCinematic() {
  return useMediaQuery("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
}

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
