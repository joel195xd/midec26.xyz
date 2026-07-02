"use client";

import Link from "next/link";
import Image from "next/image";
import { SOCIALS } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background py-20 lg:py-0">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-accent/10 via-background to-cyan-500/10 opacity-40" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Radial overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_80%)]" />

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-3 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left: Text Content */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
          <div className="animate-fade-in-up" style={{ opacity: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-semibold tracking-wider uppercase mb-6 mx-auto lg:mx-0 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            Web oficial
            </span>
          </div>

          <div className="animate-fade-in-up animate-delay-200" style={{ opacity: 0 }}>
            <h1 className="flex flex-wrap items-baseline justify-center lg:justify-start gap-x-4 gap-y-2 mb-8 select-none leading-none">
              <span className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-neutral-500/80 via-neutral-500/30 to-transparent bg-clip-text text-transparent select-none pr-2">
                MIDEC26
              </span>
              <span className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight text-red-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.45)]">
                MARKHO
              </span>
            </h1>
          </div>

          <div className="animate-fade-in-up animate-delay-400" style={{ opacity: 0 }}>
            <p className="text-lg sm:text-xl text-text-secondary mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed border-l-2 border-accent/30 pl-4 text-left">
              Música sin límites. Arte sin filtros. Explora los nuevos lanzamientos, el merch exclusivo y la trayectoria del artista.
            </p>
          </div>

          <div className="animate-fade-in-up animate-delay-500" style={{ opacity: 0 }}>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/musica"
                className="w-full sm:w-auto px-8 py-4 bg-accent text-background font-bold rounded-full hover:bg-accent-dark transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(163,230,53,0.2)] hover:shadow-[0_0_30px_rgba(163,230,53,0.4)] text-center"
              >
                Escuchar ahora
              </Link>
              <a
                href={SOCIALS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 border border-white/10 bg-white/5 text-foreground rounded-full hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300 hover:scale-105 text-center"
              >
                Sígueme
              </a>
            </div>
          </div>
        </div>

        {/* Right: Artist Cutout Image with Glow Effects */}
        <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2 relative group">
          {/* Back glows behind the artist */}
          <div className="absolute w-[280px] sm:w-[350px] aspect-square rounded-full bg-gradient-to-tr from-accent/20 to-cyan-500/20 blur-3xl opacity-80 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
          
          <div className="animate-fade-in-up animate-delay-300 relative w-[280px] sm:w-[380px] aspect-[4/5] overflow-visible" style={{ opacity: 0 }}>
            <Image
              src="/artista-pose4.png"
              alt="Midec26 Markho"
              fill
              priority
              className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] group-hover:scale-[1.02] transition-transform duration-500"
              sizes="(max-width: 768px) 280px, 380px"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
