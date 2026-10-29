import type { Locale } from "./config";

/**
 * Every UI string, per language. Project content lives in src/config/site.ts.
 * The English dictionary is typed against the Polish one, so a missing key
 * fails the build instead of rendering an empty string.
 */

const pl = {
  meta: {
    description: "MIKO STUDIO — niezależne studio projektowe. Projektuję i tworzę strony internetowe, które wyróżniają marki.",
    projectSuffix: "Projekt koncepcyjny MIKO STUDIO.",
  },
  common: {
    skip: "Przejdź do treści",
    homeLabel: "strona główna",
    newTab: "(otwiera się w nowej karcie)",
    concept: "Projekt koncepcyjny",
    conceptDemo: "Projekt koncepcyjny · demo",
    caseStudy: "Case study",
    view: "Zobacz",
    liveSite: "Strona live",
    viewLive: "Zobacz stronę live",
  },
  nav: {
    work: "Projekty",
    studio: "Studio",
    process: "Proces",
    contact: "Kontakt",
    cta: "Porozmawiajmy",
    menu: "Menu",
    close: "Zamknij",
    main: "Główna nawigacja",
    mobile: "Menu mobilne",
    language: "Wybór języka",
  },
  hero: {
    eyebrow: "Niezależne studio",
    intro: "Projektowanie i development stron internetowych — od pierwszej rozmowy po publikację.",
    projects: "Projekty",
    lead: "Projektuję i tworzę strony internetowe, które wyróżniają marki.",
    ctaWork: "Zobacz projekty",
    ctaTalk: "Porozmawiajmy",
    scroll: "Przewiń",
  },
  showcase: {
    label: "(01) Wybrane projekty",
    title: ["Wybrane", "projekty"],
    intro:
      "Cztery projekty koncepcyjne — każdy z własną identyfikacją, rytmem i charakterem. To nie są realizacje dla klientów, tylko studia formy, w których sprawdzam, jak daleko można zaprowadzić markę.",
  },
  index: {
    label: "(02) Indeks",
    title: ["Indeks", "case study"],
    note: "Wszystkie projekty są koncepcyjne / demonstracyjne — powstały jako autorskie studia, nie na zlecenie klientów.",
  },
  about: {
    label: "(03) Studio",
    heading: "O studiu",
    statement: {
      lead: "MIKO STUDIO to niezależne studio projektowe.",
      rest: "Łączę projektowanie i programowanie, żeby Twoja marka wyglądała w sieci",
      accent: "dokładnie tak,",
      end: "jak na to zasługuje.",
    },
    founderLabel: "Założyciel",
    role: "Założyciel / Niezależny projektant i developer stron",
    bio: "Jestem Mikołaj Dod, twórca MIKO STUDIO i student informatyki. Projektuję i tworzę nowoczesne strony internetowe, łącząc estetykę, funkcjonalność i nowe technologie. Skupiam się na dopracowanych detalach, płynnych interakcjach i indywidualnym podejściu do każdego projektu.",
    principles: [
      "Projekt i kod w jednych rękach",
      "Bezpośredni kontakt, bez pośredników",
      "Strony szybkie, dostępne i responsywne",
      "Detal, który robi różnicę",
    ],
  },
  services: {
    label: "(04) Usługi",
    title: { a: "Co mogę", accent: "dla Ciebie", b: "zrobić" },
    items: [
      {
        title: "Web Design",
        text: "Projektuję wygląd strony od zera: układ, typografię, kolory i sposób, w jaki prowadzi odwiedzającego. Bez gotowych szablonów — tak, żeby strona pasowała do Twojej marki, a nie do tysiąca innych.",
        tags: ["Projekt strony głównej i podstron", "Wersja na telefon i komputer", "Spójny styl wizualny"],
      },
      {
        title: "Web Development",
        text: "Zamieniam projekt w szybką, działającą stronę. Dbam o to, żeby ładowała się błyskawicznie, dobrze wyglądała na każdym urządzeniu i łatwo dało się ją znaleźć w Google.",
        tags: ["Szybkie ładowanie", "Działa na każdym ekranie", "Podstawy SEO", "Pomoc z domeną i publikacją"],
      },
      {
        title: "Digital Experiences",
        text: "Animacje, interakcje i detale, dzięki którym strona zostaje w pamięci. Ruch z umiarem — po to, żeby wzmacniał przekaz, a nie go zagłuszał.",
        tags: ["Animacje i przejścia", "Interaktywne prezentacje", "Strony produktowe i premiery"],
      },
    ],
  },
  process: {
    label: "(05) Proces",
    title: ["Jak", "pracujemy"],
    intro: "Cztery kroki, jasne zasady i stały kontakt. Zawsze wiesz, na jakim etapie jest Twoja strona.",
    steps: [
      { title: "Rozmowa", text: "Poznaję Twoją firmę, cele i odbiorców. Ustalamy zakres, termin i budżet — konkretnie i bez zobowiązań.", outcome: "Jasny plan" },
      {
        title: "Projekt",
        text: "Przygotowuję projekt wizualny. Widzisz, jak będzie wyglądać strona, zanim powstanie choć linijka kodu, i wspólnie wprowadzamy poprawki.",
        outcome: "Zatwierdzony wygląd",
      },
      { title: "Realizacja", text: "Buduję stronę: kod, animacje i wersję mobilną. Testuję ją na różnych urządzeniach i przeglądarkach.", outcome: "Gotowa strona" },
      { title: "Publikacja", text: "Strona trafia do sieci. Pomagam z domeną i konfiguracją oraz pokazuję, jak dbać o nią po starcie.", outcome: "Strona online" },
    ],
  },
  contact: {
    label: "(06) Kontakt",
    title: { a: "Masz pomysł?", b: "Nadajmy mu", accent: "formę." },
    lead: "Opowiedz mi o swojej marce i o tym, czego potrzebujesz. Odpiszę z propozycją kolejnych kroków — bez zobowiązań.",
    copy: "Kopiuj adres",
    copied: "Skopiowano",
    write: "Napisz",
    writeLabel: "Napisz e-mail",
  },
  footer: {
    about: "Niezależne studio projektowe. Założyciel: Mikołaj Dod.",
    map: "Mapa",
    contact: "Kontakt",
    talk: "Porozmawiajmy o projekcie",
    top: "Do góry",
  },
  project: {
    back: "Wszystkie projekty",
    disclaimer: "Projekt koncepcyjny / demonstracyjny przygotowany przez MIKO STUDIO. Nie jest realizacją komercyjną na zlecenie klienta.",
    concept: "(Koncept)",
    industry: "Branża",
    type: "Typ projektu",
    typeValue: "Koncept / demo",
    scope: "Zakres",
    live: "Wersja live",
    openSite: "Otwórz stronę",
    soon: "Wkrótce",
    direction: "(Kierunek projektowy)",
    palette: "Paleta",
    typography: "Typografia",
    screens: "Ekrany projektu",
    liveText: "Zobacz projekt w działaniu — z animacjami, interakcjami i wersją mobilną.",
    liveSoon: "Wersja live tego konceptu jest w przygotowaniu.",
    next: "Następny projekt",
    screenPlaceholder: "Miejsce na zrzut ekranu",
  },
  notFound: {
    code: "Błąd 404",
    title: ["Nie ma", "takiej strony"],
    back: "Wróć na stronę główną",
  },
};

