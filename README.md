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

## Edycja treści — jeden plik

Wszystko, co edytowalne, jest w **`src/config/site.ts`**:

| Pole | Co robi |
| --- | --- |
| `site.email` | Adres e-mail. **Puste = brak linku w sekcji kontaktu.** Uzupełnij przed publikacją. |
| `site.socials` | Lista `{ label, href }`. Pusta = nic się nie wyświetla. |
| `projects[]` | Dane projektów: nazwa, kategoria, koncept, kierunek, paleta, ekrany. |
| `projects[].liveUrl` | Link do wersji live. Puste = „Wersja live — wkrótce” (bez martwego linku). |
| `projects[].cover.src` | Zrzut ekranu okładki, np. `/projects/brut/cover.jpg`. |
| `projects[].screens[].src` | Zrzuty ekranów na podstronie projektu (`kind: "desktop"` lub `"mobile"`). |

### Podmiana wizualizacji tymczasowych na zrzuty ekranu

Dopóki projekt nie ma `src`, strona pokazuje abstrakcyjną kompozycję SVG oznaczoną
etykietą **„Wizualizacja tymczasowa”** / **„Miejsce na zrzut ekranu”**. To nie są fałszywe screenshoty.

1. Wrzuć pliki do `public/projects/<slug>/` (zalecane: JPG/WebP, okładka 2400×1500, ekrany desktop 2400×1500, mobile 1080×1920).
2. Ustaw ścieżki w `site.ts`, np. `cover: { src: "/projects/brut/cover.jpg", alt: "…" }`.
3. Obrazy są automatycznie optymalizowane przez `next/image`; etykiety placeholderów znikają.

## Architektura

```
src/
  config/site.ts              ← cała treść
  app/
    layout.tsx                ← fonty, SEO, skrypt intro (przed pierwszym renderem)
    page.tsx                  ← strona główna
    projekty/[slug]/          ← case study + obraz Open Graph
    opengraph-image.tsx, sitemap.ts, robots.ts, icon.svg, not-found.tsx
    globals.css               ← tokeny, typografia, choreografia intro (CSS)
  proxy.ts                    ← prawdziwy 404 dla nieznanych projektów
  components/
    home/                     ← intro, hero, showcase, indeks, studio, usługi, proces, kontakt
    project/                  ← hero case study, ProjectVisual (zrzut lub placeholder)
    art/project-art.tsx       ← tymczasowe kompozycje SVG z wariantami kadrowania
    layout/                   ← nagłówek (menu jako <dialog>), stopka
    ui/reveal.tsx             ← reveal, który nigdy nie zostawia ukrytej treści
  lib/                        ← hooki (SSR-safe media queries), utils, OG
```

### Ruch

- **Intro** — czysty CSS uruchamiany od pierwszej klatki, zanim React się zhydratuje (brak migania i przesunięć).
  Skrypt w `<head>` wybiera tryb: `play` (pierwsza wizyta w sesji), `lite` (kolejne wizyty, linki z `#`,
  słabsze urządzenia mobilne), `off` (`prefers-reduced-motion`). Overlay nigdy nie blokuje kliknięć.
- **Showcase** — Motion `useScroll`/`useTransform` na naturalnym przewijaniu, bez przypinania sekcji.
  Pełna choreografia tylko na ekranach ≥1024 px bez reduced motion; ten sam DOM na każdym ekranie.
- **Indeks** — podgląd na sprężynach podąża za kursorem (tylko precyzyjne wskaźniki); dotyk = statyczne miniatury.

## Publikacja

### Vercel (zalecane)

1. Wypchnij repozytorium na GitHub.
2. Na vercel.com → **Add New → Project** → zaimportuj repozytorium (ustawienia domyślne).
3. Po podpięciu własnej domeny ustaw zmienną `NEXT_PUBLIC_SITE_URL=https://twojadomena.pl`
   (canonical, sitemap, Open Graph). Bez niej użyta zostanie domena produkcyjna Vercela.

### Własny serwer (Node 20+)

```bash
npm ci && npm run build
NEXT_PUBLIC_SITE_URL=https://twojadomena.pl npm run start   # port 3000, za reverse proxy (np. Nginx)
```

Strona wymaga serwera Node (Proxy dla statusów 404 i optymalizacja obrazów), więc nie jest eksportem statycznym.
