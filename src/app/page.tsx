import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import AdBanner from "@/components/AdBanner";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main className="flex-1">
      <ScrollReveal>
        <Hero />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <Gallery />
      </ScrollReveal>
      <AdBanner slot="0000000000" />
    </main>
  );
}
