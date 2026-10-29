import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getNextProject, getProject, projects, type Project, type ProjectScreen } from "@/config/site";
import { ProjectHero } from "@/components/project/project-hero";
import { ProjectVisual, PlaceholderTag } from "@/components/project/project-visual";
import { Reveal, RevealLines } from "@/components/ui/reveal";
import { hasLocale, locales, ogLocale, projectPath, type Locale } from "@/i18n/config";
import { dictionary, type Dictionary } from "@/i18n/dictionary";
import { languageAlternates } from "@/lib/seo";
import { titleLines } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projekty/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!project || !hasLocale(lang)) return {};
  const title = `${project.name} — ${project.category}`;
  const description = `${project.summary[lang]} ${dictionary[lang].meta.projectSuffix}`;
  return {
    title,
    description,
    alternates: languageAlternates(lang, (l) => projectPath(l, project.slug)),
    openGraph: {
      title,
      description,
      url: projectPath(lang, project.slug),
      type: "article",
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projekty/[slug]">) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!project || !hasLocale(lang)) notFound();
  const t = dictionary[lang];
  const next = getNextProject(project.slug);
  const desktopScreens = project.screens.filter((s) => s.kind === "desktop");
  const mobileScreens = project.screens.filter((s) => s.kind === "mobile");

  return (
    <article>
      <ProjectHero project={project} />

      <aside className="px-gutter border-y border-line py-4">
        <p className="eyebrow flex items-start gap-3 text-bone/80">
          <span className="mt-[0.3em] size-1.5 shrink-0 rounded-full bg-lime" aria-hidden="true" />
          {t.project.disclaimer}
        </p>
      </aside>

      {/* Concept */}
      <section aria-labelledby="koncept" className="px-gutter grid grid-cols-1 gap-10 py-24 md:grid-cols-12 md:py-36">
        <h2 id="koncept" className="eyebrow text-mute md:col-span-3">
          {t.project.concept}
        </h2>
        <div className="md:col-span-9">
          <Reveal>
            <p className="text-[clamp(1.5rem,3.2vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.03em] text-balance">{project.concept[lang]}</p>
          </Reveal>
          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 md:grid-cols-4">
            <Fact label={t.project.industry}>{project.category}</Fact>
            <Fact label={t.project.type}>{t.project.typeValue}</Fact>
            <Fact label={t.project.scope}>{project.scope[lang].join(", ")}</Fact>
            <Fact label={t.project.live}>
              {project.liveUrl ? (
                <LiveLink href={project.liveUrl} t={t} className="text-lime underline-offset-4 hover:underline">
                  {new URL(project.liveUrl).hostname}
                </LiveLink>
              ) : (
                <span className="text-mute">{t.project.soon}</span>
              )}
            </Fact>
          </dl>
          {project.liveUrl && (
            <LiveLink
              href={project.liveUrl}
              t={t}
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-lime px-6 py-3.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              {t.common.viewLive}
              <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" aria-hidden="true" />
            </LiveLink>
          )}
        </div>
      </section>

      {/* First screen, full-bleed */}
      {desktopScreens[0] && <ScreenFrame project={project} screen={desktopScreens[0]} lang={lang} t={t} crop="wide" bleed />}

      {/* Design direction */}
      <section aria-labelledby="kierunek" className="px-gutter py-24 md:py-36">
        <div className="mb-14 grid grid-cols-1 gap-8 md:mb-20 md:grid-cols-12">
          <h2 id="kierunek" className="eyebrow text-mute md:col-span-3">
            {t.project.direction}
          </h2>
          <RevealLines
            as="p"
            className="display text-[11vw] md:col-span-9 md:text-[6vw]"
            lines={project.keywords[lang].map((k, i, all) =>
              i === all.length - 1 ? (
                <span key={k} className="serif-italic uppercase" style={{ color: project.theme.accent }}>
                  {k}.
                </span>
              ) : (
                `${k} —`
              ),
            )}
          />
        </div>

        <ol className="grid grid-cols-1 border-t border-line md:grid-cols-3">
          {project.direction.map((d, i) => (
            <li key={d.title.pl} className="border-b border-line py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
              <Reveal delay={i * 0.06}>
                <span className="eyebrow text-lime">0{i + 1}</span>
                <h3 className="mt-4 text-2xl font-medium tracking-tight">{d.title[lang]}</h3>
                <p className="mt-3 text-bone/70">{d.text[lang]}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <h3 className="eyebrow mb-5 text-mute">{t.project.palette}</h3>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {project.palette.map((c) => (
                <li key={c.hex}>
                  <Reveal>
                    <span className="block aspect-[3/4] rounded-[3px] ring-1 ring-white/10" style={{ background: c.hex }} />
                    <span className="mt-3 flex justify-between text-sm">
                      {c.name[lang]}
                      <span className="eyebrow text-mute">{c.hex}</span>
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="md:col-span-4">
            <h3 className="eyebrow mb-5 text-mute">{t.project.typography}</h3>
            <p className="text-xl leading-snug">{project.typography[lang]}</p>
            <p className="serif-italic mt-8 text-7xl leading-none text-bone/90">Aa</p>
          </Reveal>
        </div>
      </section>

      {/* Remaining screens */}
      {(desktopScreens.length > 1 || mobileScreens.length > 0) && (
        <section aria-label={t.project.screens} className="space-y-4 pb-24 md:space-y-6 md:pb-36">
          {desktopScreens.slice(1).map((s) => (
            <ScreenFrame key={s.label.pl} project={project} screen={s} lang={lang} t={t} crop="cover" />
          ))}
          {mobileScreens.length > 0 && (
            <div className="px-gutter grid grid-cols-2 gap-4 md:gap-6">
              {mobileScreens.map((s) => (
                <ScreenFrame key={s.label.pl} project={project} screen={s} lang={lang} t={t} crop="portrait" inline />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Live link */}
      <section aria-label={t.project.live} className="px-gutter border-t border-line py-16 md:py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <p className="max-w-md text-bone/70">{project.liveUrl ? t.project.liveText : t.project.liveSoon}</p>
          {project.liveUrl ? (
            <LiveLink
              href={project.liveUrl}
              t={t}
              className="group inline-flex items-center gap-3 rounded-full bg-lime px-6 py-4 font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              {t.common.viewLive}
              <ArrowUpRight className="size-5 transition-transform group-hover:rotate-45" aria-hidden="true" />
            </LiveLink>
          ) : (
            <span className="eyebrow inline-flex items-center gap-3 rounded-full border border-dashed border-line px-6 py-4 text-mute">
              {t.project.live} — {t.project.soon}
            </span>
          )}
        </div>
      </section>

      {/* Next case study */}
      <Link href={projectPath(lang, next.slug)} className="group relative block overflow-hidden border-t border-line">
        <div className="absolute inset-0 opacity-40 transition-[opacity,transform] duration-[1.2s] ease-out-expo group-hover:scale-[1.03] group-hover:opacity-70">
          <ProjectVisual project={next} lang={lang} crop="wide" tag={false} decorative sizes="100vw" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
        <div className="px-gutter relative flex min-h-[70svh] flex-col justify-between py-12 md:py-16">
          <div className="flex justify-between gap-4">
            <span className="eyebrow text-lime">{t.project.next}</span>
            <span className="eyebrow text-right text-bone/70">
              ({next.index}) {next.category}
            </span>
          </div>
          <div className="flex items-end justify-between gap-6">
            <p className="display text-[16vw] transition-transform duration-700 ease-out-expo group-hover:translate-x-3 md:text-[11vw]">
              {titleLines(next.name).map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
            <ArrowUpRight
              className="mb-[1vw] size-[9vw] shrink-0 text-bone transition-transform duration-700 ease-out-expo group-hover:rotate-45 group-hover:text-lime md:size-[6vw]"
              strokeWidth={1}
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </article>
  );
}

function LiveLink({ href, t, className, children }: { href: string; t: Dictionary; className: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> {t.common.newTab}</span>
    </a>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="eyebrow mb-2 text-mute">{label}</dt>
      <dd className="break-words text-sm text-bone/90">{children}</dd>
    </div>
  );
}

function ScreenFrame({
  project,
  screen,
  lang,
  t,
  crop,
  bleed,
  inline,
}: {
  project: Project;
  screen: ProjectScreen;
  lang: Locale;
  t: Dictionary;
  crop: "cover" | "wide" | "portrait";
  bleed?: boolean;
  inline?: boolean;
}) {
  const pad = inline || bleed ? "" : "px-gutter";
  return (
    <figure className={pad}>
      <Reveal y={48}>
        {screen.src ? (
          // Real screenshots render at their intrinsic aspect ratio — never cropped or stretched.
          <div className={`overflow-hidden bg-coal ${bleed ? "" : "rounded-[3px] ring-1 ring-white/10"}`}>
            <Image
              src={screen.src}
              alt={screen.alt[lang]}
              sizes={screen.kind === "mobile" ? "50vw" : bleed ? "100vw" : "(min-width: 768px) 95vw, 100vw"}
              placeholder="blur"
              className="block h-auto w-full"
            />
          </div>
        ) : (
          <div className={`relative overflow-hidden bg-coal ${screen.kind === "mobile" ? "aspect-[9/16]" : "aspect-[16/10]"} ${bleed ? "" : "rounded-[3px]"}`}>
            <div className="absolute inset-0 opacity-35">
              <ProjectVisual project={project} lang={lang} crop={crop} tag={false} decorative />
            </div>
            <div className="absolute inset-3 flex items-center justify-center rounded-[2px] border border-dashed border-white/25 md:inset-6">
              <span className="eyebrow max-w-[80%] text-center text-white/75">
                {t.project.screenPlaceholder}
                <span className="mt-1 block text-white/50">{screen.label[lang]}</span>
              </span>
            </div>
            <PlaceholderTag lang={lang} label="Placeholder" className="md:left-8 md:top-8" />
          </div>
        )}
      </Reveal>
      <figcaption className={`eyebrow mt-3 flex justify-between gap-4 text-mute ${bleed ? "px-gutter" : ""}`}>
        <span>{screen.label[lang]}</span>
        <span>{project.name}</span>
      </figcaption>
    </figure>
  );
}
