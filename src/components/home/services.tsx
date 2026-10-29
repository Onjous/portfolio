import { Reveal, RevealLines } from "@/components/ui/reveal";

const services = [
  {
    index: "01",
    title: "Web Design",
    text: "Projektuję wygląd strony od zera: układ, typografię, kolory i sposób, w jaki prowadzi odwiedzającego. Bez gotowych szablonów — tak, żeby strona pasowała do Twojej marki, a nie do tysiąca innych.",
    items: ["Projekt strony głównej i podstron", "Wersja na telefon i komputer", "Spójny styl wizualny"],
  },
  {
    index: "02",
    title: "Web Development",
    text: "Zamieniam projekt w szybką, działającą stronę. Dbam o to, żeby ładowała się błyskawicznie, dobrze wyglądała na każdym urządzeniu i łatwo dało się ją znaleźć w Google.",
    items: ["Szybkie ładowanie", "Działa na każdym ekranie", "Podstawy SEO", "Pomoc z domeną i publikacją"],
  },
  {
    index: "03",
    title: "Digital Experiences",
    text: "Animacje, interakcje i detale, dzięki którym strona zostaje w pamięci. Ruch z umiarem — po to, żeby wzmacniał przekaz, a nie go zagłuszał.",
    items: ["Animacje i przejścia", "Interaktywne prezentacje", "Strony produktowe i premiery"],
  },
];

export function Services() {
  return (
    <section id="uslugi" aria-labelledby="uslugi-title" className="px-gutter border-t border-line py-28 md:py-44">
      <div className="mb-16 grid grid-cols-1 gap-8 md:mb-24 md:grid-cols-12">
        <p className="eyebrow text-mute md:col-span-3">(04) Usługi</p>
        <RevealLines
          as="h2"
          id="uslugi-title"
          className="display text-[12vw] md:col-span-9 md:text-[7vw]"
          lines={[
            "Co mogę",
            <>
              <span className="serif-italic uppercase">dla Ciebie</span> zrobić
            </>,
          ]}
        />
      </div>

      <ol className="border-t border-line">
        {services.map((s) => (
          <li key={s.index} className="group relative border-b border-line">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-lime transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
            />
            <Reveal className="grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:py-14">
              <span className="eyebrow text-mute transition-colors duration-500 group-hover:text-lime md:col-span-2">{s.index}</span>
              <h3 className="display text-[10vw] transition-transform duration-700 ease-out-expo md:col-span-5 md:text-[3.6vw] md:group-hover:translate-x-3">
                {s.title}
              </h3>
              <div className="md:col-span-5">
                <p className="text-bone/80 md:text-lg">{s.text}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <li key={item} className="rounded-full border border-line px-3 py-1.5 text-xs text-bone/70">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
