"use client";

import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    text: "Markho es uno de los artistas emergentes más prometedores del año. Su sonido urbano latino rompe esquemas.",
    author: "Revista Musical",
    role: "Crítica de música",
    stars: 5,
  },
  {
    text: "La energía que transmite en cada canción es incomparable. Markho tiene un talento natural para conectar con su audiencia.",
    author: "Blog de Hip-Hop",
    role: "Plataforma digital",
    stars: 5,
  },
  {
    text: "Desde que descubrí su música, no he podido dejar de escucharlo. Cada lanzamiento supera al anterior.",
    author: "Fan de Spotify",
    role: "Comunidad de seguidores",
    stars: 5,
  },
  {
    text: "Un artista que no tiene miedo a experimentar. Markho representa la nueva ola de la música urbana en Cataluña.",
    author: "Urban Sound",
    role: "Medio especializado",
    stars: 5,
  },
  {
    text: "Sus letras conectan directamente con la realidad de la calle. Autenticidad pura en cada verso.",
    author: "Oyente fiel",
    role: "Seguidor desde 2023",
    stars: 5,
  },
];

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[0] }) {
  return (
    <div className="flex-shrink-0 w-[340px] sm:w-[400px] bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-500 group">
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: t.stars }).map((_, s) => (
          <Star key={s} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm text-zinc-400 leading-relaxed mb-6 group-hover:text-zinc-300 transition-colors">
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/20 border border-white/[0.06] flex items-center justify-center text-xs font-bold text-zinc-400">
          {t.author.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{t.author}</p>
          <p className="text-[11px] text-zinc-600">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  // Duplicate for seamless infinite loop
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-zinc-600 mb-3">Testimonios</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              Lo que dicen
            </h2>
          </div>
          <div className="hidden sm:block w-16 h-1 bg-red-500 rounded-full mb-2" />
        </div>
      </div>

      {/* Infinite marquee */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 marquee-track hover:[animation-play-state:paused]">
          {items.map((t, i) => (
            <TestimonialCard key={`${t.author}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
