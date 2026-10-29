import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared Open Graph card: charcoal field, oversized type, one lime point. */
export function ogImage({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#0a0a0b",
          color: "#edeae3",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 2, color: "#8f8c85" }}>
          <span>{eyebrow}</span>
          <span style={{ display: "flex", width: 18, height: 18, borderRadius: 9, background: "#d2ff3a" }} />
        </div>
        <div style={{ display: "flex", fontSize: title.length > 12 ? 120 : 168, fontWeight: 800, letterSpacing: -6, lineHeight: 0.9 }}>
          {title.toUpperCase()}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#8f8c85", borderTop: "1px solid #2a2a2c", paddingTop: 24 }}>
          <span>MIKO STUDIO</span>
          <span>{footer}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
