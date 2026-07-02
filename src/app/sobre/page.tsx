import Section from "@/components/Section";
import AdBanner from "@/components/AdBanner";
import ScrollReveal from "@/components/ScrollReveal";
import { SOCIALS } from "@/lib/constants";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sobre MARKHO — Artista & Cantante",
  description:
    "Conoce la historia del artista catalán MARKHO, su evolución desde MIDEC26, su trayectoria desde 2023 y sus lanzamientos oficiales.",
};

/* ────── server sub-components (no hooks) ────── */

function PortraitCard() {
  return (
    <div className="relative w-[280px] sm:w-[320px] lg:w-[360px] aspect-[4/5] rounded-3xl overflow-hidden bg-surface border border-white/5 shadow-2xl flex items-center justify-center p-4 group">
      {/* Internal gradient shadow */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 z-10" />
      {/* Pulse background light behind the artist */}
      <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-cyan-500/10 blur-xl opacity-60 group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
      {/* Artist Image */}
      <div className="relative w-full h-full z-0 transform group-hover:scale-105 transition-transform duration-700">
        <Image
          src="/artista-pose2.png"
          alt="MARKHO Portrait"
          fill
          className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
          priority
          sizes="(max-width: 768px) 280px, 360px"
        />
      </div>
      {/* Glass title watermark at bottom */}
      <div className="absolute bottom-6 left-6 right-6 z-20 bg-surface/50 border border-white/10 backdrop-blur-md rounded-2xl p-4 text-center">
        <span className="text-[10px] font-black tracking-[0.3em] text-red-500 uppercase block mb-1">
          Cultura &amp; Arte
        </span>
        <span className="text-xl font-black text-foreground tracking-tight">
          MARKHO
        </span>
      </div>
    </div>
  );
}

function SocialBar() {
  return (
    <div className="mt-8 flex gap-3 flex-wrap justify-center">
      <a
        href={SOCIALS.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-surface hover:bg-[#1DB954] hover:text-black border border-white/5 text-foreground rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg"
        title="Spotify"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      </a>
      <a
        href={SOCIALS.youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-surface hover:bg-red-600 hover:text-white border border-white/5 text-foreground rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg"
        title="YouTube"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      </a>
      <a
        href={SOCIALS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-surface hover:bg-gradient-to-tr hover:from-yellow-600 hover:via-red-600 hover:to-purple-600 hover:text-white border border-white/5 text-foreground rounded-2xl transition-all duration-300 hover:scale-110 shadow-lg"
        title="Instagram"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </a>
    </div>
  );
}

/* ────── interactive client wrappers (all hooks live here) ────── */
import {
  ParallaxPortrait,
  Timeline,
} from "./SobreInteractive";

/* ────── page ────── */
export default function SobrePage() {
  const chapters = [
    {
      number: "01",
      title: "Origen en Santpedor",
      year: "2008",
      description:
        "Nace rodeado de una fuerte sensibilidad musical que guió sus primeros impulsos e influencias creativas.",
    },
    {
      number: "02",
      title: 'Lanzamiento de "Magia"',
      year: "2023",
      description:
        "Publica su primer track oficial como MIDEC26, dando inicio a su trayectoria y catálogo público.",
    },
    {
      number: "03",
      title: "La Transición",
      year: "Evolución",
      description:
        "Archiva álbumes y canciones antiguas para dar un giro conceptual hacia la madurez sonora y una redefinición de estilo.",
    },
    {
      number: "04",
      title: "El Presente",
      year: "Actualidad",
      description:
        "Establece su nueva era como MARKHO. Enfocado en sonido urbano de alta fidelidad, líricas complejas y producciones profesionales.",
    },
  ];

  return (
    <main className="relative min-h-screen bg-background pt-32 pb-24 overflow-hidden select-none">
      {/* Background Neon ambient glows */}
      <div className="absolute top-[10%] right-[10%] w-[350px] h-[350px] bg-red-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Decorative grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <Section id="sobre">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* LEFT SIDEBAR: Parallax Portrait & Socials */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-center">
            <ScrollReveal>
              <div className="flex justify-center lg:justify-start">
                <ParallaxPortrait>
                  <PortraitCard />
                </ParallaxPortrait>
              </div>
              <div className="flex justify-center lg:justify-start">
                <SocialBar />
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT CONTENT SCROLL: Biography, Collabs & Milestones */}
          <div className="lg:col-span-7 space-y-12 lg:space-y-20 relative pl-6 lg:pl-8 border-l border-white/5">
            {/* Section 1: The Bio Narrative */}
            <ScrollReveal>
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-black tracking-[0.4em] text-red-500 uppercase block mb-1">
                    Origen &amp; Metamorfosis
                  </span>
                  <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground leading-none">
                    DE MIDEC26 A <span className="text-red-600">MARKHO</span>
                  </h1>
                </div>

                <div className="space-y-6 text-text-secondary text-base sm:text-lg leading-relaxed font-light">
                  <p>
                    Nacido en{" "}
                    <span className="text-foreground font-medium">
                      Santpedor (Cataluña) en 2008
                    </span>
                    , la música siempre latió con fuerza en su interior. Su
                    trayectoria formal se consolidó en{" "}
                    <span className="text-foreground font-medium">2023</span> con
                    el lanzamiento de su primer track oficial{" "}
                    <strong className="text-foreground">&quot;Magia&quot;</strong>{" "}
                    bajo la firma de{" "}
                    <strong className="text-foreground">Markho</strong>.
                  </p>
                  <p>
                    Bajo esa firma inicial lanzó varios singles y álbumes para
                    experimentar y forjar su estilo. Pero la madurez artística
                    exige transformaciones. En su búsqueda de un sonido propio y
                    profesional, decidió archivar su catálogo original.
                  </p>
                  <p>
                    Ocultando esa primera etapa para renacer sin ataduras, surge{" "}
                    <strong className="text-red-500 font-bold">MARKHO</strong>. En
                    este nuevo capítulo enfocado en la excelencia de producción,
                    calidad de lírica ahora escribe su
                    presente.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Section 2: Featured Collab Card */}
            <ScrollReveal delay={0.1}>
              <div className="bg-surface/30 backdrop-blur-md rounded-3xl border border-white/5 p-6 sm:p-8 flex flex-col gap-6 shadow-2xl relative overflow-hidden group hover:border-red-600/30 transition-all duration-500">
                <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-red-600/10 rounded-full blur-[60px] pointer-events-none" />

                <div>
                  <span className="text-[10px] font-bold tracking-[0.3em] text-red-500 uppercase block mb-1">
                    Colaboración Destacada
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-foreground">
                    MöET{" "}
                    <span className="text-text-secondary text-sm font-normal block sm:inline sm:ml-2">
                      ft. El Capi
                    </span>
                  </h3>
                </div>

                {/* Embedded Video */}
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
                    className="flex-1 text-center py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl transition-all hover:scale-[1.02] text-xs uppercase tracking-wider shadow-[0_4px_12px_rgba(220,38,38,0.2)]"
                  >
                    Ver Video en YouTube
                  </a>
                  <a
                    href="https://www.youtube.com/@ElCapi-ds"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 bg-white/5 border border-white/10 text-foreground hover:bg-white/10 transition-colors text-xs font-bold uppercase tracking-wider rounded-xl"
                  >
                    Canal de El Capi
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Section 3: Scrollytelling Timeline */}
            <div className="space-y-8 relative">
              <div>
                <span className="text-[10px] font-black tracking-[0.4em] text-red-500 uppercase block mb-1">
                  Trayectoria
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-foreground">
                  CAPÍTULOS DEL VIAJE
                </h3>
              </div>

              <div className="space-y-6 relative pl-8">
                {/* Animated vertical line */}
                <Timeline chapters={chapters} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <AdBanner slot="0000000000" />
        </div>
      </Section>
    </main>
  );
}
