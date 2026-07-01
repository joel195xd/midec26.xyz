import Section from "@/components/Section";
import AdBanner from "@/components/AdBanner";
import ScrollReveal from "@/components/ScrollReveal";
import { SOCIALS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre MARKHO — Artista & Cantante",
  description: "Conoce la historia del artista catalán MARKHO, su evolución desde MIDEC26, su trayectoria desde 2023 y sus lanzamientos oficiales.",
};

const TIMELINE_EVENTS = [
  {
    year: "2008",
    title: "Origen en Santpedor",
    description: "Nace en Santpedor, Cataluña. Su afinidad innata y pasión por las estructuras musicales empiezan a moldear su camino.",
  },
  {
    year: "2023",
    title: "El Debut: 'Magia'",
    description: "Publica su primer tema oficial 'Magia' como MIDEC26, marcando el inicio formal de su catálogo musical.",
  },
  {
    year: "Transición",
    title: "Evolución Creativa",
    description: "Decide archivar sus trabajos previos para buscar un renacimiento creativo libre de ataduras y de mayor madurez.",
  },
  {
    year: "Presente",
    title: "La Era MARKHO",
    description: "Nace su identidad definitiva. Enfocado en el sonido urbano premium, producciones detalladas y letras auténticas.",
  },
];

export default function SobrePage() {
  return (
    <main className="relative min-h-screen bg-background pt-32 pb-24 overflow-hidden select-none">
      
      {/* 6. Ambient Background Motion & 18. Animated Gradient Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Shifting Gradient Blurs */}
        <div className="absolute top-10 left-[10%] w-[40vw] h-[40vw] bg-red-600/10 rounded-full blur-[120px] animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-20 right-[5%] w-[45vw] h-[45vw] bg-cyan-500/5 rounded-full blur-[150px] animate-[pulse_8s_ease-in-out_infinite_1s]" />
        
        {/* 7. Thin line work grid aesthetic */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ef444405_1px,transparent_1px),linear-gradient(to_bottom,#ef444405_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)]" />
      </div>

      <Section id="sobre">
        <div className="relative z-10">
          
          {/* 4. Expressive Typography Title with Kinetic Accent */}
          <div className="mb-20 text-center lg:text-left">
            <ScrollReveal>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-black tracking-[0.4em] text-red-500 uppercase">
                  Biografía & Evolución
                </span>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-foreground leading-none flex flex-wrap items-center justify-center lg:justify-start gap-x-4">
                  <span className="bg-gradient-to-r from-neutral-600 via-neutral-500 to-transparent bg-clip-text text-transparent">
                    MIDEC26
                  </span>
                  <span className="text-red-600 font-extrabold relative inline-block animate-[pulse_4s_ease-in-out_infinite]">
                    MARKHO
                    <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 to-transparent rounded-full" />
                  </span>
                </h1>
              </div>
            </ScrollReveal>
          </div>

          {/* Main Grid: Glassmorphic Bio and MöET Video Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-32">
            
            {/* Bio Box: 28. Glassmorphic Animation Effect with premium borders */}
            <div className="lg:col-span-7 bg-surface/20 border border-white/5 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative group overflow-hidden hover:border-white/10 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
              
              <ScrollReveal>
                <div className="space-y-6 text-text-secondary text-base sm:text-lg leading-relaxed">
                  <p>
                    Nacido en <span className="text-foreground font-semibold border-b border-red-500/20 pb-0.5">Santpedor (Cataluña) en 2008</span>, la vida de este artista siempre estuvo ligada a una innegable pasión por la música. Su trayectoria empezó a definirse en <span className="text-foreground font-semibold">2023</span> con su primer tema oficial <strong className="text-foreground">"Magia"</strong> como <strong className="text-foreground">Midec26</strong>.
                  </p>
                  <p>
                    Bajo esa firma inicial lanzó varios singles y álbumes para experimentar y forjar su estilo. Pero la madurez artística exige transformaciones. En su búsqueda de un sonido propio y profesional, decidió archivar su catálogo original.
                  </p>
                  <p>
                    Ocultando esa primera etapa para renacer sin ataduras, surge <strong className="text-red-500 font-black">MARKHO</strong>. En este nuevo capítulo enfocado en la excelencia de producción, calidad de lírica y autenticidad del género urbano, escribe su presente.
                  </p>
                </div>
              </ScrollReveal>

              <div className="mt-12 flex flex-wrap gap-4 relative z-10">
                <a
                  href={SOCIALS.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold rounded-full transition-all hover:scale-105 shadow-[0_5px_15px_rgba(29,185,84,0.2)] text-xs uppercase tracking-wider"
                >
                  Spotify
                </a>
                <a
                  href={SOCIALS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-full transition-all hover:scale-105 shadow-[0_5px_15px_rgba(220,38,38,0.2)] text-xs uppercase tracking-wider"
                >
                  YouTube
                </a>
                <a
                  href={SOCIALS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 border border-white/10 bg-white/5 hover:border-red-600 hover:text-red-500 rounded-full transition-all hover:scale-105 text-xs uppercase tracking-wider"
                >
                  Instagram
                </a>
              </div>
            </div>

            {/* MöET Video: Glassmorphism Card with Shifting Glow Border */}
            <div className="lg:col-span-5 bg-surface/30 backdrop-blur-md rounded-3xl border border-white/5 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-red-600/30 transition-all duration-500">
              {/* Shifting radial glow on hover */}
              <div className="absolute inset-0 bg-radial-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" style={{ background: "radial-gradient(circle at 100% 0%, var(--color-accent), transparent 60%)" }} />
              
              <ScrollReveal direction="right" delay={0.1}>
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="text-[10px] font-black tracking-[0.3em] text-red-500 uppercase block mb-1">
                      Colaboración Destacada
                    </span>
                    <h3 className="text-3xl font-black text-foreground">
                      MöET <span className="text-text-secondary text-lg font-light block sm:inline sm:ml-1">ft. El Capi</span>
                    </h3>
                  </div>

                  {/* 22. Page Transition / Zoom Effect on Video Container */}
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
                    <iframe
                      src="https://www.youtube.com/embed/PKRYA2fHRZ8"
                      title="MARKHO ft. El Capi - MöET"
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              </ScrollReveal>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 relative z-10">
                <a
                  href="https://www.youtube.com/watch?v=PKRYA2fHRZ8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl transition-all hover:scale-[1.02] text-xs uppercase tracking-wider shadow-[0_4px_12px_rgba(220,38,38,0.2)]"
                >
                  Ver Video
                </a>
                <a
                  href="https://www.youtube.com/@ElCapi-ds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-3 bg-white/5 border border-white/10 text-foreground hover:bg-white/10 hover:border-red-600/30 transition-colors text-xs font-bold uppercase tracking-wider rounded-xl"
                >
                  El Capi
                </a>
              </div>
            </div>

          </div>

          {/* 7. Line Animation / 8. Self-Drawing Style Timeline */}
          <div className="border-t border-white/5 pt-20 relative z-10">
            <div className="text-center mb-20">
              <span className="text-xs font-black tracking-[0.4em] text-red-500 uppercase">
                Trayectoria
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-foreground mt-2 tracking-tight">
                LÍNEA DE TIEMPO
              </h2>
            </div>

            {/* Timeline Row */}
            <div className="relative">
              {/* 8. Self-Drawing connecting line decoration */}
              <div className="absolute top-[35px] left-8 right-8 h-[2px] bg-gradient-to-r from-red-600/10 via-red-600/40 to-cyan-500/10 hidden lg:block" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {TIMELINE_EVENTS.map((event, index) => (
                  <ScrollReveal key={event.year} delay={index * 0.15}>
                    <div className="bg-surface/10 border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-red-600/30 transition-all duration-500 hover:-translate-y-2">
                      {/* Accent color strip */}
                      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
                      
                      {/* Big background watermark */}
                      <div className="absolute -right-2 -top-6 text-7xl font-black text-white/[0.02] select-none pointer-events-none group-hover:text-red-600/[0.03] transition-colors">
                        0{index + 1}
                      </div>

                      {/* Dot connector representation */}
                      <div className="w-8 h-8 rounded-full bg-surface border border-red-600/30 flex items-center justify-center mb-6 relative z-10 group-hover:border-red-600 transition-all shadow-[0_0_10px_rgba(220,38,38,0.1)]">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                      </div>

                      <span className="inline-block px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-xs font-black tracking-widest mb-4 uppercase">
                        {event.year}
                      </span>
                      
                      <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                        {event.title}
                      </h3>
                      
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>

          <AdBanner slot="0000000000" />
        </div>
      </Section>
    </main>
  );
}
