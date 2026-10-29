"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/config/site";
import { ProjectVisual, PlaceholderTag } from "@/components/project/project-visual";
import { RevealLines, Reveal } from "@/components/ui/reveal";
import { useCinematic } from "@/lib/hooks";
import { titleLines } from "@/lib/utils";

/**
 * Scroll-driven project showcase.
 *
 * Natural scrolling, no pinning: each project is a tall block in normal
 * flow, and its layers are transformed from that block's own scroll
 * progress — the frame tilts up and scales into place, the image drifts
 * inside its mask, the numeral sinks behind and the detail crop floats
 * ahead. The DOM is identical on every screen; the choreography is only
 * attached on large screens without reduced motion.
 */
export function Showcase() {
  const cinematic = useCinematic();
  const listRef = useRef<HTMLOListElement>(null);
  const active = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start center", "end center"] });

  return (
    <section id="projekty" aria-labelledby="projekty-title" className="relative">
      <div className="px-gutter grid grid-cols-1 gap-8 pt-28 pb-12 md:grid-cols-12 md:pt-40 lg:pb-8">
        <p className="eyebrow text-mute md:col-span-3">(01) Wybrane projekty</p>
        <RevealLines
          as="h2"
          id="projekty-title"
          className="display text-[15vw] md:col-span-9 md:text-[9.5vw]"
          lines={[
            "Wybrane",
            <>
              <span className="serif-italic text-[1.08em] uppercase">projekty</span>
              <span className="text-lime">.</span>
            </>,
          ]}
        />
        <Reveal className="md:col-span-4 md:col-start-9" delay={0.1}>
          <p className="text-mute">
            Cztery projekty koncepcyjne — każdy z własną identyfikacją, rytmem i charakterem. To nie są realizacje dla klientów, tylko studia
            formy, w których sprawdzam, jak daleko można zaprowadzić markę.
          </p>
        </Reveal>
      </div>

      <div className="relative">
        {cinematic && <Counter active={active} progress={scrollYProgress} />}
        <ol ref={listRef}>
          {projects.map((project, i) => (
            <ShowcaseItem key={project.slug} project={project} i={i} cinematic={cinematic} active={active} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function ShowcaseItem({
  project,
  i,
  cinematic,
  active,
}: {
  project: Project;
  i: number;
  cinematic: boolean;
  active: MotionValue<number>;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const flip = i % 2 === 1;
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const stage = [0.1, 0.4, 0.6, 0.92];
  const scale = useTransform(p, stage, [0.78, 1, 1, 0.9]);
  const rotateX = useTransform(p, stage, [20, 0, 0, -9]);
  const shade = useTransform(p, [0.58, 0.92], [0, 0.65]);
  const innerY = useTransform(p, [0, 1], ["-6%", "6%"]);
  const numeralY = useTransform(p, [0, 1], ["-35%", "35%"]);
  const detailY = useTransform(p, [0, 1], ["38vh", "-34vh"]);
  const detailRotate = useTransform(p, [0, 1], flip ? [-7, 4] : [7, -4]);
  const titleX = useTransform(p, [0.08, 0.42], flip ? ["-12%", "0%"] : ["12%", "0%"]);
  const metaY = useTransform(p, [0.12, 0.42], [56, 0]);
  const metaOpacity = useTransform(p, [0.1, 0.36], [0, 1]);
  const tint = useTransform(p, [0.05, 0.4, 0.6, 0.95], [0, 1, 1, 0]);

  useMotionValueEvent(p, "change", (v) => {
    if (v > 0.3 && v < 0.7 && active.get() !== i) active.set(i);
  });

  const href = `/projekty/${project.slug}`;
  const c = cinematic;

  return (
    <li ref={ref} className="relative py-10 sm:py-14 lg:flex lg:min-h-[128vh] lg:items-center lg:py-0">
      {/* Project-tinted atmosphere */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -inset-y-[18vh] hidden opacity-50 lg:block"
        style={{
          background: `radial-gradient(ellipse 55% 45% at ${flip ? "68%" : "32%"} 50%, ${project.theme.tint}, transparent 72%)`,
          ...(c ? { opacity: tint } : {}),
        }}
      />

      <div className="px-gutter relative w-full">
        <div className="relative lg:[perspective:1800px]">
          {/* Background numeral */}
          <motion.span
            aria-hidden="true"
            className={`display text-outline pointer-events-none absolute -top-[16vw] hidden select-none text-[30vw] leading-none lg:block ${
              flip ? "-left-[1vw]" : "-right-[1vw]"
            }`}
            style={c ? { y: numeralY } : undefined}
          >
            {project.index}
          </motion.span>

          {/* Main frame */}
          <motion.div
            className={`relative aspect-[4/5] w-full overflow-hidden rounded-[3px] bg-coal will-change-transform sm:aspect-[16/10] lg:w-[min(78%,128svh)] ${
              flip ? "lg:ml-auto" : ""
            }`}
            style={c ? { scale, rotateX, transformOrigin: "50% 60%" } : undefined}
          >
            <Link href={href} tabIndex={-1} aria-hidden="true" className="group absolute inset-0 block">
              <motion.div className="absolute -inset-y-[7%] inset-x-0 will-change-transform" style={c ? { y: innerY } : undefined}>
                <div className="h-full w-full transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.035]">
                  <ProjectVisual project={project} crop="portrait" tag={false} className="sm:hidden" sizes="100vw" />
                  <ProjectVisual project={project} crop="cover" tag={false} className="hidden sm:block" sizes="(min-width: 1024px) 78vw, 100vw" />
                </div>
              </motion.div>
              <span className="eyebrow absolute right-5 top-5 hidden size-24 scale-0 items-center justify-center rounded-full bg-lime text-ink transition-transform duration-500 ease-out-expo group-hover:scale-100 hover-fine:flex">
                Zobacz
              </span>
            </Link>
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/2 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent lg:block" />
            {c && <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: shade }} />}
            {!project.cover.src && <PlaceholderTag />}
          </motion.div>

          {/* Floating detail crop */}
          <motion.div
            aria-hidden="true"
            className={`absolute top-[40%] hidden aspect-[4/5] w-[21%] overflow-hidden rounded-[3px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10 will-change-transform lg:block ${
              flip ? "left-[2%]" : "right-[2%]"
            }`}
            style={c ? { y: detailY, rotate: detailRotate } : undefined}
          >
            <ProjectVisual project={project} image={project.screens[0]} crop="detail" tag={false} sizes="21vw" />
          </motion.div>

          {/* Title */}
          <motion.h3
            className={`display pointer-events-none relative z-10 mt-6 text-[13vw] sm:text-[10vw] lg:absolute lg:-bottom-[0.3em] lg:mt-0 lg:text-[8.2vw] ${
              flip ? "lg:right-0 lg:text-right" : "lg:left-0"
            }`}
            style={c ? { x: titleX } : undefined}
          >
            {titleLines(project.name).map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.h3>
        </div>

        {/* Metadata */}
        <motion.div
          className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-4 text-sm lg:mt-[5.5vw] lg:grid-cols-12"
          style={c ? { y: metaY, opacity: metaOpacity } : undefined}
        >
          <p className="eyebrow text-lime lg:col-span-1">({project.index})</p>
          <p className="eyebrow text-right text-bone/80 lg:col-span-3 lg:text-left">{project.category}</p>
          <p className="col-span-2 max-w-sm text-bone/70 lg:col-span-4">{project.summary}</p>
          <p className="eyebrow text-mute lg:col-span-2">Projekt koncepcyjny</p>
          <div className="text-right lg:col-span-2">
            <Link href={href} className="group inline-flex items-center gap-1.5 text-bone transition-colors hover:text-lime">
              Case study
              <span className="sr-only">: {project.name}</span>
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </li>
  );
}

/** Sticky project rail in the left gutter — a quiet sense of place while scrolling. */
function Counter({ active, progress }: { active: MotionValue<number>; progress: MotionValue<number> }) {
  const [index, setIndex] = useState(0);
  useMotionValueEvent(active, "change", (v) => setIndex(v));
  const opacity = useTransform(progress, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);
  const project = projects[index];

  return (
    <div className="pointer-events-none sticky top-1/2 z-20 h-0" aria-hidden="true">
      <motion.div
        className="absolute left-[calc(var(--gutter)/2)] flex -translate-x-1/2 -translate-y-1/2 rotate-180 items-center gap-4 [writing-mode:vertical-rl]"
        style={{ opacity }}
      >
        <span className="eyebrow text-mute">{project.name}</span>
        <span className="relative h-20 w-px overflow-hidden bg-line">
          <motion.span className="absolute inset-0 origin-bottom bg-lime" style={{ scaleY: progress }} />
        </span>
        <span className="eyebrow tabular-nums text-bone">
          {project.index}
          <span className="text-mute"> / {String(projects.length).padStart(2, "0")}</span>
        </span>
      </motion.div>
    </div>
  );
}
