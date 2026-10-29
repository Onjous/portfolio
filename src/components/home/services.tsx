import type { Locale } from "@/i18n/config";
import { dictionary } from "@/i18n/dictionary";
import { Reveal, RevealLines } from "@/components/ui/reveal";

export function Services({ lang }: { lang: Locale }) {
  const t = dictionary[lang].services;

  return (
    <section id="uslugi" aria-labelledby="uslugi-title" className="px-gutter border-t border-line py-28 md:py-44">
      <div className="mb-16 grid grid-cols-1 gap-8 md:mb-24 md:grid-cols-12">
        <p className="eyebrow text-mute md:col-span-3">{t.label}</p>
        <RevealLines
          as="h2"
          id="uslugi-title"
          className="display text-[12vw] md:col-span-9 md:text-[7vw]"
          lines={[
            t.title.a,
            <>
              <span className="serif-italic uppercase">{t.title.accent}</span>
              {t.title.b && ` ${t.title.b}`}
            </>,
          ]}
        />
      </div>

      <ol className="border-t border-line">
        {t.items.map((s, i) => (
          <li key={s.title} className="group relative border-b border-line">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-lime transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
            />
            <Reveal className="grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:py-14">
              <span className="eyebrow text-mute transition-colors duration-500 group-hover:text-lime md:col-span-2">0{i + 1}</span>
              <h3 className="display text-[8.6vw] transition-transform duration-700 ease-out-expo md:col-span-5 md:text-[3.6vw] md:group-hover:translate-x-3">
                {s.title}
              </h3>
              <div className="md:col-span-5">
                <p className="text-bone/80 md:text-lg">{s.text}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((item) => (
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
