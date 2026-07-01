"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const SESSIONS = [
  {
    title: "El Estudio",
    tagline: "DONDE NACE EL RITMO",
    description: "La incubadora de ideas. Sintetizadores, letras sin filtro y la búsqueda obsesiva del sonido perfecto.",
    image: "/artista-pose1.png",
    color: "from-red-500/20 to-rose-500/20",
    glow: "rgba(239, 68, 68, 0.3)",
    accent: "text-red-500",
  },
  {
    title: "La Composición",
    tagline: "CREATIVIDAD PURA",
    description: "Cada verso cuenta una verdad. Estilo de vida urbano, reflexiones en la madrugada y lírica honesta.",
    image: "/artista-pose2.png",
    color: "from-cyan-500/20 to-blue-500/20",
    glow: "rgba(6, 182, 212, 0.3)",
    accent: "text-cyan-400",
  },
  {
    title: "El Directo",
    tagline: "ENERGÍA EN VIVO",
    description: "La conexión absoluta con la gente. El escenario se enciende, la música explota y el show toma el control.",
    image: "/artista-pose3.png",
    color: "from-emerald-500/20 to-teal-500/20",
    glow: "rgba(16, 185, 129, 0.3)",
    accent: "text-emerald-400",
  },
  {
    title: "La Esencia",
    tagline: "STREETWEAR & ACTITUD",
    description: "Markho representa la cultura de la calle. Moda, autenticidad y música como un solo movimiento.",
    image: "/artista-pose4.png",
    color: "from-amber-500/20 to-orange-500/20",
    glow: "rgba(245, 158, 11, 0.3)",
    accent: "text-amber-500",
  },
];

export default function Gallery() {
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleIndices((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -50px 0px" }
    );

    const childElements = sectionRef.current?.querySelectorAll(".scroll-card");
    childElements?.forEach((el) => observer.observe(el));

    return () => {
      childElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-background overflow-hidden">
      {/* Aesthetic lines */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-24">
          <span className="text-xs font-bold tracking-[0.3em] text-red-500 uppercase">
            Visual Showcase
          </span>
          <h2 className="text-5xl sm:text-6xl font-black tracking-tight mt-3 text-foreground">
            LA ESENCIA DE <span className="text-red-600">MARKHO</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto text-sm sm:text-base">
            Una mirada exclusiva a los diferentes estados y vibras creativas del artista. Desliza hacia abajo para descubrirlo.
          </p>
        </div>

        {/* Scroll-Triggered Cards Grid */}
        <div className="space-y-32">
          {SESSIONS.map((session, index) => {
            const isVisible = visibleIndices.includes(index);
            const isEven = index % 2 === 0;

            return (
              <div
                key={session.title}
                data-index={index}
                className={`scroll-card grid grid-cols-1 lg:grid-cols-12 gap-12 items-center transition-all duration-1000 transform ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-24"
                }`}
              >
                {/* Text Content */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-center order-2 ${
                    isEven ? "lg:order-1 lg:text-left" : "lg:order-2 lg:text-left"
                  }`}
                >
                  <span className={`text-xs font-bold tracking-widest uppercase ${session.accent} mb-3`}>
                    {session.tagline}
                  </span>
                  <h3 className="text-4xl sm:text-5xl font-black text-foreground mb-6 leading-none">
                    {session.title}
                  </h3>
                  <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                    {session.description}
                  </p>
                  
                  {/* Decorative number */}
                  <div className="text-[120px] font-black text-white/[0.02] leading-none select-none pointer-events-none mt-4 font-sans">
                    0{index + 1}
                  </div>
                </div>

                {/* Card Image Display */}
                <div
                  className={`lg:col-span-6 flex justify-center order-1 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative w-[300px] sm:w-[350px] aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-surface to-background border border-white/5 group">
                    {/* Glowing effect inside card */}
                    <div
                      className="absolute inset-0 opacity-40 mix-blend-screen group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${session.glow}, transparent 70%)`,
                      }}
                    />
                    
                    {/* Abstract background shape */}
                    <div className={`absolute -inset-2 bg-gradient-to-tr ${session.color} blur-2xl opacity-50 group-hover:scale-110 transition-all duration-700`} />

                    {/* Cutout Image with hover lift */}
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <div className="relative w-full h-full transform group-hover:scale-[1.05] group-hover:-translate-y-2 transition-all duration-500">
                        <Image
                          src={session.image}
                          alt={session.title}
                          fill
                          className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                          sizes="(max-width: 768px) 250px, 300px"
                        />
                      </div>
                    </div>

                    {/* Neon bottom border edge */}
                    <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
