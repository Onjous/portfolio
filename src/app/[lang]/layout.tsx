import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Archivo, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { site } from "@/config/site";
import { hasLocale, homePath, locales, ogLocale } from "@/i18n/config";
import { dictionary } from "@/i18n/dictionary";
import { LangProvider } from "@/i18n/lang-context";
import { languageAlternates } from "@/lib/seo";
import "../globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: "italic",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const title = `${site.name} — ${site.tagline}`;
  const description = dictionary[lang].meta.description;
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s — ${site.name}` },
    description,
    applicationName: site.name,
    authors: [{ name: site.founder }],
    creator: site.founder,
    alternates: languageAlternates(lang, (l) => homePath(l)),
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      siteName: site.name,
      title,
      description,
      url: homePath(lang),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

/**
 * Decides, before first paint, whether the home intro plays:
 * "play" on the first visit of a session, "lite" (hero-only entrance) for
 * repeat visits, deep links and low-powered devices, "off" for reduced motion.
 */
const introScript = `(function(){try{var d=document.documentElement,m=function(q){return matchMedia(q).matches},p=location.pathname.replace(/\\/$/,"")||"/",s="off";if((p==="/"||p==="/en")&&!m("(prefers-reduced-motion: reduce)")){var n=navigator,c=n.connection,low=(c&&c.saveData)||(n.deviceMemory&&n.deviceMemory<4)||(n.hardwareConcurrency&&n.hardwareConcurrency<=4&&m("(pointer: coarse)"));s=low||location.hash||sessionStorage.getItem("miko-intro")?"lite":"play";if(s==="play")sessionStorage.setItem("miko-intro","1")}d.dataset.intro=s}catch(e){}})();`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = dictionary[lang];

  return (
    <html lang={lang} suppressHydrationWarning className={`${archivo.variable} ${instrument.variable} ${geistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="min-h-svh">
        <LangProvider lang={lang}>
          <Providers>
            <a
              href="#main"
              className="eyebrow fixed left-4 top-4 z-[200] -translate-y-24 rounded-full bg-lime px-4 py-3 text-ink transition-transform focus:translate-y-0"
            >
              {t.common.skip}
            </a>
            <Header />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer lang={lang} />
            <div className="grain" aria-hidden="true" />
          </Providers>
        </LangProvider>
      </body>
    </html>
  );
}
