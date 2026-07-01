import Image from "next/image";
import Section from "@/components/Section";
import AdBanner from "@/components/AdBanner";
import ScrollReveal from "@/components/ScrollReveal";
import { TRACKS, SOCIALS } from "@/lib/constants";
import { getLatestVideos } from "@/lib/youtube";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Música — Midec26",
  description: "Escucha la música de Midec26 en Spotify, YouTube y más plataformas.",
};

export default async function MusicaPage() {
  let videos: Awaited<ReturnType<typeof getLatestVideos>> = [];
  try {
    videos = await getLatestVideos(6);
  } catch {
    // YouTube API not configured or failed — render without videos
  }

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TRACKS.map((track, i) => (
                <div
                  key={track.title}
                  className="bg-surface rounded-2xl p-6 border border-white/5 hover:border-accent/30 transition-all duration-300 group"
                >
                  <div className="aspect-square bg-gradient-to-br from-accent/20 to-accent-dark/20 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-6xl font-black text-accent/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {track.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4">{track.year}</p>

                  <div className="flex items-center gap-3">
                    <a
                      href={track.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#1DB954]/10 text-[#1DB954] rounded-full text-sm font-medium hover:bg-[#1DB954]/20 transition-colors"
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
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-full text-sm font-medium hover:bg-red-500/20 transition-colors"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        YouTube
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* YouTube Videos */}
        <ScrollReveal delay={0.3}>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Videos</h2>
            {videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <a
                    key={video.id}
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="aspect-video bg-surface rounded-2xl border border-white/5 overflow-hidden mb-3 relative">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100">
                          <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 ml-0.5">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs text-text-secondary mt-1">
                      {new Date(video.publishedAt).toLocaleDateString("es-MX", {
                        year: "numeric",
                        month: "short",
                      })}
                    </p>
                  </a>
                ))}
              </div>
            ) : (
              <div className="aspect-video bg-surface rounded-2xl border border-white/5 flex items-center justify-center">
                <p className="text-text-secondary">Próximamente — embed de YouTube</p>
              </div>
            )}
          </div>
        </ScrollReveal>
      </Section>
    </main>
  );
}
