import { Intro } from "@/components/home/intro";
import { Hero } from "@/components/home/hero";
import { Showcase } from "@/components/home/showcase";
import { ProjectIndex } from "@/components/home/project-index";
import { About } from "@/components/home/about";
import { Services } from "@/components/home/services";
import { Process } from "@/components/home/process";
import { Contact } from "@/components/home/contact";
import { site } from "@/config/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    founder: { "@type": "Person", name: site.founder },
    ...(site.email ? { email: site.email } : {}),
    ...(site.socials.length ? { sameAs: site.socials.map((s) => s.href) } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Intro />
      <Hero />
      <Showcase />
      <ProjectIndex />
      <About />
      <Services />
      <Process />
      <Contact />
    </>
  );
}
