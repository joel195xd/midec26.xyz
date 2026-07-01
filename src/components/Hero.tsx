"use client";

import { SOCIALS } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-accent via-accent-dark to-cyan-500 opacity-20" />

      {/* Radial overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_70%)]" />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <div className="animate-fade-in-up" style={{ opacity: 0 }}>
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter text-foreground mb-6">
            MIDE
            <span className="text-accent">C26</span>
          </h1>
        </div>

        <div className="animate-fade-in-up animate-delay-200" style={{ opacity: 0 }}>
          <p className="text-xl sm:text-2xl text-text-secondary mb-10 max-w-md mx-auto">
            Música sin límites. Arte sin filtros.
          </p>
        </div>

        <div className="animate-fade-in-up animate-delay-400" style={{ opacity: 0 }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#musica"
              className="px-8 py-3 bg-accent text-background font-bold rounded-full hover:bg-accent-dark transition-colors duration-200 animate-pulse-glow"
            >
              Escuchar ahora
            </a>
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-white/20 text-foreground rounded-full hover:border-accent hover:text-accent transition-all duration-200"
            >
              Sígueme
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-text-secondary"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
