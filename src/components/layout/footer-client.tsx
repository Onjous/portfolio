"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, useSyncExternalStore } from "react";
import { ArrowUp } from "lucide-react";
import { useMotionOK } from "@/lib/hooks";

const noop = () => () => {};

/** Read on the client only, so the prerendered shell never bakes in a stale year. */
export function CurrentYear() {
  const year = useSyncExternalStore(noop, () => new Date().getFullYear(), () => null);
  return <span>{year}</span>;
}

export function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="eyebrow group flex items-center gap-2 text-mute transition-colors hover:text-bone"
    >
      {label}
      <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
    </button>
  );
}

/** Oversized wordmark whose letters drift together as the footer scrolls in. */
export function FooterWordmark({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = !useMotionOK();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const letters = text.split("");
  const mid = (letters.length - 1) / 2;

  return (
    <div ref={ref} className="pointer-events-none -mb-[0.2em] select-none overflow-hidden" aria-hidden="true">
      <p className="display flex justify-center text-[28vw] leading-[0.8] tracking-[-0.06em] text-bone">
        {letters.map((l, i) => (
          <Letter key={i} progress={scrollYProgress} offset={(i - mid) * 9} reduce={reduce}>
            {l}
          </Letter>
        ))}
      </p>
    </div>
  );
}

function Letter({ children, progress, offset, reduce }: { children: string; progress: MotionValue<number>; offset: number; reduce: boolean }) {
  const x = useTransform(progress, [0, 1], [`${offset}%`, "0%"]);
  const y = useTransform(progress, [0, 1], ["35%", "0%"]);
  return (
    <motion.span className="block" style={reduce ? undefined : { x, y }}>
      {children}
    </motion.span>
  );
}
