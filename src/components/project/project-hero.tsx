"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { projects, type Project } from "@/config/site";
import { ProjectVisual, PlaceholderTag } from "@/components/project/project-visual";
import { homePath } from "@/i18n/config";
import { useLang } from "@/i18n/lang-context";
import { useMotionOK } from "@/lib/hooks";
import { titleLines } from "@/lib/utils";

export function ProjectHero({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const motionOK = useMotionOK();
  const { lang, t } = useLang();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const real = !!project.cover.src;

  return (
    <section ref={ref} aria-labelledby="project-title" className="relative flex min-h-svh flex-col overflow-hidden">
      <motion.div className="absolute inset-0 will-change-transform" style={motionOK ? { y: artY } : undefined}>
        <div className="settle-in h-full w-full">
          {real ? (
            <ProjectVisual project={project} lang={lang} priority decorative sizes="100vw" />
          ) : (
            <>
              <ProjectVisual project={project} lang={lang} crop="cover" priority tag={false} className="hidden sm:block" />
              <ProjectVisual project={project} lang={lang} crop="portrait" priority tag={false} className="sm:hidden" />
            </>
          )}
        </div>
      </motion.div>
      <div aria-hidden="true" className={`absolute inset-0 bg-gradient-to-b ${real ? "from-ink from-[8%] via-ink/55 to-ink" : "from-ink/70 via-ink/10 to-ink"}`} />
      {!real && <PlaceholderTag lang={lang} className="left-[var(--gutter)] top-24 md:top-28" />}

      <div className="px-gutter relative mt-auto pb-10 pt-40 md:pb-14">
        <Link href={homePath(lang, "indeks")} className="eyebrow group mb-10 inline-flex items-center gap-2 text-bone/80 hover:text-lime">
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          {t.project.back}
        </Link>
        <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="eyebrow text-lime">
            ({project.index} / {String(projects.length).padStart(2, "0")})
          </span>
          <span className="eyebrow text-bone/85">{project.category}</span>
          <span className="eyebrow rounded-full border border-lime/60 bg-ink/40 px-3 py-1 text-lime">{t.common.conceptDemo}</span>
        </div>
        <motion.h1 id="project-title" className="display text-[17vw] md:text-[12.5vw]" style={motionOK ? { y: titleY } : undefined}>
          {titleLines(project.name).map((line, i) => (
            <span key={line} className="-my-[0.14em] block overflow-hidden py-[0.14em]">
              <span data-page-line className="block" style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}>
                {line}
              </span>
            </span>
          ))}
        </motion.h1>
      </div>
    </section>
  );
}
