import Image from "next/image";
import { ProjectArt, type ArtCrop } from "@/components/art/project-art";
import type { Project, ProjectImage } from "@/config/site";
import type { Locale } from "@/i18n/config";

type Props = {
  project: Project;
  lang: Locale;
  image?: ProjectImage;
  crop?: ArtCrop;
  sizes?: string;
  priority?: boolean;
  tag?: boolean;
  /** Decorative copies (duplicated previews) get an empty alt. */
  decorative?: boolean;
  className?: string;
  imageClassName?: string;
};

/** Real screenshot when one is configured, otherwise the labelled temporary visual. */
export function ProjectVisual({
  project,
  lang,
  image = project.cover,
  crop = "cover",
  sizes = "100vw",
  priority,
  tag = true,
  decorative,
  className,
  imageClassName = "object-cover",
}: Props) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className ?? ""}`}>
      {image.src ? (
        <Image
          src={image.src}
          alt={decorative ? "" : image.alt[lang]}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className={imageClassName}
        />
      ) : (
        <>
          <ProjectArt kind={project.art} crop={crop} />
          {tag && <PlaceholderTag lang={lang} />}
        </>
      )}
    </div>
  );
}

const placeholderLabel = { pl: "Wizualizacja tymczasowa", en: "Temporary visual" } as const;

export function PlaceholderTag({ lang, label, className }: { lang: Locale; label?: string; className?: string }) {
  return (
    <span
      className={`eyebrow pointer-events-none absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-full border border-dashed border-white/40 bg-black/45 px-3 py-1.5 text-[0.625rem] text-white/85 backdrop-blur-sm ${className ?? ""}`}
    >
      <span className="size-1.5 rounded-full bg-lime" aria-hidden="true" />
      {label ?? placeholderLabel[lang]}
    </span>
  );
}
