"use client";

import { animate } from "motion/react";
import { useRef, type ElementType, type ReactNode } from "react";
import { EASE_OUT_EXPO, useIsoLayoutEffect } from "@/lib/hooks";

/**
 * Scroll reveal that can never leave content invisible.
 *
 * Content is rendered visible on the server. After hydration, only elements
 * that are still below the fold are hidden (off-screen, so nothing flickers)
 * and then revealed once they enter the viewport. Content above or inside
 * the viewport, reduced-motion users and no-JS visitors always see it as-is.
 */
function useArmedReveal(
  ref: React.RefObject<HTMLElement | null>,
  targets: () => HTMLElement[],
  hidden: Record<string, number | string>,
  shown: Record<string, number | string>,
  delay: number,
  stagger: number,
) {
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;

    const nodes = targets();
    nodes.forEach((n) => animate(n, hidden, { duration: 0 }));

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        nodes.forEach((n, i) =>
          animate(n, shown, { duration: 1, ease: EASE_OUT_EXPO, delay: delay + i * stagger }),
        );
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      nodes.forEach((n) => animate(n, shown, { duration: 0 }));
    };
  }, []);
}

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({ children, as: Tag = "div", className, delay = 0, y = 32 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  useArmedReveal(
    ref,
    () => (ref.current ? [ref.current] : []),
    { opacity: 0, y },
    { opacity: 1, y: 0 },
    delay,
    0,
  );
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

type RevealLinesProps = {
  lines: ReactNode[];
  id?: string;
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
};

/** Masked line-by-line headline reveal. */
export function RevealLines({ lines, id, as: Tag = "h2", className, lineClassName, delay = 0 }: RevealLinesProps) {
  const ref = useRef<HTMLElement>(null);
  useArmedReveal(
    ref,
    () => Array.from(ref.current?.querySelectorAll<HTMLElement>("[data-line]") ?? []),
    { y: "128%" },
    { y: "0%" },
    delay,
    0.08,
  );
  return (
    <Tag ref={ref} id={id} className={className}>
      {lines.map((line, i) => (
        <span key={i} className={`-my-[0.14em] block overflow-hidden py-[0.14em] ${lineClassName ?? ""}`}>
          <span data-line className="block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
