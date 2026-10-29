import { notFound } from "next/navigation";
import { Intro } from "@/components/home/intro";
import { Hero } from "@/components/home/hero";
import { Showcase } from "@/components/home/showcase";
import { ProjectIndex } from "@/components/home/project-index";
import { About } from "@/components/home/about";
import { Services } from "@/components/home/services";
import { Process } from "@/components/home/process";
import { Contact } from "@/components/home/contact";
import { site } from "@/config/site";
import { hasLocale, homePath } from "@/i18n/config";
import { dictionary } from "@/i18n/dictionary";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    slogan: site.tagline,
    description: dictionary[lang].meta.description,
    url: new URL(homePath(lang), site.url).toString(),
    founder: { "@type": "Person", name: site.founder },
    email: site.email,
    sameAs: site.socials.map((s) => s.href),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Intro />
      <Hero />
      <Showcase />
      <ProjectIndex />
      <About lang={lang} />
      <Services lang={lang} />
      <Process />
      <Contact />
    </>
  );
}
