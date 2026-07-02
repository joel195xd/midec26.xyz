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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background py-20 lg:py-0"
    >
      {/* Particles layer */}
      <Particles />

      {/* Animated gradient background — parallax */}
      <div
        className="absolute inset-0 animate-gradient bg-gradient-to-br from-accent/10 via-background to-cyan-500/10 opacity-40"
        style={{ transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)` }}
      />

      {/* Grid overlay — parallax */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        style={{ transform: `translate(${mousePos.x * -4}px, ${mousePos.y * -4}px)` }}
      />

      {/* Radial overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_80%)]" />

      {/* Ambient Glows — parallax */}
      <div
        className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-accent/20 rounded-full blur-[120px] pointer-events-none"
        style={{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)` }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none"
        style={{ transform: `translate(${mousePos.x * -12}px, ${mousePos.y * -12}px)` }}
      />

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
              <span
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-neutral-500/80 via-neutral-500/30 to-transparent bg-clip-text text-transparent select-none pr-2"
                style={{ transform: `translate(${mousePos.x * -5}px, ${mousePos.y * -3}px)` }}
              >
                MIDEC26
              </span>
              <span
                className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight text-red-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.45)]"
                style={{ transform: `translate(${mousePos.x * -3}px, ${mousePos.y * -2}px)` }}
              >
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

        {/* Right: Artist Cutout Image with Glow Effects — parallax */}
        <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2 relative group">
          {/* Back glows behind the artist — parallax */}
          <div
            className="absolute w-[280px] sm:w-[350px] aspect-square rounded-full bg-gradient-to-tr from-accent/20 to-cyan-500/20 blur-3xl opacity-80 group-hover:scale-110 transition-transform duration-700 pointer-events-none"
            style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
          />
          
          <div
            className="animate-fade-in-up animate-delay-300 relative w-[280px] sm:w-[380px] aspect-[4/5] overflow-visible"
            style={{ opacity: 0, transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 8}px)` }}
          >
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
