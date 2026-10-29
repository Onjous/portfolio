import Link from "next/link";
import { site } from "@/config/site";
import { homePath, type Locale } from "@/i18n/config";
import { dictionary } from "@/i18n/dictionary";
import { FooterWordmark, BackToTop, CurrentYear } from "./footer-client";

export function Footer({ lang }: { lang: Locale }) {
  const t = dictionary[lang];
  const links = [...site.nav.map((item) => ({ label: t.nav[item.key], href: homePath(lang, item.hash) })), { label: t.nav.contact, href: homePath(lang, "kontakt") }];

  return (
    <footer className="relative overflow-hidden border-t border-line pt-16 md:pt-24">
      <div className="px-gutter grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12">
        <div className="col-span-2 md:col-span-5">
          <p className="display text-2xl tracking-[-0.04em] md:text-3xl">{site.name}</p>
          <p className="mt-3 max-w-xs text-sm text-mute">
            {site.tagline} {t.footer.about}
          </p>
        </div>

        <nav aria-label={t.footer.map} className="md:col-span-3 md:col-start-7">
          <p className="eyebrow mb-4 text-mute">{t.footer.map}</p>
          <ul className="space-y-2 text-sm">
            {links.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-bone/80 transition-colors hover:text-lime">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="eyebrow mb-4 text-mute">{t.footer.contact}</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="break-all text-bone/80 transition-colors hover:text-lime">
                {site.email}
              </a>
            </li>
            {site.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-bone/80 transition-colors hover:text-lime">
                  {s.label}
                  <span className="sr-only"> {t.common.newTab}</span>
                </a>
              </li>
            ))}
            <li>
              <Link href={homePath(lang, "kontakt")} className="text-bone/80 transition-colors hover:text-lime">
                {t.footer.talk}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="px-gutter mt-16 flex items-center justify-between border-t border-line py-5 md:mt-24">
        <p className="eyebrow text-mute">
          © <CurrentYear /> {site.name}
        </p>
        <BackToTop label={t.footer.top} />
      </div>

      <FooterWordmark text={site.shortName} />
    </footer>
  );
}
