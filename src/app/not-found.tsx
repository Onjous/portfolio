import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="px-gutter flex min-h-svh flex-col justify-end pb-16 pt-32">
      <p className="eyebrow mb-6 text-lime">Błąd 404</p>
      <h1 className="display text-[18vw] md:text-[13vw]">
        Nie ma
        <span className="serif-italic block uppercase">takiej strony</span>
      </h1>
      <Link href="/" className="group mt-12 inline-flex items-center gap-2 self-start rounded-full border border-bone/25 px-5 py-3 text-sm hover:border-lime hover:text-lime">
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
        Wróć na stronę główną
      </Link>
    </section>
  );
}
