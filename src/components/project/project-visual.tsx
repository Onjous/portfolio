import Image from "next/image";
import { ProjectArt, type ArtCrop } from "@/components/art/project-art";
import type { Project, ProjectImage } from "@/config/site";

type Props = {
  project: Project;
  image?: ProjectImage;
  crop?: ArtCrop;
  sizes?: string;
  priority?: boolean;
  tag?: boolean;
  className?: string;
};

/** Real screenshot when one is configured, otherwise the labelled temporary visual. */
export function ProjectVisual({ project, image = project.cover, crop = "cover", sizes = "100vw", priority, tag = true, className }: Props) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className ?? ""}`}>
      {image.src ? (
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <>
          <ProjectArt kind={project.art} crop={crop} />
          {tag && <PlaceholderTag />}
        </>
      )}
    </div>
  );
}

export function PlaceholderTag({ label = "Wizualizacja tymczasowa", className }: { label?: string; className?: string }) {
  return (
    <span
      className={`eyebrow pointer-events-none absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-full border border-dashed border-white/40 bg-black/45 px-3 py-1.5 text-[0.625rem] text-white/85 backdrop-blur-sm ${className ?? ""}`}
      title="Do podmiany na zrzut ekranu projektu"
    >
      <span className="size-1.5 rounded-full bg-lime" aria-hidden="true" />
      {label}
    </span>
  );
}
