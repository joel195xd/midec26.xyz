"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SOCIALS } from "@/lib/constants";
import Particles from "./Particles";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Particles layer */}
      <Particles />

      {/* Cinematic gradient bg */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-background to-background"
        style={{ transform: `translate(${mousePos.x * -6}px, ${mousePos.y * -6}px)` }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        style={{ transform: `translate(${mousePos.x * -3}px, ${mousePos.y * -3}px)` }}
      />

      {/* Depth radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_80%)]" />

      {/* Ambient Glow — Red behind the artist */}
      <div
        className="absolute top-[20%] left-[45%] w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[150px] pointer-events-none"
        style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
      />
      {/* Accent secondary glow */}
      <div
        className="absolute bottom-[10%] left-[15%] w-[350px] h-[350px] bg-accent/10 rounded-full blur-[120px] pointer-events-none"
        style={{ transform: `translate(${mousePos.x * -12}px, ${mousePos.y * -12}px)` }}
      />

      {/* Noise */}
      <div className="absolute inset-0 opacity-3 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      {/* ═══════ MAIN CONTENT ═══════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center min-h-screen py-24 lg:py-0">

          {/* ─── Left Column: Text ─── */}
          <div className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-1 relative z-20">

            {/* Badge */}
            <div className="animate-fade-in-up" style={{ opacity: 0 }}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-8 mx-auto lg:mx-0 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Web Oficial
              </span>
            </div>

            {/* Name Stack */}
            <div className="animate-fade-in-up animate-delay-200" style={{ opacity: 0 }}>
              <div className="mb-8 select-none">
                {/* Ghost name */}
                <span
                  className="block text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-white/[0.06] uppercase leading-none mb-1"
                  style={{ transform: `translate(${mousePos.x * -4}px, ${mousePos.y * -2}px)` }}
                >
                  MIDEC26
                </span>
                {/* Main name */}
                <h1
                  className="text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[10rem] font-black tracking-tighter leading-[0.85] text-red-600 drop-shadow-[0_0_40px_rgba(220,38,38,0.3)]"
                  style={{ transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -1}px)` }}
                >
                  MARKHO
                </h1>
              </div>
            </div>

            {/* Description */}
            <div className="animate-fade-in-up animate-delay-400" style={{ opacity: 0 }}>
              <p className="text-base sm:text-lg text-text-secondary mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
                <span className="text-foreground font-medium">Música sin límites.</span>{" "}
                Arte sin filtros. Explora los nuevos lanzamientos, el merch exclusivo y la trayectoria del artista.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up animate-delay-500" style={{ opacity: 0 }}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/musica"
                  className="group relative w-full sm:w-auto px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.25)] hover:shadow-[0_0_40px_rgba(220,38,38,0.45)] text-center overflow-hidden"
                >
                  <span className="relative z-10">Escuchar ahora</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                <a
                  href={SOCIALS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 border border-white/10 bg-white/[0.03] text-foreground rounded-full hover:border-white/25 hover:bg-white/[0.06] transition-all duration-300 hover:scale-105 text-center backdrop-blur-sm"
                >
                  Sígueme
                </a>
              </div>
            </div>

            {/* Social proof line */}
            <div className="animate-fade-in-up animate-delay-500 mt-12" style={{ opacity: 0 }}>
              <div className="flex items-center gap-6 justify-center lg:justify-start text-zinc-500 text-xs font-medium tracking-wider uppercase">
                <a href={SOCIALS.spotify} target="_blank" rel="noopener noreferrer" className="hover:text-[#1DB954] transition-colors">
                  Spotify
                </a>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <a href={SOCIALS.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
                  YouTube
                </a>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* ─── Right Column: Artist Image ─── */}
          <div className="flex justify-center items-end order-1 lg:order-2 relative lg:self-end">

            {/* Circular glow behind artist */}
            <div
              className="absolute bottom-0 w-[400px] h-[400px] bg-gradient-to-t from-red-600/20 to-transparent rounded-full blur-[100px] pointer-events-none"
              style={{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px) scale(1.2)` }}
            />

            {/* Floor reflection / ground gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-950/20 to-transparent pointer-events-none" />

            {/* Artist Image */}
            <div
              className="animate-fade-in-up animate-delay-300 relative w-[300px] sm:w-[380px] lg:w-[440px] aspect-[3/4]"
              style={{ opacity: 0, transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 5}px)` }}
            >
              {/* The image uses mix-blend-mode to eliminate white backgrounds */}
              <div className="relative w-full h-full">
                <Image
                  src="/artista-pose4.png"
                  alt="MARKHO — Artista"
                  fill
                  priority
                  className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] mix-blend-multiply brightness-[1.1] contrast-[1.05]"
                  sizes="(max-width: 768px) 300px, 440px"
                />
                {/* Overlay to tint whites to dark — hides white bg completely */}
                <div className="absolute inset-0 bg-background/90 mix-blend-darken pointer-events-none" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1 h-2.5 bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  );
}
