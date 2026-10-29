/**
 * MIKO STUDIO — single source of truth.
 *
 * Every piece of editable content lives here: studio details, contact,
 * social links and all project data. Components only read from this file.
 *
 * Images: drop real screenshots into /public/projects/<slug>/ and point
 * `cover` / `screens[].src` at them (e.g. "/projects/brut/home.jpg").
 * Until a `src` is provided, the site renders a clearly labelled
 * temporary visual instead of a screenshot.
 */

export type SocialLink = { label: string; href: string };

export type ProjectImage = {
  /** Path inside /public, e.g. "/projects/brut/cover.jpg". Leave undefined to show the temporary visual. */
  src?: string;
  alt: string;
};

export type ProjectScreen = ProjectImage & {
  /** Shown on the placeholder and used as a caption. */
  label: string;
  /** desktop = full-width frame, mobile = portrait frame shown in pairs. */
  kind: "desktop" | "mobile";
};

export type ProjectArtKind = "atelier" | "brut" | "coffee" | "aether";

export type Project = {
  slug: string;
  index: string;
  name: string;
  category: string;
  /** One line used in lists and metadata. */
  summary: string;
  /** Creative concept, shown on the case study page. */
  concept: string;
  direction: { title: string; text: string }[];
  palette: { name: string; hex: string }[];
  typography: string;
  keywords: string[];
  scope: string[];
  /** Live demo URL. Leave undefined until the project is published — the page shows "wkrótce" instead of a link. */
  liveUrl?: string;
  cover: ProjectImage;
  screens: ProjectScreen[];
  /** Temporary art direction used while real screenshots are missing. */
  art: ProjectArtKind;
  theme: { tint: string; accent: string };
};

export const site = {
  name: "MIKO STUDIO",
  shortName: "MIKO",
  tagline: "Digital Design & Development.",
  founder: "Mikołaj",
  description:
    "MIKO STUDIO — niezależne studio projektowe. Projektuję i tworzę strony internetowe, które wyróżniają marki.",
  /**
   * Production URL used for canonical links, sitemap and Open Graph.
   * Set NEXT_PUBLIC_SITE_URL in your hosting environment. On Vercel the
   * production domain is picked up automatically.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  /** TODO: wpisz swój adres e-mail. Dopóki pole jest puste, sekcja kontaktu nie pokazuje linku. */
  email: "",
  /** Add profiles as { label: "Instagram", href: "https://…" }. Empty list = nothing rendered. */
  socials: [] as SocialLink[],
  nav: [
    { label: "Projekty", href: "/#projekty" },
    { label: "Studio", href: "/#studio" },
    { label: "Proces", href: "/#proces" },
  ],
};

