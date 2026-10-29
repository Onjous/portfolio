"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { projects, site } from "@/config/site";
import { useMotionOK } from "@/lib/hooks";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = !useMotionOK();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["0%", "9%"]);
  const x3 = useTransform(scrollYProgress, [0, 1], ["0%", "-7%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section ref={ref} id="start" aria-labelledby="hero-title" className="px-gutter relative flex min-h-svh flex-col pt-24 pb-6 md:pt-28">
      <Marks />

      <div data-hero-fade className="grid grid-cols-2 gap-6 md:grid-cols-12" style={{ "--d": "0.05s" } as React.CSSProperties}>
        <p className="eyebrow text-mute md:col-span-3">
          <span className="text-lime">●</span>&nbsp; Niezależne studio
        </p>
        <p className="eyebrow hidden text-mute md:col-span-5 md:col-start-5 md:block">
          Projektowanie i development stron internetowych — od pierwszej rozmowy po publikację.
        </p>
        <p className="eyebrow text-right text-mute md:col-span-3 md:col-start-10">
          Projekty 01—{String(projects.length).padStart(2, "0")}
        </p>
      </div>

      <motion.div className="@container relative mt-auto pt-16" style={reduce ? undefined : { opacity: fade }}>
        <h1 id="hero-title" className="display text-[10.6cqi]">
          <Line x={x1} reduce={reduce} delay={0}>
            Digital
          </Line>
          <Line x={x2} reduce={reduce} delay={0.07}>
            Experiences.
          </Line>
          <Line x={x3} reduce={reduce} delay={0.14} className="text-right">
            <span className="serif-italic mr-[-0.04em] inline-block text-[1.12em] uppercase leading-[0.8] tracking-[-0.03em]">
              Crafted<span className="text-lime">.</span>
            </span>
          </Line>
        </h1>

        <div
          data-hero-fade
          className="mt-10 max-w-md lg:absolute lg:bottom-[0.6cqi] lg:left-0 lg:mt-0 lg:w-[36%] lg:max-w-none"
          style={{ "--d": "0.15s" } as React.CSSProperties}
        >
          <p className="text-lg leading-snug text-bone/85 text-balance md:text-xl">
            Projektuję i tworzę strony internetowe, które wyróżniają marki.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#projekty"
              className="group inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              Zobacz projekty
              <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
            </Link>
            <Link
              href="#kontakt"
              className="group inline-flex items-center gap-2 rounded-full border border-bone/25 px-5 py-3 text-sm transition-colors duration-300 hover:border-bone hover:bg-bone hover:text-ink"
            >
              Porozmawiajmy
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </motion.div>

      <div data-hero-fade className="mt-10 flex items-end justify-between border-t border-line pt-4 md:mt-14" style={{ "--d": "0.3s" } as React.CSSProperties}>
        <a href="#projekty" className="eyebrow group flex items-center gap-3 text-mute transition-colors hover:text-bone">
          <span className="relative block h-8 w-px overflow-hidden bg-line" aria-hidden="true">
            <span className="scroll-cue absolute inset-0 bg-lime" />
          </span>
          Przewiń
        </a>
        <p className="eyebrow hidden text-mute sm:block">{site.tagline}</p>
        <p className="eyebrow text-mute">{site.name}</p>
      </div>
    </section>
  );
}

function Line({
  children,
  x,
  reduce,
  delay,
  className,
}: {
  children: React.ReactNode;
  x: MotionValue<string>;
  reduce: boolean;
  delay: number;
  className?: string;
}) {
  return (
    <motion.span className={`-my-[0.14em] block overflow-hidden py-[0.14em] ${className ?? ""}`} style={reduce ? undefined : { x }}>
      <span data-hero-line className="block" style={{ "--d": `${delay}s` } as React.CSSProperties}>
        {children}
      </span>
    </motion.span>
  );
}

/** Registration marks — a quiet nod to technical drawings. */
function Marks() {
  const mark = "pointer-events-none absolute size-3 text-bone/30";
  return (
    <div aria-hidden="true" data-hero-fade>
      {["left-[var(--gutter)] bottom-20", "right-[var(--gutter)] bottom-20"].map((pos) => (
        <svg key={pos} viewBox="0 0 12 12" className={`${mark} ${pos} hidden md:block`}>
          <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1" />
        </svg>
      ))}
    </div>
  );
}
