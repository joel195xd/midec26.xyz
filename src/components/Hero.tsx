"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SOCIALS } from "@/lib/constants";
import Particles from "./Particles";

// Animated equalizer bars component
function EqualizerBars() {
  return (
    <div className="flex items-end gap-[3px] h-4">
      {[0.6, 1, 0.4, 0.8, 0.5].map((h, i) => (
        <div
          key={i}
          className="w-[3px] bg-red-500 rounded-full origin-bottom"
          style={{
            animation: `eq-bar ${0.5 + i * 0.15}s ease-in-out infinite alternate`,
            height: `${h * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
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
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      {/* ═══ Layer 0: Particles ═══ */}
      <Particles />

      {/* ═══ Layer 1: Morphing Blob Ambient Background ═══ */}
      <div
        className="hero-blob absolute -top-[20%] -left-[10%] w-[700px] h-[700px] bg-red-600/[0.06] blur-[120px] pointer-events-none"
        style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)` }}
      />
      <div
        className="hero-blob-2 absolute -bottom-[15%] -right-[5%] w-[500px] h-[500px] bg-cyan-500/[0.04] blur-[120px] pointer-events-none"
        style={{ transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)` }}
      />
      <div
        className="hero-blob absolute top-[40%] right-[30%] w-[300px] h-[300px] bg-purple-600/[0.03] blur-[80px] pointer-events-none"
        style={{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * -15}px)` }}
      />

      {/* ═══ Layer 2: Animated 3D Grid ═══ */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_20%,transparent_100%)]"
        style={{
          transform: `perspective(1000px) rotateX(${mousePos.y * 3}deg) rotateY(${mousePos.x * -3}deg)`,
          transformOrigin: "center center",
        }}
      />

      {/* ═══ Layer 3: Self-Drawing SVG Lines ═══ */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M0 450 Q 360 350, 720 450 T 1440 450"
          stroke="rgba(239,68,68,0.06)"
          strokeWidth="1"
          className="hero-draw-line"
        />
        <path
          d="M0 500 Q 400 380, 800 480 T 1440 420"
          stroke="rgba(6,182,212,0.04)"
          strokeWidth="1"
          className="hero-draw-line"
          style={{ animationDelay: "1.5s" }}
        />
      </svg>

      {/* ═══ Scanning light beam ═══ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hero-scanline absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
      </div>

      {/* ═══ Layer 4: Vignette + noise ═══ */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_75%)]" />
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      {/* ═══════════════════════════════════ */}
      {/* MAIN CONTENT                       */}
      {/* ═══════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-screen py-28 lg:py-0">

          {/* ─── LEFT: Typography & CTA ─── */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1 relative">

            {/* Badge with hover microinteraction */}
            <div className={`transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <span className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm text-[11px] font-bold tracking-[0.25em] uppercase mb-10 mx-auto lg:mx-0 w-fit cursor-default hover:border-red-500/30 hover:bg-red-500/[0.03] transition-all duration-500">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors">Web Oficial</span>
              </span>
            </div>

            {/* Expressive Typography */}
            <div className="mb-6 select-none">
              {/* Ghost watermark */}
              <div className={`overflow-hidden transition-all duration-1000 delay-200 ${loaded ? "opacity-100" : "opacity-0"}`}>
                <span
                  className={`block text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.3em] text-white/[0.04] uppercase leading-none mb-2 ${loaded ? "hero-text-reveal" : ""}`}
                  style={{ animationDelay: "0.3s", transform: `translate(${mousePos.x * -4}px, ${mousePos.y * -2}px)` }}
                >
                  MIDEC26
                </span>
              </div>

              {/* Main name with glitch hover */}
              <div className={`overflow-hidden transition-all duration-1000 delay-300 ${loaded ? "opacity-100" : "opacity-0"}`}>
                <h1
                  className={`hero-glitch text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-black tracking-[-0.04em] leading-[0.85] text-red-600 cursor-default ${loaded ? "hero-text-reveal" : ""}`}
                  style={{ animationDelay: "0.5s", transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -1}px)` }}
                >
                  MARKHO
                </h1>
              </div>

              {/* Self-drawing accent underline */}
              <svg className="w-[200px] sm:w-[300px] h-3 mt-3 mx-auto lg:mx-0" viewBox="0 0 300 12" fill="none">
                <path d="M0 6 Q 75 0, 150 6 T 300 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" className="hero-draw-line" style={{ animationDelay: "1.2s" }} />
              </svg>
            </div>

            {/* Description */}
            <div className={`transition-all duration-700 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <p className="text-base sm:text-lg text-zinc-400 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                <span className="text-foreground font-medium">Música sin límites.</span>{" "}
                Arte sin filtros. Explora los nuevos lanzamientos, el merch exclusivo y la trayectoria del artista.
              </p>
            </div>

            {/* CTA Buttons with liquid shimmer */}
            <div className={`transition-all duration-700 delay-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/musica"
                  className="group relative w-full sm:w-auto px-10 py-4 bg-red-600 text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] text-center"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="absolute inset-0 rounded-full shadow-[0_0_25px_rgba(220,38,38,0.4)] group-hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] transition-shadow duration-300" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                    Escuchar ahora
                  </span>
                </Link>
                <a
                  href={SOCIALS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full sm:w-auto px-10 py-4 border border-white/[0.08] bg-white/[0.02] text-foreground rounded-full hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] text-center backdrop-blur-sm relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative z-10">Sígueme</span>
                </a>
              </div>
            </div>

            {/* Social proof */}
            <div className={`transition-all duration-700 delay-1000 mt-14 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className="flex items-center gap-6 justify-center lg:justify-start">
                {[
                  { name: "Spotify", href: SOCIALS.spotify, hoverColor: "hover:text-[#1DB954]" },
                  { name: "YouTube", href: SOCIALS.youtube, hoverColor: "hover:text-red-500" },
                  { name: "Instagram", href: SOCIALS.instagram, hoverColor: "hover:text-pink-500" },
                ].map((s, i) => (
                  <span key={s.name} className="flex items-center gap-6">
                    {i > 0 && <span className="w-1 h-1 rounded-full bg-zinc-800" />}
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={`text-zinc-600 ${s.hoverColor} transition-colors duration-300 text-[11px] font-bold tracking-[0.2em] uppercase`}>
                      {s.name}
                    </a>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Artist Visual Composition ─── */}
          <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2 relative">

            {/* Rotating vinyl disc behind artist */}
            <div
              className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] pointer-events-none"
              style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }}
            >
              <div className="w-full h-full rounded-full border border-white/[0.03] hero-vinyl-spin">
                <div className="absolute inset-[15%] rounded-full border border-white/[0.04]" />
                <div className="absolute inset-[30%] rounded-full border border-white/[0.05]" />
                <div className="absolute inset-[45%] rounded-full bg-red-600/10 border border-red-500/10" />
                <div className="absolute inset-[48%] rounded-full bg-background" />
              </div>
            </div>

            {/* Glow behind artist */}
            <div
              className="absolute w-[350px] h-[350px] bg-gradient-to-tr from-red-600/15 to-purple-600/10 rounded-full blur-[80px] pointer-events-none"
              style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
            />

            {/* Artist container with faux-3D tilt */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              style={{
                transform: `perspective(800px) rotateY(${mousePos.x * -4}deg) rotateX(${mousePos.y * 2}deg) translate(${mousePos.x * 8}px, ${mousePos.y * 5}px)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Image with edge-fade mask (no white bg) */}
              <div className="relative w-[280px] sm:w-[360px] lg:w-[420px] aspect-[3/4]">
                <div
                  className="relative w-full h-full"
                  style={{
                    maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 85%, transparent 100%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                    maskComposite: "intersect",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 85%, transparent 100%)",
                    WebkitMaskComposite: "destination-in",
                  }}
                >
                  <Image
                    src="/artista-pose4.png"
                    alt="MARKHO — Artista"
                    fill
                    priority
                    className="object-contain object-bottom drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
                    sizes="(max-width: 768px) 280px, 420px"
                  />
                </div>
              </div>

              {/* ── Glassmorphic Card: Now Playing ── */}
              <div
                className="hero-glass-float absolute -left-16 sm:-left-20 top-[15%] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.07] rounded-2xl px-5 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hidden sm:flex items-center gap-3"
                style={{ transform: `translateZ(40px)` }}
              >
                <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center shrink-0">
                  <EqualizerBars />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 font-medium tracking-wider uppercase">Sonando ahora</p>
                  <p className="text-sm text-foreground font-bold">Nuevo single 🔥</p>
                </div>
              </div>

              {/* ── Glassmorphic Card: Era Badge ── */}
              <div
                className="hero-glass-float-delayed absolute -right-10 sm:-right-16 bottom-[22%] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.07] rounded-2xl px-5 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hidden sm:flex items-center gap-3"
                style={{ transform: `translateZ(30px)` }}
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 font-medium tracking-wider uppercase">Nueva era</p>
                  <p className="text-sm text-foreground font-bold">MARKHO 2025</p>
                </div>
              </div>

              {/* ── Glassmorphic Card: Location ── */}
              <div
                className="hero-glass-float absolute -left-4 sm:-left-8 bottom-[8%] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.07] rounded-2xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hidden sm:flex items-center gap-2"
                style={{ animationDelay: "2.5s", transform: `translateZ(20px)` }}
              >
                <span className="text-lg">📍</span>
                <span className="text-[11px] text-zinc-400 font-medium">Santpedor, Cataluña</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ═══ Bottom fade ═══ */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />

      {/* ═══ Scroll indicator ═══ */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-all duration-1000 delay-1200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div className="animate-bounce flex flex-col items-center gap-2">
          <span className="text-[10px] text-zinc-600 tracking-[0.3em] uppercase font-medium">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/10 flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/30 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
