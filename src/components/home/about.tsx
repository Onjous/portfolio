import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { dictionary } from "@/i18n/dictionary";
import { Reveal, RevealLines } from "@/components/ui/reveal";

export function About({ lang }: { lang: Locale }) {
  const t = dictionary[lang].about;

  return (
    <section id="studio" aria-labelledby="studio-title" className="px-gutter border-t border-line py-28 md:py-44">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <p className="eyebrow text-mute md:col-span-3">{t.label}</p>

        <div className="md:col-span-9">
          <h2 id="studio-title" className="sr-only">
            {t.heading}
          </h2>
          <RevealLines
            as="p"
            className="text-[clamp(1.9rem,4.4vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.035em] text-balance"
            lines={[
              <>
                {t.statement.lead}{" "}
                <span className="text-mute">
                  {t.statement.rest} <span className="serif-italic text-bone">{t.statement.accent}</span> {t.statement.end}
                </span>
              </>,
            ]}
          />
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-12 md:mt-28 md:grid-cols-12">
        <Reveal className="md:col-span-4 md:col-start-4">
          <p className="eyebrow mb-4 text-mute">{t.founderLabel}</p>
          <p className="serif-italic text-6xl leading-[0.95] md:text-7xl">{site.founder}</p>
          <p className="eyebrow mt-5 max-w-xs leading-relaxed text-bone/70">{t.role}</p>
        </Reveal>

        <Reveal className="md:col-span-4 md:col-start-9" delay={0.08}>
          <p className="text-lg leading-relaxed text-bone/80">{t.bio}</p>
        </Reveal>
      </div>

      <ul className="mt-20 grid grid-cols-1 border-t border-line sm:grid-cols-2 md:mt-28 lg:grid-cols-4">
        {t.principles.map((item, i) => (
          <li key={item} className="border-b border-line py-6 sm:pr-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
            <Reveal delay={i * 0.06}>
              <span className="eyebrow text-lime">0{i + 1}</span>
              <p className="mt-3 text-lg leading-snug">{item}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
