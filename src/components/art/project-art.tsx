import { useId } from "react";
import type { ProjectArtKind } from "@/config/site";

/**
 * Temporary art-directed visuals used until real screenshots are added in
 * src/config/site.ts. They are abstract compositions — deliberately NOT fake
 * website screenshots — and every usage is labelled as a placeholder.
 *
 * Each scene is drawn once on a 1600×1000 canvas; `crop` picks a viewBox,
 * so the same composition can be framed as a wide cover, a tight detail or
 * a portrait without extra assets.
 */

export type ArtCrop = "cover" | "detail" | "portrait" | "wide";

const CROPS: Record<ProjectArtKind, Record<ArtCrop, string>> = {
  atelier: { cover: "0 0 1600 1000", detail: "880 300 560 560", portrait: "640 0 800 1000", wide: "0 300 1600 560" },
  brut: { cover: "0 0 1600 1000", detail: "1040 60 520 520", portrait: "760 0 800 1000", wide: "0 380 1600 560" },
  coffee: { cover: "0 0 1600 1000", detail: "820 200 520 520", portrait: "620 0 800 1000", wide: "0 220 1600 560" },
  aether: { cover: "0 0 1600 1000", detail: "560 250 500 500", portrait: "400 0 800 1000", wide: "0 220 1600 560" },
};

type Props = {
  kind: ProjectArtKind;
  crop?: ArtCrop;
  className?: string;
};

export function ProjectArt({ kind, crop = "cover", className }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const Scene = SCENES[kind];
  return (
    <svg
      viewBox={CROPS[kind][crop]}
      preserveAspectRatio="xMidYMid slice"
      className={`block h-full w-full ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
    >
      <Scene id={(name: string) => `${uid}-${name}`} />
    </svg>
  );
}

type SceneProps = { id: (name: string) => string };

const display = { fontFamily: "var(--font-archivo)", fontStretch: "125%", fontWeight: 800 } as const;
const mono = { fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em" } as const;
const serif = { fontFamily: "var(--font-instrument)", fontStyle: "italic" } as const;

function AtelierScene({ id }: SceneProps) {
  const body =
    "M-80 760 C 180 735 380 560 720 505 C 980 462 1180 470 1340 575 C 1440 640 1560 662 1700 668 L1700 1000 L-80 1000 Z";
  const ridge = "M-80 760 C 180 735 380 560 720 505 C 980 462 1180 470 1340 575 C 1440 640 1560 662 1700 668";
  return (
    <>
      <defs>
        <linearGradient id={id("bg")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14181d" />
          <stop offset="0.55" stopColor="#0b0d10" />
          <stop offset="1" stopColor="#060708" />
        </linearGradient>
        <radialGradient id={id("spot")} cx="1080" cy="250" r="760" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#d6e1ec" stopOpacity="0.28" />
          <stop offset="0.45" stopColor="#7f95aa" stopOpacity="0.08" />
          <stop offset="1" stopColor="#7f95aa" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("paint")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b3138" />
          <stop offset="0.18" stopColor="#14181c" />
          <stop offset="0.6" stopColor="#090b0d" />
          <stop offset="1" stopColor="#050607" />
        </linearGradient>
        <linearGradient id={id("edge")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.35" stopColor="#c9d3dc" stopOpacity="0.35" />
          <stop offset="0.58" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="0.72" stopColor="#9fb4c7" stopOpacity="0.6" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("streak")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#e6eef6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={id("clip")}>
          <path d={body} />
        </clipPath>
      </defs>
      <rect width="1600" height="1000" fill={`url(#${id("bg")})`} />
      <rect width="1600" height="1000" fill={`url(#${id("spot")})`} />
      <text x="60" y="330" fontSize="300" fill="none" stroke="#e8ecef" strokeOpacity="0.09" strokeWidth="1.5" style={display}>
        ATELIER
      </text>
      <path d={body} fill={`url(#${id("paint")})`} />
      <g clipPath={`url(#${id("clip")})`}>
        <rect x="180" y="585" width="1100" height="3" fill={`url(#${id("streak")})`} opacity="0.7" />
        <rect x="520" y="640" width="900" height="1.5" fill={`url(#${id("streak")})`} opacity="0.5" />
        <rect x="-40" y="760" width="1200" height="2" fill={`url(#${id("streak")})`} opacity="0.35" />
        <rect x="760" y="820" width="900" height="1" fill={`url(#${id("streak")})`} opacity="0.4" />
        <ellipse cx="460" cy="960" rx="190" ry="190" fill="none" stroke="#c9d3dc" strokeOpacity="0.08" strokeWidth="2" />
        <ellipse cx="1310" cy="960" rx="190" ry="190" fill="none" stroke="#c9d3dc" strokeOpacity="0.08" strokeWidth="2" />
      </g>
      <path d={ridge} fill="none" stroke={`url(#${id("edge")})`} strokeWidth="2.5" />
      <path d={ridge} transform="translate(0 34)" fill="none" stroke={`url(#${id("edge")})`} strokeWidth="1" opacity="0.35" />
      <g opacity="0.5" stroke="#c9d3dc">
        {Array.from({ length: 41 }, (_, i) => (
          <line key={i} x1={80 + i * 36} x2={80 + i * 36} y1="940" y2={i % 5 === 0 ? 922 : 932} strokeWidth="1" />
        ))}
      </g>
      <text x="80" y="905" fontSize="15" fill="#c9d3dc" fillOpacity="0.6" style={mono}>
        PRECYZJA · REFLEKS · DETAL
      </text>
      <text x="1520" y="905" textAnchor="end" fontSize="15" fill="#c9d3dc" fillOpacity="0.6" style={mono}>
        AA / 01
      </text>
    </>
  );
}

function BrutScene({ id }: SceneProps) {
  return (
    <>
      <defs>
        <linearGradient id={id("bg")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e1ddd4" />
          <stop offset="1" stopColor="#c9c3b8" />
        </linearGradient>
        <pattern id={id("stripes")} width="44" height="44" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <rect width="44" height="44" fill="#f2eee6" />
          <rect width="20" height="44" fill="#111111" />
        </pattern>
        <radialGradient id={id("shade")} cx="0.3" cy="0.2" r="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.18" />
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill={`url(#${id("bg")})`} />
      <g stroke="#111" strokeOpacity="0.12" strokeWidth="1">
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1={i * 200 + 200} x2={i * 200 + 200} y1="0" y2="1000" />
        ))}
        <line x1="0" x2="1600" y1="120" y2="120" />
      </g>
      <rect x="1180" y="120" width="300" height="430" fill="#e2401c" />
      <rect x="1080" y="0" width="58" height="1000" fill={`url(#${id("stripes")})`} />
      <text x="-30" y="985" fontSize="640" fill="#111111" style={{ ...display, fontWeight: 900, letterSpacing: "-0.06em" }}>
        BRUT
      </text>
      <text x="1200" y="530" fontSize="17" fill="#111" style={mono}>
        CIĘCIE / BRODA
      </text>
      <text x="40" y="80" fontSize="17" fill="#111" style={mono}>
        02 — BARBERSHOP
      </text>
      <text x="1560" y="80" textAnchor="end" fontSize="17" fill="#111" style={mono}>
        BEZ OZDOBNIKÓW
      </text>
      <rect width="1600" height="1000" fill={`url(#${id("shade")})`} />
    </>
  );
}

