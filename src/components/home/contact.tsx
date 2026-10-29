"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { site } from "@/config/site";
import { Reveal, RevealLines } from "@/components/ui/reveal";
import { useLang } from "@/i18n/lang-context";
import { useMotionOK } from "@/lib/hooks";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const motionOK = useMotionOK();
  const { t } = useLang();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const orb = useTransform(scrollYProgress, [0.2, 1], [0.35, 1]);
  const mailto = `mailto:${site.email}`;

  return (
    <section ref={ref} id="kontakt" aria-labelledby="kontakt-title" className="px-gutter relative overflow-hidden border-t border-line pt-28 pb-24 md:pt-44 md:pb-36">
      <p className="eyebrow mb-10 text-mute md:mb-14">{t.contact.label}</p>

      <RevealLines
        as="h2"
        id="kontakt-title"
        className="display text-[12.4vw] lg:text-[10.4vw]"
        lines={[
          t.contact.title.a,
          <>
            {t.contact.title.b} <span className="serif-italic text-[1.1em] uppercase text-lime">{t.contact.title.accent}</span>
          </>,
        ]}
      />

      <div className="mt-16 grid grid-cols-1 items-end gap-12 md:mt-24 md:grid-cols-12">
        <Reveal className="md:col-span-6 lg:col-span-5">
          <p className="text-lg text-bone/80 text-balance md:text-xl">{t.contact.lead}</p>

          <div className="mt-10 space-y-5">
            <EmailLine email={site.email} copy={t.contact.copy} copied={t.contact.copied} />
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-bone/80 hover:text-lime">
                    {s.label}
                    <span className="sr-only"> {t.common.newTab}</span>
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="flex md:col-span-5 md:col-start-8 md:justify-end">
          <motion.a
            href={mailto}
            aria-label={`${t.contact.writeLabel}: ${site.email}`}
            className="group relative flex aspect-square w-[min(70vw,22rem)] items-center justify-center rounded-full bg-lime text-ink will-change-transform"
            style={motionOK ? { scale: orb } : undefined}
          >
            <span className="flex flex-col items-center gap-2 transition-transform duration-500 ease-out-expo group-hover:scale-110">
              <ArrowUpRight className="size-10 transition-transform duration-500 ease-out-expo group-hover:rotate-45" aria-hidden="true" />
              <span className="display text-2xl">{t.contact.write}</span>
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

function EmailLine({ email, copy, copied: copiedLabel }: { email: string; copy: string; copied: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-4">
      <a href={`mailto:${email}`} className="group relative break-all text-xl font-medium tracking-tight sm:text-2xl md:text-3xl">
        {email}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-100 bg-bone/40 transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:bg-lime" />
      </a>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          } catch {
            /* clipboard unavailable — the mailto link still works */
          }
        }}
        className="eyebrow inline-flex items-center gap-2 rounded-full border border-line px-3 py-2 text-mute transition-colors hover:border-bone hover:text-bone"
      >
        {copied ? <Check className="size-3.5 text-lime" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
        <span aria-live="polite">{copied ? copiedLabel : copy}</span>
      </button>
    </div>
  );
}
