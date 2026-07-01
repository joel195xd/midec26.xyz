import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import AdBanner from "@/components/AdBanner";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Gallery />
      <AdBanner slot="0000000000" />
    </main>
  );
}
