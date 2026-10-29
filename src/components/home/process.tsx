"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal, RevealLines } from "@/components/ui/reveal";
import { useLang } from "@/i18n/lang-context";
import { useMotionOK } from "@/lib/hooks";

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const motionOK = useMotionOK();
  const { t } = useLang();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="proces" aria-labelledby="proces-title" className="px-gutter border-t border-line py-28 md:py-44">
      <div className="mb-16 grid grid-cols-1 gap-8 md:mb-28 md:grid-cols-12">
        <p className="eyebrow text-mute md:col-span-3">{t.process.label}</p>
        <RevealLines as="h2" id="proces-title" className="display text-[12vw] md:col-span-9 md:text-[7vw]" lines={t.process.title} />
        <Reveal className="text-bone/70 md:col-span-4 md:col-start-9" delay={0.1}>
          <p>{t.process.intro}</p>
        </Reveal>
      </div>

      <ol ref={ref} className="relative grid grid-cols-1 gap-y-14 pl-8 lg:grid-cols-4 lg:gap-x-8 lg:pl-0 lg:pt-12">
        {/* Progress line: vertical on mobile, horizontal on desktop */}
        <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-line lg:bottom-auto lg:right-0 lg:h-px lg:w-auto" />
        <motion.span
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-px origin-top bg-lime lg:hidden"
          style={motionOK ? { scaleY: draw } : undefined}
        />
        <motion.span
          aria-hidden="true"
          className="absolute left-0 right-0 top-0 hidden h-px origin-left bg-lime lg:block"
          style={motionOK ? { scaleX: draw } : undefined}
        />

        {t.process.steps.map((step, i) => (
          <li key={step.title} className="relative lg:[margin-top:var(--offset)]" style={{ "--offset": `${i * 4.5}rem` } as React.CSSProperties}>
            <span aria-hidden="true" className="absolute -left-8 top-2 size-2 -translate-x-1/2 rounded-full bg-lime lg:top-[calc(-3rem-var(--offset))] lg:left-0 lg:-translate-y-1/2 lg:translate-x-0" />
            <Reveal delay={i * 0.08}>
              <span className="display text-outline block text-[22vw] leading-[0.8] lg:text-[8vw]">0{i + 1}</span>
              <h3 className="display -mt-[0.3em] text-[clamp(1.5rem,7.6vw,2.25rem)] lg:text-[2.2vw]">{step.title}</h3>
              <p className="mt-5 max-w-sm text-bone/75">{step.text}</p>
              <p className="eyebrow mt-6 text-lime">→ {step.outcome}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
