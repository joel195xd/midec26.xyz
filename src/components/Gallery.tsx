"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const SESSIONS = [
  {
    title: "El Estudio",
    tagline: "01 / DONDE NACE EL RITMO",
    description: "La incubadora de ideas. Sintetizadores, letras sin filtro y la búsqueda obsesiva de ese gancho perfecto que resuena en tu mente.",
    image: "/artista-pose1.png",
    accent: "text-red-500",
    bgClass: "from-red-500/10 via-background to-background",
    glowColor: "rgba(239, 68, 68, 0.4)",
  },
  {
    title: "La Composición",
    tagline: "02 / CREATIVIDAD PURA",
    description: "Cada verso cuenta una verdad. Estilo de vida urbano, reflexiones escritas en la madrugada bajo luces tenues y lírica honesta.",
    image: "/artista-pose2.png",
    accent: "text-cyan-400",
    bgClass: "from-cyan-500/10 via-background to-background",
    glowColor: "rgba(6, 182, 212, 0.4)",
  },
  {
    title: "El Directo",
    tagline: "03 / ENERGÍA EN VIVO",
    description: "La conexión absoluta con la gente. El escenario se enciende, la música explota y el show toma el control de los corazones.",
    image: "/artista-pose3.png",
    accent: "text-emerald-400",
    bgClass: "from-emerald-500/10 via-background to-background",
    glowColor: "rgba(16, 185, 129, 0.4)",
  },
  {
    title: "La Esencia",
    tagline: "04 / STREETWEAR & ACTITUD",
    description: "Markho representa la cultura de la calle. Moda, autenticidad e independencia artística convertidas en un solo movimiento.",
    image: "/artista-pose4.png",
    accent: "text-amber-500",
    bgClass: "from-amber-500/10 via-background to-background",
    glowColor: "rgba(245, 158, 11, 0.4)",
  },
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Trigger when the item is in the center 20% of the screen
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          setActiveIndex(index);
        }
      });
    }, observerOptions);

    const triggerElements = containerRef.current?.querySelectorAll(".scrolly-trigger");
    triggerElements?.forEach((el) => observer.observe(el));

    return () => {
      triggerElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[400vh] bg-background transition-colors duration-1000"
    >
      {/* Sticky Frame container */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden pointer-events-none">
        
        {/* Background Ambient Glow relative to the active slide */}
        <div 
          className="absolute inset-0 bg-radial transition-all duration-1000 opacity-60"
          style={{
            background: `radial-gradient(circle at 30% 50%, ${SESSIONS[activeIndex].glowColor}, transparent 60%)`,
          }}
        />

        {/* Diagonal Light Beam effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-transparent pointer-events-none" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-6 w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pointer-events-auto">
          
          {/* Left Side: Sticky Visual Container */}
          <div className="col-span-12 lg:col-span-6 flex justify-center items-center relative h-[40vh] lg:h-[70vh]">
            
            {/* Visual Canvas frame */}
            <div className="relative w-[280px] sm:w-[360px] aspect-[4/5] rounded-3xl overflow-hidden bg-surface/30 border border-white/5 backdrop-blur-md shadow-2xl flex items-center justify-center p-6">
              
              {/* Dynamic decorative backdrop shapes */}
              <div className="absolute -inset-10 bg-gradient-to-tr from-accent/5 to-cyan-500/5 blur-xl pointer-events-none" />
              
              {/* Pose image slots with cross-fade */}
              {SESSIONS.map((session, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={session.image}
                    className={`absolute inset-0 p-8 flex items-center justify-center transition-all duration-1000 transform ${
                      isActive 
                        ? "opacity-100 scale-100 rotate-0 translate-y-0 pointer-events-auto" 
                        : "opacity-0 scale-90 -rotate-3 translate-y-8 pointer-events-none"
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={session.image}
                        alt={session.title}
                        fill
                        className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                        sizes="(max-width: 768px) 250px, 320px"
                      />
                    </div>
                  </div>
                );
              })}

              {/* Holographic scanner accent bar */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse" />
            </div>

            {/* Floating indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/5 bg-surface/50 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
              Sesión 0{activeIndex + 1}
            </div>
          </div>

          {/* Right Side: Spacer for text layout on desktop */}
          <div className="hidden lg:block lg:col-span-6 h-full" />
        </div>
      </div>

      {/* Scrolling Text Columns overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column spacer on desktop to let visual show */}
        <div className="hidden lg:block lg:col-span-6 pointer-events-none" />

        {/* Right Column: Scroll Triggers / Narrative blocks */}
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-start">
          {SESSIONS.map((session, index) => (
            <div
              key={session.title}
              data-index={index}
              className="scrolly-trigger min-h-screen flex flex-col justify-center py-20 lg:py-0"
            >
              <div className="max-w-xl">
                <span className={`text-sm font-bold tracking-[0.2em] uppercase ${session.accent} mb-4 block`}>
                  {session.tagline}
                </span>
                
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground mb-6 leading-none uppercase">
                  {session.title}
                </h3>
                
                <p className="text-lg sm:text-xl text-text-secondary leading-relaxed mb-8">
                  {session.description}
                </p>

                {/* Progress Indicators */}
                <div className="flex items-center gap-2">
                  {SESSIONS.map((_, dotIndex) => (
                    <div
                      key={dotIndex}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        dotIndex === index 
                          ? "w-8 bg-red-500" 
                          : "w-2 bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
