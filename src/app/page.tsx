import Hero from "@/components/Hero";
import AdBanner from "@/components/AdBanner";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <AdBanner slot="0000000000" />
    </main>
  );
}
