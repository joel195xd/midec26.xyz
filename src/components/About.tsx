import Section from "./Section";
import { SOCIALS } from "@/lib/constants";

export default function About() {
  return (
    <Section id="sobre">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Bio */}
        <div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground mb-4">
            Sobre Midec26
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full mb-8" />

          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              Midec26 es un artista y cantante que está dejando su huilla en la
              escena musical. Con un estilo único que fusiona lo urbano con lo
              alternativo, cada track es una experiencia diferente.
            </p>
            <p>
              Este es solo el comienzo. Sigue Midec26 en todas sus plataformas
              para no perderte nada.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={SOCIALS.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#1DB954] text-black font-bold rounded-full hover:bg-[#1ed760] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Escuchar en Spotify
            </a>
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-white/20 text-foreground font-bold rounded-full hover:border-accent hover:text-accent transition-all"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* TikTok embed placeholder */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm aspect-[9/16] bg-surface rounded-2xl border border-white/5 flex flex-col items-center justify-center p-8">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-12 h-12 text-accent/30 mb-4"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.3z" />
            </svg>
            <p className="text-text-secondary text-sm text-center">
              Próximamente — embed de TikTok
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
