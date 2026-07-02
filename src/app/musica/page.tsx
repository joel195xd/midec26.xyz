import Section from "@/components/Section";
import AdBanner from "@/components/AdBanner";
import ScrollReveal from "@/components/ScrollReveal";
import VideoGrid from "@/components/VideoGrid";
import { TRACKS, SOCIALS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Música — Markho",
  description: "Escucha la música de Markho en Spotify, YouTube y más plataformas.",
};

export default function MusicaPage() {
  return (
    <main className="pt-24 pb-20">
      <Section id="musica">
        <ScrollReveal>
          <div className="mb-12">
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-foreground mb-4">
              Música
            </h1>
            <div className="w-16 h-1 bg-accent rounded-full" />
          </div>
        </ScrollReveal>

        {/* Spotify Artist Embed */}
        <ScrollReveal delay={0.1}>
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Escucha en Spotify</h2>
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: "12px" }}
              src={SOCIALS.spotify}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </ScrollReveal>

        <AdBanner slot="0000000000" />

        {/* Track List */}
        <ScrollReveal delay={0.2}>
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Tracks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TRACKS.map((track, i) => {
                // Different gradients for different tracks
                const gradients = [
                  "from-red-500/20 to-purple-500/20",
                  "from-cyan-500/20 to-blue-500/20",
                  "from-emerald-500/20 to-teal-500/20",
                ];
                const bgGradient = gradients[i % gradients.length];
                const glowGradient = bgGradient.replace(/\/20/g, "/40");

                return (
                  <div
                    key={track.title}
                    className="group relative bg-white/[0.02] rounded-2xl p-4 border border-white/[0.04] hover:border-white/[0.1] transition-all duration-500 overflow-hidden"
                  >
                    {/* Hover glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${glowGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    {/* Cover Art Placeholder */}
                    <div className={`relative aspect-square w-full rounded-xl bg-gradient-to-br ${bgGradient} border border-white/[0.05] mb-5 overflow-hidden flex items-center justify-center`}>
                      {/* Abstract geometric shape as placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
                        <svg width="60%" height="60%" viewBox="0 0 100 100" fill="none">
                          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-white" />
                          <rect x="30" y="30" width="40" height="40" stroke="currentColor" strokeWidth="2" className="text-white" transform="rotate(45 50 50)" />
                        </svg>
                      </div>
                      
                      {/* Track number */}
                      <span className="relative z-10 text-5xl font-black text-white/50 tracking-tighter drop-shadow-xl group-hover:scale-110 transition-transform duration-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Mini audio visualizer on hover */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-1 h-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        {[1, 2, 3, 4, 5].map((bar) => (
                          <div
                            key={bar}
                            className="w-1 bg-white rounded-t-full origin-bottom"
                            style={{
                              animation: `eq-bar ${0.4 + bar * 0.1}s ease-in-out infinite alternate`,
                              height: `${20 + Math.random() * 80}%`
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="px-2">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-red-400 transition-colors">
                            {track.title}
                          </h3>
                          <p className="text-xs text-zinc-500 font-medium tracking-wider uppercase">Single • {track.year}</p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        <a
                          href={track.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex justify-center items-center gap-2 py-2.5 bg-[#1DB954]/10 text-[#1DB954] hover:bg-[#1DB954] hover:text-black rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300"
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                          </svg>
                          Spotify
                        </a>
                        {track.youtube && (
                          <a
                            href={track.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center bg-white/5 text-zinc-400 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-300"
                            title="Ver en YouTube"
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* YouTube Videos — client-side with skeleton loaders */}
        <ScrollReveal delay={0.3}>
          <VideoGrid />
        </ScrollReveal>
      </Section>
    </main>
  );
}
