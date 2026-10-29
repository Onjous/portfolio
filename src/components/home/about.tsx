import { site } from "@/config/site";
import { Reveal, RevealLines } from "@/components/ui/reveal";

const principles = [
  "Projekt i kod w jednych rękach",
  "Bezpośredni kontakt, bez pośredników",
  "Strony szybkie, dostępne i responsywne",
  "Detal, który robi różnicę",
];

export function About() {
  return (
    <section id="studio" aria-labelledby="studio-title" className="px-gutter border-t border-line py-28 md:py-44">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <p className="eyebrow text-mute md:col-span-3">(03) Studio</p>

        <div className="md:col-span-9">
          <h2 id="studio-title" className="sr-only">
            O studiu
          </h2>
          <RevealLines
            as="p"
            className="text-[clamp(1.9rem,4.4vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.035em] text-balance"
            lines={[
              <>
                {site.name} to niezależne studio projektowe.{" "}
                <span className="text-mute">
                  Łączę projektowanie i programowanie, żeby Twoja marka wyglądała w sieci{" "}
                  <span className="serif-italic text-bone">dokładnie tak,</span> jak na to zasługuje.
                </span>
              </>,
            ]}
          />
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-12 md:mt-28 md:grid-cols-12">
        <Reveal className="md:col-span-4 md:col-start-4">
          <p className="eyebrow mb-4 text-mute">Założyciel</p>
          <p className="serif-italic text-6xl leading-none md:text-7xl">{site.founder}</p>
          <p className="mt-4 text-sm text-mute">Projektant i developer. Twórca {site.name}.</p>
        </Reveal>

        <Reveal className="space-y-5 text-bone/80 md:col-span-4 md:col-start-9" delay={0.08}>
          <p>
            Za studiem stoję ja — {site.founder}. Projektuję i koduję samodzielnie, więc pomysł nie gubi się po drodze między makietą a gotową
            stroną.
          </p>
          <p>
            Rozmawiasz bezpośrednio z osobą, która tworzy Twoją stronę. Mówię prostym językiem, pokazuję postępy na bieżąco i dbam o każdy
            szczegół — od typografii po czas ładowania.
          </p>
        </Reveal>
      </div>

      <ul className="mt-20 grid grid-cols-1 border-t border-line sm:grid-cols-2 md:mt-28 lg:grid-cols-4">
        {principles.map((item, i) => (
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
