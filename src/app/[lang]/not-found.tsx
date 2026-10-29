"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { homePath } from "@/i18n/config";
import { useLang } from "@/i18n/lang-context";

export default function NotFound() {
  const { lang, t } = useLang();
  return (
    <section className="px-gutter flex min-h-svh flex-col justify-end pb-16 pt-32">
      <p className="eyebrow mb-6 text-lime">{t.notFound.code}</p>
      <h1 className="display text-[18vw] md:text-[13vw]">
        {t.notFound.title[0]}
        <span className="serif-italic block uppercase">{t.notFound.title[1]}</span>
      </h1>
      <Link
        href={homePath(lang)}
        className="group mt-12 inline-flex items-center gap-2 self-start rounded-full border border-bone/25 px-5 py-3 text-sm hover:border-lime hover:text-lime"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
        {t.notFound.back}
      </Link>
    </section>
  );
}
