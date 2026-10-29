"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { site } from "@/config/site";
import { homePath, localizedPath, locales } from "@/i18n/config";
import { useLang } from "@/i18n/lang-context";
import { EASE_OUT_EXPO } from "@/lib/hooks";

export function Header() {
  const pathname = usePathname();
  const { lang, t } = useLang();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden((h) => (y > 320 && y > prev + 2 ? true : y < prev - 2 ? false : h));
  });

  useEffect(() => {
    const d = dialogRef.current;
    if (open && d && !d.open) d.showModal();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const links = site.nav.map((item) => ({ label: t.nav[item.key], href: homePath(lang, item.hash) }));
  const contactHref = homePath(lang, "kontakt");

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-out-expo ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${scrolled ? "border-b border-line bg-ink/75 backdrop-blur-md" : "border-b border-transparent"}`}
      >
        <div data-hero-fade className="px-gutter flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
          <Link href={homePath(lang)} className="group flex items-baseline gap-2" aria-label={`${site.name} — ${t.common.homeLabel}`}>
            <span className="display text-[1.1rem] leading-none tracking-[-0.035em]">{site.shortName}</span>
            <span className="size-[0.4rem] translate-y-[-0.05rem] rounded-full bg-lime transition-transform duration-500 group-hover:scale-150" aria-hidden="true" />
            <span className="eyebrow text-mute">Studio</span>
          </Link>

          <p className="eyebrow hidden text-mute xl:block">{site.tagline}</p>

          <div className="flex items-center gap-5 md:gap-8">
            <nav aria-label={t.nav.main} className="hidden items-center gap-8 md:flex">
              <ul className="flex items-center gap-7">
                {links.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="group relative text-sm text-bone/80 transition-colors hover:text-bone">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-lime transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <LanguageSwitcher pathname={pathname} />

            <Link
              href={contactHref}
              className="group hidden items-center gap-2 rounded-full border border-bone/25 px-4 py-2 text-sm transition-colors duration-300 hover:border-lime hover:bg-lime hover:text-ink md:inline-flex"
            >
              {t.nav.cta}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>

            <button
              type="button"
              className="eyebrow -mr-2 flex items-center gap-3 px-2 py-3 md:hidden"
              aria-haspopup="dialog"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              {t.nav.menu}
              <span className="flex w-5 flex-col gap-[5px]" aria-hidden="true">
                <span className="h-px w-full bg-bone" />
                <span className="h-px w-3/5 self-end bg-bone" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        aria-label={t.nav.menu}
        className="fixed inset-0 m-0 h-svh max-h-none w-full max-w-none bg-transparent p-0 text-bone backdrop:bg-transparent"
        onCancel={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
      >
        <AnimatePresence onExitComplete={() => dialogRef.current?.close()}>
          {open && (
            <motion.div
              key="menu"
              className="px-gutter flex h-full flex-col bg-coal pb-8"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              exit={{ clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            >
              <div className="flex h-16 items-center justify-between">
                <span className="display text-[1.1rem] tracking-[-0.035em]">{site.shortName}</span>
                <button type="button" className="eyebrow -mr-2 flex items-center gap-2 px-2 py-3" onClick={() => setOpen(false)}>
                  {t.nav.close} <X className="size-4" aria-hidden="true" />
                </button>
              </div>
              <nav aria-label={t.nav.mobile} className="mt-auto">
                <ul className="flex flex-col">
                  {[...links, { label: t.nav.contact, href: contactHref }].map((item, i) => (
                    <li key={item.href} className="overflow-hidden border-b border-line">
                      <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.15 + i * 0.06 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="display flex items-baseline justify-between py-4 text-[12vw] leading-[0.95]"
                        >
                          {item.label}
                          <span className="eyebrow text-mute">0{i + 1}</span>
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-8 flex items-center justify-between">
                <p className="eyebrow text-mute">{site.tagline}</p>
                <LanguageSwitcher pathname={pathname} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </dialog>
    </>
  );
}

const languageNames = { pl: "Polski", en: "English" } as const;

/** PL / EN — links to the same page in the other language, keeping the section anchor. */
function LanguageSwitcher({ pathname }: { pathname: string }) {
  const { lang, t } = useLang();
  return (
    <nav aria-label={t.nav.language}>
      <ul className="eyebrow flex items-center gap-1.5">
        {locales.map((l, i) => (
          <li key={l} className="flex items-center gap-1.5">
            {i > 0 && (
              <span className="text-mute/60" aria-hidden="true">
                /
              </span>
            )}
            {l === lang ? (
              <span aria-current="true" className="text-bone" title={languageNames[l]}>
                {l.toUpperCase()}
              </span>
            ) : (
              // A full document load, not a client transition: switching swaps the
              // locale root layout (and <html lang>), which must not be reconciled in place.
              <a
                href={localizedPath(pathname, l)}
                hrefLang={l}
                lang={l}
                onClick={(e) => {
                  if (window.location.hash) e.currentTarget.hash = window.location.hash;
                }}
                className="py-2 text-mute transition-colors hover:text-lime"
                aria-label={languageNames[l]}
              >
                {l.toUpperCase()}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
