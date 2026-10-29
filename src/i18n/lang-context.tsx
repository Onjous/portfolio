"use client";

import { createContext, useContext } from "react";
import { defaultLocale, type Locale } from "./config";
import { dictionary } from "./dictionary";

const LangContext = createContext<Locale>(defaultLocale);

export function LangProvider({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

/** Current locale and its dictionary, for Client Components. */
export function useLang() {
  const lang = useContext(LangContext);
  return { lang, t: dictionary[lang] };
}