export const projects: Project[] = [
  {
    slug: "atelier-auto",
    index: "01",
    name: "Atelier Auto",
    category: "Automotive Detailing",
    summary: "Detailing pokazany jak praca jubilera — światło, lakier i precyzja.",
    concept:
      "Detailing to rzemiosło precyzji. Koncept traktuje lakier jak lustro: ciemne kadry, światło prowadzone po krawędziach karoserii i typografia o technicznej dyscyplinie. Strona ma budzić to samo uczucie, co pierwszy rzut oka na świeżo wypolerowany samochód.",
    direction: [
      {
        title: "Światło jako narracja",
        text: "Refleksy przesuwają się po powierzchniach wraz z przewijaniem — tak, jak światło ślizga się po lakierze.",
      },
      {
        title: "Techniczny spokój",
        text: "Dużo czerni, wąska paleta i monospace w detalach. Usługi opisane jak specyfikacja, nie jak reklama.",
      },
      {
        title: "Rezerwacja bez tarcia",
        text: "Pakiety i terminy dostępne w dwóch kliknięciach — prestiż nie może oznaczać skomplikowania.",
      },
    ],
    palette: [
      { name: "Grafit", hex: "#0D0F12" },
      { name: "Chrom", hex: "#C9D3DC" },
      { name: "Stal", hex: "#7F95AA" },
      { name: "Kość", hex: "#ECEAE4" },
    ],
    typography: "Szeroki grotesk w nagłówkach, monospace w danych technicznych.",
    keywords: ["Precyzja", "Refleks", "Detal"],
    scope: ["Projekt UI", "Development", "Motion"],
    liveUrl: undefined,
    cover: { src: undefined, alt: "Atelier Auto — strona główna" },
    screens: [
      { kind: "desktop", label: "Strona główna", alt: "Atelier Auto — strona główna" },
      { kind: "desktop", label: "Pakiety usług", alt: "Atelier Auto — pakiety usług" },
      { kind: "mobile", label: "Mobile — start", alt: "Atelier Auto — wersja mobilna, start" },
      { kind: "mobile", label: "Mobile — rezerwacja", alt: "Atelier Auto — wersja mobilna, rezerwacja" },
    ],
    art: "atelier",
    theme: { tint: "rgba(127, 160, 196, 0.22)", accent: "#9FB4C7" },
  },
  {
    slug: "brut",
    index: "02",
    name: "Brut",
    category: "Barbershop",
    summary: "Surowa identyfikacja barbershopu — beton, czerń i jedno mocne cięcie.",
    concept:
      "Surowo, konkretnie, bez ozdobników. BRUT to strona zbudowana na kontraście: beton, czerń i ciężka typografia, która mówi krótko — jak dobre cięcie. Każdy ekran ma jeden cel i jedną decyzję do podjęcia.",
    direction: [
      {
        title: "Brutalizm z wyczuciem",
        text: "Widoczna siatka, duże bloki koloru i typografia przycięta krawędzią ekranu.",
      },
      {
        title: "Jeden akcent",
        text: "Sygnałowa czerwień pojawia się tylko tam, gdzie prowadzi do rezerwacji.",
      },
      {
        title: "Rytm salonu",
        text: "Krótkie sekcje i szybkie przejścia — tempo jak w dobrze prowadzonym barbershopie.",
      },
    ],
    palette: [
      { name: "Beton", hex: "#D6D1C7" },
      { name: "Czerń", hex: "#111111" },
      { name: "Sygnał", hex: "#E2401C" },
      { name: "Kość", hex: "#F2EEE6" },
    ],
    typography: "Ekstremalnie szeroki, ciężki grotesk; drobny monospace jako kontrapunkt.",
    keywords: ["Kontrast", "Rzemiosło", "Charakter"],
    scope: ["Identyfikacja", "Projekt UI", "Development"],
    liveUrl: undefined,
    cover: { src: undefined, alt: "Brut — strona główna" },
    screens: [
      { kind: "desktop", label: "Strona główna", alt: "Brut — strona główna" },
      { kind: "desktop", label: "Cennik i rezerwacja", alt: "Brut — cennik i rezerwacja" },
      { kind: "mobile", label: "Mobile — start", alt: "Brut — wersja mobilna, start" },
      { kind: "mobile", label: "Mobile — cennik", alt: "Brut — wersja mobilna, cennik" },
    ],
    art: "brut",
    theme: { tint: "rgba(226, 64, 28, 0.16)", accent: "#E2401C" },
  },
  {
    slug: "coffee-bakery",
    index: "03",
    name: "Coffee & Bakery",
    category: "Hospitality",
    summary: "Ciepła, redakcyjna strona kawiarni z rytmem porannego menu.",
    concept:
      "Ciepło porannego pieczywa i spokojny rytm kawiarni. Koncept łączy miękkie, ziemiste barwy z redakcyjnym układem menu. Zamiast katalogu produktów — strona, która zaprasza, żeby wpaść na kawę.",
    direction: [
      {
        title: "Menu jak magazyn",
        text: "Oferta podana w układzie redakcyjnym: duże zdjęcia, krótkie opisy, wyraźne ceny.",
      },
      {
        title: "Ciepła paleta",
        text: "Krem, skórka chleba i espresso. Kolory, które od razu kojarzą się z miejscem.",
      },
      {
        title: "Lokalny charakter",
        text: "Godziny otwarcia i dojazd zawsze pod ręką — najważniejsze informacje bez szukania.",
      },
    ],
    palette: [
      { name: "Krem", hex: "#EFE4D2" },
      { name: "Skórka", hex: "#B5652B" },
      { name: "Espresso", hex: "#2A1A10" },
      { name: "Mleko", hex: "#FFFAF2" },
    ],
    typography: "Elegancka szeryfowa kursywa w akcentach, spokojny grotesk w treści.",
    keywords: ["Ciepło", "Rytuał", "Gościnność"],
    scope: ["Projekt UI", "Development"],
    liveUrl: undefined,
    cover: { src: undefined, alt: "Coffee & Bakery — strona główna" },
    screens: [
      { kind: "desktop", label: "Strona główna", alt: "Coffee & Bakery — strona główna" },
      { kind: "desktop", label: "Menu", alt: "Coffee & Bakery — menu" },
      { kind: "mobile", label: "Mobile — start", alt: "Coffee & Bakery — wersja mobilna, start" },
      { kind: "mobile", label: "Mobile — menu", alt: "Coffee & Bakery — wersja mobilna, menu" },
    ],
    art: "coffee",
    theme: { tint: "rgba(181, 101, 43, 0.2)", accent: "#B5652B" },
  },
  {
    slug: "aether-one",
    index: "04",
    name: "Aether One",
    category: "Premium Audio / Product Concept",
    summary: "Koncept premiery produktu audio — obiekt pokazany jak w galerii.",
    concept:
      "Koncept strony premierowej dla produktu audio, prezentowanego jak obiekt w galerii. Cisza, powietrze i precyzyjne światło. Strona prowadzi przez produkt scena po scenie — od pierwszego wrażenia po detal konstrukcji.",
    direction: [
      {
        title: "Produkt jako bohater",
        text: "Każda sekcja to jedna scena z jednym ujęciem produktu. Bez rozpraszaczy.",
      },
      {
        title: "Ruch jak dźwięk",
        text: "Animacje narastają i wybrzmiewają płynnie — inspirowane falą i rezonansem.",
      },
      {
        title: "Chłodna precyzja",
        text: "Głęboki granat, tytan i lodowy błękit. Paleta, która brzmi cicho.",
      },
    ],
    palette: [
      { name: "Noc", hex: "#05070C" },
      { name: "Tytan", hex: "#8E99A8" },
      { name: "Lód", hex: "#8FD0FF" },
      { name: "Mgła", hex: "#DFE7F2" },
    ],
    typography: "Lekki, szeroki grotesk i duże odstępy — typografia, która oddycha.",
    keywords: ["Cisza", "Rezonans", "Obiekt"],
    scope: ["Koncept produktu", "Projekt UI", "Motion", "Development"],
    liveUrl: undefined,
    cover: { src: undefined, alt: "Aether One — strona produktowa" },
    screens: [
      { kind: "desktop", label: "Premiera produktu", alt: "Aether One — sekcja premierowa" },
      { kind: "desktop", label: "Specyfikacja", alt: "Aether One — specyfikacja" },
      { kind: "mobile", label: "Mobile — start", alt: "Aether One — wersja mobilna, start" },
      { kind: "mobile", label: "Mobile — detal", alt: "Aether One — wersja mobilna, detal" },
    ],
    art: "aether",
    theme: { tint: "rgba(120, 186, 255, 0.2)", accent: "#8FD0FF" },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
