import { getProject, projects } from "@/config/site";
import { locales } from "@/i18n/config";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "MIKO STUDIO — case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return ogImage({
    eyebrow: project ? `${project.index} — ${project.category.toUpperCase()}` : "CASE STUDY",
    title: project?.name ?? "MIKO STUDIO",
    footer: "Concept / demo project",
  });
}
