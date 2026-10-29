/**
 * MIKO STUDIO — single source of truth.
 *
 * Studio details, contact, social links and all project data live here.
 * UI strings live in src/i18n/dictionary.ts.
 *
 * Screenshots: add a WebP/JPG to src/assets/projects/<slug>/, import it
 * below and reference it from `cover` or `screens`. Static imports give
 * next/image the real dimensions, so screenshots are never stretched.
 * A project without images falls back to a clearly labelled temporary visual.
 */

import type { StaticImageData } from "next/image";
import type { Localized } from "@/i18n/config";

import atelierHome from "@/assets/projects/atelier-auto/home.webp";
import atelierPricing from "@/assets/projects/atelier-auto/pricing.webp";
import brutHome from "@/assets/projects/brut/home.webp";
import brutBooking from "@/assets/projects/brut/booking.webp";
import coffeeHome from "@/assets/projects/coffee-bakery/home.webp";
import coffeeMenu from "@/assets/projects/coffee-bakery/menu.webp";
import aetherHome from "@/assets/projects/aether-one/home.webp";
import aetherExploded from "@/assets/projects/aether-one/exploded.webp";

export type SocialLink = { label: string; href: string };

export type ProjectImage = {
  /** Static import of a screenshot. Leave undefined to show the temporary visual. */
  src?: StaticImageData;
  alt: Localized;
};

export type ProjectScreen = ProjectImage & {
  label: Localized;
  /** desktop = full-width frame, mobile = portrait frame shown in pairs. */
  kind: "desktop" | "mobile";
};

export type ProjectArtKind = "atelier" | "brut" | "coffee" | "aether";

export type Project = {
  slug: string;
  index: string;
  name: string;
  category: string;
  summary: Localized;
  concept: Localized;
  direction: { title: Localized; text: Localized }[];
  palette: { name: Localized; hex: string }[];
  typography: Localized;
  keywords: Localized<string[]>;
  scope: Localized<string[]>;
  /** Live demo URL. Leave undefined to show "coming soon" instead of a link. */
  liveUrl?: string;
  cover: ProjectImage;
  screens: ProjectScreen[];
  /** Fallback art direction used only while screenshots are missing. */
  art: ProjectArtKind;
  theme: { tint: string; accent: string };
};

export const site = {
  name: "MIKO STUDIO",
  shortName: "MIKO",
  tagline: "Digital Design & Development.",
  founder: "Mikołaj Dod",
  /**
   * Production URL used for canonical links, hreflang, sitemap and Open Graph.
   * Set NEXT_PUBLIC_SITE_URL in your hosting environment. On Vercel the
   * production domain is picked up automatically.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  email: "nikolaidod22@gmail.com",
  socials: [{ label: "GitHub", href: "https://github.com/Onjous" }] as SocialLink[],
  /** Section anchors used by the navigation. */
  nav: [
    { key: "work", hash: "projekty" },
    { key: "studio", hash: "studio" },
    { key: "process", hash: "proces" },
  ] as const,
};

