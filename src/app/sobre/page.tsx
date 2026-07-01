import Section from "@/components/Section";
import AdBanner from "@/components/AdBanner";
import ScrollReveal from "@/components/ScrollReveal";
import { SOCIALS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Midec26 — Artista & Cantante",
  description: "Conoce a Midec26, artista y cantante. Escucha su música en Spotify y síguelo en redes sociales.",
};

export default function SobrePage() {
  return (
    <main className="pt-24 pb-20">
      <Section id="sobre">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <ScrollReveal>
            <div>
              <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-foreground mb-4">
                De Midec26 a MARKHO
              </h1>
              <div className="w-16 h-1 bg-red-600 rounded-full mb-8 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />

              <div className="space-y-4 text-text-secondary leading-relaxed text-sm sm:text-base">
                <p>
                  Nacido en Santpedor (Cataluña) en 2008, la vida de este artista siempre estuvo guiada por una profunda afinidad y pasión por la música. Su andadura musical comenzó a tomar forma oficial en 2023, con el lanzamiento de su primer sencillo titulado <strong className="text-foreground">"Magia"</strong> bajo el nombre de <strong className="text-foreground">Midec26</strong>.
                </p>
                <p>
                  Tras la gran acogida de su debut, Midec26 se sumergió por completo en la composición, publicando numerosos temas y álbumes que le sirvieron para experimentar, pulir su sonido y consolidar su técnica. Sin embargo, en la búsqueda constante de la madurez y la evolución sonora, tomó la audaz decisión de archivar esa etapa inicial.
                </p>
                <p>
                  Ocultando sus primeros trabajos para dar paso a una era completamente renovada, nació su identidad actual: <strong className="text-red-500 font-bold">MARKHO</strong>. En esta nueva etapa, el artista se presenta con una propuesta mucho más sólida, madura y profesional, caracterizada por canciones sumamente cuidadas, líricas maduras y una producción sonora de máxima calidad.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={SOCIALS.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-[#1DB954] text-black font-bold rounded-full hover:bg-[#1ed760] transition-colors text-sm"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  Spotify
                </a>
                <a
                  href={SOCIALS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors text-sm"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  YouTube
                </a>
                <a
                  href={SOCIALS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 border border-white/10 bg-white/5 text-foreground font-bold rounded-full hover:border-red-600 hover:text-red-500 transition-all text-sm"
                >
                  Instagram
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Featured Collaboration Card */}
          <ScrollReveal direction="right" delay={0.15}>
            <div className="flex justify-center w-full">
              <div className="w-full max-w-lg bg-surface rounded-3xl border border-white/5 p-6 sm:p-8 flex flex-col gap-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />
                
                <div>
                  <span className="text-xs font-bold tracking-[0.2em] text-red-500 uppercase">
                    Colaboración Destacada
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-foreground mt-1">
                    MöET <span className="text-text-secondary text-lg font-medium">ft. El Capi</span>
                  </h3>
                </div>

                {/* Responsive YouTube Embed */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black shadow-lg">
                  <iframe
                    src="https://www.youtube.com/embed/PKRYA2fHRZ8"
                    title="MARKHO ft. El Capi - MöET"
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://www.youtube.com/watch?v=PKRYA2fHRZ8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors text-sm"
                  >
                    Ver en YouTube
                  </a>
                  <a
                    href="https://www.youtube.com/@ElCapi-ds"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 bg-white/5 border border-white/10 text-foreground font-semibold rounded-xl hover:bg-white/10 transition-colors text-sm"
                  >
                    Canal de El Capi
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <AdBanner slot="0000000000" />
      </Section>
    </main>
  );
}
