"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/config/site";
import { ProjectVisual } from "@/components/project/project-visual";
import { Reveal } from "@/components/ui/reveal";
import { projectPath } from "@/i18n/config";
import { useLang } from "@/i18n/lang-context";
import { EASE_OUT_EXPO, useMotionOK } from "@/lib/hooks";

const PREVIEW_W = 432;
const PREVIEW_H = 240;
/** Keeps the preview above the cursor so the hovered name stays readable. */
const LIFT = PREVIEW_H / 2 + 36;

/**
 * Editorial project index. With a precise pointer, hovering a row reveals a
 * floating preview that trails the cursor on springs, tilts with its
 * velocity and slides between projects like a film strip. Keyboard focus
 * anchors the preview next to the focused row. Touch devices get static
 * inline previews instead — nothing depends on hover.
 */
export function ProjectIndex() {
  const reduce = !useMotionOK();
  const { lang, t } = useLang();
  const [active, setActive] = useState<number | null>(null);
  const [lastActive, setLastActive] = useState(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 260, damping: 30, mass: 0.6 };
  const x = useSpring(mx, spring);
  const y = useSpring(my, spring);
  const vx = useVelocity(x);
  const rotate = useSpring(useTransform(vx, [-2400, 0, 2400], [-9, 0, 9], { clamp: true }), { stiffness: 200, damping: 25 });
  const innerX = useTransform(x, [0, 1920], [10, -10]);
  const listRef = useRef<HTMLUListElement>(null);

  const show = (i: number) => {
    setActive(i);
    setLastActive(i);
  };

  const place = (clientX: number, clientY: number, jump = false) => {
    if (reduce) return;
    mx.set(clientX);
    my.set(clientY);
    if (jump) {
      x.jump(clientX);
      y.jump(clientY);
    }
  };

  return (
    <section id="indeks" aria-labelledby="indeks-title" className="px-gutter relative py-28 md:py-40">
      <div className="mb-12 grid grid-cols-1 gap-6 md:mb-16 md:grid-cols-12">
        <p className="eyebrow text-mute md:col-span-3">{t.index.label}</p>
        <h2 id="indeks-title" className="display text-4xl md:col-span-9 md:text-6xl">
          {t.index.title[0]} <span className="serif-italic uppercase">{t.index.title[1]}</span>
        </h2>
      </div>

      <ul
        ref={listRef}
        className="group/list border-t border-line"
        onPointerLeave={() => setActive(null)}
        onPointerMove={(e) => {
          if (e.pointerType === "mouse") place(e.clientX, e.clientY - LIFT);
        }}
      >
        {projects.map((project, i) => (
          <li key={project.slug} className="border-b border-line">
            <Link
              href={projectPath(lang, project.slug)}
              className={`group relative grid grid-cols-12 items-center gap-x-4 py-6 transition-opacity duration-500 md:py-8 ${
                active !== null && active !== i ? "hover-fine:opacity-30" : ""
              }`}
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                if (active === null) place(e.clientX, e.clientY - LIFT, true);
                show(i);
              }}
              onFocus={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                show(i);
                place(r.right - PREVIEW_W / 2 - 120, r.top + r.height / 2, true);
              }}
              onBlur={() => setActive(null)}
            >
              <div className="col-span-12 mb-5 aspect-[9/5] overflow-hidden rounded-[3px] hover-fine:hidden">
                <ProjectVisual project={project} lang={lang} crop="cover" sizes="100vw" decorative />
              </div>
              <span className="eyebrow col-span-2 text-mute transition-colors group-hover:text-lime group-focus-visible:text-lime md:col-span-1">
                ({project.index})
              </span>
              <span className="display col-span-10 text-[9vw] transition-transform duration-700 ease-out-expo group-hover:translate-x-4 md:col-span-7 md:text-[5.2vw] lg:group-hover:translate-x-8">
                {project.name}
              </span>
              <span className="eyebrow col-span-10 col-start-3 mt-2 text-mute md:col-span-3 md:col-start-auto md:mt-0">{project.category}</span>
              <span className="col-span-1 hidden justify-end md:flex">
                <ArrowUpRight
                  className="size-6 text-mute transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:text-lime"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Reveal className="mt-10 max-w-xl text-sm text-mute">
        <p>{t.index.note}</p>
      </Reveal>

      {/* Floating preview — precise pointers only */}
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none fixed z-40 hidden overflow-hidden rounded-[3px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] hover-fine:block ${
          reduce ? "right-[6vw] top-1/2 -translate-y-1/2" : "left-0 top-0"
        }`}
        style={{
          width: PREVIEW_W,
          height: PREVIEW_H,
          ...(reduce ? {} : { x, y, rotate, translateX: "-50%", translateY: "-50%" }),
        }}
        initial={false}
        animate={{ opacity: active === null ? 0 : 1, scale: active === null ? 0.6 : 1 }}
        transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
      >
        <motion.div
          className="absolute inset-x-0 top-0"
          style={{ height: PREVIEW_H * projects.length }}
          initial={false}
          animate={{ y: -(active ?? lastActive) * PREVIEW_H }}
          transition={{ duration: reduce ? 0 : 0.7, ease: EASE_OUT_EXPO }}
        >
          {projects.map((project) => (
            <div key={project.slug} className="relative overflow-hidden" style={{ height: PREVIEW_H }}>
              <motion.div className="absolute inset-0 scale-[1.06]" style={reduce ? undefined : { x: innerX }}>
                <ProjectVisual project={project} lang={lang} crop="cover" sizes={`${PREVIEW_W}px`} tag={false} decorative />
              </motion.div>
              <span className="eyebrow absolute bottom-3 left-3 rounded-full bg-black/50 px-2.5 py-1 text-[0.6rem] text-white/80">
                {project.category}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
