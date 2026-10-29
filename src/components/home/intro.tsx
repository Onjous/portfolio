"use client";

import { useEffect } from "react";

const WORD = "MIKO";

/**
 * Overlay for the opening sequence: a lime point → a seam of light →
 * "MIKO" rising out of the seam → the two halves part to reveal the hero.
 * The choreography itself is CSS (see globals.css) so it is frame-perfect
 * from first paint. This component only retires the intro state afterwards,
 * so client-side navigations back to "/" never replay it.
 */
export function Intro() {
  useEffect(() => {
    const root = document.documentElement;
    const state = root.dataset.intro;
    if (state !== "play" && state !== "lite") return;
    const total = state === "play" ? 2400 : 1600;
    const t = window.setTimeout(() => {
      root.dataset.intro = "done";
    }, Math.max(0, total - performance.now()));
    return () => window.clearTimeout(t);
  }, []);

  const letters = WORD.split("").map((l, i) => (
    <span key={i} className="intro__letter" style={{ "--i": i } as React.CSSProperties}>
      {l}
    </span>
  ));

  return (
    <div className="intro" aria-hidden="true">
      <div className="intro__panel intro__panel--top">
        <div className="intro__word display">{letters}</div>
      </div>
      <div className="intro__panel intro__panel--bottom">
        <div className="intro__word display">{letters}</div>
      </div>
      <span className="intro__line" />
      <span className="intro__dot" />
    </div>
  );
}
