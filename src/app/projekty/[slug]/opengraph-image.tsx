import { getProject, projects } from "@/config/site";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "MIKO STUDIO — case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return ogImage({
    eyebrow: project ? `${project.index} — ${project.category.toUpperCase()}` : "CASE STUDY",
    title: project?.name ?? "MIKO STUDIO",
    footer: "Concept / demo project",
  });
}
