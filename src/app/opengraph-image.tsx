import { ogImage, ogSize } from "@/lib/og";

export const alt = "MIKO STUDIO — Digital Design & Development.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "INDEPENDENT STUDIO", title: "Digital experiences. Crafted.", footer: "Digital Design & Development." });
}
