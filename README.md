# MIKO STUDIO

Portfolio niezależnego studia projektowego — Digital Design & Development.

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion for React · Lucide.

## Uruchomienie

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build produkcyjny
npm run start    # serwer produkcyjny
```

## Edycja treści

| Plik | Co zawiera |
| --- | --- |
| **`src/config/site.ts`** | E-mail, GitHub, projekty (PL + EN), linki live, zrzuty ekranu. |
| **`src/i18n/dictionary.ts`** | Wszystkie teksty interfejsu w obu językach (EN jest typowany względem PL — brakujący klucz = błąd builda). |

### Języki i adresy

Polski jest domyślny (bez prefiksu), angielski pod `/en`:

| Strona | PL | EN |
| --- | --- | --- |
| Główna | `/` | `/en` |
| Case study | `/projekty/brut` | `/en/projects/brut` |

Wszystkie trasy żyją wewnętrznie w `app/[lang]`; `src/proxy.ts` mapuje publiczne adresy na `/pl/…` / `/en/…`,
przekierowuje `/pl/…` na wersję bez prefiksu, poprawia segment `projekty`/`projects` i zwraca prawdziwy 404.
Każda strona ma `hreflang` (pl, en, x-default), canonical i wpis w sitemapie dla obu języków.
Przełącznik PL / EN otwiera tę samą stronę w drugim języku (pełne przeładowanie — zmienia się `<html lang>`).

### Zrzuty ekranu

Pliki są w `src/assets/projects/<slug>/` (WebP, 2400 px szerokości) i są importowane statycznie w `site.ts`,
więc `next/image` zna ich proporcje — zrzuty nigdy nie są rozciągane, a na stronach projektów są pokazywane w całości.

Aby dodać ekran: wrzuć plik do folderu projektu, zaimportuj go w `site.ts` i dopisz do `screens`
(`kind: "desktop"` — pełna szerokość, `kind: "mobile"` — ekrany telefonu wyświetlane parami).

## Architektura

```
src/
  config/site.ts              ← treść projektów i kontakt
  i18n/                       ← locale, ścieżki, słownik, kontekst języka
  proxy.ts                    ← mapowanie adresów PL/EN + statusy 404
  assets/projects/            ← zrzuty ekranu
  app/
    [lang]/layout.tsx         ← root layout per język: fonty, SEO, hreflang, skrypt intro
    [lang]/page.tsx           ← strona główna
    [lang]/projekty/[slug]/   ← case study + obraz Open Graph
    [lang]/not-found.tsx      ← lokalizowany 404
    sitemap.ts, robots.ts, icon.svg, globals.css
  components/
    home/                     ← intro, hero, showcase, indeks, studio, usługi, proces, kontakt
    project/                  ← hero case study, ProjectVisual (zrzut lub placeholder)
    layout/                   ← nagłówek (menu <dialog> + przełącznik języka), stopka
    ui/reveal.tsx             ← reveal, który nigdy nie zostawia ukrytej treści
```

### Ruch

- **Intro** — czysty CSS uruchamiany od pierwszej klatki (na `/` i `/en`). Skrypt w `<head>` wybiera tryb:
  `play` (pierwsza wizyta w sesji), `lite` (kolejne wizyty, linki z `#`, słabsze urządzenia), `off` (reduced motion).
- **Showcase** — Motion `useScroll`/`useTransform` na naturalnym przewijaniu, bez przypinania sekcji;
  pełna choreografia tylko na ekranach ≥1024 px bez reduced motion.
- **Indeks** — podgląd podąża za kursorem (tylko precyzyjne wskaźniki); dotyk = statyczne miniatury.

## Publikacja

### Vercel (zalecane)

1. Wypchnij repozytorium na GitHub.
2. Na vercel.com → **Add New → Project** → zaimportuj repozytorium (ustawienia domyślne).
3. Opcjonalnie ustaw `NEXT_PUBLIC_SITE_URL` (np. po podpięciu własnej domeny) — używane w canonical, hreflang,
   sitemapie i Open Graph. Bez niej użyta zostanie automatycznie domena produkcyjna Vercela.

### Własny serwer (Node 20+)

```bash
npm ci && npm run build
NEXT_PUBLIC_SITE_URL=https://twojadomena.pl npm run start   # port 3000, za reverse proxy (np. Nginx)
```

Strona wymaga serwera Node (Proxy dla statusów 404 i optymalizacja obrazów), więc nie jest eksportem statycznym.