export const projects: Project[] = [
  {
    slug: "atelier-auto",
    index: "01",
    name: "Atelier Auto",
    category: "Automotive Detailing",
    summary: {
      pl: "Detailing premium pokazany jak praca jubilera — światło na lakierze, spokój i precyzja.",
      en: "Premium detailing presented like fine jewellery — light on paintwork, calm and precision.",
    },
    concept: {
      pl: "Detailing to rzemiosło precyzji. Koncept traktuje lakier jak lustro: ciemne kadry, światło prowadzone po krawędziach karoserii i typografia, która łączy smukły grotesk z elegancką kursywą. Strona prowadzi od pierwszego wrażenia do konkretnej wyceny.",
      en: "Detailing is a craft of precision. The concept treats paint like a mirror: dark frames, light traced along the bodywork and typography pairing a slender grotesque with an elegant italic. The site leads from first impression to a concrete estimate.",
    },
    direction: [
      {
        title: { pl: "Światło jako narracja", en: "Light as narrative" },
        text: {
          pl: "Ciemne, nocne kadry i refleksy na karoserii budują nastrój premium bez zbędnych ozdobników.",
          en: "Dark, after-hours imagery and reflections on bodywork build a premium mood without decoration.",
        },
      },
      {
        title: { pl: "Wycena bez tajemnic", en: "Transparent pricing" },
        text: {
          pl: "Interaktywny kalkulator — rozmiar auta, stan lakieru i pakiety usług — pokazuje przedział ceny jeszcze przed kontaktem.",
          en: "An interactive estimator — vehicle size, paint condition and service packages — shows a price range before the first call.",
        },
      },
      {
        title: { pl: "Techniczny spokój", en: "Technical calm" },
        text: {
          pl: "Szerokie odstępy, wąska paleta i rozstrzelone kapitaliki. Usługi opisane jak specyfikacja, nie jak reklama.",
          en: "Generous spacing, a narrow palette and tracked capitals. Services read like a specification, not an advert.",
        },
      },
    ],
    palette: [
      { name: { pl: "Noc", en: "Night" }, hex: "#0B1116" },
      { name: { pl: "Grafit", en: "Graphite" }, hex: "#1A1D21" },
      { name: { pl: "Szampan", en: "Champagne" }, hex: "#CDB892" },
      { name: { pl: "Kość", en: "Bone" }, hex: "#ECEAE4" },
    ],
    typography: {
      pl: "Lekki, smukły grotesk w nagłówkach i szeryfowa kursywa jako akcent.",
      en: "A light, slender grotesque for headlines, with a serif italic as the accent.",
    },
    keywords: { pl: ["Precyzja", "Refleks", "Detal"], en: ["Precision", "Reflection", "Detail"] },
    scope: { pl: ["Projekt UI", "Kalkulator wyceny", "Development", "Motion"], en: ["UI design", "Price estimator", "Development", "Motion"] },
    liveUrl: "https://atelier-auto-premium.vercel.app",
    cover: { src: atelierHome, alt: { pl: "Atelier Auto — strona główna", en: "Atelier Auto — homepage" } },
    screens: [
      { kind: "desktop", src: atelierHome, label: { pl: "Strona główna", en: "Homepage" }, alt: { pl: "Atelier Auto — strona główna", en: "Atelier Auto — homepage" } },
      {
        kind: "desktop",
        src: atelierPricing,
        label: { pl: "Kalkulator wyceny", en: "Price estimator" },
        alt: { pl: "Atelier Auto — kalkulator wyceny usług", en: "Atelier Auto — service price estimator" },
      },
    ],
    art: "atelier",
    theme: { tint: "rgba(150, 170, 190, 0.2)", accent: "#CDB892" },
  },
  {
    slug: "brut",
    index: "02",
    name: "Brut",
    category: "Barbershop",
    summary: {
      pl: "Surowa, pewna siebie identyfikacja barbershopu — czerń, kość i jeden rdzawy akcent.",
      en: "A raw, confident barbershop identity — black, bone and a single rust accent.",
    },
    concept: {
      pl: "Konkretnie, bez ozdobników. BRUT to strona zbudowana na kontraście: ciemna fotografia, ciężka, wąska typografia i krótkie komunikaty — jak dobre cięcie. Najważniejsza ścieżka prowadzi prosto do rezerwacji.",
      en: "Direct, no frills. BRUT is built on contrast: dark photography, heavy condensed type and short statements — like a good cut. The key path leads straight to booking.",
    },
    direction: [
      {
        title: { pl: "Ciężka typografia", en: "Heavy type" },
        text: {
          pl: "Wąski, gruby krój w ogromnej skali i rdzawe kropki jako znak rozpoznawczy marki.",
          en: "A condensed, heavy typeface at huge scale, with rust full stops as the brand signature.",
        },
      },
      {
        title: { pl: "Rezerwacja w trzech krokach", en: "Booking in three steps" },
        text: {
          pl: "Usługa, barber, termin — prosty formularz z cenami i czasem trwania. W wersji demo nic nie jest wysyłane.",
          en: "Service, barber, time — a simple flow with prices and durations. In the demo, nothing is submitted.",
        },
      },
      {
        title: { pl: "Jeden akcent", en: "One accent" },
        text: {
          pl: "Rdzawy kolor pojawia się tylko tam, gdzie prowadzi wzrok albo decyzję.",
          en: "Rust appears only where it guides the eye or a decision.",
        },
      },
    ],
    palette: [
      { name: { pl: "Czerń", en: "Black" }, hex: "#181818" },
      { name: { pl: "Grafit", en: "Graphite" }, hex: "#2A2A27" },
      { name: { pl: "Rdza", en: "Rust" }, hex: "#B35D3E" },
      { name: { pl: "Kość", en: "Bone" }, hex: "#F0EFE9" },
    ],
    typography: {
      pl: "Wąski, ciężki grotesk w nagłówkach i monospace w detalach.",
      en: "A heavy condensed grotesque for headlines, monospace for details.",
    },
    keywords: { pl: ["Kontrast", "Rzemiosło", "Charakter"], en: ["Contrast", "Craft", "Character"] },
    scope: { pl: ["Identyfikacja", "Projekt UI", "Rezerwacja online", "Development"], en: ["Identity", "UI design", "Online booking", "Development"] },
    liveUrl: "https://brut-barber-shop.vercel.app",
    cover: { src: brutHome, alt: { pl: "Brut — strona główna", en: "Brut — homepage" } },
    screens: [
      { kind: "desktop", src: brutHome, label: { pl: "Strona główna", en: "Homepage" }, alt: { pl: "Brut — strona główna", en: "Brut — homepage" } },
      {
        kind: "desktop",
        src: brutBooking,
        label: { pl: "Rezerwacja", en: "Booking" },
        alt: { pl: "Brut — formularz rezerwacji wizyty", en: "Brut — appointment booking form" },
      },
    ],
    art: "brut",
    theme: { tint: "rgba(179, 93, 62, 0.18)", accent: "#B35D3E" },
  },
  {
    slug: "coffee-bakery",
    index: "03",
    name: "Coffee & Bakery",
    category: "Hospitality",
    summary: {
      pl: "Ciepła, redakcyjna strona kawiarni z piekarnią — menu jak z gazety i poranne bułki.",
      en: "A warm, editorial site for a coffee shop and bakehouse — a newspaper-style menu and morning buns.",
    },
    concept: {
      pl: "Ninepence to fikcyjna kawiarnia z piekarnią na zapleczu. Koncept łączy ciepłą, kremową paletę z charakterną szeryfową typografią i prostym, codziennym językiem. Zamiast katalogu produktów — strona, która brzmi jak ludzie zza lady.",
      en: "Ninepence is a fictional coffee shop with a bakery in the back. The concept pairs a warm, creamy palette with characterful serif type and plain, everyday language. Instead of a product catalogue — a site that sounds like the people behind the counter.",
    },
    direction: [
      {
        title: { pl: "Menu jak gazeta", en: "A newspaper menu" },
        text: {
          pl: "Kropkowane linie prowadzące do cen, krótkie opisy i sezonowe pozycje oznaczone etykietą.",
          en: "Dotted leaders to prices, short descriptions and seasonal items flagged with a label.",
        },
      },
      {
        title: { pl: "Ciepła paleta", en: "Warm palette" },
        text: {
          pl: "Krem, papier pakowy i espresso — kolory, które od razu kojarzą się z miejscem.",
          en: "Cream, kraft paper and espresso — colours that instantly feel like the place.",
        },
      },
      {
        title: { pl: "Informacje pod ręką", en: "Essentials at hand" },
        text: {
          pl: "Status „otwarte teraz” w nawigacji i godziny otwarcia zawsze w zasięgu wzroku.",
          en: "An “open now” status in the navigation and opening hours always in view.",
        },
      },
    ],
    palette: [
      { name: { pl: "Krem", en: "Cream" }, hex: "#F0EBE1" },
      { name: { pl: "Papier", en: "Kraft" }, hex: "#C5AE92" },
      { name: { pl: "Rdza", en: "Rust" }, hex: "#B4502F" },
      { name: { pl: "Espresso", en: "Espresso" }, hex: "#1F1A17" },
    ],
    typography: {
      pl: "Wyrazisty szeryf w nagłówkach i przyjazny grotesk w treści.",
      en: "A characterful serif for headlines and a friendly grotesque for body text.",
    },
    keywords: { pl: ["Ciepło", "Rytuał", "Gościnność"], en: ["Warmth", "Ritual", "Hospitality"] },
    scope: { pl: ["Projekt UI", "Development"], en: ["UI design", "Development"] },
    liveUrl: "https://coffe-bakehouse.vercel.app",
    cover: { src: coffeeHome, alt: { pl: "Coffee & Bakery (Ninepence) — strona główna", en: "Coffee & Bakery (Ninepence) — homepage" } },
    screens: [
      {
        kind: "desktop",
        src: coffeeHome,
        label: { pl: "Strona główna", en: "Homepage" },
        alt: { pl: "Coffee & Bakery (Ninepence) — strona główna", en: "Coffee & Bakery (Ninepence) — homepage" },
      },
      { kind: "desktop", src: coffeeMenu, label: { pl: "Menu", en: "Menu" }, alt: { pl: "Coffee & Bakery (Ninepence) — menu", en: "Coffee & Bakery (Ninepence) — menu" } },
    ],
    art: "coffee",
    theme: { tint: "rgba(180, 80, 47, 0.18)", accent: "#B4502F" },
  },
  {
    slug: "aether-one",
    index: "04",
    name: "Aether One",
    category: "Premium Audio / Product Concept",
    summary: {
      pl: "Koncept premiery słuchawek premium — produkt pokazany scena po scenie.",
      en: "A launch concept for premium headphones — the product revealed scene by scene.",
    },
    concept: {
      pl: "Koncept strony premierowej dla słuchawek, prezentowanych jak obiekt w galerii. Głęboka czerń, miedziane światło i precyzyjne opisy techniczne. Strona prowadzi przez produkt scena po scenie — od pierwszego wrażenia po rozłożenie konstrukcji na części.",
      en: "A launch page concept for headphones presented like an object in a gallery. Deep black, copper light and precise technical captions. The site guides you through the product scene by scene — from first impression to the construction taken apart.",
    },
    direction: [
      {
        title: { pl: "Produkt jako bohater", en: "Product as hero" },
        text: {
          pl: "Każda sekcja to jedna scena i jedno ujęcie produktu, z nawigacją po rozdziałach przy krawędzi ekranu.",
          en: "Each section is one scene and one view of the product, with chapter navigation along the edge.",
        },
      },
      {
        title: { pl: "Konstrukcja na wierzchu", en: "Construction revealed" },
        text: {
          pl: "Przewijanie rozkłada słuchawki na opisane warstwy, a potem składa je z powrotem.",
          en: "Scrolling takes the headphones apart into labelled layers, then puts them back together.",
        },
      },
      {
        title: { pl: "Ciepło miedzi", en: "Copper warmth" },
        text: {
          pl: "Czerń i tytan ożywione miedzianymi akcentami — paleta, która brzmi cicho, ale wyraźnie.",
          en: "Black and titanium brought to life with copper accents — a palette that sounds quiet but clear.",
        },
      },
    ],
    palette: [
      { name: { pl: "Czerń", en: "Black" }, hex: "#090B0C" },
      { name: { pl: "Tytan", en: "Titanium" }, hex: "#8E949B" },
      { name: { pl: "Miedź", en: "Copper" }, hex: "#C8693E" },
      { name: { pl: "Mgła", en: "Mist" }, hex: "#DBDDDF" },
    ],
    typography: {
      pl: "Szeroki grotesk w nagłówkach i monospace w opisach technicznych.",
      en: "A wide grotesque for headlines and monospace for technical captions.",
    },
    keywords: { pl: ["Cisza", "Rezonans", "Obiekt"], en: ["Silence", "Resonance", "Object"] },
    scope: { pl: ["Koncept produktu", "Projekt UI", "Motion", "Development"], en: ["Product concept", "UI design", "Motion", "Development"] },
    liveUrl: "https://aether-one-dusky.vercel.app",
    cover: { src: aetherHome, alt: { pl: "Aether One — strona premierowa słuchawek", en: "Aether One — headphone launch page" } },
    screens: [
      {
        kind: "desktop",
        src: aetherHome,
        label: { pl: "Premiera produktu", en: "Product launch" },
        alt: { pl: "Aether One — sekcja premierowa", en: "Aether One — launch section" },
      },
      {
        kind: "desktop",
        src: aetherExploded,
        label: { pl: "Widok rozłożony", en: "Exploded view" },
        alt: { pl: "Aether One — słuchawki rozłożone na części z opisami", en: "Aether One — exploded view of the headphones with captions" },
      },
    ],
    art: "aether",
    theme: { tint: "rgba(200, 105, 62, 0.18)", accent: "#C8693E" },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
