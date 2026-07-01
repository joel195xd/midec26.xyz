import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Music from "@/components/Music";
import Merch from "@/components/Merch";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Music />
        <Merch />
        <About />
      </main>
      <Footer />
    </>
  );
}
