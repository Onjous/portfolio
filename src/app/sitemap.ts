import type { MetadataRoute } from "next";
import { projects, site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({ url: `${site.url}/projekty/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