export type Dictionary = typeof pl;

const en: Dictionary = {
  meta: {
    description: "MIKO STUDIO — an independent design studio. I design and build websites that make brands stand out.",
    projectSuffix: "A MIKO STUDIO concept project.",
  },
  common: {
    skip: "Skip to content",
    homeLabel: "home",
    newTab: "(opens in a new tab)",
    concept: "Concept project",
    conceptDemo: "Concept project · demo",
    caseStudy: "Case study",
    view: "View",
    liveSite: "Live site",
    viewLive: "View live website",
  },
  nav: {
    work: "Work",
    studio: "Studio",
    process: "Process",
    contact: "Contact",
    cta: "Let’s talk",
    menu: "Menu",
    close: "Close",
    main: "Main navigation",
    mobile: "Mobile menu",
    language: "Language",
  },
  hero: {
    eyebrow: "Independent studio",
    intro: "Website design and development — from the first conversation to launch.",
    projects: "Projects",
    lead: "I design and build websites that make brands stand out.",
    ctaWork: "View projects",
    ctaTalk: "Let’s talk",
    scroll: "Scroll",
  },
  showcase: {
    label: "(01) Selected work",
    title: ["Selected", "work"],
    intro:
      "Four concept projects — each with its own identity, rhythm and character. They aren’t client commissions but design studies, exploring how far a brand can be taken.",
  },
  index: {
    label: "(02) Index",
    title: ["Case study", "index"],
    note: "All projects are conceptual / demo work — self-initiated studies, not client commissions.",
  },
  about: {
    label: "(03) Studio",
    heading: "About the studio",
    statement: {
      lead: "MIKO STUDIO is an independent design studio.",
      rest: "I bring design and development together so your brand looks online",
      accent: "exactly the way",
      end: "it deserves to.",
    },
    founderLabel: "Founder",
    role: "Founder / Independent Web Designer & Developer",
    bio: "I’m Mikołaj Dod, the creator of MIKO STUDIO and a computer science student. I design and develop modern websites that combine aesthetics, functionality, and technology. My focus is on thoughtful details, smooth interactions, and a tailored approach to every project.",
    principles: ["Design and code in one pair of hands", "Direct contact, no middlemen", "Fast, accessible, responsive sites", "Details that make the difference"],
  },
  services: {
    label: "(04) Services",
    title: { a: "What I can", accent: "do for you", b: "" },
    items: [
      {
        title: "Web Design",
        text: "I design your website from scratch: layout, typography, colour and the way it guides visitors. No off-the-shelf templates — so it fits your brand, not a thousand others.",
        tags: ["Homepage and subpages", "Mobile and desktop versions", "A consistent visual style"],
      },
      {
        title: "Web Development",
        text: "I turn the design into a fast, working website — one that loads quickly, looks right on every device and is easy to find on Google.",
        tags: ["Fast loading", "Works on every screen", "SEO essentials", "Help with domain and launch"],
      },
      {
        title: "Digital Experiences",
        text: "Animation, interaction and details that make a website memorable. Motion used with restraint — to strengthen the message, not drown it out.",
        tags: ["Animations and transitions", "Interactive presentations", "Product pages and launches"],
      },
    ],
  },
  process: {
    label: "(05) Process",
    title: ["How", "we work"],
    intro: "Four steps, clear rules and regular contact. You always know where your website stands.",
    steps: [
      { title: "Conversation", text: "I get to know your business, goals and audience. We agree on scope, timing and budget — clearly and with no obligation.", outcome: "A clear plan" },
      { title: "Design", text: "I prepare the visual design. You see how the site will look before a single line of code is written, and we refine it together.", outcome: "Approved design" },
      { title: "Build", text: "I build the site: code, animation and the mobile version — tested across devices and browsers.", outcome: "A finished site" },
      { title: "Launch", text: "The site goes live. I help with the domain and setup, and show you how to look after it afterwards.", outcome: "Live website" },
    ],
  },
  contact: {
    label: "(06) Contact",
    title: { a: "Got an idea?", b: "Let’s give it", accent: "form." },
    lead: "Tell me about your brand and what you need. I’ll reply with suggested next steps — no obligation.",
    copy: "Copy address",
    copied: "Copied",
    write: "Write",
    writeLabel: "Send an email",
  },
  footer: {
    about: "Independent design studio. Founded by Mikołaj Dod.",
    map: "Sitemap",
    contact: "Contact",
    talk: "Let’s talk about a project",
    top: "Back to top",
  },
  project: {
    back: "All projects",
    disclaimer: "A conceptual / demo project created by MIKO STUDIO — not a paid client commission.",
    concept: "(Concept)",
    industry: "Industry",
    type: "Project type",
    typeValue: "Concept / demo",
    scope: "Scope",
    live: "Live version",
    openSite: "Open website",
    soon: "Coming soon",
    direction: "(Design direction)",
    palette: "Palette",
    typography: "Typography",
    screens: "Project screens",
    liveText: "See the project in action — with its animations, interactions and mobile version.",
    liveSoon: "A live version of this concept is in preparation.",
    next: "Next project",
    screenPlaceholder: "Screenshot placeholder",
  },
  notFound: {
    code: "Error 404",
    title: ["This page", "doesn’t exist"],
    back: "Back to the homepage",
  },
};

export const dictionary: Record<Locale, Dictionary> = { pl, en };