function CoffeeScene({ id }: SceneProps) {
  return (
    <>
      <defs>
        <radialGradient id={id("bg")} cx="0.62" cy="0.45" r="0.9">
          <stop offset="0" stopColor="#f6eddf" />
          <stop offset="1" stopColor="#e2d2b9" />
        </radialGradient>
        <radialGradient id={id("shadow")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.7" stopColor="#5a3a1e" stopOpacity="0.28" />
          <stop offset="1" stopColor="#5a3a1e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("coffee")} cx="0.42" cy="0.4" r="0.65">
          <stop offset="0" stopColor="#d9a26a" />
          <stop offset="0.35" stopColor="#a8652f" />
          <stop offset="0.75" stopColor="#5c2f15" />
          <stop offset="1" stopColor="#2a1408" />
        </radialGradient>
        <radialGradient id={id("bun")} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#e3b07a" />
          <stop offset="0.6" stopColor="#b5652b" />
          <stop offset="1" stopColor="#7a3d16" />
        </radialGradient>
        <linearGradient id={id("rim")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e9dcc8" />
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill={`url(#${id("bg")})`} />
      <circle cx="300" cy="1060" r="420" fill={`url(#${id("shadow")})`} />
      <circle cx="285" cy="1030" r="380" fill={`url(#${id("bun")})`} />
      <g fill="none" stroke="#f3d9b5" strokeOpacity="0.55" strokeWidth="10" strokeLinecap="round">
        <path d="M120 860 C 220 780 360 760 470 800" />
        <path d="M90 960 C 210 870 380 850 520 900" />
      </g>
      <text x="470" y="640" fontSize="560" fill="#2a1a10" style={serif}>
        &amp;
      </text>
      <circle cx="1100" cy="520" r="380" fill={`url(#${id("shadow")})`} transform="translate(26 30)" />
      <circle cx="1100" cy="520" r="330" fill="#fbf5ea" />
      <circle cx="1100" cy="520" r="330" fill="none" stroke="#d9c7aa" strokeWidth="2" />
      <rect x="1330" y="488" width="150" height="64" rx="32" fill={`url(#${id("rim")})`} stroke="#d9c7aa" strokeWidth="2" />
      <circle cx="1100" cy="520" r="225" fill={`url(#${id("rim")})`} stroke="#d9c7aa" strokeWidth="2" />
      <circle cx="1100" cy="520" r="188" fill={`url(#${id("coffee")})`} />
      <g fill="none" stroke="#f7e4c8" strokeLinecap="round">
        <path d="M1035 470 C 1060 420 1140 420 1165 470 C 1185 515 1130 560 1100 600 C 1070 560 1015 515 1035 470 Z" strokeWidth="5" strokeOpacity="0.75" />
        <path d="M1060 478 C 1075 450 1125 450 1140 478" strokeWidth="4" strokeOpacity="0.55" />
        <path d="M1100 600 L 1100 650" strokeWidth="4" strokeOpacity="0.6" />
      </g>
      <text x="1560" y="960" textAnchor="end" fontSize="17" fill="#2a1a10" fillOpacity="0.75" style={mono}>
        COFFEE — BAKERY
      </text>
      <text x="1560" y="70" textAnchor="end" fontSize="17" fill="#2a1a10" fillOpacity="0.75" style={mono}>
        07:00 — 18:00
      </text>
    </>
  );
}

function AetherScene({ id }: SceneProps) {
  return (
    <>
      <defs>
        <radialGradient id={id("bg")} cx="800" cy="500" r="900" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0d1424" />
          <stop offset="0.6" stopColor="#06080e" />
          <stop offset="1" stopColor="#030407" />
        </radialGradient>
        <radialGradient id={id("glow")} cx="800" cy="500" r="560" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8fd0ff" stopOpacity="0.35" />
          <stop offset="0.5" stopColor="#4a7dbb" stopOpacity="0.08" />
          <stop offset="1" stopColor="#4a7dbb" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("titan")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dfe7f2" />
          <stop offset="0.25" stopColor="#6b7686" />
          <stop offset="0.5" stopColor="#c9d3df" />
          <stop offset="0.75" stopColor="#2a303a" />
          <stop offset="1" stopColor="#8e99a8" />
        </linearGradient>
        <radialGradient id={id("cap")} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#f2f6fb" />
          <stop offset="0.5" stopColor="#8e99a8" />
          <stop offset="1" stopColor="#1d222b" />
        </radialGradient>
        <pattern id={id("mesh")} width="11" height="11" patternUnits="userSpaceOnUse">
          <circle cx="5.5" cy="5.5" r="1.6" fill="#dfe7f2" fillOpacity="0.16" />
        </pattern>
      </defs>
      <rect width="1600" height="1000" fill={`url(#${id("bg")})`} />
      <rect width="1600" height="1000" fill={`url(#${id("glow")})`} />
      <g fill="none" stroke="#dfe7f2">
        {Array.from({ length: 9 }, (_, i) => (
          <circle key={i} cx="800" cy="500" r={290 + i * 72} strokeOpacity={0.12 - i * 0.012} strokeWidth="1" />
        ))}
      </g>
      <line x1="0" x2="1600" y1="500" y2="500" stroke="#dfe7f2" strokeOpacity="0.1" />
      <circle cx="800" cy="500" r="242" fill={`url(#${id("titan")})`} />
      <circle cx="800" cy="500" r="214" fill="#080b11" />
      <circle cx="800" cy="500" r="196" fill={`url(#${id("mesh")})`} />
      <circle cx="800" cy="500" r="196" fill="none" stroke="#8fd0ff" strokeOpacity="0.25" />
      <circle cx="800" cy="500" r="52" fill={`url(#${id("cap")})`} />
      <path d="M 610 370 A 230 230 0 0 1 760 272" fill="none" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="3" strokeLinecap="round" />
      <text x="60" y="488" fontSize="16" fill="#dfe7f2" fillOpacity="0.6" style={mono}>
        AETHER ONE
      </text>
      <text x="1540" y="488" textAnchor="end" fontSize="16" fill="#dfe7f2" fillOpacity="0.6" style={mono}>
        04 — AUDIO
      </text>
      <text x="800" y="930" textAnchor="middle" fontSize="16" fill="#8fd0ff" fillOpacity="0.7" style={mono}>
        CISZA · REZONANS · OBIEKT
      </text>
    </>
  );
}

const SCENES: Record<ProjectArtKind, (p: SceneProps) => React.ReactElement> = {
  atelier: AtelierScene,
  brut: BrutScene,
  coffee: CoffeeScene,
  aether: AetherScene,
};
